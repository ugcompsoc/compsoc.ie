import { Card, CardContent } from "@/components/ui/card";

const SponsorsComponent = () => {
	return (
		<section className="flex flex-col w-full items-center py-8 md:py-12 relative px-4 md:px-6">
			<div className="flex flex-col gap-8 md:gap-12 max-w-4xl w-full z-10">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-secondary-foreground mb-2 md:mb-4 text-center">
					Our sponsors
					<span className="block h-1 w-16 sm:w-20 md:w-24 mx-auto mt-2 md:mt-3 rounded-full bg-secondary" />
				</h1>

				<div className="flex flex-col gap-6 md:gap-8">
					<div className="flex flex-col gap-2 md:gap-3">
						<h2 className="text-xl sm:text-2xl text-secondary-foreground font-bold relative mb-1 text-left">
							Supporting our community
							<span className="block h-0.5 w-12 sm:w-13 mt-2 rounded-full bg-secondary mx-0" />
						</h2>
						<p className="text-base text-muted-foreground font-normal leading-7 sm:leading-relaxed tracking-wide">
							We're grateful to our sponsors who help make our events and
							services possible. Their support enables us to provide valuable
							resources and opportunities to our members.
						</p>
					</div>

					{/* Sponsors Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
						{/* DataCamp Sponsor */}
						<Card className="group hover:shadow-lg transition-all duration-300 ease-out border border-border/50 hover:border-primary/20">
							<CardContent className="flex flex-col items-center justify-center p-6 md:p-8 text-center">
								<a
									href="https://www.datacamp.com/donates"
									target="_blank"
									rel="noopener noreferrer"
									className="group-hover:scale-105 transition-transform duration-300 flex  justify-center items-center ease-out relative"
								>
									<div className="relative px-4 py-2">
										<div className="rounded-lg absolute top-0 bg-[#05192d] left-0 -z-1 w-full h-full" />
										<img
											src="/assets/img/datacamp_donates.png"
											alt="DataCamp Donates"
											className="relative w-full h-full object-contain rounded-lg"
										/>
									</div>
								</a>
								<div className="mt-4">
									<h3 className="text-lg font-semibold text-foreground mb-2">
										DataCamp Donates
									</h3>
									<p className="text-sm text-muted-foreground">
										Supporting education through free access to data science
										courses
									</p>
								</div>
							</CardContent>
						</Card>

						{/* Placeholder for future sponsors */}
						<Card className="group hover:shadow-lg transition-all duration-300 ease-out border border-border/50 hover:border-primary/20 opacity-50">
							<CardContent className="flex flex-col items-center justify-center p-6 md:p-8 text-center min-h-[200px]">
								<div className="flex flex-col items-center gap-4">
									<div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
										<span className="text-2xl text-muted-foreground">+</span>
									</div>
									<div>
										<h3 className="text-lg font-semibold text-muted-foreground mb-2">
											Your company here
										</h3>
										<p className="text-sm text-muted-foreground">
											Interested in sponsoring CompSoc?
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Contact section */}
					<div className="flex flex-col gap-2 md:gap-3">
						<h2 className="text-xl sm:text-2xl text-secondary-foreground font-bold relative mb-1 text-left">
							Interested in sponsoring?
							<span className="block h-0.5 w-10 sm:w-11 mt-2 rounded-full bg-secondary mx-0" />
						</h2>
						<p className="text-base text-muted-foreground font-normal leading-7 sm:leading-relaxed tracking-wide">
							We're always looking for partners who share our passion for
							technology education. If you're interested in sponsoring CompSoc
							events or services, please{" "}
							<a
								href="/contact"
								className="text-accent underline hover:text-accent/80 transition-colors duration-200"
							>
								get in touch
							</a>{" "}
							with our committee.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SponsorsComponent;
