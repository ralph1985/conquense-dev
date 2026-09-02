---
translationId: rust-arrayref-supply-chain-attack
lang: en
slug: supply-chain-attack-affects-arrayref-on-crates-io
title: "A supply-chain attack affects arrayref on crates.io"
description: "The Rust Security Response Team removed several malicious crates after finding a build script that downloaded a payload, potentially affecting projects that used the packages."
publishedAt: 2026-08-20
sourceName: "Rust Blog"
sourceTitle: "Supply chain attack on arrayref"
sourceUrl: "https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/"
author: "Manish Goregaokar"
tags: ["rust", "security", "supply-chain", "dependencies"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

The Rust Security Response Team reported a supply-chain attack on August 20 involving several crates published on crates.io. The incident began with a report about `proc-macro1`; the investigation confirmed that it contained a build script capable of downloading a malicious payload. During the response, the team also found that the popular `arrayref` crate had been republished and configured to depend on it.

The identified versions were removed from the registry. They included `arrayref@0.3.10`, which was available for 86 minutes, `internment@0.8.7`, available for 90 minutes, and `append-only-vec@0.1.9`, available for 107 minutes. The affected packages also included `proc-macro1`, `proc-macro-en`, `aovine`, `arone`, `aronenao`, and `tinymember`. The team considers it likely that the `arrayref` author’s computer or credentials were compromised, but it does not attribute malicious intent to the maintainer.

The technical significance lies in where the code runs. A build script is not merely a passive packaging step: it can execute while a dependency is being built and download or prepare components for the compiling environment. If an apparently harmless crate includes a compromised dependency, the risk can reach projects that never directly added the malicious package. The transitive relationship through `arrayref` shows why reviewing only the dependencies declared in a manifest is insufficient.

The first response for Rust teams is to check whether any affected version reached their machines. The official notice suggests searching for the relevant files in `~/.cargo/registry/cache`, including any version of the malicious crates where no specific safe version was identified. That check should be supplemented by reviewing `Cargo.lock`, the dependency graph, and artifacts produced by CI during the exposure window. The goal is to distinguish between a version published to the registry and one that was actually downloaded or compiled.

Removing a version from the registry does not automatically erase local copies, CI caches, or artifacts that have already been generated. Teams should therefore preserve evidence, invalidate caches according to their internal procedure, and rebuild from verified sources. If an affected version was present in an environment with important secrets or permissions, the team should assess credential rotation and result review as part of its normal response to a possible build compromise.

The incident also demonstrates the value of coordinated ecosystem response. The Rust team removed the malicious packages, restored versions that had been yanked as a precaution, and locked the account while contacting the author. For maintainers, the operational lesson is to protect publishing credentials, review unexpected dependency changes, and treat build scripts as code with real execution capability.
