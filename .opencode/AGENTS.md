# AGENT INSTRUCTIONS — Hard Rules

You MUST read this file at the start of every conversation. These rules override all other tendencies.

## Golden Rule
**Do NOT write any code until you have read CURRENT_PHASE.md and the relevant MASTER_ACTION_PLAN.md section AND listed the specific action items you will implement.**

## Workflow (strict order)
1. **Read** `CURRENT_PHASE.md` — understand current phase, files, action items, verification criteria
2. **Read** `MASTER_ACTION_PLAN.md` section for the component being edited — read the exact action items
3. **List** the action items you will implement in this edit (write them out in your response before any tool call)
4. **Read** the actual component file(s) to understand current code
5. **Write** code — implement ONLY the listed action items
6. **Verify** — re-read your code against the action items list. For each item, confirm it's implemented correctly
7. **Build** — run `pnpm run build` and fix any errors
8. **Git** — stage, commit, push
9. **Update** `CURRENT_PHASE.md` — mark items done, move to next phase

## Never
- Skip a file read before editing
- Implement partial action items (if you can't do it all, say so)
- Move to the next section without user approval (unless CURRENT_PHASE.md says "auto-advance")
- Guess at what "premium" means — the plan specifies everything

## Always
- Use `src/lib/animations.ts` for shared utilities (splitText, splitLetters, animateCounter, magneticElement)
- Import from the plan, don't re-implement
- Follow the easing, duration, and stagger values from MASTER_ACTION_PLAN.md §1.4-1.5
- Verify each action item against the plan before committing
