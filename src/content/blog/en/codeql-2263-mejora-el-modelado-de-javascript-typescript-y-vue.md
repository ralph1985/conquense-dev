---
translationId: github-codeql-2263-javascript-modeling
lang: en
slug: codeql-2263-mejora-el-modelado-de-javascript-typescript-y-vue
title: "CodeQL 2.26.3 improves JavaScript, TypeScript, and Vue modeling"
description: "The new CodeQL version expands Vue flow models and improves security detection in GitHub Actions and JavaScript/TypeScript applications."
publishedAt: 2026-08-19
sourceName: "GitHub Changelog"
sourceTitle: "CodeQL 2.26.3 improves GitHub Actions queries and JavaScript modeling"
sourceUrl: "https://github.blog/changelog/2026-08-19-codeql-2-26-3-improves-github-actions-queries-and-javascript-modeling/"
author: "GitHub"
tags: ["security", "CodeQL", "JavaScript", "TypeScript", "Vue"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

CodeQL 2.26.3 expands security analysis for JavaScript and TypeScript applications and improves several GitHub Actions queries. The most relevant part for frontend teams is the addition of flow models for Vue Composition API helpers: `ref`, `shallowRef`, `toRef`, `reactive`, and `computed`. It also models Vue Router’s `useRoute()` as a client-side remote-flow source, including its `query`, `params`, `path`, `fullPath`, and `hash` properties.

The detail matters because static analyzers cannot automatically infer the full semantics of every framework. A tool may know that an input comes from a request, then lose track of it when the value passes through a reactive helper, a router, or an internal abstraction. Flow models provide that context: they describe which functions introduce potentially user-controlled data, how that data is transformed, and where it might reach a dangerous sink. In this release, that knowledge can improve queries related to issues such as XSS or path injection.

CodeQL also allows custom models to reference specific files through a package name using the `file:<path>` form. For a large codebase, this provides a more precise way to declare sources and sinks based on a module’s public exports. The improvement does not replace architectural review; instead, it encourages teams to examine which boundaries data crosses and whether an apparently harmless wrapper has accumulated too much security responsibility.

The update also covers workflows. CodeQL now recognizes untrusted data in `github.event.merge_group` for workflows triggered by the `merge_group` event. Several queries related to environment-variable injection, cache poisoning, and untrusted checkouts also refine their conditions to distinguish triggers, permissions, and cache scopes more accurately. This matters because a CI vulnerability does not depend only on application code: it can also appear when a contribution controls expressions, artifacts, or steps that run with elevated privileges.

There is a breaking change worth checking: the `codeql.actions.security.SelfHostedQuery` module has been removed, so custom queries that rely on it need to be updated. The operational lesson is to treat security rules as versioned code: test them against representative repositories, review precision changes, and keep an inventory of internal queries affected by each upgrade.

This update does not turn static analysis into a complete test. Results still depend on models, configuration, and the paths the analysis can reach. But better knowledge of Vue, Vue Router, and GitHub Actions closes specific blind spots and brings security closer to where the system is actually built: the frontend, workflows, and the interfaces between layers.
