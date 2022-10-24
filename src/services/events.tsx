export interface EventType {
    eventDetailsID:         number
	eventID:                number
	title:                  string
	descriptionHTML:        string
	description:            string
	eventTypeTitle:         string
	start:                  string
	end:                    string
	locationDetails:        string
	startDateTimeFormatted: string
	ownerID:                number
	ownerTitle:             string
	allDay:                 boolean
	eventLocationGroupID:   number
	tags:                   string
	locationTypeTitle:      string
	statusTypeTitle:        string
	signUpUrl:              string
	icon:                   string
	eventLocationType:      string
	className:              string
	eventUrl:               string
	eventReadUrl:           string
	eventICalUrl:           string
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
