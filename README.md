# Andranik Meliqsetyan — Personal Website

Personal professional website for **Andranik Meliqsetyan**, Principal Solutions Architect & Team Lead at National Instruments (NI) Armenia.

🌐 **Live site:** [andrankm.github.io/andranik-website](https://andrankm.github.io/andranik-website)

---

## About

A single-page professional website built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools. Dark technical aesthetic with teal and amber accents, fully responsive from mobile to desktop.

---

## Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | Hero | Animated dot-grid canvas, name, title, tagline, and CTA buttons |
| 02 | About | Profile photo, professional bio, public speaker highlight |
| — | Speaking | Conference photo, speaker topics, invite-to-speak CTA |
| 03 | Skills | 6 skill categories with tag grid |
| 04 | Experience | Vertical career timeline — 3 roles at NI Armenia (2014–Present) |
| 05 | Portfolio | 3 project cards including Smart Manufacturing & Robotics Lab |
| 06 | Education | M.Eng., B.Eng., and Electronic Engineering Technician |
| 07 | Blog | Coming soon — placeholder with topic pills |
| 08 | Contact | Contact details + validated contact form |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 + CSS Custom Properties |
| Interactivity | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts — Space Grotesk, Inter, JetBrains Mono |
| Icons | Font Awesome 6 |
| Hosting | GitHub Pages |

---

## Project Structure

```
├── index.html
├── css/
│   ├── style.css       # Design tokens, reset, base styles, nav, buttons
│   ├── layout.css      # Section layouts, grid, responsive breakpoints
│   └── animations.css  # Scroll reveals, hero entry, hover effects
├── js/
│   ├── animations.js   # Hero canvas, IntersectionObserver scroll reveals
│   └── main.js         # Nav toggle, scroll spy, contact form validation
├── assets/
│   └── images/
│       ├── profile.png   # Profile headshot
│       └── speaking.jpg  # Conference speaking photo
├── spec.md             # Project specification & design decisions
└── My Web Site.md      # Project reference — file structure & design tokens
```

---

## Deployment (GitHub Pages)

1. Go to **Settings → Pages** in this repository
2. Under *Branch*, select `master` and `/ (root)`, then click **Save**
3. The site will be live at `https://andrankm.github.io/andranik-website`

---

## Local Development

No build step required — open `index.html` directly in any browser:

```powershell
Start-Process "index.html"
```

---

## License

© 2026 Andranik Meliqsetyan. All rights reserved.
