---
translationId: sentry-traces-agent-query-optimization-20261103
lang: en
slug: sentry-traces-agent-query-optimization
title: "Sentry connects an agent to its traces to find verifiable optimizations"
description: "An engineering case combines observability, human review, and execution plans to reduce unnecessary database work."
publishedAt: 2026-11-03
sourceName: "Sentry Blog"
sourceTitle: "Finding performance wins in our own traces with a coding agent"
sourceUrl: "https://blog.sentry.io/performance-wins-traces-coding-agent/"
author: "Conquense Dev Editorial"
tags: ["applied-ai", "performance", "databases", "maintainability"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 3, Scott Cooper published a case study about optimizing Sentry's backend with an agent connected to its traces through MCP. The process included code investigation, human intervention, and SQL checks against a read-only database mirror. [Sentry's technical account](https://blog.sentry.io/performance-wins-traces-coding-agent/).

One correction illustrates why finding an index is insufficient to understand a query's cost. A lookup for the latest status change combined several statuses and sorted by date. Although a composite index on group, status, and date existed, PostgreSQL still had to scan and sort the matches. The modification retrieves the latest date for each status and then takes the maximum, while retaining a single SQL query. The pull request documents cache conditions and the selection of particularly expensive cases. [Reviewed change, published October 14](https://github.com/getsentry/sentry/pull/127496).

Another pull request, dated October 19, addresses repository pagination. It adds an index on organization, status, and name to match the endpoint's filtering and ordering. Its explanation also distinguishes between improving the server and correcting client behavior: older CLI versions would continue traversing the pages. That coexistence provides a reason to address data access as well. [Index and rationale](https://github.com/getsentry/sentry/pull/128052).

The transferable lesson is to build a chain of evidence that a reviewer can follow. To apply a similar process, an optimization proposal should explain which operation creates the work, which part is redundant, and which observation would establish that the problem is resolved. A small patch may require substantial justification when it changes how data is selected.

It also helps to separate three questions during validation. The first is whether the result preserves its meaning, including empty cases and ties. The second is whether database work decreases. The third is whether the experience relevant to the product improves. These questions should be answered separately: fewer reads can be valuable even when another component continues to dominate request duration.

For JavaScript or TypeScript teams with a data access layer, I would propose starting with a familiar operation and a bounded hypothesis. The agent could prepare the analysis and change; review should require reproducible examples, equivalence tests, and a rollback plan. The service's implementation language does not remove the need to understand the query pattern that ultimately executes.

Sentry cautions that its volume estimates come from sampled traces and observed traffic. They do not promise equivalent savings for other applications. [Stated limitations](https://blog.sentry.io/performance-wins-traces-coding-agent/). The value of the case lies in offering a reviewable way to investigate performance: start with observed behavior, formulate a specific modification, and verify its effects before attributing broader benefits to it.
