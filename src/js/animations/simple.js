import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSimpleAnimation() {
  const section = document.querySelector('.intro')
  const words = document.querySelectorAll('.intro__word')

  if (!section || words.length === 0) return

  // Set all words to grey on page load
  gsap.set(words, { color: '#222020' })

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
        // Determine final color based on data-orange attribute
        const finalColor = word.hasAttribute('data-orange') ? '#ff5500' : '#ffffff'

        if (wordProgress <= 0) {
          gsap.set(word, { color: '#222020' })
        } else if (wordProgress >= 1) {
          gsap.set(word, { color: finalColor })
        } else {
          gsap.set(word, { color: gsap.utils.interpolate('#222020', finalColor, wordProgress) })
        }
      })
    }
  })
}