export interface EventType {
	EventDetailsID: number;
	EventID: number;
	Title: string;
	SocietyID: number;
	SocietyName: string;
	Location: string;
	DangerousDescriptionHTML: string;
	DescriptionMarkdown: string;
	Description: string;
	StartDatetime: string;
	EndDatetime: string;
	DatetimeFormatted: string;
	EventURL: string;
	EventICalURL: string;
}

export interface AllEventsType {
	past: Array<EventType>;
	upcoming: Array<EventType>;
}

// Returns all events that have an end time after the current time
const getPastEvents = async () => {
	const response = await fetch("https://api.compsoc.ie/v1/events/past/30");
	const responseJson = await response.json();
	const events = responseJson["data"] || [];

	// Sort past events by end date (most recent first)
	return events.sort(
		(a: EventType, b: EventType) =>
			new Date(b.EndDatetime).getTime() - new Date(a.EndDatetime).getTime(),
	);
};

// Returns all events that have an end time before the current time
const getUpcomingEvents = async () => {
	const response = await fetch("https://api.compsoc.ie/v1/events/upcoming/30");
	const responseJson = await response.json();
	const events = responseJson["data"] || [];

	// Sort upcoming events by start date (earliest first)
	return events.sort(
		(a: EventType, b: EventType) =>
			new Date(a.StartDatetime).getTime() - new Date(b.StartDatetime).getTime(),
	);
};

// Returns all events seperated into two arrays, past and upcoming
export const getEvents = async () => {
	var events = {} as AllEventsType;
	events.past = await getPastEvents();
	events.upcoming = await getUpcomingEvents();
	return events;
};

// Client-side pagination helper
export const paginateEvents = (
	events: EventType[],
	page: number,
	limit: number = 7,
) => {
	const startIndex = page * limit;
	const endIndex = startIndex + limit;
	return events.slice(startIndex, endIndex);
};
