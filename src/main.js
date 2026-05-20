import './style.css'
import { testimonials } from './utils/constants.js'

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

  const animElements = document.querySelectorAll('[data-animate]')
  if (animElements.length > 0) {
    const animObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible')
            animObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    animElements.forEach(el => animObserver.observe(el))
  }

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

  const lightbox = document.getElementById('lightbox')
  const lightboxImg = document.getElementById('lightbox-img')
  const lightboxClose = document.getElementById('lightbox-close')

  function closeLightbox() {
    lightbox.classList.add('opacity-0', 'pointer-events-none')
    document.body.style.overflow = ''
  }

  function openLightbox(src, alt) {
    lightboxImg.src = src
    lightboxImg.alt = alt
    lightbox.classList.remove('opacity-0', 'pointer-events-none')
    document.body.style.overflow = 'hidden'
  }

  lightboxClose?.addEventListener('click', closeLightbox)
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox()
  })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('opacity-0')) {
      closeLightbox()
    }
  })

  document.querySelectorAll('#fasilitas .gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img')
      if (img) openLightbox(img.src, img.alt)
    })
  })

  const slidesContainer = document.getElementById('testimonial-slides')
  const dotsContainer = document.getElementById('testimonial-dots')
  const prevBtn = document.getElementById('testimonial-prev')
  const nextBtn = document.getElementById('testimonial-next')
  let currentSlide = 0
  let autoplayInterval

  function renderTestimonials() {
    if (!slidesContainer || testimonials.length === 0) return

    slidesContainer.innerHTML = testimonials
      .map(
        t => `
      <div class="w-full flex-shrink-0 px-2">
        <blockquote class="rounded-2xl bg-white p-8 text-center shadow-lg">
          <p class="text-lg italic leading-relaxed text-dark/80">"${t.quote}"</p>
          <footer class="mt-6">
            <img src="${t.avatar}" alt="Foto ${t.name}" class="mx-auto h-16 w-16 rounded-full object-cover" />
            <cite class="mt-3 block not-italic">
              <strong class="text-dark">${t.name}</strong>
              <span class="block text-sm text-dark/50">${t.role}</span>
            </cite>
          </footer>
        </blockquote>
      </div>`
      )
      .join('')

    dotsContainer.innerHTML = testimonials
      .map(
        (_, i) =>
          `<button class="h-2.5 w-2.5 rounded-full transition-all duration-300 ${
            i === 0 ? 'bg-primary w-6' : 'bg-neutral-100'
          }" data-slide="${i}" aria-label="Testimonial ke-${i + 1}"></button>`
      )
      .join('')

    updateSlide(0)
  }

  function updateSlide(index) {
    if (!slidesContainer) return
    currentSlide = index
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`

    document.querySelectorAll('#testimonial-dots button').forEach((dot, i) => {
      dot.className = `h-2.5 rounded-full transition-all duration-300 ${
        i === currentSlide ? 'bg-primary w-6' : 'bg-neutral-100 w-2.5'
      }`
    })
  }

  function nextSlide() {
    const total = testimonials.length
    updateSlide((currentSlide + 1) % total)
  }

  function prevSlide() {
    const total = testimonials.length
    updateSlide((currentSlide - 1 + total) % total)
  }

  function startAutoplay() {
    stopAutoplay()
    autoplayInterval = setInterval(nextSlide, 5000)
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval)
      autoplayInterval = null
    }
  }

  prevBtn?.addEventListener('click', () => {
    prevSlide()
    startAutoplay()
  })

  nextBtn?.addEventListener('click', () => {
    nextSlide()
    startAutoplay()
  })

  dotsContainer?.addEventListener('click', e => {
    const dot = e.target.closest('button')
    if (dot && dot.dataset.slide !== undefined) {
      updateSlide(Number(dot.dataset.slide))
      startAutoplay()
    }
  })

  const carouselEl = document.getElementById('testimonial-carousel')
  carouselEl?.addEventListener('mouseenter', stopAutoplay)
  carouselEl?.addEventListener('mouseleave', startAutoplay)

  renderTestimonials()
  startAutoplay()

  const galleryData = [
    {
      id: 'wisuda',
      name: 'Wisuda',
      images: ['images/activity-1.svg', 'images/activity-wisuda-2.svg', 'images/activity-wisuda-3.svg']
    },
    {
      id: 'studytour',
      name: 'Study Tour',
      images: ['images/activity-2.svg', 'images/activity-studytour-2.svg', 'images/activity-studytour-3.svg']
    },
    {
      id: 'belajar',
      name: 'Belajar di Kelas',
      images: ['images/activity-3.svg', 'images/activity-belajar-2.svg', 'images/activity-belajar-3.svg']
    },
    {
      id: 'ngaji',
      name: 'Ngaji Bersama',
      images: ['images/activity-4.svg', 'images/activity-ngaji-2.svg', 'images/activity-ngaji-3.svg']
    }
  ]
  let activeCategory = galleryData[0].id

  const tabsEl = document.getElementById('gallery-tabs')
  const gridEl = document.getElementById('gallery-grid')

  function renderGalleryTabs() {
    tabsEl.innerHTML = galleryData.map(cat => `
      <button role="tab" aria-selected="${cat.id === activeCategory}"
        class="gallery-tab snap-start flex items-center gap-3 rounded-xl border-2 p-2 text-left transition-all duration-200 shrink-0 lg:flex-col lg:items-center lg:gap-3 lg:p-4 lg:text-center lg:w-full ${
          cat.id === activeCategory
            ? 'border-primary bg-primary/5 text-primary shadow-md'
            : 'border-transparent bg-neutral-50 text-dark/60 hover:border-neutral-200 hover:text-dark hover:shadow-sm'
        }"
        data-category="${cat.id}">
        <img src="${cat.images[0]}" alt="" class="h-12 w-16 flex-shrink-0 rounded-lg object-cover lg:h-24 lg:w-full" loading="lazy" />
        <span class="pr-2 text-xs font-semibold lg:w-full lg:pr-0 lg:text-sm">${cat.name}</span>
      </button>
    `).join('')
  }

  tabsEl.addEventListener('click', e => {
    const btn = e.target.closest('.gallery-tab')
    if (btn) {
      activeCategory = btn.dataset.category
      renderGalleryTabs()
      renderGalleryGrid()
    }
  })

  function renderGalleryGrid() {
    const cat = galleryData.find(c => c.id === activeCategory)
    if (!cat) return

    gridEl.innerHTML = cat.images.map((src, i) => `
      <figure class="gallery-item group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl">
        <img src="${src}" alt="${cat.name} — Foto ${i + 1}" loading="lazy"
          class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
          <figcaption class="text-sm font-semibold text-white sm:text-base">${cat.name}</figcaption>
        </div>
      </figure>
    `).join('')

    gridEl.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img')
        if (img) openLightbox(img.src, img.alt)
      })
    })
  }

  renderGalleryTabs()
  renderGalleryGrid()

  const toast = document.createElement('div')
  toast.className = 'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-green-600 px-6 py-3 text-white shadow-lg opacity-0 transition-opacity duration-300 pointer-events-none'
  toast.textContent = 'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.'
  document.body.appendChild(toast)

  function showToast() {
    toast.classList.remove('opacity-0', 'pointer-events-none')
    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none')
    }, 4000)
  }

  const contactForm = document.getElementById('contact-form')
  contactForm?.addEventListener('submit', async e => {
    e.preventDefault()
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const phone = document.getElementById('phone')
    const message = document.getElementById('message')
    let valid = true

    document.querySelectorAll('.form-error').forEach(el => el.remove())
    document.querySelectorAll('.border-red-400').forEach(el => el.classList.remove('border-red-400'))

    function showError(input, msg) {
      valid = false
      const error = document.createElement('p')
      error.className = 'form-error mt-1 text-sm text-red-500'
      error.textContent = msg
      input.parentNode.appendChild(error)
      input.classList.add('border-red-400')
    }

    if (!name?.value.trim()) showError(name, 'Nama lengkap harus diisi')
    if (!email?.value.trim()) {
      showError(email, 'Email harus diisi')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      showError(email, 'Format email tidak valid')
    }
    if (!message?.value.trim()) showError(message, 'Pesan harus diisi')

    if (!valid) return

    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent
    submitBtn.textContent = 'Mengirim...'
    submitBtn.disabled = true

    try {
      const formData = new FormData(contactForm)
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        contactForm.reset()
        showToast()
      } else {
        alert('Gagal mengirim pesan. Silakan coba lagi.')
      }
    } catch {
      alert('Gagal mengirim pesan. Periksa koneksi internet Anda.')
    } finally {
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }
  })
})
