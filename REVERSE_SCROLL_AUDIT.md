# Reverse Scroll Animation Audit

> **What is reverse scroll?** When a user scrolls DOWN the page, animations play forward. When they scroll BACK UP, animations should play in reverse — elements should un-animate, fade back out, slide back to their starting positions, etc.

> **Current status:** Many animations play forward correctly but do NOT reverse when scrolling back up. This is because they use one-shot triggers (`start: "top 60%"` with no `end` and no `scrub`) instead of scroll-linked timelines.

---

## How GSAP Reverse Scroll Works

| Config | Reverses on scroll up? |
|--------|----------------------|
| `scrollTrigger: { start: "top 60%" }` (no end, no scrub) | **NO** — fires once, never reverses |
| `scrollTrigger: { start: "top 60%", end: "top 15%", scrub: true }` | **YES** — linked to scroll position |
| `scrollTrigger: { start: "top 60%", end: "top 15%", scrub: 1.5 }` | **YES** — with smoothing |
| `gsap.to(...)` with `repeat: -1, yoyo: true` | **N/A** — continuous loop, not scroll-linked |

---

## Issues by File

### 1. Hero.tsx

#### Issue 1.1: Entrance animations never reverse
- **Lines 75-100**: `entranceTl` uses `delay: 2.4` (time-based, not scroll-based)
- **Current behavior**: Plays once on page load, never reverses
- **Impact**: When scrolling back up to hero, the entrance animation stays in its final state
- **Fix**: This is intentional — entrance animations should NOT reverse. They are a one-time preloader sequence.
- **Verdict**: ✅ No fix needed

#### Issue 1.2: Desktop pinned timeline reverses correctly
- **Lines 102-177**: Uses `scrub: 1.2` on the pinned timeline
- **Verdict**: ✅ Reverses correctly

#### Issue 1.3: Mobile pinned timeline reverses correctly
- **Lines 179-250**: Uses `scrub: 1` on the pinned timeline
- **Verdict**: ✅ Reverses correctly

---

### 2. Testimonials.tsx

#### Issue 2.1: Header animation does not reverse
- **Line 71**: `scrollTrigger: { trigger: section.current, start: "top 60%" }` — no `end`, no `scrub`
- **Current behavior**: Header elements animate in once when section enters viewport, stay visible when scrolling back up past the section
- **Expected behavior**: Header should fade/slide back out when scrolling up past the 60% trigger point
- **Fix**: Add `end: "top 20%", scrub: 1.5` to the header timeline

```diff
- const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%" } });
+ const headerTl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 60%", end: "top 20%", scrub: 1.5 } });
```

---

### 3. Philosophy.tsx

#### Issue 3.1: Image 1 entrance does not reverse
- **Line 76**: `scrollTrigger: { trigger: imgRef1.current, start: "top 60%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 20%", scrub: 1.5`

#### Issue 3.2: Content timeline does not reverse
- **Line 96**: `scrollTrigger: { trigger: ".phil-content", start: "top 60%", end: "top 15%", scrub: 2.5 }` — already has scrub
- **Verdict**: ✅ Already reverses correctly

#### Issue 3.3: Stats counter does not reverse
- **Lines 128-133**: `scrollTrigger: { trigger: ".phil-stats", start: "top 65%" }` — no `end`, no `scrub`
- **Current behavior**: Counter animates from 0 to final value once, stays at final value when scrolling back up
- **Expected behavior**: Counter should count back down when scrolling up
- **Fix**: Add `end: "top 35%", scrub: true`

```diff
- scrollTrigger: { trigger: ".phil-stats", start: "top 65%" },
+ scrollTrigger: { trigger: ".phil-stats", start: "top 65%", end: "top 35%", scrub: true },
```

#### Issue 3.4: Stat cards entrance does not reverse
- **Lines 135-137**: `scrollTrigger: { trigger: ".phil-stats", start: "top 65%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 35%", scrub: 1.5`

#### Issue 3.5: Image 2 entrance does not reverse
- **Line 157**: `scrollTrigger: { trigger: imgRef2.current, start: "top 65%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 25%", scrub: 1.5`

---

### 4. Difference.tsx

#### Issue 4.1: Header timeline does not reverse
- **Line 45**: `scrollTrigger: { trigger: section.current, start: "top 60%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 20%", scrub: 1.5`

#### Issue 4.2: Desktop card timelines reverse correctly
- **Line 64**: `scrollTrigger: { trigger: card, start: "top 60%", end: "top 20%", scrub: 1.8 }`
- **Verdict**: ✅ Already reverses correctly

#### Issue 4.3: Mobile card timelines reverse correctly
- **Line 121**: `scrollTrigger: { trigger: card, start: "top 65%", end: "top 15%", scrub: 1.5 }`
- **Verdict**: ✅ Already reverses correctly

---

### 5. Process.tsx

#### Issue 5.1: Header timeline does not reverse
- **Line 60**: `scrollTrigger: { trigger: section.current, start: "top 60%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 20%", scrub: 1.5`

#### Issue 5.2: Desktop timeline reverse
- **Line 66**: `scrollTrigger: { trigger: ".proc-steps", start: "top 50%", end: "bottom 40%", scrub: true }`
- **Verdict**: ✅ Already reverses correctly

#### Issue 5.3: Mobile timeline reverse
- **Line 70**: `scrollTrigger: { trigger: ".proc-steps", start: "top 50%", end: "bottom 40%", scrub: true }`
- **Verdict**: ✅ Already reverses correctly

#### Issue 5.4: Step card timelines reverse correctly
- **Line 80**: `scrollTrigger: { trigger: step, start: "top 65%", end: "top 20%", scrub: 1.5 }`
- **Verdict**: ✅ Already reverses correctly

---

### 6. Collection.tsx

#### Issue 6.1: Header timeline does not reverse
- **Line 47**: `scrollTrigger: { trigger: section.current, start: "top 55%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 15%", scrub: 1.5`

#### Issue 6.2: Desktop pinned horizontal scroll reverses correctly
- **Line 66**: `scrub: 0.8` on the pinned ScrollTrigger
- **Verdict**: ✅ Already reverses correctly

#### Issue 6.3: Header fade on scroll reverses correctly
- **Lines 118-129**: `scrub: true`
- **Verdict**: ✅ Already reverses correctly

#### Issue 6.4: Mobile card timelines reverse correctly
- **Line 145**: `scrollTrigger: { trigger: el, start: "top 70%", end: "top 15%", scrub: 1.2 }`
- **Verdict**: ✅ Already reverses correctly

---

### 7. Projects.tsx

#### Issue 7.1: Header timeline does not reverse
- **Line 46**: `scrollTrigger: { trigger: section.current, start: "top 60%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 20%", scrub: 1.5`

#### Issue 7.2: Desktop card timelines reverse correctly
- **Line 76**: `scrollTrigger: { trigger: card, start: "top 70%", end: "top 20%", scrub: 1.4 }`
- **Verdict**: ✅ Already reverses correctly

#### Issue 7.3: Banner clip animation does not reverse
- **Lines 121-123**: `scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 65%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 25%", scrub: 1.5`

#### Issue 7.4: Banner content animation does not reverse
- **Lines 126-128**: `scrollTrigger: { trigger: ".proj-banner-wrap", start: "top 60%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 20%", scrub: 1.2`

#### Issue 7.5: Bottom images animation does not reverse
- **Lines 131-133**: `scrollTrigger: { trigger: ".proj-bottom-images", start: "top 75%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 45%", scrub: 1.2`

#### Issue 7.6: Mobile card timelines reverse correctly
- **Line 177**: `scrollTrigger: { trigger: card, start: "top 70%", end: "top 20%", scrub: 1.2 }`
- **Verdict**: ✅ Already reverses correctly

#### Issue 7.7: Mobile banner/animation does not reverse
- **Lines 214-226**: Same issue as desktop — no `end`, no `scrub`
- **Fix**: Add `end` and `scrub` to each

---

### 8. Cta.tsx

#### Issue 8.1: Main timeline does not reverse
- **Line 41**: `scrollTrigger: { trigger: section.current, start: "top 55%" }` — no `end`, no `scrub`
- **Current behavior**: All CTA elements animate in once and stay visible
- **Expected behavior**: Elements should animate back out when scrolling up past the section
- **Fix**: Add `end: "top 15%", scrub: 1.5`

```diff
- const tl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 55%" } });
+ const tl = gsap.timeline({ scrollTrigger: { trigger: section.current, start: "top 55%", end: "top 15%", scrub: 1.5 } });
```

---

### 9. Footer.tsx

#### Issue 9.1: Main timeline does not reverse
- **Line 74**: `scrollTrigger: { trigger: footer.current, start: "top 80%" }` — no `end`, no `scrub`
- **Current behavior**: Footer elements animate in once and stay visible
- **Expected behavior**: Elements should animate back out when scrolling up
- **Fix**: Add `end: "top 40%", scrub: 1.5`

#### Issue 9.2: Individual link animations do not reverse
- **Line 87**: `scrollTrigger: { trigger: link, start: "top 85%" }` — no `end`, no `scrub`
- **Fix**: Add `end: "top 55%", scrub: 0.8`

---

### 10. Marquee.tsx

#### Issue 10.1: Desktop velocity-based animation
- **Lines 35-46**: Uses `onUpdate` with `getVelocity()` — this is reactive, not a one-shot
- **Verdict**: ✅ Works correctly in both directions

#### Issue 10.2: Mobile CSS animation
- Uses CSS `@keyframes` with `animation-play-state` pause on touch
- **Verdict**: ✅ Not scroll-linked, no reverse needed

---

## Summary of Fixes Needed

| File | Issue | Lines | Severity |
|------|-------|-------|----------|
| Testimonials.tsx | Header timeline no reverse | 71 | Medium |
| Philosophy.tsx | Image 1 entrance no reverse | 76 | Medium |
| Philosophy.tsx | Stats counter no reverse | 128-133 | High |
| Philosophy.tsx | Stat cards no reverse | 135-137 | Medium |
| Philosophy.tsx | Image 2 entrance no reverse | 157 | Medium |
| Difference.tsx | Header timeline no reverse | 45 | Medium |
| Process.tsx | Header timeline no reverse | 60 | Medium |
| Collection.tsx | Header timeline no reverse | 47 | Medium |
| Projects.tsx | Header timeline no reverse | 46 | Medium |
| Projects.tsx | Banner clip no reverse | 121-123 | High |
| Projects.tsx | Banner content no reverse | 126-128 | High |
| Projects.tsx | Bottom images no reverse | 131-133 | Medium |
| Projects.tsx | Mobile banner no reverse | 214-226 | High |
| Cta.tsx | Main timeline no reverse | 41 | High |
| Footer.tsx | Main timeline no reverse | 74 | Medium |
| Footer.tsx | Link animations no reverse | 87 | Low |

**Total issues: 16**
- High severity: 5
- Medium severity: 10
- Low severity: 1

---

## Recommended Fix Pattern

For every timeline that currently uses:
```js
gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%" } })
```

Change to:
```js
gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", end: "top 20%", scrub: 1.5 } })
```

The `end` value should be set so the animation completes before the element leaves the viewport. The `scrub` value controls smoothing — higher values = smoother but more delayed response.

---

## Notes

- **Hero entrance animations** (lines 75-100) are intentionally one-shot and should NOT be changed
- **Continuous loops** (`repeat: -1, yoyo: true`) are not scroll-linked and don't need reverse support
- **Hover/mouse animations** are event-driven, not scroll-driven, and already handle their own reverse via `mouseleave`
- **Pinned timelines** with `scrub` already reverse correctly — no changes needed
