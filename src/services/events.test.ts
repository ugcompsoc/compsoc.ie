import { describe, expect, it } from "vitest"
import { type EventType, splitEvents } from "./events"

const event = (
	id: number,
	start: string,
	end: string,
): EventType => ({
	EventDetailsID: id,
	EventID: id,
	Title: `Event ${id}`,
	SocietyID: 30,
	SocietyName: "Compsoc",
	Location: "CSB",
	Description: "",
	StartDatetime: start,
	EndDatetime: end,
	DatetimeFormatted: "",
	EventURL: `https://socs.universityofgalway.ie/events/view/${id}`,
	EventICalURL: `https://socs.universityofgalway.ie/events/ical/${id}`,
})

describe("splitEvents", () => {
	it("keeps ongoing events in Upcoming and sorts both lists", () => {
		const events = [
			event(
				1,
				"2026-07-25T08:00:00.000Z",
				"2026-07-25T09:00:00.000Z",
			),
			event(
				2,
				"2026-07-25T11:00:00.000Z",
				"2026-07-25T12:00:00.000Z",
			),
			event(
				3,
				"2026-07-25T09:30:00.000Z",
				"2026-07-25T10:30:00.000Z",
			),
		]

		const result = splitEvents(
			events,
			Date.parse("2026-07-25T10:00:00.000Z"),
		)

		expect(
			result.past.map(
				({ EventDetailsID }) => EventDetailsID,
			),
		).toEqual([1])
		expect(
			result.upcoming.map(
				({ EventDetailsID }) => EventDetailsID,
			),
		).toEqual([3, 2])
	})

	it("does not mutate the snapshot order", () => {
		const events = [
			event(
				2,
				"2026-07-25T11:00:00.000Z",
				"2026-07-25T12:00:00.000Z",
			),
			event(
				1,
				"2026-07-25T08:00:00.000Z",
				"2026-07-25T09:00:00.000Z",
			),
		]

		splitEvents(
			events,
			Date.parse("2026-07-25T10:00:00.000Z"),
		)

		expect(
			events.map(({ EventDetailsID }) => EventDetailsID),
		).toEqual([2, 1])
	})
})
