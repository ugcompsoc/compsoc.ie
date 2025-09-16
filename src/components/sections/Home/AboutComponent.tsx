import { Link } from "@tanstack/react-router";

const AboutComponent = () => {
	return (
		<section
			id="about"
			className="flex flex-col w-full items-center py-8 md:py-12 relative px-4 md:px-6"
		>
			<div className="flex flex-col gap-8 md:gap-12 max-w-4xl w-full z-10">
				<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-secondary-foreground mb-2 md:mb-4 text-center">
					About us
					<span className="block h-1 w-16 sm:w-20 md:w-24 mx-auto mt-2 md:mt-3 rounded-full bg-secondary" />
				</h1>
				<div className="flex flex-col gap-8 md:gap-12">
					<div className="flex flex-col gap-2 md:gap-3">
						<h2 className="text-xl sm:text-2xl text-secondary-foreground font-bold relative mb-1 text-left">
							Who we are
							<span className="block h-0.5 w-12 sm:w-13 mt-2 rounded-full bg-secondary mx-0" />
						</h2>
						<p className="text-base text-muted-foreground font-normal leading-7 sm:leading-relaxed tracking-wide">
							CompSoc is University of Galway's Computer and Networking Society.
							We host events for everything computing related from how to setup
							your own blog to System Administration and Programming Tutorials.
							We also host a number of services on our Society run servers for
							our members. CompSoc is the oldest computer-related society in
							Ireland, while many Alumni believe it was much earlier, was
							formally established in 1977 during the days that the University
							was known as UCG.
						</p>
					</div>
					<div className="flex flex-col gap-2 md:gap-3">
						<h2 className="text-xl sm:text-2xl text-secondary-foreground font-bold relative mb-1 text-left">
							Our mission
							<span className="block h-0.5 w-10 sm:w-11 mt-2 rounded-full bg-secondary mx-0" />
						</h2>
						<p className="text-base text-muted-foreground font-normal leading-7 sm:leading-relaxed tracking-wide">
							CompSoc's main goal is to try and foster a love and passion for
							all things technology related in University of Galway. We host a
							wide variety of events to work towards this goal, including
							workshops about Linux, hardware and programming. As outlined under
							our Constitution, our aims is to "promote and increase awareness
							of electronic communication and related computer systems, a forum
							to discuss and gain experience in computer networking and systems
							and to help educate people in the usage of Internet utilities and
							resources".
						</p>
					</div>
					<div className="flex flex-col gap-2 md:gap-3">
						<h2 className="text-xl sm:text-2xl text-secondary-foreground font-bold relative mb-1 text-left">
							Our constitution
							<span className="block h-0.5 w-10 sm:w-11 mt-2 rounded-full bg-secondary mx-0" />
						</h2>
						<p className="text-base text-muted-foreground font-normal leading-7 sm:leading-relaxed tracking-wide">
							You can find our constitution{" "}
							<b>
								<Link className="text-accent underline" to="/constitution">
									here
								</Link>
							</b>
							, as ratified by the USCG (
							<i>"University Societies Coordination Group"</i>) on 27th May,
							2022.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutComponent;
