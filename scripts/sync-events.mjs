#!/usr/bin/env node

import {
	mkdir,
	readFile,
	rename,
	writeFile,
} from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const SOCIETY_ID = 30
const SOCIETY_OWNER_ID = "MzA="
const PORTAL_ORIGIN = "https://socs.universityofgalway.ie"
const AJAX_URL = `${PORTAL_ORIGIN}/ajax/index.php`
const CALENDAR_URL = `${PORTAL_ORIGIN}/calendar.php?ownerID=${SOCIETY_OWNER_ID}`
const TIME_ZONE = "Europe/Dublin"
const CACHE_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1_000
const DETAIL_CONCURRENCY = 6
const ROOT_DIR = path.resolve(
	path.dirname(fileURLToPath(import.meta.url)),
	"..",
)
const OUTPUT_PATH = path.join(
	ROOT_DIR,
	"public",
	"events.json",
)

const zonePartsFormatter = new Intl.DateTimeFormat(
	"en-IE",
	{
		timeZone: TIME_ZONE,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hourCycle: "h23",
	},
)

const eventDateFormatter = new Intl.DateTimeFormat(
	"en-IE",
	{
		timeZone: TIME_ZONE,
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23",
	},
)

export function galwayLocalToIso(value) {
	const match =
		/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(
			value,
		)
	if (!match) {
		throw new Error(`Invalid portal datetime: ${value}`)
	}

	const [, year, month, day, hour, minute, second = "0"] =
		match
	const localTimestamp = Date.UTC(
		Number(year),
		Number(month) - 1,
		Number(day),
		Number(hour),
		Number(minute),
		Number(second),
	)

	let instant = localTimestamp
	for (let iteration = 0; iteration < 3; iteration += 1) {
		const nextInstant =
			localTimestamp - timeZoneOffset(instant)
		if (nextInstant === instant) break
		instant = nextInstant
	}

	return new Date(instant).toISOString()
}

export function plainTextFromHtml(value) {
	if (typeof value !== "string" || value.length === 0) {
		return ""
	}

	const decoded = decodeHtmlEntities(value)
	const withoutUnsafeBlocks = decoded
		.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
		.replace(/<br\s*\/?>/gi, "\n")
		.replace(/<li\b[^>]*>/gi, "• ")
		.replace(
			/<\/(?:p|div|li|h[1-6]|blockquote|section)>/gi,
			"\n",
		)
		.replace(/<[^>]+>/g, "")

	return normalizePlainText(
		decodeHtmlEntities(withoutUnsafeBlocks),
	)
}

export function mapPortalEvent(listEvent, detailEvent) {
	assertListEvent(listEvent)
	assertDetailEvent(detailEvent, listEvent.eventDetailsID)

	const base = mapListFields(listEvent)
	const description =
		plainTextFromHtml(detailEvent.descriptionHTML) ||
		plainTextFromHtml(detailEvent.description)

	return completeEvent(
		base,
		description,
		portalEventUrl(
			detailEvent.eventReadUrl,
			`/events/view/${listEvent.eventDetailsID}`,
		),
		portalEventUrl(
			detailEvent.eventICalUrl,
			`/events/ical/${listEvent.eventDetailsID}`,
		),
	)
}

async function main() {
	const existing = await readExistingSnapshot()
	const listEvents = await fetchEventList(
		existing?.events.length ?? 0,
	)
	const cachedEvents = new Map(
		(existing?.events ?? []).map((event) => [
			event.EventDetailsID,
			event,
		]),
	)
	const refreshAfter = Date.now() - CACHE_MAX_AGE_MS
	let fetchedCount = 0

	const events = await mapWithConcurrency(
		listEvents,
		DETAIL_CONCURRENCY,
		async (listEvent) => {
			const cached = cachedEvents.get(
				listEvent.eventDetailsID,
			)
			const base = mapListFields(listEvent)

			if (
				cached &&
				cached.EventID === listEvent.eventID &&
				Date.parse(base.EndDatetime) < refreshAfter
			) {
				return completeEvent(
					base,
					plainTextFromHtml(cached.Description),
					portalEventUrl(
						cached.EventURL,
						`/events/view/${listEvent.eventDetailsID}`,
					),
					portalEventUrl(
						cached.EventICalURL,
						`/events/ical/${listEvent.eventDetailsID}`,
					),
				)
			}

			fetchedCount += 1
			const detail = await fetchEventDetail(
				listEvent.eventDetailsID,
			)
			return mapPortalEvent(listEvent, detail)
		},
	)

	events.sort(
		(a, b) =>
			Date.parse(a.StartDatetime) -
				Date.parse(b.StartDatetime) ||
			a.EventDetailsID - b.EventDetailsID,
	)

	console.log(
		`Events: ${events.length} listed, ${events.length - fetchedCount} cached, ${fetchedCount} fetched`,
	)

	if (
		existing?.schemaVersion === 1 &&
		existing.source === CALENDAR_URL &&
		JSON.stringify(existing.events) ===
			JSON.stringify(events)
	) {
		console.log("Events snapshot is current")
		return
	}

	const snapshot = {
		schemaVersion: 1,
		updatedAt: new Date().toISOString(),
		source: CALENDAR_URL,
		events,
	}
	await writeSnapshot(snapshot)
	console.log("Events snapshot updated")
}

async function fetchEventList(existingEventCount) {
	const endYear = new Date().getUTCFullYear() + 3
	const url = buildPortalUrl({
		object: "Q2FsZW5kYXI=",
		method: "anNvbkV2ZW50cw==",
		action: "Ng==",
		ownerID: SOCIETY_OWNER_ID,
		start: "2010-01-01",
		end: `${endYear}-01-01`,
	})
	const value = await fetchJson(url)

	const minimumExpected = Math.max(
		1,
		Math.floor(existingEventCount * 0.9),
	)
	if (
		!Array.isArray(value) ||
		value.length < minimumExpected
	) {
		throw new Error(
			"Portal returned an incomplete CompSoc event list; keeping the existing snapshot",
		)
	}

	for (const event of value) {
		assertListEvent(event)
	}
	const uniqueEventDetails = new Set(
		value.map(({ eventDetailsID }) => eventDetailsID),
	)
	if (uniqueEventDetails.size !== value.length) {
		throw new Error(
			"Portal returned duplicate CompSoc events; keeping the existing snapshot",
		)
	}

	return value
}

async function fetchEventDetail(eventDetailsID) {
	const url = buildPortalUrl({
		object: "Q2FsZW5kYXJQdWJsaWM=",
		method: "anNvbkV2ZW50",
		action: "Ng==",
		frontWebsite: "MQ==",
		eventDetailsID: String(eventDetailsID),
	})
	const value = await fetchJson(url)

	if (!Array.isArray(value) || value.length !== 1) {
		throw new Error(
			`Portal returned invalid details for event ${eventDetailsID}`,
		)
	}

	assertDetailEvent(value[0], eventDetailsID)
	return value[0]
}

async function fetchJson(url) {
	let lastError

	for (let attempt = 1; attempt <= 3; attempt += 1) {
		try {
			const response = await fetch(url, {
				headers: {
					accept: "application/json",
					"user-agent": "CompSoc.ie event sync",
				},
				signal: AbortSignal.timeout(20_000),
			})
			if (!response.ok) {
				throw new Error(
					`${response.status} ${response.statusText}`,
				)
			}
			return await response.json()
		} catch (error) {
			lastError = error
			if (attempt < 3) {
				await new Promise((resolve) =>
					setTimeout(resolve, attempt * 300),
				)
			}
		}
	}

	throw new Error(`Unable to read ${url}`, {
		cause: lastError,
	})
}

function mapListFields(listEvent) {
	assertListEvent(listEvent)
	const start = galwayLocalToIso(listEvent.start)
	const end = galwayLocalToIso(listEvent.end)

	return {
		EventDetailsID: listEvent.eventDetailsID,
		EventID: listEvent.eventID,
		Title: plainTextFromHtml(listEvent.descriptionAbbrev),
		SocietyID: listEvent.ownerID,
		SocietyName: plainTextFromHtml(listEvent.ownerTitle),
		Location: plainTextFromHtml(listEvent.locationDetails),
		StartDatetime: start,
		EndDatetime: end,
		DatetimeFormatted: eventDateFormatter.formatRange(
			new Date(start),
			new Date(end),
		),
	}
}

function completeEvent(
	base,
	description,
	eventUrl,
	eventICalUrl,
) {
	return {
		EventDetailsID: base.EventDetailsID,
		EventID: base.EventID,
		Title: base.Title,
		SocietyID: base.SocietyID,
		SocietyName: base.SocietyName,
		Location: base.Location,
		Description: description,
		StartDatetime: base.StartDatetime,
		EndDatetime: base.EndDatetime,
		DatetimeFormatted: base.DatetimeFormatted,
		EventURL: eventUrl,
		EventICalURL: eventICalUrl,
	}
}

function assertListEvent(value) {
	if (
		!isObject(value) ||
		!Number.isInteger(value.eventDetailsID) ||
		!Number.isInteger(value.eventID) ||
		value.ownerID !== SOCIETY_ID ||
		typeof value.descriptionAbbrev !== "string" ||
		value.descriptionAbbrev.trim() === "" ||
		typeof value.ownerTitle !== "string" ||
		typeof value.locationDetails !== "string" ||
		typeof value.start !== "string" ||
		typeof value.end !== "string"
	) {
		throw new Error(
			"Portal event list has an unexpected format or society owner",
		)
	}
}

function assertDetailEvent(value, eventDetailsID) {
	if (
		!isObject(value) ||
		value.eventDetailsID !== eventDetailsID ||
		value.ownerID !== SOCIETY_ID ||
		(typeof value.descriptionHTML !== "string" &&
			typeof value.description !== "string") ||
		(typeof value.eventReadUrl !== "string" &&
			value.eventReadUrl !== null) ||
		(typeof value.eventICalUrl !== "string" &&
			value.eventICalUrl !== null)
	) {
		throw new Error(
			`Portal event ${eventDetailsID} has an unexpected detail format`,
		)
	}
}

function portalEventUrl(value, fallbackPath) {
	const url = new URL(
		typeof value === "string" && value !== ""
			? value
			: fallbackPath,
		PORTAL_ORIGIN,
	)

	if (url.origin !== PORTAL_ORIGIN) {
		throw new Error(`Unexpected portal event URL: ${url}`)
	}

	return url.href
}

function buildPortalUrl(parameters) {
	const url = new URL(AJAX_URL)
	for (const [key, value] of Object.entries(parameters)) {
		url.searchParams.set(key, value)
	}
	return url.href
}

function timeZoneOffset(timestamp) {
	const parts = Object.fromEntries(
		zonePartsFormatter
			.formatToParts(new Date(timestamp))
			.filter(({ type }) => type !== "literal")
			.map(({ type, value }) => [type, value]),
	)

	return (
		Date.UTC(
			Number(parts.year),
			Number(parts.month) - 1,
			Number(parts.day),
			Number(parts.hour),
			Number(parts.minute),
			Number(parts.second),
		) - timestamp
	)
}

function decodeHtmlEntities(value) {
	const namedEntities = {
		amp: "&",
		apos: "'",
		gt: ">",
		lt: "<",
		nbsp: " ",
		quot: '"',
	}

	return value.replace(
		/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi,
		(match, decimal, hexadecimal, name) => {
			if (decimal) {
				return safeCodePoint(Number(decimal), match)
			}
			if (hexadecimal) {
				return safeCodePoint(
					Number.parseInt(hexadecimal, 16),
					match,
				)
			}
			return namedEntities[name.toLowerCase()] ?? match
		},
	)
}

function safeCodePoint(value, fallback) {
	try {
		return String.fromCodePoint(value)
	} catch {
		return fallback
	}
}

function normalizePlainText(value) {
	return repairMojibake(String(value ?? ""))
		.replace(/\u00a0/g, " ")
		.replace(/\r\n?/g, "\n")
		.replace(/[ \t]+\n/g, "\n")
		.replace(/\n[ \t]+/g, "\n")
		.replace(/[ \t]{2,}/g, " ")
		.replace(/\n{3,}/g, "\n\n")
		.trim()
}

function repairMojibake(value) {
	if (!/[ÃÂâð]|[\u0080-\u009f]/.test(value)) {
		return value
	}

	let repaired = value
	for (let attempt = 0; attempt < 2; attempt += 1) {
		const characters = Array.from(repaired)
		let next = ""
		let changed = false

		for (let index = 0; index < characters.length; ) {
			let replacement = null

			if (
				/[ÃÂâð]|[\u0080-\u009f]/.test(characters[index])
			) {
				for (
					let length = Math.min(
						4,
						characters.length - index,
					);
					length >= 2;
					length -= 1
				) {
					const candidate = characters
						.slice(index, index + length)
						.join("")
					const decoded = decodeWindows1252Utf8(candidate)
					if (
						decoded &&
						mojibakeScore(decoded) <
							mojibakeScore(candidate)
					) {
						replacement = { decoded, length }
						break
					}
				}
			}

			if (replacement) {
				next += replacement.decoded
				index += replacement.length
				changed = true
			} else {
				next += characters[index]
				index += 1
			}
		}

		repaired = next
		if (!changed) break
	}

	return repaired
}

function decodeWindows1252Utf8(value) {
	const bytes = encodeWindows1252(value)
	if (!bytes) return null

	try {
		return new TextDecoder("utf-8", {
			fatal: true,
		}).decode(bytes)
	} catch {
		return null
	}
}

function encodeWindows1252(value) {
	const specialCodePoints = new Map([
		[0x20ac, 0x80],
		[0x201a, 0x82],
		[0x0192, 0x83],
		[0x201e, 0x84],
		[0x2026, 0x85],
		[0x2020, 0x86],
		[0x2021, 0x87],
		[0x02c6, 0x88],
		[0x2030, 0x89],
		[0x0160, 0x8a],
		[0x2039, 0x8b],
		[0x0152, 0x8c],
		[0x017d, 0x8e],
		[0x2018, 0x91],
		[0x2019, 0x92],
		[0x201c, 0x93],
		[0x201d, 0x94],
		[0x2022, 0x95],
		[0x2013, 0x96],
		[0x2014, 0x97],
		[0x02dc, 0x98],
		[0x2122, 0x99],
		[0x0161, 0x9a],
		[0x203a, 0x9b],
		[0x0153, 0x9c],
		[0x017e, 0x9e],
		[0x0178, 0x9f],
	])
	const bytes = []

	for (const character of value) {
		const codePoint = character.codePointAt(0)
		if (codePoint <= 0xff) {
			bytes.push(codePoint)
			continue
		}
		const byte = specialCodePoints.get(codePoint)
		if (byte === undefined) return null
		bytes.push(byte)
	}

	return Uint8Array.from(bytes)
}

function mojibakeScore(value) {
	return value.match(/[ÃÂâð]|[\u0080-\u009f]/g)?.length ?? 0
}

async function mapWithConcurrency(
	values,
	concurrency,
	mapper,
) {
	const results = new Array(values.length)
	let nextIndex = 0

	const workers = Array.from(
		{ length: Math.min(concurrency, values.length) },
		async () => {
			while (nextIndex < values.length) {
				const index = nextIndex
				nextIndex += 1
				results[index] = await mapper(values[index], index)
			}
		},
	)

	await Promise.all(workers)
	return results
}

async function readExistingSnapshot() {
	try {
		const value = JSON.parse(
			await readFile(OUTPUT_PATH, "utf8"),
		)
		if (!isObject(value) || !Array.isArray(value.events)) {
			throw new Error("invalid snapshot shape")
		}
		return value
	} catch (error) {
		if (error?.code === "ENOENT") return null
		throw new Error(
			`Unable to read existing events snapshot: ${error.message}`,
			{ cause: error },
		)
	}
}

async function writeSnapshot(snapshot) {
	await mkdir(path.dirname(OUTPUT_PATH), {
		recursive: true,
	})
	const temporaryPath = `${OUTPUT_PATH}.tmp-${process.pid}`
	await writeFile(
		temporaryPath,
		`${JSON.stringify(snapshot, null, "\t")}\n`,
		"utf8",
	)
	await rename(temporaryPath, OUTPUT_PATH)
}

function isObject(value) {
	return typeof value === "object" && value !== null
}

const isDirectInvocation =
	process.argv[1] &&
	import.meta.url === pathToFileURL(process.argv[1]).href

if (isDirectInvocation) {
	main().catch((error) => {
		console.error(`Event sync failed: ${error.message}`)
		process.exitCode = 1
	})
}
