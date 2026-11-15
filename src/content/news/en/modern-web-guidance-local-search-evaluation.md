---
translationId: modern-web-guidance-local-retrieval-engineering-20261112
lang: en
slug: modern-web-guidance-local-search-evaluation
title: "Search better before generating code: engineering Modern Web Guidance’s retrieval engine"
description: "Google’s local search engine combines semantic retrieval, lexical matching and explicit metrics: a useful case study for frontend AI tooling."
publishedAt: 2026-11-12
sourceName: "Chrome for Developers"
sourceTitle: "Local vector search for coding agents: From 507 MB to a 7-line loop"
sourceUrl: "https://developer.chrome.com/blog/mwg-technical-deep-dive"
author: "Editorial team"
tags: ["frontend", "javascript", "applied-ai", "testing", "performance"]
readingTime: 3
aiDisclosure: "AI-generated content."
---

A tool that helps write frontend code also needs to solve a search problem: finding the right recommendation before generating an implementation. On November 12, Paul Irish explained how Modern Web Guidance’s local engine evolved. Between its last two generations, the compressed package shrank from 23.4 to 7.1 MB, while measured cold starts fell from 770 to 185 milliseconds. The final architecture combines precomputed document vectors with a static representation of queries. These are project results, not a guarantee for other systems. [Chrome’s technical analysis](https://developer.chrome.com/blog/mwg-technical-deep-dive?hl=en).

To understand the solution, consider its lexical implementation. The BM25 module normalizes words, preserves internal hyphens and applies minimal English plural stemming. It also groups chunks belonging to the same guide, retaining their highest score. Reciprocal rank fusion then combines positions from different lists: each result receives a contribution inversely related to its rank. This allows orderings to be combined without requiring their original scores to share a scale. [Retrieval implementation](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/src/rag/bm25.ts).

The technical implication matters for JavaScript and browser API documentation. An exact identifier and a description of intent represent different needs. As a design principle, a search engine should test both: someone who knows an API’s name needs literal precision; someone describing a behavior needs to discover vocabulary they do not yet know. Evaluating only one path can hide failures in the other.

The public evaluation dashboard also distinguishes between finding any correct guide and finding every necessary guide. Hit@K gives the same credit whether the first valid answer appears in position one or ten. Recall measures coverage, while other metrics incorporate ordering and the cost of irrelevant results. A high hit rate therefore does not establish, by itself, that the supplied context is complete or efficient. [Project definitions and results](https://googlechrome.github.io/modern-web-guidance-src/search/).

The catalog supports concrete tests: it includes guides covering form submission compatible with IME input methods, validation after interaction and breaking up long tasks. These examples connect retrieval with observable interface behavior, beyond locating documents containing similar words. [Public catalog](https://github.com/GoogleChrome/modern-web-guidance-src).

As a practical application, a team could build a small set of queries about its own components and associate each query with the expected recommendations. It should then check coverage, ranking, latency and the behavior of the resulting code separately. This is a proposed validation approach, rather than a result demonstrated by Google: retrieving a relevant guide helps direct the agent, but the implementation still needs verification against the guide’s conditions.
