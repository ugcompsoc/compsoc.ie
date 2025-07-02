import { createFileRoute } from '@tanstack/react-router'
import { Mail, Terminal, Server, Database } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/(menu)/account')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="relative min-h-screen w-full pt-24 md:pt-48 pb-24 flex flex-col items-center bg-gradient-to-br from-background to-muted text-foreground">
            <div className="max-w-4xl w-full px-4 md:px-6 flex flex-col flex-1 z-10">
                <div className="mb-8 md:mb-12 text-center flex-shrink-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-primary tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-3 drop-shadow-sm">
                        <span className="inline-flex items-center justify-center bg-primary/10 rounded-full p-2">
                            <Server className="inline-block" size={40} />
                        </span>
                        <span className="relative">
                            CompSoc Account
                            <span className="block h-1 w-2/3 mx-auto mt-2 rounded-full bg-primary/60" />
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-secondary-foreground max-w-2xl mx-auto font-light mt-2">
                        We offer all CompSoc members free access to an account on our servers. This
                        gives you access to:
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 flex-shrink-0">
                    <FeatureCard
                        icon={<Database size={36} className="text-primary" />}
                        title="Storage Space"
                        description="All accounts come provisioned with 5GB server space by default."
                    />
                    <FeatureCard
                        icon={<Terminal size={36} className="text-primary" />}
                        title="SSH Access"
                        description="You will have SSH access to your account, with support for tunnelling if needed."
                    />
                    <FeatureCard
                        icon={<Mail size={36} className="text-primary" />}
                        title="Email"
                        description="CompSoc members will receive their own @compsoc.ie email account."
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full mb-0 flex-shrink-0">
                    <div className="text-sm md:text-lg text-center flex flex-col justify-center items-center py-6 px-2 md:px-6 bg-transparent border-border">
                        If you are a CompSoc member* and would like an account, you can simply go{' '}
                        <a
                            href="https://compsoc.ie/accounts"
                            className="text-accent underline font-medium"
                        >
                            get an account
                        </a>{' '}
                        or alternatively, can email us at{' '}
                        <b className="text-primary">accounts@compsoc.ie</b> with the following
                        information:
                        <ul className="list-disc pl-6 mt-4 text-left text-sm md:text-base">
                            <li>Name</li>
                            <li>University of Galway Email Address</li>
                            <li>University of Galway Student ID</li>
                            <li>Preferred username</li>
                        </ul>
                    </div>
                    <div className="text-sm md:text-lg text-center flex flex-col justify-center items-center py-6 px-2 md:px-6 bg-transparent md:border-l border-border">
                        *To become a CompSoc member, you can{' '}
                        <a
                            href="https://yourspace.nuigalway.ie/"
                            className="text-accent underline font-medium"
                        >
                            login to YourSpace and join
                        </a>{' '}
                        or include a membership request in your email.
                    </div>
                </div>
            </div>
        </div>
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
        <Card className="flex flex-col items-center text-center h-[280px] max-w-xs w-full mx-auto overflow-hidden">
            <CardHeader className="flex flex-col items-center p-0 pt-8 pb-2 w-full">
                <div className="relative mb-3">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                    <span className="relative inline-flex items-center justify-center bg-primary/10 backdrop-blur-sm rounded-full p-3 border border-primary/20 group-hover:border-primary/40 transition-all duration-500 ease-out group-hover:scale-110">
                        {icon}
                    </span>
                </div>
                <CardTitle className="text-lg md:text-xl font-bold mb-0.5 tracking-tight w-full truncate">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-start w-full px-6 pb-8 pt-0">
                <p className="text-sm font-light mb-0 w-full line-clamp-3 min-h-[48px] leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
