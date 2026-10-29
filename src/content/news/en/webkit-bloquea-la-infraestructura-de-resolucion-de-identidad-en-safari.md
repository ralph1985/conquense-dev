---
translationId: webkit-identity-resolution-blocking-20261019
lang: en
slug: webkit-bloquea-la-infraestructura-de-resolucion-de-identidad-en-safari
title: "WebKit blocks identity-resolution infrastructure to curb post-cookie tracking"
description: "Safari and WebKit block third-party connections at the domain level when they turn email addresses and phone numbers into persistent cross-site identifiers."
publishedAt: 2026-10-19
sourceName: "WebKit"
sourceTitle: "Blocking Identity Resolution Infrastructure"
sourceUrl: "https://webkit.org/blog/18438/"
author: "John Wilander, Charlie Wolfe, and Matthew Finkel"
tags: ["privacy", "browsers", "web", "tracking"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

WebKit has described a protection included in Safari on iOS, iPadOS, macOS, and visionOS 27 to block a form of tracking designed to survive the end of third-party cookies. The technique is known as identity resolution and uses information that a user enters on one site, such as an email address, to connect activity with a common identity across other sites.

The pattern is technically simple, although its consequences are broad. A third party present on a page can receive an email address during sign-up or subscription, turn it into an opaque identifier, and send that identifier back to the browser. The value can then be stored on the site and used later to relate visits, devices, or profiles. The third party ultimately builds an identity graph connecting data from different contexts.

WebKit says the new protection blocks network access to the infrastructure used for that resolution. The block operates at the domain level, so changing the exact shape of the request is not enough to bypass it. The measure is intended to stop the email address from reaching the external server and to cut off the downstream operations based on that identifier.

The important distinction for web application developers is between first-party personalization and third-party tracking. A service can continue to use the data it needs to manage its own account or adapt its experience within its own domain. What is limited is the invisible presence of external infrastructure acting as an intermediary between multiple sites while retaining the ability to match their records.

This has practical consequences for frontend architecture. Teams should review which scripts receive form values, which domains appear in requests after sign-in, and which functions depend on identifiers shared across sites. An integration that looks like analytics, advertising, or personalization may rely on an external identity resolver. The review should be based on observing real traffic and documenting the purpose of each transfer, not only on reading a package name.

The decision also illustrates a change in web-privacy defence. Blocking cookies no longer covers every path used to correlate users. The browser has to intervene in the network and in the intermediaries receiving the data, even when an application uses legitimate web APIs and the user has voluntarily entered information into a form.

WebKit preserves a conceptual exception for first-party personalization and mentions Hide My Email as an additional protection based on randomized addresses. For developers, the conclusion is architectural rather than commercial: design identity and telemetry with clear boundaries, minimize the transmission of personal data, and assume that browsers will continue moving part of the privacy responsibility from site configuration into the platform itself.
