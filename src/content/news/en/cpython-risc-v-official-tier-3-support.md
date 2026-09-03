---
translationId: cpython-riscv-tier3-2026-08-24
lang: en
slug: cpython-risc-v-official-tier-3-support
title: "CPython adds RISC-V as an officially supported tier 3 platform"
description: "The Python project officially recognizes RISC-V in CPython after improving builds, real-hardware testing, and architecture-specific issue resolution."
publishedAt: 2026-08-24
sourceName: "Python Insider"
sourceTitle: "RISC-V is now officially supported by CPython!"
sourceUrl: "https://blog.python.org/2026/08/riscv-now-officially-supported/"
author: "Stan Ulbrych"
tags: ["python", "risc-v", "open-source", "toolchains", "portability"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

## Architecture support starts with infrastructure

CPython now officially recognizes RISC-V as a tier 3 platform. The announcement, published by the Python team on August 24, follows several months of work on builds, real-hardware testing, architecture-specific fixes, and code review. The classification does not mean that RISC-V has the same maturity or coverage as the main platforms, but it does make support a recognized part of the interpreter’s development conditions.

RISC-V is an open instruction-set architecture that can be implemented by different manufacturers and projects. For a language with an ecosystem as broad as Python, having the interpreter run on an ISA is not enough. Compilers, packaging tools, native libraries, and the continuous integration systems used to detect regressions must advance as well.

The post emphasizes testing on real RISC-V hardware. The RISE Project provided several machines that CPython uses as buildbots, allowing the project to verify builds and debug issues that may not appear in emulation or on a conventional development machine. This is technically significant: runtime portability depends on conditional code, but also on a reproducible feedback cycle.

The next step under consideration is bringing RISC-V directly into CPython’s continuous integration. Buildbots generally run their checks after a change has been merged, while more direct CI integration could provide earlier feedback and expose architecture-specific failures during development. The team also hopes to work toward tier 2 support in the longer term.

For application maintainers, the announcement does not mean that every Python dependency is automatically ready. A RISC-V deployment must validate the complete chain: compiler, interpreter version, native extensions, packages containing C or Rust code, container images, and observability tools. The benefit of official classification is that it makes it easier to distinguish work handled by CPython’s core from work that still depends on individual ecosystem projects.

It also creates room for optimization. Once basic support is stable, the project can explore improvements that use specific RISC-V capabilities, but those optimizations should be measured on representative hardware and workloads so they do not benefit only one implementation. The post asks people with access to RISC-V systems to run CPython, test suites, and workloads, and to report failures.

The significance is less an immediate performance promise than the infrastructure being consolidated. A sustainable port needs test hardware, early CI, and participation from packages around the runtime. That work reduces dependence on a single processor family and turns portability into a verifiable property rather than a theoretical claim.
