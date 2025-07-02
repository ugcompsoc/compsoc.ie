import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import HeroComponent from '@/components/sections/Home/HeroComponent'
import AboutComponent from '@/components/sections/Home/AboutComponent'
import InfographicComponent from '@/components/sections/Home/InfographicComponent'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    const scrollRef = useRef(null)
    const { scrollY } = useScroll()
    // 70% of window height
    const triggerPoint = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 1
    const overlayOpacity = useTransform(scrollY, [0, triggerPoint], [0.1, 1], { clamp: true })
    return (
        <div ref={scrollRef} className="relative flex flex-col min-h-screen">
            {/* Parallax background image */}
            <div
                className="pointer-events-none select-none fixed inset-0 z-0 bg-[url(assets/img/hero-bg.webp)] bg-center bg-cover bg-fixed"
                aria-hidden="true"
            >
                <motion.div
                    style={{ opacity: overlayOpacity, backgroundColor: 'var(--foreground)' }}
                    className="absolute inset-0"
                />
            </div>
            {/* Content above parallax bg */}
            <div className="relative z-10 flex flex-col">
                <HeroComponent />
                <div className="flex flex-col items-center w-full pt-8 md:pt-16 gap-8 md:gap-12 min-h-screen bg-background">
                    <div className="flex-1 w-full flex flex-col items-center">
                        <AboutComponent />
                    </div>
                    <div className="flex-1 w-full flex flex-col items-center">
                        <InfographicComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}
