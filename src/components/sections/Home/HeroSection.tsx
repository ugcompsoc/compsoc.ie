import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import heroImg from "#/assets/img/university/UoG.jpg?format=webp&w=400"
import { DiscordIcon } from "#/components/icons/DiscordIcon"
import { InstagramIcon } from "#/components/icons/InstagramIcon"
import { buttonVariants } from "#/components/ui/button"
import { useActiveSection } from "#/contexts/active-section"
import { useTypewriter } from "#/hooks/useTypewriter"
import { cn } from "#/lib/utils"

type SectionMotionProps = {
	activeVariant: { borderColor: string; opacity: number }
	inactiveVariant: { borderColor: string; opacity: number }
	transition: {
		duration: number
		ease: [number, number, number, number]
	}
}

const HeroSection = ({
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
	const active = activeSectionId === "hero"

	useEffect(
		() => registerSection("hero", sectionRef),
		[registerSection],
	)

	const strarray = [
		"Computer",
		"Developer",
		"Technology",
		"AI",
		"Cybersecurity",
	]
	const text = useTypewriter(strarray, 75, 1000, active)

	return (
		<section
			ref={sectionRef}
			className="relative flex h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden"
			onTouchEnd={() => setTapOverride("hero")}
		>
			{/* Background photo clipped in a rounded window */}
			<div className="absolute top-[calc(50%)] left-1/2 z-0 h-[calc(100%-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2">
				<div className="relative h-full w-full overflow-hidden rounded-md">
					<img
						src={heroImg}
						alt=""
						aria-hidden
						className="pointer-events-none absolute top-1/2 left-1/2 min-h-full w-3xl min-w-full -translate-x-1/2 -translate-y-1/2 select-none object-cover opacity-40"
					/>
				</div>
			</div>

			{/* Hero content */}
			<div className="relative z-20 flex w-fit max-w-3xl flex-col justify-center gap-4">
				<h1 className="flex w-fit flex-col font-bold text-[36px]/10 md:flex-row md:text-5xl">
					<span>
						University of
						<span className="hidden md:inline">&nbsp;</span>
					</span>
					<span>Galway's</span>
				</h1>

				<p className="flex flex-wrap items-center gap-x-0.5 text-xl md:text-2xl">
					<span className="relative">
						{text.split("").map((char, i) => (
							<span
								key={`${String(i).padStart(3, "0")}-${char}`}
								className="relative inline-block"
							>
								{char === " " ? (
									<span>&nbsp;</span>
								) : (
									<span>{char}</span>
								)}
							</span>
						))}
					</span>
					<span
						className="ml-px inline-block h-[1em] w-[0.5em] align-middle text-foreground"
						style={
							active
								? {
										backgroundColor: "currentColor",
									}
								: {
										border: "2px solid currentColor",
										backgroundColor: "transparent",
									}
						}
					/>
					<span> Society</span>
				</p>
				<div className="mt-4 flex items-center gap-2">
					<a
						href="https://socs.universityofgalway.ie/societies/compsoc"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"group/join relative inline-flex h-[42px] w-fit items-center",
							"overflow-hidden rounded-md",
							"px-4 py-2 text-accent-foreground shadow-xs",
							"transition-[box-shadow,color]",
							"hover:text-primary-foreground hover:shadow-xs",
						)}
					>
						{/* Pulsing glow behind accent fill */}
						<span
							aria-hidden
							className="absolute inset-0.5 animate-glow-border rounded-md bg-border-accent"
						/>
						{/* Accent fill, 2px inset from button edge */}
						<span
							aria-hidden
							className="absolute inset-0.5 rounded-sm bg-accent"
						/>
						{/* Primary sliding rectangle, full button bounds */}
						<span
							aria-hidden
							className={cn(
								"absolute inset-0 w-full origin-top-left bg-primary",
								"-translate-x-full skew-x-[-20deg]",
								"transition-transform duration-350 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
								"group-hover/join:translate-x-[-1%]",
							)}
						/>
						<span className="relative z-10">
							Join the society
						</span>
					</a>
					<a
						href="https://instagram.com/compsocgalway/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "icon-lg",
							}),
							"bg-background/80 backdrop-blur-sm",
						)}
					>
						<InstagramIcon className="size-4" />
					</a>
					<a
						href="https://discord.compsoc.ie/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Discord"
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "icon-lg",
							}),
							"bg-background/80 backdrop-blur-sm",
						)}
					>
						<DiscordIcon className="size-4" />
					</a>
				</div>
			</div>
			{/* Terminal window */}
			<div className="absolute top-[calc(50%)] left-1/2 z-10 h-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2">
				<div
					className="absolute inset-0 z-0 rounded-md backdrop-blur-xs"
					aria-hidden
				/>
				{/* terminal prompt */}
				<p className="absolute top-4 left-4 z-20 text-sm md:top-5 md:left-5 md:text-base">
					<span className="text-accent">~ ❯</span> compsoc
				</p>
				<motion.div
					className="relative z-10 h-full w-[calc(100vw-2rem)] overflow-hidden rounded-md border-2 bg-background/70 px-3.5 py-3 shadow-2xl md:px-5 md:py-4"
					animate={active ? activeVariant : inactiveVariant}
					transition={transition}
				></motion.div>
			</div>
		</section>
	)
}

export default HeroSection
