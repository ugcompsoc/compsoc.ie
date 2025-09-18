import { TanstackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	ClientOnly,
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { Variants } from "motion/react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Footer } from "@/components/ui/footer";
import { NavigationMenuComponent } from "@/components/ui/navigation-menu";
import { Scrollbar } from "@/components/ui/scrollbar";
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
	const scrollParentRef = useRef(null);
	const { scrollY } = useScroll({
		container: scrollParentRef,
	});
	const prevScrollY = useRef(0);
	const [visible, setVisible] = useState(true);
	const [isDesktop, setIsDesktop] = useState(() => {
		// Initialize with the correct value immediately to prevent flash
		if (typeof window !== "undefined") {
			return window.innerWidth >= 768;
		}
		return true; // Default to desktop for SSR
	});
	const currentPage = useLocation().pathname.slice(1);

	const menuBarHeight = 256; // if mouse is closer to the top than this value the menu will slide in view

	// detecting scroll direction
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
	// detect if user pointer close to the top of the page
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (e.clientY <= menuBarHeight) {
				setVisible(true);
			}
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	// Desktop detection
	useEffect(() => {
		const update = () => setIsDesktop(window.innerWidth >= 768);
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const navbarVariants: Variants = {
		initial: {
			y: -50,
			opacity: 0.1,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: [0.16, 1, 0.2, 1],
			},
		},
		hidden: {
			y: -150,
			opacity: 1,
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
			<body ref={scrollParentRef} className="overflow-auto h-screen w-screen">
				<motion.div
					className="fixed flex-row items-center z-[9999] justify-between w-screen flex"
					initial="initial"
					animate={visible ? "visible" : "hidden"}
					variants={navbarVariants}
				>
					<NavigationMenuComponent
						isDesktop={isDesktop}
						currentPage={currentPage}
					/>
				</motion.div>
				<div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
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
				<div className="hidden md:flex">
					<ClientOnly>
						<Scrollbar parentRef={scrollParentRef} />
					</ClientOnly>
				</div>
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
