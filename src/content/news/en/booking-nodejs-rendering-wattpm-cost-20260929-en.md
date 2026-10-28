---
translationId: nodejs-rendering-wattpm-booking-20260929
lang: en
slug: booking-nodejs-rendering-wattpm-cost-20260929-en
title: "Booking.com cuts the cost of its largest Node.js service by 38% without rewriting the application"
description: "Booking.com explains how worker threads, load balancing, and memory tuning reduced cost and latency across its server-side rendering services."
publishedAt: 2026-09-29
sourceName: "Booking.com Engineering"
sourceTitle: "Node.js at scale, rebalanced: how we cut cost by 38%"
sourceUrl: "https://medium.com/booking-com-development/node-js-at-scale-rebalanced-how-we-cut-cost-by-38-62ce247a3002"
author: "Ilya Malyavin"
tags: ["nodejs", "javascript", "performance", "server-side-rendering", "kubernetes"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Booking.com has published a particularly useful optimization case because it did not begin with a rewrite or new hardware. The company cut compute costs for its largest Node.js service by 38%, used 30% fewer pods, reduced memory usage by 20% on the remaining pods, and improved p75 and p99 latency by up to 10%. The work focused on the execution platform and on configuration decisions that had remained unchanged for years.

The service performs server-side React rendering. That work is CPU-intensive: each render occupies a thread while building the page, so performance depends on both the number of available cores and how long each request waits behind another. The original architecture used pm2 and Node.js cluster. Each worker was a separate process, with its own copy of the structures created by V8 during startup. The design worked, but it added a coordination hop and left room to improve memory use and connection distribution.

The main change was a trial of wattpm, which uses worker threads and lets the kernel distribute connections through SO_REUSEPORT. Isolated tests showed between 20% and 50% more capacity depending on the workload, but production introduced a surprise: under moderate load, the new setup could perform worse. Aggregate CPU, garbage-collection, and event-loop metrics did not explain the difference. The problem appeared only when each worker was inspected separately. A combination of nginx connection reuse and tcp_tw_reuse concentrated traffic on some workers while leaving others underused.

Booking.com kept nginx but turned it into an explicit load-balancing layer. Workers listened on consecutive ports, and heavy rendering requests were separated from lightweight metadata calls. The final configuration reserved four workers for pages and one for auxiliary requests. For this service, least_conn added a further 2% to 7% improvement in some extreme percentiles, although round robin already performed well.

After freeing memory, the team also revisited V8’s semi-space size. The inherited 16 MiB setting was reasonable for small fragments but too small for complete pages. Gradually increasing it to 32 and then 64 MiB reduced collection frequency and improved latency without increasing total memory use, because earlier optimizations had created headroom. Gradual worker rotation also addressed memory accumulation associated with ES module updates.

The lesson is not to copy wattpm without measurement. It is to treat the platform as part of performance, inspect queues and percentiles per worker, and validate hypotheses with real traffic. Booking.com used parallel installations, controlled traffic splitting, and reversible deployments before gradually reducing pod counts. In Node.js services with SSR, defaults can matter as much as application code.
