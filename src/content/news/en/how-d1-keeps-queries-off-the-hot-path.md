---
translationId: cloudflare-d1-control-plane-20261013
lang: en
slug: how-d1-keeps-queries-off-the-hot-path
title: "How D1 keeps queries off the hot path"
description: "Cloudflare explains D1’s control-plane architecture for managing millions of small SQLite databases without turning Postgres into a bottleneck."
publishedAt: 2026-10-13
sourceName: "Cloudflare Blog"
sourceTitle: "Under the hood, off the hot path: How D1 scales to millions of databases"
sourceUrl: "https://blog.cloudflare.com/d1-control-plane"
author: "David Laban and Lambros Petrou"
tags: ["distributed-systems", "cloud", "databases", "edge", "performance"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Cloudflare has described how it is redesigning the control plane for D1, its serverless SQLite-based database, to operate with millions of small databases. The use case changes the classic assumption of one or two large clusters per application: AI-assisted development platforms can create one database per user, tenant, preview environment, or application. The challenge is not only storing more data, but ensuring that every query does not depend on a central component.

The architecture separates three kinds of work. The data plane handles queries and should stay close to the user. The control plane manages operations such as creating, deleting, or listing databases and may depend on central components. The asynchronous plane handles billing, analytics, and usage limits, where eventual consistency is acceptable. This separation lets each path have different guarantees instead of forcing every operation to share the latency and availability of one regional database.

According to Cloudflare, D1 grew its number of live databases by 15 times in one year and 65 times in two years, while daily active databases grew 18 times in one year. To absorb that growth, queries pass through edge Workers and Durable Objects representing each database. Workers KV stores distributed routing metadata, while Hyperdrive provides cached access to Postgres replicas when the control plane needs to consult its source of truth.

Database creation illustrates an important design decision. The system can initialize the Durable Object near the request, record creation in Postgres, and complete secondary steps asynchronously. The creation checkpoint is the point at which the database is considered created, even if the final response does not reach the client. Retries use new identifiers so that two objects cannot both believe they own the same database. Periodic heartbeats let those objects correct their state against the source of truth.

Usage enforcement follows a similar pattern. Durable Objects publish changes to queues, and a limited number of consumers batch them before writing to Postgres. To avoid recomputing the storage total for millions of databases during every check, the system maintains incremental account-level aggregates. A changes table accumulates deltas and a periodic process applies them in batches. That number is intentionally eventually consistent: the priority is preventing the mechanism from overloading the transactional database.

The lesson applies beyond Cloudflare. A multi-tenant system does not scale simply by adding replicas. Administrative operations should be moved off the hot path, routing metadata should be cached safely, eventual consistency should be accepted where the business allows it, and Postgres, a distributed cache, a queue, or an analytical store should be chosen according to the work involved. Failure recovery, retries, and idempotency also need to be designed from the beginning. Complexity does not disappear; it is placed where it does not penalize every query.
