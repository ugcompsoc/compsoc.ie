import { createFileRoute } from "@tanstack/react-router"
import AboutSection from "#/components/sections/Home/AboutSection"
import HeroSection from "#/components/sections/Home/HeroSection"
import InfographicSection from "#/components/sections/Home/InfographicSection"
import { sectionVariants } from "#/constants/section-variants"
import { DEFAULT_TITLE, seo } from "#/lib/seo"

export const Route = createFileRoute("/")({
	component: HomePage,
	head: () =>
		seo({
			title: DEFAULT_TITLE,
			path: "/",
		}),
})

function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center bg-background text-foreground">
			<HeroSection
				activeVariant={sectionVariants.active}
				inactiveVariant={sectionVariants.inactive}
				transition={sectionVariants.transition}
			/>
			<AboutSection
				activeVariant={sectionVariants.active}
				inactiveVariant={sectionVariants.inactive}
				transition={sectionVariants.transition}
			/>
			<InfographicSection
				activeVariant={sectionVariants.active}
				inactiveVariant={sectionVariants.inactive}
				transition={sectionVariants.transition}
			/>
		</div>
	)
}
