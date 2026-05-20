# RAW SELECT — Premium UI/UX Overhaul: Master Action Plan

> **Vision:** A minimal, mature, world-class digital experience where every scroll tells a story, every interaction feels intentional, and every pixel is polished.

---

## PART 1: DESIGN SYSTEM & FOUNDATION

### 1.1 Core Design Principles

| Principle | Definition | Application |
|-----------|------------|-------------|
| **Editorial Restraint** | Less is more, but the "less" must be perfect | Remove decorative elements, let typography and imagery carry weight |
| **Motion as Narrative** | Scroll drives choreographed sequences, not just transitions | Three-act structure per section: Entrance → Reveal → Resolution |
| **Material Honesty** | Textures feel real, images feel curated | Grain, noise, organic imperfections, gallery-like image treatment |
| **Micro-Interactions as Signature** | Every interaction has a "feel" | Magnetic elements, elastic easing, subtle overshoot, tactile responses |
| **Whitespace as Luxury** | Generous padding signals confidence | Increase section spacing by 20-30%, breathe between elements |

### 1.2 Typography System (Enhanced)

| Class | Current | Enhanced | Usage |
|-------|---------|----------|-------|
| `.t-giant` | 4rem→15rem | Add letter-spacing animation on reveal | Hero headline only |
| `.t-display` | 3rem→9rem | Add word-level overflow containers | Section CTAs |
| `.t-h1` | 2.4rem→6rem | Add italic variant for emphasis | Section headlines |
| `.t-h2` | 1.8rem→3.5rem | Add line-height animation | Sub-headlines |
| `.t-h3` | 1.3rem→2rem | Add tracking animation | Card titles |
| `.t-body-lg` | 1rem→1.15rem | Increase line-height to 1.9 | Lead paragraphs |
| `.t-body` | 0.9rem→1.02rem | Add max-width 65ch for readability | Body text |
| `.t-label` | 0.6rem mono | Add color shift on scroll | Section markers |
| `.t-stat` | 3rem→5.5rem | Add count-up animation | Statistics |

### 1.3 Color System (Enhanced)

```css
/* Current palette — keep, add these */
--color-bg: #faf8f5;        /* Warm off-white */
--color-bg-2: #f2efe9;      /* Slightly darker warm */
--color-bg-3: #e8e4dc;      /* Warm beige */
--color-surface: #f7f5f1;   /* Card surface */
--color-text: #1a1a1a;      /* Deep charcoal */
--color-accent: #8b6914;    /* Warm gold */
--color-accent-bright: #a67c1a;
--color-accent-dim: rgba(139, 105, 20, 0.12);

/* NEW additions */
--color-accent-glow: rgba(139, 105, 20, 0.25);  /* Glow effects */
--color-accent-subtle: rgba(139, 105, 20, 0.06); /* Subtle backgrounds */
--color-text-60: rgba(26, 26, 26, 0.6);          /* Medium text */
--color-text-20: rgba(26, 26, 26, 0.2);          /* Very subtle */
--color-border: rgba(26, 26, 26, 0.06);          /* Borders */
--color-shadow: rgba(0, 0, 0, 0.04);             /* Shadows */
```

### 1.4 Animation Easing Library

```javascript
// Premium easing curves — use consistently across all animations
const easings = {
  // Entrance animations — smooth, confident
  "entrance": "power4.out",           // Hero text, section headers
  "entrance-smooth": "power3.out",    // Cards, images
  "entrance-bounce": "back.out(1.7)", // Badges, dots, small elements

  // Exit animations — clean departure
  "exit": "power2.in",                // Elements leaving viewport
  "exit-smooth": "power3.in",         // Sections transitioning out

  // Scroll-linked — responsive to user
  "scroll": "none",                   // Direct scrub mapping
  "scroll-smooth": "power1.inOut",    // Slight easing on scrub

  // Hover interactions — tactile response
  "hover": "power2.out",              // Magnetic elements, scale
  "hover-elastic": "elastic.out(1, 0.5)", // Button returns
  "hover-spring": "elastic.out(1, 0.3)",  // Card tilts

  // Stagger sequences — rhythmic reveals
  "stagger-fast": 0.06,               // Letters, small elements
  "stagger-medium": 0.1,              // Words, list items
  "stagger-slow": 0.18,               // Cards, sections
};
```

### 1.5 Animation Duration Standards

| Animation Type | Duration | Easing | Usage |
|----------------|----------|--------|-------|
| Letter reveal | 0.8-1.2s | power4.out | Headline characters |
| Word reveal | 1.0-1.6s | power3.out | Headline words |
| Card reveal | 1.2-1.8s | power3.out | Feature cards, testimonials |
| Image reveal | 1.4-2.2s | power4.inOut | Clip-path reveals |
| Line draw | 0.6-1.4s | power2.inOut | Accent lines, dividers |
| Hover response | 0.3-0.5s | power2.out | Buttons, cards, links |
| Magnetic return | 0.5-0.8s | elastic.out(1, 0.5) | Buttons, titles |
| Scroll parallax | scrub | none | Image depth, text layers |
| Counter animation | 2.5-3.5s | power2.out | Statistics |

---

## PART 2: SECTION-BY-SECTION ACTION PLAN

### 2.1 HERO SECTION — "The Cinematic Entrance"

#### Current State
- 4-scene pinned scroll narrative
- Basic clip-path circle reveal on entrance
- Word-level stagger on headline
- Mouse-following spotlight (desktop)
- Magnetic CTA button
- Mobile: separated DOM elements, clean scroll narrative

#### Vision
The Hero should feel like opening a luxury magazine — the cover pulls you in, each page turn reveals more, and by the end you're compelled to continue.

#### Copy (Final)

```
Scene 1 — Entrance:
  Label: "Curated Materials & Design"
  Headline: "The Raw Select"
  Subtitle: "Where intention meets material — every selection elevated."
  Scroll CTA: "Scroll to explore"

Scene 2 — Collage:
  Headline: "Every material tells a story."
  Body: "We curate only those that speak with clarity, purpose, and enduring quality."

Scene 3 — Philosophy:
  Label: "Our Philosophy"
  Headline: "Design with intention."
  Body: "In an industry overwhelmed by endless choices, true quality comes from refined selection."
  Stats: "500+ Materials" | "120+ Projects" | "98% Retention"

Scene 4 — CTA:
  Headline: "Ready to specify with intent?"
  Subtitle: "Tell us about your project. We'll respond with a curated selection tailored to your brief."
  Button: "Start a Project"
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Replace circle clip-path with diagonal wipe reveal | `clip-path: polygon(0 100%, 100% 100%, 100% 0)` → `polygon(0 100%, 100% 100%, 100% 0, 0 0)` | HIGH |
| 2 | Add film grain overlay that intensifies during reveal | SVG noise filter, opacity 0 → 0.06 → 0.035 during entrance | HIGH |
| 3 | Split headline into individual letters with stagger | Wrap each letter in span, animate y + rotateX + opacity, stagger 0.04s | HIGH |
| 4 | Add horizontal accent line that draws from center | `scaleX: 0 → 1`, `transformOrigin: "center"`, then split into two lines | HIGH |
| 5 | Add vignette overlay during entrance | Radial gradient, opacity 0 → 0.3 during scene 1 | MEDIUM |
| 6 | Scene 2: staggered clip-path reveals from different directions | Image 1: left, Image 2: bottom, Image 3: right, stagger 0.1s | HIGH |
| 7 | Scene 2: parallax depth between images | Different scrub multipliers: 0.8, 1.0, 1.2 | HIGH |
| 8 | Scene 2: connector lines draw progressively | `scaleX: 0 → 1` with origin shifts | MEDIUM |
| 9 | Scene 2: floating accent shape with orbital motion | Circle that rotates 360° during scene, scale pulse | MEDIUM |
| 10 | Scene 2: exit fragmentation — images move in different directions | Image 1: x -20%, Image 2: y -15%, Image 3: x 20% | HIGH |
| 11 | Scene 3: background parallax zoom | Scale 1.15 → 1.0 during pin | HIGH |
| 12 | Scene 3: word-level stagger on "Design with intention." | Each word in overflow container, stagger 0.12s | HIGH |
| 13 | Scene 3: stats count-up with scrub | 0 → 500, 0 → 120, 0 → 98, linked to scroll position | HIGH |
| 14 | Scene 3: stat cards flip-in animation | rotateX 90 → 0, stagger 0.08s | MEDIUM |
| 15 | Scene 3: vertical accent line draws top to bottom | scaleY 0 → 1 during scene progress | MEDIUM |
| 16 | Scene 4: gradient sweep background | scaleX 0 → 1, color shift from left to right | HIGH |
| 17 | Scene 4: magnetic button with particle burst on hover | Follow cursor within 50px radius, elastic return | HIGH |
| 18 | Scene 4: pulse ring behind button | Expanding circle, opacity 0.3 → 0, repeat | MEDIUM |
| 19 | Add scroll velocity reactivity | Faster scroll = faster scene transitions | MEDIUM |
| 20 | Mobile: simplify animations, keep core narrative | Reduce particle count, simplify clip-paths | HIGH |

#### Animation Timeline (Desktop)

```
Scene 1 (0% - 20%):
  0.00: Diagonal wipe begins on background image
  0.05: Grain overlay intensifies
  0.08: Accent line draws from center
  0.10: Label "Curated Materials & Design" fades in
  0.12: Headline letters stagger in (y + rotateX)
  0.20: Subtitle blur-to-sharp reveal
  0.25: Scroll indicator fades in

Scene 1 → 2 Transition (20% - 40%):
  0.20: Headline letters stagger out (y -100)
  0.22: Label, subtitle, scroll fade out
  0.25: Background image clips to right 45%
  0.28: Image 1 enters from left (clip-path + blur)
  0.30: Image 2 enters from bottom (scale + blur)
  0.32: Image 3 enters from right (clip-path + blur)
  0.35: Connector lines draw
  0.38: Text "Every material tells a story" reveals

Scene 2 → 3 Transition (40% - 70%):
  0.42: Images shift to secondary positions
  0.45: Text fades out
  0.48: Background image reveals with clip-path
  0.50: Floating elements appear
  0.55: Label "Our Philosophy" fades in
  0.58: "Design with intention." words stagger in
  0.65: Body text reveals
  0.70: Stats count up
  0.75: Side image reveals

Scene 3 → 4 Transition (70% - 100%):
  0.78: Background clips away
  0.80: All content fades up and out
  0.85: Scene 4 background fades in
  0.88: Gradient sweep begins
  0.90: Accent line draws
  0.92: "Ready to specify with intent?" words stagger in
  0.96: Subtitle reveals
  0.98: CTA button appears with pulse ring
```

---

### 2.2 PHILOSOPHY SECTION — "The Manifesto"

#### Current State
- "Not more. Better." headline with word-level stagger
- Body text with blur-to-sharp reveal
- Quote block with parallax
- Two full-width images with clip-path reveals
- Stats with count-up animation
- Stat cards with hover states (desktop) / touch states (mobile)

#### Vision
This section should feel like reading a brand's founding document — each line matters, each stat is earned, each image is a testament.

#### Copy (Final)

```
Label: "Our Philosophy"
Headline Line 1: "Not more."
Headline Line 2: "Better."
Body: "In an industry overwhelmed by endless choices, true quality comes from refined selection — not abundance. Every material has been evaluated, tested, and approved by people who build for a living."
Quote: "Every selection is deliberate. Every outcome is elevated."
Quote Attribution: "— Raw Select"
Stats:
  "500+" Materials — Hand-selected
  "120+" Projects — Delivered
  "98%" Retention — Rate
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Pin headline while content scrolls past | `ScrollTrigger.create({ pin: true })` on headline container | HIGH |
| 2 | Add multi-line philosophy statement that reveals line by line | Each line in overflow container, stagger 0.15s on scroll | HIGH |
| 3 | Add left border accent that grows as lines are revealed | scaleY 0 → 1 linked to scroll progress | HIGH |
| 4 | Enhance stat count-up with easing and suffix animation | Count to 80% fast, slow down for last 20% | HIGH |
| 5 | Add hover state on stats — scale up with accent color shift | scale 1 → 1.05, color text → accent | MEDIUM |
| 6 | Add caption overlays on images that fade in on hover | Absolute positioned text, opacity 0 → 1 | MEDIUM |
| 7 | Add full-bleed image moment — one image extends edge-to-edge | Remove wrap padding, width 100vw | HIGH |
| 8 | Add section exit animation — fade + scale down | opacity 1 → 0, scale 1 → 0.95 | MEDIUM |
| 9 | Add horizontal line that draws across section during exit | scaleX 0 → 1 at section bottom | LOW |
| 10 | Mobile: enhance stat card swipe with momentum | Scroll velocity affects card transition speed | MEDIUM |

#### Animation Timeline

```
Entrance (top 60% - top 20%):
  0.00: Accent line draws from left
  0.08: "Our Philosophy" label words stagger in
  0.15: "Not more." slides up from overflow
  0.25: "Better." slides up with italic emphasis
  0.40: Body text blur-to-sharp reveal
  0.50: Quote block slides in from left
  0.55: Quote mark scales in with bounce

Scroll-linked (through section):
  0.00: First image clip-path reveal (circle expanding)
  0.30: Stats begin counting up
  0.50: Second image clip-path reveal (bottom wipe)
  0.70: Quote parallax begins (y: 0 → -60)

Exit (bottom 40% - bottom 0%):
  0.00: Content begins fading (opacity 1 → 0.3)
  0.50: Horizontal line draws across
  1.00: Section fully faded
```

---

### 2.3 MARQUEE SECTION — "The Energy Bridge"

#### Current State
- Dual-row scrolling text (desktop: GSAP, mobile: CSS animation)
- Scroll velocity reactivity on mobile
- Touch pause on mobile

#### Vision
The marquee should feel like a living, breathing element — not just scrolling text, but a kinetic sculpture that responds to the user.

#### Copy (Final)

```
Row 1 (forward):
  "Stone" • "Porcelain" • "Sintered Stone" • "Natural Slabs" • "Metals" • "Lacquers" • "Textures" • "Patinas" • "Modular Systems" • "Architectural Hardware" • "Integrated Components" • "Custom Solutions" • "Bespoke Materials"

Row 2 (reverse, mobile only):
  "Bespoke Materials" • "Custom Solutions" • "Integrated Components" • "Architectural Hardware" • "Modular Systems" • "Patinas" • "Textures" • "Lacquers" • "Metals" • "Natural Slabs" • "Sintered Stone" • "Porcelain" • "Stone"

Row 3 (desktop, slower):
  "Curated" • "Selected" • "Tested" • "Approved" • "Specified" • "Delivered" • "Installed" • "Elevated"
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add scroll velocity reactivity on desktop | `self.getVelocity()` affects animation speed | HIGH |
| 2 | Add opacity shift based on scroll velocity | text-20 → text-70 during fast scroll | MEDIUM |
| 3 | Add color shift based on scroll velocity | text-30 → accent during fast scroll | MEDIUM |
| 4 | Add word highlight on hover | Individual words change to accent color | HIGH |
| 5 | Add marquee pause on hover (desktop) | `animation-play-state: paused` | MEDIUM |
| 6 | Add gradient mask on left/right edges | `mask-image: linear-gradient()` for edge fade | HIGH |
| 7 | Add third row on desktop with different text | Slower speed, opposite direction | HIGH |
| 8 | Add separator dots that rotate and scale | Small circles between words, continuous rotation | MEDIUM |
| 9 | Add subtle glow behind marquee that pulses | Radial gradient, opacity pulse | LOW |
| 10 | Add slingshot acceleration during section exit | Marquee speeds up 2x before next section | MEDIUM |

---

### 2.4 DIFFERENCE SECTION — "The Four Pillars"

#### Current State
- 4 alternating feature cards with 3D tilt (desktop)
- Clip-path image reveals
- Number badges with scale + rotate animation
- Touch feedback on mobile

#### Vision
Each pillar should feel like a chapter in a book — distinct, but part of a cohesive narrative.

#### Copy (Final)

```
Label: "The Difference"
Headline Line 1: "We did the"
Headline Line 2: "hard work."
Intro: "Sourcing the right material shouldn't mean reviewing thousands of options. We act as a rigorous, opinionated filter — so you don't have to."

Card 01:
  Title: "Precision Curation"
  Body: "We don't carry everything. We carry the right things. Each product selected based on aesthetic merit, material integrity, and design relevance."

Card 02:
  Title: "Performance First"
  Body: "Beauty without performance is decoration. Every material meets exacting standards for durability, sustainability, and real-world application."

Card 03:
  Title: "Intentional Range"
  Body: "Our collection is intentionally limited. A tighter range means faster decisions, clearer direction, and better outcomes for every project."

Card 04:
  Title: "Built for Professionals"
  Body: "Raw Select was built by people who understand the specification process. We know what matters because we've been in your position."
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add 3D flip reveal on cards | rotateY 90 → 0, stagger 0.2s | HIGH |
| 2 | Add SVG icon draw animation for each card | `stroke-dasharray` + `stroke-dashoffset` animation | MEDIUM |
| 3 | Add vertical connecting line between cards | scaleY 0 → 1 as user scrolls through section | HIGH |
| 4 | Add moving dot that travels along connecting line | Absolute positioned dot, y linked to scroll progress | HIGH |
| 5 | Add scroll-linked opacity — active card fully opaque, others dimmed | opacity 1 for active, 0.5 for others | HIGH |
| 6 | Add magnetic hover on cards | Follow cursor within 30px radius | MEDIUM |
| 7 | Add gradient shift on card hover | Background gradient moves with cursor | MEDIUM |
| 8 | Add card border glow on hover | box-shadow with accent color | MEDIUM |
| 9 | Add exit animation — cards stack and collapse | translateY + scale down, stagger 0.1s | MEDIUM |
| 10 | Mobile: enhance tap feedback with ripple effect | Radial gradient scale from tap point | HIGH |

---

### 2.5 COLLECTION SECTION — "The Material Library"

#### Current State
- Horizontal pinned scroll with 4 cards
- Card reveals with scale + rotateY
- 3D tilt on hover (desktop)
- Touch feedback on mobile

#### Vision
This should feel like browsing a luxury material library — each sample is presented with care, and the horizontal scroll feels like walking down an aisle.

#### Copy (Final)

```
Label: "The Collection"
Headline: "Materials that speak."
Subtitle: "Each category is a deliberate edit — not a catalog."

Card 01:
  Tag: "01" | "120+ options"
  Title: "Surfaces"
  Desc: "Stone, porcelain, sintered stone, natural slabs — selected for visual depth and structural performance."

Card 02:
  Tag: "02" | "85+ options"
  Title: "Finishes"
  Desc: "Metals, lacquers, textures, patinas. The details that elevate a space from well-designed to unforgettable."

Card 03:
  Tag: "03" | "60+ options"
  Title: "Systems"
  Desc: "Modular solutions, architectural hardware, integrated components. Engineered for seamless specification."

Card 04:
  Tag: "04" | "Made to order"
  Title: "Bespoke"
  Desc: "When the standard isn't enough. Custom material solutions for projects that demand something no catalog provides."
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add clip-path circle reveal on section header | `clip-path: circle(0% → 100%)` | HIGH |
| 2 | Add counter that shows "1 of 4" and updates on scroll | Absolute positioned text, updates with ScrollTrigger | HIGH |
| 3 | Add image reveal on each card — bottom to top wipe | `clip-path: inset(100% 0 0 0 → 0 0 0 0)` | HIGH |
| 4 | Add material swatch preview on each card | Small color/texture rectangle, animates in | MEDIUM |
| 5 | Add parallax within horizontal scroll | Each card moves at slightly different speed | HIGH |
| 6 | Add progress bar at bottom that fills on scroll | scaleX 0 → 1 linked to scroll progress | HIGH |
| 7 | Add navigation dots that highlight active card | Dot indicators, active state changes | MEDIUM |
| 8 | Add depth effect — active card larger, others scaled down | scale 1.0 for active, 0.92 for others | HIGH |
| 9 | Add hover zoom on card images | scale 1.0 → 1.05 | MEDIUM |
| 10 | Add "view details" button that slides up on hover | translateY 100% → 0 | MEDIUM |
| 11 | Add exit animation — cards slide off in sequence | x translation, stagger 0.15s | MEDIUM |
| 12 | Add final full-screen image before transition | Single image fills viewport, then clips away | HIGH |

---

### 2.6 PROCESS SECTION — "The Journey"

#### Current State
- 4-step vertical timeline
- Timeline line draws progressively
- Step reveals with clip-path images
- Active step detection with dot pulse
- Touch feedback on mobile

#### Vision
The process should feel like a guided tour — each step is a stop on the journey, and the user is led through with clear visual cues.

#### Copy (Final)

```
Label: "The Process"
Headline Line 1: "Precision"
Headline Line 2: "in practice."
Subtitle: "Designed around how architects actually work — not how suppliers want to sell."

Step 01:
  Title: "Understand"
  Body: "We start with your vision. Project parameters, aesthetic direction, performance requirements. No generic recommendations — only what's relevant to your brief."

Step 02:
  Title: "Curate"
  Body: "Based on your needs, we assemble a focused shortlist. Every option is there for a reason — every material has already passed our filter."

Step 03:
  Title: "Support"
  Body: "Samples, technical data, specification support. We stay with you from concept through installation."

Step 04:
  Title: "Deliver"
  Body: "The right material, at the right time, to the right specification. No surprises. No substitutions."
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add pinned step moments — title stays while content scrolls | `ScrollTrigger.create({ pin: true })` per step | HIGH |
| 2 | Add step content split — title, description, image stagger | Each element reveals with 0.12s stagger | HIGH |
| 3 | Add connecting arrows between steps that draw progressively | SVG path animation, `stroke-dashoffset` | MEDIUM |
| 4 | Add hover state on steps — scale up with accent border | scale 1 → 1.02, border color shift | MEDIUM |
| 5 | Add "learn more" link that slides in on hover | translateY 20 → 0, opacity 0 → 1 | LOW |
| 6 | Add exit animation — timeline collapses | Line shrinks, steps fade, stagger 0.1s | MEDIUM |
| 7 | Add final accent mark that pulses before transition | Scale pulse on last step dot | LOW |
| 8 | Mobile: enhance step expand with smooth height animation | maxHeight 0 → auto with cubic-bezier | HIGH |
| 9 | Mobile: add chevron rotation on expand/collapse | rotate 0 → 180 with easing | MEDIUM |

---

### 2.7 TESTIMONIALS SECTION — "The Trust Builders"

#### Current State
- 3-column grid (desktop) / horizontal carousel (mobile)
- Quote mark animations
- Word-level stagger on quotes
- Author photo circle clip reveal
- Hover lift with shadow (desktop)
- Active card detection with dot indicators (mobile)

#### Vision
Testimonials should feel like personal recommendations — each one is a story, and together they build a wall of trust.

#### Copy (Final)

```
Label: "Testimonials"
Headline Line 1: "Trusted by"
Headline Line 2: "the best."

Testimonial 01:
  Quote: "Raw Select changed how we approach material specification. Their curation is ruthless in the best way — every option they presented was genuinely viable."
  Name: "Elena Voss"
  Role: "Principal, Voss Studio"

Testimonial 02:
  Quote: "We used to spend weeks reviewing material libraries. Now we spend hours. The quality of their shortlist is remarkable — it's like they already know what we're looking for."
  Name: "Marcus Chen"
  Role: "Design Director, Arcform"

Testimonial 03:
  Quote: "The level of technical support they provide is unlike any supplier we've worked with. They understand the specification process from the inside."
  Name: "Sarah Lindgren"
  Role: "Senior Architect, Studio Nord"
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add quote mark animation — scales in with bounce | scale 0 → 1, ease back.out(3) | HIGH |
| 2 | Add quote text reveal line by line | Each line in overflow container, stagger 0.08s | HIGH |
| 3 | Add author photo circle clip reveal | clip-path circle 0% → 100% | HIGH |
| 4 | Add author name and title stagger fade | opacity 0 → 1, stagger 0.1s | MEDIUM |
| 5 | Add parallax on testimonials — each moves at different speed | yPercent linked to scroll position | HIGH |
| 6 | Add background pattern that shifts with scroll | Subtle dots/lines, x translation | MEDIUM |
| 7 | Add rating stars animation — stars fill in sequentially | SVG stars, fill color animation | MEDIUM |
| 8 | Add hover state — lift with shadow | y -12, boxShadow increase | MEDIUM |
| 9 | Add exit animation — testimonials fade and stack | opacity 1 → 0, translateY 0 → -30 | MEDIUM |
| 10 | Add final trust statement before transition | "120+ projects delivered" fades in | LOW |

---

### 2.8 PROJECTS SECTION — "The Portfolio"

#### Current State
- Hero image with clip-path circle reveal
- Grid cards with alternating clip-path reveals
- 3D tilt on hover (desktop)
- Banner with clip-path reveal
- Bottom images with staggered reveals
- Image zoom modal

#### Vision
Projects should feel like an art gallery — each project is a masterpiece, presented with care and context.

#### Copy (Final)

```
Label: "Selected Projects"
Headline Line 1: "Where vision"
Headline Line 2: "meets material."
Subtitle: "A selection of projects specified with Raw Select materials. Each one a testament to intentional curation."

Project 01:
  Title: "Meridian Residence"
  Location: "Copenhagen, Denmark"
  Year: "2025"
  Type: "Residential"

Project 02:
  Title: "Atelier Noir"
  Location: "Melbourne, Australia"
  Year: "2025"
  Type: "Commercial"

Project 03:
  Title: "The Glass Pavilion"
  Location: "Oslo, Norway"
  Year: "2024"
  Type: "Residential"

Project 04:
  Title: "Nordic Spa House"
  Location: "Stockholm, Sweden"
  Year: "2024"
  Type: "Hospitality"

Project 05:
  Title: "Urban Loft Conversion"
  Location: "Berlin, Germany"
  Year: "2024"
  Type: "Residential"

Project 06:
  Title: "Coastal Retreat"
  Location: "Sydney, Australia"
  Year: "2023"
  Type: "Residential"

Banner:
  Label: "FEATURED PROJECT"
  Title: "Nordic Spa House"
  Location: "Stockholm, Sweden — 2024"
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add cinematic hero image reveal — left to right wipe | clip-path inset(0 100% 0 0 → 0 0 0 0) | HIGH |
| 2 | Add project title overlay that slides up from bottom | translateY 100% → 0 | HIGH |
| 3 | Add project counter ("Project 1 of 6") that animates in | scale 0 → 1, opacity 0 → 1 | MEDIUM |
| 4 | Add staggered grid card reveals | Each card enters with 0.15s delay | HIGH |
| 5 | Add card image zoom on hover | scale 1.0 → 1.05 | MEDIUM |
| 6 | Add card title word split on hover | Words stagger with y + opacity | MEDIUM |
| 7 | Add category tag that slides in on hover | translateX -20 → 0 | MEDIUM |
| 8 | Add banner parallax background | Image moves slower than text | HIGH |
| 9 | Add banner text clip-path reveal | Horizontal wipe | HIGH |
| 10 | Add CTA button on banner with magnetic hover | Follow cursor, elastic return | MEDIUM |
| 11 | Add bottom images staggered clip-path reveals | Different directions for each | HIGH |
| 12 | Add bottom images parallax | Each moves at different speed | MEDIUM |
| 13 | Add exit animation — images fade and scale down | opacity 1 → 0, scale 1 → 0.95 | MEDIUM |

---

### 2.9 CTA SECTION — "The Climax"

#### Current State
- Centered text with word-level stagger
- Magnetic button with elastic return
- Side images with clip-path reveals
- Bottom images with staggered reveals
- Floating particles

#### Vision
The CTA should feel like the climax of a story — everything has led to this moment, and the user is compelled to act.

#### Copy (Final)

```
Label: "Get Started"
Headline Line 1: "Ready"
Headline Line 2: "to"
Headline Line 3: "specify?"
Subtitle: "Tell us about your project. We'll respond with a curated material selection tailored to your brief."
Button: "Start a Project"
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add gradient animation on background | Color shifts during scroll | HIGH |
| 2 | Add subtle pattern overlay that shifts with scroll | Dots/lines, parallax movement | MEDIUM |
| 3 | Add vignette effect that intensifies during pin | Radial gradient, opacity increase | MEDIUM |
| 4 | Add staggered slide-up on headline lines | Each line in overflow container | HIGH |
| 5 | Add typewriter effect on subtitle | Characters appear one by one | MEDIUM |
| 6 | Add magnetic button with larger radius | Follow cursor within 80px | HIGH |
| 7 | Add elastic hover on button | Scale bounce with shadow shift | HIGH |
| 8 | Add pulse ring behind button | Expanding circle, repeat | HIGH |
| 9 | Add particle burst on button hover | Small dots radiate outward | MEDIUM |
| 10 | Add side image parallax | Different speeds for each | HIGH |
| 11 | Add side image clip-path reveals | Different directions | HIGH |
| 12 | Add exit animation — content fades and scales up | opacity 1 → 0, scale 1 → 1.05 | MEDIUM |

---

### 2.10 FOOTER SECTION — "The Final Impression"

#### Current State
- Brand letters "RAW SELECT" with staggered reveal
- Navigation columns with link hover states
- Social icons with scale on hover
- Mobile accordions with staggered content reveal
- Back to top button

#### Vision
The footer should feel like the back cover of a book — a final, lasting impression that reinforces the brand.

#### Copy (Final)

```
Brand: "RAW SELECT"
Tagline: "Curated materials for architects and designers who refuse to compromise."

Navigate:
  Home | About | Collection | Process | Projects | Contact

Contact:
  hello@rawselect.com
  +45 12 34 56 78
  Copenhagen, Denmark

Follow:
  Instagram | LinkedIn | Pinterest

Legal:
  Privacy Policy | Terms of Use | Cookie Settings

Copyright: "© 2026 Raw Select. All rights reserved."
Back to top: "Back to top"
```

#### Action Items

| # | Action | Technical Details | Priority |
|---|--------|-------------------|----------|
| 1 | Add brand letters hover state — scale up with accent color | scale 1 → 1.1, color text → accent | HIGH |
| 2 | Add nav link hover underline animation | Line draws from left to right | HIGH |
| 3 | Add back to top button that slides in from bottom | translateY 100% → 0 when footer visible | HIGH |
| 4 | Add contact info stagger reveal | Each line fades in with 0.08s delay | MEDIUM |
| 5 | Add email hover state — accent color with underline | color shift, text-decoration | MEDIUM |
| 6 | Add social icon hover — scale up with accent color | scale 1 → 1.2, color shift | MEDIUM |
| 7 | Add social icon tooltip on hover | Platform name appears above icon | LOW |
| 8 | Add accordion chevron rotation on mobile | rotate 0 → 180 with easing | HIGH |
| 9 | Add footer reveal animation — horizontal wipe | clip-path inset(0 0 100% 0 → 0 0 0 0) | HIGH |
| 10 | Add final brand mark that pulses at end | Scale pulse on last element | LOW |

---

## PART 3: GLOBAL ENHANCEMENTS

### 3.1 Page-Level Scroll Narrative

| # | Enhancement | Technical Details |
|---|-------------|-------------------|
| 1 | Scroll progress indicator | Thin line at top, scaleX linked to scroll progress |
| 2 | Section markers on side | Dots/labels that highlight current section |
| 3 | Transition animations between sections | Morphs, wipes, or fades between section boundaries |
| 4 | Scroll story mode (optional) | Guided scroll experience with auto-advance |

### 3.2 Performance Optimizations

| # | Optimization | Implementation |
|---|--------------|----------------|
| 1 | `will-change` management | Add to animated elements, remove after animation |
| 2 | `requestAnimationFrame` for custom animations | Wrap all custom animation logic |
| 3 | Pause animations when off-screen | IntersectionObserver to pause/resume |
| 4 | `prefers-reduced-motion` support | Disable non-essential animations |
| 5 | Image loading optimization | `loading="lazy"`, `decoding="async"` |
| 6 | CSS `contain` for animated containers | `contain: layout style paint` |

### 3.3 Accessibility

| # | Enhancement | Implementation |
|---|-------------|----------------|
| 1 | `aria-label` on interactive elements | All buttons, links, cards |
| 2 | `role="progressbar"` on scroll indicator | Semantic markup |
| 3 | `prefers-reduced-motion` | Already implemented, enhance coverage |
| 4 | Keyboard navigation | Tab order, focus states |
| 5 | Color contrast | WCAG 2.1 AA compliance |

### 3.4 Micro-Interactions

| # | Interaction | Implementation |
|---|-------------|----------------|
| 1 | Magnetic elements | Buttons, links, cards follow cursor |
| 2 | Ripple effects on click/tap | Radial gradient from tap point |
| 3 | Hover states on all interactive elements | Scale, color, shadow changes |
| 4 | Focus states for keyboard navigation | Outline, color shift |
| 5 | Loading states for async operations | Spinner, skeleton screens |

---

## PART 4: IMPLEMENTATION PHASES

### Phase 1: Foundation (Week 1)
- [ ] Add scroll progress indicator to Nav
- [ ] Add section markers (optional, side dots)
- [ ] Enhance `prefers-reduced-motion` coverage
- [ ] Add `will-change` to all animated elements
- [ ] Optimize image loading with lazy/async
- [ ] Add CSS `contain` to animated containers

### Phase 2: Hero Overhaul (Week 2)
- [ ] Scene 1: Diagonal wipe reveal, grain, letter split
- [ ] Scene 2: Staggered clip-path, parallax, fragmentation exit
- [ ] Scene 3: Parallax zoom, word stagger, stat count-up
- [ ] Scene 4: Gradient sweep, magnetic button, pulse ring
- [ ] Mobile simplifications

### Phase 3: Philosophy + Marquee (Week 3)
- [ ] Philosophy: Pin headline, multi-line statement, stat enhancements
- [ ] Philosophy: Full-bleed image, exit animation
- [ ] Marquee: Velocity reactivity, word highlight, gradient mask
- [ ] Marquee: Third row, separator dots, slingshot exit

### Phase 4: Difference + Collection (Week 4)
- [ ] Difference: 3D flip reveals, connecting line, moving dot
- [ ] Difference: Scroll-linked opacity, magnetic hover, exit animation
- [ ] Collection: Header reveal, counter, card image reveals
- [ ] Collection: Progress bar, navigation dots, depth effect
- [ ] Collection: Exit animation, full-screen image transition

### Phase 5: Process + Testimonials (Week 5)
- [ ] Process: Pinned steps, content split, connecting arrows
- [ ] Process: Hover states, exit animation, mobile enhancements
- [ ] Testimonials: Quote reveals, author photo reveals, parallax
- [ ] Testimonials: Background pattern, hover states, exit animation

### Phase 6: Projects + CTA + Footer (Week 6)
- [ ] Projects: Hero reveal, grid enhancements, banner parallax
- [ ] Projects: Bottom images, exit animation
- [ ] CTA: Gradient background, typewriter subtitle, magnetic button
- [ ] CTA: Pulse ring, particle burst, side image parallax
- [ ] Footer: Brand hover, link underlines, back to top
- [ ] Footer: Social enhancements, accordion improvements, reveal animation

### Phase 7: Polish + Testing (Week 7)
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile testing (iOS Safari, Chrome Android)
- [ ] Performance testing (Lighthouse, WebPageTest)
- [ ] Accessibility testing (axe, Wave)
- [ ] User testing (5+ users, observe scroll behavior)
- [ ] Bug fixes and final polish

---

## PART 5: TECHNICAL SPECIFICATIONS

### 5.1 GSAP Configuration

```javascript
// Global GSAP defaults
gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  scrub: 1.2,
  anticipatePin: 1,
});

// MatchMedia breakpoints
const mm = gsap.matchMedia();
mm.add("(min-width: 1024px)", () => { /* desktop */ });
mm.add("(max-width: 1023px)", () => { /* mobile */ });
```

### 5.2 CSS Custom Properties

```css
:root {
  /* Animation timing */
  --anim-fast: 0.3s;
  --anim-medium: 0.6s;
  --anim-slow: 1.2s;
  --anim-slower: 2s;

  /* Animation easing */
  --ease-entrance: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.55, 0, 1, 0.45);
  --ease-hover: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-scroll: linear;

  /* Spacing */
  --section-pad: clamp(6rem, 12vw, 12rem);
  --section-pad-lg: clamp(8rem, 16vw, 16rem);
  --wrap-padding: clamp(1.5rem, 5vw, 6rem);
}
```

### 5.3 Component Architecture

```
src/
├── components/
│   ├── Hero.tsx           # 4-scene pinned scroll
│   ├── Philosophy.tsx     # Manifesto + stats + images
│   ├── Marquee.tsx        # Kinetic text bridge
│   ├── Difference.tsx     # Four pillars
│   ├── Collection.tsx     # Horizontal scroll gallery
│   ├── Process.tsx        # Vertical timeline
│   ├── Testimonials.tsx   # Trust grid
│   ├── Projects.tsx       # Portfolio gallery
│   ├── Cta.tsx            # Climax section
│   └── Footer.tsx         # Final impression
├── hooks/
│   └── useIsMobile.ts     # Breakpoint detection
└── lib/
    └── animations.ts      # Shared animation utilities
```

### 5.4 Shared Animation Utilities (NEW)

```typescript
// src/lib/animations.ts

export const splitText = (text: string, className: string = "") => {
  return text.split(" ").map((word, i) => (
    <span key={i} className={`${className} inline-block mr-[0.3em]`}>
      {word}
    </span>
  ));
};

export const splitLetters = (text: string, className: string = "") => {
  return text.split("").map((letter, i) => (
    <span key={i} className={`${className} inline-block`}>
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));
};

export const animateCounter = (
  element: HTMLElement,
  target: number,
  suffix: string = "",
  duration: number = 2.5
) => {
  gsap.to({ v: 0 }, {
    v: target,
    duration,
    ease: "power2.out",
    onUpdate: function () {
      element.textContent = Math.round(this.targets()[0].v) + suffix;
    },
  });
};

export const magneticElement = (
  element: HTMLElement,
  radius: number = 50,
  strength: number = 0.3
) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    if (distance < radius) {
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  });
  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
    });
  });
};
```

---

## PART 6: SUCCESS METRICS

### 6.1 Performance
- [ ] Lighthouse Performance Score: 90+
- [ ] First Contentful Paint: < 1.5s
- [ ] Time to Interactive: < 3s
- [ ] Cumulative Layout Shift: < 0.1
- [ ] Animation Frame Rate: 60fps

### 6.2 Engagement
- [ ] Scroll Depth: 80%+ users reach CTA
- [ ] Time on Page: 2+ minutes average
- [ ] CTA Click Rate: 5%+ of visitors
- [ ] Bounce Rate: < 40%

### 6.3 Accessibility
- [ ] WCAG 2.1 AA: 100% compliance
- [ ] Keyboard Navigation: Full support
- [ ] Screen Reader: Full support
- [ ] Reduced Motion: Full support

---

## PART 7: DESIGN REFERENCES

### 7.1 Premium Web Experiences
- **Apple** — Product pages with scroll-driven narratives
- **Stripe** — Clean, minimal, with subtle animations
- **Linear** — Magnetic interactions, elastic easing
- **Vercel** — Dark mode, performance-focused

### 7.2 Architecture & Interior Design Sites
- **Norman Foster** — Editorial layouts, full-bleed imagery
- **Studio McGee** — Warm, inviting, material-focused
- **ArchDaily** — Gallery-like project presentations

### 7.3 Animation Inspiration
- **GSAP Showcase** — Scroll-driven animation examples
- **CodePen** — Creative animation experiments
- **Dribbble** — UI/UX animation concepts

---

> **This is the master plan.** Every checkbox is a specific, actionable improvement. Execute in phases. Test after each phase. Polish relentlessly.
