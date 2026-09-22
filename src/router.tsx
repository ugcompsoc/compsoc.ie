import { createRouter as createTanStackRouter } from "@tanstack/react-router"
import { getContext } from "./integrations/tanstack-query/root-provider"
import { routeTree } from "./routeTree.gen"

export function getRouter() {
	const router = createTanStackRouter({
		routeTree,

		context: getContext(),

		// Pages are prerendered as <route>/index.html, which static hosts
		// (Cloudflare Pages, GitHub Pages) serve at <route>/ and 308/301-redirect
		// to from <route>. Linking to the slash form avoids that redirect on every
		// hard load and keeps links consistent with the canonical URLs.
		trailingSlash: "always",

		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	})

	return router
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>
	}
}
