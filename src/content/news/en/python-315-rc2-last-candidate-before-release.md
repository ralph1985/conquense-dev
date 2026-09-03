---
translationId: python-315-rc2
lang: en
slug: python-315-rc2-last-candidate-before-release
title: "Python 3.15 reaches its final release candidate"
description: "The second Python 3.15 release candidate fixes the ABI and opens the final testing phase for packages, binary wheels, and performance changes before the planned October 1 release."
publishedAt: 2026-09-01
sourceName: "Python Insider"
sourceTitle: "Python 3.15.0 candidate 2 is here!"
sourceUrl: "https://blog.python.org/2026/09/python-3150-rc2/"
author: "Hugo van Kemenade"
tags: ["python", "release", "performance", "tooling"]
readingTime: 4
aiDisclosure: "AI-generated text reviewed before publication."
---

Python 3.15.0rc2, published on September 1, is the final planned release candidate for the new interpreter version. The project reports around 144 bug fixes, build improvements, and documentation changes since rc1. From this phase onward, only reviewed changes that are clear bug fixes are accepted, and the final release is scheduled for October 1, 2026.

The most practical consequence for teams is not installing the candidate in production, but starting compatibility testing. The project says there will be no further ABI changes from this point and that binary wheels built against Python 3.15.0rc2 will work with future Python 3.15 releases. That gives maintainers time to publish wheels on PyPI, find build problems, and test native extensions before the stable version arrives.

The series introduces changes affecting startup, observability, and concurrency. Explicit lazy imports can reduce initial work when an application does not need every module immediately. Python also adds `frozendict` as a built-in type, a dedicated `sentinel` type, and a profiling package intended to organize analysis tools. Frame pointers are enabled by default to improve system-level observability.

The project also reports improvements to the JIT compiler: an 8–9% geometric-mean improvement on x86-64 Linux over the standard interpreter, and a 12–13% speedup on AArch64 macOS over the tail-calling interpreter. These are figures from the project’s own benchmarks and should be treated as reference measurements, not a guarantee for every application. Runtime context, extensions, and real workloads will remain decisive.

There are also relevant changes in the official distributions. The official 64-bit Windows binaries now use the tail-calling interpreter, while the official macOS binaries install free-threading support by default. This is a reason to expand the CI matrix: test with and without native extensions, review platform-specific wheels, and check libraries that depend on assumptions about the interpreter or ABI.

For application users, waiting for the stable release remains the sensible approach. For maintainers of libraries, servers, and tools, the current window is especially useful because incompatibilities can still be found while they can be fixed in the final cycle. Early testing, documented failures, and compatible wheels will reduce migration friction when Python 3.15 reaches production.
