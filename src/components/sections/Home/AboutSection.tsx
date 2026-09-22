import { Link } from "@tanstack/react-router"
import { useEffect, useRef } from "react"
import uog2 from "#/assets/img/university/UoG2.jpg?format=webp&w=640;1024;1400&as=img"
import uog3 from "#/assets/img/university/UoG3.jpg?format=webp&w=480;768;1000&as=img"
import uog4 from "#/assets/img/university/UoG4.jpg?format=webp&w=480;768;1000&as=img"
import { sectionStyle } from "#/constants/section-variants"
import { useActiveSection } from "#/contexts/active-section"

type SectionMotionProps = {
	activeVariant: { borderColor: string; opacity: number }
	inactiveVariant: { borderColor: string; opacity: number }
	transition: {
		duration: number
		ease: [number, number, number, number]
	}
}

const AboutSection = ({
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
	const active = activeSectionId === "about"

	useEffect(
		() => registerSection("about", sectionRef),
		[registerSection],
	)

	return (
		<section
			ref={sectionRef}
			className="relative z-10 mb-4 w-full px-4"
			onTouchEnd={() => setTapOverride("about")}
		>
			<div
				className="overflow-hidden rounded-md border-2 border-border"
				style={sectionStyle(
					active,
					activeVariant,
					inactiveVariant,
					transition,
				)}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					<div className="flex flex-col justify-center border-border border-b-2 bg-background p-5 md:border-r-2 md:p-8">
						<h2 className="mb-3 font-bold text-lg sm:text-xl">
							Who we are
						</h2>
						<p className="text-muted-foreground text-sm leading-7">
							CompSoc is University of Galway's Computer and
							Networking Society. We host events for
							everything computing related from how to setup
							your own blog to System Administration and
							Programming Tutorials. We also host a number
							of services on our Society run servers for our
							members. CompSoc is the oldest
							computer-related society in Ireland, while
							many Alumni believe it was much earlier, was
							formally established in 1977 during the days
							that the University was known as UCG.
						</p>
					</div>

					<div className="relative border-border border-b-2 bg-background md:col-span-2">
						<div className="aspect-4/3 md:absolute md:inset-0 md:aspect-auto">
							<img
								src={uog2.src}
								srcSet={uog2.srcset}
								sizes="(min-width: 1024px) 66vw, 100vw"
								width={uog2.w}
								height={uog2.h}
								alt="University of Galway campus"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
						<div
							className="pointer-events-none absolute inset-0 bg-black/10"
							aria-hidden
						/>
					</div>

					<div className="relative hidden border-border border-b-2 bg-background md:flex md:border-r-2">
						<div className="aspect-4/3 md:absolute md:inset-0 md:aspect-auto">
							<img
								src={uog3.src}
								srcSet={uog3.srcset}
								sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
								width={uog3.w}
								height={uog3.h}
								alt="University of Galway"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
					</div>

					<div className="flex flex-col justify-center border-border border-b-2 bg-background p-5 md:border-r-2 md:p-8">
						<h2 className="mb-3 font-bold text-lg sm:text-xl">
							Our mission
						</h2>
						<p className="text-muted-foreground text-sm leading-7">
							CompSoc's main goal is to try and foster a
							love and passion for all things technology
							related in University of Galway. We host a
							wide variety of events to work towards this
							goal, including workshops about Linux,
							hardware and programming. Our aims is to
							"promote and increase awareness of electronic
							communication and related computer systems, a
							forum to discuss and gain experience in
							computer networking and systems and to help
							educate people in the usage of Internet
							utilities and resources".
						</p>
					</div>

					<div className="relative border-border border-b-2 bg-background">
						<div className="aspect-4/3 md:absolute md:inset-0 md:aspect-auto">
							<img
								src={uog4.src}
								srcSet={uog4.srcset}
								sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
								width={uog4.w}
								height={uog4.h}
								alt="University of Galway"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
						<div
							className="pointer-events-none absolute inset-0 bg-black/20"
							aria-hidden
						/>
					</div>
					<div className="relative border-border border-b-2 bg-background md:col-span-2">
						<div className="aspect-4/3 md:absolute md:inset-0 md:aspect-auto">
							<img
								src={uog2.src}
								srcSet={uog2.srcset}
								sizes="(min-width: 1024px) 66vw, 100vw"
								width={uog2.w}
								height={uog2.h}
								alt="University of Galway campus"
								loading="lazy"
								decoding="async"
								className="h-full w-full object-cover"
							/>
						</div>
						<div
							className="pointer-events-none absolute inset-0 bg-black/10"
							aria-hidden
						/>
					</div>
					<div className="bg-background p-5 md:col-span-1 md:min-h-64 md:p-8">
						<h2 className="mb-2 font-bold text-lg sm:text-xl">
							Our constitution
						</h2>
						<p className="text-muted-foreground text-sm leading-7">
							You can{" "}
							<Link
								className="font-semibold text-accent underline underline-offset-2 transition-colors hover:text-accent/80"
								to="/constitution/"
							>
								read the CompSoc constitution
							</Link>
							, as ratified by the USCG (
							<span className="italic">
								"University Societies Coordination Group"
							</span>
							) on 27th May, 2022.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AboutSection
