# Graph Report - ticketing-request  (2026-10-02)

## Corpus Check
- 136 files · ~611,940 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .toml 4, (none) 2, .log 2)

## Summary
- 1195 nodes · 3324 edges · 72 communities (53 shown, 19 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5e47cf58`
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
- ticket-detail-dialog.tsx
- normalizeManualContextText
- renderDesignVisual
- refreshParamsPanel
- showBar
- captureElementToBlob
- actOnAgentTarget
- tracking-panel.tsx
- sheet-store.ts
- resumeSession
- Impeccable Skill
- components.json
- request-form.tsx
- connectSSE
- resolveLiveInjectionAnchor
- compilerOptions
- createLiveBrowserSessionState
- select.tsx
- engineer-workspace.tsx
- onAnnotDown
- createLiveBrowserDomHelpers
- ensureInitialAdmin
- session.ts
- Internal Request Hub PRD
- cleanup
- New Visual Work Workflow
- ticket-events.ts
- login/route.ts
- requester-hub.tsx
- admin-management.tsx
- syncEditBadgeHitProxies
- scheduleAcceptCleanup
- TicketStatusBadge
- listSystems
- tickets/route.ts
- Project Work Rules
- live-browser-ignores.js
- getActiveSessionUser
- impeccable
- [ticketId]/route.ts
- mountSvelteComponentVariant
- restoreSessionWithoutWrapper
- documentRefForElement
- scopeCssBlock
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
- `OpenAI Skill Metadata` --references--> `Impeccable Skill`  [INFERRED]
  .agents/skills/impeccable/agents/openai.yaml → .agents/skills/impeccable/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Operational Request Experience** — _impeccable_surfaces_src_app_page_tsx_requester_flow, _impeccable_surfaces_src_app_page_tsx_engineer_monitoring [INFERRED 0.95]

## Communities (72 total, 19 thin omitted)

### Community 0 - "setLiveState"
Cohesion: 0.18
Nodes (34): applyEditing(), beginNewLiveConfiguration(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure(), clearAnnotations(), clearInsertPicking(), closeTunePopover() (+26 more)

### Community 1 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 2 - "live-browser.js"
Cohesion: 0.05
Nodes (67): applyGlobalBarLabelState(), applyParamValue(), applyPlaceholderSizingStyles(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf(), buildPickedAnchorSnapshot(), buildPlaceholderResizeHandles(), commitAcceptedVariantToDom() (+59 more)

### Community 3 - "initPageChat"
Cohesion: 0.07
Nodes (53): armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer(), collapsePageChat() (+45 more)

### Community 4 - "package.json"
Cohesion: 0.04
Nodes (45): eslintConfig, dependencies, @base-ui/react, class-variance-authority, cn, googleapis, lucide-react, next (+37 more)

### Community 5 - "initGlobalBar"
Cohesion: 0.05
Nodes (72): actionLabel(), agentHasWorkInFlight(), agentStatusText(), applyLiveBarPreference(), barPaletteForTheme(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover() (+64 more)

### Community 6 - "tickets.ts"
Cohesion: 0.09
Nodes (34): EngineerPage(), TicketsPage(), Dashboard(), Metric(), RecentTickets(), EmptyState(), FilterSelect(), TicketList() (+26 more)

### Community 7 - "ticket-detail-dialog.tsx"
Cohesion: 0.23
Nodes (15): ActionConfirmationDialog(), getTicketHeading(), InfoRow(), TicketDetailDialog(), TicketDetailDialogProps, TicketInformation(), Dialog(), DialogContent() (+7 more)

### Community 8 - "normalizeManualContextText"
Cohesion: 0.13
Nodes (19): addManualContextText(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), cssIdent(), directMixedTextRestoreNodes(), findManualEditRestoreElement() (+11 more)

### Community 9 - "renderDesignVisual"
Cohesion: 0.08
Nodes (36): buildCollapsible(), buildColorModels(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe(), designEmptyMessage() (+28 more)

### Community 10 - "refreshParamsPanel"
Cohesion: 0.26
Nodes (12): applyParamDefaults(), closedClipPath(), hideParamsPanel(), mountedParameterCount(), openTunePopover(), parseVariantParams(), popoverDirection(), positionParamsPanel() (+4 more)

### Community 11 - "showBar"
Cohesion: 0.14
Nodes (20): abandonForeignSession(), abandonSupersededGo(), applyConfigureBarChrome(), buildCyclingRow(), buildDots(), cycleVariant(), dismissToast(), ensureCyclingRenderable() (+12 more)

### Community 12 - "captureElementToBlob"
Cohesion: 0.10
Nodes (24): averageRgb01(), bufferToBase64(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), collectFontCssText(), compileShader() (+16 more)

### Community 13 - "actOnAgentTarget"
Cohesion: 0.11
Nodes (43): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), clearStoredManualApplyState(), declineAgentTargetBusy() (+35 more)

### Community 14 - "tracking-panel.tsx"
Cohesion: 0.21
Nodes (18): LoginPage(), LoginWorkspace(), RequestTypePicker(), CreatedTicket, RequestWorkspace(), formatDate(), getTrackingTicket(), TicketProgress() (+10 more)

### Community 15 - "sheet-store.ts"
Cohesion: 0.14
Nodes (25): DELETE(), PATCH(), RouteContext, runtime, clearRow(), client(), configuration(), deleteManagedSystem() (+17 more)

### Community 16 - "resumeSession"
Cohesion: 0.17
Nodes (27): applyPlaceholderDimensions(), checkpointPayload(), ensureInsertPlaceholder(), finalizeInsertSession(), findVariantsWrapper(), getVisibleVariantEl(), isInsertGeneratingSession(), pickVariantContent() (+19 more)

### Community 17 - "Impeccable Skill"
Cohesion: 0.15
Nodes (22): OpenAI Skill Metadata, Adapt Playbook, Native Adaptation Playbook, Android Platform Guidance, Animate Playbook, Web Audit Playbook, Native Audit Playbook, Bolder Playbook (+14 more)

### Community 18 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "request-form.tsx"
Cohesion: 0.29
Nodes (15): FieldNote(), FieldProps, NativeSelectField(), SelectFieldProps, TextAreaField(), TextField(), BugFields(), CommonFields() (+7 more)

### Community 20 - "connectSSE"
Cohesion: 0.16
Nodes (29): abortSvelteComponentInjection(), applySavedSessionMeta(), completeParameterGenerationIfReady(), completeParameterPublication(), completeSourceInjection(), connectSSE(), discardOrphanedSession(), enterRecoveryWaitingForAnchor() (+21 more)

### Community 21 - "resolveLiveInjectionAnchor"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 22 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 23 - "createLiveBrowserSessionState"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 24 - "select.tsx"
Cohesion: 0.24
Nodes (3): SelectContent(), SelectScrollDownButton(), SelectScrollUpButton()

### Community 25 - "engineer-workspace.tsx"
Cohesion: 0.16
Nodes (13): nextConfig, next, EngineerLayout(), src_app_globals, metadata, viewport, EngineerWorkspace(), EngineerWorkspaceProps (+5 more)

### Community 26 - "onAnnotDown"
Cohesion: 0.16
Nodes (20): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+12 more)

### Community 27 - "createLiveBrowserDomHelpers"
Cohesion: 0.16
Nodes (11): createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor(), uiAppend() (+3 more)

### Community 28 - "ensureInitialAdmin"
Cohesion: 0.31
Nodes (10): GET(), POST(), runtime, getInitialAdminPassword(), hashPassword(), createEngineerUser(), ensureInitialAdmin(), listEngineerUsers() (+2 more)

### Community 29 - "session.ts"
Cohesion: 0.15
Nodes (18): ref_node_crypto, POST(), createSessionToken(), EngineerUser, getAuthSecret(), loginInputSchema, PublicEngineerUser, readSessionToken() (+10 more)

### Community 30 - "Internal Request Hub PRD"
Cohesion: 0.09
Nodes (23): Internal Request Hub Design System, Mobile Requester Forms, Operational Service Ledger, Requester Two-Item Navigation, Engineer Cookie Session, Fonnte WhatsApp Notification, Google Sheets Ticket Storage, Internal Request Hub PRD (+15 more)

### Community 31 - "cleanup"
Cohesion: 0.19
Nodes (21): cleanup(), cleanupAcceptedSession(), clearHandled(), clearMountErrorCard(), clearScrollY(), clearSession(), extractContext(), handleGo() (+13 more)

### Community 32 - "New Visual Work Workflow"
Cohesion: 0.21
Nodes (14): Official DESIGN.md Format Specification, DESIGN.md Design System Documentation, Incremental Design System Extraction, Live Variant Generation, Product Truth Initialization, Native iOS Interface Guidance, Spatial Layout Thesis, Live Design Iteration (+6 more)

### Community 33 - "ticket-events.ts"
Cohesion: 0.17
Nodes (14): GET(), RouteContext, runtime, createTicketEvent(), getPublicTicketEvent(), optionalText, PublicTicketEvent, TicketEvent (+6 more)

### Community 34 - "login/route.ts"
Cohesion: 0.31
Nodes (10): POST(), runtime, sanitizeUser(), verifyPassword(), findEngineerUser(), attemptsByKey, canAttemptLogin(), recentAttempts() (+2 more)

### Community 35 - "requester-hub.tsx"
Cohesion: 0.38
Nodes (5): TrackingPage(), Home(), RequesterHub(), RequesterShell(), TrackingWorkspace()

### Community 36 - "admin-management.tsx"
Cohesion: 0.12
Nodes (25): cn, lucide-react, react, SystemsPage(), PageProps, TicketDetailPage(), UsersPage(), ActionOperation (+17 more)

### Community 37 - "syncEditBadgeHitProxies"
Cohesion: 0.31
Nodes (9): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy(), syncEditBadgeHitProxies() (+1 more)

### Community 38 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 39 - "TicketStatusBadge"
Cohesion: 0.23
Nodes (12): @base-ui/react, class-variance-authority, statusClasses, TicketStatusBadge(), formatDate(), TicketTimeline(), TimelineEntry(), TimelineEvent (+4 more)

### Community 40 - "listSystems"
Cohesion: 0.19
Nodes (11): vitest, zod, GET(), runtime, createSystem(), ManagedSystem, systemInputSchema, systemRecordSchema (+3 more)

### Community 41 - "tickets/route.ts"
Cohesion: 0.27
Nodes (10): GET(), POST(), runtime, requestSchema, sendFonnteTicketNotification(), appendRow(), appendTicketEvent(), createStoredTicket() (+2 more)

### Community 42 - "Project Work Rules"
Cohesion: 0.29
Nodes (7): Graphify First Source Understanding, Graphify Update Requirement, Impeccable UI Workflow, Proportional Testing, Clarify Ambiguous User Instructions, Simple Scoped Implementation, Project Work Rules

### Community 43 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 44 - "getActiveSessionUser"
Cohesion: 0.23
Nodes (11): GET(), isAdmin(), POST(), runtime, DELETE(), PATCH(), RouteContext, runtime (+3 more)

### Community 45 - "impeccable"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 46 - "[ticketId]/route.ts"
Cohesion: 0.32
Nodes (7): GET(), PATCH(), RouteContext, runtime, ticketChangesSchema, getTicket(), updateStoredTicket()

### Community 47 - "mountSvelteComponentVariant"
Cohesion: 0.16
Nodes (18): applyOriginalAttrsToSvelteAnchor(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), cyclingCounterText(), cyclingShownVariant(), describeMountFailure(), detectDevServerBase(), findInsertAnchorInDom() (+10 more)

### Community 48 - "restoreSessionWithoutWrapper"
Cohesion: 0.22
Nodes (13): clampVariantIndex(), findActiveSessionSummary(), findAdoptableServerSession(), findAnyVariantsWrapper(), isSessionHandled(), isTerminalSessionSummary(), normalizePagePath(), pageMatchesCurrent() (+5 more)

### Community 49 - "documentRefForElement"
Cohesion: 0.13
Nodes (17): collectEditableTextRows(), visit(), copyEditContainerContext(), copyEditLeafContext(), documentRefClassSuffix(), documentRefForElement(), documentRefIdSuffix(), documentRefSegment() (+9 more)

### Community 50 - "scopeCssBlock"
Cohesion: 0.33
Nodes (6): findMatchingCssBrace(), prefixCssSelectors(), scopeCssBlock(), shouldScopeNestedCssAtRule(), splitCssSelectorList(), unwrapSvelteGlobalSelector()

### Community 51 - "Whole-Path Interface Polish"
Cohesion: 0.67
Nodes (3): Experience Enhancement, Whole-Path Interface Polish, Quiet Design Refinement

### Community 52 - "Request Surface"
Cohesion: 0.67
Nodes (3): Engineer Monitoring, Requester Flow, Request Surface

## Knowledge Gaps
- **162 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+157 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 205 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `engineer-workspace.tsx` to `requester-hub.tsx`, `package.json`, `admin-management.tsx`, `tickets.ts`, `tracking-panel.tsx`, `session.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `react` connect `admin-management.tsx` to `requester-hub.tsx`, `package.json`, `tickets.ts`, `ticket-detail-dialog.tsx`, `tracking-panel.tsx`, `request-form.tsx`, `select.tsx`, `engineer-workspace.tsx`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _162 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `modern-screenshot.umd.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08897243107769423 - nodes in this community are weakly interconnected._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04697102721685689 - nodes in this community are weakly interconnected._
- **Should `initPageChat` be split into smaller, more focused modules?**
  _Cohesion score 0.07402031930333818 - nodes in this community are weakly interconnected._