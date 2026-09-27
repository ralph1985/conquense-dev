---
translationId: uber-dependency-failure-analysis-20260915
lang: en
slug: uber-automated-dependency-analysis-across-the-service-mesh
title: "Uber automates failure-dependency analysis across its service mesh"
description: "Uber describes a system that combines request context, middleware and metrics to identify which dependencies cause failures in critical APIs without sampling every request."
publishedAt: 2026-09-15
sourceName: "Uber Engineering"
sourceTitle: "Large-Scale Automated Dependency Analysis Across Uber's Service Mesh"
sourceUrl: "https://www.uber.com/us/en/blog/automated-dependency-analysis/"
author: "Deepanshu Mehndiratta, Alok Srivastava, Shivam Jindal and Ankit Srivastava"
tags: ["distributed systems", "observability", "reliability", "microservices", "Go"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

In a microservice architecture, a request that fails at the user-facing API may depend on a long chain of asynchronous calls. Identifying which service originated the problem and which dependencies can actually bring down the main service is difficult even when distributed traces are available. Uber has described a system that automatically catalogs these relationships across its service mesh.

The initial problem is statistical. Traces contain rich context, but processing every request is too expensive at large scale. With a 0.01% sampling rate, an API with 99.9% availability could take hours to capture a single failed request, and longer still to gather enough examples for a stable relationship. Waiting for representative traces is too slow for systems that are continuously changing.

Uber’s alternative records metrics for every failure through the local proxy that already mediates calls between services. To recover the missing granularity, the system adds inbound and outbound middleware at the YARPC layer. The inbound middleware assigns an identifier to the request and propagates it through `context.Context`. When the application calls a downstream service, the outbound middleware uses that identifier to associate the call, destination endpoint and result with the original request.

The data is held temporarily in a `RequestTracker`. When the request completes, the middleware emits a metric linking the inbound endpoint to each outbound dependency and records whether both sides failed. This makes it possible to observe every failure without storing a complete trace for every request. The cost shifts from storing detailed histories to designing an aggregated signal that is precise enough for the decision being made.

Uber classifies each dependency as fail-close, fail-open or unknown. A fail-close dependency is one whose failure usually causes the caller to fail as well; a fail-open dependency may fail without propagating the error. The classification uses the proportion of cases in which the downstream node and caller both fail: values at or above 0.8 are treated as fail-close, while values at or below 0.2 are treated as fail-open. The middle range prevents uncertain causality from being presented as fact.

The system also requires precision in context propagation and middleware ordering. Retries are processed after the analysis middleware so that each attempt is not counted as an independent dependency. This is a small implementation detail, but it prevents the relationship between the original failure and the observed response from being distorted.

The lesson applies beyond Uber: useful observability does not always require more traces, but better relationships between events. A metrics schema with context, explicit thresholds and uncertainty categories can expose critical dependencies and guide reliability investments. The thresholds remain heuristics, however, and should be checked against traffic changes, deployments and retry behavior. Automation accelerates detection; it does not turn a poorly modeled correlation into causation.
