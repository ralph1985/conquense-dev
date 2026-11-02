---
translationId: cloudflare-glm-kv-cache-isolation-20261026
lang: en
slug: cloudflare-glm-kv-cache-isolation
title: "An inference cache leak shows why error paths need isolation too"
description: "The GLM-5.3 incident in Workers AI offers lessons about shared memory, request rejection, and isolation testing."
publishedAt: 2026-10-26
sourceName: "Cloudflare Blog"
sourceTitle: "Cross-request KV cache exposure in the GLM-5.3 Workers AI model, and our remediation with SGLang"
sourceUrl: "https://blog.cloudflare.com/kv-cache-exposure-remediation/"
author: "Conquense Dev Editorial"
tags: ["security", "ai", "systems", "testing"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On October 26, Cloudflare disclosed an isolation incident affecting GLM-5.3: 155 responses incorporated data from other requests. A capacity mismatch and an SGLang bug allowed residual state to be reused after excessively long requests were internally rejected. The company corrected the configuration and engine; it says no other model was affected. The incident occurred between August and September, although its technical explanation has now been published. [Cloudflare report](https://blog.cloudflare.com/kv-cache-exposure-remediation/).

The engineering lesson is that rejecting an operation must prevent all its subsequent effects. In a distributed architecture, this requires more than producing an error code: every component needs to know whether the operation remains valid and which resources it may use. A transfer-completed message should not automatically be interpreted as proof that the data is complete and belongs to the correct request.

The proposed fix published in the SGLang repository handles rejection before transferring the cache and checks that reserved and transferred token counts match. These are checks on the internal protocol as well as on available capacity. [Technical proposal](https://github.com/sgl-project/sglang/pull/38704).

As a general recommendation, isolation tests can use different synthetic markers for each customer. Normal requests can then be interleaved with requests that exceed limits, are canceled, or fail during a transfer. Success criteria should include both the expected response and the absence of any other customer's marker. The sequence should be repeated under concurrency and after resources have been reused, because running every case in a new process removes exactly the state that needs examination.

It is also useful to distinguish three design properties: authorization to access a resource, ownership of its contents, and the validity of those contents for a specific operation. Checking only the first leaves questions unanswered. A legitimately allocated memory page may retain previous information; a completed transfer may contain less data than expected. Expressing these properties as invariants makes transitions easier to review and supports tests that fail when those invariants are violated.

For teams integrating models through an API, the practical implication is to include isolation in provider evaluation and regression testing. Looking only at response quality or resistance to malicious instructions leaves out another category of failure: faults in the service running the model. A useful evaluation should ask what happens when resources are exhausted, a request is interrupted, or an error is returned, and what evidence demonstrates that these paths preserve separation between customers.
