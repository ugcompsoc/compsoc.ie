/**
 * Active/inactive variants for section motion (border, opacity). Shared by Hero, About, Footer.
 * Border colors must match src/styles.css (--border-accent and --border) so animations
 * interpolate without flicker. Values match .dark theme (app uses dark). Update CSS when changing.
 */
export const sectionVariants = {
	active: {
		borderColor: "oklch(0.746 0.16 232.661)",
		opacity: 1,
	},
	inactive: {
		borderColor: "oklch(0.278 0.033 256.848)",
		opacity: 0.8,
	},
	transition: {
		duration: 0.3,
		ease: [0.25, 0.1, 0.25, 1] as [
			number,
			number,
			number,
			number,
		],
	},
}

/** Active border color for nav bottom border when menu is active. */
export const sectionActiveBorderColor = sectionVariants
	.active.borderColor as string
