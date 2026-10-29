---
translationId: selenium-451-bidi-typescript-20261009
lang: en
slug: selenium-451-consolida-bidi-y-publica-sus-atoms-de-javascript-en-typescript
title: "Selenium 4.51 strengthens BiDi and publishes its TypeScript-based JavaScript components"
description: "The new Selenium version combines BiDi code generation, web-extension support, and an independent npm distribution for its browser atoms."
publishedAt: 2026-10-09
sourceName: "Selenium"
sourceTitle: "Selenium 4.51 Released!"
sourceUrl: "https://www.selenium.dev/blog/2026/selenium-4-51-released/"
author: "Diego Molina"
tags: ["testing", "javascript", "typescript", "webdriver"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

Selenium 4.51 includes changes that are especially relevant to teams maintaining web automation in JavaScript and TypeScript. Although it is presented as a project release, the details show a clear technical direction: replace browser-specific pieces with typed components, expand WebDriver BiDi, and make the publishing infrastructure more resilient.

One of the main changes is that the browser atoms, now written in TypeScript, are published as the standalone npm package `@selenium/atoms`. These components contain logic that Selenium runs inside the browser to perform common operations. Separating them into an explicit package makes distribution easier and exposes a maintenance boundary that was previously more integrated into the main project. The release also removes obsolete atoms related to WebSQL and AppCache, two legacy technologies that no longer represent the current web platform.

The release continues to expand WebDriver BiDi support, the bidirectional protocol that enables richer communication between the automation client and the browser. Selenium adds vendor-specific class generation for JavaScript and a BiDi code generator for Java. For Firefox, it pins the vendor CDDL from the Firefox repository. Together, these changes reduce hand-written code and help keep protocol definitions aligned with their sources.

For JavaScript, the release also adds web-extension installation and removal through BiDi, with a fallback to the classic protocol when the browser does not provide that capability. The pattern matters for cross-platform suites: a modern API can be the preferred path, but compatibility should be explicit and testable. This prevents a test from failing simply because one environment still needs the older mechanism.

Other changes directly support maintainability. Guava is removed as a dependency from the Java client bindings, while one incompatible removal is postponed to give users more migration time. Selenium Manager now degrades to empty metadata when its cache cannot be read instead of failing. In the publishing infrastructure, Java artifacts are signed in process, and the release workflow can recover from an incomplete publication.

These decisions matter because a testing platform must do more than execute assertions. It also has to distribute browser code, generate clients for evolving protocols, resolve drivers, and publish reproducible artifacts. Every removed dependency, documented fallback, and automated recovery path reduces a different class of operational failure.

The useful lesson for teams is not to upgrade without review. Check whether the suite uses imports affected by the Guava removal, whether it depends on legacy atoms, and whether extension tests can move to BiDi. It is also worth observing fallback behaviour in the browsers used by the pipeline. Selenium 4.51 makes framework maintenance part of test quality: the layers supporting automation need to be typed, auditable, and able to degrade safely.
