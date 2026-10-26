# Bugfix Requirements Document

## Introduction

A code review of PlacementSaathi found four interaction bugs in client-side UI. On the DSA sheet, the filters ignore URL changes made by same-page link clicks and browser back/forward. The site search dropdown never closes unless the query is cleared. FAQ deep links scroll to a question but leave the answer collapsed. The mobile menu does not close on Escape or on back/forward route changes. Together these make filtering, search, FAQ links and mobile navigation feel broken. The fix must not change content, design, data, SEO, or the existing behaviour listed in the Unchanged Behavior section.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the user is on /dsa and clicks a same-page link that changes the query string (for example "Show only {pattern}" linking to `/dsa?pattern=X#sheet`) THEN the system keeps the previous filters and the previous visible problem list, because the URL is only read once on mount

1.2 WHEN the user is on /dsa and uses browser back or forward to move between URLs with different `q`, `pattern`, `difficulty` or `company` parameters THEN the system keeps showing the filters and list from before the navigation

1.3 WHEN the site search has a non-empty query and the user clicks or taps outside the search THEN the system leaves the results dropdown open

1.4 WHEN the site search has a non-empty query and focus leaves the search (for example by pressing Tab past it) THEN the system leaves the results dropdown open

1.5 WHEN the site search has a non-empty query and the user presses Escape THEN the system closes the dropdown only by clearing the typed query

1.6 WHEN the site search dropdown is visually closed or open THEN the system reports `aria-expanded` based only on whether the query is non-empty, not on the real open state

1.7 WHEN the page loads with a URL hash matching a FAQ id (for example from a search result linking to `/faq#<id>`) THEN the system scrolls to the question but leaves its answer collapsed

1.8 WHEN the URL hash changes to a FAQ id after load (hash change or client-side navigation to `/faq#<id>`, on /faq or on the home page FAQ list) THEN the system leaves the matching question collapsed

1.9 WHEN the mobile menu is open and the user presses Escape THEN the system keeps the menu open

1.10 WHEN the mobile menu is open and the pathname changes by browser back or forward THEN the system keeps the menu open on the new page

### Expected Behavior (Correct)

2.1 WHEN the user is on /dsa and clicks a same-page link that changes the query string THEN the system SHALL update the search, pattern, difficulty and company filters and the visible problem list to match the new URL

2.2 WHEN the user is on /dsa and uses browser back or forward between URLs with different filter parameters THEN the system SHALL update the filters and the visible problem list to match the current URL

2.3 WHEN the site search has a non-empty query and the user clicks or taps outside the search THEN the system SHALL close the results dropdown

2.4 WHEN the site search has a non-empty query and focus leaves the search THEN the system SHALL close the results dropdown

2.5 WHEN the site search has a non-empty query and the user presses Escape THEN the system SHALL close the results dropdown and keep the typed query in the input

2.6 WHEN the site search dropdown has been closed and the input receives focus again (or the user types) with a non-empty query THEN the system SHALL reopen the results dropdown

2.7 WHEN the site search dropdown opens or closes THEN the system SHALL set `aria-expanded` to reflect the real open state

2.8 WHEN the page loads with a URL hash matching a FAQ id THEN the system SHALL open that FAQ's answer and scroll it into view

2.9 WHEN the URL hash changes to a FAQ id after load (hash change or client-side navigation) THEN the system SHALL open that FAQ's answer and scroll it into view

2.10 WHEN the mobile menu is open and the user presses Escape THEN the system SHALL close the menu and move focus back to the menu toggle button

2.11 WHEN the mobile menu is open and the pathname changes by any means, including browser back or forward THEN the system SHALL close the menu

### Unchanged Behavior (Regression Prevention)

3.1 WHEN /dsa is hard-loaded with filter parameters, or reached from another page such as a company page or the roadmap THEN the system SHALL CONTINUE TO apply those filters on arrival

3.2 WHEN the user changes a DSA filter control on the page THEN the system SHALL CONTINUE TO update the list and write the filters to the URL, without causing a navigation loop or repeated re-filtering

3.3 WHEN /dsa is loaded without filter parameters THEN the system SHALL CONTINUE TO show the full unfiltered sheet

3.4 WHEN the site search dropdown is open THEN the system SHALL CONTINUE TO support ArrowUp, ArrowDown and Enter to move through and open results

3.5 WHEN the user clicks or taps a search result THEN the system SHALL CONTINUE TO navigate to that result

3.6 WHEN the search query is empty THEN the system SHALL CONTINUE TO show no results dropdown

3.7 WHEN JavaScript is unavailable THEN the FAQ accordion SHALL CONTINUE TO open and close using native `<details>` behaviour

3.8 WHEN the URL hash does not match any FAQ id, or there is no hash THEN the system SHALL CONTINUE TO leave the FAQ items in their default state and let the user toggle them manually

3.9 WHEN the user clicks a link inside the mobile menu THEN the system SHALL CONTINUE TO close the menu and navigate

3.10 WHEN the mobile menu is closed, or the viewport uses the desktop navigation THEN the system SHALL CONTINUE TO behave as before, with Escape and route changes having no visible effect on the desktop nav

3.11 WHEN pages are viewed at 360px width THEN the system SHALL CONTINUE TO render without sideways scroll, with scroll-reveal animations working

3.12 WHEN `npm run build`, `npm run lint` and `npm run check:seo` are run THEN they SHALL CONTINUE TO pass, with no change to content, design, data files or SEO output
