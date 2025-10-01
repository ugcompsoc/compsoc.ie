import { CalendarDays, Database, UserRoundCog, UsersRound } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { NumberOfCommitteeMembers } from "../../../services/committee"

const InfographicComponent = () => {
	return (
		<section className="flex flex-col w-full items-center pb-8 px-4 md:px-6">
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-4xl">
				{/* Years established */}
				<Card className="flex flex-col items-center text-center py-6 md:py-8 px-2 md:px-4 group">
					<CardHeader className="flex flex-col items-center p-0 pb-2">
						<div className="relative mb-2 md:mb-3">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
							<span className="relative inline-flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-full p-2 md:p-3 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-out group-hover:scale-110">
								<CalendarDays
									size={28}
									className="md:w-9 md:h-9 text-primary"
								/>
							</span>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col items-center p-0">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300 ease-out">
							{new Date().getFullYear() - 1977}
						</h2>
						<p className="text-sm font-normal tracking-wide">
							<strong>years</strong> established
						</p>
					</CardContent>
				</Card>
				{/* Members */}
				<Card className="flex flex-col items-center text-center py-6 md:py-8 px-2 md:px-4 group">
					<CardHeader className="flex flex-col items-center p-0 pb-2">
						<div className="relative mb-2 md:mb-3">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
							<span className="relative inline-flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-full p-2 md:p-3 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-out group-hover:scale-110">
								<UsersRound size={28} className="md:w-9 md:h-9 text-primary" />
							</span>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col items-center p-0">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300 ease-out">
							1,388
						</h2>
						<p className="text-sm font-normal tracking-wide">
							<strong>members</strong> and growing
						</p>
					</CardContent>
				</Card>
				{/* Committee members */}
				<Card className="flex flex-col items-center text-center py-6 md:py-8 px-2 md:px-4 group">
					<CardHeader className="flex flex-col items-center p-0 pb-2">
						<div className="relative mb-2 md:mb-3">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
							<span className="relative inline-flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-full p-2 md:p-3 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-out group-hover:scale-110">
								<UserRoundCog
									size={28}
									className="md:w-9 md:h-9 text-primary"
								/>
							</span>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col items-center p-0">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300 ease-out">
							{NumberOfCommitteeMembers}
						</h2>
						<p className="text-sm font-normal tracking-wide">
							<strong>committee</strong> members
						</p>
					</CardContent>
				</Card>
				{/* Server space */}
				<Card className="flex flex-col items-center text-center py-6 md:py-8 px-2 md:px-4 group">
					<CardHeader className="flex flex-col items-center p-0 pb-2">
						<div className="relative mb-2 md:mb-3">
							<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
							<span className="relative inline-flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-full p-2 md:p-3 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-out group-hover:scale-110">
								<Database size={28} className="md:w-9 md:h-9 text-primary" />
							</span>
						</div>
					</CardHeader>
					<CardContent className="flex flex-col items-center p-0">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-300 ease-out">
							5
						</h2>
						<p className="text-sm font-normal tracking-wide">
							<strong>GB</strong> free server space
						</p>
					</CardContent>
				</Card>
			</div>
		</section>
	)
}

export default InfographicComponent
