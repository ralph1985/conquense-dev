---
translationId: cloudflare-dns-targeted-builds-20261102
lang: en
slug: cloudflare-dns-targeted-rebuilds
title: "Cloudflare cuts DNS update work: a lesson in invalidation"
description: "Targeted DNS zone rebuilds illustrate how to reduce resource use while preserving the correctness of published state."
publishedAt: 2026-11-02
sourceName: "Cloudflare Blog"
sourceTitle: "How we halved DNS build delay and cut memory use by 85%"
sourceUrl: "https://blog.cloudflare.com/dns-targeted-zone-builds/"
author: "Conquense Dev Editorial"
tags: ["systems", "performance", "architecture", "testing"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 2, Cloudflare published an explanation of its new DNS update planning. The company attributes an 85% reduction in peak memory and approximately 50% lower average build delay to targeted rebuilds and work coalescing. These are results from its own infrastructure, not a forecast that can be transferred to any application. [Source: Cloudflare](https://blog.cloudflare.com/dns-targeted-zone-builds/).

The architectural question raised by this case also appears in compilers, search indexes, and site generators: when an input changes, which outputs need recalculating? Rebuilding everything makes the result easier to reason about, but makes a small modification pay the cost of the entire collection. Updating only part of it requires understanding dependencies, including those that are not obvious in the modified object.

As general technical analysis, it helps to separate two decisions. First, determine which work the change requires; then decide when to execute it. This separation allows classification to be tested without introducing delays, concurrency, or retries. It also prevents a scheduling optimization from accidentally changing consistency rules. A plan can be described and reviewed before a worker touches the destination state.

A hypothetical example makes this concrete. A catalog generates one page per product and several category pages. Changing a product description might affect only its page; changing its category also affects two listings. If the system retains only the new value, it can forget to remove the reference from the previous listing. Invalidation needs to represent both what appears and what ceases to exist.

To verify an incremental implementation, a useful strategy is to compare its output with a complete rebuild using the same input. Checking that expected elements appear is insufficient: surplus elements and stale values must also be identified. Tests should cover deletions, consecutive changes, and repeated events. Fixing time-dependent fields, where they exist, helps distinguish real differences from incidental variation.

Measurement requires similar care. Lower peak memory can allow more concurrent work, but increasing concurrency can also shift pressure onto the database. An evaluation should therefore observe duration, queue time, reads, and retries alongside memory consumption. Dataset size matters just as much as the number of incoming changes.

For a web team, a practical application would be to identify an expensive rebuild and document its dependencies first. The team can then introduce a narrowly scoped incremental path, compare it with the complete output, and expand coverage once sufficient evidence exists. The value of this news lies in that verifiable question: which work can be omitted while preserving exactly the required result.
