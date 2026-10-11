---
translationId: spotify-ai-quality-velocity-20260916
lang: en
slug: spotify-ai-increases-speed-and-forces-stronger-verification
title: "Spotify: AI increases speed and forces stronger verification"
description: "Spotify examines how AI-assisted development increased the volume of change and which controls it strengthened across observability, deployment, capacity, and quality."
publishedAt: 2026-09-16
sourceName: "Spotify Engineering"
sourceTitle: "AI Changed How Spotify Builds. What We Learned (and Fixed) About Quality at Higher Velocity"
sourceUrl: "https://engineering.atspotify.com/2026/9/ai-changed-how-spotify-builds-what-we-learned-and-fixed-about-quality-at-higher-velocity"
author: "Tyson Singer"
tags: ["software-engineering", "maintainability", "reliability", "ai-assisted-development", "observability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Spotify has published a candid review of the quality problems that appeared as its development pace increased with artificial-intelligence tools. The central point is not that AI-generated code is automatically worse. According to the company’s internal analysis, the clearest risk was that the volume of change grew faster than some of its controls for review, testing, deployment, observability, and recovery.

The most concrete example comes from content processing. Spotify receives more than 500,000 new songs, videos, podcasts, and audiobooks every day. A combination of factors caused delays of several hours for episodes that normally appeared within minutes: a batch job competed with new uploads, a quality improvement had increased compute requirements per episode, and a scheduling bug reduced throughput by about 10 percent. Some processing failures could also remain hidden, while insufficient transcoding capacity did not generate a strong enough alert.

Spotify’s response was fundamentally operational engineering: end-to-end monitoring, a scheduler fix, lower priority for batch work, more capacity, and a new hierarchy for services and workloads. When resources are constrained, critical services and new uploads must take precedence. The lesson is straightforward: a success metric located only at the end of a pipeline is not enough if intermediate stages can fail silently.

Spotify also identified new risks in automated change management. Its Fleet Management system can apply large-scale changes after they pass safety checks, and for more than a year it has handled agent-driven changes, including a Java migration completed in three days. However, an automated dependency upgrade passed the checks and still failed in production. The company is expanding safeguards, improving rollback capacity, and scheduling automated changes during the working hours of the responsible teams.

Internal data helps avoid an overly simple conclusion. In August, merged changes grew from roughly 8,100 to 17,000 year over year. Work classified as quality and optimization rose from 27 percent to 31 percent, while maintenance and configuration fell from 31 percent to 25 percent. Spotify did not identify AI-authored code as a material direct cause of the incidents it reviewed, but it did observe that the pace of change was putting pressure on verification controls.

The company is also revisiting its metrics. It has separated genuine rework from refactoring of older code and is watching code complexity and pull-request size increase. It has not relaxed those thresholds simply to make the numbers look better. That caution matters: in an environment where an agent can produce larger units of change, historical metrics should be reassessed, not discarded.

The message for other teams is practical. Increasing the capacity to write software improves outcomes only if observability, regression testing, gradual rollout, rollback, and quality measurement grow as well. AI can accelerate execution, but the delivery architecture still needs independent signals showing whether the system continues to work for its users.
