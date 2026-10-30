---
translationId: cloudflare-optimizacion-inferencia-revisiones-20261019
lang: en
slug: cloudflare-cuts-ai-review-cost-by-optimizing-context-and-models
title: "Cloudflare cuts code-review costs by 68% through context optimization"
description: "Cloudflare’s experience shows that agent-review costs depend as much on context architecture and call volume as on the selected model."
publishedAt: 2026-10-19
sourceName: "Cloudflare Blog"
sourceTitle: "Cutting our inference bill by 68% by being obsessive about optimization"
sourceUrl: "https://blog.cloudflare.com/obsessive-inference-optimization/"
author: "Ryan Skidmore"
tags: ["artificial intelligence", "agents", "code review", "performance", "cost optimization"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare has published an unusually detailed account of the real cost of operating an agent-based code reviewer. The system had risen from an average of $1.19 per review in April to about $2.43 during its most expensive weeks in August. After several weeks of instrumentation and experiments, the average cost fell to $0.77, while median duration dropped from 4 minutes 9 seconds to 1 minute 32 seconds.

The most interesting part was not simply switching to a cheaper model. Cloudflare found that the reviewer made an average of 16.6 model calls per review and wrote about 72,000 tokens to the cache before reading 1.08 million. Although the overall cache-hit rate had reached 97%, the system was processing far more context. The main problem was that much of the initial prompt, identical across repositories, could not be reused between sessions.

The solution was to separate the shared prompt prefix with a stable cache breakpoint. The team removed repository-specific data from the beginning of the message and got the first requests to find that prefix in 91% to 99.5% of cases, compared with only 14-26% beforehand. It also placed reference indexes directly in the standards reviewer’s prompt, removed tools that some sub-reviewers could not use, parallelized file reads, and skipped reviewers that had no relevant changes in subsequent reviews.

The work also included a shadow comparison before replacing the previous system. Both versions agreed on the approval decision in 98% of the requests tested. Cloudflare then tried different model and effort combinations. A newer model reduced the number of calls while maintaining roughly the same number of relevant findings in some categories, although the result depended on the review type. In the quality analysis, the higher effort level cost more but recovered important findings that disappeared at medium effort.

The technical lesson is not that prompt caching alone solves agent costs. It is that an inference system should be measured like any other service: calls, context size and stability, latency, quality, and cost per result. Cloudflare also notes that its comparisons were not a perfect statistical experiment and that some analysis windows were short. Even so, the case offers a practical guideline for teams integrating AI into CI: before changing providers, observe what information is sent repeatedly, which steps can be removed, and whether reducing tokens preserves the value of the review.
