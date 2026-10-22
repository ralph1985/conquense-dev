---
translationId: supabase-tls-cbc-deprecation-20261012
lang: en
slug: supabase-retira-cifrados-cbc-tls-20261012
title: "Supabase will remove four CBC TLS 1.2 ciphers from its HTTP APIs"
description: "The removal will affect older clients connecting to Supabase HTTP APIs and requires reviewing operating systems, runtimes, and TLS libraries before November."
publishedAt: 2026-10-12
sourceName: "Supabase"
sourceTitle: "An outdated subset of TLS 1.2 ciphers will be disabled on project HTTP APIs"
sourceUrl: "https://supabase.com/changelog/cbc-tls-ciphers-deprecated"
author: "Supabase"
tags: ["security", "tls", "apis", "backend", "maintainability"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Supabase has announced the removal of four CBC-based cipher suites from TLS 1.2 on its project HTTP APIs. The change will begin on November 10, 2026, at the earliest, and represents a compatibility change even though the platform estimates that only a very small fraction of traffic will be affected. The announcement is useful because it shows where security dependencies often appear outside an application’s source code.

The retired suites are ECDHE variants using AES-CBC with SHA-256 or SHA-384, for both ECDSA and RSA certificates. Supabase will continue to accept TLS 1.3 and several modern TLS 1.2 suites based on AES-GCM or ChaCha20-Poly1305. The goal is to reduce old configurations with known weaknesses and prevent security scanners from continuing to report obsolete ciphers on public entry points.

The scope includes Auth, the Data API, Storage, Realtime, and Edge Functions when accessed through a project’s HTTP APIs, both on Supabase domains and custom domains. Direct Postgres connections, the pooler, and the Management API are not affected. Self-hosted installations are also outside this specific removal. That distinction matters: an organization cannot assume that all connections to the same provider negotiate TLS in the same way or share the same change date.

Supabase reports that fewer than 0.0001 percent of observed connections negotiated these ciphers during the previous 30 days. Modern clients should therefore continue working without changes. The risk is concentrated in embedded devices, old operating systems, or TLS libraries that do not support TLS 1.3 and offer only the CBC suites being removed. In a conventional web application, the browser and operating system usually hide this negotiation; in old mobile integrations, infrastructure agents, and industrial devices, it can be harder to detect.

The recommended migration is not to force one particular cipher from application code. The first step is to inventory clients connecting over HTTPS, including processes outside the main server. Then update the operating system, runtime, or TLS library to support TLS 1.3 or one of the retained TLS 1.2 suites. If an inherited client cannot be updated, Supabase suggests using a controlled proxy that terminates the old connection and establishes a modern one with the platform, although that architecture adds another component that must be secured and monitored.

The maintenance lesson is straightforward: application tests do not necessarily cover handshake compatibility. Before the removal date, teams should test representative clients, review OpenSSL, Java, .NET, or mobile-library versions, and monitor connection failures rather than only HTTP responses. A cipher change can fail before an API request exists in the project logs. Client inventory and dependency renewal should therefore be part of normal planning, even when the provider expects a statistically tiny impact.
