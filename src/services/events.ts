export interface EventType {
	EventDetailsID: number
	EventID: number
	Title: string
	SocietyID: number
	SocietyName: string
	Location: string
	Description: string
	StartDatetime: string
	EndDatetime: string
	DatetimeFormatted: string
	EventURL: string
	EventICalURL: string
}

interface EventsSnapshot {
	schemaVersion: number
	updatedAt: string
	source: string
	events: Array<EventType>
}

const EVENTS_SNAPSHOT_URL = "/events.json"

export const getEvents = async (): Promise<
	Array<EventType>
> => {
	const response = await fetch(EVENTS_SNAPSHOT_URL, {
		cache: "no-cache",
	})

	if (!response.ok) {
		throw new Error(
			`Unable to load events (${response.status})`,
		)
	}

	const snapshot = parseEventsSnapshot(
		await response.json(),
	)
	return snapshot.events
}

export const splitEvents = (
	events: Array<EventType>,
	now = Date.now(),
) => {
	const past: Array<EventType> = []
	const upcoming: Array<EventType> = []

	for (const event of events) {
		if (Date.parse(event.EndDatetime) < now) {
			past.push(event)
		} else {
			upcoming.push(event)
		}
	}

	past.sort(
		(a, b) =>
			Date.parse(b.EndDatetime) - Date.parse(a.EndDatetime),
	)
	upcoming.sort(
		(a, b) =>
			Date.parse(a.StartDatetime) -
			Date.parse(b.StartDatetime),
	)

	return { past, upcoming }
}

function parseEventsSnapshot(
	value: unknown,
): EventsSnapshot {
	if (
		!isObject(value) ||
		value.schemaVersion !== 1 ||
		typeof value.updatedAt !== "string" ||
		typeof value.source !== "string" ||
		!Array.isArray(value.events) ||
		!value.events.every(isEvent)
	) {
		throw new Error("Events snapshot has an invalid format")
	}

	return value as unknown as EventsSnapshot
}

function isEvent(value: unknown): value is EventType {
	if (!isObject(value)) return false

	return (
		Number.isInteger(value.EventDetailsID) &&
		Number.isInteger(value.EventID) &&
		typeof value.Title === "string" &&
		value.SocietyID === 30 &&
		typeof value.SocietyName === "string" &&
		typeof value.Location === "string" &&
		typeof value.Description === "string" &&
		isIsoDate(value.StartDatetime) &&
		isIsoDate(value.EndDatetime) &&
		typeof value.DatetimeFormatted === "string" &&
		typeof value.EventURL === "string" &&
		typeof value.EventICalURL === "string"
	)
}

function isIsoDate(value: unknown): value is string {
	return (
		typeof value === "string" &&
		Number.isFinite(Date.parse(value))
	)
}

function isObject(
	value: unknown,
): value is Record<string, unknown> {
	return typeof value === "object" && value !== null
}
