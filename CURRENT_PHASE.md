# CURRENT PHASE — Hero Overhaul

> Start here every session. DO NOT skip reading this file.

## Phase Status
- [x] Phase 1: Foundation — VERIFY completeness then mark done
- [x] **Phase 2: Hero Overhaul — COMPLETE**
- [x] **Phase 3: Philosophy + Marquee — COMPLETE**
- [ ] **Phase 4: Difference + Collection — CURRENT**
- [ ] Phase 5: Process + Testimonials
- [ ] Phase 6: Projects + CTA + Footer
- [ ] Phase 7: Polish + Testing

---

## Phase 2: Hero Overhaul — Action Items

### File: `src/components/Hero.tsx`

Reference: MASTER_ACTION_PLAN.md §2.1

**Scene 1: Entrance**
- [x] 1. Replace circle clip-path with **diagonal wipe reveal** (`clip-path: polygon(0 100%, 100% 100%, 100% 0)` → `polygon(0 0, 100% 0, 100% 0, 0 0)`)
- [x] 2. Add **film grain overlay** that intensifies during reveal (SVG noise filter, opacity 0 → 0.06 → 0.035)
- [x] 3. Split headline into individual letters with stagger (y + rotateX + opacity, stagger 0.04s)
- [x] 4. Add horizontal accent line that draws from center (`scaleX: 0 → 1`, `transformOrigin: "center"`)
- [x] 5. Add vignette overlay during entrance (radial gradient, opacity 0 → 0.3)

**Scene 2: Collage**
- [x] 6. Staggered clip-path reveals from different directions (Image 1: left, Image 2: bottom, Image 3: right)
- [x] 7. Parallax depth between images (different scrub multipliers: 0.8, 1.0, 1.2)
- [x] 8. Connector lines draw progressively between images
- [x] 9. Floating accent shape with orbital motion (circle rotates 360°, scale pulse)
- [x] 10. **Exit fragmentation** — images move in different directions (Image 1: x -20%, Image 2: y -15%, Image 3: x 20%)

**Scene 3: Philosophy**
- [x] 11. Background parallax zoom (scale 1.15 → 1.0 during pin)
- [x] 12. Word-level stagger on "Design with intention." (each word in overflow container, stagger 0.06s)
- [x] 13. **Stats count-up with scrub** (0 → 500, 0 → 120, 0 → 98, linked to scroll position)
- [x] 14. Stat cards flip-in animation (rotateX 90 → 0, stagger 0.06s)
- [x] 15. Vertical accent line draws top to bottom (scaleY 0 → 1 during scene)

**Scene 4: CTA**
- [x] 16. Gradient sweep background (scaleX 0 → 1, color shift left to right)
- [x] 17. **Magnetic button** with particle burst on hover (follow cursor 50px radius, elastic return)
- [x] 18. Pulse ring behind button (expanding circle, opacity 0.3 → 0, repeat)

**Cross-scene**
- [x] 19. Add scroll velocity reactivity (faster scroll = faster scene transitions)
- [x] 20. Mobile: simplify animations, keep core narrative

### Verification
After editing Hero.tsx:
- [x] 1. Build passes (`pnpm run build`)
- [x] 2. Each checked item is verifiable in code
- [x] 3. Desktop: all 4 scenes play correctly with scrub
- [x] 4. Mobile: matchMedia reduces complexity

---

## Phase 3: Philosophy + Marquee (CURRENT)

### File: `src/components/Philosophy.tsx`

Reference: MASTER_ACTION_PLAN.md §2.2

**Pin + Line Reveal**
- [x] 1. Pin headline ("Not more. Better.") while body content scrolls past (ScrollTrigger pin, start: "top 15%", end: scroll area bottom + 15%)
- [x] 2. Split body into multi-line philosophy statement, each line in overflow container, stagger 0.15s on scroll
- [x] 3. Left border accent that grows as lines are revealed (scaleY 0 → 1, linked to scroll progress)

**Stats**
- [x] 4. Enhanced stat count-up with two-phase easing (0→80% fast, 80%→100% slow)
- [x] 5. Stat card hover — scale 1→1.05, color text→accent (EXISTING — verified)

**Images**
- [x] 6. Caption overlays on images that fade in on hover (opacity 0→1, y 10→0, ease power2.out)
- [x] 7. Full-bleed image moment — one image extends edge-to-edge (width 100vw, out of wrap)

**Exit**
- [x] 8. Section exit — scale down added (opacity 1→0.3, scale 1→0.95, y 0→-40)
- [x] 9. Horizontal line draws across section during exit (scaleX 0→1 at section bottom)

**Mobile**
- [x] 10. Stat card swipe with scroll snap momentum (debounced snap-to-card on scroll end)

### File: `src/components/Marquee.tsx`

Reference: MASTER_ACTION_PLAN.md §2.3

**Already implemented (verify):**
- [x] 1. Scroll velocity reactivity on desktop (self.getVelocity() affects speed)
- [x] 2. Opacity shift based on scroll velocity (text-20 → text-70)
- [x] 3. Color shift based on scroll velocity (text-30 → accent)
- [x] 4. Word highlight on hover (accent color, scale 1.05)
- [x] 5. Gradient mask on left/right edges (mask-image: linear-gradient)
- [x] 6. Third row on desktop with slower speed

**New additions:**
- [x] 7. Marquee pause on hover (desktop) — tween.pause()/resume()
- [x] 8. Separator dots continuous rotate and scale (rotation 360°, scale pulse)
- [x] 9. Glow behind marquee that pulses (radial gradient, opacity 0.3→0.6, scale pulse)
- [x] 10. Slingshot acceleration during section exit (timeScale 1x→3x, "bottom 30%"→"bottom top")

---

## Phase 4: Difference + Collection (next+)

### File: `src/components/Difference.tsx`
- Vertical connecting line between cards with moving dot
- Scroll-linked opacity (active card highlighted)
- Magnetic hover on cards
- Exit animation — cards stack and collapse

### File: `src/components/Collection.tsx`
- Counter "1 of 4" that updates on scroll
- Material swatch preview on each card
- Parallax within horizontal scroll
- Progress bar at bottom
- Depth effect — active card larger, others scaled down
- Exit animation — cards slide off in sequence

---

## Phase 5: Process + Testimonials (next+)

### File: `src/components/Process.tsx`
- Pinned step moments — title stays while content scrolls
- Connecting arrows between steps
- Exit animation — timeline collapses

### File: `src/components/Testimonials.tsx`
- Parallax per testimonial
- Background pattern shifts with scroll
- Exit animation — testimonials fade and stack

---

## Phase 6: Projects + CTA + Footer (next+)

### File: `src/components/Projects.tsx`
- Project counter "Project 1 of 6"
- Card image zoom on hover
- Banner CTA with magnetic hover

### File: `src/components/Cta.tsx`
- Gradient animation on background
- Vignette effect intensifies during pin
- Pulse ring behind button
- Particle burst on button hover

### File: `src/components/Footer.tsx`
- Nav link hover underline animation
- Social icon tooltip on hover
- Footer reveal animation — horizontal wipe
- Final brand mark that pulses at end
