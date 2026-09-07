---
translationId: webkit-top-level-await-safari-2026-09-02
lang: en
slug: webkit-rewrites-safaris-module-loader-to-fix-top-level-await
title: "WebKit rewrites Safari’s module loader to fix top-level await"
description: "Safari’s new module loader addresses asynchronous evaluation bugs through an implementation aligned with ECMAScript and validated with fuzzing and web-platform tests."
publishedAt: 2026-09-02
sourceName: "WebKit"
sourceTitle: "Fixing Top-Level Await in Safari"
sourceUrl: "https://webkit.org/blog/18227/fixing-top-level-await-in-safari/"
author: "Kai Tamkun"
tags: ["javascript", "browsers", "web APIs", "testing"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

WebKit has explained how it rewrote Safari’s module loader to fix compatibility problems with top-level await. The feature allows await at the top level of an ECMAScript module, but its semantics affect the entire dependency graph: modules importing the suspended module must also wait, while unrelated modules may continue.

Safari’s problem was not simply an incomplete implementation of a syntax feature. The original loader had been built years earlier on the WHATWG Loader proposal, which stopped evolving before ECMAScript added async/await and top-level await. That design could produce an incorrect sequence when the same asynchronous module was imported multiple times. Some promises resolved before the module’s actual evaluation had finished, allowing consumer code to read exports that had not been initialised.

WebKit illustrates the failure with three concurrent dynamic imports. With the old loader, imports could complete in an unexpected order and produce errors such as Cannot access 'someArray' before initialization. The problem appeared when the module paused at await: the second and third importers observed a premature resolution even though module evaluation was not complete.

Rather than adding another patch, WebKit decided to rebuild the loader around the asynchronous-module algorithms defined by ECMAScript. The team created a call graph from the specification’s pseudocode and implemented the operations in C++. The change also removes the old self-hosted JavaScript builtin. According to WebKit, that implementation had startup costs and less predictable performance because it had to be compiled at runtime, while the loader was not a sufficiently hot path to offset those costs through JIT optimisation.

Validation combines several layers. Bun engineers supplied test cases that reproduced incorrect behaviour inherited through its use of JavaScriptCore. WebKit adapted those cases and added a fuzzer capable of generating complex graphs containing modules with and without top-level await. Output from the new engine was compared byte for byte with other JavaScript engines. The team also ran test262 and Web Platform Tests, fixing previously failing module tests without introducing regressions in the covered cases.

The implementation can be tried in Safari Technology Preview 251 and the Safari 27 beta. For developers, this does not mean every application should immediately adopt top-level await. It does provide a useful signal: applications that depend on asynchronous ES modules should test realistic import graphs across multiple engines, especially when cycles, dynamic imports, or exports initialised after an await are involved.

The engineering lesson extends beyond Safari. When a feature crosses a complex state machine, correcting the foundational layer can be more reliable than accumulating local exceptions. The specification, reproduction cases, differential fuzzing, and conformance suites work together as a maintenance strategy that turns a subtle execution bug into verifiable behaviour.
