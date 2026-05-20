# scroll-anim-app Skill — How We Build Here

## Stack
- **Framework**: Next.js 16 (App Router), Turbopack
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP 3.15.0 + ScrollTrigger + `@gsap/react` 2.1.2
- **Smooth Scroll**: Lenis (installed, used for smooth scrolling)
- **Package Manager**: pnpm
- **Build**: `pnpm run build` (TypeScript check + production build)

## Core Architecture Rules

### Animation Files
- Shared utilities go in `src/lib/animations.tsx`
- Each component manages its own GSAP code in `useGSAP()` callback
- NO external animation files per component — keep animation logic co-located

### Component Pattern (CRITICAL)
Every section component MUST follow this pattern:

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionName() {
  const section = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Desktop
    mm.add("(min-width: 1024px)", () => {
      // ScrollTrigger timelines here
    });

    // Mobile
    mm.add("(max-width: 1023px)", () => {
      // Simplified mobile animations
    });
  }, { scope: section });

  return (
    <section ref={section} className="...">
      {/* JSX with .section-element-role classes */}
    </section>
  );
}
```

### useGSAP Scope Rules
- `scope: section` scopes ALL selector strings in `gsap.to()`, `gsap.fromTo()`, `ScrollTrigger.create()` to `section.current`
- `gsap.utils.toArray()` does NOT respect scope — always queries the whole document. Use `section.current?.querySelectorAll()` instead.
- Example: `section.current?.querySelectorAll(".stat-card")` instead of `gsap.utils.toArray(".stat-card")`

### MatchMedia Pattern
- Desktop: `mm.add("(min-width: 1024px)", callback)`
- Mobile: `mm.add("(max-width: 1023px)", callback)`
- NO overlap — at 1024px only desktop runs, at 1023px only mobile. Boundary is clean.

### Entrance Timeline Rule
EVERY section MUST have a standalone entrance timeline (no scrollTrigger) that plays on mount with `delay: 0.3`. This ensures the first impression plays even before the user scrolls. The scroll-triggered timeline then takes over.

```ts
const entranceTl = gsap.timeline({ delay: 0.3 });
entranceTl.fromTo(".section-element", { ... }, { ... }, 0);
// ...
```

### NEVER Do These (Known Breaking Patterns)
1. **DON'T modify `tl.timeScale` on a scrub-linked timeline** — creates feedback loop. Velocity → timeScale change → scrub jump → velocity spike → more timeScale changes. Instead, modulate visual properties (opacity, color, etc.) based on `self.getVelocity()`.
2. **DON'T use `overflow-hidden` on any parent of a GSAP-pinned element** — clips the spacer GSAP creates for pin calculations.
3. **DON'T use `gsap.utils.toArray()` with `useGSAP scope`** — it's NOT scoped. Use `scopeRef.current?.querySelectorAll()` instead.
4. **DON'T put `pointer-events-none` on containers that contain interactive elements** — Scene containers with absolute positioning should use `pointer-events-none` only if they don't have buttons/links inside them.
5. **DON'T animate `clipPath` between incompatible values** — from `none` to `polygon()` doesn't interpolate. Always use `fromTo()` with explicit start values.
6. **DON'T nest pinned ScrollTriggers** — one pinned section at a time. Nested pins cause layout collapse.
7. **DON'T use `position: sticky` on elements inside a GSAP-pinned container** — conflicts with the fixed positioning GSAP applies.

### CSS Clip-Path Animation Rules
- Always use `fromTo()` for clip-path animations (explicit start value)
- Both FROM and TO must have the same number of polygon points
- Use `inset()` for simple directional wipes (cleaner, safer)
- Use `polygon()` for diagonal reveals only when you need a specific angle
- Animating clip-path on elements with `overflow: hidden` can cause rendering artifacts

### ScrollTrigger Pin Rules
- The pinned element must NOT have `overflow: hidden` on any parent
- `anticipatePin: 1` prevents flash but can cause layout shift — test carefully
- `pinSpacing: true` (default) creates a spacer — good for normal flow
- The pinned element's height determines initial spacer size
- `end: "+=400%"` means the pin lasts 4 viewport heights of scroll

### Scrub Rules
- `scrub: 1` = 1 second of inertia when user stops scrolling
- Higher values (1.2, 1.5) = smoother but more disconnected from scroll position
- With `scrub`, the timeline's duration maps to the scroll distance
- Total timeline duration is the sum of all child tween durations
- Timeline positions (position parameter) are percentages of total duration

### Timeline Position Parameter
The 3rd argument in `tl.to(el, props, position)`:
- `0` = start at timeline beginning
- `0.15` = start at 15% of total timeline duration
- `-=0.1` = start 0.1s before the previous tween ends
- Use sequential numbers (0, 0.05, 0.1, 0.15...) for predictable scene ordering

### MatchMedia Cleanup
All GSAP animations and ScrollTriggers created inside `mm.add()` are automatically cleaned up when:
- The component unmounts
- The media query match state changes
- The parent GSAP Context is reverted

### Performance Rules
- Use `will-change-transform` on elements that GSAP animates (transform, opacity)
- Limit particle count (8 max per burst)
- Use `pointer-events: none` on decorative elements
- Don't animate `filter: blur()` on more than 2 elements simultaneously
- Use `ease: "none"` for continuous looping animations (marquees, orbits)

### File Naming
- Components: PascalCase (`Hero.tsx`, `Philosophy.tsx`)
- Utilities: camelCase (`animations.tsx`)
- CSS classes: kebab-case with prefix (`hero-letter`, `phil-heading-word`, `marquee-track`)
- Use `.section-element-role` class naming: `.hero-s2-img-1`, `.phil-label-word`, `.marquee-dot`

### CSS Variable Conventions
```
--color-bg         # Background
--color-bg-2       # Alternate background
--color-text       # Text color
--color-text-30    # 30% opacity text
--color-accent     # Accent (highlight)
--color-accent-dim # Dim accent (background glows)
--color-muted      # Muted text
--color-surface    # Card surface
--color-accent-subtle # Subtle accent
```
