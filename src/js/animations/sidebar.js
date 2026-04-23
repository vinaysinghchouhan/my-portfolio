import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initSidebarAnimation() {
  const sidebar = document.querySelector('.sidebar')
  if (!sidebar) return

  // Gracefully hide the sidebar as the footer approaches the viewport,
  // and restore it when scrolling back up
  ScrollTrigger.create({
    trigger: '.footer',
    start: 'top 80%',
    end: 'top 20%',
    onEnter: () => gsap.to(sidebar, { opacity: 0, x: -12, duration: 0.45, ease: 'power2.in' }),
    onLeaveBack: () => gsap.to(sidebar, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }),
  })
}
