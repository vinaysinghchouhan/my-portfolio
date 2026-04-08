import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initLenis } from './lenis-setup.js'
import { initHeroAnimation } from './animations/hero.js'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Initialise smooth scroll
const lenis = initLenis()

// Tell ScrollTrigger to use Lenis's scroll position
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) {
      lenis.scrollTo(value, { immediate: true })
    }
    return lenis.scroll
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  },
})

lenis.on('scroll', () => ScrollTrigger.update())

// Run hero entrance animation after DOM is ready
initHeroAnimation()
