import type * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card"
			className={cn(
				"group relative bg-card/80 backdrop-blur-xl text-card-foreground flex flex-col gap-6 rounded-2xl border border-border/50 py-6 shadow-lg shadow-black/5 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-black/10 hover:border-border/70 hover:bg-card/90 hover:scale-[1.02] hover:-translate-y-1",
				"before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100",
				"after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-primary/5 after:via-transparent after:to-secondary/5 after:opacity-0 after:transition-opacity after:duration-500 after:ease-out hover:after:opacity-100",
				className,
			)}
			{...props}
		/>
	)
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				"relative z-10",
				className,
			)}
			{...props}
		/>
	)
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn(
				"leading-tight font-bold text-lg tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent",
				"transition-all duration-300 ease-out group-hover:from-primary group-hover:to-primary/80",
				className,
			)}
			{...props}
		/>
	)
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn(
				"text-muted-foreground/80 text-sm leading-relaxed font-medium",
				"transition-all duration-300 ease-out group-hover:text-muted-foreground",
				className,
			)}
			{...props}
		/>
	)
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				"relative z-10",
				className,
			)}
			{...props}
		/>
	)
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn(
				"px-6 relative z-10",
				"transition-all duration-300 ease-out",
				className,
			)}
			{...props}
		/>
	)
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				"flex items-center px-6 [.border-t]:pt-6",
				"relative z-10",
				"transition-all duration-300 ease-out",
				className,
			)}
			{...props}
		/>
	)
}

// New modern card variants
function CardWithImage({
	className,
	imageSrc,
	imageAlt,
	...props
}: React.ComponentProps<"div"> & { imageSrc?: string; imageAlt?: string }) {
	return (
		<div
			data-slot="card-with-image"
			className={cn(
				"group relative bg-card/80 backdrop-blur-xl text-card-foreground flex flex-col gap-6 rounded-2xl border border-border/50 overflow-hidden shadow-lg shadow-black/5 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-black/10 hover:border-border/70 hover:bg-card/90 hover:scale-[1.02] hover:-translate-y-1",
				"before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100",
				"after:absolute after:inset-0 after:bg-gradient-to-br after:from-primary/5 after:via-transparent after:to-secondary/5 after:opacity-0 after:transition-opacity after:duration-500 after:ease-out hover:after:opacity-100",
				className,
			)}
			{...props}
		>
			{imageSrc && (
				<div className="relative w-full h-48 overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 z-10" />
					<img
						src={imageSrc}
						alt={imageAlt || "Card image"}
						className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
					/>
				</div>
			)}
			<div className="relative z-10 px-6 pb-6">{props.children}</div>
		</div>
	)
}

function CardWithGradient({
	className,
	gradient = "blue",
	...props
}: React.ComponentProps<"div"> & {
	gradient?: "blue" | "purple" | "green" | "orange"
}) {
	const gradients = {
		blue: "from-blue-500/20 via-cyan-500/10 to-blue-600/20",
		purple: "from-purple-500/20 via-pink-500/10 to-purple-600/20",
		green: "from-emerald-500/20 via-teal-500/10 to-emerald-600/20",
		orange: "from-orange-500/20 via-amber-500/10 to-orange-600/20",
	}

	return (
		<div
			data-slot="card-with-gradient"
			className={cn(
				"group relative bg-card/80 backdrop-blur-xl text-card-foreground flex flex-col gap-6 rounded-2xl border border-border/50 py-6 shadow-lg shadow-black/5 transition-all duration-500 ease-out hover:shadow-xl hover:shadow-black/10 hover:border-border/70 hover:bg-card/90 hover:scale-[1.02] hover:-translate-y-1",
				"before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-100",
				`after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:${gradients[gradient]} after:opacity-0 after:transition-opacity after:duration-500 after:ease-out hover:after:opacity-100`,
				className,
			)}
			{...props}
		/>
	)
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	CardWithImage,
	CardWithGradient,
}
