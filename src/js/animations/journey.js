import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initJourneyAnimation() {
  const section = document.querySelector('.journey')
  const line = document.querySelector('.journey__line')
  const cards = document.querySelectorAll('.journey__card')
  const timeline = document.querySelector('.journey__timeline')

  console.log('Journey Animation: section found?', !!section, 'line found?', !!line, 'cards found?', cards.length)

  if (!section || !line || cards.length === 0 || !timeline) return

  // Calculate line height to stop exactly at the last card's bottom edge
  const calculateLineHeight = () => {
    const lastCard = cards[cards.length - 1]
    if (!lastCard) return

    // Get the last card's position relative to the timeline (its positioned parent)
    const lastCardOffsetTop = lastCard.offsetTop
    const lastCardHeight = lastCard.offsetHeight

    // Line height = top of last card + height of last card
    const lineHeight = lastCardOffsetTop + lastCardHeight

    // Set CSS variable for line height
    timeline.style.setProperty('--journey-line-height', `${lineHeight}px`)
  }

  // Calculate on mount and on resize
  calculateLineHeight()
  window.addEventListener('resize', calculateLineHeight)

  // Create the line animation
  const lineTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false,
    },
  })

  lineTimeline.from(line, { scaleY: 0 }, 0)

  // Animate each card to fade in at calculated points
  cards.forEach((card, index) => {
    console.log(`Card ${index} ScrollTrigger being created for:`, card)

    gsap.to(card, {
      opacity: 1,
      scrollTrigger: {
        trigger: card,
        start: 'top center+=100px',
        end: 'center center',
        scrub: 1,
        markers: false,
      },
    })
  })

  // Refresh ScrollTrigger after all triggers are created
  ScrollTrigger.refresh()
}
