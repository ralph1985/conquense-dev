---
translationId: cloudflare-containers-cross-tenant-vulnerability-20260924
lang: en
slug: cloudflare-details-cross-container-data-leak
title: "Cloudflare details a cross-container data exposure vulnerability"
description: "Cloudflare explains how a storage setting in dm-thin could expose residual blocks from other containers and how it fixed the issue across its fleet."
publishedAt: 2026-09-24
sourceName: "Cloudflare Blog"
sourceTitle: "How Cloudflare addressed a cross-tenant data exposure vulnerability in Containers"
sourceUrl: "https://blog.cloudflare.com/containers-cross-tenant-vulnerability/"
author: "Rushil Mehra, Cody Roseborough, Avishek Sarkar and Hrushikesh Deshpande"
tags: ["cloud-security", "containers", "multi-tenant-security", "vulnerability"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Cloudflare has published a technical analysis of a cross-tenant isolation vulnerability in Cloudflare Containers and Cloudflare Sandboxes. A researcher from Accomplish reported it on September 4 through the bug bounty program. Cloudflare says it fixed the issue, completed cleanup of potentially affected data and found no evidence of malicious exploitation.

The flaw involved how Linux device mapper thin provisioning reused storage. Each container received a writable root disk inside a virtual machine running on Firecracker. When volumes were deleted, their physical blocks returned to a pool shared by workloads from different customer accounts.

The decisive detail was the skip_block_zeroing option. With it enabled, dm-thin did not clear a physical block before assigning it to another volume. The storage pool used 64 KiB blocks. A small 4 KiB write could trigger allocation and replace only part of the block; the remaining 60 KiB could retain bytes belonging to the previous owner.

Reading a region that had not yet been allocated returned zeroes, so the issue did not appear in a superficial check. The proof of concept located regions aligned with 64 KiB blocks, wrote a 4 KiB block and then examined the remaining contents through the storage device. The researchers used ext4 directory checksums to distinguish test blocks from blocks originating in other filesystems.

According to Cloudflare, residual material appeared in 18 of 24 placements and 20 of 22 underlying nodes examined. The recovered block types included directory structures, database pages and structurally complete SQLite databases. The technique could not select a particular victim, container or host, and depended on workload placement and block reuse.

The mitigation had two parts. First, Cloudflare removed skip_block_zeroing to restore dm-thin’s default behavior of clearing new allocations. It then retired running container disks and OCI image snapshots created before the change, drained hosts and rebuilt the layers with initialized blocks.

The case is a reminder that container isolation does not end at the process or hypervisor boundary. It also depends on storage guarantees, block sizes, caches and recycling behavior. The response is particularly instructive because it combines technical disclosure, controlled reproduction, retrospective detection through telemetry and cleanup of old artifacts.
