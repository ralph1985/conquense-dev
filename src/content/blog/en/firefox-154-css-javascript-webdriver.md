---
translationId: firefox-154-web-platform-2026-08-18
lang: en
slug: firefox-154-css-javascript-webdriver
title: "Firefox 154 adds tools for CSS, JavaScript, and web automation"
description: "The release adds CSS sibling functions, new iterator helpers, and WebDriver BiDi improvements."
publishedAt: 2026-08-18
sourceName: "MDN Web Docs"
sourceTitle: "Firefox 154 release notes for developers (Stable)"
sourceUrl: "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/154"
author: "MDN contributors"
tags: ["web", "css", "javascript", "testing"]
readingTime: 3
aiDisclosure: "This text was AI-generated and reviewed before publication."
---

Firefox 154, released on August 18, brings together small but useful changes for everyday frontend and automation work. MDN’s notes highlight additions in CSS, JavaScript, WebRTC, and WebDriver BiDi. It is not a release that requires an application rewrite, but it broadens options that can simplify components, tests, and diagnosis.

CSS gains `sibling-count()` and `sibling-index()`. These functions expose the number of an element’s siblings and its position within that set. They are particularly useful for styles driven by the actual structure of a list or grid, because they can reduce the need to add positional classes from JavaScript or on the server. As with any recent CSS function, adoption should follow the compatibility requirements of the project: essential rules need acceptable behaviour in browsers that do not yet implement it.

The release also adds `text-box-edge`, `text-box-trim`, and the `text-box` shorthand. Their purpose is to control the vertical space surrounding text inside its box. The issue is familiar in interfaces using several fonts, compact buttons, or text blocks that must align visually: a line box includes typographic metrics that do not always match the visible shape of glyphs. These properties provide a declarative way to adjust that space, although they should be tested with real fonts, localised content, and accessibility sizes before becoming a design requirement.

Several iterator methods arrive in JavaScript. `includes()` and `join()` bring familiar array-like operations to iteratively consumed data. `chunks()` groups consecutive values, while `windows()` yields sliding windows. This can make sequence processing more expressive when materialising an entire input collection is undesirable. It does not make iterators an automatic performance solution, however: teams still need to check how much data is produced, when it is consumed, and whether a later stage ends up creating large arrays.

The version also adds capabilities relevant to automation. WebDriver BiDi gains download identifiers in start and end events, user-context data in several commands and events, and commands to start and stop recording a browsing context. For quality teams, these improvements can make event correlation easier and help isolate tests using different profiles or containers. The notes also record a fix for premature resolution of some subframe navigations.

The practical takeaway is measured: review these capabilities when updating the browser matrix, and use them where they remove supporting code or make tests more observable. Compatibility and testing against target browsers remain the condition for taking them into production.
