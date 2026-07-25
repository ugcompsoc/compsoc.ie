import {
	createContext,
	type ReactNode,
	type RefObject,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"

export type SectionId =
	| "hero"
	| "about"
	| "stats"
	| "footer"
	| "menu"

const TAP_ACTIVE_MS = 500

type ActiveSectionContextValue = {
	activeSectionId: SectionId | null
	registerSection: (
		id: SectionId,
		ref: RefObject<HTMLElement | null>,
	) => () => void
	setFooterHovered: (hovered: boolean) => void
	setMenuHovered: (hovered: boolean) => void
	/** On mobile tap: make this section active for 0.5s, then revert to view-based. */
	setTapOverride: (id: SectionId) => void
}

const ActiveSectionContext =
	createContext<ActiveSectionContextValue | null>(null)

export function useActiveSection() {
	const ctx = useContext(ActiveSectionContext)
	if (!ctx) {
		throw new Error(
			"useActiveSection must be used within ActiveSectionProvider",
		)
	}
	return ctx
}

export function ActiveSectionProvider({
	children,
}: {
	children: ReactNode
}) {
	const [activeSectionId, setActiveSectionId] =
		useState<SectionId | null>(null)
	const [footerHovered, setFooterHovered] = useState(false)
	const [menuHovered, setMenuHovered] = useState(false)
	const [ratios, setRatios] = useState<
		Record<SectionId, number>
	>({
		hero: 0,
		about: 0,
		stats: 0,
		footer: 0,
		menu: 0,
	})
	const [registeredIds, setRegisteredIds] = useState<
		Set<SectionId>
	>(new Set())
	const [tapOverrideId, setTapOverrideId] =
		useState<SectionId | null>(null)
	const tapOverrideTimeoutRef = useRef<ReturnType<
		typeof setTimeout
	> | null>(null)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mql = window.matchMedia("(max-width: 767px)")
		const handler = () => setIsMobile(mql.matches)
		handler()
		mql.addEventListener("change", handler)
		return () => mql.removeEventListener("change", handler)
	}, [])

	const setTapOverride = useCallback((id: SectionId) => {
		if (tapOverrideTimeoutRef.current) {
			clearTimeout(tapOverrideTimeoutRef.current)
			tapOverrideTimeoutRef.current = null
		}
		setTapOverrideId(id)
		tapOverrideTimeoutRef.current = setTimeout(() => {
			setTapOverrideId(null)
			tapOverrideTimeoutRef.current = null
			// Clear hover so menu/footer don't stay active after tap (synthetic pointer events on touch)
			setMenuHovered(false)
			setFooterHovered(false)
		}, TAP_ACTIVE_MS)
	}, [])

	useEffect(
		() => () => {
			if (tapOverrideTimeoutRef.current) {
				clearTimeout(tapOverrideTimeoutRef.current)
			}
		},
		[],
	)

	const registerSection = useCallback(
		(id: SectionId, ref: RefObject<HTMLElement | null>) => {
			setRegisteredIds((prev) => new Set(prev).add(id))
			const el = ref.current
			if (!el) {
				return () => {
					setRegisteredIds((prev) => {
						const next = new Set(prev)
						next.delete(id)
						return next
					})
				}
			}
			const observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						const ratio = entry.intersectionRatio
						setRatios((prev) => ({ ...prev, [id]: ratio }))
					}
				},
				{
					threshold: [
						0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
						1,
					],
				},
			)
			observer.observe(el)
			return () => {
				observer.disconnect()
				setRegisteredIds((prev) => {
					const next = new Set(prev)
					next.delete(id)
					return next
				})
			}
		},
		[],
	)

	useEffect(() => {
		// On mobile: scroll only; on desktop: tap override and hover can set active
		if (!isMobile && tapOverrideId !== null) {
			setActiveSectionId(tapOverrideId)
			return
		}
		if (!isMobile && menuHovered) {
			setActiveSectionId("menu")
			return
		}
		if (!isMobile && footerHovered) {
			setActiveSectionId("footer")
			return
		}
		// Scroll-based: hero, about, stats; footer is active only on hover
		const scrollSectionIds = [
			"hero",
			"about",
			"stats",
		] as const
		const entries = Array.from(registeredIds)
			.filter(
				(id): id is (typeof scrollSectionIds)[number] =>
					scrollSectionIds.includes(
						id as (typeof scrollSectionIds)[number],
					),
			)
			.map((id) => {
				const raw = ratios[id] ?? 0
				// Hero must be ≥75% visible to stay active
				if (id === "hero") {
					return [id, raw < 0.75 ? 0 : raw] as [
						SectionId,
						number,
					]
				}
				return [id, raw] as [SectionId, number]
			})
		if (entries.length === 0) {
			setActiveSectionId(null)
			return
		}
		const best = entries.reduce((a, b) =>
			a[1] >= b[1] ? a : b,
		)
		setActiveSectionId(best[1] > 0 ? best[0] : null)
	}, [
		isMobile,
		tapOverrideId,
		menuHovered,
		footerHovered,
		ratios,
		registeredIds,
	])

	const value = useMemo<ActiveSectionContextValue>(
		() => ({
			activeSectionId,
			registerSection,
			setFooterHovered,
			setMenuHovered,
			setTapOverride,
		}),
		[activeSectionId, registerSection, setTapOverride],
	)

	return (
		<ActiveSectionContext.Provider value={value}>
			{children}
		</ActiveSectionContext.Provider>
	)
}
