import { useEffect, useRef } from "react"
import { Button } from "#/components/ui/button"

/**
 * Sentinel for progressively rendered lists: calls `onLoad` once the reader
 * scrolls within reach of it, so long lists start with a small DOM and grow
 * as they are read.
 *
 * It is also a real button, so the rest of the list stays reachable without
 * scrolling (keyboard, screen readers) and the prerendered HTML has a working
 * control. Give it a `key` that changes after every load: each mount creates a
 * fresh observer, whose initial callback covers the case where the sentinel is
 * still inside the margin after the new items render.
 */
export function LoadMore({
	label,
	onLoad,
}: {
	label: string
	onLoad: () => void
}) {
	const ref = useRef<HTMLButtonElement>(null)
	const onLoadRef = useRef(onLoad)
	onLoadRef.current = onLoad

	useEffect(() => {
		const node = ref.current
		if (
			!node ||
			typeof IntersectionObserver === "undefined"
		)
			return
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					observer.disconnect()
					onLoadRef.current()
				}
			},
			// Start rendering well before the reader reaches the end.
			{ rootMargin: "0px 0px 800px 0px" },
		)
		observer.observe(node)
		return () => observer.disconnect()
	}, [])

	return (
		<Button
			ref={ref}
			variant="outline"
			size="sm"
			onClick={() => onLoadRef.current()}
			className="self-center px-3"
		>
			{label}
		</Button>
	)
}
