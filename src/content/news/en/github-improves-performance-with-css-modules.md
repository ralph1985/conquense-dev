---
translationId: github-css-modules-performance-20260925
lang: en
slug: github-improves-performance-with-css-modules
title: "GitHub improved web performance by shipping more CSS and running less JavaScript"
description: "GitHub’s migration from CSS-in-JS to CSS Modules reduced client and server work, showing how moving styling costs into the build process can improve performance at scale."
publishedAt: 2026-09-25
sourceName: "The GitHub Blog"
sourceTitle: "Improving site performance by shipping more CSS"
sourceUrl: "https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/"
author: "Josh Black and Marie Lucca"
tags: ["frontend", "css", "web-performance", "architecture"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

GitHub has completed the migration of github.com from CSS-in-JS to CSS Modules, a decision that may initially seem counterintuitive: shipping more CSS can improve performance when it avoids running styling work on every page and for every component.

The problem became visible as the number of Primer components, GitHub’s design system, grew. With the previous approach, styles were initialized on the client and collected during server rendering. As component counts increased, so did initial loading time, server-rendering cost, and the work required to update dynamic styles. The `sx` property, based on JavaScript objects, provided strong TypeScript integration and design-token support, but it also required more work at runtime.

CSS Modules changed the division of responsibility. Styles remain next to component code, but they are processed as CSS and generate local class names by default. The browser receives stylesheets with the HTML and does not need a CSS-in-JS runtime to construct rules during execution. Much of the encapsulation remains, while part of the JavaScript and style-collection cost disappears.

The migration method is the most useful part of the story. GitHub did not replace every component in one deployment. For each component, the team added a CSS Modules implementation, protected it with a feature flag, and used visual regression tests to verify that screenshots remained equivalent. The change was first rolled out to the team, then to GitHub staff, and finally to all users. This sequence provided measurements and surfaced problems before the rollout expanded.

By December 2024, Primer’s components had migrated and GitHub had measured 55% less server-rendering time and 25% less component initialization time. The harder phase followed: removing thousands of `sx` usages and the compatibility layers that kept older code working. Eight engineers migrated 6,419 properties over six months, with server-rendering improvements ranging from 1% to 22% depending on the page. Later, another team reduced the remaining inventory from 895 usages to zero in three weeks.

GitHub says the entire site has run on CSS Modules since June 2026. The result is more than a library replacement. It is a redefinition of the boundary between build time and runtime, supported by incremental migration, visual tests, feature flags, and production observation. The lesson for other frontend teams is practical: when a styling abstraction adds cost proportional to the number of components, measure whether some of that work can be completed before code reaches the browser.
