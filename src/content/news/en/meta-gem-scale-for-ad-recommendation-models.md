---
translationId: meta-gem-recsys-scale-20261013
lang: en
slug: meta-gem-scale-for-ad-recommendation-models
title: "Meta explains how it scales a unified recommendation model for ads"
description: "The new generation of GEM combines a central model, representation transfer, and hardware optimizations to train recommendation systems at foundation-model scale."
publishedAt: 2026-10-13
sourceName: "Engineering at Meta"
sourceTitle: "Meta’s Generative Ads Model (GEM): Scaling the Central Model and Compute Engine for Frontier Ads AI"
sourceUrl: "https://engineering.fb.com/2026/10/13/ml-applications/generative-ads-model-gem-scaling-frontier-ads-ai/"
author: "Huayu Li, Darren Liu, Xiaoyi (Leo) Liu, Ellie Wen, Jackie (Jiaqi) Xu, Chunzhi Yang, and Reva Srinivasan"
tags: ["applied AI", "machine learning", "recommender systems", "GPU systems", "scaling"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Meta has published details about the 2026 generation of GEM, its foundation model for ad recommendation. The technical interest is not only the model’s size, but the decision to replace systems separated by surface and objective with a central model that can learn from signals across Facebook, Instagram, Reels, Stories, and other parts of the advertising ecosystem.

Recommendation systems do not behave exactly like language models. They work with heterogeneous features, user-item interactions, behavior sequences, and distributions that change quickly. Meta says the Kunlun architecture combines long-sequence modeling with recommendation-specific interactions and that, at its largest pre-training scale, it observed a growth pattern resembling the scaling laws of language models. The company reports a 2.5-fold increase in model complexity compared with earlier versions.

The second component is transferring intelligence to models that can actually run in user-facing paths. Serving a model of this size directly for every advertising candidate would be too expensive and could increase latency. GEM uses structured representations, distillation, and elastic precomputation to transfer part of the central model’s information to downstream models. Meta says this mechanism doubles intelligence transfer without adding compute cost or latency to the final serving path.

Unification also changes how different objectives are trained. The model jointly learns clicks and conversions, and can reuse representations learned from data-rich tasks to improve tasks with less data. Meta describes a data-mixing mechanism intended to keep proportions close to the stream received by the production system, along with shared experts and domain-specific experts. The architecture therefore aims to combine general knowledge with patterns specific to each surface.

The infrastructure is as important as the model. GEM trains on several thousand GPUs and uses custom kernels, reduced precision, and five-dimensional parallelism. Meta separates the efficiency of each individual GPU from the efficiency of distributing work across thousands of devices. With optimizations to kernels, memory, networking, and parallelism, the company says it doubled end-to-end training efficiency to 20–25% MFU while increasing total FLOPs fourfold.

The technical conclusion is cautious: scaling a recommendation system is not simply a matter of adding parameters and buying more accelerators. It requires co-designing architecture, data, downstream models, inter-device communication, and memory. It also requires measuring model quality, serving latency, and training efficiency separately. GEM is relevant to other applied-AI systems because it shows that a central architecture can simplify knowledge transfer, but only when the infrastructure and production path are designed to make that scale operable.
