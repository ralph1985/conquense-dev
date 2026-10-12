---
translationId: pnpm-12-10-supply-chain-hardening-20261006
lang: en
slug: pnpm-1210-hardens-the-dependency-installation-lifecycle
title: "pnpm 12.10 hardens the security of the dependency installation lifecycle"
description: "The new release blocks several paths outside the store, strengthens lockfile verification, and improves validation for configuration dependencies."
publishedAt: 2026-10-06
sourceName: "pnpm"
sourceTitle: "pnpm 12.10.0"
sourceUrl: "https://pnpm.io/blog/releases/12.10.0"
author: "The pnpm team"
tags: ["security", "JavaScript", "dependencies", "supply chain", "tooling"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

pnpm 12.10.0 combines an experimental linker with several defenses against dangerous behavior during package installation. It is not a story about a spectacular speedup. It is an example of how a package manager becomes a security boundary for every JavaScript project that uses it.

The most direct change blocks dependency versions that try to use path traversal to write outside the global virtual store. The package manager also checks that configuration dependencies pinned in the lockfile match the registry from which they are meant to be installed. Declared integrity can no longer be silently replaced during resolution. Likewise, `pnpm audit` signature verification now requires the signature to match the integrity recorded in the lockfile.

These checks protect an essential property of package ecosystems: a lockfile does not merely describe versions; it must also define which content is trusted. If an entry can change its source, lose its hash, or interpret a path ambiguously, a reproducible installation stops being reproducible precisely when that property matters most. The risk is not limited to malicious packages published to a registry. A compromised pull request, a faulty mirror, or a manipulated resolution can alter the result of a clean installation.

The update adds other barriers as well. Oversized archive metadata is rejected before it is loaded into memory, collisions in store directories are fixed for certain local, URL, and Git dependencies, and some configuration warnings no longer expose credentials. Manifests with invalid dependency specifiers are also rejected instead of being silently omitted from the lockfile. That last detail is less visible, but it reduces ambiguous states that can go unnoticed in CI.

At the same time, pnpm adds `nodeLinker: loaded`, which can load dependencies directly from the content-addressable store through a Node.js loader. The option is experimental, but it points toward an interesting architectural direction: separating shared package content from the installed structure of each project. To make that optimization safe, the package manager must preserve the resolutions, hashes, and rules that determine which packages may execute.

For engineering teams, the practical consequence is to treat the package manager as part of the threat model rather than as a neutral utility. Updating pnpm should be accompanied by frozen installations in CI, careful review of dependency changes, and explicit policies for installation scripts. It is sensible to test the new behavior on a branch first and pay special attention to workspaces, Git dependencies, and private registries. The broader lesson is simple: supply-chain security begins before compilation, when the tool decides which files to download, verify, and execute.
