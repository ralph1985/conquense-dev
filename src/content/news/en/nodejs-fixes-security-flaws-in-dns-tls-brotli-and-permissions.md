---
translationId: nodejs-security-releases-20261021
lang: en
slug: nodejs-fixes-security-flaws-in-dns-tls-brotli-and-permissions
title: "Node.js fixes security flaws in DNS, TLS, Brotli, and the permission model"
description: "Node.js’s October security update affects the 26, 24, and 22 lines and includes high-severity flaws involving hostname validation, compression, entropy, and system isolation."
publishedAt: 2026-10-21
sourceName: "Node.js Project"
sourceTitle: "Wednesday, October 21, 2026 Security Releases"
sourceUrl: "https://nodejs.org/en/blog/vulnerability/october-2026-security-releases"
author: "Node.js Project"
tags: ["javascript", "node.js", "security", "supply chain"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

The Node.js project published a security update on October 21 for the 26.x, 24.x, and 22.x release lines. The notice combines dependency updates with fixes in core runtime components, making it relevant to teams maintaining HTTP services as well as command-line tools, build processes, and networked applications.

Among the highest-severity issues is a DNS-resolution vulnerability that can truncate names containing a NUL character. Two TLS certificate-validation problems are also fixed. One can allow a hostname check to be bypassed when an IP address is written using full-width digits; the other affects cases where a host loosely resolves to an IP address. In both situations, the important consequence is not merely malformed input. It is the possibility that an application trusts an endpoint different from the one it intended to authenticate.

The notice also describes a high-severity flaw in the Brotli decoder that can cause an out-of-bounds write and remote code execution. Brotli is commonly used to compress HTTP responses and other artifacts, so the risk depends on which compressed inputs each application processes and what controls surround parsing. It is not enough to assume that business logic is safe: a compression library sitting before application logic is part of the attack surface too.

A less visible issue affects crypto.randomUUID() and randomInt() when cached entropy is included in startup snapshots or single executable applications. If those values repeat across processes, a source normally treated as unpredictable no longer meets that expectation. Applications using random identifiers for security, correlation, or access control should review not only the API, but also how processes are created and restored.

The fixes also cover issues in SQLite, Undici, c-ares, OpenSSL, ZIP-file handling, and Node.js’s permission model. Two lower-severity flaws in that model could grant excessive access through wildcard lookups or permit a bypass involving fs.realpathSync(). Their severity does not make them irrelevant in tools that execute partially trusted code.

The practical response is to update the supported release line that applies and rerun integration tests, especially around TLS clients, DNS resolvers, compressed endpoints, and runners using snapshots or restricted permissions. Teams should also review base images and lockfiles: updating Node.js on a workstation does not automatically update containers, workers, or pipelines pinned to another version. The release is a reminder that runtime security is a chain. Protocols, parsers, dependencies, and isolation policies can fail in different ways and must be maintained together.
