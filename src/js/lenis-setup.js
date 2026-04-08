import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  })

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Drive Lenis via GSAP ticker for frame-perfect sync
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}
