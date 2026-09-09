---
translationId: cypress-16-http2-testing-2026
lang: en
slug: cypress-16-brings-end-to-end-tests-closer-to-the-real-web
title: "Cypress 16 brings end-to-end tests closer to the real web"
description: "Cypress 16 adds HTTP/2, improves visibility checks, and handles test secrets more safely. The release shows why test speed and environmental fidelity are part of engineering"
publishedAt: 2026-09-01
sourceName: "Cypress Blog"
sourceTitle: "Cypress 16: faster tests, starting with HTTP/2 support"
sourceUrl: "https://www.cypress.io/blog/cypress-16-faster-tests-starting-with-http2-support"
author: "Jennifer Shehane"
tags: ["testing", "javascript", "web-performance", "security"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cypress 16 carries a broader idea than any individual optimization: an end-to-end suite should not measure an environment that is artificially slower, less realistic, or less secure than the one users actually run. The release enables HTTP/2 by default in Chromium-based browsers and adds changes designed to reduce both runtime and flakiness during long test executions.

Until now, Cypress’s proxy used HTTP/1.1 even though many production applications already use HTTP/2. The difference is not merely about protocol labels. HTTP/2 multiplexes requests over a single connection, allowing pages with many small resources to avoid unnecessary queues. Cypress reports an internal test in which a page with 1,000 images finished in 1,362 milliseconds with HTTP/2, compared with 3,896 milliseconds over HTTP/1.1. That is not a guarantee for every project, but it is a useful reminder that the transport used during testing can distort results.

The change also makes real-time application flows easier to exercise. Server-sent events are no longer constrained by the familiar six HTTP/1.1 connections per domain when the test runs over HTTP/2. Support is not uniform, however: in this release the improvement applies to Chromium, while Firefox and WebKit continue to use HTTP/1.1. That difference belongs in the browser matrix, particularly for products that depend on streaming, notifications, or upload progress.

Cypress also replaces its previous visibility algorithm with one that first uses browser capabilities and then applies adaptive sampling to determine whether an element is covered. The goal is to reduce layout recalculation in large component trees. It is a useful lesson for test design: an assertion that appears cheap can become expensive when repeated thousands of times across a complex interface.

Version 16 removes the default 10-millisecond delay between cy.type keystrokes, enables browser memory management to prevent long runs from collapsing, and updates the foundation to Node.js 24, Electron 41, Chromium 146, and Vite 8. These are infrastructure changes, but they directly affect the team’s feedback loop.

The most consequential security decision is the removal of Cypress.env. The API could expose configured variables inside the browser, making a secret readable by application code, third-party scripts, or another-origin context visited during a test. The replacement APIs distinguish browser-facing values from secrets that should remain in the Node.js automation process. Migration requires configuration work, but it also restores a trust boundary that E2E suites should not blur.
