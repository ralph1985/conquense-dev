---
translationId: safari-preview-253-webgpu-webdriver-20260923
lang: en
slug: safari-technology-preview-253-improves-webgpu-webdriver-and-scroll-animations
title: "Safari Technology Preview 253 refines WebGPU, WebDriver, and scroll animations"
description: "The WebKit preview release combines fixes affecting graphics performance, automated-test reliability, accessibility, and emerging scroll-linked animation APIs."
publishedAt: 2026-09-23
sourceName: "WebKit"
sourceTitle: "Release Notes for Safari Technology Preview 253"
sourceUrl: "https://webkit.org/blog/18357/release-notes-for-safari-technology-preview-253/"
author: "Saron Yitbarek"
tags: ["web-platform", "webgpu", "webdriver", "accessibility", "performance"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

WebKit has published Safari Technology Preview 253, a testing release containing changes between revisions 320113 and 321067 of the project. It is not a stable Safari release and does not promise immediate compatibility, but its notes provide a useful signal for teams building complex web applications: browser work is increasingly focused both on fixing platform details and on making failures that affect users and test tooling more observable.

For accessibility, WebKit fixes an issue in which VoiceOver could repeatedly announce the same live-region content as it received streamed updates. It also adjusts the reading of `aria-keyshortcuts` values containing `Meta` or `Alt` so that macOS terminology is used. These changes may look minor, but they reinforce that a dynamic interface cannot be evaluated only from its initial DOM tree. Applications that stream statuses, results, or messages should test the timing and sequence of those updates with real assistive technologies.

The engine also advances scroll-linked animations. Safari Technology Preview 253 allows style-originated scroll timelines to be resolved through `timeline-scope` and fixes several cases in which `ViewTimeline` failed to update when scrollable overflow changed. For teams using CSS animation as part of navigation, this can reduce behavior that depends on the exact DOM structure, although graceful degradation remains necessary in browsers that do not implement the same level of the specification.

The most practical changes for engineering may be in WebDriver BiDi and WebGPU. WebKit fixes incorrect error-message trimming in `script.call_function`, wrong stale-element states, and cookies that appeared to be deleted before the operation had completed. These fixes may remove false failures from cross-browser suites, especially when a test changes context or chains actions quickly. In WebGPU, the release addresses, among other issues, poor performance when uploading a `canvas` as a texture, unexpected device loss, unnecessary bind-group rebuilds, and stalls during asynchronous pipeline creation.

The recommendation is not to enable every capability in production immediately. Instead, add Safari Technology Preview to a test matrix and separate three questions: whether the API exists, whether it produces the correct result, and whether it maintains an acceptable cost. For WebGPU, teams should also test recovery after `device lost`; for WebDriver, they should record browsing context and page state when an action fails. This release shows that performance, accessibility, and automation are not independent layers: a maintainable web platform requires all three to evolve together.
