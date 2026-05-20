# GSAP Master Reference — The Raw Project

## Version
GSAP 3.15.0 + ScrollTrigger + @gsap/react 2.1.2

---

## 1. Core Concepts (Must Understand)

### 1.1 Tweens vs Timelines vs ScrollTriggers

| Concept | What It Is | When To Use |
|---------|-----------|-------------|
| **Tween** (`gsap.to()`, `gsap.fromTo()`) | Animates a single set of properties on one or more targets | Simple one-shot animations, hover effects, continuous loops |
| **Timeline** (`gsap.timeline()`) | Sequences multiple tweens with precise timing | Complex multi-step animations, scene-based scroll narratives |
| **ScrollTrigger** | Links animation progress to scroll position | Section reveals, parallax, pinning, scrub-based animations |

### 1.2 The Three Timeline Types

**Standalone Entrance Timeline** — NO scrollTrigger, plays once on mount
```ts
const entranceTl = gsap.timeline({ delay: 0.3 });
entranceTl.fromTo(".el", { opacity: 0 }, { opacity: 1, duration: 1 }, 0);
```
Used for: First-load hero reveal, initial section entrance before user scrolls.

**Scrub Timeline** — Linked to scroll position via scrollTrigger
```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "top top",
    end: "+=400%",
    pin: true,
    scrub: 1.2,
    anticipatePin: 1,
  },
});
tl.fromTo(".el", { ... }, { ... }, 0);
```
Used for: Hero pin+scrub narrative, scene-by-scene transitions.

**Scroll-Triggered Independent Tweens** — Separate ScrollTriggers per element
```ts
gsap.to(".el", {
  y: 100,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
```
Used for: Continuous parallax, background shifts, independent element movement.

---

## 2. Every GSAP Method We Use (With Real Examples)

### 2.1 `gsap.to(target, vars)`
Animates FROM the current state TO the specified values.
```ts
gsap.to(".hero-s2-orbit-inner", {
  rotation: 360,
  duration: 8,
  repeat: -1,
  ease: "none",
});
```
**When it breaks**: If the element starts at an unexpected position (e.g., CSS sets `transform: translateX(100px)` but GSAP doesn't know about it), the tween can jump.

### 2.2 `gsap.fromTo(target, fromVars, toVars)`
Animates FROM explicitly defined values TO explicitly defined values. SAFER than `gsap.to()` because it doesn't depend on computed style.
```ts
gsap.fromTo(".hero-letter",
  { y: "120%", opacity: 0, rotateX: -70 },
  { y: "0%", opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.12, ease: "power4.out" },
);
```
**Rule**: Always prefer `fromTo()` over `to()` for scroll-linked animations. `fromTo()` eliminates the "initial state unknown" problem.

### 2.3 `gsap.set(target, vars)`
Instantly sets properties without animation. Used for initialization.
```ts
gsap.set(".marquee-track-2", { xPercent: -50 });
```

### 2.4 `gsap.timeline(vars)`
Creates a timeline for sequencing. Each child tween has a position parameter (3rd argument).
```ts
const tl = gsap.timeline();
tl.fromTo(".a", { ... }, { ... }, 0);        // starts at 0s
tl.fromTo(".b", { ... }, { ... }, 0.15);      // starts at 0.15s
tl.to(".c", { ... }, 0.3);                    // starts at 0.3s
```
**Position parameter** (the 3rd arg):
- `0` = timeline start
- Number = absolute time in seconds
- `-=0.5` = 0.5s before the previous tween ends
- `"label"` = named label

### 2.5 `useGSAP(callback, config)`
@gsap/react hook. Manages GSAP Context lifecycle.
```ts
useGSAP(() => {
  // All animations created here are automatically
  // cleaned up when component unmounts
}, { scope: sectionRef, dependencies: [] });
```
**Scope behavior**: All selector strings are scoped to `sectionRef.current`. This means `.hero-letter` only finds elements inside the section.

**Known limitation**: `gsap.utils.toArray()` does NOT respect scope. Use `section.current?.querySelectorAll()` instead.

### 2.6 `gsap.matchMedia()`
Creates responsive animations that auto-activate/deactivate.
```ts
const mm = gsap.matchMedia();
mm.add("(min-width: 1024px)", () => {
  // Desktop: complex animations, 3-image collage, magnetic buttons
});
mm.add("(max-width: 1023px)", () => {
  // Mobile: simplified, single-image, fewer particles
});
```
**How it breaks**: If the media queries overlap or have a gap, animations can double-fire or not fire. Use strict boundaries (1024px min / 1023px max, NEVER the same value).

### 2.7 `ScrollTrigger.create(vars)`
Creates standalone scroll-driven triggers (not linked to a timeline).
```ts
ScrollTrigger.create({
  trigger: ".hero-scene-3",
  start: "top 60%",
  end: "top 20%",
  scrub: 1,
  onUpdate: (self) => {
    el.textContent = Math.round(self.progress * 100) + "%";
  },
});
```
**Properties**:
- `trigger` — element that defines the scroll range
- `start` — when the trigger activates (e.g., `"top 60%"` = trigger's top at 60% from viewport top)
- `end` — when the trigger deactivates
- `scrub` — links progress to scroll (number = inertia in seconds)
- `pin` — pins the trigger element
- `anticipatePin` — pre-positions the pin to prevent flash
- `onUpdate` — callback with `self.progress` (0-1), `self.getVelocity()`
- `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack` — directional callbacks

### 2.8 `gsap.utils.toArray(targets)`
Converts selector strings or array-likes to arrays. NOT scoped by useGSAP.
```ts
// WRONG — searches entire document:
gsap.utils.toArray(".stat-card").forEach(...)

// CORRECT — scoped to section:
section.current?.querySelectorAll(".stat-card").forEach(...)
```

---

## 3. Animation Patterns (From This Project)

### 3.1 Pin + Scrub Narrative (Hero)
```ts
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: pinContainer.current,
    start: "top top",
    end: "+=400%",
    pin: true,
    scrub: 1.2,
    anticipatePin: 1,
  },
});

// Scene 1: Entrance (0.00 - 0.25)
tl.fromTo(".scene1-el", { clipPath: "..." }, { clipPath: "..." }, 0);

// Scene 1→2 Transition (0.20 - 0.40)
tl.to(".scene1-el", { opacity: 0 }, 0.2);
tl.fromTo(".scene2-el", { clipPath: "..." }, { clipPath: "..." }, 0.25);

// Scene 2→3 Transition (0.40 - 0.75)
tl.to(".scene2-el", { x: "-20%" }, 0.4);
tl.fromTo(".scene3-el", { scale: 1.2 }, { scale: 1 }, 0.44);

// Scene 4: CTA (0.75 - 1.00)
tl.fromTo(".scene4-el", { y: 25 }, { y: 0 }, 0.75);
```
**Key insight**: The position values (0, 0.25, 0.4, etc.) divide the total timeline into visual "scenes". The scroll distance (400% of viewport) is divided proportionally.

### 3.2 Line-by-Line Text Reveal (Philosophy)
```ts
gsap.fromTo(".phil-line-text",
  { y: "120%", opacity: 0 },
  { y: "0%", opacity: 1, stagger: 0.15, duration: 1.2, ease: "power4.out",
    scrollTrigger: {
      trigger: ".phil-scroll-area",
      start: "top 65%",
      end: "top 20%",
      scrub: 1.5,
    },
  }
);
```
**How stagger works**: Each matching element animates one after another with 0.15s delay between them. 5 lines × 0.15s stagger = 0.75s total before the last line finishes.

### 3.3 Staggered Letter Split (Hero)
```tsx
// Component
function splitLetters(text: string) {
  return text.split("").map((l, i) => (
    <span key={i} className="hero-letter inline-block">{l === " " ? "\u00A0" : l}</span>
  ));
}

// GSAP
tl.fromTo(".hero-letter",
  { y: "120%", opacity: 0, rotateX: -70 },
  { y: "0%", opacity: 1, rotateX: 0, stagger: 0.04, duration: 0.12, ease: "power4.out" },
  0.08
);
```
**Performance note**: Letter splits create many DOM nodes. "The Raw Select" = 13 letters. 13 × stagger 0.04 = 0.52s stagger window. Duration 0.12 per letter means the last letter finishes at 0.08 + 0.52 + 0.12 ≈ 0.72s into the scene. Fine for desktop but reduce stagger to 0.03 on mobile.

### 3.4 Magnetic Button (Hero CTA)
```ts
ctaBtn.addEventListener("mousemove", (e: MouseEvent) => {
  const rect = ctaBtn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  gsap.to(ctaBtn, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: "power2.out" });
  gsap.to(ctaBtn, { scale: 1.04, duration: 0.3, ease: "power2.out" });
});
ctaBtn.addEventListener("mouseleave", () => {
  gsap.to(ctaBtn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
  gsap.to(ctaBtn, { scale: 1, duration: 0.5, ease: "power2.out" });
});
```
**How it breaks**: If the button has `pointer-events: none` on any ancestor, mousemove never fires. The button must be in a container without `pointer-events: none`.

### 3.5 Particle Burst on Hover (Hero CTA)
```ts
const burstParticles = () => {
  if (!particleContainer.current || !ctaBtn.matches(":hover")) return;
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "hero-particle";
    const size = 2 + Math.random() * 3;
    const angle = (Math.PI * 2 / 8) * i;
    const dist = 30 + Math.random() * 40;
    p.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:var(--color-accent);left:50%;top:50%;pointer-events:none;`;
    particleContainer.current.appendChild(p);
    gsap.fromTo(p,
      { x: 0, y: 0, opacity: 0.6, scale: 1 },
      {
        x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
        opacity: 0, scale: 0,
        duration: 0.6 + Math.random() * 0.4,
        ease: "power2.out",
        onComplete: () => p.remove(),
      }
    );
  }
};
ctaBtn.addEventListener("mouseenter", burstParticles);
```
**The `particleContainer` ref**: Must wrap the button AND be `position: relative` in CSS so particles position correctly.

### 3.6 Count-Up with Scroll (Hero Stats)
```ts
ScrollTrigger.create({
  trigger: ".hero-scene-3",
  start: "top 60%",
  end: "top 20%",
  scrub: 1,
  onUpdate: (self) => {
    const val = Math.round(self.progress * numTarget);
    el.textContent = isPercent ? `${val}%` : `${val}+`;
  },
});
```
**Two-phase variant** (80% fast, 20% slow):
```ts
const eightyPct = Math.round(target * 0.8);
ScrollTrigger.create({
  trigger: ".phil-stats",
  start: "top 65%",
  end: "top 35%",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;
    let display;
    if (progress < 0.5) {
      display = Math.round((progress / 0.5) * eightyPct);
    } else {
      const remaining = (progress - 0.5) / 0.5;
      display = Math.round(eightyPct + remaining * (target - eightyPct));
    }
    el.textContent = display + suffix;
  },
});
```

### 3.7 Pinned Headline with Scroll Past (Philosophy)
```ts
ScrollTrigger.create({
  trigger: pinnedRef.current,
  start: "top 15%",
  endTrigger: scrollAreaRef.current,
  end: "bottom 15%",
  pin: true,
  pinSpacing: true,
});
```
**How it works**: The headline element pins (stays fixed) while the body/quote content scrolls past it. The pin lasts until the bottom of the scroll area reaches the 15% line from viewport top. `pinSpacing: true` adds spacer height automatically.

### 3.8 Continuous Loops (Marquee, Orbital)
```ts
// Infinite scroll
gsap.to(track, { xPercent: -50, duration: 50, ease: "none", repeat: -1 });

// Continuous rotation
gsap.to(".hero-s2-orbit-inner", { rotation: 360, duration: 8, repeat: -1, ease: "none" });

// Pulse
gsap.to(".hero-s2-orbit-inner", {
  scale: 1.15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut",
});
```
**Slingshot exit** (marquee speeds up when section scrolls out):
```ts
ScrollTrigger.create({
  trigger: section.current,
  start: "bottom 30%",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const boost = 1 + self.progress * 2;
    tween1?.timeScale(boost);
  },
  onLeave: () => { tween1?.timeScale(1); },
});
```

### 3.9 Full-Bleed Image (Philosophy)
```tsx
<div className="w-screen relative left-1/2 -translate-x-1/2">
  {/* Image content outside wrap, spans full viewport width */}
</div>
```

---

## 4. Known Breakage Patterns (How Things Break)

### Breakage 1: `timeScale` + `scrub` = Feedback Loop
```ts
// THIS BREAKS SCRUB:
ScrollTrigger.create({
  onUpdate: (self) => {
    tl.timeScale(1 + self.getVelocity() / 800); // ← DEATH SPIRAL
  },
});
```
**Why**: Scrub maps scroll position → timeline progress. Changing timeScale while scrub is active makes the timeline race ahead, which triggers more velocity, which increases timeScale more. Result: timeline jumps or freezes.

**Fix**: Modulate VISUAL properties instead:
```ts
ScrollTrigger.create({
  onUpdate: (self) => {
    gsap.to(".hero-grain", { opacity: 0.035 + Math.min(0.06, velocity / 4000) });
  },
});
```

### Breakage 2: `overflow: hidden` on Pin Parent
```ts
// THIS BREAKS PIN:
<section className="overflow-hidden"> {/* ← Clips the GSAP spacer */}
  <div ref={pinContainer}> {/* Pinned element */}</div>
</section>
```
**Why**: GSAP creates a spacer div that replaces the pinned element in the DOM flow. If the parent has `overflow: hidden`, the spacer (which can be several viewports tall) gets clipped. This can break the pin calculation entirely.

**Fix**: Remove `overflow-hidden` from any ancestor of a pinned element.

### Breakage 3: `pointer-events: none` on Interactive Containers
```tsx
// THIS BREAKS CLICKS:
<div className="pointer-events-none"> {/* ← Inherited by all children */}
  <button>Click me</button> {/* ← Never clickable */}
</div>
```
**Fix**: Don't use `pointer-events-none` on containers with buttons/links. Use it only on decorative overlay elements.

### Breakage 4: `gsap.utils.toArray()` Ignores Scope
```ts
// THIS IS NOT SCOPED:
useGSAP(() => {
  gsap.utils.toArray(".my-class").forEach(...) // Queries ENTIRE document
}, { scope: section });
```
**Fix**: Use `section.current?.querySelectorAll(".my-class")` or pass the scope explicitly.

### Breakage 5: clipPath `none` to `polygon()` Interpolation
```ts
// THIS DOESN'T ANIMATE SMOOTHLY:
gsap.to(el, { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" });
// Element starts with clip-path: none → CSS can't interpolate none to polygon
```
**Fix**: Always use `fromTo()` with an explicit start value:
```ts
gsap.fromTo(el,
  { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
  { clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)" }
);
```

### Breakage 6: Missing Entrance Timeline
**If there's no standalone entrance timeline and only a scroll-triggered timeline**:
- On page load, no animation plays
- User must scroll to trigger any reveal
- If the scroll trigger's `start` is already passed (page loaded mid-section), animations never fire

**Fix**: Every section MUST have both an entrance timeline (delay 0.3, no scrollTrigger) AND a scroll-triggered timeline for scroll-based reveals.

### Breakage 7: matchMedia Gap/Overlap
```ts
// GAP at 1024px:
mm.add("(max-width: 1023px)", ...) // 0-1023px
mm.add("(min-width: 1025px)", ...) // 1025px+ → 1024px has NOTHING
```
**Fix**: Use adjacent boundaries: `max-width: 1023px` + `min-width: 1024px`.

---

## 5. Easing Reference

| Easing | Feel | Use Case |
|--------|------|----------|
| `power1.out` | Gentle, subtle | Fades, opacity shifts |
| `power2.out` | Moderate, smooth | General reveals, slide-ups |
| `power3.out` | Noticeable, polished | Stat cards, label entrances |
| `power4.out` | Dramatic, premium | Hero headline, letter splits, clip-path reveals |
| `power3.in` | Fast start, abrupt end | Exit animations, collapses |
| `power2.inOut` | Symmetric, natural | Accent lines, connector draws |
| `power4.inOut` | Very dramatic | Full clip-path scene transitions |
| `back.out(3)` | Overshoot with bounce | Quote marks, playful elements |
| `elastic.out(1, 0.5)` | Bouncy return | Magnetic button snap-back |
| `sine.inOut` | Smooth, wave-like | Continuous loops, orbits, pulses |
| `none` | Linear | Marquee scroll, rotation counters |

---

## 6. Property Animation Reference

| Property | GSAP Syntax | Notes |
|----------|------------|-------|
| Opacity | `opacity: 0 → 1` | Most performant |
| Y position | `y: 100` (px) or `yPercent: 50` (% of own height) | Use `yPercent` for relative movement |
| X position | `x: 50` or `xPercent: -20` | |
| Scale | `scale: 0 → 1` or `scale: 1.2 → 1` | |
| Rotation | `rotation: 360` (degrees) or `rotateX: 90` | |
| Clip-path | `clipPath: "inset(...)"` or `clipPath: "polygon(...)"` | Must use fromTo() with explicit start |
| Background position | `backgroundPosition: "100% 100%"` | Gradient sweeps |
| Filter | `filter: "blur(8px)"` → `"blur(0px)"` | Performance heavy, limit usage |
| Scale X/Y | `scaleX: 0 → 1` or `scaleY: 0 → 1` | Line draws, accent grows |
| Transform origin | `transformOrigin: "center"` | Set in CSS or GSAP set() |
| CSS variables | Not animatable via GSAP directly | Use inline style or gsap.setProperty |

---

## 7. ScrollTrigger Position Values

Positions use the format: `"[element-position] [viewport-position]"`

| Value | Meaning |
|-------|---------|
| `"top top"` | Element's top hits viewport's top |
| `"top bottom"` | Element's top hits viewport's bottom (enters viewport) |
| `"bottom top"` | Element's bottom hits viewport's top (fully visible) |
| `"bottom bottom"` | Element's bottom hits viewport's bottom (exits viewport) |
| `"top 60%"` | Element's top is at 60% from viewport top |
| `"+=400%"` | End is 400% of viewport height after the start position |
| `"+=400px"` | End is 400px after the start position |

---

## 8. Debugging GSAP

### Check if ScrollTrigger is tracking:
```ts
ScrollTrigger.getAll().forEach(st => console.log(st.vars.id || st.vars.trigger));
```

### Force refresh ScrollTrigger calculations:
```ts
ScrollTrigger.refresh(true);
```

### Log scroll progress:
```ts
ScrollTrigger.create({
  trigger: ".container",
  start: "top top",
  end: "bottom bottom",
  onUpdate: (self) => console.log("Progress:", self.progress, "Velocity:", self.getVelocity()),
});
```

### Common errors and meanings:
- `"GSAP target [object String] not found"` — Selector didn't match any element. Check class names and scope.
- `"ScrollTrigger: pin element not found"` — The trigger element for pin doesn't exist. Check refs.
- Animation jumps to end state — Missing `fromTo()` or initial clipPath interpolation failure.
- Animation plays on mount then resets — Missing `delay: 0.3` or React Strict Mode double-fire.
