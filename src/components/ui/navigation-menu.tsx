import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Home, Calendar, Server, UsersRound, Mail } from 'lucide-react'

import { cn } from '@/lib/utils'

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
                'group/navigation-menu relative flex flex-1 items-center justify-center',
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
                'group flex flex-1 list-none items-center justify-center gap-1',
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
            className={cn('relative', className)}
            {...props}
        />
    )
}

const navigationMenuTriggerStyle = cva(
    'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1',
)

function NavigationMenuTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
    return (
        <NavigationMenuPrimitive.Trigger
            data-slot="navigation-menu-trigger"
            className={cn(navigationMenuTriggerStyle(), 'group', className)}
            {...props}
        >
            {children}{' '}
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
                'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto',
                'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
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
        <div className={cn('absolute top-full left-0 isolate z-50 flex justify-center')}>
            <NavigationMenuPrimitive.Viewport
                data-slot="navigation-menu-viewport"
                className={cn(
                    'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]',
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
                'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
                className,
            )}
            {...props}
        >
            <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
        </NavigationMenuPrimitive.Indicator>
    )
}

// Add this above the PCNavigationMenu function
const mainMenuItems = [
    { text: 'Home', link: '/', icon: Home },
    { text: 'Events', link: '/events', icon: Calendar },
    { text: 'Account', link: '/account', icon: Server },
    { text: 'Committee', link: '/committee', icon: UsersRound },
]

// PC Navigation Menu Component
export function PCNavigationMenu() {
    return (
        <NavigationMenu className="flex flex-shrink-0 text-sm h-14 gap-2 px-0 lg:px-8 pt-2">
            <NavigationMenuList className="h-14 w-full gap-2 text-neutral-100 flex flex-shrink-0 flex-row text-sm bg-neutral-900/75 rounded-md backdrop-blur-sm border border-neutral-800/70 shadow-lg">
                <div className="flex flex-shrink-0 rounded-xl justify-center items-center h-14 pr-4.5 pl-3.5 gap-2 text-neutral-100">
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

                <div className=" flex flex-row h-full text-neutral-100">
                    {mainMenuItems.map((item) => (
                        <NavigationMenuItem key={item.link}>
                            <NavigationMenuLink
                                asChild
                                className="relative px-8 h-full flex items-center justify-center"
                            >
                                <Link to={item.link} className="[&.active]:text-accent min-w-fit">
                                    {item.text}
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    ))}
                </div>
            </NavigationMenuList>

            <NavigationMenuLink
                asChild
                className="px-8 h-14 flex items-center justify-center cursor-pointer relative rounded-md bg-accent text-accent-foreground hover:text-accent-foreground [&.active]:text-accent-foreground"
            >
                <Link to="/contact" className="[&.active]:text-accent-foreground min-w-fit">
                    Contact us
                </Link>
            </NavigationMenuLink>
        </NavigationMenu>
    )
}

// Mobile Navigation Menu Component
export function MobileNavigationMenu() {
    return (
        <nav className="fixed bottom-0 left-0 h-18 w-full z-[9999] bg-menu/95 backdrop-blur-md flex md:hidden text-menu-foreground shadow-lg">
            {/* 
            if you are changing height of mobile menu, change height of components/sections/home/heroComponent.tsx and of div in __root.tsx too.
            */}
            {mainMenuItems.map((item) => {
                const IconComponent = item.icon
                return (
                    <Link
                        key={item.link}
                        to={item.link}
                        className="flex-1 flex flex-col items-center justify-center py-3 text-sm hover:text-accent transition-colors duration-200 [&.active]:text-accent [&.active]:bg-accent/10"
                    >
                        <IconComponent size={20} className="mb-1" />
                        <span className="font-medium">{item.text}</span>
                    </Link>
                )
            })}
            <Link
                to="/contact"
                className="flex-1 flex flex-col items-center justify-center py-3 text-sm bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-200 [&.active]:bg-accent [&.active]:text-accent-foreground"
            >
                <Mail size={20} className="mb-1" />
                <span className="font-medium">Contact</span>
            </Link>
        </nav>
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
