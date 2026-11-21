---
translationId: workers-request-signal-cancellation-20261102
lang: en
slug: workers-request-signal-work-cancellation
title: "Workers enables Request.signal by default: cancellation is part of architecture too"
description: "The change effective November 17 enables explicit cancellation designs for operations whose clients have disconnected."
publishedAt: 2026-11-02
sourceName: "Cloudflare"
sourceTitle: "Request.signal will be enabled by default in Workers on November 17"
sourceUrl: "https://developers.cloudflare.com/changelog/post/2026-11-02-request-signal-default/"
author: "Conquense Dev"
tags: ["javascript", "web-apis", "performance", "testing"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

Since November 17, Cloudflare Workers with a compatibility date on or after that day receive client disconnections through request.signal by default. Existing Workers retain their behavior until their configuration changes. The signal must be passed explicitly to downstream operations: the change does not enable request_signal_passthrough. [Source: Cloudflare](https://developers.cloudflare.com/changelog/post/2026-11-02-request-signal-default/).

The architectural consequence deserves attention: leaving a screen can become a condition that the server uses to stop unnecessary work. Consider a search interface that queries several services while the user repeatedly changes filters. As a design example, if an older response no longer has a recipient, continuing all its queries may consume capacity without improving the experience. Teams should identify which operations retain value after disconnection.

The editorial recommendation is to classify work by its relationship to the request. Reads intended solely to construct the response are often good cancellation candidates. An operation recording a confirmed action needs a different analysis: losing the connection does not demonstrate that it should be undone or that it has not completed. That distinction prevents applying the same policy to a search and to a write with persistent effects.

In JavaScript, the design can use internal interfaces that accept a cancellation signal where appropriate. The aim is to make explicit who controls an operation’s lifetime. If a function starts several tasks, it should be clear how cancellation propagates and which resources each task releases. Each library’s capabilities also need checking: accepting a parameter in an application wrapper does not demonstrate that the underlying operation can actually stop.

Tests should cover situations that a successful response does not exercise. One concrete proposal is to start a slow request, disconnect the client and observe whether the associated work ends. The scenario can then be repeated when one task has already finished, when several run in parallel and when an unrelated error occurs. The expected outcome needs defining for each case, particularly when a write is involved or a task must continue for business reasons.

Observability needs deliberate design too. An expected cancellation should be distinguishable from a service failure so that indicators do not mix abandonment with unavailability. As a practical evaluation, teams can compare operations started, completed and canceled, alongside their duration. The announcement does not provide a universal performance improvement: any savings will depend on the work actually interrupted. The technical opportunity is to review each request’s boundaries and verify that the server stops working when continuing no longer provides value.
