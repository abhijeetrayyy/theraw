# AGENT INSTRUCTIONS — Hard Rules

You MUST read this file at the start of every conversation. These rules override all other tendencies.

## Required Reading Order (EVERY Session)
1. **AGENTS.md** (this file)
2. **CURRENT_PHASE.md** — understand current phase, files, action items, verification criteria
3. **MASTER_ACTION_PLAN.md** section for the component being edited
4. **docs/GSAP_MASTER_REFERENCE.md** — review the relevant animation pattern AND breakage patterns
5. **docs/CINEMATIC_DIRECTOR.md** — understand the "feeling" of the section
6. Read the actual component file(s)

## Golden Rule
**Do NOT write any code until you have read files 2–5 AND listed the specific action items you will implement.**

## Workflow (strict order)
1. Read CURRENT_PHASE.md
2. Read MASTER_ACTION_PLAN.md section for the component
3. Read relevant patterns from docs/GSAP_MASTER_REFERENCE.md
4. Read relevant section from docs/CINEMATIC_DIRECTOR.md
5. List the action items you will implement
6. Read the actual component file
7. Write code — implement ONLY the listed action items
8. Verify — re-read your code against action items, GSAP_MASTER_REFERENCE breakage patterns
9. Build — run `pnpm run build` and fix any errors
10. Git — stage, commit, push
11. Update CURRENT_PHASE.md — mark items done, move to next phase

## Never
- Skip a file read before editing
- Implement partial action items (if you can't do it all, say so)
- Move to the next section without user approval
- Guess — the plan documents specify everything
- Use `gsap.utils.toArray()` (use `section.current?.querySelectorAll()` instead)
- Modify `tl.timeScale` on a scrub-linked timeline (creates feedback loop)
- Put `overflow-hidden` on any parent of a GSAP-pinned element
- Put `pointer-events-none` on containers with interactive elements
- Animate clipPath without `fromTo()` with explicit start values

## Always
- Create a standalone entrance timeline (delay 0.3, no scrollTrigger) for EVERY section
- Use `fromTo()` for clip-path animations (both FROM and TO with same number of points)
- Verify each action item against the plan before committing
- Check GSAP_MASTER_REFERENCE.md breakage patterns before committing
- Read CINEMATIC_DIRECTOR.md for the section's "feeling" before designing animations
- Use .section-element-role class naming convention (hero-s2-img-1, phil-label-word, etc.)

## Reference Files
- `docs/GSAP_MASTER_REFERENCE.md` — Complete GSAP documentation, all patterns, breakage fixes
- `docs/CINEMATIC_DIRECTOR.md` — Cinematic vision for each section, "feeling" guidelines
- `.opencode/skills/scroll-anim-app/SKILL.md` — Project-specific architecture rules
- `MASTER_ACTION_PLAN.md` — Full specification for all phases
- `PREMIUM_OVERHAUL_PLAN.md` — Research document with design principles
- `src/lib/animations.tsx` — Shared utilities (splitText, splitLetters, animateCounter, magneticElement)
