# Website Specification — Andranik Meliqsetyan

> **Status:** Brainstorm / Draft  
> **Last updated:** 2026-05-26

---

## 1. Project Overview

A personal professional website for **Andranik Meliqsetyan**, Principal Solutions Architect & Team Lead at National Instruments Armenia. The primary goal is **personal branding and visibility** — establishing a strong online presence that reflects 10+ years of engineering expertise across systems design, industrial IoT, embedded engineering, and enterprise data analytics.

---

## 2. Target Audience

- Engineering peers and industry professionals
- Potential collaborators and clients
- Recruiters and conference organizers
- Anyone searching for Andranik's professional profile online

---

## 3. Site Goals

- Present a polished, credible online identity
- Showcase technical depth and breadth
- Surface key projects (e.g. Smart Manufacturing & Robotics Lab)
- Provide an easy way for visitors to get in touch
- Lay foundation for a blog/articles section (future content)

---

## 4. Sections / Pages

The site will be a **single-page application (SPA)** with smooth scroll navigation, covering the following sections in order:

### 4.1 Hero / Landing
- Full name: **Andranik Meliqsetyan**
- Title: **Principal Solutions Architect & Team Lead**
- Tagline (suggested — to be refined): *"Bridging hardware, software, and data to engineer the future."*
- CTA buttons: `View My Work` → scrolls to Portfolio | `Get in Touch` → scrolls to Contact
- Subtle background: dark technical texture or animated circuit/grid pattern

### 4.2 About Me
- Short professional narrative from the CV profile
- Highlights: 10+ years experience, hardware + software background, global team leadership, shift into enterprise data analytics
- Personal touch: languages (Armenian, English, Russian), hobbies (Art & Engineering)
- Optional: professional photo placeholder

### 4.3 Skills / Expertise
- Displayed as a visual grid or categorized tag cloud
- Categories:
  | Category | Skills |
  |---|---|
  | Systems & Architecture | Solutions Architecting, Control Systems, IoT, Condition Monitoring |
  | Embedded Engineering | Embedded HW, Embedded SW, Microcontrollers, Arduino, Raspberry Pi, Sensors |
  | Electronics | PCB Design, CAD (SolidWorks), Power Electronics |
  | Software & Tools | LabVIEW, RT, FPGA, NI HW & SW, Machine Vision |
  | Data | Data Management & Analysis |
  | Other | Mechatronics & Robotics, Mechatronics |

### 4.4 Experience Timeline
- Vertical or horizontal timeline component
- Entries (newest first):
  1. **2021 – Present** — Principal Solutions Architect & Team Lead, NI Armenia  
     Enterprise data analytics solutions for Semiconductor & Automotive industries
  2. **2016 – 2021** — Principal Program Engineering Specialist, NI Armenia  
     Global hardware platform for predictive maintenance & condition monitoring; end-to-end HW/SW/manufacturing
  3. **2014 – 2016** — Systems Engineer, NI Armenia  
     Control systems, semiconductor testing, customer solution design

### 4.5 Portfolio / Projects
- Card-based layout (2–3 cards per row)
- Initial project to feature:
  - **Smart Manufacturing & Robotics Lab**  
    *Details TBD — Andranik to provide description, outcomes, tech stack, and any images/links*
- Placeholder cards for future projects
- Each card: title, short description, tech tags, optional link/image

### 4.6 Education
- Clean list or card layout:
  - **M.Eng.** — State Engineering University of Armenia (2019–2022), Control Systems
  - **B.Eng.** — State Engineering University of Armenia (2015–2019), Control Systems & Electronic Engineering
  - **Electronic Engineering Technician** — Yerevan State College of Informatics (2010–2014), Power Electronics, HW/SW, CAD

### 4.7 Blog / Articles
- Section placeholder for future written content
- Initial state: "Coming soon" styled message or 1–2 teaser cards with topic ideas
- Suggested future topics: industrial IoT, enterprise data architecture, engineering leadership, embedded systems

### 4.8 Contact
- Contact details:
  - Email: andranik.meliqsetyan@gmail.com
  - Phone: +374 44 990033
  - Location: Yerevan, Armenia
  - LinkedIn: linkedin.com/in/andranik-meliksetyan-737888b7
- Simple contact form (name, email, message) — client-side only for now (mailto or future backend)
- No spam: consider honeypot field or simple validation

---

## 5. Design & Visual Style

### 5.1 Theme
**Dark & Technical** — an aesthetic that reflects engineering precision and depth.

### 5.2 Suggested Color Palette
| Role | Color | Notes |
|---|---|---|
| Background | `#0d1117` | Near-black, GitHub-dark style |
| Surface / Cards | `#161b22` | Slightly lighter dark |
| Primary Accent | `#00bfae` | Teal — technical, modern |
| Secondary Accent | `#e6a817` | Amber/gold — warmth, highlight |
| Text Primary | `#e6edf3` | Off-white |
| Text Secondary | `#8b949e` | Muted grey |
| Border / Divider | `#30363d` | Subtle separation |

> Colors are a starting point — open to iteration.

### 5.3 Typography
- **Headings**: `Inter` or `Space Grotesk` — geometric, modern
- **Body**: `Inter` or `Source Sans 3` — clean readability
- **Code / Tech labels**: `JetBrains Mono` or `Fira Code` — monospace for skill tags

### 5.4 Layout Principles
- Full-width dark hero with centered text
- Max content width: `1200px`, centered with padding
- Generous whitespace despite dark theme
- Subtle animations: fade-in on scroll, hover glow on cards
- Fully responsive: mobile-first design

### 5.5 Icons & Imagery
- Icons: [Lucide](https://lucide.dev/) or [Font Awesome](https://fontawesome.com/) — for skills, contact, nav
- Decorative: subtle SVG circuit/grid patterns or particle background on hero
- Professional photo: placeholder until Andranik provides one

---

## 6. Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | HTML5 | Semantic, accessible, no build step |
| Styling | CSS3 + CSS Custom Properties | Dark theme tokens, responsive via media queries |
| Interactivity | Vanilla JavaScript (ES6+) | Scroll animations, mobile nav, form handling |
| Fonts | Google Fonts | Free, fast CDN delivery |
| Icons | Font Awesome or Lucide (CDN) | Wide icon set, no build needed |
| Hosting | TBD (GitHub Pages / Netlify / Vercel) | Free static hosting options |

**No frameworks, no build tools, no dependencies** — just clean files that open in a browser.

---

## 7. File Structure (Proposed)

```
My Web site/
├── index.html          # Single page
├── spec.md             # This file
├── css/
│   ├── style.css       # Main styles + CSS variables
│   ├── layout.css      # Grid, sections, responsive
│   └── animations.css  # Scroll-triggered animations
├── js/
│   ├── main.js         # Nav, scroll spy, misc
│   └── animations.js   # IntersectionObserver animations
├── assets/
│   ├── images/
│   │   └── profile.jpg     # To be provided
│   └── icons/
└── favicon.ico
```

---

## 8. Navigation

- **Sticky top nav bar** — transparent on hero, solid dark on scroll
- Nav links: `About` | `Skills` | `Experience` | `Portfolio` | `Education` | `Blog` | `Contact`
- **Mobile**: hamburger menu → full-screen overlay or slide-in drawer
- Active section highlighted via scroll-spy

---

## 9. Open Questions / Decisions Pending

- [ ] **Profile photo** — Andranik to provide a professional headshot
- [ ] **Portfolio project details** — description, outcomes, tech stack, and images for "Smart Manufacturing & Robotics Lab" and any other projects
- [ ] **Blog content** — will any articles be written at launch, or is it a placeholder?
- [ ] **Contact form backend** — use `mailto:` link for now, or integrate a service like Formspree?
- [ ] **Domain name** — any preference for a custom domain?
- [ ] **Tagline** — approve or revise the suggested tagline
- [ ] **Certifications** — any NI certifications or other credentials to list?
- [ ] **Color palette** — approve the teal + amber suggestion or pick alternatives

---

## 10. Out of Scope (for now)

- CMS or dynamic blog engine
- Backend / database
- Authentication
- Multi-language support
- Dark/light theme toggle (dark-only for v1)
