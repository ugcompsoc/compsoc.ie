/// <reference types="vite/client" />

declare module "*?format=webp&w=100" {
	const src: string
	export default src
}

declare module "*?format=webp&w=200" {
	const src: string
	export default src
}

declare module "*?format=webp&w=400" {
	const src: string
	export default src
}

declare module "*?format=webp&w=1000" {
	const src: string
	export default src
}

declare module "*?format=webp&w=1400" {
	const src: string
	export default src
}

/** vite-imagetools `as=img`: largest variant plus a srcset across all widths. */
declare module "*&as=img" {
	const img: {
		src: string
		w: number
		h: number
		srcset?: string
	}
	export default img
}
