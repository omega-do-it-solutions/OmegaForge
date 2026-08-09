import { useCallback, useEffect, useRef, useState } from 'react'
import { throttle } from './throttle.ts'

export const handbookSectionIds = [
  'start',
  'workflows',
  'how-it-works',
  'about',
  'faq',
] as const

export type HandbookSectionId = (typeof handbookSectionIds)[number]

function getActivationLine() {
  return Math.min(160, window.innerHeight * 0.22)
}

function hasReachedSection(sectionId: HandbookSectionId, activationLine: number) {
  const target = document.getElementById(sectionId)

  return (
    (sectionId === 'start' && window.scrollY <= 2) ||
    (sectionId === 'faq' &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) ||
    (target !== null && Math.abs(target.getBoundingClientRect().top - activationLine) <= 64)
  )
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<HandbookSectionId>('start')
  const pendingNavigation = useRef<{ sectionId: HandbookSectionId; expiresAt: number } | null>(null)

  const activateSection = useCallback((sectionId: HandbookSectionId) => {
    pendingNavigation.current = hasReachedSection(sectionId, getActivationLine())
      ? null
      : { sectionId, expiresAt: Date.now() + 1_500 }
    setActiveSection(sectionId)
  }, [])

  useEffect(() => {
    function updateActiveSection() {
      const activationLine = getActivationLine()
      const pending = pendingNavigation.current

      if (pending) {
        if (!hasReachedSection(pending.sectionId, activationLine) && Date.now() < pending.expiresAt) {
          return
        }
        pendingNavigation.current = null
      }

      let nextSection: HandbookSectionId = 'start'

      for (const sectionId of handbookSectionIds) {
        const section = document.getElementById(sectionId)
        if (!section || section.getBoundingClientRect().top > activationLine) break
        nextSection = sectionId
      }

      const reachedPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (reachedPageEnd) nextSection = handbookSectionIds.at(-1)!

      setActiveSection((currentSection) =>
        currentSection === nextSection ? currentSection : nextSection,
      )
    }

    const throttledUpdate = throttle(updateActiveSection, 100)
    const settleTimer = window.setTimeout(throttledUpdate, 500)

    updateActiveSection()
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    window.addEventListener('resize', throttledUpdate)
    window.addEventListener('hashchange', throttledUpdate)

    return () => {
      window.clearTimeout(settleTimer)
      throttledUpdate.cancel()
      window.removeEventListener('scroll', throttledUpdate)
      window.removeEventListener('resize', throttledUpdate)
      window.removeEventListener('hashchange', throttledUpdate)
    }
  }, [])

  return { activeSection, activateSection }
}
