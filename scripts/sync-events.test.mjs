import { describe, expect, it } from "vitest"
import {
	galwayLocalToIso,
	mapPortalEvent,
	plainTextFromHtml,
	upcomingSnapshot,
} from "./sync-events.mjs"

describe("event portal adapter", () => {
	it("interprets portal datetimes in the Galway timezone", () => {
		expect(galwayLocalToIso("2026-01-21T09:00")).toBe(
			"2026-01-21T09:00:00.000Z",
		)
		expect(galwayLocalToIso("2026-07-21T09:00")).toBe(
			"2026-07-21T08:00:00.000Z",
		)
	})

	it("converts portal HTML to plain text", () => {
		expect(
			plainTextFromHtml(
				"&lt;p&gt;First &amp;amp; second&lt;br /&gt;• Third in Ãras; itâ€™s â‚¬5&lt;/p&gt;",
			),
		).toBe("First & second\n• Third in Áras; it’s €5")
		expect(
			plainTextFromHtml("D&#39;Arcy<br></br>#EOF"),
		).toBe("D'Arcy\n#EOF")
	})

	it("maps the list title and safe detail fields", () => {
		const result = mapPortalEvent(
			{
				eventDetailsID: 68267,
				eventID: 30487,
				title: "Compsoc",
				descriptionAbbrev: "AGM!!",
				ownerTitle: "Compsoc",
				start: "2026-03-30T17:00",
				end: "2026-03-30T19:00",
				locationDetails: " CSB 1008",
				ownerID: 30,
			},
			{
				eventDetailsID: 68267,
				ownerID: 30,
				descriptionHTML:
					"&lt;p&gt;Come to our AGM!&lt;/p&gt;",
				description: "Come to our AGM!",
				eventReadUrl:
					"https://socs.universityofgalway.ie/events/view/68267",
				eventICalUrl:
					"https://socs.universityofgalway.ie/events/ical/68267",
			},
		)

		expect(result).toMatchObject({
			EventDetailsID: 68267,
			Title: "AGM!!",
			SocietyID: 30,
			Location: "CSB 1008",
			Description: "Come to our AGM!",
		})
		expect(result.EventURL).toBe(
			"https://socs.universityofgalway.ie/events/view/68267",
		)
	})
})

describe("upcomingSnapshot", () => {
	const event = (id, end) => ({
		EventDetailsID: id,
		EndDatetime: end,
	})
	const snapshot = {
		schemaVersion: 1,
		updatedAt: "2026-09-01T00:00:00.000Z",
		source: "https://example.test",
		events: [
			event(1, "2026-09-21T17:00:00.000Z"),
			event(2, "2026-09-22T12:00:00.000Z"),
			event(3, "2026-09-28T17:00:00.000Z"),
		],
	}

	it("keeps events that have not ended, including ongoing ones", () => {
		const now = Date.parse("2026-09-22T12:00:00.000Z")
		expect(
			upcomingSnapshot(snapshot, now).events.map(
				(e) => e.EventDetailsID,
			),
		).toEqual([2, 3])
	})

	it("preserves the snapshot metadata and leaves the input alone", () => {
		const result = upcomingSnapshot(
			snapshot,
			Date.parse("2027-01-01T00:00:00.000Z"),
		)
		expect(result.events).toEqual([])
		expect(result.source).toBe(snapshot.source)
		expect(result.updatedAt).toBe(snapshot.updatedAt)
		expect(snapshot.events).toHaveLength(3)
	})
})
