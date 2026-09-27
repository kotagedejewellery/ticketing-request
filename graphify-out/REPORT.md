# Graph Report - ticketing-request  (2026-09-26)

## Corpus Check
- 13 files · ~141,332 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1007 nodes · 2674 edges · 68 communities (47 shown, 21 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 86 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- setLiveState()
- live-browser.js
- modern-screenshot.umd.js
- initPageChat()
- el()
- renderDesignVisual()
- ticket-detail-dialog.tsx
- Internal Request Hub
- captureElementToBlob()
- handleManualEditActivity()
- tickets.ts
- resumeSession()
- Impeccable Skill
- components.json
- internal-request-hub.tsx
- onAnnotDown()
- tracking-panel.tsx
- injectSvelteComponentsFromManifest()
- normalizeManualContextText()
- refreshParamsPanel()
- resolveLiveInjectionAnchor()
- request-form.tsx
- compilerOptions
- createLiveBrowserSessionState()
- actOnAgentTarget()
- documentRefForElement()
- createLiveBrowserDomHelpers()
- package.json
- New Visual Work Workflow
- showToast()
- mountSvelteComponentVariant()
- scheduleAcceptCleanup()
- updateBarContent()
- handleAccept()
- dependencies
- syncEditBadgeHitProxies()
- connectSSE()
- devDependencies
- Internal Request Hub Design System
- initDesignPanel()
- layout.tsx
- ticket-status-badge.tsx
- live-browser-ignores.js
- impeccable
- scripts
- eslint.config.mjs
- Whole-Path Interface Polish
- Component Review Checkpoint
- Interface Hardening
- Simplicity and Scope Rules
- postcss.config.mjs
- Documenter Role
- Finish Reviewer Role
- Manual Edit Applier Role
- Design Quality Hooks
- Onboarding Experience
- Task-Focused Product UI
- Context-Aware Command Guidance
- Graphify-First Project Understanding Rule
- Graphify Update Rule
- Proportional Testing Rule
- AGENTS.md Reference
- Document Icon
- Globe Icon
- Next.js Wordmark
- Vercel Triangle Logo
- Window Icon

## God Nodes (most connected - your core abstractions)
1. `connectSSE()` - 34 edges
2. `resumeSession()` - 33 edges
3. `setLiveState()` - 33 edges
4. `showToast()` - 31 edges
5. `initGlobalBar()` - 30 edges
6. `el()` - 29 edges
7. `cleanup()` - 27 edges
8. `handleKeyDown()` - 27 edges
9. `injectSvelteComponentsFromManifest()` - 26 edges
10. `buildInsertConfigureRow()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `Local Demo Persistence Decision` --semantically_similar_to--> `Browser LocalStorage Demo Repository`  [INFERRED] [semantically similar]
  tasks/plan.md → README.md
- `Requester-Safe Progress Separation` --conceptually_related_to--> `Requester Ticket Tracking`  [INFERRED]
  tasks/plan.md → docs/PRD-ticketing-request.md
- `Internal Request Hub` --references--> `Engineer atau Admin Internal`  [EXTRACTED]
  README.md → PRODUCT.md
- `Internal Request Hub` --references--> `Dashboard Internal`  [EXTRACTED]
  README.md → PRODUCT.md
- `Internal Request Hub` --references--> `Requester Internal`  [EXTRACTED]
  README.md → PRODUCT.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Operational Request Experience** — _impeccable_surfaces_src_app_page_tsx_requester_flow, _impeccable_surfaces_src_app_page_tsx_engineer_monitoring, design_requester_engineer_information_boundary [INFERRED 0.95]

## Communities (68 total, 21 thin omitted)

### Community 0 - "setLiveState()"
Cohesion: 0.08
Nodes (79): agentStatusText(), applyEditing(), barPaletteForTheme(), beginNewLiveConfiguration(), brandMarkSvg(), cancelEditing(), cancelEditingToPicking(), cancelInsertConfigure() (+71 more)

### Community 1 - "live-browser.js"
Cohesion: 0.05
Nodes (59): applyGlobalBarLabelState(), applyLiveBarPreference(), applyPlaceholderSizingStyles(), buildInsertPlaceholderSnapshotFromDom(), buildLocatorForLeaf(), buildPickedAnchorSnapshot(), computeInsertPosition(), createInsertPlaceholder() (+51 more)

### Community 2 - "modern-screenshot.umd.js"
Cohesion: 0.09
Nodes (55): ae(), be(), bt(), Ce(), s(), Ct(), de(), dt() (+47 more)

### Community 3 - "initPageChat()"
Cohesion: 0.07
Nodes (55): agentHasWorkInFlight(), armPageChatForTyping(), attachSteerFocusDebug(), attachSteerFocusGuard(), buildSteerProcessingDots(), buildSteerQueueHint(), clearSteerAwaitTimer(), clearSteerFocusRecoverTimer() (+47 more)

### Community 4 - "el()"
Cohesion: 0.08
Nodes (48): actionLabel(), applyConfigureBarChrome(), bindConfigureCountPillTooltip(), bindConfigureInlineControlHover(), bindConfigureModifierPillHover(), buildConfigureActionControl(), buildConfigureCountControl(), buildConfigureRow() (+40 more)

### Community 5 - "renderDesignVisual()"
Cohesion: 0.08
Nodes (35): buildCollapsible(), buildColorModels(), buildListHtml(), buildRadiiModels(), buildTypographyModels(), copyToClipboard(), cssSafe(), designEmptyMessage() (+27 more)

### Community 6 - "ticket-detail-dialog.tsx"
Cohesion: 0.12
Nodes (16): @base-ui/react, cn, getTicketHeading(), TicketDetailDialog(), TicketDetailDialogProps, TicketInformation(), Button(), buttonVariants (+8 more)

### Community 7 - "Internal Request Hub"
Cohesion: 0.09
Nodes (26): Engineer Dashboard, Internal Request Hub PRD, Non-Technical Requester Forms, Requester Ticket Tracking, Spreadsheet Ticket Storage, Three Request Types, WhatsApp New Ticket Notification, Engineer atau Admin Internal (+18 more)

### Community 8 - "captureElementToBlob()"
Cohesion: 0.10
Nodes (24): averageRgb01(), bufferToBase64(), captureAndEmit(), captureChromeNodes(), captureElementFromRenderedAncestor(), captureElementToBlob(), collectFontCssText(), compileShader() (+16 more)

### Community 9 - "handleManualEditActivity()"
Cohesion: 0.19
Nodes (24): clearStoredManualApplyState(), fetchPendingCount(), handleManualEditActivity(), hidePendingApplyDock(), manualApplyLoadingText(), manualApplyStateKey(), manualEditEventForCurrentPage(), numberOrNull() (+16 more)

### Community 10 - "tickets.ts"
Cohesion: 0.13
Nodes (16): vitest, DashboardProps, bugRequestSchema, createTicket(), formatTicketId(), getPublicTicket(), getRequesterName(), getSafeExternalUrl() (+8 more)

### Community 11 - "resumeSession()"
Cohesion: 0.13
Nodes (23): applySavedSessionMeta(), checkpointPayload(), clampVariantIndex(), clearHandled(), findActiveSessionSummary(), findAdoptableServerSession(), findAnyVariantsWrapper(), findInsertAnchorInDom() (+15 more)

### Community 12 - "Impeccable Skill"
Cohesion: 0.14
Nodes (22): OpenAI Skill Metadata, Adapt Playbook, Native Adaptation Playbook, Android Platform Guidance, Animate Playbook, Web Audit Playbook, Native Audit Playbook, Bolder Playbook (+14 more)

### Community 13 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 14 - "internal-request-hub.tsx"
Cohesion: 0.14
Nodes (18): ref_client_only, Dashboard(), AppView, InternalRequestHub(), navigation, RequestWorkspace(), TrackingPanel(), addTicket() (+10 more)

### Community 15 - "onAnnotDown()"
Cohesion: 0.15
Nodes (21): applyPlaceholderDimensions(), beginEditPin(), buildAnnotationsForCapture(), buildPinElement(), cancelEditingPin(), clampPlaceholderSize(), finalizeEditingPin(), initAnnotOverlay() (+13 more)

### Community 16 - "tracking-panel.tsx"
Cohesion: 0.17
Nodes (14): lucide-react, react, RequestTypePicker(), RequestTypePickerProps, requestTypes, RequestWorkspaceProps, formatDate(), TicketProgress() (+6 more)

### Community 17 - "injectSvelteComponentsFromManifest()"
Cohesion: 0.23
Nodes (20): abortSvelteComponentInjection(), completeParameterGenerationIfReady(), completeSourceInjection(), finalizeInsertSession(), hideShaderOverlay(), injectSvelteComponentsFromManifest(), loadSession(), loadSvelteComponentParams() (+12 more)

### Community 18 - "normalizeManualContextText()"
Cohesion: 0.12
Nodes (20): addManualContextText(), canRestoreManualEditElement(), collectManualContextPieces(), walk(), contextElementForManualEdit(), cssIdent(), directMixedTextRestoreNodes(), findManualEditRestoreElement() (+12 more)

### Community 19 - "refreshParamsPanel()"
Cohesion: 0.16
Nodes (20): applyParamDefaults(), applyParamValue(), buildParamsPanel(), closedClipPath(), completeParameterPublication(), formatRangeValue(), getVisibleVariantEl(), hideParamsPanel() (+12 more)

### Community 20 - "resolveLiveInjectionAnchor()"
Cohesion: 0.15
Nodes (20): buildSvelteExpressionTextMap(), buildSveltePropValuesFromLiveElement(), buildSveltePropValuesV2(), cloneWithoutElements(), collectTextNodes(), collectVisibleTexts(), cssEscapeIdent(), elementMatchesOriginalMarkup() (+12 more)

### Community 21 - "request-form.tsx"
Cohesion: 0.12
Nodes (12): FieldProps, NativeSelectField(), SelectFieldProps, TextAreaField(), TextField(), FieldsProps, formDetails, RequestForm() (+4 more)

### Community 22 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 23 - "createLiveBrowserSessionState()"
Cohesion: 0.21
Nodes (15): createLiveBrowserSessionState(), clearHandled(), clearScrollY(), clearSession(), isHandled(), loadSession(), markHandled(), nextCheckpointRevision() (+7 more)

### Community 24 - "actOnAgentTarget()"
Cohesion: 0.29
Nodes (17): actOnAgentTarget(), agentTargetBusyReason(), agentTargetOverlayGone(), agentTargetTaken(), claimAgentTarget(), claimAndActOnAgentTarget(), declineAgentTargetBusy(), declineAgentTargetUnresolvable() (+9 more)

### Community 25 - "documentRefForElement()"
Cohesion: 0.13
Nodes (17): collectEditableTextRows(), visit(), copyEditContainerContext(), copyEditLeafContext(), documentRefClassSuffix(), documentRefForElement(), documentRefIdSuffix(), documentRefSegment() (+9 more)

### Community 26 - "createLiveBrowserDomHelpers()"
Cohesion: 0.16
Nodes (11): createLiveBrowserDomHelpers(), cssId(), liveUiRoot(), makeFrozenAnchor(), own(), pickable(), rectIsUsableAnchor(), uiAppend() (+3 more)

### Community 27 - "package.json"
Cohesion: 0.13
Nodes (14): name, packageManager, private, version, react-dom, shadcn, tailwindcss, @tailwindcss/postcss (+6 more)

### Community 28 - "New Visual Work Workflow"
Cohesion: 0.21
Nodes (14): Official DESIGN.md Format Specification, DESIGN.md Design System Documentation, Incremental Design System Extraction, Live Variant Generation, Product Truth Initialization, Native iOS Interface Guidance, Spatial Layout Thesis, Live Design Iteration (+6 more)

### Community 29 - "showToast()"
Cohesion: 0.20
Nodes (13): abandonForeignSession(), abandonSupersededGo(), discardOrphanedSession(), dismissToast(), markSessionHandled(), maybePrefetchPage(), maybeShowFirstSaveToast(), maybeWarnConditionalAncestor() (+5 more)

### Community 30 - "mountSvelteComponentVariant()"
Cohesion: 0.24
Nodes (13): applyOriginalAttrsToSvelteAnchor(), commitAcceptedSvelteComponentToDom(), componentModuleCandidates(), describeMountFailure(), detectDevServerBase(), getMountedSvelteComponentAnchor(), importFirstReachable(), isSvelteInsertManifest() (+5 more)

### Community 31 - "scheduleAcceptCleanup()"
Cohesion: 0.31
Nodes (11): acceptedDomAlreadyClean(), clearHandledWrapperReloadStamp(), deferredRecoverySuperseded(), ensureAcceptedDomClean(), findAcceptedRuntimeWrappers(), handledWrapperReloadKey(), reloadAfterMissingAcceptedDom(), restoreAcceptedDomFromSnapshot() (+3 more)

### Community 32 - "updateBarContent()"
Cohesion: 0.24
Nodes (11): buildCyclingRow(), cycleVariant(), cyclingCounterText(), cyclingShownVariant(), ensureCyclingRenderable(), maybeCompleteAcceptedSession(), navBtn(), recoverEmptyCycling() (+3 more)

### Community 33 - "handleAccept()"
Cohesion: 0.29
Nodes (11): commitAcceptedVariantToDom(), ensureInsertPlaceholder(), findVariantsWrapper(), handleAccept(), isInsertGeneratingSession(), isVariantShown(), positionShaderOverlay(), readVisibleVariantFromDOM() (+3 more)

### Community 34 - "dependencies"
Cohesion: 0.18
Nodes (11): dependencies, @base-ui/react, class-variance-authority, cn, lucide-react, next, react, react-dom (+3 more)

### Community 35 - "syncEditBadgeHitProxies()"
Cohesion: 0.27
Nodes (10): bindEditBadgeProxy(), editBadgeProxyTargets(), initEditBadge(), initEditBadgeHitProxies(), positionEditBadge(), proxyMouseEvent(), setImportantStyle(), styleEditBadgeProxy() (+2 more)

### Community 36 - "connectSSE()"
Cohesion: 0.36
Nodes (10): connectSSE(), injectVariantsFromSource(), isFrameworkComponentPreviewMode(), isJsxSourceFile(), isSvelteComponentManifestPath(), normalizeSessionPath(), recoverMissedGenerationCompletion(), rememberSessionFileMeta() (+2 more)

### Community 37 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+2 more)

### Community 39 - "Internal Request Hub Design System"
Cohesion: 0.25
Nodes (9): Engineer Monitoring, Requester Flow, Request Surface, Impeccable UI Rule, Internal Request Hub Design System, Ledger Visual Language, Mobile Requester Accessibility, Numbered Request Rows (+1 more)

### Community 40 - "initDesignPanel()"
Cohesion: 0.39
Nodes (8): buildDesignHeader(), designPanelCss(), fetchDesignSystem(), initDesignPanel(), loadDesignPrefs(), renderDesignChrome(), saveDesignPrefs(), toggleDesignPanel()

### Community 41 - "layout.tsx"
Cohesion: 0.25
Nodes (5): nextConfig, next, src_app_globals, metadata, viewport

### Community 42 - "ticket-status-badge.tsx"
Cohesion: 0.32
Nodes (6): class-variance-authority, statusClasses, TicketStatusBadge(), Badge(), badgeVariants, TicketStatus

### Community 43 - "live-browser-ignores.js"
Cohesion: 0.52
Nodes (6): globToRegex(), matchesScope(), normalizeIgnoreRule(), normalizeIgnoreValue(), pageCandidates(), resolveDetectIgnores()

### Community 44 - "impeccable"
Cohesion: 0.60
Nodes (5): impeccable script, check_download(), fetch_url(), probe_ok(), setup_help()

### Community 45 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, test

### Community 46 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 47 - "Whole-Path Interface Polish"
Cohesion: 0.67
Nodes (3): Experience Enhancement, Whole-Path Interface Polish, Quiet Design Refinement

## Knowledge Gaps
- **143 isolated node(s):** `seedTickets`, `optionalText`, `components`, `hooks`, `lib` (+138 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 202 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `enableInlineEdit()` connect `documentRefForElement()` to `setLiveState()`, `live-browser.js`, `createLiveBrowserDomHelpers()`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `layoutFlowChildren()` connect `createLiveBrowserDomHelpers()` to `setLiveState()`, `live-browser.js`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `initGlobalBar()` (e.g. with `hideAgentPollTooltip()` and `onDetectMessage()`) actually correct?**
  _`initGlobalBar()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `seedTickets`, `optionalText`, `components` to the rest of the system?**
  _143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `setLiveState()` be split into smaller, more focused modules?**
  _Cohesion score 0.08009635651912074 - nodes in this community are weakly interconnected._
- **Should `live-browser.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05141242937853107 - nodes in this community are weakly interconnected._
- **Should `modern-screenshot.umd.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08897243107769423 - nodes in this community are weakly interconnected._