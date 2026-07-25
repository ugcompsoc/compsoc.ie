import { describe, expect, it } from "vitest"
import {
	galwayLocalToIso,
	mapPortalEvent,
	plainTextFromHtml,
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
