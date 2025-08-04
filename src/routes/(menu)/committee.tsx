import { createFileRoute } from '@tanstack/react-router'
import { CommitteeYears, DefaultBio, DefaultPhoto, Person } from '@/services/committee'
import { Button } from '@/components/ui/button'
import { UsersRound } from 'lucide-react'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { XIcon } from '@/components/icons/XIcon'
import { LinkedinIcon } from '@/components/icons/LinkedinIcon'
import { Link as LucideLink, Globe } from 'lucide-react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'

export const Route = createFileRoute('/(menu)/committee')({
    component: CommitteePage,
})

function CommitteePage() {
    return (
        <div className="relative min-h-screen w-full pt-24 pb-24 md:pt-48 flex flex-col items-center bg-background overflow-hidden">
            <div className="max-w-5xl w-full px-4 md:px-6 flex flex-col flex-1 z-10">
                <div className="mb-8 md:mb-12 text-center flex-shrink-0">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 md:mb-4 text-primary tracking-tight leading-tight flex flex-col md:flex-row items-center justify-center gap-3 drop-shadow-sm">
                        <span className="inline-flex items-center justify-center bg-primary/10 rounded-full p-2">
                            <UsersRound className="inline-block" size={40} />
                        </span>
                        <span className="relative">
                            Committee
                            <span className="block h-1 w-2/3 mx-auto mt-2 rounded-full bg-primary/60" />
                        </span>
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-secondary-foreground max-w-2xl mx-auto font-light mt-2">
                        Meet the CompSoc committee members from recent years.
                    </p>
                </div>
                <div className="flex flex-col gap-16">
                    {CommitteeYears.map((year) => (
                        <div key={year.year} className="flex flex-col gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 text-center tracking-tight relative">
                                <span className="px-4 py-1 bg-primary/10 rounded-lg inline-block">
                                    Committee {year.year}
                                </span>
                            </h3>
                            <div className="w-full [column-count:1] sm:[column-count:2] md:[column-count:3] gap-8 space-y-8">
                                {year.committee?.map((person, idx) => (
                                    <div key={person.name + idx} className="break-inside-avoid">
                                        <CommitteeCard
                                            person={person}
                                            defaultBio={year.default_bio || DefaultBio}
                                            defaultPhoto={year.default_photo || DefaultPhoto}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function getIcon(icon: string) {
    const normalized = icon.toLowerCase().replace(/^bx bxl?-/, '')
    if (normalized.includes('github')) return GithubIcon
    if (normalized.includes('twitter') || normalized === 'x') return XIcon
    if (normalized.includes('linkedin')) return LinkedinIcon
    if (normalized.includes('link') || normalized.includes('website')) return LucideLink
    if (normalized.includes('globe')) return Globe
    return LucideLink
}

function CommitteeCard({
    person,
    defaultBio,
    defaultPhoto,
}: {
    person: Person
    defaultBio: string
    defaultPhoto: string
}) {
    const photo = person.photo && person.photo.trim() ? person.photo : defaultPhoto
    const bio = person.bio && person.bio.trim() ? person.bio : defaultBio
    return (
        <div className="relative group">
            <Card className="relative flex flex-col items-center text-center w-full mx-auto">
                <CardHeader className="flex flex-col items-center p-0 pt-8 pb-2 w-full">
                    <div className="relative mb-3">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
                        <img
                            src={photo}
                            alt={person.name}
                            className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-card/50 ring-2 ring-transparent group-hover:ring-primary/30 group-hover:border-primary/20 transition-all duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-bold mb-0.5 tracking-tight w-full truncate">
                        {person.name}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium mb-1 w-full truncate">
                        {person.position}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-start w-full px-6 py-0">
                    <p className="text-sm font-normal w-full leading-6 sm:leading-relaxed tracking-wide">
                        {bio}
                    </p>
                </CardContent>
                <div className="w-full flex-shrink-0 flex flex-col justify-end">
                    {person.social_links && person.social_links.length > 0 && (
                        <CardFooter className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[90%] flex flex-wrap gap-1 justify-center px-0 pb-0 z-20 bg-transparent">
                            {person.social_links.map((link, idx) => {
                                const icon = Object.keys(link)[0]
                                const url = link[icon]
                                const IconComponent = getIcon(icon)
                                return (
                                    <Button
                                        key={icon + url + idx}
                                        asChild
                                        variant="outline"
                                        className="bg-card/75 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out rounded-full hover:scale-110 shadow-3xl"
                                    >
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title={icon}
                                            className="flex items-center gap-1"
                                        >
                                            <IconComponent className="w-4 h-4" />
                                        </a>
                                    </Button>
                                )
                            })}
                        </CardFooter>
                    )}
                </div>
            </Card>
        </div>
    )
}
