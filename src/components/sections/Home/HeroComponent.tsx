import { motion } from "motion/react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const HeroComponent = () => {
	const strarray = [
		"Computer",
		"Developer",
		"Technology",
		"Artificial Intelligence",
		"Cybersecurity",
		"Computer",
	];
	const text = useTypewriter(strarray, 100, 1000);
	return (
		<section
			className={cn(
				"bg-transperent bg-center bg-cover relative flex justify-center items-center w-full h-screen md:h-screen",
				"before:bg-black/30 before:absolute before:w-screen before:h-full before:inset-0",
			)}
		>
			<div className="relative px-4 w-full items-center flex flex-col max-w-4xl">
				<div>
					<h1 className='text-white w-fit text-4xl sm:text-5xl lg:text-6xl font-["Raleway",_sans-serif] font-bold mb-2 md:mb-4'>
						University Of Galway's
					</h1>
					<p className='text-white text-lg sm:text-2xl lg:text-3xl font-["Poppins",_sans-serif] flex flex-row justify-start items-center'>
						<motion.span
							animate={{
								opacity: [0, 1],
							}}
							transition={{ duration: 0.3 }}
							className="inline-flex"
						>
							<span className="relative">
								{text.split("").map((char, index) => (
									<span key={index} className="relative inline-block">
										{char === " " ? (
											<>
												<span>&nbsp;</span>
											</>
										) : (
											<>{char}</>
										)}
										<span className="absolute bottom-[-0.25rem] left-0 w-full h-0.5 bg-accent"></span>
									</span>
								))}
							</span>
							<motion.span
								className="relative h-fit inline-block"
								animate={{
									opacity: [0, 1, 0],
								}}
								transition={{
									duration: 0.8,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
								}}
							>
								<span>|</span>
								<span className="absolute bottom-[-0.25rem] left-0 w-full h-0.5 bg-accent"></span>
							</motion.span>
						</motion.span>
						<span> Society</span>
					</p>
				</div>
			</div>

			{/* Scroll Indicator */}
			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				animate={{
					y: [0, 10, 0],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			>
				<div className="flex flex-col items-center gap-1">
					<span className="text-sm font-medium text-accent-foreground">
						Keep scrolling
					</span>
					<ChevronDown className="w-6 h-6 text-accent" />
				</div>
			</motion.div>
		</section>
	);
};

export default HeroComponent;
