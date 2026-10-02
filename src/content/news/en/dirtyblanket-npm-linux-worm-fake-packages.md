---
translationId: dirtyblanket-npm-worm-20260929
lang: en
slug: dirtyblanket-npm-linux-worm-fake-packages
title: "Nine fake npm packages turn `preinstall` into a Linux worm"
description: "The DirtyBlanket incident combines package impersonation, external downloads, and credential theft to spread from a Node.js installation."
publishedAt: 2026-09-29
sourceName: "SafeDep"
sourceTitle: "DirtyBlanket: Fake Express Packages on npm Spread a Linux Worm"
sourceUrl: "https://safedep.io/dirtyblanket-express-impersonation-npm/"
author: "Kunal Singh"
tags: ["security", "npm", "nodejs", "supply-chain", "malware"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

SafeDep has documented a campaign that published nine malicious packages to npm under the `dirtyblanket` account. Eight impersonated Express names and versions, while another impersonated React. According to the analysis, all nine were published on September 29, 2026, within a 33-minute window. The goal was not merely to deceive a developer, but to turn dependency installation into the first step of a self-spreading infection.

The initial mechanism relied on a `preinstall` script. When `npm install` ran on Linux, the package downloaded a JavaScript file from an Internet Archive snapshot and executed it with Node.js. That file then fetched `linux.sh` from Codeberg and piped it directly into Bash. The first download was not included in the package, had no pinned version, and lacked an integrity check, meaning its contents could change outside npm’s control.

The second script installed a backdoor based on the CHAOS remote-access tool and disguised it as a systemd font service. The report describes two particularly important behaviors. First, the malware could use Tor to provide remote access, file manipulation, and screenshots. Second, it attempted to reuse private SSH keys found on the machine to connect to hosts listed in `known_hosts`. On compromised machines it also searched for npm tokens and Arch User Repository repositories so it could publish new malicious versions.

The chain shows why dependency security does not end with checking a package’s name and version. A correctly resolved package can still execute arbitrary code during installation, while an external script introduces a second supply chain. Lockfiles help pin versions, but they do not make a dynamically downloaded URL safe. Likewise, a superficial review of the package source may miss the payload if it arrives later from the network.

The response should combine controls rather than rely on one tool. Where they are not required, teams can disable lifecycle scripts and allow them only for reviewed dependencies. CI installations should run with minimal privileges, without persistent SSH keys, and with short-lived, narrowly scoped publishing tokens. Blocking unexpected network access during installation, reviewing hooks before accepting new dependencies, and isolating build environments from the rest of the infrastructure are also useful measures.

SafeDep recommends treating Linux machines that installed one of the packages as compromised. That means isolating them, rotating credentials, and reviewing repositories and hosts reachable from them. The most instructive part of the incident is not only the package names, but the combination of impersonation, silent background execution, persistence, and lateral propagation. For JavaScript projects, `npm install` should be treated as a security-sensitive operation, not as a purely administrative task.
