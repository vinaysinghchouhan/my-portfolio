import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initHeroAnimation() {
  // ── Set initial states (page starts completely black / invisible) ──
  gsap.set('body', { backgroundColor: '#0a0a0a' })

  gsap.set('.sidebar__nav-item', { x: -56, opacity: 0 })
  gsap.set('.hero__intro-text', { y: -48, opacity: 0 })
  gsap.set('.hero__headline', { y: -72, opacity: 0 })
  gsap.set('.hero__positioning', { opacity: 0 })
  gsap.set('.hero__bio p', { x: -32, opacity: 0 })
  gsap.set('.hero__proof p', { opacity: 0 })
  gsap.set(
    [
      '.pill',
      '.info-bar__role',
      '.info-bar__availability',
      '.info-bar__location',
      '.info-bar .info-bar__cta',
    ],
    { x: -32, opacity: 0 }
  )
  gsap.set('.hero__bg-wrapper', { opacity: 0 })

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

  // Step 2 — "Hi, I am" text fades in and slides down from top
  tl.to(
    '.hero__intro-text',
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    },
    '-=0.3'
  )

  // Step 3 — Headline fades in and drops from above (after intro finishes)
  tl.to(
    '.hero__headline',
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }
  )

  // Step 3.5 — Positioning line fades in after headline
  tl.to(
    '.hero__positioning',
    {
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    },
    '-=0.2'
  )

  // Step 4 — Bio text slides in from left to right with fade
  tl.to(
    '.hero__bio p',
    {
      x: 0,
      opacity: 1,
      duration: 0.65,
      ease: 'power2.out',
    },
    '-=0.3'
  )

  // Step 4.5 — Proof line fades in after bio
  tl.to(
    '.hero__proof p',
    {
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    },
    '-=0.2'
  )

  // Step 5 — Info bar items stagger left → right, one by one
  tl.to(
    '.pill, .info-bar__role, .info-bar__availability, .info-bar__location, .info-bar .info-bar__cta',
    {
      x: 0,
      opacity: 1,
      duration: 0.48,
      stagger: 0.09,
      ease: 'power2.out',
    },
    '-=0.2'
  )

  // Step 6 — Background image fades in from opacity 0 to 1
  tl.to(
    '.hero__bg-wrapper',
    {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    },
    '-=0.4'
  )
}

