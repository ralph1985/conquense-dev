---
translationId: cloudflare-workers-module-registry-node-compatibility-20260909
lang: en
slug: cloudflare-workers-module-registry-node-compatibility-20260909
title: "Cloudflare rebuilds the Workers module registry for closer Node.js compatibility"
description: "The new workerd implementation uses real URLs, lazy compilation, and shared caches to improve compatibility with Node.js, ESM, CommonJS, and WebAssembly."
publishedAt: 2026-09-09
sourceName: "Cloudflare Blog"
sourceTitle: "How we rebuilt Cloudflare Workers’ module registry for Node.js compatibility"
sourceUrl: "https://blog.cloudflare.com/workers-module-registry-nodejs/"
author: "Logan Gatlin and James Snell"
tags: ["javascript", "nodejs", "module-systems", "runtime", "webassembly"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare has rewritten the module registry in Cloudflare Workers, the part of workerd that turns import specifiers into executable code. The update addresses a limitation that often remains hidden behind APIs: two runtimes may expose the same Node.js functions while behaving differently when they locate, load, compile, or cache modules.

The new implementation is available through the `new_module_registry` compatibility flag. It is not enabled automatically yet, so teams must opt in explicitly and test their applications. The change covers ESM, CommonJS, and WebAssembly, and adds support for `import.meta.url`, `import.meta.main`, and `import.meta.resolve()`.

The most important technical detail is that specifiers are treated as real URLs rather than simple filesystem paths. That makes it possible to apply rules consistent with `new URL()`, preserve queries and fragments, and handle protocols such as `node:` and `cloudflare:` without relying on special string prefixes. Import attributes are validated as well, and errors are made consistent across static `import`, dynamic `import()`, and `require()`. For applications that build loaders, plugins, or custom execution layers, this consistency makes diagnosis easier and reduces path-specific handling.

CommonJS interoperability is also brought closer to Node.js. When `require()` encounters an ES module, it follows the rules of `require(esm)`: it can return an export named `module.exports`, or otherwise return the module namespace. If the graph contains `top-level await`, the operation fails because `require()` must remain synchronous; the application must use `import()` instead. It is an unobtrusive constraint, but it prevents callers from receiving a partially evaluated module.

The registry also changes execution costs. The previous version compiled the entire bundle up front and kept private copies per V8 isolate. The new version compiles modules when they are imported and can share caches across replicas of the same Worker. That may reduce repeated work and memory use, although the actual effect will depend on each application’s module graph and hot paths.

The change also matters to build tools. Cloudflare’s Workers Vite plugin uses Rolldown to resolve dependencies, convert CommonJS when necessary, and produce chunks for dynamic imports. With a runtime that follows platform semantics more closely, the bundler can perform fewer transformations and leave more responsibility to execution.

The broader lesson for JavaScript environments is that compatibility does not end with copying APIs. Module resolution, identity, asynchrony, error models, and caching are all part of the contract. Cloudflare is keeping the old registry for existing Workers, so migration can be gradual, with tests covering dynamic imports, mixed ESM/CommonJS graphs, WebAssembly, and resolution failures.
