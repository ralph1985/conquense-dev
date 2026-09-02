---
translationId: opentelemetry-go-logs-rc
lang: en
slug: opentelemetry-go-logs-api-sdk-near-stability
title: "OpenTelemetry Go moves its Logs API closer to stability"
description: "The OpenTelemetry Go Logs API and SDK reach release-candidate status after a long beta period, with particular attention to backpressure, allocations, and future compatibility."
publishedAt: 2026-08-31
sourceName: "OpenTelemetry"
sourceTitle: "OpenTelemetry Go Logs API and SDK reach release candidate status"
sourceUrl: "https://opentelemetry.io/blog/2026/go-logs-api-sdk-rc/"
author: "Robert Pająk"
tags: ["opentelemetry", "observability", "go", "architecture"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

OpenTelemetry Go has published `v1.47.0-rc.1` of its Logs API and SDK. Reaching release-candidate status means the design is entering the final validation phase before receiving stable compatibility guarantees in the 1.x line. The project is asking teams to test it in real applications and integrations, while making clear that the exporter and `logtest` modules remain experimental.

The RC specifically covers `go.opentelemetry.io/otel/log` and `go.opentelemetry.io/otel/sdk/log`. Both move from beta version `v0.22.0` to `v1.47.0-rc.1`, aligning with the coordinated versioning scheme used by the other stable OpenTelemetry Go modules. The release also adds `Logger`, `GetLoggerProvider`, and `SetLoggerProvider` to the root `go.opentelemetry.io/otel` package. Equivalent APIs in `go.opentelemetry.io/otel/log/global` are now deprecated. This brings global log access closer to the patterns already used for traces and metrics.

The announcement matters to observability architecture because it narrows the gap between the three main signals. An application can use similar concepts for providers, instrumentation scopes, processors, exporters, and options across traces, metrics, and logs. That does not remove design decisions, but it makes it easier to build a shared pipeline and connect records with execution context without introducing a completely separate logging framework.

The project kept the API in beta for a long period because logging often runs on hot application paths. Recent changes include shared use of `attribute.Value` and `attribute.KeyValue`, along with a redesign of the `BatchProcessor` to behave more safely when an exporter experiences backpressure. The SDK uses a bounded queue and keeps log emission from waiting for exporter I/O. It also defines explicit flush and shutdown behavior.

Performance was considered as part of the design: common operations aim to reduce heap allocations and garbage-collection pressure. The reference configuration is optimized for an OTLP exporter with batch processing, but that does not replace measurements from each service. High-volume applications should observe memory usage, record loss or delay, attribute limits, and behavior during restarts.

The team will keep a feedback period of at least 14 days before stabilizing the API and SDK. To test them, it recommends updating the modules to `v1.47.0-rc.1` and exercising direct API use, logging bridges, custom processors or exporters, high-volume workloads, and application shutdown. This is a concrete opportunity to find incompatibilities before the v1 compatibility promise makes breaking changes more expensive.
