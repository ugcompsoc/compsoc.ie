import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { Link } from "@tanstack/react-router"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
	CompSocLogo,
	HamburgerMenuIcon,
} from "#/components/icons"
import { sectionActiveBorderColor } from "#/constants/section-variants"
import { useActiveSection } from "#/contexts/active-section"
import { cn } from "#/lib/utils"
import { Button } from "./button"

function NavigationMenu({
	align = "start",
	className,
	children,
	...props
}: NavigationMenuPrimitive.Root.Props &
	Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(
				"group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
				className,
			)}
			{...props}
		>
			{children}
			<NavigationMenuPositioner align={align} />
		</NavigationMenuPrimitive.Root>
	)
}

function NavigationMenuList({
	className,
	...props
}: React.ComponentPropsWithRef<
	typeof NavigationMenuPrimitive.List
>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(
				"group flex flex-1 list-none items-center justify-center gap-0",
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuItem({
	className,
	...props
}: React.ComponentPropsWithRef<
	typeof NavigationMenuPrimitive.Item
>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn("relative", className)}
			{...props}
		/>
	)
}

const navigationMenuTriggerStyle = cva(
	"group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-popup-open:bg-muted/50 data-popup-open:hover:bg-muted data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted",
)

function NavigationMenuTrigger({
	className,
	children,
	...props
}: NavigationMenuPrimitive.Trigger.Props) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(
				navigationMenuTriggerStyle(),
				"group",
				className,
			)}
			{...props}
		>
			{children}{" "}
			<ChevronDownIcon
				className="relative top-px ml-1 size-3 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180 group-data-popup-open/navigation-menu-trigger:rotate-180"
				aria-hidden="true"
			/>
		</NavigationMenuPrimitive.Trigger>
	)
}

function NavigationMenuContent({
	className,
	...props
}: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				"data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out group-data-[viewport=false]/navigation-menu:data-open:fade-in-0 group-data-[viewport=false]/navigation-menu:data-open:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-closed:fade-out-0 group-data-[viewport=false]/navigation-menu:data-closed:zoom-out-95 h-full w-auto p-2 pr-2.5 transition-[opacity,transform,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:data-activation-direction=left:translate-x-[50%] data-ending-style:data-activation-direction=right:translate-x-[-50%] data-starting-style:data-activation-direction=left:translate-x-[-50%] data-starting-style:data-activation-direction=right:translate-x-[50%] data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=navigation-menu-link]:focus:outline-none **:data-[slot=navigation-menu-link]:focus:ring-0 group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:ring-1 group-data-[viewport=false]/navigation-menu:ring-foreground/10 group-data-[viewport=false]/navigation-menu:duration-300 group-data-[viewport=false]/navigation-menu:data-closed:animate-out group-data-[viewport=false]/navigation-menu:data-open:animate-in",
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuPositioner({
	className,
	side = "bottom",
	sideOffset = 8,
	align = "start",
	alignOffset = 0,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn(
					"isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup className="data-[ending-style]:easing-[ease] relative h-(--popup-height) w-(--popup-width) xs:w-(--popup-width) origin-(--transform-origin) rounded-lg bg-popover text-popover-foreground shadow outline-none ring-1 ring-foreground/10 transition-[opacity,transform,width,height,scale,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:scale-90 data-starting-style:scale-90 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-300">
					<NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	)
}

function NavigationMenuLink({
	className,
	...props
}: NavigationMenuPrimitive.Link.Props) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"flex h-full w-full items-center justify-center gap-1.5 p-2 text-muted-foreground text-sm outline-none transition-colors [&_svg:not([class*='size-'])]:size-4",
				"hover:text-foreground-light focus:text-foreground-light focus-visible:text-foreground-light data-[active=true]:text-foreground-light",
				className,
			)}
			{...props}
		/>
	)
}

function NavigationMenuIndicator({
	className,
	...props
}: React.ComponentPropsWithRef<
	typeof NavigationMenuPrimitive.Icon
>) {
	return (
		<NavigationMenuPrimitive.Icon
			data-slot="navigation-menu-indicator"
			className={cn(
				"data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in",
				className,
			)}
			{...props}
		>
			<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
		</NavigationMenuPrimitive.Icon>
	)
}

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
				<NavigationMenu>
					<NavigationMenuList>
						{mainMenuItems.map((item) => (
							<NavigationMenuItem
								key={item.link}
								className="flex items-stretch"
							>
								<NavigationMenuLink
									active={currentPath === item.link}
									data-active={
										currentPath === item.link
											? "true"
											: undefined
									}
									render={<Link to={item.link} />}
									className="h-full w-30 text-sm"
								>
									{item.text}
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
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
					<NavigationMenu>
						<NavigationMenuList className="flex flex-col items-center justify-center">
							{mainMenuItems.map((item) => (
								<NavigationMenuItem
									key={item.link}
									className="flex items-stretch"
								>
									<NavigationMenuLink
										active={currentPath === item.link}
										data-active={
											currentPath === item.link
												? "true"
												: undefined
										}
										render={
											<Link
												to={item.link}
												onClick={() =>
													setisFullscreenMenuOpen(false)
												}
											/>
										}
										className="h-full w-content text-4xl"
									>
										{item.text}
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			)}
		</div>
	)
}

export {
	NavigationMenuComponent,
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
	NavigationMenuPositioner,
}
