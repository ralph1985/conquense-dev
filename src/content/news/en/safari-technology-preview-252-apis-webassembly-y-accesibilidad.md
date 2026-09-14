---
translationId: safari-technology-preview-252-web-platform-20260911
lang: en
slug: safari-technology-preview-252-apis-webassembly-y-accesibilidad
title: "Safari Technology Preview 252 puts new browser capabilities under test"
description: "WebKit adds advances in CSS, WebAssembly, WebGPU and accessibility that make capability testing more important than relying on browser version numbers."
publishedAt: 2026-09-11
sourceName: "WebKit"
sourceTitle: "Release Notes for Safari Technology Preview 252"
sourceUrl: "https://webkit.org/blog/18304/release-notes-for-safari-technology-preview-252/"
author: "Jon Davis"
tags: ["webkit", "safari", "javascript", "css", "webassembly"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

WebKit has published the release notes for Safari Technology Preview 252, an experimental build that brings together several small but relevant changes for teams maintaining cross-browser web applications. It is not a release that can be reduced to one headline API. Its value lies in the combination of platform work, accessibility fixes and performance-related changes that will eventually influence compatibility testing.

CSS gains several improvements aimed at detecting capabilities and inspecting rule state from JavaScript. WebKit adds the named-feature() function for @supports conditions, introduces CSSConditionRule.supports and exposes CSSMediaRule.matches. It also adds support for the unprefixed user-select property and fixes details involving text-decoration-inset. These features can reduce user-agent string checks and support a progressive-enhancement strategy: detect the capability that is actually available, then enable the corresponding experience.

The preview also adds support for WebAssembly memory64 together with multiple memories. This matters to browser applications that handle large datasets, editing tools, scientific visualisation or engines that need to exceed the address-space limits of traditional WebAssembly. It does not mean that every application should migrate immediately. The practical lesson is to test compilation, initialisation, buffer exchange and error handling across engines whenever a project depends on WebAssembly, because effective support may arrive in stages.

On the graphics side, WebKit improves how WebGL content copied into images is handled and adds the snorm10-10-10-2 value to GPUVertexFormat in WebGPU. These are low-level changes, but they affect libraries that abstract GPU access. A maintainable abstraction should check device capabilities, provide a fallback path and avoid assuming that a format available in one browser is available everywhere else.

The accessibility fixes deserve equal attention. Safari Technology Preview 252 corrects accessible names involving display: contents and list markers. This is a reminder that a change that looks purely visual can alter the tree interpreted by screen readers. Component tests should cover accessible names, reading order and keyboard navigation, not just visual snapshots.

The editorial value of this build is not a recommendation to deploy an experimental browser in production. It is an early signal. Teams can add Safari Technology Preview to a test matrix, enable features through capability detection and identify architectural areas that depend on non-standard behaviour. Web compatibility is maintained through continuous testing and sensible degradation; WebKit's notes provide a concrete list of places to begin.
