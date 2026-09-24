---
translationId: uclm-energy-optimization-techniques-20260805
lang: en
slug: uclm-energy-efficiency-optimization-c-python-java
title: "UCLM research measures when code optimization also saves energy"
description: "A study involving UCLM’s Alarcos group compares 26 optimization techniques in C, Python, and Java and shows that their effects depend on the language and runtime."
publishedAt: 2026-08-05
sourceName: "Wiley Online Library"
sourceTitle: "Evaluating the Energy Efficiency of Optimization Techniques in C, Python, and Java"
sourceUrl: "https://onlinelibrary.wiley.com/doi/full/10.1002/spe.70096"
author: "Carlos Pulido, Félix García, M.ª Ángeles Moraga, Miguel Baños-González, Juan Antonio Rico-Gallego and Javier Corral-Garc"
tags: ["green software", "energy efficiency", "software engineering", "castilla-la-mancha", "uclm"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Optimizing a program so that it finishes sooner does not guarantee that it consumes less energy. A Wiley research article involving scientists from the Information Technologies and Systems Institute at the University of Castilla-La Mancha examines that difference through a controlled experiment across C, Python, and Java. The work was also highlighted by UCLM’s Alarcos group, based in Ciudad Real, connecting regional software-engineering research with a practical issue for data centers, IoT devices, and long-running applications.

The study evaluates 26 optimization techniques in functionally equivalent implementations. Each standard and optimized version produces the same result, and the experimental package has been published to support reproducibility. The researchers also compare execution environments: C with GCC at `-O0` and `-O3`; Python with CPython and Nuitka; and Java with the virtual machine running with or without Just-In-Time compilation. This separation matters because a compiler or runtime may automatically apply a transformation that interacts with a programmer-written change.

The results do not support a universal list of energy-efficient coding practices. Python was the language in which the largest share of techniques produced savings, 58%, with reductions of up to 70.38%, but it still had the highest overall consumption of the three. The largest individual reductions reached 99.81% in C and 99.96% in Java. These figures belong to the evaluated cases and configurations, not to every application using those languages.

Execution context changes the conclusion. In Java, for example, 17 techniques reduced consumption with the JIT disabled, compared with eight when the JIT was enabled; nevertheless, the normal JIT configuration had lower overall consumption. Some transformations compete with compiler optimizations. Splitting loops can interfere with work that the JIT would have fused, while other techniques retain benefits in both modes.

The study also records regressions. In C, the sentinel technique increased consumption by 357.76% under `-O3` in one scenario, although it reduced energy under `-O0`. Buffered input and output performed poorly consistently across all three languages, and lookup tables were not uniformly beneficial. Speed therefore cannot be used as an automatic substitute for energy measurement: even parallelization may reduce execution time while increasing dynamic energy use.

For software teams, the consequence is methodological. Sustainability should enter performance testing with representative workloads, known hardware, and the runtime used in production. Teams should verify functional equivalence first, compare more than one configuration, and keep the results alongside the code. The UCLM work provides a reproducible basis for treating consumption as a measurable system property rather than an intuition derived from coding style.
