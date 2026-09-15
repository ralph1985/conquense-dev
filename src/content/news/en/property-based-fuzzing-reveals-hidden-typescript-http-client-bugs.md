---
translationId: property-based-fuzzing-http-client-20260905
lang: en
slug: property-based-fuzzing-reveals-hidden-typescript-http-client-bugs
title: "Property-based fuzzing reveals hidden bugs in a TypeScript HTTP client"
description: "A generative testing experiment found eleven defects in an HTTP client that already had hundreds of example-based tests. The experience shows how to test"
publishedAt: 2026-09-05
sourceName: "Import Chaos"
sourceTitle: "Fuzzing the State Machines Inside My HTTP Client"
sourceUrl: "https://blog.gaborkoos.com/posts/2026-09-05-Fuzzing-the-State-Machines-Inside-My-HTTP-Client/"
author: "Gabor Koos"
tags: ["testing", "javascript", "typescript", "property-based-testing", "reliability"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

A recent article by Gabor Koos shows why a large test suite can still leave critical behavior uncovered. The author was working on a JavaScript and TypeScript HTTP client that already had tests for retries, timeouts, cancellation, circuit breakers, bulkheads, request deduplication, and plugin combinations. It had nineteen files and 206 test blocks, all passing. Even so, generative tests found eleven defects that had not appeared during ordinary development.

The first discovery involved hedging. The client could launch a second copy of a request after a short delay and return whichever useful response arrived first. The bug appeared when the second attempt failed quickly while the original was still in flight. Instead of describing one concrete case, the author stated a property: whenever any attempt can return a usable response, the plugin must return it regardless of event ordering. A generator produced a counterexample almost immediately and reduced it to a sequence only three milliseconds wide.

The difference from example-based testing is not that examples are useless. Examples document important scenarios and provide readable regressions. Their limitation appears when behavior depends on many permutations: completion order, partial failures, cancellations, timers, and competing responses. Manually listing every combination is expensive and tends to omit exactly the interactions the author did not imagine.

Property-based testing changes the unit of work. Instead of choosing specific inputs and outputs, the team expresses system invariants: a cancelled response must not be delivered again; a deduplicated operation must not produce incompatible results; a request must not remain blocked forever because one of its attempts disappeared. The tool then generates event sequences, clocks, and outcomes and searches for a violation. Shrinking attempts to turn a complex failure into the smallest case that still reproduces it.

The experience also exposes a quality problem in the tests themselves. A suite may contain many blocks and still be shallow if it never reaches difficult states. The article therefore recommends measuring semantic coverage, not only lines or branches: how often circuit breakers opened, limits were exhausted, cancellations occurred, stale results were discarded, or races were resolved. If an interesting path remains at zero, the tests are not showing that the system is robust; they are showing only that the path was never visited.

For TypeScript projects coordinating concurrency, networking, or plugins, the lesson is practical. Keep clear examples for core contracts, but add properties for state machines and timing combinations. Preserve seeds for discovered failures, record minimized cases as regressions, and distinguish generator defects from product defects. Automation does not replace engineering judgment; it expands the space the team can explore without having to hand-write every improbable scenario.
