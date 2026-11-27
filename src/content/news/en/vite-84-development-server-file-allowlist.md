---
translationId: vite84-dev-server-file-allowlist-20261126
lang: en
slug: vite-84-development-server-file-allowlist
title: "Vite 8.4 changes how to protect development server files"
description: "The new allowlist check calls for a concrete review of permissions, plugins and tests in frontend projects."
publishedAt: 2026-11-26
sourceName: "Vite"
sourceTitle: "Vite 8.4 is out!"
sourceUrl: "https://vite.dev/blog/announcing-vite8-4"
author: "Conquense Dev Editorial"
tags: ["javascript", "vite", "frontend", "security", "testing"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

On November 26, Vite published an update with a particularly relevant addition for frontend development security: allowing file access to depend on known references from the entry point. Combining `server.fs.strict: 'extended'` with `server.fs.allow: []` enables this approach. It remains optional; the team intends to make it the default in the next major version. [Vite 8.4 announcement](https://vite.dev/blog/announcing-vite8-4).

The technical lesson is to reconsider what authorizing a resource means. A shared directory may contain materials an application needs alongside others that should never reach the browser. A dependency-based check makes it possible to reason about specific resources. As an engineering principle, this encourages documenting why each part of the project needs access, alongside checking that the home page works.

It is also useful to distinguish the different barriers. Vite's documentation explains that `server.host` determines where the process listens and that `server.allowedHosts` controls accepted hostnames. It also warns that allowing any host facilitates DNS rebinding attacks. These controls differ from filesystem access restrictions: reviewing one does not replace reviewing the others. [Server options](https://vite.dev/config/server-options).

Plugins deserve a dedicated review. The API documents `this.environment.addSafeModule` for registering safe resources that a transformation references in ways automatic analysis does not recognize. This provides an explicit place to declare that relationship. For integration maintainers, the practical consequence is to treat that declaration as part of the plugin's contract and justify it during code review. [Environment API for plugins](https://vite.dev/guide/api-environment-plugins).

A reasonable adoption process would begin on a test branch. Our editorial recommendation is to visit the main routes, load lazy components and check images, fonts and stylesheets. Then try requesting an unrelated test file outside the expected dependencies. This evaluates both the availability of necessary resources and the rejection of unnecessary ones. Starting successfully without errors covers only part of that verification.

In a monorepo, it would also be useful to inventory shared resources before broadening permissions to resolve a failure. If a font stops loading, identify which transformation produces its URL and which relationship needs declaring. Authorizing an entire parent directory can obscure that information and make future reviews harder. This is an adoption recommendation, rather than a result from our own testing.

The significance of Vite 8.4 therefore extends beyond updating a dependency: it offers a concrete opportunity to make the boundary between project files and files the browser needs to receive verifiable. The useful decision for each team is to test that boundary with its own application and plugins.
