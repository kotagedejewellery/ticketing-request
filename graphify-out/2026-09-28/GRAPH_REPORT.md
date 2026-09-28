# Graph Report - ticketing-request  (2026-09-28)

## Corpus Check
- 136 files · ~611,846 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .toml 4, (none) 2, .log 2)

## Summary
- 1195 nodes · 3203 edges · 72 communities (52 shown, 20 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7fe42bc6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- setLiveState
- modern-screenshot.umd.js
- live-browser.js
- initPageChat
- package.json
- initGlobalBar
- tickets.ts
- admin-management.tsx
- documentRefForElement
- renderDesignVisual
- positionParamsPanel
- connectSSE
- captureElementToBlob
- actOnAgentTarget
- tracking-panel.tsx
- [systemId]/route.ts
- resumeSession
- Impeccable Skill
- components.json
- ticket-events.ts
- showToast
- resolveLiveInjectionAnchor
- compilerOptions
- createLiveBrowserSessionState
- engineer-workspace.tsx
- onAnnotDown
- createLiveBrowserDomHelpers
- getActiveSessionUser
- sheet-store.ts
- Internal Request Hub PRD
- injectSvelteComponentsFromManifest
- New Visual Work Workflow
- [trackingToken]/route.ts
- session.ts
- requester-hub.tsx
- ticket-detail-workspace.tsx
- syncEditBadgeHitProxies
- scheduleAcceptCleanup
- ticket-status-badge.tsx
- admin/systems/route.ts
- tickets/route.ts
- Project Work Rules
- live-browser-ignores.js
- tickets-workspace.tsx
- impeccable
- [ticketId]/route.ts
- mountSvelteComponentVariant
- buildColorModels
- enableInlineEdit
- app/layout.tsx
- Whole-Path Interface Polish
- Request Surface
- Component Review Checkpoint
- Interface Hardening
- postcss.config.mjs
- Documenter Role
- Finish Reviewer Role
- Manual Edit Applier Role
- Design Quality Hooks
- Onboarding Experience
- Task-Focused Product UI
- Context-Aware Command Guidance
- AGENTS.md Reference
- Document Icon
- Globe Icon
- Kotagede Jewellery Logo
- Next.js Wordmark
- Vercel Triangle Logo
- Window Icon
- assets_plates_blueprint
- transmittal-desk-brief.md

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 34 edges
2. `setLiveState()` - 33 edges
3. `resumeSession()` - 33 edges
4. `showToast()` - 31 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `getActiveSessionUser()` - 28 edges
8. `handleKeyDown()` - 27 edges
9. `cleanup()` - 27 edges
10. `buildInsertConfigureRow()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Requester Two-Item Navigation` --semantically_similar_to--> `Requester Request and Lacak Navigation`  [INFERRED] [semantically similar]
  DESIGN.md → PRODUCT.md
- `Fonnte New-Ticket Notification` --semantically_similar_to--> `Fonnte WhatsApp Notification`  [INFERRED] [semantically similar]
  PRODUCT.md → docs/PRD-ticketing-request.md
- `Google Sheets Operational Storage` --semantically_similar_to--> `Google Sheets Ticket Storage`  [INFERRED] [semantically similar]
  PRODUCT.md → docs/PRD-ticketing-request.md
- `enableInlineEdit()` --indirect_call--> `own()`  [INFERRED]
  .agents/skills/impeccable/scripts/live-browser.js → .agents/skills/impeccable/scripts/live-browser-dom.js
- `EngineerLayout()` --calls--> `getActiveSessionUser()`  [EXTRACTED]
  src/app/engineer/layout.tsx → src/lib/security/session.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Operational Request Experience** — _impeccable_surfaces_src_app_page_tsx_requester_flow, _impeccable_surfaces_src_app_page_tsx_engineer_monitoring [INFERRED 0.95]

## Communities (72 total, 20 thin omitted)

### Community 0 - "setLiveState"
Cohesion: 0.16
Nodes (39): applyEditing(), beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), clearAnnotations(), clearInsertPicking(), closeTunePopover() (+31 more)

### Community 1 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 2 - "live-browser.js"
Cohesion: 0.04
Nodes (78): applyGlobalBarLabelState(), applyLiveBarPreference(), applyParamValue(), applyPlaceholderSizingStyles(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf(), buildPickedAnchorSnapshot(), buildPlaceholderResizeHandles() (+70 more)

### Community 3 - "initPageChat"
Cohesion: 0.07
Nodes (55): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+47 more)

### Community 4 - "package.json"
Cohesion: 0.04
Nodes (45): eslintConfig, dependencies, @base-ui/react, class-variance-authority, cn, googleapis, lucide-react, next (+37 more)

### Community 5 - "initGlobalBar"
Cohesion: 0.06
Nodes (65): actionLabel(), agentHasWorkInFlight(), agentStatusText(), barPaletteForTheme(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), brandMarkSvg() (+57 more)

### Community 6 - "tickets.ts"
Cohesion: 0.09
Nodes (22): FieldsProps, formDetails, RequestForm(), RequestFormProps, RequestTypePicker(), RequestTypePickerProps, requestTypes, bugRequestSchema (+14 more)

### Community 7 - "admin-management.tsx"
Cohesion: 0.09
Nodes (22): lucide-react, SystemsPage(), UsersPage(), ActionConfirmationDialog(), ActionOperation, AdminManagement(), AdminSection, ConfirmationAction (+14 more)

### Community 8 - "documentRefForElement"
Cohesion: 0.08
Nodes (31): addManualContextText(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext(), copyEditLeafContext(), cssIdent() (+23 more)

### Community 9 - "renderDesignVisual"
Cohesion: 0.09
Nodes (34): buildCollapsible(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), copyToClipboard(), cssSafe(), designEmptyMessage(), escapeHtml() (+26 more)

### Community 10 - "positionParamsPanel"
Cohesion: 0.47
Nodes (6): closedClipPath(), hideParamsPanel(), popoverDirection(), positionParamsPanel(), setClipPath(), showParamsPanel()

### Community 11 - "connectSSE"
Cohesion: 0.18
Nodes (21): applyConfigureBarChrome(), buildCyclingRow(), buildDots(), connectSSE(), cycleVariant(), cyclingCounterText(), cyclingShownVariant(), ensureCyclingRenderable() (+13 more)

### Community 12 - "captureElementToBlob"
Cohesion: 0.10
Nodes (24): averageRgb01(), bufferToBase64(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), collectFontCssText(), compileShader() (+16 more)

### Community 13 - "actOnAgentTarget"
Cohesion: 0.11
Nodes (43): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), clearStoredManualApplyState(), declineAgentTargetBusy() (+35 more)

### Community 14 - "tracking-panel.tsx"
Cohesion: 0.13
Nodes (19): nextConfig, next, EngineerLoginForm(), LoginWorkspace(), CreatedTicket, formatDate(), getTrackingTicket(), TicketProgress() (+11 more)

### Community 15 - "[systemId]/route.ts"
Cohesion: 0.24
Nodes (10): DELETE(), PATCH(), RouteContext, runtime, deleteManagedSystem(), readRows(), readSystemRows(), readUserRows() (+2 more)

### Community 16 - "resumeSession"
Cohesion: 0.09
Nodes (51): applyParamDefaults(), applyPlaceholderDimensions(), applySavedSessionMeta(), checkpointPayload(), clampVariantIndex(), completeParameterGenerationIfReady(), completeParameterPublication(), completeSourceInjection() (+43 more)

### Community 17 - "Impeccable Skill"
Cohesion: 0.15
Nodes (22): OpenAI Skill Metadata, Adapt Playbook, Native Adaptation Playbook, Android Platform Guidance, Animate Playbook, Web Audit Playbook, Native Audit Playbook, Bolder Playbook (+14 more)

### Community 18 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "ticket-events.ts"
Cohesion: 0.21
Nodes (10): formatDate(), TicketTimeline(), TimelineEntry(), TimelineEvent, optionalText, PublicTicketEvent, TicketEvent, TicketEventActor (+2 more)

### Community 20 - "showToast"
Cohesion: 0.17
Nodes (19): abandonForeignSession(), abandonSupersededGo(), cleanup(), discardOrphanedSession(), dismissToast(), handleDiscard(), injectVariantsFromSource(), isSvelteComponentManifestPath() (+11 more)

### Community 21 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 22 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 23 - "createLiveBrowserSessionState"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 25 - "engineer-workspace.tsx"
Cohesion: 0.22
Nodes (6): EngineerLayout(), EngineerWorkspace(), EngineerWorkspaceProps, isActive(), NavigationItem, EngineerSession

### Community 26 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 27 - "createLiveBrowserDomHelpers"
Cohesion: 0.16
Nodes (11): createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor(), uiAppend() (+3 more)

### Community 28 - "getActiveSessionUser"
Cohesion: 0.18
Nodes (18): GET(), POST(), runtime, DELETE(), PATCH(), RouteContext, runtime, GET() (+10 more)

### Community 29 - "sheet-store.ts"
Cohesion: 0.12
Nodes (22): ref_node_crypto, zod, EngineerUser, getInitialAdminPassword(), loginInputSchema, PublicEngineerUser, USER_ROLES, userInputSchema (+14 more)

### Community 30 - "Internal Request Hub PRD"
Cohesion: 0.09
Nodes (23): Internal Request Hub Design System, Mobile Requester Forms, Operational Service Ledger, Requester Two-Item Navigation, Engineer Cookie Session, Fonnte WhatsApp Notification, Google Sheets Ticket Storage, Internal Request Hub PRD (+15 more)

### Community 31 - "injectSvelteComponentsFromManifest"
Cohesion: 0.16
Nodes (22): abortSvelteComponentInjection(), cleanupAcceptedSession(), clearHandled(), clearMountErrorCard(), clearScrollY(), clearSession(), handleInsertCreate(), handleServerLost() (+14 more)

### Community 32 - "New Visual Work Workflow"
Cohesion: 0.21
Nodes (14): Official DESIGN.md Format Specification, DESIGN.md Design System Documentation, Incremental Design System Extraction, Live Variant Generation, Product Truth Initialization, Native iOS Interface Guidance, Spatial Layout Thesis, Live Design Iteration (+6 more)

### Community 33 - "[trackingToken]/route.ts"
Cohesion: 0.27
Nodes (8): GET(), RouteContext, runtime, createTicketEvent(), getPublicTicketEvent(), getPublicTicket(), trackingTokenSchema, getTicketByTrackingToken()

### Community 34 - "session.ts"
Cohesion: 0.15
Nodes (21): vitest, POST(), runtime, POST(), createSessionToken(), getAuthSecret(), readSessionToken(), sanitizeUser() (+13 more)

### Community 35 - "requester-hub.tsx"
Cohesion: 0.25
Nodes (4): RequestWorkspace(), RequesterHub(), RequesterShell(), TrackingWorkspace()

### Community 36 - "ticket-detail-workspace.tsx"
Cohesion: 0.15
Nodes (13): cn, react, PageProps, DetailResponse, TicketDetailWorkspace(), FieldProps, NativeSelectField(), SelectFieldProps (+5 more)

### Community 37 - "syncEditBadgeHitProxies"
Cohesion: 0.31
Nodes (9): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy(), syncEditBadgeHitProxies() (+1 more)

### Community 38 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 39 - "ticket-status-badge.tsx"
Cohesion: 0.28
Nodes (7): @base-ui/react, class-variance-authority, statusClasses, TicketStatusBadge(), Badge(), badgeVariants, TicketStatus

### Community 40 - "admin/systems/route.ts"
Cohesion: 0.31
Nodes (8): GET(), isAdmin(), POST(), runtime, GET(), runtime, createManagedSystem(), listSystems()

### Community 41 - "tickets/route.ts"
Cohesion: 0.39
Nodes (7): GET(), POST(), runtime, requestSchema, sendFonnteTicketNotification(), createStoredTicket(), listTickets()

### Community 42 - "Project Work Rules"
Cohesion: 0.29
Nodes (7): Graphify First Source Understanding, Graphify Update Requirement, Impeccable UI Workflow, Proportional Testing, Clarify Ambiguous User Instructions, Simple Scoped Implementation, Project Work Rules

### Community 43 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 44 - "tickets-workspace.tsx"
Cohesion: 0.16
Nodes (11): Dashboard(), RecentTickets(), TicketInformation(), TicketList(), TicketsWorkspace(), getRequesterName(), getTicketSummary(), getTicketTitle() (+3 more)

### Community 45 - "impeccable"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 46 - "[ticketId]/route.ts"
Cohesion: 0.16
Nodes (17): GET(), PATCH(), RouteContext, runtime, ticketChangesSchema, client(), configuration(), ensureTab() (+9 more)

### Community 47 - "mountSvelteComponentVariant"
Cohesion: 0.20
Nodes (15): applyOriginalAttrsToSvelteAnchor(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), findInsertAnchorInDom(), findLiveElementForSvelteManifest(), getMountedSvelteComponentAnchor() (+7 more)

### Community 48 - "buildColorModels"
Cohesion: 0.33
Nodes (6): buildColorModels(), buildTypographyModels(), findProseDescription(), humanizeKey(), normalizeCssColor(), splitFontFamily()

### Community 49 - "enableInlineEdit"
Cohesion: 0.40
Nodes (5): collectEditableTextRows(), visit(), enableInlineEdit(), onInlineInput(), wrapMixedContentTextNodes()

### Community 50 - "app/layout.tsx"
Cohesion: 0.40
Nodes (3): src_app_globals, metadata, viewport

### Community 51 - "Whole-Path Interface Polish"
Cohesion: 0.67
Nodes (3): Experience Enhancement, Whole-Path Interface Polish, Quiet Design Refinement

### Community 52 - "Request Surface"
Cohesion: 0.67
Nodes (3): Engineer Monitoring, Requester Flow, Request Surface

## Knowledge Gaps
- **162 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+157 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 233 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ticket-detail-workspace.tsx` to `requester-hub.tsx`, `package.json`, `tickets.ts`, `admin-management.tsx`, `tickets-workspace.tsx`, `tracking-panel.tsx`, `app/layout.tsx`, `select.tsx`, `engineer-workspace.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `next` connect `tracking-panel.tsx` to `session.ts`, `requester-hub.tsx`, `package.json`, `ticket-detail-workspace.tsx`, `admin-management.tsx`, `tickets-workspace.tsx`, `app/layout.tsx`, `engineer-workspace.tsx`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _162 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `modern-screenshot.umd.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08897243107769423 - nodes in this community are weakly interconnected._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04089581304771178 - nodes in this community are weakly interconnected._
- **Should `initPageChat` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._