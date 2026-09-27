# Implementation Tasks — Internal Request Hub

## Task 1: Scaffold the application

**Acceptance**

- [x] Next.js App Router, TypeScript, Tailwind CSS, ESLint, and shadcn/ui are configured.
- [x] The production build succeeds before app features are added.

**Verified:** `npm run lint` and `npm run build`.

**Dependencies:** None.

## Task 2: Add ticket schema and browser repository

**Acceptance**

- [x] Zod validates the required fields for each of the three request types.
- [x] Ticket creation produces a unique ticket ID and starts at status `Baru`.
- [x] Local demo storage preserves tickets and ticket updates in a browser.

**Verify:** targeted unit tests.

**Dependencies:** Task 1.

## Task 3: Build request and tracking flow

**Acceptance**

- [x] A requester selects one type before seeing only the relevant fields.
- [x] Inline validation and submit feedback are accessible.
- [x] Submit confirmation provides a tracking ID; the tracking view shows only requester-safe data.

**Verify:** unit tests, lint, build, and manual browser path.

**Dependencies:** Task 2.

## Task 4: Build the dashboard and ticket updates

**Acceptance**

- [x] Dashboard shows ticket counts, filterable rows, and an empty state.
- [x] Engineer can update status, requester progress, and private classification.
- [x] Changes are visible in the tracking view using local demo data.

**Verify:** unit tests, lint, build, and manual browser path.

**Dependencies:** Tasks 2–3.

## Task 5: Final UI and accessibility verification

**Acceptance**

- [ ] The UI works at 375px, 768px, 1024px, and 1440px without horizontal scrolling. Browser DevTools is not configured in this session.
- [x] Keyboard focus, labels, error text, and status color/text combinations are implemented in the UI.
- [x] The development server returns HTTP 200 for the core route. Browser console inspection is unavailable in this session.

**Verified:** `npm test`, `npm run lint`, and `npm run build`; HTTP response checked locally.

**Dependencies:** Tasks 1–4.
