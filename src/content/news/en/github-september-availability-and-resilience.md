---
translationId: github-availability-resilience-september-20261014
lang: en
slug: github-september-availability-and-resilience
title: "GitHub report shows why load limits matter as much as capacity"
description: "GitHub’s September availability report explains how a cleanup job, missing timeouts, and retries amplified a shared-database incident."
publishedAt: 2026-10-14
sourceName: "The GitHub Blog"
sourceTitle: "GitHub availability report: September 2026"
sourceUrl: "https://github.blog/news-insights/company-news/github-availability-report-september-2026/"
author: "Jakub Oleksy"
tags: ["reliability", "databases", "distributed systems", "incident response", "GitHub"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

GitHub’s September 2026 availability report offers a useful lesson for any team operating services on shared databases: nominal capacity is not enough if background jobs, timeouts, and retries are not coordinated with the system’s actual load.

One incident began when a data-cleanup job increased pressure on a shared database. The job’s safety mechanism slowed writes when replicas fell behind, but it did not adequately observe incoming load on the primary server. The process continued until the primary reached its connection limit. From that point, dependent requests began to fail, slow down, or remain pending. GitHub says that approximately 96% of requests to create issues through the web interface were affected during the incident window.

The problem was amplified by two design decisions. Database calls did not have a short timeout, so handlers remained blocked instead of failing fast. In addition, a retry loop related to token creation kept resending writes that were already failing. Rather than allowing the system to recover capacity, those retries maintained saturation. The combination is familiar in distributed systems: a slow dependency consumes client resources, while retries turn a local degradation into additional load.

GitHub’s response was to reduce internal load and pause the background job until the database recovered. Follow-up measures include controls that regulate processing according to available capacity, reduce unnecessary retries, and limit the impact of slow calls. GitHub is also improving startup behavior so that temporarily degraded connectivity does not prevent services from recovering.

The same report describes a second Copilot code review incident. A change in the execution service began delivering only a limited copy of results to some customers, even though the workflow reported that the review had completed successfully. Because the system did not sufficiently verify that the complete review had reached the pull request, the failure went unnoticed until some reviews remained incomplete for more than thirty minutes.

The common lesson is that observability must verify the result the user expects, not merely that an internal component returned successfully. For an application, creating a task is not the same as completing its visible effect. Teams can turn this lesson into explicit timeouts, retries with budgets and backoff, protection for maintenance jobs, primary-database saturation metrics, and end-to-end checks. These controls are not glamorous, but they determine whether an incident remains a manageable degradation or spreads across the platform.
