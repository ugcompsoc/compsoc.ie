import { createFileRoute } from "@tanstack/react-router"
import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
	Post,
	PostContent,
	PostFooter,
	PostHeader,
	PostMeta,
	PostTitle,
} from "@/components/ui/post"
import { Skeleton } from "@/components/ui/skeleton"
import { useEventsCount, useInfiniteEvents } from "@/hooks/queries/useEvents"
import type { EventType } from "@/services/events"

// Skeleton for a post
const PostSkeleton = () => (
	<Post className="mb-6 w-full">
		<PostHeader>
			<PostTitle>
				<Skeleton className="h-6 w-2/3 mb-2" />
			</PostTitle>
			<PostMeta>
				<Skeleton className="h-4 w-1/4" />
			</PostMeta>
		</PostHeader>
		<PostContent>
			<Skeleton className="h-4 w-full mb-2" />
			<Skeleton className="h-4 w-3/4 mb-2" />
			<Skeleton className="h-4 w-1/2" />
		</PostContent>
		<PostFooter>
			<Skeleton className="h-8 w-24" />
		</PostFooter>
	</Post>
)

export const Route = createFileRoute("/(menu)/events")({
	component: RouteComponent,
})

function RouteComponent() {
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

	// Use TanStack Query for infinite scroll
	const {
		data: upcomingData,
		fetchNextPage: fetchNextUpcoming,
		hasNextPage: hasNextUpcoming,
		isFetchingNextPage: isFetchingUpcoming,
		isLoading: isLoadingUpcoming,
		error: upcomingError,
	} = useInfiniteEvents("upcoming")

	const {
		data: pastData,
		fetchNextPage: fetchNextPast,
		hasNextPage: hasNextPast,
		isFetchingNextPage: isFetchingPast,
		isLoading: isLoadingPast,
		error: pastError,
	} = useInfiniteEvents("past")

	// Get total count of events for badges
	const { data: eventsCount } = useEventsCount()

	const observerRef = useRef<IntersectionObserver | null>(null)
	const loadingRef = useRef<HTMLDivElement>(null)

	// Get current data based on active tab
	const currentData = activeTab === "upcoming" ? upcomingData : pastData
	const currentHasNext =
		activeTab === "upcoming" ? hasNextUpcoming : hasNextPast
	const currentIsFetching =
		activeTab === "upcoming" ? isFetchingUpcoming : isFetchingPast
	const currentIsLoading =
		activeTab === "upcoming" ? isLoadingUpcoming : isLoadingPast
	const currentError = activeTab === "upcoming" ? upcomingError : pastError
	const loadMore = useCallback(() => {
		if (currentIsFetching || !currentHasNext) return

		if (activeTab === "upcoming") {
			fetchNextUpcoming()
		} else {
			fetchNextPast()
		}
	}, [
		currentIsFetching,
		currentHasNext,
		activeTab,
		fetchNextUpcoming,
		fetchNextPast,
	])
	// Intersection Observer for infinite scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !currentIsFetching && currentHasNext) {
					loadMore()
				}
			},
			{ threshold: 0.1 },
		)

		observerRef.current = observer

		if (loadingRef.current) {
			observer.observe(loadingRef.current)
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [currentIsFetching, currentHasNext, loadMore])

	const setActiveTabAndReset = (tab: "upcoming" | "past") => {
		setActiveTab(tab)
		// TanStack Query handles pagination state automatically
	}

	// Decode HTML special characters
	const htmlDecode = (content: string) => {
		const textarea = document.createElement("textarea")
		textarea.innerHTML = content
		return textarea.value
	}

	const renderEvent = (event: EventType) => {
		return (
			<Post key={`${event.EventID}-${event.EventDetailsID}`} className="mb-6">
				<PostHeader>
					<PostTitle>{htmlDecode(event.Title)}</PostTitle>
					<PostMeta>
						<div className="flex items-center gap-2">
							<Calendar className="w-4 h-4" />
							<span>{event.DatetimeFormatted}</span>
						</div>
						{event.Location && (
							<div className="flex items-center gap-2">
								<MapPin className="w-4 h-4" />
								<span>{event.Location}</span>
							</div>
						)}
					</PostMeta>
				</PostHeader>
				<PostContent>
					<div
						className="prose prose-sm max-w-none"
						// biome-ignore lint: Event content is trusted
						dangerouslySetInnerHTML={{ __html: event.DangerousDescriptionHTML }}
					/>
				</PostContent>
				<PostFooter>
					<Button asChild size="sm" variant="outline">
						<a
							href={event.EventURL}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2"
						>
							<ExternalLink className="w-4 h-4" />
							View / Join Event
						</a>
					</Button>
				</PostFooter>
			</Post>
		)
	}

	const getCurrentEvents = () => {
		if (!currentData?.pages) return []

		// Flatten all pages of events
		return currentData.pages.flatMap((page: EventType[]) => page)
	}

	const renderEventsList = (
		emptyMessage: string,
		emptyIcon: React.ReactNode,
	) => {
		if (currentIsLoading) {
			// Show 2 skeleton posts during initial loading
			return (
				<div className="flex flex-col relative gap-4 justify-center items-center h-64 mt-32">
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)
		}

		if (currentError) {
			return (
				<div className="flex flex-col relative items-center justify-center h-64">
					<div className="text-red-500 mb-4">⚠️</div>
					<p className="text-muted-foreground mt-4 text-center">
						Failed to load events. Please try again later.
					</p>
					<Button
						onClick={() => window.location.reload()}
						className="mt-4"
						variant="outline"
					>
						Retry
					</Button>
				</div>
			)
		}

		const currentEvents = getCurrentEvents()

		if (currentEvents.length === 0) {
			return (
				<div className="flex flex-col relative items-center justify-center h-64">
					{emptyIcon}
					<p className="text-muted-foreground mt-4 text-center">
						{emptyMessage}
					</p>
				</div>
			)
		}

		return (
			<div className="space-y-4">
				{currentEvents.map((event: EventType) => renderEvent(event))}

				{/* Loading more indicator - always at the bottom */}
				{currentHasNext && (
					<div
						ref={loadingRef}
						className="flex items-center justify-center py-8 w-full"
					>
						{currentIsFetching ? (
							<PostSkeleton />
						) : (
							<div className="h-6" /> // Invisible element for intersection observer
						)}
					</div>
				)}
			</div>
		)
	}

	return (
		<div className="relative min-h-screen w-full pt-24 md:pt-48 pb-24 flex flex-col items-center bg-gradient-to-br from-background to-muted">
			<div className="max-w-4xl w-full px-4 md:px-6 flex flex-col flex-1 z-10">
				<div className="mb-8 md:mb-12 text-center flex-shrink-0">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-primary tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-3 drop-shadow-sm">
						<span className="inline-flex items-center justify-center bg-primary/10 rounded-full p-2">
							<Calendar className="inline-block" size={40} />
						</span>
						<span className="relative">
							Events
							<span className="block h-1 w-2/3 mx-auto mt-2 rounded-full bg-primary/60" />
						</span>
					</h2>
					<p className="text-base md:text-lg lg:text-xl text-secondary-foreground max-w-2xl mx-auto font-light mt-2">
						Discover upcoming events and explore our past activities.
					</p>
				</div>

				{/* Modern Tab Navigation */}
				<div className="mb-8">
					<div className="flex bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-1 gap-1 max-w-md mx-auto">
						<button
							type="button"
							onClick={() => setActiveTabAndReset("upcoming")}
							className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-out cursor-pointer ${
								activeTab === "upcoming"
									? "bg-primary text-primary-foreground shadow-lg"
									: "text-muted-foreground hover:text-foreground hover:bg-card/50"
							}`}
						>
							<span className="relative inline-flex w-full items-center justify-center">
								<span className="relative inline-flex items-center gap-2 -ml-4">
									<Calendar className="w-4 h-4" />
									<span>Upcoming</span>
									<EventCountBadge count={eventsCount?.upcoming || 0} />
								</span>
							</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveTabAndReset("past")}
							className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ease-out cursor-pointer ${
								activeTab === "past"
									? "bg-primary text-primary-foreground shadow-lg"
									: "text-muted-foreground hover:text-foreground hover:bg-card/50"
							}`}
						>
							<span className="relative inline-flex w-full items-center justify-center">
								<span className="relative inline-flex items-center gap-2 -ml-6">
									<Clock className="w-4 h-4" />
									<span>Past</span>
									<EventCountBadge count={eventsCount?.past || 0} />
								</span>
							</span>
						</button>
					</div>
				</div>

				{/* Events Content */}
				<div className="min-h-[400px]">
					{activeTab === "upcoming"
						? renderEventsList(
								"No upcoming events at the moment. Check back soon for new events!",
								<Calendar className="w-12 h-12 text-muted-foreground" />,
							)
						: renderEventsList(
								"No past events to display.",
								<Clock className="w-12 h-12 text-muted-foreground" />,
							)}
				</div>
			</div>
		</div>
	)
}
// Reusable event count badge component
const EventCountBadge = ({ count }: { count: number }) => {
	if (!count || count <= 0) return null

	return (
		<span className="absolute left-full ml-2 bg-primary-foreground/20 text-primary-foreground text-xs px-2 py-0.5 rounded-full font-medium">
			{count}
		</span>
	)
}
