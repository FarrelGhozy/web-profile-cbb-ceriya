# CBB CERIYA — Landing Page Blueprint

> **Status:** Draft / Planning  
> **Target:** Static landing page — TK Sekolah CBB CERIYA, Kabupaten Tegal  
> **Stack:** HTML5 + Tailwind CSS v3 + Vanilla JS + Vite  
> **Deployment:** GitHub Pages → Vercel/Netlify  

---

## 1. Project Overview

### 1.1 Tujuan
Membangun landing page statis yang **ringan, SEO-friendly, mobile-first**, dan mampu dibaca dengan baik oleh **Google crawler maupun AI crawler** (GPT, Claude, Gemini). Halaman ini berfungsi sebagai **profil digital** TK CBB CERIYA yang mencakup informasi sekolah, fasilitas, program, testimonial, dan kontak.

### 1.2 Target Audiens
| Persona | Kebutuhan |
|---------|-----------|
| **Orang tua murid** | Info program, biaya, fasilitas, cara daftar |
| **Calon murid** (anak-anak) | Visual menarik, warna ceria, playful |
| **Google crawler** | Semantic HTML, meta tags, schema markup |
| **AI crawler** (ChatGPT, Gemini, Claude) | Struktur data jelas, heading hierarchy, schema.org |

### 1.3 Scope
- **Single-page website** (one-pager) dengan anchor navigation
- **No backend**, no database, no framework berat
- **Form contact** pakai Formspree (serverless)
- **No CMS** — semua content hardcoded di HTML (mudah diedit manual)

---

## 2. Tech Stack Decision

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **Markup** | HTML5 semantic | SEO, AI readability, accessibility |
| **Styling** | Tailwind CSS v3 | Utility-first, responsive built-in, small bundle |
| **Interactivity** | Vanilla JS | Cukup untuk toggle, scroll, lightbox — tanpa overhead framework |
| **Build tool** | Vite | HMR cepat, optimized build, easy config |
| **Icons** | Heroicons (inline SVG) | Tidak perlu dependency eksternal |
| **Font** | Poppins (Google Fonts) | Playful, readable, cocok untuk TK |
| **Form backend** | Formspree | Gratis, no backend, mudah integrate |
| **Maps** | Google Maps iframe embed | Gratis, familiar |
| **Animation** | CSS transitions + Intersection Observer | Ringan, tanpa library |
| **Hosting** | Vercel / Netlify | Free tier, auto-deploy dari GitHub, SSL otomatis |

### 2.1 Kenapa Bukan Framework Lain?
| Framework | Alasan Ditolak |
|-----------|---------------|
| React / Next.js | Overhead untuk static page, bundle size besar |
| Vue / Nuxt | Sama, terlalu berat untuk satu halaman |
| Gatsby | Build time lama, kompleks untuk landing page kecil |
| Plain HTML + CSS saja | Maintainability kurang, dev experience lebih jelek |
| WordPress | Butuh server, maintenance berat, rentan security |

---

## 3. Directory Structure

```
cbb-ceriya/
├── index.html                 # Main HTML — entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind custom theme
├── postcss.config.js          # PostCSS (Tailwind + Autoprefixer)
├── package.json               # Dependencies & scripts
├── .gitignore                 # Git exclusion rules
│
├── public/                    # Static assets (copied as-is)
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/
│   │   ├── logo.svg                         # Dummy logo (SVG)
│   │   ├── logo-white.svg                   # Logo variant for dark bg
│   │   ├── hero-bg.jpg                      # ✋ GANTI: foto gedung sekolah
│   │   ├── hero-bg.webp                     # WebP version
│   │   ├── facility-classroom.jpg           # ✋ GANTI: ruang kelas
│   │   ├── facility-classroom.webp
│   │   ├── facility-playground.jpg          # ✋ GANTI: lapangan bermain
│   │   ├── facility-playground.webp
│   │   ├── facility-library.jpg             # ✋ GANTI: perpustakaan
│   │   ├── facility-library.webp
│   │   ├── facility-music.jpg               # ✋ GANTI: ruang musik
│   │   ├── facility-music.webp
│   │   ├── testimonial-1.jpg                # ✋ GANTI: foto orang tua
│   │   ├── testimonial-2.jpg
│   │   └── testimonial-3.jpg
│   └── favicon/                # ✋ GANTI: favicon real
│       ├── favicon.ico
│       ├── apple-touch-icon.png
│       └── favicon-16x16.png
│
├── src/
│   ├── style.css              # Tailwind directives + custom CSS
│   ├── main.js                # All JS logic
│   └── utils/
│       └── constants.js       # Data arrays (testimonials, programs, etc.)
│
└── PLAN.md                    # Dokumen ini
```

### 3.1 File Size Budget
| Resource | Target Max |
|----------|-----------|
| HTML (index.html) | < 30 KB |
| CSS (built) | < 15 KB |
| JS (built) | < 10 KB |
| Font (Poppins) | ~ 40 KB (subset) |
| Images per file | < 200 KB (WebP) |
| **Total page load** | **< 300 KB** |

---

## 4. Design System

### 4.1 Color Palette

```
Primary     : #DC143C  (Crimson Red)      → headings, CTA buttons, accent links
Secondary   : #FFD700  (Gold/Yellow)      → highlights, badges, playful elements
Accent      : #1E90FF  (Dodger Blue)      → secondary buttons, icons
Neutral-50  : #F8F9FA  (Light Gray)       → section backgrounds
Neutral-100 : #E9ECEF  (Border Gray)      → cards border, dividers
Dark        : #2C3E50  (Dark Blue-Gray)   → body text, headings
White       : #FFFFFF                     → card backgrounds
Success     : #28A745  (Green)            → form success, checkmarks
Error       : #DC3545  (Red)              → form validation errors
```

**Usage rules:**
- Primary Red hanya untuk **1-2 elemen per viewport** (CTA, H1)
- Secondary Yellow untuk **aksen playful** (star icons, badge)
- Accent Blue untuk **interactive elements** (links, secondary buttons)
- Neutral untuk **background section alternating**
- Dark untuk **body text** (jangan pure black — #2C3E50 lebih soft)

### 4.2 Typography

| Level | Font | Weight | Size (desktop) | Size (mobile) |
|-------|------|--------|----------------|---------------|
| H1 | Poppins | 700 | 48px / 3rem | 32px / 2rem |
| H2 | Poppins | 600 | 36px / 2.25rem | 28px / 1.75rem |
| H3 | Poppins | 600 | 24px / 1.5rem | 20px / 1.25rem |
| H4 | Poppins | 600 | 20px / 1.25rem | 18px / 1.125rem |
| Body | Poppins | 400 | 16px / 1rem | 16px / 1rem |
| Small | Poppins | 300 | 14px / 0.875rem | 14px / 0.875rem |

**Line Height:**
- Headings: 1.2
- Body: 1.6
- Buttons: 1

**Letter Spacing:**
- Headings: -0.02em
- Body: normal

### 4.3 Spacing System (Tailwind default scale)

```
Section padding Y:  py-16 (64px) desktop, py-12 (48px) mobile
Section padding X:  px-4 (16px) mobile, px-6 (24px) tablet, container mx-auto desktop
Card gap:           gap-6 (24px)
Card padding:       p-6 (24px)
Content max-width:   max-w-6xl (1152px)
```

### 4.4 Border Radius

| Element | Radius |
|---------|--------|
| Cards | rounded-2xl (16px) |
| Buttons | rounded-xl (12px) |
| Images | rounded-xl (12px) |
| Input fields | rounded-lg (8px) |

### 4.5 Shadows

| Level | Tailwind Class |
|-------|---------------|
| Card default | shadow-md |
| Card hover | shadow-lg |
| Navbar | shadow-sm |
| Modal backdrop | shadow-2xl |

### 4.6 Breakpoints (Mobile-First)

| Breakpoint | Tailwind | Layout |
|------------|----------|--------|
| < 640px | (default) | 1 column, full width, px-4 |
| 640px+ | sm | 2 columns |
| 768px+ | md | 2 columns, px-6 |
| 1024px+ | lg | 3 columns |
| 1280px+ | xl | 12-column grid, max-w-6xl centered |

---

## 5. Layout & Component Specification

### 5.1 Page Flow (top → bottom)

```
┌─────────────────────────────────────────────┐
│  NAVBAR (sticky)                            │
│  Logo | Menu Links | CTA Button             │
├─────────────────────────────────────────────┤
│  HERO                                       │
│  Bg image + overlay | H1 | Subtitle | CTA   │
│  Decorative shapes (floating)               │
├─────────────────────────────────────────────┤
│  ABOUT (Tentang Kami)                       │
│  Intro text | 3x Feature Cards (icon+text)  │
│  Stats counter (optional)                   │
├─────────────────────────────────────────────┤
│  PROGRAM (Program Kami)                     │
│  Section title | 4x Program Cards           │
│  Icon | Title | Desc | Link                 │
├─────────────────────────────────────────────┤
│  GALLERY / FASILITAS                        │
│  Section title | Image grid (3→2→1 col)     │
│  Lightbox on click                          │
├─────────────────────────────────────────────┤
│  TESTIMONIAL                                │
│  Section title | Carousel / Cards           │
│  Quote | Avatar | Name | Role              │
├─────────────────────────────────────────────┤
│  CONTACT                                    │
│  Section title | 2-col: Form + Info         │
│  Form (name, email, phone, message)         │
│  Address | Phone | Email | Map embed        │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  Logo | Quick links | Contact | Social      │
│  Copyright                                  │
├─────────────────────────────────────────────┤
│  BACK TO TOP button (fixed, bottom-right)   │
└─────────────────────────────────────────────┘
```

### 5.2 NAVBAR Component

```
┌──────────────────────────────────────┐
│ [LOGO]  Home  About  Program         │
│         Gallery  Testimonial  Contact │ [Daftar]
└──────────────────────────────────────┘
```

**States:**
- **Desktop:** Horizontal menu, all links visible
- **Mobile:** Hamburger icon → slide-in menu overlay
- **Scrolled:** Add shadow + reduce height (py-4 → py-2)
- **Active link:** Underline or text-primary color

**Specs:**
- Height: 72px (py-4) default, 56px (py-2) scrolled
- Background: white with 95% opacity backdrop-blur
- Z-index: 50 (above everything except modals)
- Logo: max-h-10 (40px)
- CTA button: bg-primary text-white rounded-xl px-6 py-2

### 5.3 HERO Section

```
┌─────────────────────────────────────────┐
│            ░░░░░░░░░░░░░░░░             │
│       ░░░░░░░░░░░░░░░░░░░░░░░          │
│    ░░░░  CBB CERIYA         ░░░░░      │
│   ░░░░  Sekolah TK Terbaik  ░░░░░░     │
│   ░░░░  di Kabupaten Tegal         ░░░░░░     │
│    ░░░░                     ░░░░░      │
│     ░░░░  [Daftar] [Info]  ░░░░       │
│       ░░░░░░░░░░░░░░░░░░░░░           │
│          ░░░░░░░░░░░░░░░              │
└─────────────────────────────────────────┘
```

**Specs:**
- Height: 60vh (min 400px)
- Background: hero-bg.jpg with linear-gradient overlay (dark ke bawah)
- Overlay: `bg-gradient-to-b from-black/40 to-black/60`
- H1: text-white text-4xl md:text-6xl font-bold
- Subtitle: text-white/90 text-lg md:text-xl
- CTA buttons: 2 buttons (primary "Daftar Sekarang", outline "Hubungi Kami")
- Decorative: floating shapes (circles, stars) with CSS animation

**Responsive:**
- Mobile: text center, buttons stacked, full width
- Desktop: text center (or left-aligned if bg supports), buttons side by side

### 5.4 ABOUT Section

```
┌──────────────────────────────────────────────┐
│  ☀️ Tentang Kami                             │
│  ─────────────────────────────────────       │
│  CBB CERIYA adalah sekolah TK...             │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │ 📚       │ │ 👩‍🏫      │ │ 🏫       │     │
│  │ Metode   │ │ Guru     │ │ Lingkungan│     │
│  │ Interaktif│ │Berkualitas│ │ Aman     │     │
│  │ deskripsi│ │ deskripsi│ │ deskripsi│     │
│  └──────────┘ └──────────┘ └──────────┘     │
└──────────────────────────────────────────────┘
```

**Specs:**
- 2-column layout: text left + 3 feature cards right (or stacked)
- Features: 3 cards with Heroicon SVG + title + description
- Cards: bg-white shadow-md rounded-2xl p-6
- Icon color: accent (blue) or secondary (yellow)

**Responsive:**
- Mobile: 1 column, cards stacked vertically
- Tablet: 2 columns (2 cards first row, 1 card second) or all side by side
- Desktop: 3 cards in a row

### 5.5 PROGRAM Section

```
┌──────────────────────────────────────────────┐
│  🎯 Program Kami                             │
│  ─────────────────────────────────────       │
│                                              │
│  ┌──────────┐ ┌──────────┐                   │
│  │ 🎨       │ │ 📖       │                   │
│  │ TK A     │ │ TK B     │                   │
│  │ usia 4-5 │ │ usia 5-6 │                   │
│  │ deskripsi│ │ deskripsi│                   │
│  └──────────┘ └──────────┘                   │
│  ┌──────────┐ ┌──────────┐                   │
│  │ 🧸       │ │ 🎵       │                   │
│  │ Playgroup│ │Daycare   │                   │
│  │ usia 2-4 │ │ usia 2-6 │                   │
│  │ deskripsi│ │ deskripsi│                   │
│  └──────────┘ └──────────┘                   │
└──────────────────────────────────────────────┘
```

**Specs:**
- 4 program cards in 2x2 grid (desktop), 1 column (mobile)
- Each card: icon (Heroicon) + title + age range + description
- Hover: subtle scale-up (transform: scale(1.02)) + shadow increase
- Optional: "Lihat Detail" link

### 5.6 GALLERY / FASILITAS Section

```
┌──────────────────────────────────────────────┐
│  📸 Fasilitas Kami                           │
│  ─────────────────────────────────────       │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │[gambar]  │ │[gambar]  │ │[gambar]  │     │
│  │Kelas     │ │Lapangan  │ │Perpus    │     │
│  └──────────┘ └──────────┘ └──────────┘     │
│  ┌──────────┐ ┌──────────┐                   │
│  │[gambar]  │ │[gambar]  │                   │
│  │Musik     │ │Lab       │                   │
│  └──────────┘ └──────────┘                   │
└──────────────────────────────────────────────┘
```

**Specs:**
- Image grid: 3 col desktop, 2 col tablet, 1 col mobile
- Images: aspect-[4/3] or aspect-square, object-cover, rounded-2xl
- Hover: slight dark overlay + title text appears
- Click: lightbox modal opens (full-screen image overlay)
- Lazy loading: `loading="lazy"` on all images

**Lightbox behavior:**
- Click image → full-screen overlay with image centered
- Dark backdrop (bg-black/80)
- Close button (X) top right
- Click outside image to close
- Keyboard: ESC to close

### 5.7 TESTIMONIAL Section

```
┌──────────────────────────────────────────────┐
│  💬 Kata Mereka                               │
│  ─────────────────────────────────────       │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │  "CBB CERIYA luar biasa!            │     │
│  │   Anak saya jadi lebih percaya diri"│     │
│  │                                     │     │
│  │  [👩] Ibu Siti  ●  Orang Tua Ananda  │     │
│  └─────────────────────────────────────┘     │
│                                              │
│  [●] [○] [○]  ← dots indicator              │
└──────────────────────────────────────────────┘
```

**Specs:**
- Single card with JS carousel (auto-slide every 5s)
- Manual nav: dots indicator + prev/next arrows
- Card: bg-white shadow-lg rounded-2xl p-8 text-center
- Quote: italic, text-lg, text-dark
- Avatar: w-16 h-16 rounded-full object-cover
- Name + role below avatar

**Data source:** Array in constants.js

**Responsive:**
- Carousel full width on mobile, max-w-2xl centered on desktop

### 5.8 CONTACT Section

```
┌──────────────────────────────────────────────┐
│  ✉️ Hubungi Kami                             │
│  ─────────────────────────────────────       │
│                                              │
│  ┌──────────────┐  ┌──────────────────┐      │
│  │ Nama: [   ]  │  │ 📍 R5X2+X9Q, Jl. Bojong, Tuwel, Bojong    │      │
│  │ Email: [   ] │  │ 📞 0812-3456-7890│      │
│  │ Pesan: [   ] │  │ ✉️ info@...      │      │
│  │              │  │                  │      │
│  │ [Kirim]      │  │ [MAP iframe]     │      │
│  └──────────────┘  └──────────────────┘      │
└──────────────────────────────────────────────┘
```

**Specs:**
- 2-column: form left, info + map right
- Form fields: name, email, phone, message (textarea)
- Form action: Formspree endpoint
- Validation: HTML5 built-in + custom JS
- Submit button: bg-primary text-white full width
- Map: Google Maps iframe, rounded-2xl, aspect-[16/9]
- Contact info: address, phone (tappable tel:), email

**Responsive:**
- Mobile: stacked (form above info/map)
- Desktop: 2 columns (1:1 ratio)

### 5.9 FOOTER

```
┌──────────────────────────────────────────────┐
│  [LOGO]                                       │
│  Deskripsi singkat                            │
│                                              │
│  Quick Links:  Kontak:                       │
│  • Home       • 📞 0812-3456-7890            │
│  • About      • ✉️ info@cbbceriya.com        │
│  • Program    • 📍 R5X2+X9Q, Jl. Bojong, Tuwel, Bojong, Kabupaten Tegal      │
│  • Gallery                                    │
│  • Contact                                    │
│                                              │
│  [FB] [IG] [YT]  ← social icons             │
│  ─────────────────────────────────────       │
│  © 2025 CBB CERIYA. All rights reserved.     │
└──────────────────────────────────────────────┘
```

**Specs:**
- Background: dark (#2C3E50) or primary red
- Text: white/80
- 3-column layout: branding | quick links | contact
- Social icons: Heroicons (brand names)
- Copyright bar at bottom with thin border-top

**Responsive:**
- Mobile: stacked, centered text
- Desktop: 3 columns

### 5.10 BACK TO TOP Button

**Specs:**
- Fixed position: bottom-6 right-6
- Visibility: hidden initially, appears after scrolling past 300px
- Icon: Arrow up (Heroicon)
- Color: bg-primary text-white
- Shape: rounded-full w-12 h-12
- Click: smooth scroll to top
- Hover: scale(1.1) with transition

---

## 6. Content Strategy

### 6.1 SEO Keywords (Target)

| Keyword | Type | Placement |
|---------|------|-----------|
| "TK CBB CERIYA Tegal" | Brand | Throughout |
| "TK terbaik di Kabupaten Tegal" | Primary | H1, meta description, intro |
| "Sekolah TK Bojong Tegal" | Primary | H2, about section |
| "PAUD Bojong Tegal" | Secondary | Program section |
| "Pendidikan anak usia dini Tegal" | Secondary | About paragraph |
| "TK Swasta Tegal" | Long-tail | FAQ or content |
| "Pendaftaran TK Tegal" | Action | CTA, contact |

### 6.2 Content per Section

| Section | Word Count | Key Message |
|---------|-----------|-------------|
| Hero | 10-15 words | Tagline + value prop |
| About | 150-200 words | Sejarah, visi misi, keunggulan |
| Program | 50 words per card | Apa yang dipelajari |
| Fasilitas | 20 words per item | Deskripsi singkat fasilitas |
| Testimonial | 30-40 words per quote | Social proof |
| Contact | Brief | CTA untuk daftar |

### 6.3 Call-to-Action Strategy

| Position | CTA Text | Link |
|----------|----------|------|
| Navbar | "Daftar Sekarang" | #contact |
| Hero (primary) | "Daftar Sekarang" | #contact |
| Hero (secondary) | "Lihat Program" | #program |
| Program cards | "Pelajari →" | #contact |
| Testimonial | "Daftarkan Anak Anda" | #contact |
| Footer | "Hubungi Kami" | #contact |

---

## 7. SEO Blueprint (Complete)

### 7.1 Meta Tags (`<head>`)

```html
<!-- Character Set & Viewport -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Primary Meta -->
<title>CBB CERIYA | Sekolah TK Terbaik di Kabupaten Tegal — Pendidikan Anak Usia Dini</title>
<meta name="description" content="CBB CERIYA adalah sekolah TK terbaik di Kabupaten Tegal dengan metode pembelajaran interaktif, guru profesional, dan fasilitas modern. Daftarkan anak Anda sekarang!">
<meta name="keywords" content="sekolah TK Tegal, TK terbaik Kabupaten Tegal, PAUD Bojong Tegal, pendidikan anak usia dini Tegal, TK CBB CERIYA, playgroup Tegal">
<meta name="author" content="CBB CERIYA">
<meta name="robots" content="index, follow">
<meta name="language" content="id">
<meta name="geo.region" content="ID-JI">
<meta name="geo.placename" content="Kabupaten Tegal">

<!-- Open Graph -->
<meta property="og:title" content="CBB CERIYA | Sekolah TK Terbaik di Kabupaten Tegal">
<meta property="og:description" content="Pendidikan berkualitas untuk anak usia dini dengan metode pembelajaran interaktif di Kabupaten Tegal.">
<meta property="og:image" content="https://cbbceriya.com/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:url" content="https://cbbceriya.com">
<meta property="og:type" content="website">
<meta property="og:locale" content="id_ID">
<meta property="og:site_name" content="CBB CERIYA">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="CBB CERIYA | Sekolah TK Terbaik di Kabupaten Tegal">
<meta name="twitter:description" content="Pendidikan berkualitas untuk anak usia dini dengan metode pembelajaran interaktif.">
<meta name="twitter:image" content="https://cbbceriya.com/images/og-image.jpg">

<!-- Canonical -->
<link rel="canonical" href="https://cbbceriya.com">

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/images/logo.svg">
<link rel="icon" type="image/x-icon" href="/favicon/favicon.ico">
<link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png">

<!-- Preload Critical Assets -->
<link rel="preload" href="/images/hero-bg.webp" as="image" type="image/webp" fetchpriority="high">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

### 7.2 Semantic HTML Structure

```
body
├── header#header
│   └── nav[aria-label="Navigasi Utama"]
│       ├── a → h1 (logo text / site title)
│       └── ul → li → a (nav links)
│
├── main
│   ├── section#hero[aria-label="Hero"]
│   │   ├── h1 (primary keyword)
│   │   ├── p (subheading)
│   │   └── div (CTA buttons)
│   │
│   ├── section#about[aria-label="Tentang Kami"]
│   │   ├── header → h2
│   │   ├── p (intro)
│   │   ├── div.grid
│   │   │   └── article.feature-card (×3)
│   │   │       ├── img (icon, decorative)
│   │   │       └── h3
│   │   │       └── p
│   │   └── aside (stats/achievement)
│   │
│   ├── section#program[aria-label="Program Kami"]
│   │   ├── header → h2
│   │   └── div.grid
│   │       └── article.program-card (×4)
│   │           ├── img (icon)
│   │           ├── h3
│   │           ├── p
│   │           └── a (link)
│   │
│   ├── section#gallery[aria-label="Fasilitas dan Galeri"]
│   │   ├── header → h2
│   │   └── div.grid
│   │       └── figure.gallery-item (×5-6)
│   │           ├── img[loading="lazy"]
│   │           └── figcaption
│   │
│   ├── section#testimonial[aria-label="Testimonial"]
│   │   ├── header → h2
│   │   ├── div.carousel
│   │   │   └── blockquote (×3)
│   │   │       ├── p (quote)
│   │   │       ├── footer → img + cite
│   │   └── nav (carousel controls)
│   │
│   └── section#contact[aria-label="Hubungi Kami"]
│       ├── header → h2
│       └── div.grid
│           ├── form (contact form)
│           │   ├── label + input (name)
│           │   ├── label + input (email)
│           │   ├── label + input (phone)
│           │   ├── label + textarea (message)
│           │   └── button[type="submit"]
│           └── aside
│               ├── address
│               │   ├── p (alamat)
│               │   ├── a[href="tel:"] (phone)
│               │   └── a[href="mailto:"] (email)
│               └── iframe (Google Maps)
│
├── footer#footer
│   ├── div.grid
│   │   ├── div (logo + deskripsi)
│   │   ├── nav (quick links)
│   │   └── div (contact + social)
│   └── p.copyright
│
└── button#back-to-top[aria-label="Kembali ke atas"]
```

### 7.3 Heading Hierarchy

```
h1: CBB CERIYA | Sekolah TK Terbaik di Kabupaten Tegal — Pendidikan Anak Usia Dini Berkualitas
├── h2: Tentang CBB CERIYA — Sekolah TK Terbaik di Kabupaten Tegal
│   ├── h3: Metode Pembelajaran Interaktif
│   ├── h3: Guru Profesional & Berpengalaman
│   └── h3: Lingkungan Belajar yang Aman & Nyaman
├── h2: Program Pendidikan TK CBB CERIYA
│   ├── h3: TK A — Kreativitas & Eksplorasi (Usia 4-5 Tahun)
│   ├── h3: TK B — Kesiapan Sekolah Dasar (Usia 5-6 Tahun)
│   ├── h3: Playgroup — Belajar Sambil Bermain (Usia 2-4 Tahun)
│   └── h3: Daycare — Perawatan & Pendidikan Terpadu (Usia 2-6 Tahun)
├── h2: Fasilitas Modern TK CBB CERIYA Kabupaten Tegal
├── h2: Testimonial Orang Tua Murid TK CBB CERIYA
└── h2: Hubungi & Daftarkan Anak Anda ke CBB CERIYA
```

### 7.4 Schema Markup

Three structured data blocks in `<head>`:

**A. EducationalOrganization (Primary)**
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "CBB CERIYA",
  "alternateName": ["TK CBB CERIYA", "CBB CERIYA Kabupaten Tegal"],
  "url": "https://cbbceriya.com",
  "logo": "https://cbbceriya.com/images/logo.svg",
  "description": "Sekolah TK terbaik di Kabupaten Tegal dengan program pembelajaran interaktif, guru profesional, dan fasilitas modern untuk pendidikan anak usia dini.",
  "foundingDate": "2020",
  "areaServed": {
    "@type": "City",
    "name": "Kabupaten Tegal"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R5X2+X9Q, Jl. Bojong, Babakan, Tuwel, Kec. Bojong",
    "addressLocality": "Kabupaten Tegal",
    "addressRegion": "Jawa Timur",
    "postalCode": "52465",
    "addressCountry": "ID"
  },
  "telephone": "+6281234567890",
  "email": "info@cbbceriya.com",
  "sameAs": [
    "https://facebook.com/cbbceriya",
    "https://instagram.com/cbbceriya",
    "https://youtube.com/@cbbceriya"
  ],
  "parentOrganization": {
    "@type": "Organization",
    "name": "Yayasan CBB CERIYA"
  }
}
```

**B. LocalBusiness (Secondary — for Google Maps/SEO pack)**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "CBB CERIYA",
  "image": "https://cbbceriya.com/images/hero-bg.webp",
  "description": "Sekolah TK berkualitas dengan program pembelajaran terpadu untuk anak usia dini di Kabupaten Tegal.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "R5X2+X9Q, Jl. Bojong, Babakan, Tuwel, Kec. Bojong",
    "addressLocality": "Kabupaten Tegal",
    "addressRegion": "Jawa Timur",
    "postalCode": "52465",
    "addressCountry": "ID"
  },
  "telephone": "+6281234567890",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "15:00"
    }
  ],
  "priceRange": "$$"
}
```

**C. AggregateRating (Social proof)**
```json
{
  "@context": "https://schema.org",
  "@type": "AggregateRating",
  "itemReviewed": {
    "@type": "EducationalOrganization",
    "name": "CBB CERIYA"
  },
  "ratingValue": "4.8",
  "bestRating": "5",
  "ratingCount": "25",
  "reviewCount": "25"
}
```

**D. FAQPage (Optional — if FAQ section added)**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Berapa biaya sekolah di CBB CERIYA?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Untuk informasi biaya terbaru, silakan hubungi kami melalui form kontak atau telepon langsung."
    }
  }, {
    "@type": "Question",
    "name": "Jam operasional sekolah?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Sekolah beroperasi Senin-Jumat pukul 07.00-15.00 WIB."
    }
  }]
}
```

### 7.5 robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://cbbceriya.com/sitemap.xml
```

### 7.6 sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cbbceriya.com</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 7.7 Image SEO

| Image | Alt Text | Filename Convention |
|-------|----------|-------------------|
| Hero | "Gedung Sekolah TK CBB CERIYA Kabupaten Tegal — tampak depan dengan halaman bermain" | hero-bg |
| Kelas | "Ruang kelas interaktif TK CBB CERIYA dengan whiteboard digital dan mainan edukatif" | facility-classroom |
| Lapangan | "Lapangan bermain aman TK CBB CERIYA dengan ayunan dan perosotan" | facility-playground |
| Perpus | "Perpustakaan digital TK CBB CERIYA dengan buku cerita bergambar" | facility-library |
| Musik | "Ruang musik TK CBB CERIYA dengan alat musik anak" | facility-music |
| Logo | "Logo CBB CERIYA — Sekolah TK Terbaik Kabupaten Tegal" | logo |

---

## 8. Responsive Behavior Matrix

| Component | Mobile (< 640px) | Tablet (640-1023px) | Desktop (≥ 1024px) |
|-----------|------------------|---------------------|-------------------|
| **Navbar** | Hamburger + slide menu | Hamburger + slide menu | Full horizontal menu |
| **Hero** | Stack, text center, 60vh | Text center, 60vh | Text center, 60vh |
| **About features** | 1 col, stacked | 2 cols (2+1) | 3 cols |
| **Program cards** | 1 col | 2 cols | 2×2 grid (4 cards) |
| **Gallery** | 1 col | 2 cols | 3 cols |
| **Testimonial** | Full width card | Centered, max-w-xl | Centered, max-w-2xl |
| **Contact** | Stacked (form above info) | 2 cols (1:1) | 2 cols (1:1) |
| **Footer** | Stacked, center text | 2 cols | 3 cols |
| **Back to top** | Bottom-4 right-4 | Bottom-6 right-6 | Bottom-6 right-6 |
| **Section padding Y** | py-12 | py-14 | py-16 |
| **Container padding X** | px-4 | px-6 | mx-auto max-w-6xl |

---

## 9. Interactive Elements (Vanilla JS)

### 9.1 Component List & Behavior

| Component | Trigger | Behavior | JS Module |
|-----------|---------|----------|-----------|
| **Mobile nav toggle** | Click hamburger | Toggle `.is-open` on nav, animate slide-in/out | navbar.js |
| **Smooth scroll** | Click nav link | `scrollIntoView({ behavior: 'smooth' })` + close mobile nav | scroll.js |
| **Sticky nav** | Window scroll | Add `shadow-sm` bg-white/95 backdrop-blur after 50px | navbar.js |
| **Active nav highlight** | Window scroll | IntersectionObserver on sections → add `.active` to corresponding link | navbar.js |
| **Gallery lightbox** | Click gallery image | Open fullscreen overlay with image, prev/next nav, close on ESC/click-outside | lightbox.js |
| **Testimonial carousel** | Auto (5s) + dots/arrows | Slide transition, auto-play, pause on hover, dot navigation | carousel.js |
| **Scroll animations** | Element enters viewport | IntersectionObserver → add `.animate-visible` for fade-in-up | animations.js |
| **Form validation** | Submit | Check required fields, email format, show inline errors | form.js |
| **Form submit** | Valid submit | POST to Formspree, show success/toast message | form.js |
| **Back to top** | Scroll past 300px | Show/hide button fixed bottom-right, smooth scroll on click | scroll.js |
| **Counter animation** | About stats enter viewport | Animate numbers from 0 to target (optional, if stats added) | animations.js |

### 9.2 IntersectionObserver Usage Plan

```js
// Observe all sections for active nav link
const sections = document.querySelectorAll('section[id]')
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelector(`nav a[href="#${entry.target.id}"]`)?.classList.add('active')
    }
  })
}, { rootMargin: '-50% 0px -50% 0px' })
sections.forEach(s => observer.observe(s))

// Observe elements for scroll-in animation
const animElements = document.querySelectorAll('[data-animate]')
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-visible')
      animObserver.unobserve(entry.target) // only once
    }
  })
}, { threshold: 0.15 })
animElements.forEach(el => animObserver.observe(el))
```

### 9.3 Animation Keyframes (CSS)

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

.animate-visible {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Stagger children */
.stagger > *:nth-child(1) { animation-delay: 0s; }
.stagger > *:nth-child(2) { animation-delay: 0.1s; }
.stagger > *:nth-child(3) { animation-delay: 0.2s; }
.stagger > *:nth-child(4) { animation-delay: 0.3s; }
```

---

## 10. Performance Optimization

### 10.1 Image Optimization Strategy

| Technique | Implementation |
|-----------|---------------|
| Format | WebP primary + JPG fallback `<picture>` |
| Compression | TinyPNG / Squoosh — target < 200 KB per image |
| Responsive | `srcset` with 480w, 768w, 1200w variants |
| Lazy loading | `loading="lazy"` on all below-fold images |
| Hero preload | `<link rel="preload" as="image">` for hero |
| Decorative | Use CSS gradients / SVG instead of images where possible |

### 10.2 Font Strategy

```html
<!-- Load only weights needed: 300, 400, 600, 700 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
```

- `display=swap` ensures text visible during font load
- Only 4 weights (not all 9)

### 10.3 CSS Strategy

- **Critical CSS** inline in `<head>` for above-fold content
- **Tailwind** purges unused classes in production build
- **No CSS frameworks** beyond Tailwind
- **No `@import`** — use Vite's CSS pipeline

### 10.4 JS Strategy

- **Vanilla JS only** — no jQuery, no Alpine.js (unless needed later)
- **Defer** all scripts (`<script defer src="...">`)
- **Minimal DOM manipulation** — cache selectors, batch reads/writes
- **No polyfills** — modern browsers only (Chrome, Firefox, Safari, Edge)

### 10.5 Performance Budget

| Metric | Target |
|--------|--------|
| First Contentful Paint (FCP) | < 1.5s |
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 50ms |
| Cumulative Layout Shift (CLS) | < 0.05 |
| Time to Interactive (TTI) | < 3.0s |
| Total Bundle Size | < 100 KB (HTML+CSS+JS) |
| PageSpeed Score | ≥ 95 |

---

## 11. Image & Asset Plan

### 11.1 Dummy Assets (To Be Created)

| File | Type | Description | Size |
|------|------|-------------|------|
| `public/images/logo.svg` | SVG | Logo placeholder — teks "CBB CERIYA" dengan icon bintang | Vector |
| `public/images/logo-white.svg` | SVG | Logo variant putih untuk footer | Vector |
| `public/images/hero-bg.svg` | SVG | Dummy hero background — pattern abstrak gradasi | Vector |
| `public/images/facility-1.svg` | SVG | Placeholder fasilitas — icon ruang kelas | Vector |
| `public/images/facility-2.svg` | SVG | Placeholder fasilitas — icon playground | Vector |
| `public/images/facility-3.svg` | SVG | Placeholder fasilitas — icon buku/perpustakaan | Vector |
| `public/images/facility-4.svg` | SVG | Placeholder fasilitas — icon musik | Vector |
| `public/images/avatar.svg` | SVG | Placeholder avatar orang tua | Vector |
| `public/images/og-image.svg` | SVG | Placeholder OG image untuk social media | 1200×630 |

> **Note:** Semua file `.svg` di atas adalah **dummy/placeholder**. User akan mengganti dengan foto asli (format `.jpg`/`.webp`) sebelum deploy.

### 11.2 Real Images Needed (User to Provide)

| Image | Recommended Specs | Notes |
|-------|------------------|-------|
| Hero background | 1920×1080px, WebP | Gedung sekolah dari luar |
| Ruang kelas | 1200×800px, WebP | Interior kelas dengan anak-anak |
| Lapangan bermain | 1200×800px, WebP | Area outdoor |
| Perpustakaan | 1200×800px, WebP | Rak buku + area baca |
| Ruang musik | 1200×800px, WebP | Alat musik anak |
| Foto orang tua (3) | 200×200px, WebP | Testimonial — foto parent |
| OG Image | 1200×630px, WebP | Gabungan logo + foto sekolah |
| Favicon | 32×32, 16×16, .ico | Bisa dari logo |

### 11.3 Logo SVG Specification (Dummy)

```svg
<!-- Simple text-based logo with star icon -->
<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <!-- Star icon -->
  <polygon points="20,5 23,15 33,15 25,21 28,31 20,25 12,31 15,21 7,15 17,15" fill="#FFD700"/>
  <!-- Text "CBB CERIYA" -->
  <text x="45" y="35" font-family="Poppins, sans-serif" font-size="22" font-weight="700" fill="#DC143C">CBB</text>
  <text x="110" y="35" font-family="Poppins, sans-serif" font-size="22" font-weight="400" fill="#2C3E50">CERIYA</text>
  <!-- Tagline -->
  <text x="45" y="50" font-family="Poppins, sans-serif" font-size="9" font-weight="300" fill="#1E90FF">TK TERBAIK PONOROGO</text>
</svg>
```

---

## 12. Vite & Tailwind Configuration

### 12.1 vite.config.js

```js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096, // inline small assets as base64
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: undefined, // single bundle for small site
      }
    }
  },
  server: {
    port: 3000,
    open: true,
  }
})
```

### 12.2 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#DC143C',
        secondary: '#FFD700',
        accent: '#1E90FF',
        neutral: {
          50: '#F8F9FA',
          100: '#E9ECEF',
        },
        dark: '#2C3E50',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        'xl': '12px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 12.3 package.json scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 13. GitHub Issues Breakdown

Berikut adalah issues yang akan dibuat di GitHub, dipecah secara granular:

### Issue #1: Project Setup
- Inisialisasi project Vite + Tailwind CSS
- Buat file: vite.config.js, tailwind.config.js, postcss.config.js, package.json, .gitignore
- Setup `npm run dev`, `npm run build`
- Verifikasi hot reload berjalan

### Issue #2: HTML Structure & Semantic Markup
- Buat index.html dengan semantic HTML5
- Struktur: header, main (hero, about, program, gallery, testimonial, contact), footer
- Heading hierarchy (satu H1, H2 per section)
- Accessibility: aria-label, role, semantic tags
- Load Tailwind via CDN sementara sampai build pipeline siap

### Issue #3: Navbar Component
- Sticky navbar dengan logo + navigation links
- Desktop: horizontal menu
- Mobile: hamburger toggle with slide-in menu
- Active link highlighting
- Scroll effect (shadow on scroll)
- Smooth scroll navigation
- Close mobile menu on link click

### Issue #4: Hero Section
- Full-width hero dengan background image + overlay
- H1 heading, subheading, CTA buttons
- Floating decorative elements (CSS animation)
- Responsive text sizing
- Preload hero image for performance

### Issue #5: About Section
- Section semantic HTML
- Feature cards grid (3 columns desktop → 1 column mobile)
- Heroicons SVG inline
- Scroll-in animation

### Issue #6: Program Cards Section
- 4 program cards (TK A, TK B, Playgroup, Daycare)
- Card component: icon + title + description + link
- 2×2 grid desktop → 1 column mobile
- Hover effect (scale + shadow)

### Issue #7: Gallery & Lightbox
- Responsive image grid (3→2→1 columns)
- Image hover overlay effect
- Lightbox modal (full-screen image view)
- Keyboard navigation (ESC to close)
- Lazy loading images
- Picture element with WebP + JPG fallback

### Issue #8: Testimonial Carousel
- Manual carousel with Vanilla JS
- Auto-slide every 5 seconds
- Pause on hover
- Dots indicator + prev/next arrows
- Data driven from constants.js array
- Responsive layout

### Issue #9: Contact Section & Form
- Contact form (name, email, phone, message)
- HTML5 + custom validation
- Formspree integration
- Success/error toast notification
- Contact info (address, phone, email)
- Google Maps iframe embed
- Responsive 2-column layout

### Issue #10: Footer Component
- 3-column grid: branding, quick links, contact
- Social media icons
- Copyright bar
- Dark background

### Issue #11: SEO Implementation
- All meta tags (OG, Twitter, description, keywords)
- Canonical URL
- Schema.org structured data (EducationalOrganization, LocalBusiness, AggregateRating)
- robots.txt + sitemap.xml
- Favicon + apple-touch-icon

### Issue #12: Performance & Animations
- IntersectionObserver for scroll animations
- Back to top button
- Image lazy loading + preload hero
- CSS animations (fadeInUp, float)
- Stagger children animation
- Verify PageSpeed score target

### Issue #13: Dummy Assets
- Create all placeholder SVG files
- Logo SVG (color + white variant)
- OG image placeholder
- Facility placeholders
- Avatar placeholder
- Document which images need real replacements

### Issue #14: Responsive Polish
- Test all breakpoints (mobile, tablet, desktop)
- Fix any overflow/horizontal scroll issues
- Ensure tap targets are 44×44px minimum
- Font readability on all screens
- No broken layouts at any width

### Issue #15: README & Documentation
- Update README.md with project info
- Add setup instructions
- Document how to replace images
- Document deployment steps
- Add color/branding reference

### Issue #16: Deploy to Vercel/Netlify
- Connect GitHub repository to Vercel/Netlify
- Configure build settings
- Set up custom domain (if available)
- Enable SSL
- Verify live site

---

## 14. Development Phases

### Phase 1: Foundation (Issues #1-#3)
**Goal:** Project running, basic layout visible
- Setup build tool
- HTML skeleton
- Navigation working (mobile + desktop)
- CSS custom properties

### Phase 2: Core Sections (Issues #4-#6)
**Goal:** All content sections visible
- Hero, About, Program sections
- Content hardcoded
- Responsive layout
- Basic styling

### Phase 3: Interactive Features (Issues #7-#9)
**Goal:** User interactions working
- Lightbox
- Carousel
- Form validation + submit
- Smooth scroll

### Phase 4: Polish (Issues #10-#12)
**Goal:** Production-ready
- SEO complete
- Animations
- Performance optimized
- Footer

### Phase 5: Assets & Deploy (Issues #13-#16)
**Goal:** Live on the internet
- Dummy assets created
- Real images placeholder
- Documentation
- Deployed and verified

### Timeline Estimate

| Phase | Estimated Effort |
|-------|----------------|
| Phase 1: Foundation | 2-3 hours |
| Phase 2: Core Sections | 4-5 hours |
| Phase 3: Interactive | 3-4 hours |
| Phase 4: Polish | 2-3 hours |
| Phase 5: Deploy | 1-2 hours |
| **Total** | **12-17 hours** |

---

## 15. Deployment Strategy

### Option A: Vercel (Recommended)
1. Push repository to GitHub
2. Go to [vercel.com](https://vercel.com) → Import GitHub repo
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Auto-deploy on every push to main

### Option B: Netlify
1. Push repository to GitHub
2. Go to [netlify.com](https://netlify.com) → Import GitHub repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Auto-deploy on every push to main

### Pre-deploy Checklist
- [ ] All images replaced with real photos
- [ ] Meta tags updated with real URL
- [ ] Google Analytics ID inserted (if using)
- [ ] Formspree endpoint updated
- [ ] Google Maps embed updated with real address
- [ ] Schema markup updated with real address
- [ ] sitemap.xml updated with real URL
- [ ] robots.txt updated with real URL
- [ ] OG image created (1200×630px)
- [ ] Custom domain configured (if applicable)
- [ ] Google Search Console verified
- [ ] Google My Business profile updated

---

## 16. Service Integrations

### 16.1 Formspree (Contact Form Backend)
- Sign up at [formspree.io](https://formspree.io)
- Create new form → get endpoint URL
- Update `form action` attribute in HTML
- Free tier: 50 submissions/month

### 16.2 Google Maps Embed
```html
<iframe 
  src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=CBB+CERIYA+Bojong+Kabupaten+Tegal"
  width="100%"
  height="300"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>
```
> Note: Need Google Maps API key (free tier — $200 credit/month)

### 16.3 Google Analytics 4 (Optional)
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 17. Risk & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Google Maps API key cost | Low | Use free embed (no API key) or OpenStreetMap alternative |
| Formspree rate limit | Medium | Add rate limiting warning, cache form data locally |
| Image not provided | Medium | Use high-quality SVG placeholders that look professional |
| Browser compatibility | Low | Target modern browsers only (Chrome, Firefox, Safari, Edge) |
| SEO over-optimization | Low | Use natural keyword density, avoid stuffing |
| Content not ready | Low | All content is placeholder — easy to edit in HTML |

---

## 18. Google AI / AI Crawler Readability Checklist

Untuk memastikan AI crawler (GPT, Claude, Gemini, dll) bisa membaca halaman dengan benar:

- [ ] **Semantic HTML5** — `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, `<nav>`, `<address>`, `<blockquote>`, `<figure>`, `<figcaption>`
- [ ] **Single H1** — one clear topic per page
- [ ] **Logical heading hierarchy** — H1 → H2 → H3 (no skipping)
- [ ] **Schema.org structured data** — AI reads JSON-LD better than visual content
- [ ] **Descriptive alt text** — not "image1.jpg" but "Ruang kelas TK CBB CERIYA dengan whiteboard"
- [ ] **Meta description** — concise 150-160 chars with primary keyword
- [ ] **Open Graph + Twitter Cards** — social previews for AI training data
- [ ] **Canonical URL** — prevents duplicate content confusion
- [ ] **Clean URL structure** — no query params, no hash fragments for main content
- [ ] **Fast load time** — AI crawlers have timeouts; heavy pages get partial reads
- [ ] **Mobile-friendly** — Google mobile-first indexing
- [ ] **Internal linking** — navigation between sections helps crawlers discover all content
- [ ] **Text content ratio** — ≥ 70% text vs code; avoid excessive JS rendering

---

> **Next Step:** Setelah PLAN ini di-review dan disetujui, kita akan mulai implementasi Issue #1 (Project Setup) — inisialisasi Vite + Tailwind + struktur folder.
