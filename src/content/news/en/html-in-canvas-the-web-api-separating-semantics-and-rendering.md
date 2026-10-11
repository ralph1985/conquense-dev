---
translationId: html-in-canvas-api-iteration-20260929
lang: en
slug: html-in-canvas-the-web-api-separating-semantics-and-rendering
title: "HTML-in-Canvas: the web API separating semantics from rendering"
description: "Chrome is refining its experimental HTML-in-Canvas API to combine real DOM elements with WebGL and WebGPU rendering, introducing changes to ergonomics, texture memory, and DOM-to-"
publishedAt: 2026-09-29
sourceName: "Chrome for Developers"
sourceTitle: "HTML-in-Canvas updates: Iterating toward a better Web API"
sourceUrl: "https://developer.chrome.com/blog/html-in-canvas-ot-changes"
author: "Natalia Markoborodova"
tags: ["web-apis", "javascript", "webgpu", "canvas", "frontend"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

The experimental HTML-in-Canvas API is trying to resolve a familiar tension in web graphics applications: Canvas provides direct control over rendering, while the DOM remains the most practical foundation for semantics, interaction, and many browser capabilities. Chrome’s update published on September 29 shows that the challenge is not simply drawing HTML elements inside a graphics surface, but defining precisely how the two models should coexist.

HTML-in-Canvas allows real DOM elements to be placed inside a `<canvas>` so they can participate in a scene managed by WebGL or WebGPU. This combination preserves important DOM advantages —such as text search, interaction with controls, and selected accessibility or autofill features— while allowing visual content to be integrated into a GPU-accelerated pipeline. The approach is particularly relevant to editors, 3D interfaces, educational experiences, and applications that need to mix conventional controls with an accelerated scene.

Chrome 150 and Chrome 155 introduced several changes in response to developer feedback and standards work. In WebGL, redundant arguments were removed from `texElementImage2D`, while WebGPU reorganized the parameters of `copyElementImageToTexture` into separate source and destination objects. The aim is to reduce ambiguity and bring the API closer to current graphics-interface conventions, although the immediate cost is that implementations built against the earlier version must be updated.

Another important change concerns how drawable elements are declared. The API allows an element to capture its entire subtree except for descendants that are also marked as drawable. This makes it possible to separate a container and an inner button into different draw calls, which is useful when each part must be animated or synchronized with different transforms. In a complex interface, that separation can prevent a small update from forcing the entire scene to be recomposed.

The update also requires explicit texture-memory preallocation and changes the synchronization model between the DOM and drawn geometry. In 2D contexts, part of that synchronization can be automatic; in WebGL and WebGPU, developers must work with transforms such as `DOMMatrix` and update geometry explicitly. That decision is consistent with the control offered by those APIs, but it introduces responsibilities that are usually hidden in a conventional DOM interface.

The architectural lesson is straightforward: combining semantics and GPU acceleration requires explicit contracts between layers. HTML-in-Canvas remains in an extended origin trial through Chrome 160, so its implementation can still change and should not yet become an indiscriminate production dependency. Teams experimenting with it should isolate the integration, monitor memory use, test interaction, and validate behavior on devices with different graphics capabilities. The API does not remove the complexity of a GPU interface; it makes that complexity visible and potentially more manageable.
