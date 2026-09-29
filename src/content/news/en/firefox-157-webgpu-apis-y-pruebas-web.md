---
translationId: firefox-157-webgpu-apis-20260929
lang: en
slug: firefox-157-webgpu-apis-y-pruebas-web
title: "Firefox 157 refines WebGPU, animations, and automated testing"
description: "Firefox 157 reaches stable with interoperability and performance improvements, while several WebGPU, Web Crypto, and notification capabilities remain experimental."
publishedAt: 2026-09-29
sourceName: "MDN Web Docs"
sourceTitle: "Firefox 157 release notes for developers (Stable)"
sourceUrl: "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157"
author: "MDN contributors"
tags: ["firefox", "webgpu", "web-apis", "testing"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Firefox 157 reached stable on September 29 with changes that matter less because of their number than because of the problems they address: interoperability, efficient memory use, and more precise testing. The developer notes mix stable capabilities with experimental features, an important distinction for any team maintaining a cross-browser web application.

WebGPU support for `TRANSIENT_ATTACHMENT` texture usage is the most technically significant addition. This resource type is intended for attachments used only during a render pass. Keeping related operations in tile memory can reduce traffic to VRAM and avoid full allocations for temporary textures. The change does not automatically make a graphics application faster, but it gives engines and developers a more explicit way to describe short-lived resources. In browser-based visualization, editing, or generated-graphics applications, that detail can reduce memory pressure and unnecessary data movement.

The release also changes the behavior of two Web Animations features. `Animation.reverse()` now starts an animation whose `playbackRate` is zero, and switching between positive and negative rates on scroll-driven animations mirrors `startTime` to the opposite end of the timeline. The result is more consistent with the specification and avoids states that are difficult to reason about when an interface combines scroll-driven animations, reverse playback, and interactive controls.

For automation, WebDriver BiDi changes `browser.setDownloadBehavior`: when the type is `allowed`, it now requires `destinationFolder`. To restore the default behavior, clients should pass `null`. This is a small change, but precisely this kind of adjustment breaks end-to-end suites that rely on implicit values. Teams running browser tests across multiple engines should review download commands and make their intended policy explicit.

The notes also list several experimental capabilities. Notifications can receive a navigation URL directly through both `Notification()` and `ServiceWorkerRegistration.showNotification()`. The HTML Sanitizer API can remove unwanted elements and attributes while parsing markup, reducing the need for a later traversal of the DOM tree. Web Crypto also adds encapsulation and decapsulation operations based on ML-KEM behind a Nightly preference, using a key-establishment mechanism designed to remain secure against quantum-computer attacks.

The editorial and engineering lesson is to separate availability from interest. An experimental API may be valuable for prototypes and compatibility testing, but it should not enter production simply because it appears in a browser’s release notes. For frontend teams, Firefox 157 is a reminder that the platform evolves in layers: specified semantics arrive first, stable implementation follows, and the period between them is when testing real browsers becomes part of architecture work.
