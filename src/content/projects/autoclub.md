---
title:    "AutoClub"
subtitle: "Luxury Car Rental Platform"
year:     2024
tags:     ["SaaS", "E-commerce UX", "Dashboard", "AI-assisted"]
accent:   "#2563EB"
coverBg:  "#0F1E3C"
order:    2
featured: true
client:   "AutoClub Sp. z o.o."
role:     "Lead UX/UI Designer"
duration: "10 tygodni"
tools:    ["Figma", "Claude AI", "Maze", "Framer"]
liveUrl:  "/projects/autoclub"
stats:
  - { value: "3",    label: "poziomy membership" }
  - { value: "12+",  label: "modeli w flocie" }
  - { value: "-40%", label: "czas do rezerwacji" }
  - { value: "4.9",  label: "ocena UX w testach" }
seo:
  description: "Platforma rezerwacji luksusowych samochodów z systemem membership. End-to-end UX/UI — od badań przez design system po interaktywny prototyp."
---

## Wyzwanie

AutoClub — wypożyczalnia premium samochodów — chciała przejść z modelu jednorazowych rezerwacji na **subskrypcyjny model membership**. Problem: istniejące przepływy były zaprojektowane pod transakcje, nie pod relację z marką.

Trzy główne wyzwania:
- Użytkownicy nie rozumieli wartości subskrypcji względem jednorazowej rezerwacji
- Proces rezerwacji wymagał zbyt wielu kroków (średnio 11)
- Brak różnicowania doświadczenia między tierami Silver / Gold / Platinum

## Badania i strategia

Przeprowadziłem analizę 8 konkurentów i 24 wywiady z klientami premium. Claude AI pomógł skodować transkrypty i zidentyfikować wzorce decyzyjne.

Kluczowe insighty:
- Klienci premium decydują **emocjami** — chcą czuć ekskluzywność, nie czytać specyfikacje
- Tier system musi być widoczny i odczuwalny na każdym kroku, nie tylko w cenniku
- Zaufanie buduje się przez transparentność floty i statusu dostępności

## Rozwiązanie UX/UI

Zaprojektowałem platformę wokół konceptu **"club experience"** — każdy element UI wzmacnia poczucie przynależności do ekskluzywnego klubu.

Kluczowe decyzje projektowe:
- Glass morphism jako język wizualny — premium bez dosłowności
- Real-time status dostępności (dostępny / limitowany / zarezerwowany)
- Booking w 3 krokach zamiast 11 — wyszukiwarka jako główny CTA
- Tier badge widoczny w każdym kontekście (nav, karty, profil)
- Billing toggle miesięczny/roczny z animowaną kalkulacją oszczędności

## Wyniki

Prototyp testowany z 18 użytkownikami (mieszanka nowych i powracających klientów). Czas do pierwszej rezerwacji skrócony o 40%, task completion 94%, NPS prototypu: 71.
