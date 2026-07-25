import { motion } from "motion/react"
import { useEffect, useRef } from "react"
import { sectionVariants } from "#/constants/section-variants"
import { useActiveSection } from "#/contexts/active-section"

export function Footer({
	currentPath = "/",
}: {
	currentPath?: string
}) {
	const footerRef = useRef<HTMLElement>(null)
	const {
		activeSectionId,
		registerSection,
		setFooterHovered,
		setTapOverride,
	} = useActiveSection()
	const active = activeSectionId === "footer"
	const isHomePage = currentPath === "/"

	useEffect(
		() => registerSection("footer", footerRef),
		[registerSection],
	)

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover only for active-section state, not a control
		<footer
			ref={footerRef}
			className={`w-full px-4 pb-4 ${!isHomePage ? "mx-auto max-w-6xl" : ""}`}
			onMouseEnter={() => setFooterHovered(true)}
			onMouseLeave={() => setFooterHovered(false)}
			onTouchEnd={() => setTapOverride("footer")}
		>
			<motion.div
				className="mx-auto overflow-hidden rounded-md border-2 border-border bg-background/80 px-4 py-5 shadow-2xl md:px-6 md:py-5"
				animate={
					active
						? sectionVariants.active
						: sectionVariants.inactive
				}
				transition={sectionVariants.transition}
			>
				<div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
					<img
						src="/assets/img/university/universityofgalway.jpg"
						alt="University of Galway"
						className="h-10 w-auto object-contain"
					/>
					<p className="text-muted-foreground text-sm">
						© Copyright University of Galway Computer
						Society
					</p>
				</div>
			</motion.div>
		</footer>
	)
}
