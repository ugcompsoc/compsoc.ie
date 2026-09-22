import { Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import {
	CompSocLogo,
	HamburgerMenuIcon,
} from "#/components/icons"
import { sectionActiveBorderColor } from "#/constants/section-variants"
import { useActiveSection } from "#/contexts/active-section"
import { cn } from "#/lib/utils"
import { Button } from "./button"

const mainMenuItems = [
	{ text: "Home", link: "/" },
	{ text: "Events", link: "/events" },
	{ text: "Account", link: "/account" },
	{ text: "Committee", link: "/committee" },
	{ text: "Contact us", link: "/contact" },
]

function NavigationMenuComponent({
	isDesktop,
	currentPath,
}: {
	isDesktop: boolean
	currentPath: string
}) {
	const {
		activeSectionId,
		setMenuHovered,
		setTapOverride,
	} = useActiveSection()
	const menuActive = activeSectionId === "menu"

	const [isFullscreenMenuOpen, setisFullscreenMenuOpen] =
		useState(false)

	// Close mobile overlay when resizing to desktop
	useEffect(() => {
		if (isDesktop) setisFullscreenMenuOpen(false)
	}, [isDesktop])

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover only for active-section state
		<div
			className="fixed top-0 left-0 z-1000 flex h-16 w-screen items-center justify-between border-border border-b-2 bg-background px-4 transition-[border-color] duration-300"
			onMouseEnter={() => setMenuHovered(true)}
			onMouseLeave={() => setMenuHovered(false)}
			onTouchEnd={() => setTapOverride("menu")}
			style={{
				borderBottomColor: menuActive
					? sectionActiveBorderColor
					: undefined,
			}}
		>
			<Link
				to="/"
				aria-label="Home"
				className="flex h-full items-center rounded-md focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
			>
				<CompSocLogo />
			</Link>

			{/* Desktop Navigation Menu — visible from md up via CSS only (no flicker on load) */}
			<div className="hidden md:flex">
				<nav
					data-slot="navigation-menu"
					className="group/navigation-menu relative flex max-w-max flex-1 items-center justify-center"
				>
					<ul
						data-slot="navigation-menu-list"
						className="group flex flex-1 list-none items-center justify-center gap-0"
					>
						{mainMenuItems.map((item) => (
							<li
								key={item.link}
								data-slot="navigation-menu-item"
								className="relative flex items-stretch"
							>
								<Link
									to={item.link}
									data-slot="navigation-menu-link"
									data-active={
										currentPath === item.link
											? "true"
											: undefined
									}
									className={cn(
										"flex h-full w-full items-center justify-center gap-1.5 p-2 text-muted-foreground text-sm outline-none transition-colors [&_svg:not([class*='size-'])]:size-4",
										"hover:text-foreground-light focus:text-foreground-light focus-visible:text-foreground-light data-[active=true]:text-foreground-light",
										"h-full w-30 text-sm",
									)}
								>
									{item.text}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			{/* Mobile hamburger — visible below md via CSS only */}
			<div className="z-9999 aspect-square h-16 shrink-0 md:hidden">
				<Button
					variant="transperent"
					onClick={() =>
						setisFullscreenMenuOpen(!isFullscreenMenuOpen)
					}
					className="relative flex h-full w-full shrink-0 items-center justify-center"
				>
					<HamburgerMenuIcon
						isOpen={isFullscreenMenuOpen}
					/>
				</Button>
			</div>
			{/* Mobile fullscreen overlay — md:hidden so it never shows on desktop even if state is stale */}
			{isFullscreenMenuOpen && (
				<div className="absolute top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-background md:hidden">
					<nav
						data-slot="navigation-menu"
						className="group/navigation-menu relative flex max-w-max flex-1 items-center justify-center"
					>
						<ul
							data-slot="navigation-menu-list"
							className={cn(
								"group flex flex-1 list-none items-center justify-center gap-0",
								"flex flex-col items-center justify-center",
							)}
						>
							{mainMenuItems.map((item) => (
								<li
									key={item.link}
									data-slot="navigation-menu-item"
									className="relative flex items-stretch"
								>
									<Link
										to={item.link}
										onClick={() =>
											setisFullscreenMenuOpen(false)
										}
										data-slot="navigation-menu-link"
										data-active={
											currentPath === item.link
												? "true"
												: undefined
										}
										className={cn(
											"flex h-full w-full items-center justify-center gap-1.5 p-2 text-muted-foreground text-sm outline-none transition-colors [&_svg:not([class*='size-'])]:size-4",
											"hover:text-foreground-light focus:text-foreground-light focus-visible:text-foreground-light data-[active=true]:text-foreground-light",
											"h-full w-content text-4xl",
										)}
									>
										{item.text}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</div>
	)
}

export { NavigationMenuComponent }
