import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import {
	Calendar,
	ExternalLink,
	MapPin,
	Search,
} from "lucide-react"
import { useMemo } from "react"
import { buttonVariants } from "#/components/ui/button"
import { Card, CardContent } from "#/components/ui/card"
import { Input } from "#/components/ui/input"
import { PageTitle } from "#/components/ui/page-title"
import { Panel } from "#/components/ui/panel"
import { PageLayout } from "#/layouts"
import { cn } from "#/lib/utils"
import {
	type EventType,
	getPastEvents,
	getUpcomingEvents,
} from "#/services/events"

export const Route = createFileRoute("/(menu)/events")({
	component: RouteComponent,
	validateSearch: (search: {
		tab?: "upcoming" | "past"
		q?: string
	}) => ({
		// default to upcoming when tab is missing/invalid
		tab: search.tab === "past" ? "past" : "upcoming",
		// keep q only when it's a string; empty string means no filter
		q: typeof search.q === "string" ? search.q : "",
	}),
})

function RouteComponent() {
	const { tab, q } = Route.useSearch() as {
		tab: "upcoming" | "past"
		q: string
	}
	const navigate = Route.useNavigate()

	const activeTab: "upcoming" | "past" = tab
	const pastSearchQuery = q ?? ""

	const {
		data: upcoming = [],
		isLoading: loadingUpcoming,
	} = useQuery({
		queryKey: ["events", "upcoming"],
		queryFn: getUpcomingEvents,
	})
	const { data: past = [], isLoading: loadingPast } =
		useQuery({
			queryKey: ["events", "past"],
			queryFn: getPastEvents,
		})

	const filteredPast = useMemo(() => {
		if (!pastSearchQuery.trim()) return past
		const q = pastSearchQuery.trim().toLowerCase()
		const years = [...q.matchAll(/\b(19|20)\d{2}\b/g)].map(
			(m) => Number.parseInt(m[0], 10),
		)
		const yearFrom =
			years.length >= 2 ? Math.min(...years) : years[0]
		const yearTo =
			years.length >= 2 ? Math.max(...years) : years[0]

		return past.filter((event: EventType) => {
			const title = decodeHtml(event.Title).toLowerCase()
			const location = (event.Location ?? "").toLowerCase()
			const datetimeFormatted = (
				event.DatetimeFormatted ?? ""
			).toLowerCase()

			const matchesTitle = title.includes(q)
			const matchesLocation = location.includes(q)
			const matchesTimeText = datetimeFormatted.includes(q)

			let matchesTimeRange = false
			if (yearFrom != null && !Number.isNaN(yearFrom)) {
				const startYear = new Date(
					event.StartDatetime,
				).getFullYear()
				const endYear = new Date(
					event.EndDatetime,
				).getFullYear()
				if (yearTo != null && !Number.isNaN(yearTo)) {
					matchesTimeRange =
						(startYear >= yearFrom &&
							startYear <= yearTo) ||
						(endYear >= yearFrom && endYear <= yearTo) ||
						(startYear <= yearFrom && endYear >= yearTo)
				} else {
					matchesTimeRange =
						startYear === yearFrom || endYear === yearFrom
				}
			}

			return (
				matchesTitle ||
				matchesLocation ||
				matchesTimeText ||
				matchesTimeRange
			)
		})
	}, [past, pastSearchQuery])

	const events =
		activeTab === "upcoming" ? upcoming : filteredPast
	const loading =
		activeTab === "upcoming" ? loadingUpcoming : loadingPast

	return (
		<PageLayout>
			<PageTitle
				title="Events"
				subtitle="Discover upcoming events and explore our past activities."
			/>

			{/* Tabs */}
			<div className="flex gap-1 rounded-md border-2 border-border bg-background/80 p-1 transition-all duration-300">
				<button
					type="button"
					onClick={() =>
						navigate({
							search: (prev) => ({
								...prev,
								tab: "upcoming",
								// clear search when going back to upcoming
								q: "",
							}),
						})
					}
					className={`flex-1 cursor-pointer rounded px-4 py-2 font-medium text-sm transition-colors ${
						activeTab === "upcoming"
							? "bg-foreground text-background"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					Upcoming
				</button>
				<button
					type="button"
					onClick={() =>
						navigate({
							search: (prev) => ({
								...prev,
								tab: "past",
								// keep existing search text when switching to past
								q: prev.q ?? "",
							}),
						})
					}
					className={`flex-1 cursor-pointer rounded px-4 py-2 font-medium text-sm transition-colors ${
						activeTab === "past"
							? "bg-foreground text-background"
							: "text-muted-foreground hover:text-foreground"
					}`}
				>
					Past
				</button>
			</div>

			{/* Search bar for past events only */}
			{activeTab === "past" && (
				<div>
					<div className="relative">
						<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground peer-focus/search:text-foreground" />
						<Input
							type="search"
							placeholder=" Search by title, location, time, date, and year ranges like 2023–2024"
							value={pastSearchQuery}
							onChange={(e) =>
								navigate({
									search: (prev) => ({
										...prev,
										tab: "past",
										q: e.target.value,
									}),
									replace: true,
								})
							}
							className="peer/search pl-9"
							aria-label="Search past events by title, location, or time range"
						/>
					</div>
				</div>
			)}

			{/* Events list */}
			<div className="space-y-4">
				{loading ? (
					<Panel className="p-8">
						<p className="text-center text-muted-foreground text-sm">
							Loading events…
						</p>
					</Panel>
				) : events.length === 0 ? (
					<Panel className="p-8">
						<p className="text-center text-muted-foreground text-sm">
							{activeTab === "upcoming"
								? "No upcoming events at the moment. Check back soon."
								: pastSearchQuery.trim()
									? "No past events match your search."
									: "No past events to display."}
						</p>
					</Panel>
				) : (
					events.map((event: EventType) => (
						<EventCard
							key={`${event.EventID}-${event.EventDetailsID}`}
							event={event}
						/>
					))
				)}
			</div>
		</PageLayout>
	)
}

function EventCard({ event }: { event: EventType }) {
	const title = decodeHtml(event.Title)
	return (
		<Card>
			<CardContent className="border-border border-b-2 p-6">
				<h3 className="font-bold text-foreground">
					{title}
				</h3>
				<div className="mt-2 flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
					<span className="inline-flex items-center gap-1.5">
						<Calendar className="size-4" />
						{event.DatetimeFormatted}
					</span>
					{event.Location && (
						<span className="inline-flex items-center gap-1.5">
							<MapPin className="size-4" />
							{event.Location}
						</span>
					)}
				</div>
			</CardContent>
			<div
				className="prose prose-sm dark:prose-invert max-w-none p-6 text-muted-foreground [&_a]:text-accent"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: event content from API
				dangerouslySetInnerHTML={{
					__html: event.DangerousDescriptionHTML,
				}}
			/>
			<div className="border-border border-t-2 p-6">
				<a
					href={event.EventURL}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						buttonVariants({
							variant: "secondary",
							size: "sm",
						}),
						"inline-flex items-center gap-2",
					)}
				>
					View / Join event
					<ExternalLink className="size-4" />
				</a>
			</div>
		</Card>
	)
}

function decodeHtml(html: string) {
	const textarea = document.createElement("textarea")
	textarea.innerHTML = html
	return textarea.value
}
