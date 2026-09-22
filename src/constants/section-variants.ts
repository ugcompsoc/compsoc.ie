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

export type SectionVariant = {
	borderColor: string
	opacity: number
}

export type SectionTransition = {
	duration: number
	ease: [number, number, number, number]
}

/**
 * Inline style equivalent of the border/opacity animation these sections use.
 * Plain CSS transitions instead of a JS animation library: the only properties
 * animated are border-color and opacity, which the compositor handles natively.
 */
export function sectionStyle(
	active: boolean,
	activeVariant: SectionVariant = sectionVariants.active,
	inactiveVariant: SectionVariant = sectionVariants.inactive,
	transition: SectionTransition = sectionVariants.transition,
): React.CSSProperties {
	const variant = active ? activeVariant : inactiveVariant
	const [x1, y1, x2, y2] = transition.ease
	const timing = `${transition.duration}s cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`
	return {
		borderColor: variant.borderColor,
		opacity: variant.opacity,
		transition: `border-color ${timing}, opacity ${timing}`,
	}
}

/** Active border color for nav bottom border when menu is active. */
export const sectionActiveBorderColor = sectionVariants
	.active.borderColor as string
