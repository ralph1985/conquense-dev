---
translationId: cloudflare-search-agents-http-query-20261125
lang: en
slug: cloudflare-agent-search-http-query
title: "Cloudflare turns agent search into a discoverable web interface"
description: "Search for Agents combines content retrieval, automatic discovery, and HTTP QUERY, with implications for architecture and testing."
publishedAt: 2026-11-25
sourceName: "Cloudflare Blog"
sourceTitle: "Introducing Search for Agents"
sourceUrl: "https://blog.cloudflare.com/search-for-agents/"
author: "Conquense Dev"
tags: ["applied-ai", "web-architecture", "http", "testing"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 25, Cloudflare introduced Search for Agents, a service that lets agents discover and query an index of a domain’s content. The announcement raises a relevant architectural question: how to provide retrievable information to an automated consumer without requiring it to navigate an interface designed for people. The service publishes search under the site’s own domain and advertises its availability through metadata. [Cloudflare announcement](https://blog.cloudflare.com/search-for-agents/).

The separation of responsibilities deserves attention. A team maintaining documentation can evaluate retrieval independently of the answer a model eventually writes. For example, when asked about a retired API, it would be sensible to check first whether the correct migration pages appear. Only then would it make sense to assess the agent’s explanation. This is a design and evaluation recommendation, rather than an outcome demonstrated by the launch.

According to the documentation, the service is in beta. Its initial settings include hybrid keyword and vector search, synchronization every 24 hours, and a 48-hour similarity cache. The endpoint returns retrieved content in Markdown, with references and scores, rather than generating an answer. These details appear in the [Search for Agents guide](https://developers.cloudflare.com/ai-search/how-to/search-for-agents/).

For a technical portal, those settings suggest specific tests before adoption. It would be reasonable to prepare questions containing exact identifiers, concepts expressed in different words, and documentation covering several versions. Teams should also consider changing a page and measuring when the retrieved result changes. A useful test should record the query, expected documents, returned passages, and update time, helping distinguish a relevance problem from a freshness problem.

There is also a connection to HTTP design. The service supports QUERY, whose meaning is defined in RFC 10008, published in June 2026. This method allows criteria to be sent in a request body with safe and idempotent semantics: the client does not request a change to the resource and can repeat the operation after a connection failure. The RFC explains why this is useful when a query is awkward to represent in a URL. [HTTP QUERY specification](https://www.rfc-editor.org/rfc/rfc10008.html).

For a real integration, we would recommend checking QUERY’s entire path through clients, proxies, and access controls, while also retaining GET tests. A service’s advertised support does not demonstrate that every component in a deployment processes it correctly. Idempotency should not be confused with zero cost, either: any retry strategy needs limits.

The technical value of this development can be assessed through a bounded pilot: a public documentation collection, reference questions, and measurements of relevance, freshness, and latency. That evidence would help determine whether a dedicated retrieval interface improves an agent’s work and how much maintenance it adds.
