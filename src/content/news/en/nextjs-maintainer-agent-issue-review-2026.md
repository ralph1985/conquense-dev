---
translationId: nextjs-maintainer-agent-20260904
lang: en
slug: nextjs-maintainer-agent-issue-review-2026
title: "Next.js uses sandboxed agents and human review to clean up its issue backlog"
description: "The Next.js team closed 1,462 issues in three weeks by combining automated research, structured evidence, isolated reproduction, and an explicit reopening window"
publishedAt: 2026-09-04
sourceName: "Next.js"
sourceTitle: "How we closed 1,500 GitHub issues in one month"
sourceUrl: "https://nextjs.org/blog/how-we-closed-1500-github-issues"
author: "Marcos Hernanz"
tags: ["nextjs", "maintainability", "applied-ai", "testing", "open-source"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

The Next.js team has described a use of coding agents that is more instructive than a code-generation demonstration. The problem was keeping the project’s issue tracker useful: it had 2,244 open reports on August 10, 2026, many mixed with duplicates, already-fixed bugs, unsupported versions, or current regressions. In roughly three weeks, the team brought the total below one thousand and closed 1,462 issues across the repository.

The first lesson is that inactivity does not equal irrelevance. Next.js had already tried a workflow that marked issues stale after a long period without activity, but a time-based signal could not distinguish an abandoned report from a real bug that nobody had revisited. The new system, called closability, attempts to reconstruct the technical context before recommending an action.

Each investigation runs in a fresh sandbox containing the Next.js repository, Node.js, Playwright, and Chromium. The agent reads the GitHub discussion, checks supported versions, searches related issues and pull requests, reviews commits and documentation, and tries to reproduce the behavior on the affected version, the latest stable release, and canary when necessary. The output is not free-form prose. It is structured data containing confidence, a primary reason, evidence, and references.

That design contains several engineering decisions worth examining. The agent is read-only outside its sandbox: it can investigate, but it cannot comment, close issues, push code, or deploy. It must also look for evidence that contradicts its initial conclusion. A failed reproduction is not enough to close a report, and a high confidence score requires strong current evidence with nothing credible pointing the other way. In a system where issue text can contain malicious instructions, ignoring instructions found in the material being analyzed adds a basic defense against prompt injection.

Maintainers reviewed the evidence before the large-scale closure. Of the 1,462 issues, 543 described bugs that were already fixed, 278 were duplicates, 237 reported expected behavior, 89 no longer reproduced, and 66 concerned obsolete or unsupported versions. Automatic reopening for fourteen days provided a safety valve: only three issues were reopened, and 99.8% remained closed as of September 4.

The architecture does not make the agent an unquestionable authority. Next.js keeps separate agents for reproducing problems, verifying canary, locating regressions, creating end-to-end tests, and preparing fixes. For the clearest cases, the project has begun automating closures with an independent second review, but code changes still require human review.

The lesson for other teams is deliberately unglamorous: useful automation needs boundaries, traceability, and reversibility. A maintenance agent needs a reproducible environment, verifiable outputs, minimum access, a conservative confidence policy, and a simple way to undo decisions. The value is not closing more tickets; it is turning the backlog into reliable technical knowledge without deleting signals that still need attention.
