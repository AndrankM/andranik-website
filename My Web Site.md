# My Web Site — Project Reference

## File Structure

```
My Web site/
├── index.html                        # Single-page site (all sections)
├── spec.md                           # Project specification & brainstorm
├── My Web Site.md                    # This file — project reference
│
├── css/
│   ├── style.css                     # Design tokens, reset, base styles, nav, buttons, tags
│   ├── layout.css                    # Section-specific layouts, grid, responsive breakpoints
│   └── animations.css                # Scroll reveals, hero entry, hover effects, reduced-motion
│
├── js/
│   ├── animations.js                 # Hero canvas dot grid, IntersectionObserver scroll reveals
│   └── main.js                       # Nav toggle, scroll spy, profile image, contact form
│
└── assets/
    └── images/
        ├── PLACE_PHOTO_HERE.txt      # Instructions for adding profile photo
        └── profile.jpg               # ← Drop your headshot here (600×750px recommended)
```

---

## Sections (index.html)

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Full-screen landing with animated dot-grid canvas, name, title, tagline, and CTA buttons |
| 02 | **About** | Profile photo (headshot), professional bio including public speaker mention, meta info |
| — | **Speaking** | Dedicated speaking section — conference photo, public speaker badge, topic pills, invite CTA |
| 03 | **Skills** | 6-category grid — Systems & Architecture, Embedded Engineering, Electronics, Software & Tools, Data & Analytics, Leadership |
| 04 | **Experience** | Vertical timeline — 3 roles at NI Armenia (2014–2016, 2016–2021, 2021–Present) |
| 05 | **Portfolio** | 3 project cards — Smart Manufacturing & Robotics Lab (featured), Predictive Maintenance Platform, Enterprise Data Analytics |
| 06 | **Education** | 3 education cards — M.Eng., B.Eng., Electronic Engineering Technician |
| 07 | **Blog** | Coming-soon placeholder with 4 topic pills |
| 08 | **Contact** | Contact details (email, phone, location, LinkedIn) + validated contact form |

---

## Design Tokens (CSS Variables)

| Token | Value | Role |
|---|---|---|
| `--c-bg` | `#0d1117` | Page background |
| `--c-surface` | `#161b22` | Card / section background |
| `--c-surface-2` | `#1c2128` | Elevated surface |
| `--c-border` | `#30363d` | Borders and dividers |
| `--c-accent` | `#00bfae` | Primary accent (teal) |
| `--c-accent-2` | `#e6a817` | Secondary accent (amber) |
| `--c-text` | `#e6edf3` | Primary text |
| `--c-text-muted` | `#8b949e` | Secondary text |
| `--f-heading` | `Space Grotesk` | Headings font |
| `--f-body` | `Inter` | Body font |
| `--f-mono` | `JetBrains Mono` | Code / tag labels font |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 + CSS Custom Properties |
| Interactivity | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts (Space Grotesk, Inter, JetBrains Mono) |
| Icons | Font Awesome 6 (CDN) |
| Hosting | TBD — GitHub Pages / Netlify / Vercel |

---

## To-Do / Open Items

- [ ] Add professional headshot → `assets/images/profile.jpg` (headshot with Mount Ararat)
- [ ] Add speaking photo → `assets/images/speaking.jpg` (conference/podium photo)
- [ ] Provide more project details for Portfolio cards (descriptions, outcomes, links)
- [ ] Write first Blog article
- [ ] Choose and configure a hosting provider
- [ ] Register a custom domain (optional)
- [ ] Add certifications section if applicable
- [ ] Replace contact form mailto with a backend service (e.g. Formspree) for production
