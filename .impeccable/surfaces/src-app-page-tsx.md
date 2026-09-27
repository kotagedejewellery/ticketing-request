---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

## Scope

`src/app/page.tsx` is the single web surface for internal request submission, requester tracking, and engineer monitoring. Mode: Operate.

## Direction contract

**THESIS:** A request is an operational handoff, not a generic form. The interface behaves like a calm service ledger: one clear next step, precise labels, and visible progress without visual noise. It refuses the repeated icon-card landing-page pattern.

**OWN-WORLD:** Cool paper-white surfaces, navy ink, muted blue-grey rules, and a restrained cobalt action color. Navigation, request types, form sections, status information, and data lists use thin ledger dividers, generous whitespace, modest rounding, and tabular identifiers. Shadows are sparse and soft.

**STORY:** A requester immediately understands which request path to choose, supplies only relevant information, and receives a ticket to track. An engineer can scan and update work without exposing internal details.

**FIRST VIEWPORT:** A compact navigation bar sits above a two-column request introduction on desktop: the task statement is left, and three full-width numbered request rows are right. On phones it becomes one clear vertical sequence. The primary action is the selected request row; there is no decorative hero or metric panel.

**FORM:** Operational Service Ledger, candidate 4 of the grounded directions. Seed key: `4facb325`. Its signature interaction is the selected request row gaining a quiet cobalt rule and arrow movement, while all controls remain visible and usable without motion.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
