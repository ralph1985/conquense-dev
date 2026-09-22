---
translationId: retry-storms-error-ownership-20260917
lang: en
slug: uber-context-aware-retries-cascading-failures
title: "Uber turns retries into a context-aware resilience decision"
description: "Uber describes shared infrastructure that assigns error ownership before allowing more retries, limiting traffic amplification during service degradation."
publishedAt: 2026-09-17
sourceName: "Uber Engineering"
sourceTitle: "How Uber Protects Against Retry Storms"
sourceUrl: "https://www.uber.com/us/en/blog/protecting-against-retry-storms/"
author: "Deepanshu Mehndiratta, Alok Srivastava, Vibhor Dhingra, and Ankit Srivastava"
tags: ["distributed-systems", "resilience", "microservices", "observability"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Retries are often presented as a simple defence against transient failures: when a call fails, try it again. In a deep microservice architecture, however, that rule can turn a local failure into a traffic storm. Uber has explained how it is addressing the problem with a shared infrastructure layer that decides which service owns an error before allowing additional retries.

The risk comes from amplification across layers. In a linear service chain, if every hop retries, the number of requests can grow exponentially while the degraded service continues to receive more work. Retry budgets reduce the multiplication, but they do not answer the essential question: when is an error recoverable, and when is it merely being propagated from deeper in the stack?

Uber’s proposal separates symptom from cause. A service that fails because a downstream dependency has failed should not automatically present that error as its own to every caller. By contrast, a service that has no failed dependency and generates the error can claim ownership. That information is propagated through the call infrastructure, allowing retry middleware to act only near the likely source of the problem.

To establish that relationship, Uber combines dependency analysis with call middleware. The system correlates inbound and outbound errors, classifies dependencies as fail-close or fail-open, and communicates the decision through context headers. A fail-close dependency can make the entire path up to the root fail; a fail-open dependency allows the higher-level service to continue. When context is missing, the first point that cannot confirm the relationship limits propagation, reducing the storm’s radius.

The architecture also avoids relying only on distributed traces. Uber notes that sampling a very small fraction of requests can take too long to capture representative failures. Its alternative records every failure through the Muttley host proxy and middleware built around yarpc. From that data, it calculates the probability that a downstream failure causes the caller to fail: above 80 percent, the edge is classified as fail-close; below 20 percent, as fail-open; between those values, it remains unknown.

The result reported by Uber is concrete: during a degradation of a deeply nested service, the mechanism would have prevented 9.5 million spurious requests. Across its user-facing APIs, the maximum retry-storm radius fell from 25 levels to 3, while the average dropped from 20 to 2.

The technical lesson is not to remove retries, but to make them aware of causality. Budgets remain useful, yet they need shared signals, context propagation, and an explicit policy for ambiguous errors. Teams should also measure context loss and false positives: an overly aggressive policy can suppress a legitimate recovery. In distributed systems, resilience depends as much on knowing when to stop as on knowing when another attempt is justified.
