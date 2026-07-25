import { createFileRoute } from "@tanstack/react-router"
import { Globe, Link as LucideLink } from "lucide-react"
import { useState } from "react"
import { GithubIcon } from "#/components/icons/GithubIcon"
import { LinkedinIcon } from "#/components/icons/LinkedinIcon"
import {
	Button,
	buttonVariants,
} from "#/components/ui/button"
import { Card, CardContent } from "#/components/ui/card"
import { PageTitle } from "#/components/ui/page-title"
import { PageLayout } from "#/layouts"
import { cn } from "#/lib/utils"
import {
	CommitteeYears,
	DefaultBio,
	DefaultPhoto,
	type Person,
} from "#/services/committee"

export const Route = createFileRoute("/(menu)/committee")({
	component: CommitteePage,
})

const ALL_YEARS = null as string | null

function CommitteePage() {
	const [selectedYear, setSelectedYear] = useState<
		string | null
	>(ALL_YEARS)

	const years = CommitteeYears.map((year) => year.year)
	const visibleYears =
		selectedYear === null
			? CommitteeYears
			: CommitteeYears.filter(
					(year) => year.year === selectedYear,
				)

	return (
		<PageLayout>
			<PageTitle
				title="Committee"
				subtitle="Meet the CompSoc committee members from recent years."
			/>
			<div className="flex flex-wrap gap-2">
				<Button
					variant={
						selectedYear === null ? "default" : "outline"
					}
					size="sm"
					data-active={
						selectedYear === null ? true : undefined
					}
					onClick={() => setSelectedYear(ALL_YEARS)}
					className="px-3"
				>
					All
				</Button>
				{years.map((year) => (
					<Button
						key={year}
						variant={
							selectedYear === year ? "default" : "outline"
						}
						size="sm"
						data-active={selectedYear === year || undefined}
						onClick={() => setSelectedYear(year)}
						className="px-3"
					>
						{year}
					</Button>
				))}
			</div>
			<div className="flex flex-col gap-4">
				{visibleYears.map((year) => (
					<div
						key={year.year}
						className="flex flex-col gap-4"
					>
						<h2 className="font-bold text-foreground text-xl md:text-2xl">
							Committee {year.year}
						</h2>
						<div
							className="columns-1 sm:columns-2 md:columns-3"
							style={{ columnGap: "1rem" }}
						>
							{year.committee?.map((person) => (
								<CommitteeCard
									key={person.name}
									person={person}
									defaultBio={
										year.default_bio || DefaultBio
									}
									defaultPhoto={
										year.default_photo || DefaultPhoto
									}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</PageLayout>
	)
}

function getIcon(icon: string) {
	const normalized = icon
		.toLowerCase()
		.replace(/^bx bxl?-/, "")
	if (normalized.includes("github")) return GithubIcon
	if (normalized.includes("linkedin")) return LinkedinIcon
	if (
		normalized.includes("link") ||
		normalized.includes("website")
	)
		return LucideLink
	if (normalized.includes("globe")) return Globe
	return LucideLink
}

function CommitteeCard({
	person,
	defaultBio,
	defaultPhoto,
}: {
	person: Person
	defaultBio: string
	defaultPhoto: string
}) {
	const photo = person.photo?.trim()
		? person.photo
		: defaultPhoto
	const bio = person.bio?.trim() ? person.bio : defaultBio
	return (
		<Card className="mb-4 flex break-inside-avoid flex-col items-center text-center">
			<CardContent className="flex flex-col items-center p-6">
				<img
					src={photo}
					alt={person.name}
					className="mb-3 size-24 rounded-full border-2 border-border object-cover transition-colors duration-300 group-hover/card:border-foreground/30 md:size-28"
					loading="lazy"
				/>
				<h3 className="font-bold text-foreground">
					{person.name}
				</h3>
				<p className="mb-3 text-muted-foreground text-sm">
					{person.position}
				</p>
				<p className="text-muted-foreground text-sm leading-6">
					{bio}
				</p>
			</CardContent>
			{person.social_links &&
				person.social_links.length > 0 && (
					<div className="flex flex-wrap justify-center gap-2 border-border border-t-2 p-4">
						{person.social_links.map((link) => {
							const icon = Object.keys(link)[0]
							const url = link[icon]
							const IconComponent = getIcon(icon)
							return (
								<a
									key={`${icon}-${url}`}
									href={url}
									target="_blank"
									rel="noopener noreferrer"
									title={icon}
									aria-label={icon}
									className={cn(
										buttonVariants({
											variant: "outline",
											size: "sm",
										}),
										"rounded-full",
									)}
								>
									<IconComponent className="size-4" />
								</a>
							)
						})}
					</div>
				)}
		</Card>
	)
}
