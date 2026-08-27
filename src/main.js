import './style.css'
import { testimonials } from './utils/constants.js'

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header')
  const menuButton = document.getElementById('hamburger-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  const mobilePanel = mobileMenu?.querySelector('.mobile-menu-panel')
  const mobileBackdrop = mobileMenu?.querySelector('.mobile-menu-backdrop')
  const mobileLinks = mobileMenu?.querySelectorAll('a') || []
  const navLinks = document.querySelectorAll('.nav-link')
  const backToTop = document.getElementById('back-to-top')
  const mobileCta = document.getElementById('mobile-cta')
  const contactSection = document.getElementById('contact')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lastFocusedElement = null
  let contactIsVisible = false

  function setMobileMenu(open) {
    if (!mobileMenu || !menuButton) return
    lastFocusedElement = open ? document.activeElement : lastFocusedElement
    mobileMenu.setAttribute('aria-hidden', String(!open))
    menuButton.setAttribute('aria-expanded', String(open))
    menuButton.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi')
    document.body.classList.toggle('menu-open', open)

    if (open) {
      requestAnimationFrame(() => mobilePanel?.querySelector('a')?.focus())
    } else if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus()
    }
  }

  menuButton?.addEventListener('click', () => {
    setMobileMenu(menuButton.getAttribute('aria-expanded') !== 'true')
  })
  mobileBackdrop?.addEventListener('click', () => setMobileMenu(false))
  mobileLinks.forEach(link => link.addEventListener('click', () => setMobileMenu(false)))

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (mobileMenu?.getAttribute('aria-hidden') === 'false') setMobileMenu(false)
      if (document.getElementById('lightbox')?.getAttribute('aria-hidden') === 'false') closeLightbox()
    }

    if (event.key === 'Tab' && mobileMenu?.getAttribute('aria-hidden') === 'false') {
      const focusable = [menuButton, ...(mobilePanel?.querySelectorAll('a, button') || [])]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  })

  function updateFixedUi() {
    const scrolled = window.scrollY > 16
    header?.classList.toggle('is-scrolled', scrolled)
    backToTop?.classList.toggle('is-visible', window.scrollY > 700)
    mobileCta?.classList.toggle('is-visible', window.scrollY > 620 && !contactIsVisible)
  }

  window.addEventListener('scroll', updateFixedUi, { passive: true })
  updateFixedUi()

  if (contactSection && 'IntersectionObserver' in window) {
    const contactObserver = new IntersectionObserver(([entry]) => {
      contactIsVisible = entry.isIntersecting
      updateFixedUi()
    }, { threshold: 0.12 })
    contactObserver.observe(contactSection)
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const selector = link.getAttribute('href')
      if (!selector || selector === '#') return
      const target = document.querySelector(selector)
      if (!target) return
      event.preventDefault()
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
    })
  })

  const observedSections = [...document.querySelectorAll('main section[id]')]
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`)
      })
    }, { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] })
    observedSections.forEach(section => sectionObserver.observe(section))
  }

  const animatedElements = document.querySelectorAll('[data-animate]')
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('motion-ready')
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('animate-visible')
        revealObserver.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -20px' })
    animatedElements.forEach(element => revealObserver.observe(element))
  } else {
    animatedElements.forEach(element => element.classList.add('animate-visible'))
  }

  const galleryData = [
    { id: 'wisuda', name: 'Wisuda', images: ['images/photos/galeri-wisuda-1.webp', 'images/photos/galeri-wisuda-2.webp', 'images/photos/galeri-wisuda-3.webp'] },
    { id: 'studytour', name: 'Study Tour', images: ['images/photos/galeri-study-tour-1.webp', 'images/photos/galeri-study-tour-2.webp', 'images/photos/galeri-study-tour-3.webp'] },
    { id: 'belajar', name: 'Belajar di Kelas', images: ['images/photos/galeri-kelas-1.webp', 'images/photos/galeri-kelas-2.webp', 'images/photos/galeri-kelas-3.webp'] },
    { id: 'ngaji', name: 'Ngaji Bersama', images: ['images/photos/galeri-ngaji-1.webp', 'images/photos/galeri-ngaji-2.webp', 'images/photos/galeri-ngaji-3.webp'] },
  ]
  const galleryTabs = document.getElementById('gallery-tabs')
  const galleryGrid = document.getElementById('gallery-grid')
  const galleryPanel = document.getElementById('gallery-panel')
  let activeGallery = galleryData[0].id

  function renderGalleryTabs() {
    if (!galleryTabs) return
    galleryTabs.innerHTML = galleryData.map(category => {
      const isActive = category.id === activeGallery
      return `<button id="gallery-tab-${category.id}" class="gallery-tab" type="button" role="tab" aria-selected="${isActive}" aria-controls="gallery-panel" tabindex="${isActive ? '0' : '-1'}" data-category="${category.id}">${category.name}<span>${category.images.length}</span></button>`
    }).join('')
    galleryPanel?.setAttribute('aria-labelledby', `gallery-tab-${activeGallery}`)
  }

  function renderGalleryGrid() {
    if (!galleryGrid) return
    const category = galleryData.find(item => item.id === activeGallery)
    if (!category) return
    galleryGrid.innerHTML = category.images.map((src, index) => `
      <button type="button" class="gallery-card gallery-trigger" data-src="${src}" data-alt="${category.name}, dokumentasi ${index + 1}" aria-label="Perbesar ${category.name}, dokumentasi ${index + 1}">
        <img src="${src}" alt="${category.name}, dokumentasi ${index + 1}" loading="lazy" />
        <span class="gallery-caption"><span>${category.name}</span><small>Lihat gambar ↗</small></span>
      </button>
    `).join('')
  }

  function setGalleryCategory(categoryId, focusTab = false) {
    if (!galleryData.some(item => item.id === categoryId)) return
    activeGallery = categoryId
    renderGalleryTabs()
    renderGalleryGrid()
    if (focusTab) document.getElementById(`gallery-tab-${activeGallery}`)?.focus()
  }

  galleryTabs?.addEventListener('click', event => {
    const tab = event.target.closest('[data-category]')
    if (tab) setGalleryCategory(tab.dataset.category)
  })

  galleryTabs?.addEventListener('keydown', event => {
    const currentIndex = galleryData.findIndex(item => item.id === activeGallery)
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % galleryData.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + galleryData.length) % galleryData.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = galleryData.length - 1
    setGalleryCategory(galleryData[nextIndex].id, true)
  })

  renderGalleryTabs()
  renderGalleryGrid()

  const lightbox = document.getElementById('lightbox')
  const lightboxImage = document.getElementById('lightbox-img')
  const lightboxClose = document.getElementById('lightbox-close')
  let lightboxTrigger = null

  function openLightbox(src, alt, trigger) {
    if (!lightbox || !lightboxImage) return
    lightboxTrigger = trigger
    lightboxImage.src = src
    lightboxImage.alt = alt
    lightbox.setAttribute('aria-hidden', 'false')
    document.body.classList.add('menu-open')
    lightboxClose?.focus()
  }

  function closeLightbox() {
    if (!lightbox) return
    lightbox.setAttribute('aria-hidden', 'true')
    document.body.classList.remove('menu-open')
    lightboxImage?.removeAttribute('src')
    if (lightboxTrigger instanceof HTMLElement) lightboxTrigger.focus()
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('.gallery-trigger')
    if (trigger) openLightbox(trigger.dataset.src, trigger.dataset.alt, trigger)
  })
  lightboxClose?.addEventListener('click', closeLightbox)
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox()
  })

  const testimonialList = document.getElementById('testimonial-list')
  if (testimonialList) {
    testimonialList.innerHTML = testimonials.map(testimonial => `
      <article class="testimonial-card">
        <span class="quote-mark" aria-hidden="true">“</span>
        <blockquote>${testimonial.quote}</blockquote>
        <div class="testimonial-person">
          <img src="${testimonial.avatar}" alt="" loading="lazy" />
          <div><strong>${testimonial.name}</strong><span>${testimonial.role}</span></div>
        </div>
      </article>
    `).join('')
  }

  const programChoice = document.getElementById('program-choice')
  document.querySelectorAll('[data-program]').forEach(link => {
    link.addEventListener('click', () => {
      if (programChoice) programChoice.value = link.dataset.program
    })
  })

  const contactForm = document.getElementById('contact-form')
  const formStatus = document.getElementById('form-status')
  contactForm?.addEventListener('submit', event => {
    event.preventDefault()
    if (!contactForm.checkValidity()) {
      contactForm.reportValidity()
      if (formStatus) formStatus.textContent = 'Lengkapi semua kolom wajib sebelum melanjutkan.'
      return
    }

    const data = new FormData(contactForm)
    const name = String(data.get('name') || '').trim()
    const phone = String(data.get('phone') || '').trim()
    const program = String(data.get('program') || '').trim()
    const message = String(data.get('message') || '').trim()
    const whatsappMessage = `Assalamu'alaikum, saya ${name}. Saya ingin berkonsultasi tentang program ${program}. ${message} Nomor yang dapat dihubungi: ${phone}.`
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`
    if (formStatus) formStatus.textContent = 'Membuka WhatsApp dengan pesan yang sudah disiapkan.'
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  })

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  })
})
