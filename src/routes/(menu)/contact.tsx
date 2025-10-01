import { createFileRoute } from "@tanstack/react-router"
import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { InstagramIcon } from "@/components/icons/InstagramIcon"
import { XIcon } from "@/components/icons/XIcon"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/(menu)/contact")({
	component: ContactPage,
})

function ContactPage() {
	useEffect(() => {
		const script = document.createElement("script")
		script.src = "https://platform.twitter.com/widgets.js"
		script.async = true
		const twitterEmbed = document.querySelector(".twitter-embed")
		if (twitterEmbed) {
			twitterEmbed.appendChild(script)
		}
	}, [])

	return (
		<div className="relative min-h-screen w-full pt-24 md:pt-48 pb-24 flex flex-col items-center bg-gradient-to-br from-background via-background to-muted/20">
			<div className="max-w-6xl w-full px-4 md:px-6 flex flex-col flex-1 z-10">
				{/* Header */}
				<div className="mb-8 md:mb-12 text-center flex-shrink-0">
					<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-primary tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-3 drop-shadow-sm">
						<span className="inline-flex items-center justify-center bg-primary/10 rounded-full p-2">
							<MessageCircle className="inline-block" size={40} />
						</span>
						<span className="relative">
							Get In Touch
							<span className="block h-1 w-2/3 mx-auto mt-2 rounded-full bg-primary/60" />
						</span>
					</h2>
					<p className="text-base md:text-lg lg:text-xl text-secondary-foreground max-w-2xl mx-auto font-light mt-2">
						Connect with our community, attend events, and become part of
						CompSoc.
					</p>
				</div>

				{/* Map Section - Full Width */}
				<div className="mb-12">
					<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden">
						<div className="p-6 border-b border-border/50">
							<h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
								<MapPin className="w-5 h-5 text-primary" />
								Our Location
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Áras na Mac Léinn, University of Galway
							</p>
						</div>
						<div className="p-0">
							<iframe
								title="Our Location"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1192.8049748746676!2d-9.060928941645427!3d53.27860804875015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x485b96f199468d6b%3A0x38d894c0eee8ab25!2sNUI%20Galway%20Computer%20Society!5e0!3m2!1sen!2sie!4v1600623742256!5m2!1sen!2sie"
								className="w-full h-80 md:h-96"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
							/>
						</div>
						<div className="p-6 border-t border-border/50">
							<Button asChild variant="outline" className="w-full md:w-auto">
								<a
									href="https://maps.google.com/?q=University+of+Galway"
									target="_blank"
									rel="noopener noreferrer"
								>
									View on Maps
									<ExternalLink className="w-4 h-4 ml-2" />
								</a>
							</Button>
						</div>
					</div>
				</div>

				{/* Contact Info and Twitter Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Contact Information */}
					<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden">
						<div className="p-6 border-b border-border/50">
							<h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
								<Mail className="w-5 h-5 text-primary" />
								Contact & Social
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Get in touch with us through email or follow us on social media
							</p>
						</div>
						<div className="p-6 space-y-6">
							{/* Email Section */}
							<div className="space-y-3">
								<h4 className="font-medium text-foreground">Email Us</h4>
								<p className="text-sm text-muted-foreground">
									Have questions or want to get in touch? Send us an email and
									we'll get back to you as soon as possible.
								</p>
								<Button asChild variant="outline" className="w-full">
									<a href="mailto:compsoc@socs.universityofgalway.ie">
										compsoc@socs.universityofgalway.ie
										<ExternalLink className="w-4 h-4 ml-2" />
									</a>
								</Button>
							</div>

							{/* Social Media Section */}
							<div className="space-y-3">
								<h4 className="font-medium text-foreground">Follow Us</h4>
								<p className="text-sm text-muted-foreground">
									Stay updated with our latest news, events, and announcements.
								</p>
								<div className="flex gap-3">
									<Button
										asChild
										size="sm"
										variant="outline"
										className="rounded-full"
									>
										<a
											href="https://x.com/UGCompsoc"
											target="_blank"
											rel="noopener noreferrer"
										>
											<XIcon className="w-4 h-4" />
										</a>
									</Button>
									<Button
										asChild
										size="sm"
										variant="outline"
										className="rounded-full"
									>
										<a
											href="https://instagram.com/compsocgalway/"
											target="_blank"
											rel="noopener noreferrer"
										>
											<InstagramIcon className="w-4 h-4" />
										</a>
									</Button>
								</div>
							</div>
						</div>
					</div>

					{/* Twitter Feed */}
					<div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg overflow-hidden">
						<div className="p-6 border-b border-border/50">
							<h3 className="text-lg font-semibold text-foreground flex items-center gap-3">
								<XIcon className="w-5 h-5 text-primary" />
								Latest Updates
							</h3>
							<p className="text-sm text-muted-foreground mt-1">
								Follow us on X (Twitter) for the latest news and updates
							</p>
						</div>
						<div className="p-6">
							<div className="twitter-embed min-h-[300px] flex items-center justify-center">
								<a
									title="Latest Updates"
									className="twitter-timeline"
									data-theme="light"
									data-tweet-limit="3"
									data-chrome="noheader nofooter noborders transparent"
									href="https://x.com/UGCompSoc"
									aria-label="View latest updates from CompSoc Galway on X (formerly Twitter)"
								>
									Latest Updates
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
