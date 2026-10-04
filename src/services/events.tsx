export interface EventType {
  EventDetailsID: number;
  EventID: number;
  Title: string;
  DatetimeFormatted: string;
  DangerousDescriptionHTML: string;
  EventURL: string;
}

export interface AllEventsType {
  past: EventType[];
  upcoming: EventType[];
}

const isEvent = (value: unknown): value is EventType => {
  if (typeof value !== "object" || value === null) return false;
  const event = value as Record<string, unknown>;
  return (
    typeof event.EventDetailsID === "number" &&
    typeof event.EventID === "number" &&
    typeof event.Title === "string" &&
    typeof event.DatetimeFormatted === "string" &&
    typeof event.DangerousDescriptionHTML === "string" &&
    typeof event.EventURL === "string"
  );
};

const getEventList = async (kind: "past" | "upcoming", signal?: AbortSignal): Promise<EventType[]> => {
  const response = await fetch(`https://api.compsoc.ie/v1/events/${kind}/30`, { signal });
  if (!response.ok) throw new Error(`Could not load ${kind} events (${response.status})`);

  const body: unknown = await response.json();
  if (typeof body !== "object" || body === null || !("data" in body)) {
    throw new Error(`Invalid ${kind} events response`);
  }

  const events = body.data;
  if (!Array.isArray(events) || !events.every(isEvent)) {
    throw new Error(`Invalid ${kind} events response`);
  }
  return events;
};

export const getEvents = async (signal?: AbortSignal): Promise<AllEventsType> => {
  const [past, upcoming] = await Promise.all([
    getEventList("past", signal),
    getEventList("upcoming", signal),
  ]);
  return { past, upcoming };
};
