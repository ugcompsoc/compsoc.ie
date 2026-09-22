import { readFileSync } from "node:fs"
import tailwindcss from "@tailwindcss/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { imagetools } from "vite-imagetools"

// Full SSG for Cloudflare Pages: static output in dist/client.

// The home page infographic needs only the current committee headcount. Inlining
// it here keeps the committee dataset out of every bundle but the committee route.
const committee = JSON.parse(
	readFileSync("./src/services/committee.json", "utf8"),
) as { committee_years: Array<{ committee: unknown[] }> }

const committeeSize = String(
	committee.committee_years[0].committee.length,
)
const config = defineConfig({
	define: {
		__COMMITTEE_SIZE__: JSON.stringify(committeeSize),
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		devtools(),
		imagetools(),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoStaticPathsDiscovery: true,
				crawlLinks: true,
			},
		}),
		viteReact(),
	],
})

export default config
