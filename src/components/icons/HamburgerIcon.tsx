// Custom hamburger menu icon with three SVG lines.
// The open/close morph is a plain CSS transform transition: transform-origin is
// given in viewBox user units, matching the coordinates each line is drawn at.
const LINE_TRANSITION =
	"transform 300ms cubic-bezier(0.4, 0, 0.2, 1)"

export function HamburgerMenuIcon({
	isOpen,
}: {
	isOpen: boolean
}) {
	return (
		<svg
			width="64"
			height="64"
			viewBox="0 0 32 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className="h-8! w-8! transition-transform duration-300"
			aria-label={isOpen ? "Close menu" : "Open menu"}
		>
			<title>{isOpen ? "Close menu" : "Open menu"}</title>
			<path
				d="M4 8 L28 8"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				style={{
					transformOrigin: "16px 8px",
					transform: isOpen
						? "translateY(8px) rotate(-45deg)"
						: "none",
					transition: LINE_TRANSITION,
				}}
			/>
			<path
				d="M4 16 L28 16"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				style={{
					transformOrigin: "16px 16px",
					transform: isOpen ? "scaleX(0)" : "none",
					transition: LINE_TRANSITION,
				}}
			/>
			<path
				d="M4 24 L28 24"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				style={{
					transformOrigin: "16px 24px",
					transform: isOpen
						? "translateY(-8px) rotate(45deg)"
						: "none",
					transition: LINE_TRANSITION,
				}}
			/>
		</svg>
	)
}
