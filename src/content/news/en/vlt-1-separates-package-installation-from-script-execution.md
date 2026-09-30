---
translationId: vlt-1-package-security-20260907
lang: en
slug: vlt-1-separates-package-installation-from-script-execution
title: "vlt 1.0 separates package installation from script execution"
description: "The npm-compatible package manager introduces phased installs, dependency-graph queries, and blocking for known malicious packages."
publishedAt: 2026-09-07
sourceName: "InfoQ"
sourceTitle: "vlt 1.0 Ships as a Drop-in npm Replacement with Phased Installs, Graph Queries, and Malware-Blocking"
sourceUrl: "https://www.infoq.com/news/2026/09/vlt-npm-replacement/"
author: "Daniel Curtis"
tags: ["javascript", "npm", "supply-chain", "security"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Dependency installation remains one of the most delicate parts of any JavaScript project. Downloading a package does not always mean merely copying files: lifecycle scripts can run during installation, access a CI environment, and read credentials before a team has reviewed what just entered the tree. vlt 1.0, created by members of npm’s original team, tries to reduce that implicit trust without abandoning compatibility with the existing ecosystem.

Its most important change is phased installation. `vlt install` downloads and extracts dependencies but does not automatically run their scripts. Execution moves to `vlt build`, where the team can approve which packages should build native components or perform preparation tasks. The design does not make a dependency magically safe, but it separates two actions that normally happen together: bringing external code into a project and allowing that code to execute locally.

The distinction is especially useful in CI and agent-driven workflows. A lockfile fixes versions, but it does not by itself answer what will happen when a dependency launches a postinstall script. With an explicit phase, policies can inspect the graph before enabling that behavior, record the decision, and fail visibly when an exception appears. It also reduces the exposure of exploratory installs on a developer laptop, although it does not replace system isolation or package review.

The second major component is `vlt query`, a selector language for querying the dependency graph. Its more than 60 selectors can locate packages by relationships, provenance, or security properties, and some are specifically aimed at finding risks. Queries can produce a Mermaid view, which is useful when explaining why an application depends indirectly on a particular library. This approach makes dependency structure inspectable: it is not enough to know that a package exists; it also matters who introduces it, which scripts it has, and which other projects share it.

vlt also adds registries and mirrors compatible with the npm API that reject known malicious packages before serving them. The project says it has identified hundreds of thousands of problematic versions; that figure comes from its own systems and should not be treated as a complete measurement of malware in npm. The architectural advantage is placing a control at the registry, in addition to local controls in the package manager and repository.

Migration is not free. Teams must review `vlt.json` and `vlt-lock.json`, configuration precedence, and the conditions under which `build` is approved. Installation benchmarks also do not make vlt the fastest manager in every scenario. Its real significance is elsewhere: making the boundary between resolving dependencies and executing code explicit. In an increasingly automated supply chain, that boundary is a security decision, not an ergonomic detail.
