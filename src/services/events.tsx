export interface EventType {
    EventDetailsID:         	number
	EventID:                	number
	Title:                  	string
	SocietyID:					number
	SocietyName: 				string
	Location: 					string
	DangerousDescriptionHTML:   string
	DescriptionMarkdown:        string
	Description: 				string
	StartDatetime:              string
	EndDatetime:                string
	DatetimeFormatted: 			string
	EventURL: 					string
	EventICalURL: 				string
}

export interface AllEventsType {
    past: Array<EventType>
    upcoming: Array<EventType>
}

// Returns all events that have an end time after the current time
const getPastEvents = (async () => {
    const response = await fetch('https://api.compsoc.ie/v1/events/past/30')
    const responseJson = await response.json()
    return responseJson["data"]
})

// Returns all events that have an end time before the current time
const getUpcomingEvents = (async () => {
    const response = await fetch('https://api.compsoc.ie/v1/events/upcoming/30')
    const responseJson = await response.json()
    return responseJson["data"]
})

// Returns all events seperated into two arrays, past and upcoming
export const getEvents = (async () => {
    var events = {} as AllEventsType
    events.past = await getPastEvents()
    events.upcoming = await getUpcomingEvents()
    return events
})
