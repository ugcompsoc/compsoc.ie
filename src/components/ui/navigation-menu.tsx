import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { Link, useLocation } from "@tanstack/react-router"
import { cva } from "class-variance-authority"
import {
	Calendar,
	ChevronDownIcon,
	Home,
	Mail,
	Server,
	UsersRound,
} from "lucide-react"
import { motion } from "motion/react"
import type * as React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

// Custom hamburger menu icon with three SVG lines
function HamburgerMenuIcon({ isOpen }: { isOpen: boolean }) {
	return (
		<svg
			width="64"
			height="64"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="transition-transform duration-300 !w-8 !h-8"
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			<title>{isOpen ? "Close menu" : "Open menu"}</title>
			<motion.path
				d="M4 8 L28 8"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				animate={{
					rotate: isOpen ? -45 : 0,
					y: isOpen ? 8 : 0,
				}}
				transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
				style={{ transformOrigin: "16px 8px" }}
			/>
			<motion.path
				d="M4 16 L28 16"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				animate={{
					scaleX: isOpen ? 0 : 1,
				}}
				transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
			/>
			<motion.path
				d="M4 24 L28 24"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				animate={{
					rotate: isOpen ? 45 : 0,
					y: isOpen ? -8 : 0,
				}}
				transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
				style={{ transformOrigin: "16px 24px" }}
			/>
		</svg>
	)
}

function NavigationMenu({
	className,
	children,
	viewport = true,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			data-viewport={viewport}
			className={cn(
				"group/navigation-menu relative flex flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			{viewport && <NavigationMenuViewport />}
		</NavigationMenuPrimitive.Root>
	)
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-1",
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	)
}

const navigationMenuTriggerStyle = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1",
)

function NavigationMenuTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle(), "group", className)}
			{...props}
		>
			{children}{" "}
			<ChevronDownIcon
				className="relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	)
}

function NavigationMenuContent({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
				"group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuViewport({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) {
	return (
		<div
			className={cn(
				"absolute top-full left-0 isolate z-50 flex justify-center",
			)}
		>
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					"origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
					className,
				)}
				{...props}
			/>
		</div>
	)
}

function NavigationMenuLink({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"hover:text-accent ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				"data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
				className,
			)}
			{...props}
		>
			<div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	)
}

const mainMenuItems = [
	{ text: "Home", link: "/", icon: Home },
	{ text: "Events", link: "/events", icon: Calendar },
	{ text: "Account", link: "/account", icon: Server },
	{ text: "Committee", link: "/committee", icon: UsersRound },
	{ text: "Contact us", link: "/contact", icon: Mail },
]

// Navigation Menu Component
export function NavigationMenuComponent({
	isDesktop,
	currentPage,
}: {
	isDesktop: boolean
	currentPage: string
}) {
	const [isFullscreenMenuOpen, setisFullscreenMenuOpen] = useState(false)
	const mobileMenuMotion = {
		closed: {
			height: 64, // 64px = h-16
			transition: {
				duration: 0.4,
				ease: [0.4, 0, 0.2, 1] as const, // ease-out cubic-bezier
			},
		},
		open: {
			height: typeof window !== "undefined" ? window.innerHeight - 16 : 800, // 100vh - 1rem (16px)
			transition: {
				duration: 0.5,
				ease: [0.16, 1, 0.3, 1] as const, // ease-out-back cubic-bezier for bouncy effect
			},
		},
	}
	const mobileMenuLinksMotion = {
		closed: {
			top: -192,
			opacity: 0,
			pointerEvents: "none" as const,
			transition: {
				duration: 0.3,
				ease: [0.4, 0, 0.2, 1] as const, // ease-out cubic-bezier
			},
		},
		open: {
			top: 0,
			opacity: 1,
			pointerEvents: "auto" as const,
			transition: {
				duration: 0.4,
				ease: [0.16, 1, 0.3, 1] as const, // ease-out-back cubic-bezier for bouncy effect
			},
		},
	}
	const desktopMenuPillMotion = {
		home: {
			x: 0,
		},
		events: {
			x: 120,
		},
		account: {
			x: 240,
		},
		committee: {
			x: 360,
		},
		contact: {
			x: 520,
			scale: 0,
			opacity: 0,
		},
	}

	return (
		<NavigationMenu className="text-neutral-100 flex flex-row flex-shrink-0 text-lg gap-2 px-0 transition-all duration-300 lg:px-8 pt-2 z-9999">
			{!isDesktop && (
				<motion.div // Visual of dark glass only on mobile
					animate={isFullscreenMenuOpen ? "open" : "closed"}
					variants={mobileMenuMotion}
					className="absolute -z-1 top-2 left-2 rounded-md flex flex-col gap-2 justify-center w-[calc(100vw-1rem)] bg-neutral-900/75 backdrop-blur-sm border border-neutral-800/70 shadow-lg"
				></motion.div>
			)}

			<NavigationMenuList
				className={cn(
					"h-16 relative flex flex-shrink-0 flex-row w-full rounded-md",
					!isDesktop && "justify-between w-[calc(100vw-1rem)]",
					isDesktop &&
						"bg-neutral-900/75 backdrop-blur-sm border border-neutral-800/70 shadow-lg", // Visual of dark glass only on desktop
				)}
			>
				<div className="flex relative flex-shrink-0 rounded-xl justify-center items-center h-14 pr-4.5 pl-3.5 gap-2">
					<img
						src="assets/img/compsoc_logo.png"
						alt=""
						className="h-10 relative object-contain"
					/>
					<div className="flex flex-col justify-center items-center h-full font-[Poppins,sans-serif] mt-[-0.25rem]">
						<h1 className="text-[1.25rem] font-medium">CompSoc</h1>
						<p className="text-[0.625rem] mt-[-0.375rem] ml-[1px] font-light opacity-75">
							University of Galway
						</p>
					</div>
				</div>
				{isDesktop ? (
					<div className="flex flex-row h-full relative mx-4">
						<div className="flex flex-row h-full z-10">
							{mainMenuItems.map(
								(item) =>
									item.link !== "/contact" && (
										<NavigationMenuItem key={item.link}>
											<NavigationMenuLink
												asChild
												className="relative w-30 h-full flex items-center text-sm justify-center"
											>
												<Link to={item.link} className="min-w-fit">
													{item.text}
												</Link>
											</NavigationMenuLink>
										</NavigationMenuItem>
									),
							)}
						</div>

						<motion.div
							transition={{ type: "spring", damping: 45, stiffness: 1000 }}
							variants={desktopMenuPillMotion}
							animate={currentPage === "" ? "home" : currentPage}
							className="bg-neutral-100/5 backdrop-blur-x border border-neutral-800/20 shadow-sm
										rounded-full absolute top-1/2 left-0 translate-y-[-50%] w-30 h-12 z-1"
						></motion.div>
					</div>
				) : (
					<div className="flex flex-row h-full w-max z-9999">
						<Button
							variant="ghost"
							onClick={() => setisFullscreenMenuOpen(!isFullscreenMenuOpen)}
							className="h-16 w-16 flex relative items-center justify-center !p-0"
						>
							<HamburgerMenuIcon isOpen={isFullscreenMenuOpen} />
						</Button>
					</div>
				)}
			</NavigationMenuList>
			{isDesktop && (
				<NavigationMenuLink
					asChild
					className="px-10 h-16 flex items-center text-sm justify-center cursor-pointer relative rounded-md bg-accent text-accent-foreground hover:text-accent-foreground backdrop-blur-sm hover:bg-accent/70 hover:shadow-lg/10  transition-all duration-300 [&.active]:text-accent-foreground"
				>
					<Link
						to="/contact"
						className="[&.active]:text-accent-foreground min-w-fit"
					>
						Contact us
					</Link>
				</NavigationMenuLink>
			)}
			{!isDesktop && (
				<motion.div
					initial="closed"
					animate={isFullscreenMenuOpen ? "open" : "closed"}
					variants={mobileMenuLinksMotion}
					className="absolute top-0 left-2 flex flex-col justify-center items-center h-screen w-[calc(100vw-1rem)] text-neutral-100 bg-none"
				>
					<NavigationMenuList className="flex flex-col relative h-content w-[calc(100vw-1rem)] mb-32 gap-2 items-center justify-center">
						{mainMenuItems.map((item) => (
							<NavigationMenuItem className="w-full" key={item.link}>
								<NavigationMenuLink
									asChild
									className="relative px-8 h-full w-full flex items-center justify-center text-4xl rounded-none"
								>
									<Link
										to={item.link}
										className="rounded-md w-full relative group"
										onClick={() => setisFullscreenMenuOpen(false)}
									>
										<span className="relative z-10">{item.text}</span>
										<div
											className="group-[.active]:bg-neutral-100/5 group-[.active]:backdrop-blur-x group-[.active]:border group-[.active]:border-neutral-800/20 group-[.active]:shadow-sm
										absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-70 py-2 px-8 h-full rounded-full"
										></div>
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</motion.div>
			)}
		</NavigationMenu>
	)
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
}
