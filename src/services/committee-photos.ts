/**
 * Committee photos live under src/assets so the build owns them: every source
 * image is re-encoded to WebP, capped at twice the 112px avatar box and
 * content-hashed for immutable caching. committee.json keeps storing the
 * public-style path, which this map translates to the built asset URL, so
 * contributors can still drop in a plain .jpg or .png.
 */
const PHOTO_URLS = import.meta.glob(
	"../assets/img/committee/**/*.{jpg,jpeg,png,webp}",
	{
		query: "?format=webp&w=256",
		import: "default",
		eager: true,
	},
) as Record<string, string>

const PHOTOS_BY_PATH: Record<string, string> =
	Object.fromEntries(
		Object.entries(PHOTO_URLS).map(([file, url]) => [
			file.replace(/^\.\.\/assets/, "/assets"),
			url,
		]),
	)

/** Resolves a committee.json photo path to its built URL. */
export function resolvePhoto(path: string): string {
	return PHOTOS_BY_PATH[path] ?? path
}
