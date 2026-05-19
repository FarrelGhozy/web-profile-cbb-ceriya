import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header')
  const hamburgerBtn = document.getElementById('hamburger-btn')
  const hamburgerIcon = document.getElementById('hamburger-icon')
  const mobileMenu = document.getElementById('mobile-menu')
  const navLinks = document.querySelectorAll('.nav-link')
  const mobileLinks = document.querySelectorAll('.mobile-link')
  const backToTop = document.getElementById('back-to-top')

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : mobileMenu.classList.contains('invisible')
    mobileMenu.classList.toggle('invisible', !isOpen)
    mobileMenu.classList.toggle('opacity-0', !isOpen)
    mobileMenu.classList.toggle('visible', isOpen)
    mobileMenu.classList.toggle('opacity-100', isOpen)
    hamburgerBtn.setAttribute('aria-expanded', isOpen)
    document.body.style.overflow = isOpen ? 'hidden' : ''
    if (isOpen && hamburgerIcon) {
      hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
    } else if (hamburgerIcon) {
      hamburgerIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />'
    }
  }

  hamburgerBtn?.addEventListener('click', () => toggleMobileMenu())

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false))
  })

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('invisible')) {
      toggleMobileMenu(false)
    }
  })

  function handleScroll() {
    const scrollY = window.scrollY
    if (scrollY > 50) {
      header?.classList.add('bg-white/95', 'shadow-sm', 'backdrop-blur-md')
      header?.classList.remove('bg-transparent')
    } else {
      header?.classList.remove('bg-white/95', 'shadow-sm', 'backdrop-blur-md')
      header?.classList.add('bg-transparent')
    }

    if (backToTop) {
      backToTop.classList.toggle('opacity-0', scrollY < 300)
      backToTop.classList.toggle('pointer-events-none', scrollY < 300)
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()

  const sections = document.querySelectorAll('section[id]')
  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            navLinks.forEach(link => {
              link.classList.remove('text-primary')
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('text-primary')
              }
            })
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach(s => sectionObserver.observe(s))
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href')
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId)
        if (target) {
          e.preventDefault()
          const headerHeight = header?.offsetHeight || 0
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight
          window.scrollTo({ top: targetPosition, behavior: 'smooth' })
        }
      }
    })
  })

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

  const contactForm = document.getElementById('contact-form')
  contactForm?.addEventListener('submit', e => {
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const message = document.getElementById('message')
    let valid = true

    document.querySelectorAll('.form-error').forEach(el => el.remove())

    function showError(input, msg) {
      valid = false
      const error = document.createElement('p')
      error.className = 'form-error mt-1 text-sm text-red-500'
      error.textContent = msg
      input.parentNode.appendChild(error)
      input.classList.add('border-red-400')
    }

    function clearError(input) {
      input.classList.remove('border-red-400')
    }

    if (!name?.value.trim()) {
      showError(name, 'Nama lengkap harus diisi')
    } else {
      clearError(name)
    }

    if (!email?.value.trim()) {
      showError(email, 'Email harus diisi')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Format email tidak valid')
    } else {
      clearError(email)
    }

    if (!message?.value.trim()) {
      showError(message, 'Pesan harus diisi')
    } else {
      clearError(message)
    }

    if (!valid) {
      e.preventDefault()
    }
  })
})
