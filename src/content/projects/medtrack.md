---
title:    "MedTrack"
subtitle: "HealthTech Dashboard UX"
year:     2024
tags:     ["HealthTech", "Dashboard", "Accessibility", "AI Research"]
accent:   "#00E5A0"
coverBg:  "#0C1410"
order:    3
featured: true
client:   "MedTrack Sp. z o.o."
role:     "Lead UX Designer"
duration: "8 tygodni"
tools:    ["Figma", "Claude AI", "Maze", "Hotjar"]
stats:
  - { value: "34%",  label: "task completion przed" }
  - { value: "81%",  label: "task completion po" }
  - { value: "200",  label: "przeanalizowanych wywiadów" }
  - { value: "-68%", label: "wskaźnik odrzuceń" }
seo:
  description: "Redesign dashboardu platformy zdrowotnej dla pacjentów z chorobami przewlekłymi. AI przetworzyło 200 transkryptów wywiadów użytkownika."
---

## Wyzwanie

Platforma MedTrack posiadała bogaty zestaw danych zdrowotnych, ale interfejs był chaotyczny. Pacjenci z chorobami przewlekłymi (docelowo 45–70 lat) rezygnowali po 2 tygodniach. **Task completion rate: 34%.**

Trzy główne problemy zidentyfikowane w badaniach:
- Zbyt dużo informacji wyświetlanych jednocześnie
- Brak kontekstu dla danych (liczby bez znaczenia)
- Nawigacja niezgodna z mental model pacjenta

## Badania wspomagane AI

Posiadałem 200 transkryptów wywiadów z pacjentami — zbyt dużo, by ręcznie analizować. Claude AI przetworzyło całość i wyodrębniło **12 kluczowych wzorców frustracji** z cytatami i częstotliwością występowania.

Kluczowy insight: *"Widzę liczby, ale nie wiem czy są dobre czy złe."* — powtórzył się w 67% wywiadów.

## Rozwiązanie

Przeprojektowałem hierarchię informacji wokół jednego pytania: **"Jak się dziś masz?"** zamiast "Oto twoje dane z ostatnich 30 dni."

- Dashboard personalny z **traffic light system** (zielony/żółty/czerwony)
- Kontekstualizacja każdej metryki względem normy pacjenta
- Uproszczona nawigacja: 7 pozycji → 3 pozycje
- Pełna zgodność z WCAG 2.1 AA

## Wyniki

Po 6 tygodniach od wdrożenia: task completion wzrósł z 34% do **81%**, wskaźnik odrzuceń spadł o 68%.
