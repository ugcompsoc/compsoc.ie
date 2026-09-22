import {
	CalendarDays,
	Database,
	UserRoundCog,
	UsersRound,
} from "lucide-react"
import { useEffect, useRef } from "react"
import { sectionStyle } from "#/constants/section-variants"
import { useActiveSection } from "#/contexts/active-section"
import { NumberOfCommitteeMembers } from "#/services/committee-size"

type SectionMotionProps = {
	activeVariant: { borderColor: string; opacity: number }
	inactiveVariant: { borderColor: string; opacity: number }
	transition: {
		duration: number
		ease: [number, number, number, number]
	}
}

const metrics = [
	{
		icon: CalendarDays,
		value: () => new Date().getFullYear() - 1977,
		label: "years established",
	},
	{
		icon: UsersRound,
		value: () => "1,388",
		label: "members and growing",
	},
	{
		icon: UserRoundCog,
		value: () => NumberOfCommitteeMembers,
		label: "committee members",
	},
	{
		icon: Database,
		value: () => "5",
		label: "GB free server space",
	},
]

const InfographicSection = ({
	activeVariant,
	inactiveVariant,
	transition,
}: SectionMotionProps) => {
	const sectionRef = useRef<HTMLElement>(null)
	const {
		activeSectionId,
		registerSection,
		setTapOverride,
	} = useActiveSection()
	const active = activeSectionId === "stats"

	useEffect(
		() => registerSection("stats", sectionRef),
		[registerSection],
	)

	return (
		<section
			ref={sectionRef}
			className="flex w-full flex-col items-center px-4 pb-4"
			onTouchEnd={() => setTapOverride("stats")}
		>
			{/* Single terminal window containing all metrics */}
			<div
				className="flex w-full flex-col overflow-hidden rounded-md border-2 bg-background/80 px-4 py-4 shadow-lg md:py-5"
				style={sectionStyle(
					active,
					activeVariant,
					inactiveVariant,
					transition,
				)}
			>
				<p className="relative text-sm md:text-base">
					<span className="text-accent">~ ❯</span> compsoc
					--stats
				</p>
				<div className="relative flex flex-row items-center justify-center px-6 py-12">
					<div className="grid w-fit grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
						{metrics.map(({ icon: Icon, value, label }) => (
							<div
								key={label}
								className="flex w-fit flex-col items-center justify-center"
							>
								<div className="flex h-content w-content flex-col">
									<div className="relative flex flex-row items-center gap-2.5">
										<span className="mb-0.5 inline-flex h-full items-center justify-center">
											<Icon
												size={26}
												className="text-primary"
											/>
										</span>
										<span className="mb-0.5 font-extrabold text-3xl text-foreground">
											{typeof value() === "number"
												? value()
												: value()}
										</span>
									</div>

									<span className="font-normal text-muted-foreground text-sm tracking-wide">
										{label}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default InfographicSection
