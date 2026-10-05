---
translationId: google-federated-learning-tee-privacy-20261002
lang: en
slug: google-federated-learning-auditable-trusted-enclaves
title: "Google turns federated learning into an auditable system with trusted enclaves"
description: "Google Research describes a federated-learning architecture that moves computation to the server through trusted execution environments, verifiable policies, and transparency logs."
publishedAt: 2026-10-02
sourceName: "Google Research"
sourceTitle: "Toward provably private learning from federated data"
sourceUrl: "https://research.google/blog/toward-provably-private-learning-from-federated-data/"
author: "Katharine Daly and Daniel Ramage"
tags: ["applied-ai", "privacy", "federated-learning", "trusted-execution-environments", "systems"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Google Research has presented a new federated-learning architecture that addresses one of the model’s central tensions: how to train models on distributed data without making devices perform all the work or requiring users to trust the server blindly. The proposal combines trusted execution environments, or TEEs, with public access policies and reproducible system components.

The important change is where training runs. In earlier federated systems, much of the computation depended on participating devices. The new design allows encrypted examples to be uploaded and the training loop to run inside server-side enclaves. The code that may access the data is described by a previously authorized access policy. A key-management system releases decryption keys only to workloads that match that policy.

The architecture divides the process into several components. Devices encrypt examples locally and publish the policies that authorize their use. A cluster of enclaves manages keys through an implementation of the RAFT consensus protocol. A root enclave then coordinates training and delegates parallelizable subtasks to worker enclaves. Distributed logic is expressed with Federated Language, an open-source orchestration language derived from TensorFlow Federated.

Auditability does not depend only on hardware isolation. The policies describing workloads are published to Rekor, a transparency log, and the system’s key-management and data-processing binaries can be reproducibly built from open-source code. This allows an external auditor to verify which programs were authorized without observing the enclave’s internal data.

Google says Gboard already uses the system to train English and Japanese next-word prediction models. According to the technical explanation, the design also changes the performance profile: training that previously could take one to two months is no longer primarily limited by device availability, on-device compute, and competition for device resources. The server can parallelize the work, although available TEE capacity remains a practical constraint.

The lesson for data architects is twofold. Moving computation to the server does not automatically remove privacy risks: TEEs have limitations and potential side-channel issues still exist. It does, however, change the trust model. Assurance no longer rests only on an operational promise; it is supported by attested code, visible policies, transparency logs, and reproducible artifacts. For systems handling sensitive data, that combination provides a more verifiable foundation for balancing privacy, performance, and long-term evolution.

AI-generated content.
