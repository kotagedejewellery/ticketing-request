# Graph Report - ticketing-request  (2026-09-27)

## Corpus Check
- 1 files · ~147,917 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1137 nodes · 3019 edges · 70 communities (53 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 82 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Browser Editing Agent
- Screenshot Runtime
- Live Browser Runtime
- Page Chat Controls
- Project Dependencies
- Configure Bar Controls
- Ticket Tracking Dashboard
- Admin Management
- Manual Editing Context
- Design System Renderer
- Source Injection Workflow
- Svelte Component Injection
- Screenshot Capture Pipeline
- Manual Apply Workflow
- Engineer Login Interface
- System Management Mutations
- Live Session Management
- Impeccable Skill Metadata
- Shadcn Configuration
- Request Form Fields
- Editor Session Cleanup
- Svelte DOM Utilities
- TypeScript Configuration
- Live Browser Session
- UI Primitives
- Agent Target Actions
- Editor Pin Overlay
- Live Browser DOM
- Engineer User API
- Authentication Security
- Product Design Docs
- User Session Ticket Update
- Impeccable Reference Docs
- Parameter Controls
- Login Authentication API
- Application Routing Dashboard
- Requester Tracking Routes
- Variant Cycling Controls
- Svelte Session Recovery
- Edit Badge UI
- System Management API
- Ticket Submission API
- Project Agent Rules
- Browser Ignore Rules
- System Ticket Domain
- Impeccable CLI
- Design Color Typography
- Svelte Runtime Loading
- Inline Text Editing
- Project Configuration Docs
- Implementation Planning Docs
- Interface Polish Guidance
- Requester Product Surface
- Component Review Guidance
- Interface Hardening
- PostCSS Configuration
- Documentation Role
- Completion Reviewer
- Manual Editing Role
- Quality Hooks
- Onboarding Guidance
- Operational UI Guidance
- Command Routing Guidance
- AGENTS Reference
- Document Icon
- Globe Icon
- Project Logo
- Next.js Wordmark
- Vercel Logo
- Window Icon

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 34 edges
2. `setLiveState()` - 33 edges
3. `resumeSession()` - 33 edges
4. `showToast()` - 31 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `handleKeyDown()` - 27 edges
8. `cleanup()` - 27 edges
9. `injectSvelteComponentsFromManifest()` - 26 edges
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

## Communities (70 total, 17 thin omitted)

### Community 0 - "Browser Editing Agent"
Cohesion: 0.06
Nodes (88): agentStatusText(), applyEditing(), barPaletteForTheme(), beginNewLiveConfiguration(), brandMarkSvg(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf(), buildPickedAnchorSnapshot() (+80 more)

### Community 1 - "Screenshot Runtime"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 2 - "Live Browser Runtime"
Cohesion: 0.06
Nodes (53): applyGlobalBarLabelState(), applyLiveBarPreference(), applyPlaceholderSizingStyles(), bufferToBase64(), buildPlaceholderResizeHandles(), collectFontCssText(), computeInsertPosition(), copyToClipboard() (+45 more)

### Community 3 - "Page Chat Controls"
Cohesion: 0.08
Nodes (52): agentHasWorkInFlight(), armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer() (+44 more)

### Community 4 - "Project Dependencies"
Cohesion: 0.04
Nodes (45): eslintConfig, dependencies, @base-ui/react, class-variance-authority, cn, googleapis, lucide-react, next (+37 more)

### Community 5 - "Configure Bar Controls"
Cohesion: 0.08
Nodes (46): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+38 more)

### Community 6 - "Ticket Tracking Dashboard"
Cohesion: 0.11
Nodes (26): GET(), RouteContext, runtime, TicketList(), statusClasses, TicketStatusBadge(), bugRequestSchema, changeTicket() (+18 more)

### Community 7 - "Admin Management"
Cohesion: 0.11
Nodes (22): react, ActionConfirmationDialog(), ActionOperation, AdminManagement(), ConfirmationAction, getActionCopy(), ManagedSystem, ManagedUser (+14 more)

### Community 8 - "Manual Editing Context"
Cohesion: 0.08
Nodes (31): addManualContextText(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext(), copyEditLeafContext(), cssIdent() (+23 more)

### Community 9 - "Design System Renderer"
Cohesion: 0.11
Nodes (30): buildCollapsible(), buildDesignHeader(), buildListHtml(), buildRadiiModels(), designEmptyMessage(), escapeHtml(), fetchDesignSystem(), fontStack() (+22 more)

### Community 10 - "Source Injection Workflow"
Cohesion: 0.16
Nodes (29): applyPlaceholderDimensions(), closeTunePopover(), commitAcceptedVariantToDom(), completeParameterGenerationIfReady(), completeParameterPublication(), completeSourceInjection(), ensureInsertPlaceholder(), finalizeInsertSession() (+21 more)

### Community 11 - "Svelte Component Injection"
Cohesion: 0.13
Nodes (28): abortSvelteComponentInjection(), applyOriginalAttrsToSvelteAnchor(), clearHandled(), clearMountErrorCard(), commitAcceptedSvelteComponentToDom(), findInsertAnchorInDom(), findLiveElementForSvelteManifest(), getMountedSvelteComponentAnchor() (+20 more)

### Community 12 - "Screenshot Capture Pipeline"
Cohesion: 0.10
Nodes (25): averageRgb01(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), checkpointPayload(), compileShader(), cssColorToRgb01() (+17 more)

### Community 13 - "Manual Apply Workflow"
Cohesion: 0.18
Nodes (26): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+18 more)

### Community 14 - "Engineer Login Interface"
Cohesion: 0.14
Nodes (17): lucide-react, EngineerLoginForm(), LoginWorkspace(), RequestTypePicker(), RequestTypePickerProps, requestTypes, CreatedTicket, formatDate() (+9 more)

### Community 15 - "System Management Mutations"
Cohesion: 0.14
Nodes (24): DELETE(), PATCH(), RouteContext, runtime, PATCH(), TicketChanges, ticketRecordSchema, client() (+16 more)

### Community 16 - "Live Session Management"
Cohesion: 0.16
Nodes (24): applySavedSessionMeta(), clampVariantIndex(), clearSession(), connectSSE(), findActiveSessionSummary(), findAdoptableServerSession(), findAnyVariantsWrapper(), isFrameworkComponentPreviewMode() (+16 more)

### Community 17 - "Impeccable Skill Metadata"
Cohesion: 0.14
Nodes (22): OpenAI Skill Metadata, Adapt Playbook, Native Adaptation Playbook, Android Platform Guidance, Animate Playbook, Web Audit Playbook, Native Audit Playbook, Bolder Playbook (+14 more)

### Community 18 - "Shadcn Configuration"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "Request Form Fields"
Cohesion: 0.11
Nodes (13): FieldProps, NativeSelectField(), SelectFieldProps, TextAreaField(), TextField(), FieldsProps, formDetails, RequestForm() (+5 more)

### Community 20 - "Editor Session Cleanup"
Cohesion: 0.16
Nodes (20): abandonForeignSession(), abandonSupersededGo(), cleanup(), discardOrphanedSession(), dismissToast(), ensureCyclingRenderable(), handleDiscard(), injectVariantsFromSource() (+12 more)

### Community 21 - "Svelte DOM Utilities"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 22 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 23 - "Live Browser Session"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 24 - "UI Primitives"
Cohesion: 0.14
Nodes (5): @base-ui/react, class-variance-authority, cn, Badge(), badgeVariants

### Community 25 - "Agent Target Actions"
Cohesion: 0.29
Nodes (17): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+9 more)

### Community 26 - "Editor Pin Overlay"
Cohesion: 0.20
Nodes (17): beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay(), localCoords() (+9 more)

### Community 27 - "Live Browser DOM"
Cohesion: 0.16
Nodes (11): createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor(), uiAppend() (+3 more)

### Community 28 - "Engineer User API"
Cohesion: 0.18
Nodes (15): GET(), POST(), runtime, DELETE(), PATCH(), RouteContext, runtime, appendRow() (+7 more)

### Community 29 - "Authentication Security"
Cohesion: 0.17
Nodes (14): ref_node_crypto, vitest, createSessionToken(), EngineerUser, getInitialAdminPassword(), hashPassword(), loginInputSchema, PublicEngineerUser (+6 more)

### Community 30 - "Product Design Docs"
Cohesion: 0.14
Nodes (15): Internal Request Hub Design System, Mobile Requester Forms, Operational Service Ledger, Requester Two-Item Navigation, Engineer Cookie Session, Fonnte WhatsApp Notification, Google Sheets Ticket Storage, Internal Request Hub PRD (+7 more)

### Community 31 - "User Session Ticket Update"
Cohesion: 0.19
Nodes (11): POST(), GET(), RouteContext, runtime, getAuthSecret(), SessionUser, ticketChangesSchema, clearSessionUser() (+3 more)

### Community 32 - "Impeccable Reference Docs"
Cohesion: 0.21
Nodes (14): Official DESIGN.md Format Specification, DESIGN.md Design System Documentation, Incremental Design System Extraction, Live Variant Generation, Product Truth Initialization, Native iOS Interface Guidance, Spatial Layout Thesis, Live Design Iteration (+6 more)

### Community 33 - "Parameter Controls"
Cohesion: 0.16
Nodes (14): applyParamDefaults(), applyParamValue(), buildParamsPanel(), closedClipPath(), formatRangeValue(), openTunePopover(), popoverDirection(), positionParamsPanel() (+6 more)

### Community 34 - "Login Authentication API"
Cohesion: 0.31
Nodes (11): POST(), runtime, sanitizeUser(), verifyPassword(), findEngineerUser(), attemptsByKey, canAttemptLogin(), recentAttempts() (+3 more)

### Community 35 - "Application Routing Dashboard"
Cohesion: 0.18
Nodes (7): nextConfig, next, src_app_globals, metadata, viewport, Dashboard(), EngineerWorkspace()

### Community 36 - "Requester Tracking Routes"
Cohesion: 0.21
Nodes (6): RequestWorkspace(), RequesterHub(), RequesterShell(), TrackingPanel(), TrackingWorkspace(), buttonVariants

### Community 37 - "Variant Cycling Controls"
Cohesion: 0.21
Nodes (12): buildCyclingRow(), cycleVariant(), cyclingCounterText(), cyclingShownVariant(), handleAccept(), isVariantShown(), maybeCompleteAcceptedSession(), navBtn() (+4 more)

### Community 38 - "Svelte Session Recovery"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 39 - "Edit Badge UI"
Cohesion: 0.27
Nodes (10): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), positionEditBadge(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy() (+2 more)

### Community 40 - "System Management API"
Cohesion: 0.31
Nodes (8): GET(), isAdmin(), POST(), runtime, GET(), runtime, createManagedSystem(), listSystems()

### Community 41 - "Ticket Submission API"
Cohesion: 0.39
Nodes (7): GET(), POST(), runtime, requestSchema, sendFonnteTicketNotification(), createStoredTicket(), listTickets()

### Community 42 - "Project Agent Rules"
Cohesion: 0.29
Nodes (7): Graphify First Source Understanding, Graphify Update Requirement, Impeccable UI Workflow, Proportional Testing, Clarify Ambiguous User Instructions, Simple Scoped Implementation, Project Work Rules

### Community 43 - "Browser Ignore Rules"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 44 - "System Ticket Domain"
Cohesion: 0.38
Nodes (5): zod, createSystem(), ManagedSystem, systemInputSchema, systemRecordSchema

### Community 45 - "Impeccable CLI"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 46 - "Design Color Typography"
Cohesion: 0.33
Nodes (6): buildColorModels(), buildTypographyModels(), findProseDescription(), humanizeKey(), normalizeCssColor(), splitFontFamily()

### Community 47 - "Svelte Runtime Loading"
Cohesion: 0.40
Nodes (6): componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), importFirstReachable(), loadSvelteRuntime(), probePreviewTree()

### Community 48 - "Inline Text Editing"
Cohesion: 0.40
Nodes (5): collectEditableTextRows(), visit(), enableInlineEdit(), onInlineInput(), wrapMixedContentTextNodes()

### Community 49 - "Project Configuration Docs"
Cohesion: 0.50
Nodes (4): Fonnte Configuration, Initial Admin Bootstrap, Internal Request Hub README, Production Configuration

### Community 50 - "Implementation Planning Docs"
Cohesion: 0.67
Nodes (4): Implementation Plan, Local Demo Persistence Decision, Requester-Safe Progress Separation, Implementation Tasks

### Community 51 - "Interface Polish Guidance"
Cohesion: 0.67
Nodes (3): Experience Enhancement, Whole-Path Interface Polish, Quiet Design Refinement

### Community 52 - "Requester Product Surface"
Cohesion: 0.67
Nodes (3): Engineer Monitoring, Requester Flow, Request Surface

## Knowledge Gaps
- **151 isolated node(s):** `RequestTypePickerProps`, `CreatedTicket`, `TrackingPanelProps`, `RowWithIndex`, `SheetTab` (+146 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 215 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Application Routing Dashboard` to `Project Dependencies`, `User Session Ticket Update`, `Engineer Login Interface`, `Requester Tracking Routes`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `enableInlineEdit()` connect `Inline Text Editing` to `Browser Editing Agent`, `Live Browser Runtime`, `Live Browser DOM`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `RequestTypePickerProps`, `CreatedTicket`, `TrackingPanelProps` to the rest of the system?**
  _151 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Browser Editing Agent` be split into smaller, more focused modules?**
  _Cohesion score 0.059096459096459095 - nodes in this community are weakly interconnected._
- **Should `Screenshot Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.08897243107769423 - nodes in this community are weakly interconnected._
- **Should `Live Browser Runtime` be split into smaller, more focused modules?**
  _Cohesion score 0.061495457721872815 - nodes in this community are weakly interconnected._