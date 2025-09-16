import { TanstackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { Variants } from "motion/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/ui/footer";
import { SiteNavigationMenu as NavigationMenu } from "@/components/ui/navigation-menu";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
				content: "CompSoc - University of Galway's Computer Society",
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
				content: "CompSoc - University of Galway's Computer Society",
			},
			{
				property: "og:description",
				content:
					"CompSoc is the longest running Computer Society in Ireland, and a social outlet for University of Galway students interested in technology.",
			},
			{
				property: "og:image",
				content: "/assets/img/compsoc-meta-social-banner.png",
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
				content: "CompSoc - University of Galway's Computer Society",
			},
			{
				property: "twitter:description",
				content:
					"CompSoc is the longest running Computer Society in Ireland, and a social outlet for University of Galway students interested in technology.",
			},
			{
				property: "twitter:image",
				content: "/assets/img/compsoc-meta-social-banner.png",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/vite.svg",
			},
			{
				rel: "icon",
				href: "/assets/img/favicon.png",
			},
			{
				rel: "apple-touch-icon",
				href: "/assets/img/apple-touch-icon.png",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i",
			},
		],
	}),

	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const { scrollY } = useScroll();
	const prevScrollY = useRef(0);
	const [visible, setVisible] = useState(true);
	// const router = useRouter();
	// const currentPath = router.state.location.pathname;

	const menuBarHeight = 256;

	useMotionValueEvent(scrollY, "change", (latest) => {
		if (latest <= 0) {
			setVisible(true);
			prevScrollY.current = latest;
			return;
		}
		const diff = latest - prevScrollY.current;
		if (Math.abs(diff) < 10) return;
		const isScrollingDown = diff > 0;
		setVisible(!isScrollingDown);
		prevScrollY.current = latest;
	});

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (e.clientY <= menuBarHeight) {
				setVisible(true);
			}
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// useEffect(() => {
	//   window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
	// }, [currentPath])

	const navbarVariants: Variants = {
		visible: {
			y: 0,
			transition: {
				duration: 0.5,
				ease: [0.16, 1, 0.3, 1],
			},
		},
		hidden: {
			y: -150,
			transition: {
				duration: 0.5,
				ease: [0.47, 0, 0.75, 0.72],
			},
		},
	};

	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<motion.div
					className="fixed flex-row items-center z-[9999] justify-between w-screen flex"
					initial="visible"
					animate={visible ? "visible" : "hidden"}
					variants={navbarVariants}
				>
					<NavigationMenu />
				</motion.div>
				<div className="flex flex-col min-h-screen w-full overflow-x-hidden">
					{children}
					<div className="flex">
						<Footer />
					</div>
				</div>

				<TanstackDevtools
					config={{
						position: "bottom-left",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

// Custom 404 component
function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-gray-600 mb-4">
				The page you're looking for doesn't exist.
			</p>
			<a href="/" className="text-blue-500 hover:underline">
				Go back home
			</a>
		</div>
	);
}
