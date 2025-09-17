import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
	getEvents,
	getPastEvents,
	getUpcomingEvents,
	paginateEvents,
} from "@/services/events";

export const eventsQueryKeys = {
	all: ["events"] as const,
	allEvents: () => [...eventsQueryKeys.all, "all"] as const,
	pastEvents: () => [...eventsQueryKeys.all, "past"] as const,
	upcomingEvents: () => [...eventsQueryKeys.all, "upcoming"] as const,
	count: () => [...eventsQueryKeys.all, "count"] as const,
	paginated: (type: "past" | "upcoming", page: number) =>
		[...eventsQueryKeys.all, type, "page", page] as const,
};

export function useAllEvents() {
	return useQuery({
		queryKey: eventsQueryKeys.allEvents(),
		queryFn: getEvents,
		staleTime: 2 * 60 * 1000, // 2 minutes
		gcTime: 5 * 60 * 1000, // 5 minutes
	});
}

export function usePastEvents() {
	return useQuery({
		queryKey: eventsQueryKeys.pastEvents(),
		queryFn: getPastEvents,
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
}

export function useUpcomingEvents() {
	return useQuery({
		queryKey: eventsQueryKeys.upcomingEvents(),
		queryFn: getUpcomingEvents,
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
}

export function useInfiniteEvents(type: "past" | "upcoming") {
	return useInfiniteQuery({
		queryKey: eventsQueryKeys.paginated(type, 0),
		queryFn: async ({ pageParam = 0 }) => {
			const events =
				type === "past" ? await getPastEvents() : await getUpcomingEvents();
			return paginateEvents(events, pageParam as number, 7);
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			// If the last page has fewer items than the limit, we've reached the end
			return lastPage.length === 7 ? allPages.length : undefined;
		},
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
}

export function useEventsCount() {
	return useQuery({
		queryKey: eventsQueryKeys.count(),
		queryFn: async () => {
			const [pastEvents, upcomingEvents] = await Promise.all([
				getPastEvents(),
				getUpcomingEvents(),
			]);
			return {
				past: pastEvents.length,
				upcoming: upcomingEvents.length,
			};
		},
		staleTime: 2 * 60 * 1000,
		gcTime: 5 * 60 * 1000,
	});
}
