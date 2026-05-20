# Cinematic Director — The Raw Experience

## Vision
The Raw Select website is a **material experience**, not a UI. Every scroll should feel like walking through a gallery of raw materials — tactile, deliberate, elevated. The user is not browsing; they are _experiencing_ materiality.

---

## 1. Hero — "The Arrival"

### Feeling
Walking into a dimly lit gallery. A single piece is illuminated. You approach it.

### Scene 1: Entrance (0s–2s after page load)
- **Before animation**: Full black. Nothing visible.
- **0.0s**: A diagonal light sweeps across from bottom-left, revealing a raw stone surface. The light is textured — film grain overlays the reveal like dust particles catching light.
- **0.3s**: A horizontal accent line draws from center — like a spotlight beam stabilizing.
- **0.5s**: The headline letters tumble in from below, each one rotating slightly like physical letterpress blocks being set. "The" and "Raw" appear first, then "Select" in italic accent — like a signature being written.
- **0.8s**: The label fades in — quiet, authoritative.
- **1.2s**: Stats materialize at the bottom — like museum plaque text appearing.
- **1.5s**: A subtle vignette deepens the corners — you're inside the gallery.

**GSAP behavior**: Standalone timeline, `delay: 0.3`, no scrollTrigger. This plays ONCE on load. The user hasn't scrolled yet — this is the handshake.

### Scene 2: Scroll-Reveal (0–25% of scroll distance)
As the user scrolls down, the entrance elements exit upward (letters scatter out). The main image slides to the left half of the screen.

### Scene 3: Collage (25–40%)
Three images appear from three directions — left, bottom, right — like opening cabinet doors to reveal material samples. A floating circle orbits gracefully between them like a magnifying glass examining grains. Connector lines draw between images — like annotations connecting material samples.

**Parallax depth**: Each image moves at a different speed during scroll (15, 25, 35px offset). The user feels depth — like looking at samples on different shelves.

### Scene 4: Fragmentation Exit (40–44%)
The images scatter in different directions — left image slides further left, center image rises, right image slides right. Like closing the sample cabinet.

### Scene 5: Philosophy Reveal (44–75%)
A new material surface zooms in dramatically (scale 1.2 → 1.0) — like pulling back from a macro photograph to reveal the full texture. A vertical accent line draws like a plumb line. The words "Design with intention." appear word by word — deliberate, sequential, like a craftsman reading their manifesto.

Stats count up as the user scrolls — the numbers don't just appear, they _earn_ themselves. Stat cards flip in like physical cards being placed on a table.

### Scene 6: CTA (75–100%)
The background bleeds into a warm gradient — like the gallery lights shifting for the exit. "Ready to specify with intent?" — each line appears with purpose. A button pulses with a ring, like a invitation. When hovered, the button attracts the cursor magnetically and bursts particles — like touching a raw stone and releasing mineral dust.

### GSAR Behavior Summary
```
Scroll 0% (top):     Scene 1 fully visible, entrance complete
Scroll 0-25%:        Scene 1 → Scene 2 transition (letters exit, main image shifts)
Scroll 25-40%:       Scene 2 collage active (3 images, orbits, connectors)
Scroll 40-44%:       Scene 2 → Scene 3 transition (images fragment out)
Scroll 44-75%:       Scene 3 philosophy (parallax zoom, words stagger, stats count)
Scroll 75-100%:      Scene 4 CTA (gradient sweep, button pulse)
```

---

## 2. Philosophy — "The Manifesto"

### Feeling
You've entered a quiet reading room. The walls are lined with material samples. A single document is pinned to the wall — the brand's founding philosophy.

### Layout
- **Left column**: "Our Philosophy" label acts as a chapter header.
- **Right column**: The manifesto text scrolls beneath a pinned headline.

### Pin Behavior
The headline "Not more. Better." pins at 15% from viewport top while the body text scrolls past. This creates the feeling of a fixed thesis — the headline is the unwavering truth, and the body text explains it beneath.

### Line-by-Line Reveal
Each line of the body text reveals with a stagger as the user scrolls:
```
┌─ In an industry overwhelmed by endless choices,          ← reveals at 0%
│  true quality comes from refined selection —              ← reveals at 15%
│  not abundance. Every material has been                   ← reveals at 30%
│  evaluated, tested, and approved by people                ← reveals at 45%
│  who build for a living.                                  ← reveals at 60%
└─ [Left border accent line grows as each line appears]
```

The left border accent grows from top to bottom alongside the line reveals — like a highlighter marking each line as it's read.

### After Lines
A quote block slides in from the left with the quote mark bouncing in. The quote attribution appears quietly.

### Images
- **Image 1 (in wrap)**: A circular clip-path expands to reveal a material close-up. Caption overlay fades on hover: "Hand-selected materials."
- **Image 2 (full-bleed)**: Spans edge-to-edge — the hero material shot dominating the viewport. Bottom wipe clip-path reveal.

### Stats
Three stat cards flip in (rotationX 90 → 0) as they enter view. Each number counts up:
- 500+ Materials — "Hand-selected"
- 120+ Projects — "Delivered"
- 98% Retention — "Rate"

Count-up is two-phase: 0→80% of target fast, then 80%→100% slow (feels earned).

### Exit
As the section scrolls out, content fades to 30% opacity, scales down to 0.95, and a horizontal line draws across as a "chapter end" marker.

### Mobile
Stat cards are swipeable with momentum snap. One card visible at a time, dots indicate position.

---

## 3. Marquee — "The Energy Bridge"

### Feeling
A kinetic sculpture. Material names flow past like conveyor belts in a workshop. The section breathes energy between the quiet philosophy and the structured difference section.

### Layout
Three rows of scrolling text, each at different speeds:
1. **Row 1** (fast, forward): Main material names — "Stone • Porcelain • Sintered Stone..."
2. **Row 2** (medium, reverse): Process words — "Curated • Selected • Tested..."
3. **Row 3** (slow, forward): Values — "Precision • Intention • Quality..."

### Interaction
- **Hover on any word**: Highlights accent color and scales up — like touching a physical tag in a library.
- **Hover anywhere**: All rows pause — the conveyor belt stops when you look closely.
- **Scroll velocity**: Fast scroll = brighter text, slower scroll = dimmer. The marquee responds to the user's energy.

### Separator Dots
The dots between words continuously rotate and pulse — like spinning gears in a clockwork mechanism.

### Glow
A radial gradient behind the marquee pulses gently — like warm workshop lighting.

### Exit (Slingshot)
As the section scrolls out, the marquee rows speed up 2-3x — like a spring releasing. Energy accumulates and then launches into the next section.

---

## 4. Difference — "The Comparison"

### Feeling
Side-by-side material comparison. A vertical timeline connects three decision points. The user is weighing options like a specifier.

### Layout
Three cards arranged vertically or in a stepped layout. A vertical line runs through the center with a moving dot indicating the active card.

### Animation
- **Scroll-linked opacity**: The card nearest to center of viewport is most opaque (active). Cards above/below fade to 30%.
- **Connecting line**: A vertical line draws between cards with a moving circle dot — like a progress indicator.
- **Magnetic hover**: Cards slightly attract cursor on hover — like physically reaching for a sample.
- **Exit**: Cards stack vertically and collapse — like closing a comparison chart.

---

## 5. Collection — "The Catalog"

### Feeling
Browsing a material catalog. Four products presented in a horizontal scroll — like flipping through swatch cards.

### Counter
"1 of 4" updates as the user scrolls — creates anticipation and shows progress.

### Animation
- **Each card**: Parallax between image and text (different speeds).
- **Active card**: Larger, others scaled down — depth effect.
- **Swatch preview**: Small color/material swatch on each card.
- **Progress bar**: Thin bar at bottom fills as user scrolls through the collection.
- **Exit**: Cards slide off in sequence, like flipping catalog pages away.

---

## 6. Process — "The Workflow"

### Feeling
A workshop manual. Step-by-step breakdown of how materials are selected and specified.

### Pinned Steps
The section title pins at the top while each step scrolls past. Each step has:
- A number (1, 2, 3, 4)
- A title
- A description
- An image

### Animation
- **Connecting arrows**: SVG arrows between steps that draw progressively.
- **Active step**: Expands slightly, image scales up.
- **Exit**: The entire timeline collapses vertically — like closing an accordion folder.

---

## 7. Testimonials — "The Voices"

### Feeling
Quotes from architects and designers. Each testimonial feels like a handwritten note pinned to a mood board.

### Animation
- **Parallax per card**: Each testimonial moves at a different speed.
- **Background shift**: A subtle pattern/texture shifts as the user scrolls.
- **Exit**: Testimonials stack and fade — like notes being gathered up.

---

## 8. Projects — "The Portfolio"

### Feeling
A portfolio review. Six projects displayed with counter and zoom. The user is flipping through a case study binder.

### Counter
"Project 1 of 6" — like turning pages in a book.

### Animation
- **Card image zoom**: Image zooms subtly on hover — like leaning in for a closer look.
- **Banner CTA**: Magnetic hover on the bottom banner button.

---

## 9. CTA — "The Invitation"

### Feeling
The gallery exit. Lighting shifts, a final invitation appears.

### Animation
- **Gradient background**: Animates continuously — like gallery lights transitioning.
- **Vignette**: Intensifies during pin — focus narrows to the button.
- **Pulse ring**: Behind the button like a heartbeat.
- **Particle burst**: On hover — like disturbing mineral dust.

---

## 10. Footer — "The Colophon"

### Feeling
End of the experience. Clean, minimal, like the final credits.

### Animation
- **Nav link hover**: Underline draws from center.
- **Social icons**: Tooltip appears on hover.
- **Footer reveal**: Horizontal wipe — like a curtain closing.
- **Final brand mark**: Pulses gently — the heart of the brand, still beating.

---

## GSAP Behavior — Global Principles

### Scroll Velocity
Every section should react to scroll speed:
- **Fast scroll**: Animations speed up, opacity increases, movement is more dramatic
- **Slow scroll**: Slow, deliberate reveals, the user controls the pace
- **NEVER** modify timeline `timeScale` — modulates visual properties instead

### Scene Transitions
Every scene transition has three phases:
1. **Current scene exit**: Elements move out (up, down, scale, opacity)
2. **Transition moment**: Brief content or visual bridge
3. **Next scene entrance**: Elements move in

### The Golden Rule of Cinematic Scroll
**The user should never feel like they're waiting for an animation to finish, nor should they feel like they missed something because they scrolled too fast.** The scrub ensures the animation is always in sync with scroll position. The entrance timeline ensures first impressions happen immediately.

### Exit Animations
Every section MUST have an exit animation:
- Content fades to 30% opacity
- Content scales down to 0.95
- A horizontal divider line draws across
- The next section pulls up from below

### Visual Consistency
- **Durations**: Keep similar across sections (0.08–0.15s per scene element)
- **Easing**: `power4.out` for dramatic, `power2.out` for subtle
- **Staggers**: 0.04–0.06s for letters, 0.12–0.15s for lines, 0.06–0.08s for cards
- **Clip-paths**: `inset()` for directional wipes, `polygon()` for diagonal reveals
- **Parallax**: Use `yPercent` not `y` for percentage-based movement
