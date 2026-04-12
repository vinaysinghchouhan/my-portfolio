export function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger')
  const mobileMenu = document.querySelector('.mobile-menu')
  const menuLinks = document.querySelectorAll('.mobile-menu__link')

  if (!hamburger || !mobileMenu) return

  // Close menu function
  const closeMenu = () => {
    hamburger.classList.remove('active')
    hamburger.setAttribute('aria-expanded', 'false')
    mobileMenu.classList.remove('active')
    document.body.style.overflow = 'auto'
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active')
    if (isOpen) {
      closeMenu()
    } else {
      hamburger.classList.add('active')
      hamburger.setAttribute('aria-expanded', 'true')
      mobileMenu.classList.add('active')
      document.body.style.overflow = 'hidden'
    }
  })

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
}

