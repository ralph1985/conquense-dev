---
translationId: tsgolint-oxlint-type-aware-linting-20260911
lang: en
slug: tsgolint-brings-typescript-type-aware-linting-to-oxlint
title: "tsgolint brings TypeScript type-aware linting to Oxlint’s native speed"
description: "Stable tsgolint connects TypeScript 7 semantic analysis with the Oxlint linter, sharply reducing the cost of deeper checks in large projects."
publishedAt: 2026-09-11
sourceName: "InfoQ"
sourceTitle: "tsgolint Reaches Stable v7, Bringing Go-Powered Type-Aware Linting to Oxlint"
sourceUrl: "https://www.infoq.com/news/2026/09/tsgolint-oxlint-typescript/"
author: "Daniel Curtis"
tags: ["javascript", "typescript", "tooling", "linting"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

TypeScript linting has two speeds. Syntax rules can inspect a file in isolation, but checks that detect unawaited promises, unnecessary assertions, or impossible conditions need to build a semantic model of the whole program. That second layer is often more valuable for quality, but also much more expensive. For years it has been associated with ESLint and typescript-eslint, with runtimes that are difficult to fit into large repositories.

Stable tsgolint 7 aims to change that balance. The project acts as the type-aware analysis backend for Oxlint, the Rust-based linter in the Oxc ecosystem, and uses typescript-go, the official Go port of the TypeScript compiler. The division is intentional: Oxlint handles file discovery, configuration, and fast syntactic rules; tsgolint receives checks that require type information and returns structured diagnostics.

Coverage has reached 59 of the 61 type-aware typescript-eslint rules the project targets. One example is no-floating-promises, which can flag asynchronous calls whose results may be lost without await or explicit error handling. The project publishes comparisons across several well-known repositories: its VS Code measurement drops from minutes to a few seconds, while TypeScript, TypeORM, and Vue also show substantial reductions. These are team benchmarks and should be read as concrete experiments, not universal guarantees. Hardware, configuration, and module-graph size can change the outcome considerably.

The practical consequence matters more than the headline number. Type-aware analysis no longer has to be reserved for a nightly job or a slow CI phase. A team can keep semantic rules in pull-request checks, measure which rules consume the most time, and decide where that cost is justified. In a monorepo, that visibility may be as useful as the acceleration itself: it can distinguish configuration, caching, module-resolution, and rule-specific problems.

Adoption still has clear limits. tsgolint follows the compiler version it embeds, so the stable line requires TypeScript 7, and some projects will need to review older tsconfig options or removed features. Rule compatibility also does not guarantee perfect autofixes; semantic analysis still needs validation against each codebase. The sensible path is to test it on a representative package, compare diagnostics with typescript-eslint, and first enable rules that catch production-grade failures. The project does not remove TypeScript’s complexity, but it may make deep quality checks fast enough that teams stop treating them as optional.
