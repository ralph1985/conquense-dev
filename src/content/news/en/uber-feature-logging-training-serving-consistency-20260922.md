---
translationId: uber-feature-logging-training-serving-consistency-20260922
lang: en
slug: uber-feature-logging-training-serving-consistency-20260922
title: "Uber uses feature logging to close the gap between training and inference"
description: "Uber Eats records the features each model actually consumes and reuses them as the canonical training source, reducing drift, cost, and latency."
publishedAt: 2026-09-22
sourceName: "Uber Engineering"
sourceTitle: "Taming the ML Firehose: Scaling Feature Consistency"
sourceUrl: "https://www.uber.com/us/en/blog/taming-ml-firehose/"
author: "Paarth Chothani, Chirag Agrawal, and Amrith M."
tags: ["machine-learning", "data-platforms", "distributed-systems", "kafka", "flink"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Recommendation models do not depend only on their architecture. They also depend on the features they receive during inference being comparable to the features used during training. Uber has described how its Uber Eats recommendation platform addressed that gap with feature logging, a technique designed to make values served in production the canonical source for the next training cycle.

The problem appeared in seemingly minor details. One pipeline could represent a language as en-US while another used en, or produce jp_JA instead of jp-JA. The model learned categories that did not appear during serving. Predictions could continue to work without a visible error, but the input distribution changed and performance declined. Uber also had to deal with fragile ETL lineages, missing partitions, and delays of several days before production changes became visible in training data.

The proposal is to record, during inference, the exact values consumed by the model. Those data are published through Kafka and joined with impression events arriving from the client. Flink performs the join within a time window, retaining predictions only long enough to associate them with recommendations that a person actually saw. The resulting record contains the served features and the observed outcome, avoiding the need to recompute them through expensive offline joins.

The volume made it impractical to store everything. Uber mentions traffic of up to eight million predictions per second and estimates that logging every feature could reach hundreds of billions of rows per day, or approximately 1.7 petabytes per day. The response was selective logging. An allow list limits the set to features used by the model, reducing payload size by four to five times. Verbose feature names are encoded as deterministic integer identifiers, and only candidates that reach a user’s screen are retained instead of storing the entire scored universe.

Operating Flink required more than adding machines. Uber profiled individual operators and assigned different parallelism to the pre-join and join stages. It also had to replace a checkpointing strategy that caused RocksDB state to grow beyond 12 terabytes per hour. The solution kept only essential metadata, evicted records after joins completed, and deduplicated incoming data. Detailed metrics, deterministic validation, alerts as code, and tests that reproduced production-like conditions completed the system.

According to Uber, problematic features moved from mismatch rates above 10% to 0% in key cases, while some freshness service-level agreements improved from days to hours. The broader lesson applies beyond machine learning: consistency is not guaranteed because two teams share a schema. Teams must observe the real values moving through the system, preserve the evidence they need, and design logging with cost, selection, and retention limits from the beginning.
