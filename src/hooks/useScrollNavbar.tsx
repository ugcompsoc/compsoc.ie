import { useEffect } from "react";

/**
 * NavbarScrollController - Controls the visibility of an existing navbar based on scroll direction
 *
 * This component doesn't render anything, it just adds scroll behavior to an existing navbar
 * identified by the specified selector.
 */
const NavbarScrollController = () => {
	useEffect(() => {
		// The CSS selector for your navbar - change this to match your navbar
		const navbarSelector = "nav"; // Could be '.navbar', '#main-nav', etc.
		let lastScrollY = window.scrollY;
		let ticking = false;

		const updateNavbar = () => {
			const navbar = document.querySelector(navbarSelector) as HTMLElement;
			if (!navbar) return;

			const currentScrollY = window.scrollY;

			// Scrolling down - hide navbar
			if (currentScrollY > lastScrollY) {
				navbar.style.transform = "translateY(-100%)";
			}
			// Scrolling up - show navbar
			else {
				navbar.style.transform = "translateY(0)";
			}

			// Always show navbar at the top of the page
			if (currentScrollY === 0) {
				navbar.style.transform = "translateY(0)";
			}

			// Ensure the navbar is fixed at the top, if removed navbar would flick on page change
			if (navbar.style.position !== "fixed") {
				navbar.style.position = "fixed";
				navbar.style.top = "0";
				navbar.style.left = "0";
				navbar.style.right = "0";

				// Add padding to the body to prevent content jump
				// when navbar becomes fixed
				document.body.style.paddingTop = `${navbar.offsetHeight}px`;
			}

			lastScrollY = currentScrollY;
			ticking = false;
		};

		const onScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(updateNavbar);
				ticking = true;
			}
		};

		// Add scroll event listener
		window.addEventListener("scroll", onScroll, { passive: true });

		// Initial setup
		updateNavbar();

		// Cleanup
		return () => {
			window.removeEventListener("scroll", onScroll);

			// Reset styles when component unmounts
			const navbar = document.querySelector(navbarSelector) as HTMLElement;
			if (navbar) {
				navbar.style.transform = "";
				navbar.style.transition = "";
				// Only reset position if we changed it
				if (navbar.style.position === "fixed") {
					navbar.style.position = "";
					navbar.style.top = "";
					navbar.style.left = "";
					navbar.style.right = "";
					navbar.style.zIndex = "";
					document.body.style.paddingTop = "";
				}
			}
		};
	}, []);

	// This component doesn't render anything
	return null;
};

export default NavbarScrollController;
