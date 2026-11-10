---
translationId: web-guidance-agents-component-contracts-20261110
lang: en
slug: web-guidance-agents-component-contracts
title: "How to guide frontend agents without breaking the component system"
description: "Two cases published by Chrome show how to evaluate AI recommendations about web standards and fit them into an existing architecture."
publishedAt: 2026-11-10
sourceName: "Chrome for Developers"
sourceTitle: "How note inc. boosted modern web guideline adherence from 61% to 94% using Modern Web Guidance"
sourceUrl: "https://developer.chrome.com/blog/mwg-with-internal-component"
author: "Editorial team"
tags: ["frontend", "javascript", "applied-ai", "testing", "maintainability"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 10, Chrome published note inc.’s evaluation of Modern Web Guidance: web standards instructions for coding agents. Across 180 runs, one agent improved from 60.8% to 94% adherence with explicit guidance. The evaluation used 19 checks in Chromium and WebKit. A conflict also emerged: recommendations could displace internal components. note established a hierarchy prioritizing its library and applying guidance where capabilities were missing. [The note case study](https://developer.chrome.com/blog/mwg-with-internal-component).

Another publication that day describes a review bot at MetaMask. Of 102 findings on feature and fix changes, 43 were fixed and three partly addressed. Another 16 were declined or classified as false positives. The bot advises without blocking merges. The team had not yet measured per-review costs, execution duration, or behavior outside React. [The MetaMask case study](https://developer.chrome.com/blog/metamask-modern-web-guidance).

Our proposed technical interpretation is to treat agent instructions as an architectural interface. A general recommendation needs a concrete entry point in each project. Before requesting changes, teams should identify which component owns the behavior, which guarantees it provides, and which requirements fall outside its contract. That distinction allows an improvement to be discussed without turning every review into a replacement of abstractions.

For a team considering an experiment, a reasonable approach would be to prepare a small set of representative tasks and preserve their acceptance criteria before running the agent. Tests should describe outcomes observable by users. Teams should also record whether the solution follows repository conventions and whether it introduces exceptions that future maintainers will need to remember. This would allow functional quality and maintenance costs to be compared separately.

The evaluation would also need to distinguish useful suggestions from accepted suggestions. A correction can be valid yet remain pending because of scope; another can be applied quickly and turn out to be unnecessary. We recommend having people familiar with the product review a sample from both categories. To estimate operational usefulness, we would add human verification time, subsequent regressions, and changes requested by reviewers. These are proposed metrics, not results from the published cases.

The percentages above must be read within their respective evaluation designs: passing checks and resolving findings measure different things. Neither can independently establish the savings a particular team would achieve. The practical decision would be to begin with reviewable recommendations, compare implementations on the same tasks, and expand automation once local evidence shows that it improves outcomes without increasing the review burden.
