---
translationId: crux-ad-metrics-advertising-performance-20260915
lang: en
slug: crux-metrics-ad-load-web-performance
title: "Chrome turns advertising load into a real-user experience metric"
description: "Chrome adds four experimental CrUX metrics to show how advertising affects real users through ad count, density, network weight, and CPU usage."
publishedAt: 2026-09-15
sourceName: "Chrome for Developers"
sourceTitle: "New ad metrics in Chrome User Experience Report"
sourceUrl: "https://developer.chrome.com/blog/crux-ad-metrics?authuser=1"
author: "Alex Cone"
tags: ["web-performance", "frontend", "CrUX", "advertising"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Chrome has added four experimental metrics to the Chrome User Experience Report, or CrUX, to describe advertising load through real-user experiences. The change matters because it turns a question usually discussed subjectively — whether a page has too many ads or whether ads make it heavy — into observable signals that can be studied at origin scale.

The metrics cover four dimensions. Ad Count measures the average number of ads in the viewport. Ad Density estimates the fraction of that viewport occupied by advertising. Ad Weight has a network dimension, measuring the bytes consumed by advertising resources, and a CPU dimension, counting the milliseconds of processing associated with them. Taken together, the signals are more informative than a simple ad count: two pages can display the same number of ads while imposing very different costs on a connection or device.

For frontend teams, the practical consequence is that performance does not depend only on code they own. An advertising system can increase transferred bytes, consume processor time, take up space, and contribute to a less stable visual experience. The new signals make it possible to study that part of the system alongside the familiar measures of speed, responsiveness, and visual stability.

Chrome also makes an important qualification: these metrics are not part of Core Web Vitals. They use the same dimensions of availability and follow the existing CrUX eligibility criteria, but they do not yet have recommended targets or thresholds. Each signal is labelled experimental, and Google expects data availability to grow during the month after publication. That distinction matters: the data can support investigation and comparison, but it is not yet a quality contract equivalent to LCP, INP, or CLS.

The right approach is not to chase a single number. A team could correlate advertising load with performance on modest devices, compare templates, and identify when an ad integration damages a critical path. It should then validate the causes through its own lab checks and implementation details, because CrUX provides aggregated user data and cannot, by itself, identify the exact script, auction, or resource responsible for the cost.

The broader technical step is an expansion of observability. A website’s perceived quality depends on every resource reaching the browser, including resources controlled by third parties. Measuring advertising separately can help teams compare monetisation decisions with verifiable effects on network usage, CPU time, and available viewport space. For now, the signals are best treated as diagnostic material, interpreted through Chrome’s documentation and combined with existing performance evidence.
