import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSimpleAnimation() {
  const section = document.querySelector('.simple')
  const words = document.querySelectorAll('.simple__heading span')

  if (!section || words.length === 0) return

  // Set all words to grey on page load
  gsap.set(words, { color: '#cccccc' })

  // Single ScrollTrigger with pin on section
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: () => `+=${window.innerHeight * 1.5}px`,
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      const progress = self.progress
      words.forEach((word, index) => {
        const wordProgress = (progress * words.length) - index
        if (wordProgress <= 0) {
          gsap.set(word, { color: '#cccccc' })
        } else if (wordProgress >= 1) {
          gsap.set(word, { color: '#111111' })
        } else {
          gsap.set(word, { color: gsap.utils.interpolate('#cccccc', '#111111', wordProgress) })
        }
      })
    }
  })
}