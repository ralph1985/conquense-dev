---
translationId: tech-2026-08-npm-release-workflow-compromise
lang: en
slug: the-npm-case-that-breaks-provenance-trust
title: "The npm incident shows that provenance is not enough"
description: "Ten malicious versions of a React Query generator reached the registry through a GitHub Actions workflow that executed untrusted code with publishing identity."
publishedAt: 2026-08-28
sourceName: "GitHub Security Advisories"
sourceTitle: "Malicious versions of @7nohe/openapi-react-query-codegen published via a compromised release workflow"
sourceUrl: "https://github.com/7nohe/openapi-react-query-codegen/security/advisories/GHSA-9pvf-vcx3-x239"
author: "7nohe"
tags: ["security", "javascript", "npm", "supply-chain", "github-actions"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

On August 28, ten malicious versions of `@7nohe/openapi-react-query-codegen` were published. The package generates React Query hooks from OpenAPI specifications. The incident is particularly useful for JavaScript teams because it did not depend on a stolen npm password. The failure occurred at the boundary between an untrusted pull request and a privileged release workflow.

The workflow listened for comments on issues and pull requests. If the text was `npm publish`, it could start the process without adequately checking the author’s relationship to the repository. The job then checked out the pull request head and ran `pnpm install`. That combination allowed fork-controlled code to execute inside a job with `id-token: write`, enough to use npm trusted publishing and publish under the project’s legitimate identity.

The result was a set of stable and prerelease versions published between 20:00 and 20:21 UTC. Affected versions included `0.5.4`, `0.5.5`, `1.6.3`, `1.6.4`, `2.2.1`, `2.2.2`, `3.0.3`, `3.0.4`, and two prereleases. The artifacts added an obfuscated JavaScript file several megabytes in size and, in some cases, a `preinstall` hook. Other versions used `binding.gyp` to trigger the same payload when node-gyp was involved. That is why searching for one installation script is not sufficient.

The case contains an uncomfortable lesson about provenance. The malicious versions retained valid SLSA attestations because they were published by the real workflow through the real identity. That evidence shows where and through which process an artifact was built, but it does not prove that the code executed by that process was benign. Provenance must be combined with change review, authorization controls, and inspection of the published contents.

The architectural fix is to separate building, verifying, and publishing. A job that analyzes pull request code should not have publishing credentials or OIDC permissions capable of obtaining them. Publishing should start from a protected commit or tag, with explicit reviewers, restrictions on who can trigger the workflow, and a minimal permission set. Installation scripts and build files deserve special attention because they run before an application imports the package.

For consumers, the advisory recommends avoiding affected versions, checking lockfiles, and rotating credentials reachable from any machine or runner that installed them. For maintainers, the broader lesson is that release automation is part of the security perimeter. A short and convenient workflow can also be a direct route from an external contribution into the entire dependency ecosystem.
