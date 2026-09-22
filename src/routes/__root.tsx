import { TanStackDevtools } from "@tanstack/react-devtools"
import type { QueryClient } from "@tanstack/react-query"
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useLocation,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { useEffect, useState } from "react"
import appleTouchIconUrl from "#/assets/img/compsoc/apple-touch-icon.png?format=webp&w=200"
import faviconUrl from "#/assets/img/compsoc/favicon.png?format=webp&w=200"
import { NotFound } from "#/components/NotFound"
import { Footer } from "#/components/ui/footer"
import { NavigationMenuComponent } from "#/components/ui/navigation-menu"
import { ActiveSectionProvider } from "#/contexts/active-section"
import {
	canonicalUrl,
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	SITE_NAME,
	SOCIAL_IMAGE,
	SOCIAL_IMAGE_ALT,
} from "#/lib/seo"
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools"
import TanStackQueryProvider from "../integrations/tanstack-query/root-provider"
import appCss from "../styles.css?url"

interface MyRouterContext {
	queryClient: QueryClient
}

export const Route =
	createRootRouteWithContext<MyRouterContext>()({
		notFoundComponent: NotFound,
		head: () => ({
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1.0",
				},
				{
					name: "theme-color",
					content: "#000000",
				},
				// Site-wide defaults. Individual routes override title/description/
				// canonical via seo() in their own head(); router merges leaf-first.
				{
					title: DEFAULT_TITLE,
				},
				{
					name: "title",
					content: DEFAULT_TITLE,
				},
				{
					name: "description",
					content: DEFAULT_DESCRIPTION,
				},
				{
					property: "og:type",
					content: "website",
				},
				{
					property: "og:site_name",
					content: SITE_NAME,
				},
				{
					property: "og:locale",
					content: "en_IE",
				},
				{
					property: "og:url",
					content: canonicalUrl("/"),
				},
				{
					property: "og:title",
					content: DEFAULT_TITLE,
				},
				{
					property: "og:description",
					content: DEFAULT_DESCRIPTION,
				},
				{
					property: "og:image",
					content: SOCIAL_IMAGE,
				},
				{
					property: "og:image:alt",
					content: SOCIAL_IMAGE_ALT,
				},
				{
					property: "twitter:card",
					content: "summary_large_image",
				},
				{
					property: "twitter:url",
					content: canonicalUrl("/"),
				},
				{
					property: "twitter:title",
					content: DEFAULT_TITLE,
				},
				{
					property: "twitter:description",
					content: DEFAULT_DESCRIPTION,
				},
				{
					property: "twitter:image",
					content: SOCIAL_IMAGE,
				},
				{
					property: "twitter:image:alt",
					content: SOCIAL_IMAGE_ALT,
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				// All body text is JetBrains Mono. Without a preload the browser only
				// discovers the file after parsing the stylesheet.
				{
					rel: "preload",
					href: "/fonts/jetbrains-mono/jetbrains-mono-v24-latin-variable.woff2",
					as: "font",
					type: "font/woff2",
					crossOrigin: "anonymous",
				},
				{
					rel: "icon",
					href: faviconUrl,
				},
				{
					rel: "apple-touch-icon",
					href: appleTouchIconUrl,
				},
			],
		}),
		shellComponent: RootDocument,
	})

function RootDocument({
	children,
}: {
	children: React.ReactNode
}) {
	const currentPath =
		useLocation().pathname.replace(/\/$/, "") || "/"
	const DESKTOP_BREAKPOINT = 768
	const [isDesktop, setIsDesktop] = useState(() => {
		if (typeof window !== "undefined") {
			return window.innerWidth >= DESKTOP_BREAKPOINT
		}
		return true
	})

	useEffect(() => {
		const onResize = () => {
			setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT)
		}
		window.addEventListener("resize", onResize)
		return () =>
			window.removeEventListener("resize", onResize)
	}, [])

	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<TanStackQueryProvider>
					<ActiveSectionProvider>
						<NavigationMenuComponent
							currentPath={currentPath}
							isDesktop={isDesktop}
						/>
						<div className="flex min-h-screen w-screen flex-col items-center justify-between pt-16">
							{children}
							<Footer currentPath={currentPath} />
						</div>
					</ActiveSectionProvider>
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
							TanStackQueryDevtools,
						]}
					/>
				</TanStackQueryProvider>
				<Scripts />
			</body>
		</html>
	)
}
