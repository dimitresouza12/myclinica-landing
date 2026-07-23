'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function useScrollTracking() {
  useEffect(() => {
    const trackedDepths = new Set<number>()

    const handleScroll = () => {
      if (typeof window === 'undefined') return

      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const totalScroll = documentHeight - windowHeight
      if (totalScroll === 0) return

      const percentScrolled = Math.round((scrollTop / totalScroll) * 100)

      // Rastreia em marcos: 25, 50, 75, 100
      const milestones = [25, 50, 75, 100]
      for (const milestone of milestones) {
        if (percentScrolled >= milestone && !trackedDepths.has(milestone)) {
          trackedDepths.add(milestone)
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'scroll_depth', {
              percent_scrolled: milestone,
              page_path: window.location.pathname,
            })
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}
