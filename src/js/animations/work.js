import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initWorkAnimation() {
  const hOuter = document.querySelector('.work__h-outer')
  const hTrack = document.querySelector('.work__h-track')

  if (!hOuter || !hTrack) return

  // Horizontal scroll disabled below tablet — responsive override handles stacking
  const mq = window.matchMedia('(max-width: 1023px)')
  if (mq.matches) return

  // Phase 2: map vertical scroll progress to horizontal translation.
  // ScrollTrigger pins .work__h-outer and scrubs the track's x position.
  const getDistance = () => hTrack.scrollWidth - window.innerWidth

  gsap.to(hTrack, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: hOuter,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  })

  ScrollTrigger.refresh()
}
