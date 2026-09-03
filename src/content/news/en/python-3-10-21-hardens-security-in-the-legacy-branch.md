---
translationId: python-31021-20260812
lang: en
slug: python-3-10-21-hardens-security-in-the-legacy-branch
title: "Python 3.10.21 hardens security in the legacy branch"
description: "The Python 3.10 security update fixes vulnerabilities in parsing, archives, HTTP, XML, and code loading."
publishedAt: 2026-08-12
sourceName: "Python.org"
sourceTitle: "Python 3.10.21"
sourceUrl: "https://www.python.org/downloads/release/python-31021/"
tags: ["python", "security", "supply chain", "software engineering"]
readingTime: 3
aiDisclosure: "AI-generated text, reviewed before publication."
---

Python 3.10.21, released on August 12, is a security update for a branch that now receives this kind of fix only. It does not add the capabilities of a feature release and is distributed as source code, but it contains changes that matter to applications still relying on Python 3.10.

The fixes cover several surfaces that are often distant from business logic. `SourcelessFileLoader` changes how `.pyc` files are opened to address CVE-2026-2297. `tarfile` receives multiple fixes to prevent bypasses of its extraction filters and symlinks that could escape the destination directory. `shutil.unpack_archive()` is also corrected on Windows for paths containing drive prefixes.

The update further hardens networking and protocol components. `http.client` limits the number of chunked-response trailer lines and interim responses it will process, preventing a malicious server from keeping a client busy indefinitely. `wsgiref.handlers` rejects control characters in HTTP status values to prevent header injection. In `webbrowser`, several checks stop URLs with unexpected prefixes or characters from bypassing protections intended to prevent unsafe invocations.

There are also fixes in XML, compression, and Unicode normalization. The release addresses a possible resource-exhaustion issue when normalizing unusually large sequences of combining characters, improves protection against billion-laughs-style attacks, and fixes memory errors in `bz2` and `lzma` decompressors. Taken together, the scope illustrates why a runtime dependency is part of the attack surface even when an application does not directly use every affected function.

The operational response depends on the installation method. Teams maintaining Python 3.10 should check how their images or environments are built, incorporate the corrected source, and repeat compatibility tests. They should also verify whether a third party packages the interpreter inside a base image, a serverless function, or an automation tool: updating `requirements.txt` does not necessarily update the runtime.

The release does not remove the cost of staying on an old branch. Python 3.10 is in its security-fixes-only phase and will stop receiving those fixes in October 2026. Immediate patching and migration to a supported version are therefore separate tasks: the first reduces current risk; the second prevents every future advisory from becoming an exceptional operation. Validation should include compressed-file handling, HTTP/XML parsing, worker startup, and reproducibility of deployment images.
