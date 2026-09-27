---
name: Internal Request Hub
description: A calm internal service ledger for submitting and tracking work requests.
colors:
  paper: "oklch(0.975 0.006 250)"
  ink: "oklch(0.22 0.025 255)"
  navy: "oklch(0.28 0.055 258)"
  blue-grey: "oklch(0.94 0.018 250)"
  cobalt: "oklch(0.64 0.15 250)"
  rule: "oklch(0.87 0.015 250)"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.25
rounded:
  field: "0.75rem"
  surface: "0.875rem"
  large-surface: "1rem"
spacing:
  compact: "0.75rem"
  standard: "1rem"
  section: "1.75rem"
components:
  button-primary:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.paper}"
    rounded: "{rounded.field}"
    height: "3rem"
  field-input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    height: "3rem"
  navigation-active:
    backgroundColor: "{colors.blue-grey}"
    textColor: "{colors.navy}"
    rounded: "{rounded.surface}"
---

# Design System: Internal Request Hub

## Overview

**Creative North Star: "The Operational Service Ledger"**

Internal Request Hub makes a handoff feel clear and accountable instead of bureaucratic. Cool paper-white surfaces, navy ink, restrained cobalt response, and thin ledger dividers make the screen calm enough for routine internal work while keeping the next action obvious.

The system is designed for an Indonesian operating interface, not a promotional site. It preserves plain-language request forms, supports dense engineer monitoring, and keeps requester-safe status information legible on a phone.

**Key Characteristics:**

- Divider-led composition instead of repeated feature cards.
- One primary navy action per local task.
- Generous reading space around form fields and request rows.
- Short state transitions that support, never delay, task completion.

## Colors

The palette uses cool neutral surfaces and a small navy-to-cobalt range, so control states read as operational signals rather than decoration.

### Primary

- **Ledger Navy:** the primary action, active navigation, selected request state, and high-importance text.
- **Quiet Cobalt:** focus-ring and responsive interaction accent; it is reserved for direct feedback.

### Secondary

- **Blue-Grey Wash:** selected navigation, hover surfaces, and non-critical grouped context.

### Neutral

- **Cool Paper:** page and field background that reduces contrast glare during extended data entry.
- **Ink:** body text and headings.
- **Ledger Rule:** low-contrast structural dividers and field borders.

**The Quiet Accent Rule.** Cobalt communicates focus or a committed choice; it is not a decorative fill scattered across a screen.

## Typography

**Display Font:** system UI sans-serif stack
**Body Font:** system UI sans-serif stack
**Label/Mono Font:** system UI sans-serif; the existing monospace stack is reserved for ticket identifiers and tabular values.

**Character:** Compact, high-legibility sans-serif typography keeps operational instructions direct and easy to scan across desktop and mobile contexts.

### Hierarchy

- **Display:** semibold, 2.25rem at the base breakpoint and 3rem from the small breakpoint, with tight tracking; page-level task statements only.
- **Headline:** semibold, 1.875–2.25rem; form, tracking, and dashboard titles.
- **Title:** semibold, 1.125–1.25rem; request row and ticket titles.
- **Body:** regular, 1rem, 1.5 line height; keep instructional copy short and readable.
- **Label:** medium, 0.875rem; labels remain visible and never rely on placeholders alone.

**The Identifier Rule.** Monospace is used only for ticket IDs and numerical monitoring values, where tabular clarity is functional.

## Layout

Desktop request selection uses a two-column composition: task context on the left and full-width request rows on the right. Requester forms, tracking, and confirmation surfaces stay within focused content widths. Forms become a single vertical sequence on narrow screens; paired personal-information fields only split at medium widths.

Mobile starts with 16px page padding, full-width submit and tracking actions, 48px controls, and vertical navigation labels. Desktop layers in wider containers, multi-column monitoring filters, and tables while retaining the same content and navigation structure.

## Elevation & Depth

The system is flat by default. Divider, tonal contrast, and whitespace establish hierarchy; a soft ambient shadow appears only on the completed-request and requester-progress surfaces to confirm a resolved state.

**The Ledger Depth Rule.** Do not combine a heavy border with a broad shadow on the same surface. A surface chooses one structural cue.

## Shapes

Fields and buttons use gently rounded corners; primary surfaces are slightly more rounded to provide a stable reading boundary. Pills are reserved for small status badges and compact navigation states. Full-width request rows use dividers, not card outlines.

## Components

### Buttons

- **Shape:** softly rounded field corners.
- **Primary:** navy fill, paper text, and a 48px task-action height on requester flows.
- **Hover / Focus:** short color transition and visible cobalt focus ring.
- **Secondary / Ghost:** neutral surface treatment for navigation, back actions, and non-destructive alternatives.

### Cards / Containers

- **Corner Style:** surface rounding for forms, progress, filters, and confirmation states.
- **Background:** paper-white on the cool paper page.
- **Shadow Strategy:** flat by default; soft ambient confirmation only.
- **Border:** use the ledger rule for bounded input, tracking, and dialog surfaces.

### Inputs / Fields

- **Style:** visible label, pale field surface, 48px input height, and comfortable text size.
- **Focus:** cobalt ring and border response that remains visible for keyboard users.
- **Error / Disabled:** destructive messages stay adjacent to their field; disabled selection prevents duplicate request-type submissions.

### Navigation

Requester navigation is a compact two-item segmented control: Request and Lacak. It remains visible on phones with concise labels and 44px-or-larger targets; the engineer dashboard is an authenticated action outside requester navigation.

### Request Rows

Request type selection is the signature component: numbered, full-width ledger rows with an icon, explicit description, and directional arrow. A selected row gains a thin navy rule, navy icon surface, and a subtle arrow shift before its form opens.

## Do's and Don'ts

### Do:

- **Do** keep visible labels, nearby help, and field-level errors for requester forms.
- **Do** use a vertical request sequence on phones and preserve every core requester action.
- **Do** reserve the navy/cobalt range for primary actions, focus, and committed states.
- **Do** use dividers and spacing to organize operational information before adding containers.

### Don't:

- **Don't** turn the request-type flow into equal icon cards or a marketing-style hero.
- **Don't** make touch actions depend on hover or use requester controls below 44px.
- **Don't** expose technical classification in requester-facing views.
- **Don't** use gradients, emoji, heavy glass effects, or decorative grid backgrounds.
