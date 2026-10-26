# Site Interaction Bugs Bugfix Design

## Overview

Four client-side interaction bugs make filtering, search, FAQ deep links and mobile navigation feel broken:

1. `DsaSheet` reads the URL once on mount, so same-page links (`/dsa?pattern=X#sheet`) and back/forward leave stale filters.
2. `SiteSearch` derives "open" from `q.trim().length > 0`, so the dropdown can only close by clearing the query.
3. `FaqList` renders native `<details>` and nothing opens the one targeted by the URL hash.
4. `Header` keeps `open` state that only link `onClick` handlers reset, so Escape and back/forward leave the mobile menu open.

The fix is four small, local changes. It adds one client component (`FaqHashOpener`) and no dependencies. It does not touch data files, page content, styling, metadata or JSON-LD. Each change follows the APIs documented in the bundled Next.js 16.4 docs (`node_modules/next/dist/docs`). Two of those documented behaviours shape the design:

- **Native history integration** (`01-getting-started/04-linking-and-navigating.md`, "native History API"): `window.history.pushState`/`replaceState` calls sync into the Next router, so `useSearchParams` and `usePathname` update after them. `DsaSheet` currently writes the URL with `replaceState`. That write will now feed back into `useSearchParams`, and the design must not let it cause a loop.
- **Activity route preservation under `cacheComponents`** (`02-guides/preserving-ui-state.md`): pages are hidden with `<Activity>` instead of unmounted. Up to 3 routes stay in the DOM with `display: none`. Effects clean up when a page is hidden and run again when it is shown. Two consequences follow. A hidden home page and a visible `/faq` can both contain `<details id="same-id">`, so `document.getElementById(hash)` is not safe. Transient dropdown state also survives navigation unless it is reset.

## Glossary

- **Bug_Condition (C)**: The set of interactions that currently produce wrong UI state. Each of the four components has its own sub-condition: C_dsa, C_search, C_faq and C_menu.
- **Property (P)**: The correct UI state after an interaction in C, as defined in requirements 2.1–2.11.
- **Preservation**: Behaviour for interactions outside C that must stay identical (requirements 3.1–3.12).
- **F / F'**: The current (unfixed) and the fixed component code.
- **`DsaSheet`**: Client component in `src/components/DsaSheet.tsx` that renders the DSA filter controls and the problem list/table.
- **`filtersFromUrl`**: The current helper in `DsaSheet.tsx` that parses `q`, `pattern`, `difficulty` and `company` from `window.location.search`. The fix replaces it with `filtersFromParams(params)`.
- **Filter key**: The canonical query string built from a `Filters` value, in the fixed order `q, pattern, difficulty, company`, with `all` values omitted. Two URLs that mean the same filters have the same filter key.
- **`SiteSearch`**: Client component in `src/components/SiteSearch.tsx`, the home-page combobox search.
- **Root (search)**: The outer `<div className="relative">` of `SiteSearch`. It contains the form, the results list and the "Popular" chips.
- **`FaqList`**: Server component in `src/components/FaqList.tsx` that renders `<details id={f.id}>` items. It is used on `/faq` and in the home-page FAQ preview.
- **`FaqHashOpener`**: New client component that wraps the FaqList items and opens the `<details>` matching `location.hash`.
- **`Header`**: Client component in `src/components/Header.tsx` (rendered from the root layout, so it is outside page Activity boundaries) that holds the mobile menu state.
- **Activity**: React `<Activity>`, which Next uses under `cacheComponents` to keep up to 3 visited routes mounted but hidden.
- **Soft navigation**: A client-side `<Link>`/router navigation, or a back/forward move between history entries the Next router owns. The document does not reload.

## Bug Details

### Bug Condition

The bug manifests in four independent places:

- **DSA**: The URL's filter params change while `DsaSheet` stays mounted, for example through a same-page link or back/forward. `DsaSheet` never re-reads the URL, because its only read is a `useEffect(..., [])` on mount.
- **Search**: The query is non-empty and the user dismisses the dropdown by clicking outside, tabbing away or pressing Escape. Open state is derived from the query alone, so nothing except clearing the query can close it.
- **FAQ**: The current URL hash names a FAQ item on the visible page. Native `<details>` only scrolls to the target. Nothing sets `open`.
- **Menu**: The mobile menu is open and the user presses Escape or the pathname changes without a menu-link click. No handler or effect closes it.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type Interaction
         { component, kind, url, prevUrl, query, menuOpen, target, relatedTarget }
  OUTPUT: boolean

  IF input.component = "DsaSheet" THEN
    RETURN input.url.pathname = "/dsa"
           AND input.kind IN ["sameRouteLinkClick", "popstate", "activityReshow"]
           AND filterKey(input.url.searchParams) != filterKey(input.prevUrl.searchParams)
           AND renderedFilters() != filtersFromParams(input.url.searchParams)

  IF input.component = "SiteSearch" THEN
    RETURN trim(input.query) != ""
           AND (   (input.kind = "pointerdown" AND NOT root.contains(input.target))
                OR (input.kind = "focusout" AND input.relatedTarget != null
                                           AND NOT root.contains(input.relatedTarget))
                OR (input.kind = "keydown" AND input.key = "Escape")
                OR input.kind = "readAriaExpanded")
           AND NOT dropdownClosedCorrectly()

  IF input.component = "FaqList" THEN
    hash := decodeURIComponent(input.url.hash without leading "#")
    RETURN input.kind IN ["load", "hashchange", "popstate", "softNavigation", "activityReshow"]
           AND visibleFaqIds() CONTAINS hash
           AND NOT detailsFor(hash).open

  IF input.component = "Header" THEN
    RETURN input.menuOpen = true
           AND (   (input.kind = "keydown" AND input.key = "Escape")
                OR (input.kind IN ["popstate", "softNavigation"]
                    AND input.url.pathname != input.prevUrl.pathname
                    AND NOT clickedMenuLink))
           AND menuStillOpenAfter(input)

  RETURN false
END FUNCTION
```

### Examples

- **DSA, same-page link (1.1)**: On `/dsa`, the user clicks "Show only Two Pointers". The URL becomes `/dsa?pattern=Two%20Pointers#sheet`. Expected: the Pattern select shows "Two Pointers" and the count reads "Showing N of M", where N is the Two Pointers count. Actual: "All patterns" and "Showing M of M".
- **DSA, back/forward (1.2)**: The user clicks "Show only Arrays", then "Show only Two Pointers", then presses Back. Expected: Arrays filter. Actual: the list shown before any of these navigations stays on screen.
- **Search, click outside (1.3)**: The user types "tcs" and clicks the hero heading. Expected: the listbox disappears. Actual: it stays over the page.
- **Search, Tab away (1.4)**: The user types "tcs", then presses Tab twice (input → Search button → "Popular" chip → …) until focus leaves the root. Expected: closed. Actual: open.
- **Search, Escape (1.5)**: The user types "tcs" and presses Escape. Expected: the dropdown closes and the input still shows "tcs". Actual: the input clears. The native `type="search"` Escape-clear also fires `onChange("")`.
- **Search, aria (1.6)**: After the fix closes the dropdown, `aria-expanded` must be `"false"` even though `q = "tcs"`. Today it can only be `"true"` while `q` is non-empty.
- **FAQ, hard load (1.7)**: The user opens `/faq#<id>` in a new tab. Expected: that item is `open` and scrolled into view below the sticky header (`scroll-mt-24`). Actual: scrolled, but collapsed.
- **FAQ, soft navigation (1.8)**: The user picks a FAQ result in the home search, which pushes `/faq#<id>`. Expected: the item is open. Actual: collapsed.
- **Menu, Escape (1.9)**: At 360px the user opens the menu and presses Escape. Expected: the menu is hidden and focus is on the toggle button. Actual: the menu stays open.
- **Menu, Back (1.10)**: From `/dsa` the user navigates to `/faq`, opens the menu and presses Back. Expected: `/dsa` loads with the menu closed. Actual: `/dsa` loads with the menu open.
- **Edge, unknown hash (3.8)**: `/faq#does-not-exist` and `/#search` must not open or change any `<details>`.
- **Edge, own write (3.2)**: The user selects Difficulty "Easy". `replaceState` produces `/dsa?difficulty=Easy#sheet`, which updates `useSearchParams`. The sync must recognise this as its own write and must not reset local state or re-run filtering.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Hard-loading `/dsa?…` or arriving from a company page or the roadmap applies the filters (3.1). The server/prerendered HTML still contains the full unfiltered sheet (3.3), as it does today.
- Changing a DSA control updates the list immediately. It writes the URL with `window.history.replaceState(null, "", "?…#sheet")` (or `pathname + "#sheet"` when there are no filters), adds no history entries and causes no loop (3.2).
- Search ArrowUp, ArrowDown, Enter and form submit select and open results exactly as before (3.4). A mouse or touch tap on a result navigates (3.5). An empty query shows no listbox (3.6).
- FAQ items stay native `<details>`/`<summary>` rendered on the server. They toggle without JavaScript (3.7). With no hash or a non-matching hash, the items keep their default state and manual toggling is untouched (3.8).
- Clicking a mobile-menu link still closes the menu and navigates (3.9). The desktop nav (`xl:` and up) is unaffected, and Escape and route changes have no visible effect when the menu is closed (3.10).
- Markup, classes and layout stay the same, so the 360px layout and `.reveal` animations stay the same (3.11). `npm run build`, `npm run lint` and `npm run check:seo` pass. Content, data files, metadata, sitemap and JSON-LD do not change (3.12).

**Scope:**
All interactions that do NOT satisfy isBugCondition should be completely unaffected by this fix. This includes:
- DSA control changes, Reset/"Show all problems" buttons, and first arrival with or without params
- Search typing, arrow keys, Enter, result clicks, "Popular" chip clicks
- Manual FAQ toggling, pages without a FAQ hash, hashes that are not FAQ ids (`#search`, `#study-plan`, `#sheet`, `#main`)
- Menu toggle button, menu link clicks, desktop navigation, and the skip link

## Hypothesized Root Cause

1. **DSA: one-time URL read**: `useEffect(() => setFilters(filtersFromUrl()), [])` runs once. A same-route soft navigation keeps `DsaSheet` mounted, and so does a back/forward move. Under Activity, a preserved `/dsa` is re-shown rather than remounted, and the effect re-runs only because Activity re-runs effects. Nothing subscribes to later URL changes.
   - `filtersFromUrl` reads `window.location` directly instead of a router-aware source.
   - The `replaceState` call sits inside a `setFilters` updater. That updater is a side effect in what should be a pure function, and React may call it twice in Strict Mode.

2. **Search: open state derived from the query**: `const open = q.trim().length > 0` means no independent open/closed state exists. The only Escape handling is `setQ("")`. Native `type="search"` also clears on Escape. Neither a pointerdown-outside handler nor a focusout handler exists. `aria-expanded={open}` therefore mirrors the query.

3. **FAQ: nothing sets `open`**: The browser scrolls to `:target`, but `<details>` does not auto-open for a fragment navigation in the browsers we target. Next soft navigations to `/faq#id` use `pushState`, which never fires `hashchange`. Activity keeps the home page's `<details id>` elements in the DOM, so the same id can exist twice.

4. **Menu: only link clicks close it**: `close` is wired to `onClick` of menu links only. `Header` lives in the root layout and is never remounted, so a back/forward pathname change keeps `open = true`. No keydown listener exists.

## Correctness Properties

Property 1: Bug Condition - Interaction state follows the URL and user dismissal

_For any_ interaction where isBugCondition returns true, the fixed components SHALL produce the expected state. `DsaSheet` SHALL render filters equal to `filtersFromParams(currentSearchParams)` and the matching problem list (2.1, 2.2). `SiteSearch` SHALL hide the listbox, set `aria-expanded="false"` and keep the typed query on Escape (2.3, 2.4, 2.5, 2.7), and SHALL reopen on focus or typing with a non-empty query (2.6). The FAQ `<details>` whose id equals the decoded hash on the visible page SHALL be `open` and scrolled into view (2.8, 2.9). The mobile menu SHALL be hidden, with focus moved to the toggle after Escape (2.10, 2.11).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11**

Property 2: Preservation - Non-buggy interactions behave as before

_For any_ interaction where isBugCondition returns false, the fixed components SHALL produce the same result as the original components. This preserves deep-link filters on arrival, control-driven filtering with `replaceState` URL writes and no extra history entries or loops, the full unfiltered list in server HTML, search keyboard navigation and result clicks, no listbox for an empty query, native no-JS `<details>` behaviour and default FAQ state for non-matching hashes, menu-link close-and-navigate, desktop navigation, the 360px layout, and passing build, lint and SEO checks with unchanged content.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `src/components/DsaSheet.tsx`

**Function**: `DsaSheet` (split into `DsaSheet`, `DsaSheetFromUrl`, `DsaSheetView`)

**Specific Changes**:
1. **Read the URL through `useSearchParams`**: Replace `filtersFromUrl()` with `filtersFromParams(params: URLSearchParams | ReadonlyURLSearchParams)`. Its parsing rules stay the same: case-insensitive match against `dsaPatterns`, `difficulties` and `companyTags`, otherwise `all`. Add `filterKey(f: Filters): string`, which reuses the param-building code that `update` has today.
   - `useSearchParams` from `next/navigation` updates on same-route `<Link>` navigation and on back/forward. Per the docs it also updates after native `replaceState`. This alternative was rejected: a raw `popstate` listener would miss `<Link>` soft navigations, which use `pushState` and fire no event.
2. **Sync during render, keyed by the filter key (no effect, no loop)**:
   ```
   const params = useSearchParams()
   const urlFilters = filtersFromParams(params)
   const urlKey = filterKey(urlFilters)
   const [filters, setFilters] = useState(urlFilters)
   const [syncedKey, setSyncedKey] = useState(urlKey)
   if (urlKey !== syncedKey) {          // URL changed by navigation, not by us
     setSyncedKey(urlKey)
     setFilters(urlFilters)
   }
   ```
   This uses React's documented "adjust state when a prop changes" pattern. It avoids `react-hooks/set-state-in-effect` and removes the existing `eslint-disable` comment.
   - **Loop prevention**: `update(patch)` computes `next = { ...filters, ...patch }` in the event handler, not inside a state updater. It calls `setFilters(next)` and `setSyncedKey(filterKey(next))`, then `window.history.replaceState(null, "", (qs ? "?" + qs : location.pathname) + "#sheet")`. When Next feeds that URL back into `useSearchParams`, `urlKey === syncedKey`, so nothing resets. The `q` input stays controlled by local state, so the caret does not jump while the router update is pending.
   - Comparing filter keys rather than raw strings means `%20` vs `+` encoding, parameter order and unknown parameters do not cause false resyncs.
3. **Suspense boundary for `cacheComponents` prerendering**: `/dsa` is prerendered. The docs (`use-search-params.md`, "Prerendering") say a Client Component that calls `useSearchParams` outside `<Suspense>` makes the production build fail with the blocking-route error. `DsaSheet` (same export name and props, so `src/app/dsa/page.tsx` needs no change) becomes:
   ```
   <Suspense fallback={<DsaSheetView problems={problems} filters={emptyFilters} onChange={noop} />}>
     <DsaSheetFromUrl problems={problems} />
   </Suspense>
   ```
   The fallback is the same markup with no filters applied, so the prerendered HTML still contains the full list (3.3). The `ItemList` JSON-LD is in the page and does not depend on this. The client swaps in `DsaSheetFromUrl` during hydration. That gives the same "full list, then deep-link filters" behaviour the current mount effect has.
   - Alternative considered: passing the page's `searchParams` prop down and unwrapping it with `use()`. That makes the page itself dynamic and still needs Suspense, so it was rejected.
4. **`DsaSheetView`**: The existing JSX moves unchanged into a presentational component that takes `{ problems, filters, onChange(patch) }`. `results` stays memoised in the view, and the class names stay the same.

**File**: `src/components/SiteSearch.tsx`

**Function**: `SiteSearch`

**Specific Changes**:
1. **Separate open state**: Add `const [open, setOpen] = useState(false)`, `const hasQuery = q.trim().length > 0`, and `const expanded = open && hasQuery`. Render the listbox when `expanded`, and set `aria-expanded={expanded}`.
2. **Reopen**: Input `onChange` and `onFocus` call `setOpen(true)`. A "Popular" chip click sets `q` and calls `setOpen(true)`. ArrowDown/ArrowUp call `setOpen(true)` before moving `active`.
3. **Close on pointerdown outside**: A `rootRef` sits on the outer div. A `useEffect` with `[expanded]` as dependency adds a `document` `pointerdown` listener (capture phase) only while `expanded` is true. If `!rootRef.current.contains(e.target)`, it calls `setOpen(false)`. The effect cleanup removes the listener. A pointerdown on a result link is inside the root, so result clicks still navigate (3.5).
4. **Close on focus leaving the root**: Put `onBlur` on the root div. React `onBlur` bubbles like `focusout`. If `e.relatedTarget` is non-null and `!root.contains(e.relatedTarget)`, the handler calls `setOpen(false)`. A null `relatedTarget` is ignored. Safari does not focus a clicked link, so `relatedTarget` is null there, and closing on null would unmount the result before its `click` fires. Pointer dismissal is covered by step 3.
5. **Escape**: When `expanded`, call `e.preventDefault()`, which stops the native `type="search"` clear, then `setOpen(false)`. The query stays. When the dropdown is already closed, Escape keeps today's behaviour and clears the query with `setQ("")`, so users can still clear with a second Escape.
6. **Reset on Activity hide**: Add `useLayoutEffect(() => () => setOpen(false), [])`. This is the pattern `preserving-ui-state.md` recommends for transient dropdowns. When the user picks a result and later comes back to `/`, the preserved query is still there but the dropdown is closed until focus or typing.
7. **Unchanged**: `results`, `score`, `go()`, Enter/submit and `active` handling stay as they are.

**File**: `src/components/FaqHashOpener.tsx` (new) and `src/components/FaqList.tsx`

**Function**: `FaqHashOpener`, `FaqList`

**Specific Changes**:
1. **Keep `FaqList` a server component**: Replace its outer `<div className="space-y-3">` with `<FaqHashOpener className="space-y-3">…server-rendered <details>…</FaqHashOpener>`. `FaqHashOpener` renders exactly `<div className={className} ref={rootRef}>{children}</div>`. The HTML stays identical and the `<details>` remain server-rendered children (3.7).
2. **Scoped lookup**: `openFromHash()` reads `decodeURIComponent(location.hash.slice(1))` and returns early if it is empty. It finds the item with `rootRef.current.querySelector("details[id='" + CSS.escape(id) + "']")`. It does not use `document.getElementById`. If an item is found and its root is visible (`root.offsetParent !== null` or `checkVisibility()`), it sets `el.open = true` and calls `el.scrollIntoView({ block: "start" })`. The existing `scroll-mt-24` keeps the item clear of the sticky header. Unknown hashes are a no-op (3.8). Scoping to the root avoids the duplicate id that exists while Activity keeps the hidden home page alive. The home page and `/faq` both render the featured items.
3. **Triggers**:
   - A `useEffect` keyed on `usePathname()` runs `openFromHash()` after one `requestAnimationFrame`. This covers hard load, a soft navigation to a different path (home search → `/faq#id`), and Activity re-show, because effects re-run when a page becomes visible.
   - `window` listeners for `hashchange` and `popstate` cover same-path hash changes and back/forward between hash entries. Both are removed in the cleanup.
   - A capture-phase `click` listener on `document` handles same-path `<Link href="#id">` / `/faq#id` clicks. Next performs these with `pushState` and fires no `hashchange`. The listener runs `openFromHash()` in a `requestAnimationFrame` after the URL updates, and only when the clicked anchor's `pathname` equals `location.pathname` and its hash is non-empty.
4. **No other changes**: No state and no re-render. The component only writes the DOM `open` attribute, as a user toggle does. Manual toggling stays native.

**File**: `src/components/Header.tsx`

**Function**: `Header`

**Specific Changes**:
1. **Menu state keyed to the pathname**: Replace `open: boolean` with `const [openFor, setOpenFor] = useState<string | null>(null)` and `const open = openFor === pathname`. The toggle calls `setOpenFor(open ? null : pathname)`, and `close` calls `setOpenFor(null)`. Any pathname change, whether from a link, back/forward or programmatic navigation, makes `open` false on the same render. This needs no effect and no `set-state-in-effect` lint exception (2.11). Menu-link `onClick={close}` stays (3.9).
2. **Escape closes and restores focus**: Add `toggleRef` to the toggle button. A `useEffect` with `[open]` as dependency adds a `document` `keydown` listener only while `open` is true. On `Escape`, it calls `setOpenFor(null)` and `toggleRef.current?.focus()` (2.10). When the menu is closed no listener is attached, so desktop and closed states are unaffected (3.10).
3. **Unchanged**: Markup, `hidden={!open}`, `aria-expanded`, `aria-controls`, labels and icons stay as they are.

**File**: `src/app/dsa/page.tsx`, `src/app/faq/page.tsx`, `src/app/page.tsx`

**Specific Changes**:
1. **None expected**: The Suspense boundary lives inside `DsaSheet.tsx`. `FaqList` keeps its signature. If the build still reports a blocking-route error for `/dsa`, move the `<Suspense>` wrapper into `page.tsx` around `<DsaSheet>` with the same full-list fallback.

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach. First, surface counterexamples that demonstrate the bug on unfixed code. Then verify that the fix works and preserves existing behaviour. All behavioural checks run in a real browser (Microsoft Edge through `playwright-core`, `chromium.launch({ channel: "msedge" })`) against a production build (`npm run build`, then `npm run start`). This matters because Suspense/prerender and Activity behave differently in `next dev`.

- `playwright-core` is not in the project's `node_modules`. Load it from the globally available install (for example via `NODE_PATH` or `npx -p playwright-core`), and keep the check script outside `package.json`. That avoids adding a dependency (3.12). Suggested location: `scripts/interaction-check.mjs`, or a temp file deleted after the run, whichever the user prefers.
- The user runs `npm run start` manually in a terminal, or it runs as a managed background process. The script takes the base URL as an argument, like `check:seo`.
- Every navigation in the browser tests is a real client-side `<Link>` click or `page.goBack()`/`goForward()`, not `page.goto`, except where a hard load is the scenario under test. That way soft navigation and Activity are exercised.
- Following `preserving-ui-state.md` "Testing", use visibility-aware locators (`getByRole`, `getByLabel`, `.filter({ visible: true })`), because Activity keeps hidden routes in the DOM.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bug BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute it, we will need to re-hypothesize.

**Test Plan**: Run the Edge script against a build of the UNFIXED code and record each failing assertion as a counterexample.

**Test Cases**:
1. **DSA same-page link**: On `/dsa`, click "Show only Two Pointers". Assert that the Pattern select value is "Two Pointers" and that "Showing N" equals the Two Pointers count (will fail on unfixed code).
2. **DSA back/forward**: Click "Show only Arrays", then "Show only Two Pointers", then `goBack()`. Assert the Arrays filter (will fail on unfixed code).
3. **Search dismissal**: On `/`, type "tcs". Then (a) click the h1, (b) Tab until focus leaves the root, (c) press Escape. After each, assert the listbox is hidden and `aria-expanded="false"`. After (c), also assert the input value is "tcs" (will fail on unfixed code).
4. **FAQ hash**: Hard-load `/faq#<firstId>`, and separately pick a FAQ result in home search. Assert that the visible `details#<id>` has `open` and is in the viewport (will fail on unfixed code).
5. **Menu**: At 360×740, open the menu and press Escape. Assert the menu is hidden and focus is on the toggle. Then go `/dsa` → `/faq` by link, open the menu, `goBack()`, and assert the menu is hidden (will fail on unfixed code).
6. **Edge: Activity duplicate id**: Visit `/`, then `/faq#<featuredId>` via search. Assert that the item opened is the visible one on `/faq`, not the hidden home copy (may fail even after a naive fix).

**Expected Counterexamples**:
- The DSA select and count keep their previous values after the URL changes. The search listbox stays visible, the Escape key empties the input, and `aria-expanded` stays `"true"`. FAQ `details.open === false` while the item is scrolled into view. `#mobile-menu` has no `hidden` attribute after Escape or Back.
- Possible causes: one-time URL read, open state derived from the query, nothing sets `details.open`, menu state not tied to the pathname.

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := fixedComponents(input)
  ASSERT expectedBehavior(result)
END FOR

FUNCTION expectedBehavior(result)
  CASE result.component OF
    "DsaSheet":   RETURN result.filters = filtersFromParams(currentUrl.searchParams)
                         AND result.visibleCount = count(problems matching result.filters)
    "SiteSearch": RETURN result.listboxVisible = false
                         AND result.ariaExpanded = "false"
                         AND (input.key = "Escape" IMPLIES result.inputValue = input.query)
    "FaqList":    RETURN visibleDetails(hash).open = true AND inViewport(visibleDetails(hash))
    "Header":     RETURN result.menuHidden = true
                         AND (input.key = "Escape" IMPLIES activeElement = menuToggle)
  END CASE
END FUNCTION
```

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT originalComponents(input) = fixedComponents(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

The project has no test runner, and adding one would change `package.json`. Property-style checks therefore run inside the Edge script with a small seeded PRNG (for example mulberry32 with a printed seed). Each run generates N random cases and prints the seed and the failing case on any mismatch.

**Test Plan**: Run the preservation cases on UNFIXED code first and record the observed outputs (counts, URLs, `history.length`, listbox state). Then rerun the same seeds on fixed code and compare.

**Test Cases**:
1. **DSA control preservation**: For random sequences of control changes (q from a word list, pattern, difficulty, company, Reset), assert that the count equals the in-script filter of the problem data. Also assert that `location.search` equals `filterKey` and `location.hash` is `#sheet`. Assert that `history.length` is unchanged, which shows no pushes and no loop. A `MutationObserver` on the count must record exactly one change per control change.
2. **DSA arrival preservation**: For random filter combinations, hard-load `/dsa?…` and also arrive through a company page "DSA focus" link. Assert the same filters as on unfixed code. Assert that the raw server HTML from `fetch("/dsa")` contains every problem name (3.3).
3. **Search keyboard preservation**: For random queries from search-index titles and random ArrowUp/ArrowDown sequences, assert that `aria-selected` and the Enter target URL match the unfixed run. Empty or whitespace-only queries never show a listbox. Clicking a random result navigates to its `href`.
4. **FAQ default-state preservation**: For random non-FAQ hashes (`#search`, `#study-plan`, `#x-<random>`) and for no hash, assert that every `details` keeps its default `open` value. Random manual toggles behave natively. With JavaScript disabled (`javaScriptEnabled: false`), clicking a summary toggles the item (3.7).
5. **Menu preservation**: At random widths between 360 and 1440, clicking a random menu link closes the menu and lands on its `href`. At 1280 and above (desktop nav), Escape and navigation change nothing visible.

### Unit Tests

- `filtersFromParams` and `filterKey`: case-insensitive matching, unknown values become `all`, encoding variants (`%20` vs `+`) give the same key, and `filterKey(filtersFromParams(new URLSearchParams(filterKey(f)))) === filterKey(f)` for every valid `f`. These run as plain assertions in the check script, or in a tiny `node --experimental-strip-types` harness. No new dependencies.
- `SiteSearch` open-state transitions: focus/typing → open, Escape → closed with query kept, second Escape → query cleared, empty query → never expanded.
- `Header` derived state: `open === (openFor === pathname)` for toggle, close and pathname-change sequences.

### Property-Based Tests

- Random DSA filter tuples navigated by link and by back/forward (Property 1): rendered filters always equal `filtersFromParams(location.search)`.
- Random sequences mixing DSA control changes with link and back/forward navigations: no extra history entries, no oscillation in the count, and the list always matches the URL (Properties 1 and 2).
- Random search queries with random dismissal actions (outside pointer, Tab out, Escape) and reopen actions (focus, typing, chip): `aria-expanded` always equals the listbox's visibility (Properties 1 and 2).

### Integration Tests

- Full flows in Edge, all by client-side link clicks: home search "tcs" → result → back (dropdown closed, query kept); home FAQ search result → `/faq#id` (opened); `/dsa` "Show only …" links → back/forward chain; company page → `/dsa?company=…`; mobile menu open → link → Back → menu closed.
- Context switching under Activity: visit `/`, `/faq` and `/dsa` in turn, then return to each by link. Assert that DSA filters follow the arrival URL, the search dropdown is closed on return, and the visible FAQ item opens for the hash.
- 360px pass on every route: `document.documentElement.scrollWidth <= innerWidth`, and `.reveal` elements gain their visible class after scrolling (3.11).
- Gate checks (3.12): `npm run build` (must pass with no blocking-route or Suspense error for `/dsa`), `npm run lint`, and `npm run check:seo` against the running production server at `http://localhost:3000`. `git diff --stat` must show changes only in `src/components/DsaSheet.tsx`, `SiteSearch.tsx`, `FaqList.tsx`, `Header.tsx` and the new `FaqHashOpener.tsx`, plus the optional check script.
