import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function initFooterAnimation() {
  const footer = document.querySelector('.footer')
  const dome = document.querySelector('.footer__dome')
  const clock = document.querySelector('.footer__clock')
  const goTop = document.querySelector('[data-go-top]')

  if (!footer || !dome) return

  // ── Live clock ────────────────────────────────────────────────
  if (clock) {
    const tick = () => {
      const now = new Date()
      const h = now.getHours() % 12 || 12
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM'
      clock.textContent = `${String(h).padStart(2, '0')}:${m}:${s} ${ampm}`
    }
    tick()
    setInterval(tick, 1000)
  }

  // ── GO TO TOP — uses lenis if available, native fallback ──────
  if (goTop) {
    goTop.addEventListener('click', (e) => {
      e.preventDefault()
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 2 })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    })
  }

  // ── Dome scroll reveal ────────────────────────────────────────
  // Dome is position:fixed — it stays at viewport bottom and grows
  // upward as the user scrolls into the footer section.
  gsap.set(dome, { width: '30vw', height: '0vh' })

  const domeTl = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: 'top bottom',   // footer top hits viewport bottom
      end: 'top 15%',        // footer top reaches 15% from viewport top
      scrub: 1,
    },
  })

  domeTl.to(dome, {
    width: '260vw',
    height: '120vh',
    ease: 'none',
  })

  // Hide dome once user scrolls back above the footer
  ScrollTrigger.create({
    trigger: footer,
    start: 'top bottom',
    onLeaveBack: () => gsap.set(dome, { width: '30vw', height: '0vh' }),
  })
}
