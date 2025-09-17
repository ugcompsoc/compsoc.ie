import { motion, useMotionValue, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollbarProps extends React.ComponentProps<"div"> {
	parentRef: React.RefObject<HTMLElement | null>;
}

function Scrollbar({ className, parentRef }: ScrollbarProps) {
	const scrollbarRef = useRef<HTMLDivElement>(null);
	const scrollbarY = useMotionValue(0);
	const scrollbarHeight = useMotionValue(64);

	// Cache DOM measurements to avoid repeated calculations
	const measurementsRef = useRef({
		containerHeight: 0,
		totalScrollHeight: 0,
		calculatedHeight: 64,
		availableDragArea: 0,
	});

	// Only initialize useScroll after component is mounted and parentRef is available
	const { scrollYProgress } = useScroll({
		container: parentRef.current ? parentRef : undefined,
	});

	// Function to update scrollbar height and position
	const updateScrollbar = useCallback(
		(scrollProgress: number) => {
			if (!parentRef.current) return;

			const containerHeight = parentRef.current.clientHeight;
			const totalScrollHeight = parentRef.current.scrollHeight;

			// Always recalculate measurements to handle page changes
			const visibleRatio = containerHeight / totalScrollHeight;
			const calculatedHeight = Math.max(
				64,
				(containerHeight * visibleRatio) / 2,
			);
			const availableDragArea = containerHeight - calculatedHeight;

			// Update cached measurements
			measurementsRef.current = {
				containerHeight,
				totalScrollHeight,
				calculatedHeight,
				availableDragArea,
			};

			// Update height and position
			scrollbarHeight.set(calculatedHeight);
			scrollbarY.set(scrollProgress * availableDragArea);
		},
		[parentRef, scrollbarY, scrollbarHeight],
	);

	// Scroll event handler
	const handleScroll = useCallback(() => {
		updateScrollbar(scrollYProgress.get());
	}, [updateScrollbar, scrollYProgress]);

	// Setup observers and listeners
	useEffect(() => {
		if (!parentRef.current) return;

		const parent = parentRef.current;

		// Resize observer
		const resizeObserver = new ResizeObserver(() => {
			updateScrollbar(scrollYProgress.get());
		});

		// Mutation observer for content changes
		const mutationObserver = new MutationObserver(() => {
			updateScrollbar(scrollYProgress.get());
		});

		// Setup observers
		resizeObserver.observe(parent);
		mutationObserver.observe(parent, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ["style", "class"],
		});

		// Add scroll listener
		parent.addEventListener("scroll", handleScroll);

		// Initial update
		updateScrollbar(scrollYProgress.get());

		return () => {
			resizeObserver.disconnect();
			mutationObserver.disconnect();
			parent.removeEventListener("scroll", handleScroll);
		};
	}, [parentRef.current, updateScrollbar, scrollYProgress, handleScroll]);

	// Drag functionality
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartY, setDragStartY] = useState(0);
	const [initialScrollbarY, setInitialScrollbarY] = useState(0);

	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			setIsDragging(true);
			setDragStartY(e.clientY);
			setInitialScrollbarY(scrollbarY.get());
			e.preventDefault();
		},
		[scrollbarY],
	);

	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging || !parentRef.current) return;

			const measurements = measurementsRef.current;

			// Calculate new scrollbar position based on drag
			const deltaY = e.clientY - dragStartY;
			const newScrollbarY = Math.max(
				0,
				Math.min(initialScrollbarY + deltaY, measurements.availableDragArea),
			);

			// Calculate scroll position from scrollbar position
			const scrollProgress = newScrollbarY / measurements.availableDragArea;
			const maxScroll =
				measurements.totalScrollHeight - measurements.containerHeight;
			const newScrollTop = scrollProgress * maxScroll;

			// Update scroll position
			parentRef.current.scrollTop = newScrollTop;
		},
		[isDragging, dragStartY, initialScrollbarY, parentRef],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Drag event listeners
	useEffect(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}
	}, [isDragging, handleMouseMove, handleMouseUp]);

	// Memoized motion variants to prevent recreation on every render
	const scrollbarMotion = useRef({
		rest: { width: 8, transition: { duration: 0.2 }, right: 2 },
		hover: { width: 16, transition: { duration: 0.2 }, right: 2 },
		drag: { width: 20, transition: { duration: 0.2 }, right: 4 },
	}).current;

	// Memoized transition config
	const transition = useRef({ duration: 0.5 }).current;

	return (
		<motion.div
			style={{
				top: scrollbarY,
				right: 0,
				height: scrollbarHeight,
			}}
			initial="rest"
			animate={isDragging ? "drag" : "rest"}
			whileHover="hover"
			onMouseDown={handleMouseDown}
			ref={scrollbarRef}
			className="absolute w-6 flex cursor-pointer z-9999 select-none"
		>
			<motion.div
				style={{ height: scrollbarHeight }}
				variants={scrollbarMotion}
				transition={transition}
				className={cn(
					"bg-zinc-500/30 backdrop-blur-xs border-1 border-neutral-400/50 shadow-md fixed rounded-md origin-right",
					className,
				)}
			/>
		</motion.div>
	);
}

export { Scrollbar };
