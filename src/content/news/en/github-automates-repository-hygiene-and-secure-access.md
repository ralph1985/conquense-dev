---
translationId: github-evergreen-repo-hygiene-20261015
lang: en
slug: github-automates-repository-hygiene-and-secure-access
title: "GitHub turns repository hygiene into an auditable, reversible process"
description: "Evergreen combines GitHub Apps, Actions, issues, and versioned files to review outside access and archive stale repositories without losing traceability."
publishedAt: 2026-10-15
sourceName: "GitHub Engineering"
sourceTitle: "Staying Evergreen: How we automated secure access and repo hygiene in a shared org"
sourceUrl: "https://github.blog/engineering/platform-security/staying-evergreen-how-we-automated-secure-access-and-repo-hygiene-in-a-shared-org/"
author: "Greg Mohler"
tags: ["security", "automation", "github", "maintainability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Repository hygiene rarely fails because teams lack tools. It fails because reviewing outside collaborators, detecting abandoned repositories, and removing permissions all require recurring attention, and that attention competes with product work. GitHub describes Evergreen, an internal application that turns those routine tasks into a scheduled, visible, and reversible workflow.

The system handles two processes. Every quarter, it reviews outside collaborators for each repository and keeps only the access that has been confirmed. It also detects repositories with no human activity for a defined period, warns their owners, and archives them if they remain untouched. Archiving is not deletion: the content stays recoverable and every change is documented.

The architecture is notable because it avoids building a parallel platform. A small Go server receives webhook events; GitHub Actions acts as the clock through four scheduled workflows; repositories receive issues containing checklists; custom properties identify exceptions and owners; and one JSON file per repository stores state. Git history therefore becomes part of the audit trail: who had access, when the review started, who decided, and what action was taken.

The design applies two important security rules. The first is to fail securely: if nobody responds to a review, outside access is revoked instead of being left in place indefinitely. The second is to fail closed during execution. If an API call fails while several permissions are being removed, the review remains pending and the next run retries the remaining items. The system records completion only after every revocation has succeeded.

The user experience is part of the control as well. The request appears as an issue in the repository where its owners already work, includes an explicit deadline, and provides reminders before taking action. Only authorized users can close the review; an invalid action causes the issue to be reopened. Each result is written into the issue, so recovering from a mistake does not require reconstructing history from scattered logs.

GitHub also identifies two operational constraints that shape the implementation. Evergreen is first tested in `DRY_RUN` mode, emits structured logs, and respects GitHub’s secondary content-creation limits: 80 requests per minute and 500 per hour. To avoid depending on aggressive retries, it processes repositories in batches and spaces out calls.

The technical lesson is not that every organization should copy Evergreen literally. It is that security automation becomes more reliable when it uses explicit state, deadlines, verifiable permissions, reversibility, and an interface teams already consult. Maintainability improves when operational policy is treated as versioned code, with observability and a clear recovery path.
