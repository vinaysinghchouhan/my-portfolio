export function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger')
  const mobileMenu = document.querySelector('.mobile-menu')
  const closeBtn = document.querySelector('.mobile-menu__close')
  const menuLinks = document.querySelectorAll('.mobile-menu__link')

  if (!hamburger || !mobileMenu) return

  // Open menu on hamburger click
  hamburger.addEventListener('click', () => {
    hamburger.classList.add('active')
    hamburger.setAttribute('aria-expanded', 'true')
    mobileMenu.classList.add('active')
    document.body.style.overflow = 'hidden'
  })

  // Close menu function
  const closeMenu = () => {
    hamburger.classList.remove('active')
    hamburger.setAttribute('aria-expanded', 'false')
    mobileMenu.classList.remove('active')
    document.body.style.overflow = 'auto'
  }

  // Close menu on close button click
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu)
  }

  // Close menu on menu link click
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu)
  })

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu()
    }
  })

  // Close menu on outside click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMenu()
    }
  })
}
