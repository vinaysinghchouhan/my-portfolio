import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initProcessAnimation() {
  const cards = document.querySelectorAll('.process__card')

  if (cards.length === 0) return

  // Animate scale down on cards as the next one covers them
  cards.forEach((card, index) => {
    if (index < cards.length - 1) {
      // Get the next card to use as trigger
      const nextCard = cards[index + 1]

      gsap.to(card, {
        scale: 0.95,
        scrollTrigger: {
          trigger: nextCard,
          start: 'top center',
          end: 'top top',
          scrub: 1,
          markers: false,
        },
      })
    }
  })
}
