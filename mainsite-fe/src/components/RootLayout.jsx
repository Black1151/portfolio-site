'use client'

import {
  createContext,
  useEffect,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import { motion, MotionConfig, useReducedMotion } from 'framer-motion'
import { Footer } from '@/components/Footer'
import { GridPattern } from '@/components/GridPattern'
import { FadeIn } from './FadeIn'

const RootLayoutContext = createContext({})


function RootLayoutInner({ children }) {
  let shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    function onClick(event) {
      if (event.target.closest('a')?.href === window.location.href) {
        setExpanded(false)
      }
    }

    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <motion.div
        layout
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
        className="relative flex flex-auto overflow-hidden bg-white pt-14"
      >
        <motion.div
          layout
          className="relative isolate flex w-full flex-col pt-9"
        >
          <FadeIn shouldMove={false}>
            <GridPattern
              className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-orange-500 stroke-orange-300 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_40%)] "
              yOffset={-96}
              interactive
            />
          </FadeIn>

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </motion.div>
      </motion.div>
    </MotionConfig>
  )
}

export function RootLayout({ children }) {
  let pathname = usePathname()
  let [logoHovered, setLogoHovered] = useState(false)

  return (
    <RootLayoutContext.Provider value={{ logoHovered, setLogoHovered }}>
      <RootLayoutInner key={pathname}>{children}</RootLayoutInner>
    </RootLayoutContext.Provider>
  )
}
