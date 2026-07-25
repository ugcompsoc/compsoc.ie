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
				{
					name: "title",
					content:
						"CompSoc - University of Galway's Computer Society",
				},
				{
					name: "description",
					content:
						"CompSoc is the longest running Computer Society in Ireland, and a social outlet for University of Galway students interested in technology.",
				},
				{
					property: "og:type",
					content: "website",
				},
				{
					property: "og:url",
					content: "https://compsoc.ie",
				},
				{
					property: "og:title",
					content:
						"CompSoc - University of Galway's Computer Society",
				},
				{
					property: "og:description",
					content:
						"CompSoc is the longest running Computer Society in Ireland, and a social outlet for University of Galway students interested in technology.",
				},
				{
					property: "og:image",
					content:
						"/assets/img/compsoc/compsoc-meta-social-banner.png",
				},
				{
					property: "twitter:card",
					content: "summary_large_image",
				},
				{
					property: "twitter:url",
					content: "https://compsoc.ie",
				},
				{
					property: "twitter:title",
					content:
						"CompSoc - University of Galway's Computer Society",
				},
				{
					property: "twitter:description",
					content:
						"CompSoc is the longest running Computer Society in Ireland, and a social outlet for University of Galway students interested in technology.",
				},
				{
					property: "twitter:image",
					content:
						"/assets/img/compsoc/compsoc-meta-social-banner.png",
				},
			],
			links: [
				{
					rel: "stylesheet",
					href: appCss,
				},
				{
					rel: "icon",
					href: faviconUrl,
				},
				{
					rel: "apple-touch-icon",
					href: appleTouchIconUrl,
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&display=swap",
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
