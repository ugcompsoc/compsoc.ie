import { createRootRoute, Link, Outlet, useRouter } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { motion, useScroll, useMotionValueEvent, Variants } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { PCNavigationMenu, MobileNavigationMenu } from '@/components/ui/navigation-menu'
import { Footer } from '@/components/ui/footer'
import { cn } from '@/lib/utils'

// Custom 404 component
function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
            <a href="/" className="text-blue-500 hover:underline">
                Go back home
            </a>
        </div>
    )
}

export const Route = createRootRoute({
    component: () => {
        const { scrollY } = useScroll()
        const prevScrollY = useRef(0)
        const [visible, setVisible] = useState(true)
        const router = useRouter()
        const currentPath = router.state.location.pathname

        useMotionValueEvent(scrollY, 'change', (latest) => {
            // Always show navbar at the top of the page
            if (latest <= 0) {
                setVisible(true)
                prevScrollY.current = latest
                return
            }

            // Only update visibility when scroll difference is significant
            const diff = latest - prevScrollY.current
            if (Math.abs(diff) < 10) return

            // Update state based on scroll direction
            const isScrollingDown = diff > 0
            setVisible(!isScrollingDown)

            // Update previous scroll position
            prevScrollY.current = latest
        })

        useEffect(() => {
            const handleMouseMove = (e: MouseEvent) => {
                if (e.clientY <= menuBarHeight) {
                    setVisible(true)
                }
            }
            window.addEventListener('mousemove', handleMouseMove)
            return () => window.removeEventListener('mousemove', handleMouseMove)
        }, [])

        useEffect(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        }, [currentPath])

        const menuBarHeight = 256 // px, h-64 in Tailwind

        // Variants for the animation
        const navbarVariants: Variants = {
            visible: {
                y: 0,
                transition: {
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                },
            },
            hidden: {
                y: -150,
                transition: {
                    duration: 0.5,
                    ease: [0.47, 0, 0.75, 0.72],
                },
            },
        }

        return (
            <>
                {/* Desktop top menu (hidden on mobile) */}
                <motion.div
                    className="fixed flex-row items-center z-[9999] justify-between w-screen px-8 pt-2 hidden md:flex"
                    initial="visible"
                    animate={visible ? 'visible' : 'hidden'}
                    variants={navbarVariants}
                >
                    <div
                        className={cn(
                            'flex flex-shrink-0 rounded-xl justify-center items-center h-14 pr-4.5 pl-3.5 gap-2',
                            'bg-neutral-900/75 backdrop-blur-sm border border-neutral-800/70 shadow-lg text-neutral-100',
                        )}
                    >
                        <img
                            src="assets/img/compsoc_logo.png"
                            alt=""
                            className="h-10 relative object-contain"
                        />
                        <div className="flex flex-col justify-center items-center h-full font-[Poppins,sans-serif] mt-[-0.25rem]">
                            <h1 className="text-[1.25rem] font-medium">CompSoc</h1>
                            <p className="text-[0.625rem] mt-[-0.375rem] ml-[1px] font-light opacity-75">
                                University of Galway
                            </p>
                        </div>
                    </div>
                    <PCNavigationMenu />
                </motion.div>
                {/* 
            in case of mobile menu height change, change height of div element below to h-[calc(100vh-x)] where x is the height of the mobile menu.
            */}
                <div className="flex flex-col h-[calc(100vh-4.5rem)] md:h-full w-full overflow-x-hidden">
                    <Outlet />
                    <Footer />
                </div>
                {/* Mobile bottom nav */}
                <MobileNavigationMenu />
                <TanStackRouterDevtools />
            </>
        )
    },
    notFoundComponent: NotFound,
})
