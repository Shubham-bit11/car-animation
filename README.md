# Scroll-Driven Hero Section

A scroll-driven hero animation: a top-down F1 car drives down a road as you scroll, while the headline and impact stats animate around it. Inspired by [this reference](https://paraschaturvedi.github.io/car-scroll-animation).

**Live demo:** `https://<your-username>.github.io/<repo-name>/`

## Features
- Letter-spaced headline with a staggered reveal on load
- Four impact stats that fade in one by one, with number count-up
- Scroll-driven motion: the car, road lane dashes, headline and stat bars all follow scroll progress (not autoplay)
- Smoothed with GSAP `scrub: 1.1` so motion eases instead of snapping
- Responsive layout, light/dark theme support, and `prefers-reduced-motion` support

## Tech stack
- HTML, CSS, JavaScript
- [GSAP](https://gsap.com) + ScrollTrigger (animation and scroll scrubbing)
- [Tailwind CSS](https://tailwindcss.com) (CDN) for utilities
- Car is a hand-drawn inline SVG (no image files)

## How it works
1. **Intro timeline** (`script.js`): splits the headline into letters and plays a staggered GSAP timeline, then reveals the stats and counts them up.
2. **Scroll timeline**: one GSAP timeline pinned with ScrollTrigger (`pin: true`, `scrub: 1.1`). Scroll progress drives the car's `y`, `x`, `rotation` and `scale`, the lane dashes, the headline fade and each stat bar.
3. **Performance**: only `transform` and `opacity` are animated, `will-change` is set on moving elements, and distances are calculated on refresh rather than on every scroll event.

## Project structure
```
.
├── index.html   # markup + SVG car
├── style.css    # theme tokens, layout, hero styles
├── script.js    # intro animation + scroll timeline
└── README.md
```

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
npx serve .
```

## Deploy on GitHub Pages
Repo **Settings → Pages → Deploy from a branch → `main` / root**.
