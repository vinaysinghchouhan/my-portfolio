import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initHeroAnimation() {
  // ── Set initial states (page starts completely black / invisible) ──
  gsap.set('.sidebar__nav-item', { x: -56, opacity: 0 })
  gsap.set('.hero__headline', { y: -72, opacity: 0 })
  gsap.set(
    [
      '.pill',
      '.info-bar__role',
      '.info-bar__availability',
      '.info-bar__location',
      '.info-bar__cta',
    ],
    { x: -32, opacity: 0 }
  )

  // ── Master timeline ────────────────────────────────────────────
  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    delay: 0.15, // tiny pause so the black frame registers
  })

  // Step 1 — Sidebar nav items slide in from left with stagger
  tl.to('.sidebar__nav-item', {
    x: 0,
    opacity: 1,
    duration: 0.75,
    stagger: 0.11,
    ease: 'power2.out',
  })

  // Step 2 — Headline fades in and drops from above
  tl.to(
    '.hero__headline',
    {
      y: 0,
      opacity: 1,
      duration: 1.05,
      ease: 'power3.out',
    },
    '-=0.45'
  )

  // Step 3 — Info bar items stagger left → right, one by one
  //   selector string expands to: pill×4, role, availability, location, cta
  tl.to(
    '.pill, .info-bar__role, .info-bar__availability, .info-bar__location, .info-bar__cta',
    {
      x: 0,
      opacity: 1,
      duration: 0.48,
      stagger: 0.09,
      ease: 'power2.out',
    },
    '-=0.5'
  )

  // ── Scroll-triggered image reveal ─────────────────────────────
  // Image starts completely clipped (top inset 100%) so nothing is visible.
  // As user scrolls the clip shrinks, revealing the image from the bottom up.
  gsap.set('.hero-image__wrapper', { clipPath: 'inset(100% 0% 0% 0%)' })

  const imgTrigger = {
    trigger: '.hero-image__wrapper',
    start: 'top 88%',
    end: 'top 20%',
    scrub: 1.8,
  }

  // Clip-path reveal
  gsap.to('.hero-image__wrapper', {
    clipPath: 'inset(0% 0% 0% 0%)',
    ease: 'none',
    scrollTrigger: imgTrigger,
  })

  // Subtle scale-down as the image reveals (adds depth)
  gsap.fromTo(
    '.hero-image__img',
    { scale: 1.18, y: 24 },
    {
      scale: 1,
      y: 0,
      ease: 'none',
      scrollTrigger: imgTrigger,
    }
  )
}
