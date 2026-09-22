/**
 * Central source of truth for document head metadata.
 *
 * Every route calls `seo()` in its `head()` so that each page ships its own
 * <title>, description and canonical URL. TanStack Router merges head output
 * leaf-first, so anything a route returns here overrides the defaults set in
 * __root.tsx.
 */

export const SITE_URL = "https://compsoc.ie"

export const SITE_NAME = "CompSoc"

export const DEFAULT_TITLE =
	"CompSoc - University of Galway's Computer Society"

export const DEFAULT_DESCRIPTION =
	"CompSoc is the longest running Computer Society in Ireland, and a social outlet for University of Galway students interested in technology."

/** Absolute URL: crawlers and social scrapers do not resolve relative paths. */
export const SOCIAL_IMAGE = `${SITE_URL}/assets/img/compsoc/compsoc_banner_blue_black.png`

export const SOCIAL_IMAGE_ALT =
	"CompSoc, the Computer Society of University of Galway"

/**
 * Absolute URL in the form the static host serves without a redirect: every
 * page is prerendered as <route>/index.html, so the trailing-slash URL is the
 * real one and "/committee" 308-redirects to "/committee/".
 */
export function canonicalUrl(path: string): string {
	const trimmed = path.replace(/^\/+|\/+$/g, "")
	return trimmed
		? `${SITE_URL}/${trimmed}/`
		: `${SITE_URL}/`
}

export interface SeoOptions {
	title: string
	description?: string
	/** Route path with a leading slash, e.g. "/committee". */
	path: string
}

export function seo({
	title,
	description = DEFAULT_DESCRIPTION,
	path,
}: SeoOptions) {
	const url = canonicalUrl(path)

	return {
		meta: [
			{ title },
			{ name: "title", content: title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:url", content: url },
			{ property: "twitter:title", content: title },
			{
				property: "twitter:description",
				content: description,
			},
			{ property: "twitter:url", content: url },
		],
		links: [{ rel: "canonical", href: url }],
	}
}
