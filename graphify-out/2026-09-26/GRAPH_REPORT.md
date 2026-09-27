# Graph Report - ticketing-request  (2026-09-26)

## Corpus Check
- 53 files · ~138,857 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 987 nodes · 2684 edges · 57 communities (40 shown, 17 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 86 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Live Configuration UI
- Svelte Component Injection
- Agent Session Coordination
- Screenshot Runtime
- Live Mode Control Bar
- Live Browser Utilities
- Session Recovery Logic
- DOM Pin Annotations
- Design Inspector UI
- Manual Edit Workflow
- Pending Edit State
- Form Field Components
- Dashboard Tests
- Application Shell
- Impeccable Platform Guidance
- DOM Editing Helpers
- UI Component Setup
- Ticket Detail UI
- Request Type Picker
- Svelte Expression Handling
- TypeScript Configuration
- Live Session State
- Agent Target Handling
- Package Metadata
- Design Documentation
- Product Requirements
- Runtime Dependencies
- Edit Badge Interaction
- Development Dependencies
- Agent Instructions
- Design Panel
- Ticket Status UI
- Live Browser Ignore Rules
- Next Application Setup
- Impeccable Launcher
- Manual Reference Parsing
- Package Scripts
- Annotation Overlay
- ESLint Configuration
- Design Refinement
- Asset Production Review
- Interface Hardening
- PostCSS Configuration
- Documenter Role
- Finish Reviewer Role
- Manual Edit Applier
- Design Quality Hooks
- Onboarding Experience
- Task-Focused UI Guidance
- Command Routing
- Native Build Allowlist
- Document Icon
- Globe Icon
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
9. `buildInsertConfigureRow()` - 26 edges
10. `injectSvelteComponentsFromManifest()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Local Demo Persistence Decision` --semantically_similar_to--> `Browser LocalStorage Demo Repository`  [INFERRED] [semantically similar]
  tasks/plan.md → README.md
- `Requester-Safe Progress Separation` --conceptually_related_to--> `Requester Ticket Tracking`  [INFERRED]
  tasks/plan.md → docs/PRD-ticketing-request.md
- `AGENTS.md Reference` --references--> `Next.js Agent Rules`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `Internal Request Hub` --references--> `Internal Request Hub PRD`  [EXTRACTED]
  README.md → docs/PRD-ticketing-request.md
- `Implementation Plan` --references--> `Internal Request Hub PRD`  [EXTRACTED]
  tasks/plan.md → docs/PRD-ticketing-request.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Project Work Guardrails** — agents_graphify_first, agents_graphify_updates, agents_scope_discipline, agents_proportional_testing, agents_user_clarification [EXTRACTED 1.00]
- **Internal Request Hub Core Workflow** — docs_prd_ticketing_request_three_request_types, docs_prd_ticketing_request_spreadsheet_storage, docs_prd_ticketing_request_whatsapp_notification, docs_prd_ticketing_request_engineer_dashboard, docs_prd_ticketing_request_requester_tracking [EXTRACTED 1.00]
- **Impeccable Quality Assurance Workflow** — _agents_skills_impeccable_reference_craft_floor_craft_floor, _agents_skills_impeccable_reference_audit_audit, _agents_skills_impeccable_reference_critique_critique, _agents_skills_impeccable_reference_component_review_component_review, _agents_skills_impeccable_reference_degraded_finish_reviewer_finish_reviewer [INFERRED 0.85]
- **Contextual Design System** — _agents_skills_impeccable_reference_adapt_adapt, _agents_skills_impeccable_reference_adapt_native_adapt_native, _agents_skills_impeccable_reference_android_android, _agents_skills_impeccable_reference_animate_animate, _agents_skills_impeccable_reference_colorize_colorize [INFERRED 0.75]
- **Visual Governance Workflow** — _agents_skills_impeccable_reference_init_product_truth_initialization, _agents_skills_impeccable_reference_new_work_visual_workflow, _agents_skills_impeccable_reference_visualize_direction_comps, _agents_skills_impeccable_reference_document_design_system_documentation [INFERRED 0.85]
- **Live Variant Workflow** — _agents_skills_impeccable_reference_generate_live_generation, _agents_skills_impeccable_reference_live_live_iteration, _agents_skills_impeccable_reference_live_setup_live_mode_setup [INFERRED 0.85]
- **Interface Quality Practices** — _agents_skills_impeccable_reference_harden_interface_hardening, _agents_skills_impeccable_reference_optimize_performance_optimization, _agents_skills_impeccable_reference_polish_whole_path_polish, _agents_skills_impeccable_reference_quieter_design_refinement [INFERRED 0.75]

## Communities (57 total, 17 thin omitted)

### Community 0 - "Live Configuration UI"
Cohesion: 0.06
Nodes (94): agentStatusText(), barPaletteForTheme(), beginNewLiveConfiguration(), brandMarkSvg(), buildInsertPlaceholderSnapshotFromDom(), buildPickedAnchorSnapshot(), cancelEditing(), cancelEditingToPicking() (+86 more)

### Community 1 - "Svelte Component Injection"
Cohesion: 0.06
Nodes (91): abortSvelteComponentInjection(), applyParamDefaults(), applyParamValue(), applyPlaceholderDimensions(), applySavedSessionMeta(), buildParamsPanel(), checkpointPayload(), clampVariantIndex() (+83 more)

### Community 2 - "Agent Session Coordination"
Cohesion: 0.06
Nodes (60): agentHasWorkInFlight(), applyGlobalBarLabelState(), armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer() (+52 more)

### Community 3 - "Screenshot Runtime"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 4 - "Live Mode Control Bar"
Cohesion: 0.08
Nodes (52): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+44 more)

### Community 5 - "Live Browser Utilities"
Cohesion: 0.07
Nodes (48): applyLiveBarPreference(), applyPlaceholderSizingStyles(), bufferToBase64(), buildColorModels(), buildTypographyModels(), clampPlaceholderSize(), collectFontCssText(), computeInsertPosition() (+40 more)

### Community 6 - "Session Recovery Logic"
Cohesion: 0.08
Nodes (38): abandonForeignSession(), abandonSupersededGo(), acceptedDomAlreadyClean(), applyOriginalAttrsToSvelteAnchor(), clearHandledWrapperReloadStamp(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), deferredRecoverySuperseded() (+30 more)

### Community 7 - "DOM Pin Annotations"
Cohesion: 0.08
Nodes (35): averageRgb01(), beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob() (+27 more)

### Community 8 - "Design Inspector UI"
Cohesion: 0.10
Nodes (29): buildCollapsible(), buildListHtml(), buildRadiiModels(), copyToClipboard(), cssSafe(), designEmptyMessage(), escapeHtml(), fontStack() (+21 more)

### Community 9 - "Manual Edit Workflow"
Cohesion: 0.11
Nodes (28): addManualContextText(), applyEditing(), buildLocatorForLeaf(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), copyEditContainerContext() (+20 more)

### Community 10 - "Pending Edit State"
Cohesion: 0.18
Nodes (26): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+18 more)

### Community 11 - "Form Field Components"
Cohesion: 0.10
Nodes (15): cn, FieldProps, NativeSelectField(), SelectFieldProps, TextAreaField(), TextField(), FieldsProps, formDetails (+7 more)

### Community 12 - "Dashboard Tests"
Cohesion: 0.14
Nodes (18): vitest, Dashboard(), DashboardProps, TicketList(), bugRequestSchema, createTicket(), formatTicketId(), getPublicTicket() (+10 more)

### Community 13 - "Application Shell"
Cohesion: 0.15
Nodes (18): ref_client_only, AppView, InternalRequestHub(), navigation, RequestWorkspace(), TrackingPanel(), Button(), buttonVariants (+10 more)

### Community 14 - "Impeccable Platform Guidance"
Cohesion: 0.14
Nodes (22): OpenAI Skill Metadata, Adapt Playbook, Native Adaptation Playbook, Android Platform Guidance, Animate Playbook, Web Audit Playbook, Native Audit Playbook, Bolder Playbook (+14 more)

### Community 15 - "DOM Editing Helpers"
Cohesion: 0.12
Nodes (16): collectEditableTextRows(), visit(), createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable() (+8 more)

### Community 16 - "UI Component Setup"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 17 - "Ticket Detail UI"
Cohesion: 0.14
Nodes (12): @base-ui/react, lucide-react, getTicketHeading(), TicketDetailDialog(), TicketDetailDialogProps, TicketInformation(), Dialog(), DialogContent() (+4 more)

### Community 18 - "Request Type Picker"
Cohesion: 0.16
Nodes (14): react, RequestTypePicker(), RequestTypePickerProps, requestTypes, RequestWorkspaceProps, formatDate(), TicketProgress(), TrackingPanelProps (+6 more)

### Community 19 - "Svelte Expression Handling"
Cohesion: 0.16
Nodes (19): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+11 more)

### Community 20 - "TypeScript Configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 21 - "Live Session State"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 22 - "Agent Target Handling"
Cohesion: 0.31
Nodes (16): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+8 more)

### Community 23 - "Package Metadata"
Cohesion: 0.13
Nodes (14): name, packageManager, private, version, react-dom, shadcn, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 24 - "Design Documentation"
Cohesion: 0.21
Nodes (14): Official DESIGN.md Format Specification, DESIGN.md Design System Documentation, Incremental Design System Extraction, Live Variant Generation, Product Truth Initialization, Native iOS Interface Guidance, Spatial Layout Thesis, Live Design Iteration (+6 more)

### Community 25 - "Product Requirements"
Cohesion: 0.21
Nodes (13): Engineer Dashboard, Internal Request Hub PRD, Non-Technical Requester Forms, Requester Ticket Tracking, Spreadsheet Ticket Storage, Three Request Types, WhatsApp New Ticket Notification, Internal Request Hub (+5 more)

### Community 26 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, @base-ui/react, class-variance-authority, cn, lucide-react, next, react, react-dom (+3 more)

### Community 27 - "Edit Badge Interaction"
Cohesion: 0.27
Nodes (10): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), positionEditBadge(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy() (+2 more)

### Community 28 - "Development Dependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+2 more)

### Community 30 - "Agent Instructions"
Cohesion: 0.29
Nodes (7): Graphify-First Source Understanding, Graphify Update After Changes, Next.js Agent Rules, Proportional Testing, Simple In-Scope Implementation, User Clarification for Unclear Scope, AGENTS.md Reference

### Community 31 - "Design Panel"
Cohesion: 0.39
Nodes (8): buildDesignHeader(), designPanelCss(), fetchDesignSystem(), initDesignPanel(), loadDesignPrefs(), renderDesignChrome(), saveDesignPrefs(), toggleDesignPanel()

### Community 32 - "Ticket Status UI"
Cohesion: 0.32
Nodes (6): class-variance-authority, statusClasses, TicketStatusBadge(), Badge(), badgeVariants, TicketStatus

### Community 33 - "Live Browser Ignore Rules"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 34 - "Next Application Setup"
Cohesion: 0.29
Nodes (4): nextConfig, next, src_app_globals, metadata

### Community 35 - "Impeccable Launcher"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 36 - "Manual Reference Parsing"
Cohesion: 0.40
Nodes (6): documentRefClassSuffix(), documentRefIdSuffix(), documentRefSegment(), elementMatchesManualRefSegment(), indexAmongSameTag(), normalizeDocumentRefToken()

### Community 37 - "Package Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, test

### Community 38 - "Annotation Overlay"
Cohesion: 0.50
Nodes (5): buildPlaceholderResizeHandles(), cursorForPlaceholderEdge(), positionAnnotOverlay(), showAnnotOverlay(), syncPlaceholderResizeHandles()

### Community 39 - "ESLint Configuration"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 40 - "Design Refinement"
Cohesion: 0.67
Nodes (3): Experience Enhancement, Whole-Path Interface Polish, Quiet Design Refinement

## Knowledge Gaps
- **123 isolated node(s):** `AppView`, `TicketDetailDialogProps`, `FieldProps`, `SelectFieldProps`, `FieldsProps` (+118 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 182 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `enableInlineEdit()` connect `DOM Editing Helpers` to `Live Configuration UI`, `Live Browser Utilities`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **Why does `layoutFlowChildren()` connect `DOM Editing Helpers` to `Live Configuration UI`, `Live Browser Utilities`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AppView`, `TicketDetailDialogProps`, `FieldProps` to the rest of the system?**
  _123 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Live Configuration UI` be split into smaller, more focused modules?**
  _Cohesion score 0.056578947368421055 - nodes in this community are weakly interconnected._
- **Should `Svelte Component Injection` be split into smaller, more focused modules?**
  _Cohesion score 0.05641025641025641 - nodes in this community are weakly interconnected._
- **Should `Agent Session Coordination` be split into smaller, more focused modules?**
  _Cohesion score 0.06384180790960452 - nodes in this community are weakly interconnected._