import { createFileRoute } from "@tanstack/react-router"
import { Database, Mail, Terminal } from "lucide-react"
import { Card, CardContent } from "#/components/ui/card"
import { PageTitle } from "#/components/ui/page-title"
import { Panel } from "#/components/ui/panel"
import { PageLayout } from "#/layouts"
import { seo } from "#/lib/seo"

export const Route = createFileRoute("/(menu)/account")({
	component: RouteComponent,
	head: () =>
		seo({
			title: "Member Accounts | CompSoc",
			description:
				"Every CompSoc member gets a free account on our servers, with 5GB of storage, SSH access and email.",
			path: "/account",
		}),
})

function RouteComponent() {
	return (
		<PageLayout>
			<PageTitle
				title="CompSoc Account"
				subtitle="We offer all CompSoc members free access to an account on our servers."
			/>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<FeatureCard
					icon={<Database className="size-9 text-accent" />}
					title="Storage Space"
					description="All accounts come provisioned with 5GB server space by default."
				/>
				<FeatureCard
					icon={<Terminal className="size-9 text-accent" />}
					title="SSH Access"
					description="You will have SSH access to your account, with support for tunnelling if needed."
				/>
				<FeatureCard
					icon={<Mail className="size-9 text-accent" />}
					title="Email"
					description="CompSoc members will receive their own @compsoc.ie email account."
				/>
			</div>
			<Panel>
				<div className="grid grid-cols-1 border-border border-b-2 md:grid-cols-2 md:border-r-2 md:border-b-0">
					<div className="flex flex-col justify-center p-6 md:p-8">
						<p className="text-muted-foreground text-sm leading-7">
							If you are a CompSoc member* and would like an
							account, you can simply go{" "}
							<a
								href="https://compsoc.ie/accounts"
								className="font-medium text-accent underline underline-offset-2 hover:text-accent/80"
							>
								get an account
							</a>{" "}
							or email us at{" "}
							<span className="font-semibold text-foreground">
								accounts@compsoc.ie
							</span>{" "}
							with:
						</p>
						<ul className="mt-3 list-disc pl-5 text-muted-foreground text-sm">
							<li>Name</li>
							<li>University of Galway Email Address</li>
							<li>University of Galway Student ID</li>
							<li>Preferred username</li>
						</ul>
					</div>
					<div className="flex flex-col justify-center border-border border-t-2 p-6 md:border-t-0 md:border-t-0 md:border-l-0 md:border-l-2">
						<p className="text-muted-foreground text-sm leading-7">
							*To become a CompSoc member,{" "}
							<a
								href="https://yourspace.universityofgalway.ie/account/index.php?object=VXNlck9yZ2FuaXNhdGlvbk1lbWJlcg==&method=am9pbk9yZ2FuaXNhdGlvblZpZXc=&action=Nw==&actionType=YWRk"
								className="font-medium text-accent underline underline-offset-2 hover:text-accent/80"
							>
								login to YourSpace and join
							</a>{" "}
							or include a membership request in your email.
						</p>
					</div>
				</div>
			</Panel>
		</PageLayout>
	)
}

function FeatureCard({
	icon,
	title,
	description,
}: {
	icon: React.ReactNode
	title: string
	description: string
}) {
	return (
		<Card className="flex flex-col items-center text-center">
			<CardContent className="flex flex-col items-center text-center">
				<span className="mb-3 inline-flex items-center justify-center transition-transform duration-300 group-hover/card:scale-110">
					{icon}
				</span>
				<h2 className="mb-2 font-bold text-lg">{title}</h2>
				<p className="text-muted-foreground text-sm leading-6">
					{description}
				</p>
			</CardContent>
		</Card>
	)
}
