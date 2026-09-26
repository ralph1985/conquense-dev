---
translationId: speedcurve-synthetic-agents-performance-baselines-20260902
lang: en
slug: speedcurve-warns-about-performance-agent-upgrades
title: "SpeedCurve warns about the impact of upgrading performance agents"
description: "An update to SpeedCurve’s synthetic agents shows how browser, Lighthouse and hardware changes can alter metrics even when the application itself has not changed."
publishedAt: 2026-09-02
sourceName: "SpeedCurve"
sourceTitle: "September synthetic test agent updates: Chrome, Firefox and Lighthouse"
sourceUrl: "https://www.speedcurve.com/blog/august-synthetic-test-agent-updates-chrome-firefox-and-lighthouse/"
author: "Andy Davies"
tags: ["web-performance", "lighthouse", "synthetic-testing", "core-web-vitals"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

SpeedCurve has described the effect of an update to its synthetic testing agents that introduced new virtual machines and newer versions of Chrome, Firefox and Lighthouse. The change matters to any team using performance budgets or historical time series: a change in the measurement platform can move metrics even when the application code has not changed.

The update moved the agents to Chrome 148, Firefox 153 and Lighthouse 13.4.1. SpeedCurve warns that comparisons between periods can be affected by browser optimizations, methodology changes and differences in execution hardware. It therefore recommends establishing a baseline before changing the environment and reviewing budgets again after the migration.

Several platform changes may affect results. Chrome 148 adds lazy loading for video, which can reduce downloads on pages using the relevant attribute. A Chrome 146 fix also changed a Largest Contentful Paint measurement issue where, in some cases, an image that had not yet been painted was recorded as the main element.

For Firefox, SpeedCurve points to improvements in HTTP/3, support for Compression Dictionaries and availability of the Scheduler API, including scheduler.yield. These capabilities may reduce the size of some responses or let an application yield control of the main thread more precisely. The result is not automatically a uniform improvement: it depends on the code, protocol negotiation and test profiles.

The infrastructure also changed. The platform moved from Amazon EC2 c5.large instances to c6a.large instances because of capacity constraints in some regions. To preserve a comparable CPU profile, SpeedCurve throttled the processor in desktop tests. Even so, the change produced an approximate 12% improvement in Total Blocking Time at the 75th percentile for the Mobile Medium profile, while LCP and CLS remained largely stable across its site corpus.

The methodological lesson is clear. TBT, LCP and CLS are not isolated readings of the product; they also reflect the browser, Lighthouse, operating system, hardware, network and agent configuration. Performance tests should version those components, separate system changes from real regressions and document any break in comparability. Without that discipline, a dashboard can turn a change in the thermometer into a false diagnosis of the application.
