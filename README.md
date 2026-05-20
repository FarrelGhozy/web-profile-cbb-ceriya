# CBB CERIYA — Landing Page TK

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
Landing page statis untuk **TK CBB CERIYA** — sekolah TK di Kabupaten Tegal. Ringan, SEO-friendly, mobile-first, dan dioptimalkan untuk AI crawler.

## Fitur

- Semantic HTML5 untuk SEO & AI readability
- Schema.org structured data (EducationalOrganization, LocalBusiness, AggregateRating, FAQPage)
- Responsive mobile-first design (Mobile, Tablet, Desktop)
- Sticky navbar dengan mobile hamburger menu
- Hero section dengan gradient overlay + floating animations
- Gallery grid dengan lightbox modal
- Testimonial carousel dengan autoplay
- Contact form dengan Formspree integration
- Scroll-in animations (IntersectionObserver)
- Back to top button
- Optimasi performa (lazy loading, preload, defer)

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Markup | HTML5 Semantic |
| Styling | Tailwind CSS v3 |
| Interactivity | Vanilla JS |
| Build Tool | Vite 6 |
| Icons | Heroicons (inline SVG) |
| Font | Poppins (Google Fonts) |
| Form Backend | Formspree (serverless) |
| Maps | Google Maps iframe |

## Warna Branding

| Warna | Kode | Penggunaan |
|-------|------|------------|
| Primary | `#DC143C` | CTA buttons, headings |
| Secondary | `#FFD700` | Highlights, playful elements |
| Accent | `#1E90FF` | Secondary buttons, icons |
| Dark | `#2C3E50` | Body text |
| Neutral | `#F8F9FA` | Section backgrounds |

## Cara Jalankan di Local

```bash
# Clone repo
git clone https://github.com/FarrelGhozy/web-profile-cbb-ceriya.git
cd web-profile-cbb-ceriya

# Install dependencies
npm install

# Jalankan dev server (port 3000)
npm run dev

# Build untuk production
npm run build

# Preview build result
npm run preview
```

## Cara Ganti Gambar

1. Letak file: `public/images/`
2. Format: WebP (recommended) atau JPG
3. Update `alt` text di `index.html` sesuai gambar
4. Untuk hero, update juga `<link rel="preload">` di `<head>`

### Dummy → Real
| Dummy | Real Image Spec |
|-------|----------------|
| `hero-bg.svg` | 1920×1080px — foto gedung sekolah |
| `facility-1.svg` | 1200×800px — ruang kelas |
| `facility-2.svg` | 1200×800px — lapangan bermain |
| `facility-3.svg` | 1200×800px — perpustakaan |
| `logo.webp` | Vector — logo asli |
| `avatar.svg` | 200×200px — foto orang tua |

## Yang Perlu Disiapkan Sebelum Deploy

- [ ] Ganti semua gambar dummy dengan foto asli
- [ ] Update `form action` di contact form ke Formspree endpoint
- [ ] Update Google Maps API key
- [ ] Update social media links
- [ ] Update phone number & email di semua tempat
- [ ] Update alamat di Schema markup (jika berubah)
- [ ] Update URL di `sitemap.xml` dan `robots.txt`

## Struktur Folder

```
cbb-ceriya/
├── index.html              # Main HTML
├── vite.config.js          # Vite config
├── tailwind.config.js      # Tailwind theme
├── postcss.config.js       # PostCSS config
├── package.json            # Dependencies
├── public/
│   ├── images/             # Gambar & assets
│   ├── robots.txt          # SEO
│   └── sitemap.xml         # SEO
├── src/
│   ├── style.css           # Tailwind + custom CSS
│   ├── main.js             # JavaScript logic
│   └── utils/
│       └── constants.js    # Data (testimonials)
└── PLAN.md                 # Blueprint dokumen
```

## Deploy

### Vercel (Recommended)
1. Push repo ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import repo
3. Framework: Vite
4. Build: `npm run build`
5. Output: `dist`
6. Auto-deploy on push

### Netlify
1. Push repo ke GitHub
2. Buka [netlify.com](https://netlify.com) → Import repo
3. Build: `npm run build`
4. Publish: `dist`

## Lisensi

© 2025 CBB CERIYA
