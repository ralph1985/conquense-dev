---
translationId: meta-rebalancer-resource-assignment-20260921
lang: en
slug: meta-rebalancer-resource-assignment-datacenter-scale
title: "Meta open-sources Rebalancer, a resource-assignment engine for datacenter scale"
description: "Meta releases Rebalancer, a library that separates modeling, solving, and debugging for large-scale infrastructure assignment problems."
publishedAt: 2026-09-21
sourceName: "Engineering at Meta"
sourceTitle: "Open-Sourcing Rebalancer: A Generic, High-Performance Library for Solving Assignment Problems"
sourceUrl: "https://engineering.fb.com/2026/09/21/open-source/rebalancer-generic-high-performance-library-assignment-problems/"
author: "Meta Algorithmic Optimization team"
tags: ["systems", "open-source", "optimization", "datacenters", "maintainability"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Meta has open-sourced Rebalancer, a library for solving assignment problems that has been used in its infrastructure for more than nine years. The tool addresses a common class of decisions in distributed systems: placing objects into bins while respecting constraints and optimizing objectives. Objects may be tasks, servers, data shards, or traffic flows; bins may be machines, services, or datacenters.

The most interesting idea is not only the search algorithm. Rebalancer separates four responsibilities that are often mixed together: describing the problem, representing its data, solving it, and debugging the solver’s behavior. This allows infrastructure teams to express policies without rewriting the engine every time a constraint changes or a new resource dimension appears.

The specification uses concepts such as objects, bins, dimensions, partitions, scopes, and utilization. An expression API combines sums, maxima, and transformations over those constructs. A higher-level specification layer then turns them into reusable objectives and constraints. In a task-placement example, CPU and storage are dimensions, jobs are partitions, and racks are scopes that allow distribution rules to be expressed.

The intermediate representation is a directed acyclic graph of expressions. From that graph, Rebalancer can generate a mixed-integer program for solvers such as HiGHS, Gurobi, or FICO Xpress, or run a local search directly over the model. The first path can provide optimal solutions for small and medium-sized problems, but the number of variables may grow roughly with the product of objects and bins. Local search gives up formal optimality to explore nearby moves and handle much larger problems.

The engine also uses variable aggregation, interchangeability, and symmetry breaking to reduce model size. During local search, it evaluates moves that transfer objects between bins, updates the expression graph, and applies the best candidate that improves the objective without violating constraints. Meta says the parallelized implementation can perform millions of evaluations per second.

The usage figures show why the architecture matters: Rebalancer solves roughly 40 million problems per day across more than thirty distinct formulations. Meta reports a P99 solve time of twelve seconds for a problem with 265,000 objects and 3,200 bins, and an average of 171 seconds for problems with more than one million objects and 5,000 bins.

The project includes Rebalancer Explorer, a containerized web interface for investigating binding constraints, relaxed constraints, and the reasons behind individual assignments. That reflects an important maintainability lesson: when an optimization system becomes reusable, debugging is no longer an accessory; it becomes part of the product. Separating the model from the solver and making decisions visible makes it easier to change strategies without losing operational understanding.

AI-generated content.
