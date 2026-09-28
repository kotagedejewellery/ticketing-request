# Graph Report - ticketing-request  (2026-09-28)

## Corpus Check
- 126 files · ~609,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: .toml 4, (none) 2, .log 2)

## Summary
- 1141 nodes · 3067 edges · 72 communities (53 shown, 19 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `63424168`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- handleKeyDown
- modern-screenshot.umd.js
- live-browser.js
- initPageChat
- package.json
- el
- tickets.ts
- ticket-detail-dialog.tsx
- documentRefForElement
- renderDesignVisual
- startVariantObserver
- setLiveState
- captureElementToBlob
- initGlobalBar
- request-workspace.tsx
- [systemId]/route.ts
- resumeSession
- Impeccable Skill
- components.json
- request-form.tsx
- connectSSE
- buildSveltePropValuesV2
- compilerOptions
- createLiveBrowserSessionState
- actOnAgentTarget
- onAnnotDown
- createLiveBrowserDomHelpers
- ensureInitialAdmin
- sheet-store.ts
- Internal Request Hub PRD
- session.ts
- New Visual Work Workflow
- showBar
- login/route.ts
- layout.tsx
- react
- startVoice
- scheduleAcceptCleanup
- steerFocusLog
- admin/systems/route.ts
- tickets/route.ts
- Project Work Rules
- live-browser-ignores.js
- getActiveSessionUser
- impeccable
- [ticketId]/route.ts
- mountSvelteComponentVariant
- ticket-status-badge.tsx
- initDesignPanel
- init
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
- request-type-picker.tsx
- transmittal-desk-brief.md

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 34 edges
2. `setLiveState()` - 33 edges
3. `resumeSession()` - 33 edges
4. `showToast()` - 31 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `handleKeyDown()` - 27 edges
8. `cleanup()` - 27 edges
9. `buildInsertConfigureRow()` - 26 edges
10. `injectSvelteComponentsFromManifest()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Requester Two-Item Navigation` --semantically_similar_to--> `Requester Request and Lacak Navigation`  [INFERRED] [semantically similar]
  DESIGN.md → PRODUCT.md
- `Fonnte New-Ticket Notification` --semantically_similar_to--> `Fonnte WhatsApp Notification`  [INFERRED] [semantically similar]
  PRODUCT.md → docs/PRD-ticketing-request.md
- `Google Sheets Operational Storage` --semantically_similar_to--> `Google Sheets Ticket Storage`  [INFERRED] [semantically similar]
  PRODUCT.md → docs/PRD-ticketing-request.md
- `OpenAI Skill Metadata` --references--> `Impeccable Skill`  [INFERRED]
  .agents/skills/impeccable/agents/openai.yaml → .agents/skills/impeccable/SKILL.md
- `Clarify Playbook` --semantically_similar_to--> `Scope-Preserving Refinement`  [INFERRED] [semantically similar]
  .agents/skills/impeccable/reference/clarify.md → .agents/skills/impeccable/reference/bolder.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Operational Request Experience** — _impeccable_surfaces_src_app_page_tsx_requester_flow, _impeccable_surfaces_src_app_page_tsx_engineer_monitoring [INFERRED 0.95]

## Communities (72 total, 19 thin omitted)

### Community 0 - "handleKeyDown"
Cohesion: 0.19
Nodes (30): beginNewLiveConfiguration(), cancelEditingToPicking(), cancelInsertConfigure(), cleanupAcceptedSession(), clearAnnotations(), clearInsertPicking(), enterEditingMode(), exitConfigureToPicking() (+22 more)

### Community 1 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 2 - "live-browser.js"
Cohesion: 0.05
Nodes (63): applyGlobalBarLabelState(), applyPlaceholderSizingStyles(), bindEditBadgeProxy(), bufferToBase64(), buildPlaceholderResizeHandles(), collectFontCssText(), computeInsertPosition(), createInsertPlaceholder() (+55 more)

### Community 3 - "initPageChat"
Cohesion: 0.14
Nodes (31): agentHasWorkInFlight(), armPageChatForTyping(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), collapsePageChat(), expandPageChat(), focusPageChatInput() (+23 more)

### Community 4 - "package.json"
Cohesion: 0.04
Nodes (45): eslintConfig, dependencies, @base-ui/react, class-variance-authority, cn, googleapis, lucide-react, next (+37 more)

### Community 5 - "el"
Cohesion: 0.07
Nodes (58): actionLabel(), agentStatusText(), barPaletteForTheme(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl() (+50 more)

### Community 6 - "tickets.ts"
Cohesion: 0.10
Nodes (28): vitest, GET(), RouteContext, runtime, Dashboard(), TicketList(), EngineerSession, bugRequestSchema (+20 more)

### Community 7 - "ticket-detail-dialog.tsx"
Cohesion: 0.12
Nodes (17): ActionConfirmationDialog(), ActionOperation, AdminManagement(), ConfirmationAction, getActionCopy(), ManagedSystem, ManagedUser, getTicketHeading() (+9 more)

### Community 8 - "documentRefForElement"
Cohesion: 0.08
Nodes (32): addManualContextText(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext(), copyEditLeafContext(), cssIdent() (+24 more)

### Community 9 - "renderDesignVisual"
Cohesion: 0.08
Nodes (35): buildCollapsible(), buildColorModels(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe(), designEmptyMessage() (+27 more)

### Community 10 - "startVariantObserver"
Cohesion: 0.10
Nodes (46): applyParamDefaults(), applyParamValue(), applyPlaceholderDimensions(), buildCyclingRow(), closedClipPath(), closeTunePopover(), commitAcceptedVariantToDom(), completeParameterGenerationIfReady() (+38 more)

### Community 11 - "setLiveState"
Cohesion: 0.23
Nodes (17): abortSvelteComponentInjection(), clearHandled(), enterRecoveryWaitingForAnchor(), handleAccept(), handleServerLost(), hideShaderOverlay(), injectSvelteComponentsFromManifest(), loadSvelteComponentParams() (+9 more)

### Community 12 - "captureElementToBlob"
Cohesion: 0.12
Nodes (20): averageRgb01(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), compileShader(), cssColorToRgb01(), dominantRgb01(), findBackdropAncestor() (+12 more)

### Community 13 - "initGlobalBar"
Cohesion: 0.11
Nodes (39): applyLiveBarPreference(), brandMarkSvg(), clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hideAgentPollTooltip(), hidePendingApplyDock(), initGlobalBar() (+31 more)

### Community 14 - "request-workspace.tsx"
Cohesion: 0.11
Nodes (20): nextConfig, lucide-react, next, LoginWorkspace(), CreatedTicket, RequestWorkspace(), RequesterHub(), RequesterShell() (+12 more)

### Community 15 - "[systemId]/route.ts"
Cohesion: 0.24
Nodes (10): DELETE(), PATCH(), RouteContext, runtime, deleteManagedSystem(), readRows(), readSystemRows(), readUserRows() (+2 more)

### Community 16 - "resumeSession"
Cohesion: 0.13
Nodes (27): applySavedSessionMeta(), checkpointPayload(), clampVariantIndex(), findActiveSessionSummary(), findAdoptableServerSession(), findAnyVariantsWrapper(), isFrameworkComponentPreviewMode(), isSessionHandled() (+19 more)

### Community 17 - "Impeccable Skill"
Cohesion: 0.15
Nodes (22): OpenAI Skill Metadata, Adapt Playbook, Native Adaptation Playbook, Android Platform Guidance, Animate Playbook, Web Audit Playbook, Native Audit Playbook, Bolder Playbook (+14 more)

### Community 18 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "request-form.tsx"
Cohesion: 0.15
Nodes (7): FieldsProps, formDetails, RequestForm(), RequestFormProps, enhancementRequestSchema, URGENCY_LEVELS, WORK_IMPACTS

### Community 20 - "connectSSE"
Cohesion: 0.16
Nodes (23): abandonForeignSession(), abandonSupersededGo(), cleanup(), clearScrollY(), clearSession(), connectSSE(), discardOrphanedSession(), dismissToast() (+15 more)

### Community 21 - "buildSveltePropValuesV2"
Cohesion: 0.18
Nodes (12): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), escapeRegExp() (+4 more)

### Community 22 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 23 - "createLiveBrowserSessionState"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 25 - "actOnAgentTarget"
Cohesion: 0.20
Nodes (21): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+13 more)

### Community 26 - "onAnnotDown"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 27 - "createLiveBrowserDomHelpers"
Cohesion: 0.12
Nodes (16): collectEditableTextRows(), visit(), createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable() (+8 more)

### Community 28 - "ensureInitialAdmin"
Cohesion: 0.24
Nodes (13): DELETE(), PATCH(), RouteContext, runtime, hashPassword(), sanitizeUser(), appendRow(), clearRow() (+5 more)

### Community 29 - "sheet-store.ts"
Cohesion: 0.15
Nodes (19): ref_node_crypto, zod, EngineerUser, getInitialAdminPassword(), PublicEngineerUser, USER_ROLES, userInputSchema, userRecordSchema (+11 more)

### Community 30 - "Internal Request Hub PRD"
Cohesion: 0.09
Nodes (23): Internal Request Hub Design System, Mobile Requester Forms, Operational Service Ledger, Requester Two-Item Navigation, Engineer Cookie Session, Fonnte WhatsApp Notification, Google Sheets Ticket Storage, Internal Request Hub PRD (+15 more)

### Community 31 - "session.ts"
Cohesion: 0.26
Nodes (9): POST(), createSessionToken(), getAuthSecret(), readSessionToken(), SessionUser, sign(), clearSessionUser(), getSessionUser() (+1 more)

### Community 32 - "New Visual Work Workflow"
Cohesion: 0.21
Nodes (14): Official DESIGN.md Format Specification, DESIGN.md Design System Documentation, Incremental Design System Extraction, Live Variant Generation, Product Truth Initialization, Native iOS Interface Guidance, Spatial Layout Thesis, Live Design Iteration (+6 more)

### Community 33 - "showBar"
Cohesion: 0.15
Nodes (21): applyEditing(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf(), buildPickedAnchorSnapshot(), cancelEditing(), captureAndEmit(), clearMountErrorCard(), disableInlineEdit() (+13 more)

### Community 34 - "login/route.ts"
Cohesion: 0.30
Nodes (11): POST(), runtime, loginInputSchema, verifyPassword(), findEngineerUser(), attemptsByKey, canAttemptLogin(), recentAttempts() (+3 more)

### Community 35 - "layout.tsx"
Cohesion: 0.40
Nodes (3): src_app_globals, metadata, viewport

### Community 36 - "react"
Cohesion: 0.18
Nodes (11): cn, react, EngineerLoginForm(), FieldProps, NativeSelectField(), SelectFieldProps, TextAreaField(), TextField() (+3 more)

### Community 37 - "startVoice"
Cohesion: 0.24
Nodes (13): applyConfigureBarChrome(), configureVoiceContext(), finishVoiceSession(), isEmbeddedPreviewBrowser(), releaseVoiceEngine(), startVoice(), steerSpeechRecognitionCtor(), steerVoiceErrorMessage() (+5 more)

### Community 38 - "scheduleAcceptCleanup"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 39 - "steerFocusLog"
Cohesion: 0.29
Nodes (11): attachSteerFocusDebug(), attachSteerFocusGuard(), clearSteerFocusRecoverTimer(), focusConfigureInput(), notePagePointerDown(), pageHasHostTextSelection(), scheduleSteerFocusRecover(), shouldFocusSteerChat() (+3 more)

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

### Community 44 - "getActiveSessionUser"
Cohesion: 0.27
Nodes (8): GET(), POST(), runtime, GET(), EngineerPage(), EngineerWorkspace(), listEngineerUsers(), getActiveSessionUser()

### Community 45 - "impeccable"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 46 - "[ticketId]/route.ts"
Cohesion: 0.22
Nodes (10): PATCH(), RouteContext, runtime, changeTicket(), ticketChangesSchema, client(), configuration(), ensureTab() (+2 more)

### Community 47 - "mountSvelteComponentVariant"
Cohesion: 0.15
Nodes (23): applyOriginalAttrsToSvelteAnchor(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), elementMatchesOriginalMarkup(), findInsertAnchorInDom(), findLiveElementForOriginalMarkup() (+15 more)

### Community 48 - "ticket-status-badge.tsx"
Cohesion: 0.28
Nodes (7): @base-ui/react, class-variance-authority, statusClasses, TicketStatusBadge(), Badge(), badgeVariants, TicketStatus

### Community 49 - "initDesignPanel"
Cohesion: 0.39
Nodes (8): buildDesignHeader(), designPanelCss(), fetchDesignSystem(), initDesignPanel(), loadDesignPrefs(), renderDesignChrome(), saveDesignPrefs(), toggleDesignPanel()

### Community 50 - "init"
Cohesion: 0.38
Nodes (7): cursorForInsertAxis(), handleMouseMove(), hideInsertLine(), init(), initHighlight(), setPageInteractionCursor(), syncPageInteractionCursor()

### Community 51 - "Whole-Path Interface Polish"
Cohesion: 0.67
Nodes (3): Experience Enhancement, Whole-Path Interface Polish, Quiet Design Refinement

### Community 52 - "Request Surface"
Cohesion: 0.67
Nodes (3): Engineer Monitoring, Requester Flow, Request Surface

### Community 70 - "request-type-picker.tsx"
Cohesion: 0.33
Nodes (5): assets_plates_blueprint, RequestTypePicker(), RequestTypePickerProps, requestTypes, RequestInput

## Knowledge Gaps
- **151 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+146 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 214 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `request-workspace.tsx` to `layout.tsx`, `package.json`, `request-type-picker.tsx`, `tickets.ts`, `getActiveSessionUser`, `session.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _151 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `modern-screenshot.umd.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08897243107769423 - nodes in this community are weakly interconnected._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.054563492063492064 - nodes in this community are weakly interconnected._
- **Should `initPageChat` be split into smaller, more focused modules?**
  _Cohesion score 0.13763440860215054 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._