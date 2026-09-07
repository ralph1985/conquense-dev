---
translationId: codeql-2264-github-actions-2026-09-03
lang: en
slug: codeql-2264-improves-risk-detection-in-github-actions
title: "CodeQL 2.26.4 improves risk detection in GitHub Actions"
description: "The latest CodeQL release expands JavaScript and TypeScript modelling and refines taint-flow and mutable-reference checks in GitHub Actions."
publishedAt: 2026-09-03
sourceName: "GitHub Changelog"
sourceTitle: "CodeQL 2.26.4 improves GitHub actions security detections"
sourceUrl: "https://github.blog/changelog/2026-09-03-codeql-2-26-4-improves-github-actions-security-detections/"
author: "GitHub"
tags: ["security", "javascript", "typescript", "github-actions"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

GitHub has released CodeQL 2.26.4, an update to its static-analysis engine that adds support for Go 1.27, improves the precision of some Rust data-flow alerts, and changes several security models. Although it is presented as an incremental update, its changes show where risk is increasingly concentrated: at the boundaries between languages, frameworks, automation, and third-party-controlled data.

For JavaScript and TypeScript, the release adds support for regular expressions using the d flag and recognises React Native’s worklet directive. That detail matters because an analyser can follow data flow only when it understands the constructs that actually appear in code. When new syntax is outside the model, an alert may fail to identify a dangerous value’s source and sink, or miss an entire propagation path.

The update also adds SQL-injection sink models for Spring R2DBC’s DatabaseClient and the R2DBC SPI. Separately, taint now propagates through String.valueOf(Object) in Java and Kotlin when the argument is a CharSequence. In Python, list.extend and list.insert receive treatment consistent with list.append. The shared pattern is that security checks must follow the abstractions commonly used by each ecosystem, rather than looking only for direct calls to low-level APIs.

The most relevant change for platform teams affects GitHub Actions. CodeQL now interprets actor fields in event payloads more carefully: a check on a field counts as protection only when that field is actually populated by the specific event. As a result, some repositories may receive more alerts. The change prevents an apparently safe condition from being treated as valid in a context where the value is absent or has different semantics.

The actions/unpinned-tag query also detects mutable references to reusable workflows. The problem is not limited to pinning third-party actions. A reusable workflow that points to a moving tag can change after a review has been approved, altering the code executed by the pipeline. Detecting that pattern helps make dependency immutability a property of the entire CI/CD chain.

Finally, CodeQL can specify EnvironmentCheck through a models-as-data model. GitHub notes that queries using ControlCheck may find more results when an environment is no longer a sufficient sanitizer. In practice, teams should review new findings instead of dismissing them as noise and check whether their workflows depend on version references, permissions, or environments that can change.

The update is automatically deployed to GitHub Code Scanning and will later be included in a future GHES release. The lesson is not to enable a tool and ignore its output: security modelling evolves with the language and platform, so the rules must be maintained, tested, and reviewed like any other critical part of the codebase.
