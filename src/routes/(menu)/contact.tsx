import { createFileRoute } from "@tanstack/react-router"
import {
	Check,
	Copy,
	ExternalLink,
	Mail,
	MapPin,
} from "lucide-react"
import { useCallback, useRef, useState } from "react"
import { DiscordIcon } from "#/components/icons/DiscordIcon"
import { InstagramIcon } from "#/components/icons/InstagramIcon"
import { buttonVariants } from "#/components/ui/button"
import { PageTitle } from "#/components/ui/page-title"
import { Panel } from "#/components/ui/panel"
import { PageLayout } from "#/layouts"
import { cn } from "#/lib/utils"

export const Route = createFileRoute("/(menu)/contact")({
	component: ContactPage,
})

/** Matches Card hover on events/committee; md+ only so touch devices stay calm. */
const sectionPanelHover =
	"md:transition-all md:duration-300 md:hover:border-border-accent md:hover:shadow-foreground/5 md:hover:shadow-md"

function ContactPage() {
	return (
		<PageLayout>
			<PageTitle
				title="Get in touch"
				subtitle="Connect with our community, attend events, and become part of CompSoc."
			/>

			<Panel className={sectionPanelHover}>
				<div className="border-border border-b-2 p-6">
					<h2 className="flex items-center gap-2 font-semibold text-foreground">
						<MapPin className="size-5 text-accent" />
						Our location
					</h2>
					<p className="mt-1 text-muted-foreground text-sm">
						Áras na Mac Léinn, University of Galway
					</p>
				</div>
				<div className="w-full">
					<iframe
						title="Our location"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1192.8049748746676!2d-9.060928941645427!3d53.27860804875015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b96f199468d6b%3A0x38d894c0eee8ab25!2sNUI%20Galway%20Computer%20Society!5e0!3m2!1sen!2sie!4v1600623742256!5m2!1sen!2sie"
						className="h-64 w-full md:h-80"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
				</div>
				<div className="border-border border-t-2 p-6">
					<a
						href="https://maps.google.com/?q=University+of+Galway"
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							buttonVariants({
								variant: "outline",
								size: "sm",
							}),
							"inline-flex items-center gap-2",
						)}
					>
						View on Maps
						<ExternalLink className="size-4" />
					</a>
				</div>
			</Panel>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<Panel className={sectionPanelHover}>
					<div className="border-border border-b-2 p-6">
						<h2 className="flex items-center gap-2 font-semibold text-foreground">
							<Mail className="size-5 text-accent" />
							Contact & social
						</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							Get in touch via email or follow us on social
							media.
						</p>
					</div>
					<div className="space-y-4 p-6">
						<div>
							<h3 className="font-medium text-foreground">
								Email us
							</h3>
							<p className="mt-1 text-muted-foreground text-sm">
								Send us an email and we&apos;ll get back to
								you as soon as possible.
							</p>
							<CopyEmailButton />
						</div>
						<div>
							<h3 className="font-medium text-foreground">
								Follow us
							</h3>
							<p className="mt-1 text-muted-foreground text-sm">
								Stay updated with news and announcements.
							</p>
							<div className="mt-3 flex gap-2">
								<a
									href="https://instagram.com/compsocgalway/"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram"
									className={cn(
										buttonVariants({
											variant: "outline",
											size: "icon",
										}),
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
											size: "icon",
										}),
										"pl-0.25",
									)}
								>
									<DiscordIcon className="size-4" />
								</a>
							</div>
						</div>
						<div>
							<h3 className="font-medium text-foreground">
								Join us
							</h3>
							<p className="mt-1 text-muted-foreground text-sm">
								Become a member through YourSpace to access
								events, services, and our community.
							</p>
							<a
								href="https://socs.universityofgalway.ie/societies/compsoc"
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									buttonVariants({
										variant: "outline",
										size: "sm",
									}),
									"mt-2 inline-flex items-center gap-2",
								)}
							>
								Join on YourSpace
								<ExternalLink className="size-4" />
							</a>
						</div>
					</div>
				</Panel>

				<Panel className={sectionPanelHover}>
					<div className="border-border border-b-2 p-6">
						<h2 className="flex items-center gap-2 font-semibold text-foreground">
							<InstagramIcon className="size-5 text-accent" />
							Latest on Instagram
						</h2>
						<p className="mt-1 text-muted-foreground text-sm">
							Photos and updates from our community.
						</p>
					</div>
					<div className="p-4 md:p-6">
						<div className="overflow-hidden rounded-md border border-border bg-background">
							<iframe
								title="CompSoc Galway on Instagram"
								src="https://www.instagram.com/compsocgalway/embed/"
								className="h-[min(540px,75vh)] w-full border-0"
								loading="lazy"
								allow="clipboard-write; encrypted-media; picture-in-picture"
								referrerPolicy="strict-origin-when-cross-origin"
							/>
						</div>
						<a
							href="https://www.instagram.com/compsocgalway/"
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								buttonVariants({
									variant: "outline",
									size: "sm",
								}),
								"mt-4 inline-flex w-full items-center justify-center gap-2 sm:w-auto",
							)}
						>
							<InstagramIcon className="size-4" />
							Open on Instagram
							<ExternalLink className="size-4" />
						</a>
					</div>
				</Panel>
			</div>
		</PageLayout>
	)
}

const EMAIL = "compsoc@socs.universityofgalway.ie"

function CopyEmailButton() {
	const [copied, setCopied] = useState(false)
	const timer = useRef<ReturnType<typeof setTimeout>>(null)

	const copy = useCallback(() => {
		navigator.clipboard.writeText(EMAIL)
		setCopied(true)
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => setCopied(false), 2000)
	}, [])

	return (
		<button
			type="button"
			onClick={copy}
			className={cn(
				buttonVariants({ variant: "outline", size: "sm" }),
				"mt-2 inline-flex cursor-pointer items-center gap-2",
			)}
		>
			{EMAIL}
			{copied ? (
				<Check className="size-4 text-accent" />
			) : (
				<Copy className="size-4" />
			)}
		</button>
	)
}
