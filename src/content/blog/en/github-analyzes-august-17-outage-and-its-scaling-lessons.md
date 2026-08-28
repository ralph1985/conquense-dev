---
translationId: github-august-17-outage
lang: en
slug: github-analyzes-august-17-outage-and-its-scaling-lessons
title: "GitHub’s outage shows that scale can fail without a code change"
description: "GitHub’s analysis attributes a 7-hour-and-47-minute global disruption to insufficient capacity that spread across authentication, Actions, APIs, and Copilot"
publishedAt: 2026-08-20
sourceName: "The GitHub Blog"
sourceTitle: "The August 17 outage, and the work ahead"
sourceUrl: "https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/"
author: "Vlad Fedorov"
tags: ["github", "reliability", "distributed systems", "observability", "architecture"]
readingTime: 4
aiDisclosure: "AI-generated text, reviewed before publication."
---

On August 20, GitHub published an initial analysis of the disruption it experienced on August 17. The incident lasted 7 hours and 47 minutes and affected github.com, authentication, GitHub Actions, APIs, pull requests, issues, and several Copilot services. The explanation is technically useful because it does not point to a bad deployment: the incident began with a combination of growth, insufficient capacity, and dependencies that amplified the failure.

According to GitHub, traffic reached a new peak and a critical component in its Central US data center could not scale in time. Capacity pressure spread through the systems and caused authentication failures. Recovery required traffic rerouting, isolation of affected infrastructure, and staged service restoration. During that process, errors in some Copilot services triggered a client-side retry loop that increased traffic further. The team had to mitigate that behavior before safely returning traffic to the services.

The company describes both this incident and an Actions failure on August 6 as capacity failures rather than consequences of code or configuration changes. The surrounding numbers show the pressure: GitHub says monthly commits increased from 1.4 billion in April to 2.9 billion. Growth explains the strain, but it does not replace capacity planning or operational safety limits.

The announced response combines infrastructure and architecture. GitHub says it has added more than three million CPU cores, 120 petabytes of high-speed storage, and additional network capacity while accelerating its migration to Azure. At the time of publication, Azure served roughly 58% of the platform’s load and half of all Git operations, up from 12% of platform load in May.

There is also less visible work that matters to other engineering teams. GitHub is developing an architecture in which read capacity for large monorepositories grows linearly with the number of readers. It is also isolating critical systems, removing shared dependencies, and strengthening testing, safer rollouts, observability, and alerting. Following the August incidents, it announced consistent retry limits, retry budgets, and variable timeouts to prevent retry storms and cascading load.

The lesson is not that adding hardware solves reliability. It is that resilience design must cover client behavior during degradation, recovery capacity, and the boundaries between services. For any platform, the incident suggests reviewing three questions: which component defines the real capacity ceiling, which retries can turn a partial failure into a storm, and which shared dependencies allow a local problem to reach the whole product.
