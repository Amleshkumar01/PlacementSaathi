# Implementation Plan

## Overview

This plan fixes the four interaction bugs from `bugfix.md` using the design in `design.md`. Task 1 writes a browser exploration test that must fail on the unfixed code. Task 2 records preservation baselines that must pass on the unfixed code. Tasks 3.1 to 3.4 apply one fix per component: `DsaSheet` (with a Suspense boundary), `SiteSearch`, `FaqHashOpener` with `FaqList`, and `Header`. Tasks 3.5 and 3.6 rerun the same tests on the fixed code. Task 4 runs the final gates: `npm run build`, `npm run lint`, `npm run check:seo`, and the browser checks at 360px and desktop width.

## Notes

### Test harness conventions (apply to every task that runs browser checks)

- The browser check script is a temp file outside the repo: `%TEMP%\placementsaathi-checks\interaction-check.mjs`. Do NOT add it to `scripts/` and do NOT change `package.json` or `package-lock.json` (Requirement 3.12).
- Install `playwright-core` into the same temp folder (`npm install --prefix "%TEMP%\placementsaathi-checks" playwright-core`) and load it from there with `createRequire(path.join(os.tmpdir(), "placementsaathi-checks", "package.json"))`. Launch Microsoft Edge with `chromium.launch({ channel: "msedge" })`.
- The script takes the base URL as its first argument (default `http://localhost:3000`), like `check:seo`, and a `--seed=<n>` argument for the seeded PRNG (mulberry32). It prints the seed and every failing case.
- Always run against a production build. Run `npm run build` to completion first. Start `npm run start` as a managed background process ONLY after the build has finished. Never run the build and the server in parallel. Stop the server before every rebuild, because a running server holds files in `.next` open on Windows.
- Navigate with real `<Link>` clicks and `page.goBack()`/`page.goForward()`. Use `page.goto` only when a hard load is the scenario under test. Use visibility-aware locators (`getByRole`, `getByLabel`, `.filter({ visible: true })`), because Activity keeps hidden routes in the DOM.

## Tasks

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Interaction state follows the URL and user dismissal
  - **CRITICAL**: This test MUST FAIL on unfixed code - failure confirms the bug exists
  - **DO NOT attempt to fix the test or the code when it fails**
  - **NOTE**: This test encodes the expected behavior - it will validate the fix when it passes after implementation
  - **GOAL**: Surface counterexamples that demonstrate the bug exists
  - **Scoped PBT Approach**: The bugs are deterministic, so scope each property to concrete failing cases, plus a small seeded random set of DSA filter tuples
  - Set up the temp harness from the conventions above (temp folder, `playwright-core` temp install, Edge launch, seeded PRNG, base URL argument)
  - Run `npm run build` on the UNFIXED code. After the build finishes, start `npm run start` as a background process
  - Bug condition under test (`isBugCondition` from design):
    - DSA: pathname `/dsa`, kind in `sameRouteLinkClick | popstate | activityReshow`, and `filterKey(url) != filterKey(prevUrl)`
    - SiteSearch: `trim(query) != ""` and (pointerdown outside root, OR focusout with non-null `relatedTarget` outside root, OR Escape, OR reading `aria-expanded`)
    - FAQ: kind in `load | hashchange | popstate | softNavigation | activityReshow`, and the decoded hash is a FAQ id on the visible page
    - Header: menu open and (Escape, OR the pathname changes without a menu-link click)
  - Assertions match `expectedBehavior` from design:
    - DSA same-page link: on `/dsa`, click "Show only Two Pointers". The Pattern select shows "Two Pointers" and "Showing N" equals the Two Pointers count computed in-script from the problem data (2.1)
    - DSA back/forward: click "Show only Arrays", then "Show only Two Pointers", then `goBack()`. The Arrays filter and count are shown. `goForward()` shows Two Pointers. Also run random seeded filter tuples navigated by link and by back/forward, asserting rendered filters equal `filtersFromParams(location.search)` (2.2)
    - Search: on `/`, type "tcs". Then separately (a) click the h1, (b) press Tab until focus leaves the search root, (c) press Escape. After each, the listbox is hidden and `aria-expanded="false"`. After (c), the input value is still "tcs". Then focus or type again and assert the listbox reopens with `aria-expanded="true"` (2.3, 2.4, 2.5, 2.6, 2.7)
    - FAQ: hard-load `/faq#<firstId>`, and separately pick a FAQ result in the home search (soft navigation to `/faq#<id>`). The visible `details#<id>` has `open` and is in the viewport (2.8, 2.9)
    - FAQ Activity edge case: visit `/`, then reach `/faq#<featuredId>` through search. The opened item is the visible one on `/faq`, not the hidden home copy (2.9)
    - Header at 360x740: open the menu and press Escape. `#mobile-menu` is hidden and focus is on the toggle (2.10). Then go `/dsa` → `/faq` by link, open the menu, `goBack()`, and assert the menu is hidden (2.11)
  - Run the test on UNFIXED code
  - **EXPECTED OUTCOME**: Test FAILS (this is correct - it proves the bug exists)
  - Document the counterexamples found (for example: the DSA select still shows "All patterns" after the link click; the search listbox stays visible after an outside click; Escape empties the input; `details.open === false` after a hash load; `#mobile-menu` has no `hidden` attribute after Escape or Back). Note whether they confirm the root causes in design, and re-hypothesize if they do not
  - Stop the server when finished
  - Mark task complete when the test is written, run, and the failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-buggy interactions behave as before
  - **IMPORTANT**: Follow observation-first methodology
  - Add the preservation checks to the same temp script, behind a `--preservation` flag. Use the same build and the same server process rules as task 1
  - Non-bug condition: every interaction where `isBugCondition` returns false
  - Observe on UNFIXED code and record the outputs (counts, URLs, `history.length`, listbox state, `details.open` values) for fixed seeds:
    - DSA controls: random sequences of control changes (q from a word list, pattern, difficulty, company, Reset/"Show all problems"). The count equals the in-script filter of the problem data. `location.search` equals the filter key, `location.hash` is `#sheet`, and `history.length` does not change. A `MutationObserver` on the count records exactly one change per control change (3.2)
    - DSA arrival: random filter combinations hard-loaded as `/dsa?…`, and arrival through a company page "DSA focus" link and the roadmap, apply the same filters as the recorded baseline (3.1). The raw HTML from `fetch("/dsa")` contains every problem name (3.3)
    - Search: random queries taken from search-index titles with random ArrowUp/ArrowDown sequences give the same `aria-selected` item and Enter target URL as the baseline (3.4). Clicking a random result navigates to its `href` (3.5). Empty or whitespace-only queries never show a listbox (3.6)
    - FAQ: with JavaScript disabled (`javaScriptEnabled: false`), clicking a summary toggles the item (3.7). For no hash and for random non-FAQ hashes (`#search`, `#study-plan`, `#sheet`, `#main`, `#x-<random>`), every `details` keeps its default `open` value, and random manual toggles behave natively (3.8)
    - Header: at random widths between 360 and 1279, clicking a random menu link closes the menu and lands on its `href` (3.9). At 1280 and above, Escape and navigation change nothing visible in the desktop nav (3.10)
    - Layout at 360px on every route in `scripts/seo-check.mjs`: `document.documentElement.scrollWidth <= innerWidth`, and `.reveal` elements become visible after scrolling (3.11)
  - Write property-based checks that assert the observed patterns across the seeded input domain
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms the baseline behavior to preserve)
  - Record the seeds and the baseline outputs in the task notes so task 3.6 can rerun the same seeds
  - Mark task complete when the tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_

- [x] 3. Fix for the four site interaction bugs

  - [x] 3.1 Fix `DsaSheet` URL sync with a Suspense boundary (`src/components/DsaSheet.tsx`)
    - Replace `filtersFromUrl()` with `filtersFromParams(params)`, which keeps the same parsing: case-insensitive match against `dsaPatterns`, `difficulties` and `companyTags`, otherwise `all`
    - Add `filterKey(f)`, built from the param-building code in today's `update`, in the fixed order `q, pattern, difficulty, company`, with `all` values omitted
    - Split into `DsaSheet` (same export name and props), `DsaSheetFromUrl` and `DsaSheetView`. Move the existing JSX unchanged into `DsaSheetView({ problems, filters, onChange })`, keep `results` memoised there, and keep the class names
    - In `DsaSheetFromUrl`, read `useSearchParams()` and sync during render, keyed by the filter key: when `urlKey !== syncedKey`, call `setSyncedKey(urlKey)` and `setFilters(urlFilters)`. Remove the mount `useEffect` and its `eslint-disable` comment
    - In `update(patch)`, compute `next` in the event handler (not inside a state updater), call `setFilters(next)` and `setSyncedKey(filterKey(next))`, then `window.history.replaceState(null, "", (qs ? "?" + qs : location.pathname) + "#sheet")`
    - Wrap with `<Suspense fallback={<DsaSheetView problems={problems} filters={emptyFilters} onChange={noop} />}>`, so the prerendered HTML still contains the full list
    - Leave `src/app/dsa/page.tsx` unchanged. Move the Suspense wrapper into the page only if the build reports a blocking-route error for `/dsa`
    - _Bug_Condition: isBugCondition(input) where component = "DsaSheet", pathname = "/dsa", kind in [sameRouteLinkClick, popstate, activityReshow] and filterKey(url) != filterKey(prevUrl)_
    - _Expected_Behavior: result.filters = filtersFromParams(currentUrl.searchParams) AND result.visibleCount = count(problems matching result.filters)_
    - _Preservation: arrival filters applied (3.1), control changes write the URL with replaceState and add no history entries or loops (3.2), full list in server HTML (3.3)_
    - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.12_

  - [x] 3.2 Fix `SiteSearch` open state and dismissal (`src/components/SiteSearch.tsx`)
    - Add `open` state, `hasQuery = q.trim().length > 0` and `expanded = open && hasQuery`. Render the listbox when `expanded` and set `aria-expanded={expanded}`
    - Call `setOpen(true)` on input change, input focus, "Popular" chip click, and ArrowUp/ArrowDown
    - Add `rootRef` on the outer div. While `expanded`, attach a capture-phase `document` `pointerdown` listener that closes when the target is outside the root, and remove it in the cleanup
    - Add `onBlur` on the root that closes only when `relatedTarget` is non-null and outside the root. Ignore a null `relatedTarget` so Safari result clicks still navigate
    - Escape: when `expanded`, call `preventDefault()` and `setOpen(false)` and keep the query. When already closed, keep today's behaviour and clear the query
    - Add `useLayoutEffect(() => () => setOpen(false), [])` so the dropdown is closed when the page returns from Activity
    - Leave `results`, `score`, `go()`, Enter/submit and `active` handling unchanged
    - _Bug_Condition: isBugCondition(input) where component = "SiteSearch", trim(query) != "" and kind in [pointerdown outside root, focusout to outside root, Escape, readAriaExpanded]_
    - _Expected_Behavior: result.listboxVisible = false AND result.ariaExpanded = "false" AND (key = Escape IMPLIES result.inputValue = input.query); reopens on focus or typing_
    - _Preservation: ArrowUp/ArrowDown/Enter (3.4), result clicks navigate (3.5), no listbox for an empty query (3.6)_
    - _Requirements: 2.3, 2.4, 2.5, 2.6, 2.7, 3.4, 3.5, 3.6_

  - [x] 3.3 Add `FaqHashOpener` and use it in `FaqList` (`src/components/FaqHashOpener.tsx`, `src/components/FaqList.tsx`)
    - Create the client component `FaqHashOpener({ className, children })`, which renders exactly `<div className={className} ref={rootRef}>{children}</div>`
    - `openFromHash()`: decode `location.hash.slice(1)` and return if it is empty. Look up `details[id='…']` with `CSS.escape` inside `rootRef.current` only (not `document.getElementById`). If found and the root is visible, set `el.open = true` and call `el.scrollIntoView({ block: "start" })`. Unknown hashes do nothing
    - Triggers: a `useEffect` keyed on `usePathname()` that runs `openFromHash()` after one `requestAnimationFrame`; `window` `hashchange` and `popstate` listeners; a capture-phase `document` `click` listener for same-path anchors with a non-empty hash, running `openFromHash()` in a `requestAnimationFrame`. Remove all listeners in the cleanup
    - In `FaqList`, replace the outer `<div className="space-y-3">` with `<FaqHashOpener className="space-y-3">`. Keep `FaqList` a server component with server-rendered native `<details>`/`<summary>` and the same signature
    - _Bug_Condition: isBugCondition(input) where component = "FaqList", kind in [load, hashchange, popstate, softNavigation, activityReshow] and visibleFaqIds() contains the decoded hash_
    - _Expected_Behavior: visibleDetails(hash).open = true AND inViewport(visibleDetails(hash))_
    - _Preservation: native no-JS toggling (3.7), default state for no hash or non-FAQ hashes and native manual toggling (3.8), identical markup (3.11)_
    - _Requirements: 2.8, 2.9, 3.7, 3.8, 3.11_

  - [x] 3.4 Fix `Header` mobile menu closing (`src/components/Header.tsx`)
    - Replace `open: boolean` with `openFor: string | null` and derive `open = openFor === pathname`. The toggle calls `setOpenFor(open ? null : pathname)` and `close` calls `setOpenFor(null)`
    - Keep `onClick={close}` on the menu links
    - Add `toggleRef` on the toggle button. While `open`, attach a `document` `keydown` listener that on Escape calls `setOpenFor(null)` and `toggleRef.current?.focus()`, and remove it in the cleanup
    - Leave the markup, `hidden={!open}`, `aria-expanded`, `aria-controls`, labels and icons unchanged
    - _Bug_Condition: isBugCondition(input) where component = "Header", menuOpen = true and (Escape OR pathname change without a menu-link click)_
    - _Expected_Behavior: result.menuHidden = true AND (key = Escape IMPLIES activeElement = menuToggle)_
    - _Preservation: menu-link click closes and navigates (3.9), desktop nav and closed menu unaffected (3.10)_
    - _Requirements: 2.10, 2.11, 3.9, 3.10_

  - [x] 3.5 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Interaction state follows the URL and user dismissal
    - **IMPORTANT**: Re-run the SAME test from task 1 - do NOT write a new test
    - The test from task 1 encodes the expected behavior
    - When this test passes, it confirms the expected behavior is satisfied
    - Stop any running server. Run `npm run build` and wait for it to finish. Then start `npm run start` as a background process
    - Run the bug condition exploration test from task 1 with the same seed
    - **EXPECTED OUTCOME**: Test PASSES (confirms the bugs are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11_

  - [x] 3.6 Verify preservation tests still pass
    - **Property 2: Preservation** - Non-buggy interactions behave as before
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run the preservation property tests from task 2 with the recorded seeds against the server from task 3.5
    - Compare against the baseline outputs recorded in task 2
    - **EXPECTED OUTCOME**: Tests PASS (confirms no regressions)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_

- [x] 4. Checkpoint - Ensure all tests pass
  - Stop any running server, then run `npm run build` and wait for it to finish. It must pass with no blocking-route or Suspense error for `/dsa`
  - Run `npm run lint` and confirm it passes with no new warnings or `eslint-disable` comments
  - After the build has finished, start `npm run start` as a background process. Then run `npm run check:seo` against `http://localhost:3000` and confirm it passes
  - Run the temp browser check script (Property 1 and Property 2 checks) at 360x740 and at a desktop viewport (1440x900), and confirm both pass
  - Stop the server
  - Run `git diff --stat` and confirm the only changes are in `src/components/DsaSheet.tsx`, `SiteSearch.tsx`, `FaqList.tsx`, `Header.tsx` and the new `FaqHashOpener.tsx`, with `package.json` and `package-lock.json` unchanged
  - Delete `%TEMP%\placementsaathi-checks` only if the user agrees; otherwise leave it for reruns
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 3.11, 3.12_


## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3", "3.4"] },
    { "id": 3, "tasks": ["3.5"] },
    { "id": 4, "tasks": ["3.6"] },
    { "id": 5, "tasks": ["4"] }
  ]
}
```
