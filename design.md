# Scroll-Based Animation Website — Design System & Flow Document
> Research-backed design spec for a multi-section, scroll-driven website.
> Reference site: [thecube.dk](https://www.thecube.dk/) — Webflow, cinematic scroll storytelling.

---

## 0. Design Philosophy

This document defines the **best-in-class scroll animation flow** for a multi-section website. The goal is not decoration — it is **narrative control**. Every scroll interaction should:

1. **Guide attention** — the user never feels lost or overwhelmed.
2. **Reveal sequentially** — content earns its place by appearing through motion.
3. **Feel physical** — animations should obey momentum, weight, and gravity.
4. **Never block** — the scroll must feel native. No scroll-jacking.

### Core Principle: Scroll = Time

Treat scrolling the way film directors treat time. Each section is a **scene**. The scroll position is the **playhead**. The user is the **director** — they control pacing by how fast they scroll.

---

## 1. Reference Site Breakdown — The Cube (thecube.dk)

### What they do extremely well:

| Element | Technique | Why it works |
|---|---|---|
| Hero opening | Giant text (`the cube`) with building image reveal underneath | Creates scale and cinematic context instantly |
| Stats reveal | Number counters appearing in viewport | Makes data feel earned, not just listed |
| Use-case tabs (1–4) | Pinned scroll section, content swaps on scroll progress | Forces reading without losing scroll control |
| History timeline | Numbered scroll sequence with image swap | Creates temporal depth through spatial scrolling |
| Image gallery mid-section | Horizontal image strip with vertical scroll driving horizontal pan | Breaks vertical monotony, creates surprise |
| Video section | Autoplay ambient video, scrubbed on scroll progress | Turns passive content into interactive storytelling |
| VR Tour embed | Appears as a "reward" mid-scroll | Gamifies exploration |

### What their underlying scroll architecture looks like:

```
[Hero Pin] → [Stats Reveal] → [Pinned Tabs Section] → [Video Scrub] 
→ [Gallery Pan] → [VR Embed] → [Specs Accordion] → [History Timeline] 
→ [Contact/Footer]
```

Each section transition uses one of three mechanisms:
- **Opacity + Y translate** (elements fade in from below)
- **Pin + scrub** (section stays fixed, content updates with scroll)
- **Clip-path reveal** (image/content masked, mask shrinks on scroll)

---

## 2. Animation Vocabulary — The 8 Core Patterns

These are the **8 essential scroll animation patterns** to build from. Every section on your site should use exactly one or two of these — never more.

---

### Pattern 1: Cinematic Hero Reveal
**Type:** On-load + scroll-out

**What it does:**
- Page loads with a full-viewport dark overlay or giant text
- As the user begins scrolling, the overlay slides up or fades out
- The hero image/video underneath becomes visible

**Best for:** Opening section, maximum first impression

**Implementation (GSAP):**
```js
gsap.timeline({
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    pin: false
  }
})
.to(".hero-overlay", { yPercent: -100, ease: "power2.inOut" })
.to(".hero-text", { y: -80, opacity: 0 }, "<")
.to(".hero-image", { scale: 1.08 }, "<");
```

**CSS approach:**
```css
.hero-text {
  clip-path: inset(0 0 100% 0);
  animation: revealUp 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
@keyframes revealUp {
  to { clip-path: inset(0 0 0% 0); }
}
```

---

### Pattern 2: Viewport Fade-Stagger (Section Entry)
**Type:** On-viewport-enter, one-time

**What it does:**
- Elements are invisible (`opacity: 0`, `translateY: 40px`)
- When the section enters the viewport, elements cascade in with staggered delay
- Each child animates 80–150ms after the previous

**Best for:** Feature lists, stat blocks, card grids, team sections

**Implementation (GSAP):**
```js
gsap.from(".feature-card", {
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 75%",
    toggleActions: "play none none none"
  },
  y: 50,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out"
});
```

**CSS-only approach:**
```css
.card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.card.in-view {
  opacity: 1;
  transform: translateY(0);
}
/* Apply .in-view via IntersectionObserver */
```

---

### Pattern 3: Pinned Scroll — Content Swap
**Type:** Scrub-driven, section pinned

**What it does:**
- The section becomes "sticky" to the viewport
- As the user scrolls within the pinned zone, the visible content changes (tabs, features, use-cases)
- Unpins once the user has scrolled through all states

**Best for:** Multi-feature showcases, use-case switchboards, step-by-step flows

**Implementation (GSAP):**
```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pinned-section",
    start: "top top",
    end: "+=300%",      // 3x viewport height = 3 content states
    pin: true,
    scrub: 1.5,
  }
});

tl
  .to(".panel-2", { opacity: 1, xPercent: 0 })
  .to(".panel-1", { opacity: 0 }, "<")
  .to(".panel-3", { opacity: 1, xPercent: 0 }, "+=0.5")
  .to(".panel-2", { opacity: 0 }, "<");
```

**Layout pattern:**
```html
<section class="pinned-section">
  <div class="pinned-inner"> <!-- stays fixed -->
    <div class="panel panel-1">State 1</div>
    <div class="panel panel-2">State 2</div>
    <div class="panel panel-3">State 3</div>
  </div>
</section>
```

---

### Pattern 4: Parallax Depth Layers
**Type:** Continuous scrub, no pin

**What it does:**
- Multiple elements move at different speeds relative to scroll
- Creates the illusion of 3D depth: far elements move slow, near elements move fast
- Background, mid, and foreground layers each have different `yPercent` multipliers

**Best for:** Hero sections, atmospheric dividers, image-heavy sections

**Implementation (GSAP):**
```js
// Background moves slowest (0.3x scroll speed)
gsap.to(".parallax-bg", {
  scrollTrigger: { trigger: ".scene", start: "top bottom", end: "bottom top", scrub: true },
  yPercent: -30,
});

// Mid layer (0.6x speed)
gsap.to(".parallax-mid", {
  scrollTrigger: { trigger: ".scene", start: "top bottom", end: "bottom top", scrub: true },
  yPercent: -60,
});

// Foreground (1x speed = normal scroll)
gsap.to(".parallax-fg", {
  scrollTrigger: { trigger: ".scene", start: "top bottom", end: "bottom top", scrub: true },
  yPercent: -100,
});
```

**Performance note:** Only animate `transform` and `opacity`. Never animate `top`, `left`, `width`, or `height` — these cause layout reflow and kill frame rate.

---

### Pattern 5: Text Reveal — Split Character/Word
**Type:** On-viewport-enter, one-time

**What it does:**
- Headline text is split into individual characters or words
- Characters animate in sequentially from bottom (as if rising through a floor)
- Creates a typographic "typewriter but cinematic" effect

**Best for:** Section headings, hero taglines, pull quotes

**Implementation (GSAP SplitText):**
```js
const split = new SplitText(".headline", { type: "words,chars" });

gsap.from(split.chars, {
  scrollTrigger: {
    trigger: ".headline",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  y: "110%",           // Start below clip
  opacity: 0,
  duration: 0.8,
  stagger: 0.025,
  ease: "power4.out"
});
```

**CSS-only (clip-path mask per word):**
```css
.headline-word {
  display: inline-block;
  overflow: hidden;
}
.headline-word span {
  display: inline-block;
  transform: translateY(100%);
  animation: wordReveal 0.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}
@keyframes wordReveal {
  to { transform: translateY(0); }
}
```

---

### Pattern 6: Horizontal Scroll Panel
**Type:** Scrub-driven, section pinned, horizontal motion

**What it does:**
- Section pins vertically
- The inner content container scrolls horizontally as user scrolls down
- Creates a gallery / timeline / feature-browsing experience

**Best for:** Image galleries, project showcases, timeline sections

**Implementation (GSAP):**
```js
const horizontalTrack = document.querySelector(".h-track");
const trackWidth = horizontalTrack.scrollWidth - window.innerWidth;

gsap.to(".h-track", {
  scrollTrigger: {
    trigger: ".h-section",
    start: "top top",
    end: () => `+=${trackWidth}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1
  },
  x: -trackWidth,
  ease: "none"
});
```

**Layout pattern:**
```html
<section class="h-section">
  <div class="h-track"> <!-- this slides left -->
    <div class="h-panel">Panel A</div>
    <div class="h-panel">Panel B</div>
    <div class="h-panel">Panel C</div>
    <div class="h-panel">Panel D</div>
  </div>
</section>
```

---

### Pattern 7: Counter / Number Scrub
**Type:** Scrub-driven or on-viewport-enter

**What it does:**
- Numerical stats animate from 0 to their target value
- Speed can be tied to scroll position or triggered once
- Optionally combined with a progress ring or bar

**Best for:** Stats sections, achievement blocks, metrics displays

**Implementation (GSAP):**
```js
gsap.to(".counter", {
  scrollTrigger: {
    trigger: ".stats-section",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  innerHTML: 2500,    // Target number
  duration: 2,
  snap: { innerHTML: 1 },
  ease: "power2.out"
});
```

---

### Pattern 8: Clip-Path / Mask Reveal
**Type:** On-viewport-enter or scrub-driven

**What it does:**
- Content is hidden behind a CSS `clip-path`
- As the section enters view (or as user scrolls), the clip path opens to reveal the element
- Creates a "curtain lifting" or "door opening" effect

**Best for:** Image reveals, section transitions, dramatic callouts

**Implementation (GSAP):**
```js
gsap.from(".reveal-image", {
  scrollTrigger: {
    trigger: ".reveal-section",
    start: "top 65%",
    toggleActions: "play none none reverse"
  },
  clipPath: "inset(100% 0% 0% 0%)",
  duration: 1.2,
  ease: "power4.inOut"
});
```

**CSS-only:**
```css
.reveal-image {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 1s cubic-bezier(0.76, 0, 0.24, 1);
}
.reveal-image.in-view {
  clip-path: inset(0% 0 0 0);
}
```

---

## 3. The Best-in-Class Section Flow

This is the **optimal sequence** for a multi-section scroll-animation website. Based on The Cube's architecture, award-winning agency sites, and conversion psychology.

```
┌─────────────────────────────────────────────────────────┐
│  SECTION 1: CINEMATIC HERO                              │
│  Pattern: Hero Reveal + Parallax                        │
│  Height: 100vh                                          │
│  Scroll behavior: Scroll-out (hero fades/slides away)   │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 2: INTRO / BRAND STATEMENT                     │
│  Pattern: Split Text Reveal + Fade Stagger              │
│  Height: 80–100vh                                       │
│  Scroll behavior: One-time trigger on enter             │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 3: STATS / PROOF NUMBERS                       │
│  Pattern: Counter Scrub + Horizontal Dividers           │
│  Height: 60–80vh                                        │
│  Scroll behavior: One-time trigger on enter             │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 4: FEATURES / USE-CASES (PINNED)               │
│  Pattern: Pinned Scroll — Content Swap                  │
│  Height: pinned for 300vh of scroll                     │
│  Scroll behavior: Pin + Scrub, 3–5 content states       │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 5: MEDIA / VIDEO / AMBIENT VISUAL              │
│  Pattern: Clip-Path Reveal or Video Autoplay            │
│  Height: 100vh                                          │
│  Scroll behavior: Mask reveal, fullscreen moment        │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 6: HORIZONTAL GALLERY / SHOWCASE               │
│  Pattern: Horizontal Scroll Panel                       │
│  Height: pinned for 200–250vh of scroll                 │
│  Scroll behavior: Pin + horizontal scrub                │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 7: TIMELINE / HISTORY / PROCESS                │
│  Pattern: Fade-Stagger per step + Image Swap            │
│  Height: natural (no pin)                               │
│  Scroll behavior: Sequential reveal, numbered steps     │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 8: SPECIFICATIONS / DETAILS                    │
│  Pattern: Accordion + Parallax background               │
│  Height: natural                                        │
│  Scroll behavior: Section-enter triggers, staggered     │
└─────────────────────────────────────────────────────────┘
                          ↓ scroll
┌─────────────────────────────────────────────────────────┐
│  SECTION 9: CTA / CONTACT / FOOTER                      │
│  Pattern: Clip-Path Reveal + Final Hero-style reveal    │
│  Height: 80–100vh                                       │
│  Scroll behavior: Cinematic entrance, final moment      │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Transition Grammar — How Sections Connect

Each section-to-section transition needs a **visual handoff**. These are the rules:

| From → To | Transition method |
|---|---|
| Hero → Intro | Hero elements scroll-out (y: -100px, opacity: 0), Intro fades in from below |
| Intro → Stats | Stats counter block rises from bottom (translateY + opacity) |
| Stats → Pinned Features | Background color morph (dark → light or vice versa) as pin begins |
| Pinned → Media | Pin releases, full-bleed video/image slides in from right |
| Media → Horizontal | Horizontal track begins immediately after media, no gap |
| Horizontal → Timeline | Horizontal releases, timeline items appear as vertical scroll resumes |
| Timeline → Specs | Section divider line draws across screen (SVG or border-width anim) |
| Specs → CTA | Final reveal — clip-path or overlay lifts to reveal CTA section |

### Color / Background Transitions

Use background color as a **scene change signal**. The Cube does this: dark hero → light content → dark history → light contact.

```js
// Background color morph on scroll
gsap.to("body", {
  scrollTrigger: {
    trigger: ".light-section",
    start: "top center",
    end: "bottom center",
    scrub: true,
    toggleActions: "play reverse play reverse"
  },
  backgroundColor: "#F5F2EC",
  duration: 1
});
```

---

## 5. Easing Reference — The Right Curve for Every Moment

Using the wrong easing destroys an otherwise good animation. Follow this map:

| Moment | Easing | Reason |
|---|---|---|
| Hero reveal (load) | `cubic-bezier(0.76, 0, 0.24, 1)` | Dramatic deceleration, cinematic |
| Scrubbed animations | `"none"` / `ease: "none"` | Linear maps perfectly to scroll |
| Cards / content entering | `power3.out` | Fast in, graceful settle |
| Text char reveals | `power4.out` | Very fast start, melts at end |
| Pinned content swap | `power2.inOut` | Smooth both ends for in-place feel |
| Number counters | `power2.out` | Feels like momentum slowing down |
| Clip-path reveals | `power4.inOut` | Sharp punch, clean release |
| Parallax layers | `"none"` | Perfectly linear to scroll input |
| Hover micro-interactions | `back.out(1.7)` | Slight overshoot = life and energy |

---

## 6. Performance Rules (Non-Negotiable)

### Only animate GPU-composited properties:
```css
/* ✅ GOOD — composited, no reflow */
transform: translateX(), translateY(), scale(), rotate()
opacity
filter: blur()

/* ❌ BAD — causes layout reflow, kills FPS */
width, height, top, left, margin, padding
```

### Hardware acceleration hint:
```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU layer */
}
/* Remove will-change after animation completes */
```

### Respect accessibility:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```js
// GSAP version
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced) {
  // Initialize all scroll animations
  initScrollAnimations();
}
```

### Mobile handling:
- Disable pinned scroll sections on mobile (they behave poorly)
- Replace horizontal scroll with vertical stacked panels on mobile
- Reduce parallax depth by 50% on mobile
- Use `gsap.matchMedia()` to swap behaviors responsively

```js
gsap.matchMedia().add("(min-width: 768px)", () => {
  // Desktop: full pinned horizontal scroll
  initHorizontalSection();
});

gsap.matchMedia().add("(max-width: 767px)", () => {
  // Mobile: simple fade-stagger
  initMobileStagger();
});
```

---

## 7. Tech Stack Recommendation

### Option A — Pure HTML/JS (No Framework)
Best for: Static sites, Webflow export, WordPress injection

```
GSAP 3.x + ScrollTrigger    → Core animation engine
GSAP ScrollSmoother         → Smooth scroll (free as of 2025)
GSAP SplitText              → Text char/word splitting
Lenis                       → Alternative lightweight smooth scroll
Intersection Observer API   → Fallback for simple reveals
```

### Option B — React / Next.js
Best for: Dynamic apps, CMS-driven sites

```
@gsap/react (useGSAP hook)  → React-safe GSAP with auto-cleanup
Framer Motion               → Alternative for component-level motion
GSAP ScrollTrigger          → Still the best for scroll sync
```

### Option C — CSS-Only (Progressive Enhancement)
Best for: Performance-critical, minimal bundle sites

```css
/* CSS Scroll-Driven Animations (2024+ native) */
@keyframes revealFade {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: revealFade linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}
```
**Note:** CSS scroll-driven animations have ~80% browser support (2025). Use as progressive enhancement with JS fallback.

---

## 8. Smooth Scrolling Setup

Smooth scrolling is what separates good sites from great ones. The Cube uses Webflow's built-in smooth scroll. For custom builds:

### Lenis (Recommended — lightweight, free)
```js
import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false  // Disable on touch (native feels better)
});

// Connect to GSAP ticker for perfect sync
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### GSAP ScrollSmoother (Premium, but free in 2025)
```js
import { ScrollSmoother } from "gsap/ScrollSmoother";
gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 1.5,
  effects: true,
  smoothTouch: 0.1
});
```

---

## 9. Section-by-Section Animation Spec

### Section 1 — Hero
```
Entry:       On page load (no scroll needed)
Elements:    Logo, tagline headline, background image/video, scroll indicator
Animation:
  - Logo:    fadeIn, y: -20 → 0, delay: 0.3s
  - Tagline: SplitText chars, stagger from center out, delay: 0.6s
  - BG:      scale: 1.05 → 1.0 (Ken Burns subtle), duration: 3s
  - Scroll indicator: bounce loop, starts at 1.5s, opacity fades on first scroll
Scroll-out:
  - Tagline: y → -100, opacity → 0 (scrub)
  - BG:      scale → 1.08, opacity → 0.7 (scrub), parallax effect
```

### Section 2 — Intro / Brand Statement
```
Entry:       Triggered at top 70% of viewport
Elements:    Eyebrow label, main headline, body paragraph, optional CTA
Animation:
  - Eyebrow: fadeIn, x: -30 → 0, duration: 0.6s
  - Headline: SplitText words, stagger: 0.08s, y: 60 → 0
  - Body:     fadeIn, y: 30 → 0, delay: 0.4s after headline
  - CTA:      scale: 0.9 → 1, opacity: 0 → 1, delay: 0.6s
```

### Section 3 — Stats
```
Entry:       Triggered at top 65%
Elements:    3–4 stat blocks (number + label)
Animation:
  - Container: borderTop draws across (scaleX: 0 → 1)
  - Each stat: stagger 0.15s, y: 40 → 0, opacity: 0 → 1
  - Numbers:   count from 0 to value, duration: 1.8s, power2.out
```

### Section 4 — Pinned Features
```
Entry:       Pin starts when section hits top of viewport
Elements:    Left sticky content (number, heading, desc), Right media (image/video)
States:      3–4 feature states revealed by scrolling
Animation:
  - Pin zone: extends 300vh (3 states × 100vh)
  - State transition: outgoing fades left (xPercent: -20, opacity: 0)
  - Incoming: fades right (xPercent: 20 → 0, opacity: 0 → 1)
  - Media:    clip-path wipe from right, or crossfade
  - Progress: thin line/bar that fills as user scrolls through pin
```

### Section 5 — Media Break
```
Entry:       Clip-path reveal from bottom (100% → 0%)
Elements:    Full-bleed video/image, optional overlay text
Animation:
  - Container: clip-path: inset(100% 0 0 0) → inset(0% 0 0 0), 1.2s, power4.inOut
  - Overlay text: fades in 0.4s after reveal complete
  - Parallax:  image moves at 0.7× scroll speed
```

### Section 6 — Horizontal Gallery
```
Entry:       Pin starts when section reaches top
Elements:    Horizontal row of image panels (each 80–100vw wide)
Animation:
  - Pin zone: width of track (total panels × panel width - 100vw)
  - Track:    x: 0 → -trackWidth, scrub: 1, ease: none
  - Each panel: as it enters horizontal viewport, subtle scale: 0.95 → 1
  - Caption:  fades in per panel using nested ScrollTrigger in horizontal container
```

### Section 7 — Timeline / History
```
Entry:       Natural scroll, each step triggers individually
Elements:    Year label, event text, historical image, connecting line
Animation:
  - Line:     scaleY: 0 → 1, drawn top to bottom as user scrolls
  - Each step: at 70% viewport height
    - Year:   x: -40 → 0, opacity: 0 → 1
    - Image:  clip-path reveal from bottom
    - Text:   y: 30 → 0, opacity: 0 → 1, stagger from year
```

### Section 8 — Specifications / Details
```
Entry:       Section-enter triggered
Elements:    Accordion items or spec grid
Animation:
  - Section heading: SplitText reveal
  - Grid items: stagger batch (ScrollTrigger.batch), 8 at a time
  - Accordion: no scroll animation needed — interaction-driven
```

### Section 9 — CTA / Footer
```
Entry:       Clip-path or overlay lifts to reveal
Elements:    Final headline, CTA button, contact info, logo
Animation:
  - Background: contrasting color slides in from bottom (yPercent: 100 → 0)
  - Headline:  large, slow text reveal (SplitText, slower stagger: 0.12s)
  - CTA button: scale: 0.85 → 1, with subtle pulse loop after reveal
  - Logo:      fadeIn last, opacity: 0 → 1, delay: 0.8s
```

---

## 10. File Structure Recommendation

```
/
├── index.html
├── styles/
│   ├── base.css          ← Reset, typography, CSS variables
│   ├── layout.css        ← Section structure, grid, spacing
│   ├── animations.css    ← Initial states, keyframes, transitions
│   └── responsive.css    ← Breakpoints, mobile overrides
├── js/
│   ├── main.js           ← Entry point, GSAP registration
│   ├── smooth-scroll.js  ← Lenis setup
│   ├── hero.js           ← Section 1 animations
│   ├── pinned.js         ← Pinned scroll sections
│   ├── horizontal.js     ← Horizontal scroll section
│   ├── reveals.js        ← Viewport entry reveals (shared util)
│   ├── text.js           ← SplitText animations
│   └── timeline.js       ← History/timeline section
└── assets/
    ├── images/
    └── video/
```

---

## 11. GSAP Initialization Boilerplate

```js
// main.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import Lenis from "@studio-freight/lenis";

// Register plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Smooth scroll
const lenis = new Lenis({ duration: 1.2, smooth: true, smoothTouch: false });
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Connect Lenis to ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

// Reduced motion check
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Init all animations
if (!prefersReduced) {
  import("./hero.js").then(m => m.init());
  import("./pinned.js").then(m => m.init());
  import("./horizontal.js").then(m => m.init());
  import("./reveals.js").then(m => m.init());
  import("./text.js").then(m => m.init());
  import("./timeline.js").then(m => m.init());
}

// Refresh ScrollTrigger on resize (debounced)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
```

---

## 12. Quick Reference — Decision Tree

```
Is this a full-screen moment?
  → YES: Use Hero Reveal or Media Break pattern
  → NO: Continue...

Does it contain multiple sub-items (cards, features, steps)?
  → YES: Use Fade-Stagger or Pinned Scroll
  → NO: Continue...

Is it a headline or key statement?
  → YES: Use SplitText Reveal
  → NO: Continue...

Is it a set of images or visual showcase?
  → YES: Use Horizontal Scroll or Clip-Path Reveal
  → NO: Continue...

Is it a number or metric?
  → YES: Use Counter Scrub
  → NO: Use generic Fade-Stagger (safe default)
```

---

## 13. Don'ts — Anti-Patterns to Avoid

| Anti-pattern | Problem | Fix |
|---|---|---|
| Scroll-jacking (overriding scroll) | Disorients users, breaks browser shortcuts | Use scrub + pin, never preventDefault on scroll |
| Animating too many elements at once | GPU overload, janky FPS | Batch via `ScrollTrigger.batch()`, limit concurrent tweens |
| Infinite looping animations in mid-page | Visual noise, distracts from content | Use loops only in hero, very subtle elsewhere |
| Heavy blur/filter animations | Extremely expensive on GPU | Use sparingly, test on mid-range mobile |
| Animating layout properties (width, height) | Forces browser reflow | Only animate `transform` and `opacity` |
| No mobile optimization | Pinned sections break on touch | Always use `gsap.matchMedia()` for responsive splits |
| No loading strategy for images/video | Animations play on blank content | Preload critical assets, use `imagesLoaded` before init |
| Oversaturating with animations | User fatigue, feels gimmicky | Max 1–2 animation patterns per section |

---

*Document version: 1.0 — researched from thecube.dk, GSAP documentation, Codrops tutorials, and award-winning agency site patterns (2024–2025).*
