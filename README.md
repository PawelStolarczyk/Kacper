# kacper.design — Portfolio Kacpra Stolarczyka

Portfolio UI/UX designera zbudowane w **Astro 5** z React islands, Tailwind v4 i Framer Motion.

## Stack

| Technologia | Wersja | Zastosowanie |
|---|---|---|
| [Astro](https://astro.build) | 5.x | SSG framework, Content Collections, View Transitions |
| [React](https://react.dev) | 19 | Interactive islands (ThemeToggle, ContactForm) |
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Utility CSS + `@theme` tokens |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Scroll animations, page transitions |
| [react-hook-form](https://react-hook-form.com) | 7.x | Contact form validation |
| [Zod](https://zod.dev) | 3.x | Schema validation (form + API) |
| [Resend](https://resend.com) | 4.x | Email delivery (contact form) |

## Struktura projektu

```
src/
├── components/
│   ├── ui/           # Atomowe komponenty (Button, Tag, ThemeToggle, ContactForm)
│   ├── sections/     # Sekcje strony głównej (Hero, About, Portfolio, Process, …)
│   ├── layout/       # Nav, Footer
│   └── case-study/   # Komponenty podstron projektów
├── content/
│   └── projects/     # Pliki .mdx z case studies (jeden plik = jeden projekt)
├── layouts/
│   ├── BaseLayout.astro       # HTML shell, meta, fonts, View Transitions
│   └── CaseStudyLayout.astro  # Layout podstrony projektu
├── pages/
│   ├── index.astro            # Strona główna
│   ├── projects/[slug].astro  # Dynamiczne podstrony projektów
│   └── api/contact.ts         # API endpoint (formularz kontaktowy)
├── styles/
│   ├── global.css    # Tailwind @import, base styles
│   └── tokens.css    # CSS custom properties dark/light
└── lib/
    ├── motion.ts     # Framer Motion variants
    ├── theme.ts      # Theme toggle logic + FOUC prevention script
    └── cn.ts         # clsx + tailwind-merge utility
```

## Instalacja

```bash
# Zainstaluj zależności
pnpm install

# Uruchom dev server
pnpm dev

# Build produkcyjny
pnpm build

# Podgląd builda
pnpm preview
```

## Konfiguracja

1. Skopiuj `.env.example` → `.env`
2. Uzupełnij `RESEND_API_KEY` (formularz kontaktowy)
3. Zaktualizuj `site` w `astro.config.mjs` na swoją domenę

## Dodawanie nowego projektu

Utwórz plik `src/content/projects/nazwa-projektu.mdx`:

```yaml
---
title:    "Nazwa projektu"
subtitle: "Podtytuł"
year:     2025
tags:     ["Tag 1", "Tag 2"]
accent:   "#FF0066"
coverBg:  "#0A0A0A"
order:    6
client:   "Klient"
role:     "Twoja rola"
duration: "X tygodni"
tools:    ["Figma", "Claude AI"]
stats:
  - { value: "X%", label: "opis metryki" }
seo:
  description: "Opis SEO projektu"
---

## Treść case study w Markdown...
```

Projekt automatycznie pojawi się w portfolio i otrzyma własną podstronę `/projects/nazwa-projektu`.

## Deploy

### Vercel (zalecany)
```bash
# Jeden raz
npm i -g vercel
vercel

# Kolejne deploye przez git push (auto CI/CD)
```

### Cloudflare Pages
```bash
# Build command: pnpm build
# Output dir:    dist
# Node version:  22
```

## Customizacja

- **Tokeny kolorów:** `src/styles/tokens.css`
- **Animacje:** `src/lib/motion.ts`
- **Dane osobowe:** `src/components/sections/About.astro`, `Contact.astro`
- **Favicon/OG:** `public/favicon.svg`, `public/og/`
