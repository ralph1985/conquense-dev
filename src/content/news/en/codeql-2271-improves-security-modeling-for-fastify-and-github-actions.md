---
translationId: codeql-2271-fastify-security-models-20260925
lang: en
slug: codeql-2271-improves-security-modeling-for-fastify-and-github-actions
title: "CodeQL 2.27.1 improves security analysis for Fastify and GitHub Actions"
description: "The new release adds more accurate flow models for Fastify and reduces false positives in protected workflows, with direct implications for JavaScript and TypeScript projects."
publishedAt: 2026-09-25
sourceName: "GitHub Changelog"
sourceTitle: "CodeQL 2.27.1 adds C and C++ query and Kotlin 2.4.20 support"
sourceUrl: "https://github.blog/changelog/2026-09-25-codeql-2-27-1-adds-c-and-c-query-and-kotlin-2-4-20-support/"
author: "GitHub"
tags: ["security", "javascript", "typescript", "codeql", "ci-cd"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

GitHub has published CodeQL 2.27.1, an update to its static analysis engine with changes that are particularly relevant to teams maintaining JavaScript and TypeScript services. This release is not only about adding language-version support: it improves the models that allow CodeQL to reconstruct how data moves through real frameworks and APIs. That semantic layer is essential if security findings are to be useful rather than merely technically possible.

In the Node.js ecosystem, CodeQL now recognizes Fastify servers configured through chainable methods such as `withTypeProvider()` and `setValidatorCompiler()`. The change improves route attribution and can alter the results of queries such as `js/missing-rate-limiting`. In practice, the analyzer can better identify which routes are exposed and which are protected by globally registered plugins. Some false positives can also disappear when the model understands that shared configuration actually applies to a route.

The less visible consequence is the more important one: an analyzer update can change the alert inventory even when the application code has not changed. Teams upgrading CodeQL should review the new baseline, compare closed alerts, and confirm that Fastify plugins are registered explicitly and consistently. Treating every new alert as a product regression would be as unhelpful as ignoring all of them; the first step is to establish what additional knowledge the model has gained.

The release also adjusts GitHub Actions analysis. The `actions/unpinned-tag` query no longer flags references protected by a structurally valid entry in `.github/workflows/actions.lock`, and it no longer treats self-repository references such as `$/...` as vulnerable because they resolve to the commit running the workflow. This reduces noise, but it does not remove the need for a verifiable pinning mechanism. Workflows outside those rules still need immutable references and change review.

CodeQL is deployed automatically on GitHub, and the new functionality will also arrive in GHES 3.24. For JavaScript and TypeScript projects, the practical lesson is clear: security tools must evolve with framework conventions. Updating the analyzer, reviewing coverage changes, and keeping an explicit CI pinning policy provide more value than pursuing a stable alert count. Diagnostic precision is part of maintainable security.
