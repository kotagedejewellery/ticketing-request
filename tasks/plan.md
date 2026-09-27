# Implementation Plan — Internal Request Hub

## Overview

Build a Next.js App Router application for the PRD's three request flows. The first implementation is a functional local demo: tickets are stored in browser storage so form submission, tracking, dashboard filtering, and status updates can be exercised without introducing a database or external service before credentials are approved.

## Architecture decisions

- Use the Next.js App Router, TypeScript, Tailwind CSS, and shadcn/ui primitives.
- Use Zod schemas as the single source for form validation and ticket types.
- Keep the interactive portal as client-side components; use `localStorage` only as a temporary demo repository, clearly isolated for later spreadsheet replacement.
- Use the PRD's spreadsheet and WhatsApp integrations only after their accounts, access method, and destination are provided.
- Follow a compact Swiss/editorial dashboard direction: off-white canvas, graphite text, coral accent, Lucide icons, no decorative gradients.

## Dependency flow

```text
Next.js + shadcn setup
  → ticket types and Zod schemas
  → browser ticket repository
  → request submission + tracking
  → dashboard filters + ticket updates
  → responsive and accessibility verification
```

## Phases

### Phase 1 — Foundation

- Scaffold the typed Next.js application with Tailwind and initialize shadcn/ui.
- Add the shared visual tokens and UI primitives needed by the portal.

### Phase 2 — Core request flow

- Implement and test type-specific Zod validation.
- Build the request chooser, conditional form, submission confirmation, and ticket tracking with local demo persistence.

### Phase 3 — Internal monitoring

- Build a responsive dashboard with status summary, filters, ticket detail, and status/progress editing.
- Ensure requester-safe progress is separate from internal technical classification.

### Phase 4 — Verification

- Run unit tests, lint, TypeScript checks, production build, and browser checks at mobile and desktop widths.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Spreadsheet and WhatsApp provider are unspecified | Do not simulate a production integration; isolate demo persistence so it can be replaced. |
| Attachments cannot live inside a spreadsheet row | Demo accepts only a link; production needs the approved file-storage location. |
| Dashboard data should not expose technical notes | Separate requester progress from internal classification in the displayed fields. |

## Open questions before production integration

- Which spreadsheet provider and credentials/authorization flow will be used?
- Which storage receives uploads and returns attachment URLs?
- Which WhatsApp provider and destination should receive new-ticket alerts?
- What authentication mechanism protects the internal dashboard?
