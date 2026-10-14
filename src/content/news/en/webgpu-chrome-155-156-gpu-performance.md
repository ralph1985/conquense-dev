---
translationId: webgpu-chrome-155-156-performance-20261007
lang: en
slug: webgpu-chrome-155-156-gpu-performance
title: "WebGPU improves graphics performance with new WGSL extensions"
description: "The WebGPU updates in Chrome 155 and 156 refine early fragment rejection, texture compression, and HDR color handling."
publishedAt: 2026-10-07
sourceName: "Chrome for Developers"
sourceTitle: "What's New in WebGPU (Chrome 155-156)"
sourceUrl: "https://developer.chrome.com/blog/new-in-webgpu-155-156"
author: "François Beaufort"
tags: ["webgpu", "javascript", "browsers", "performance", "graphics"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

The WebGPU update for Chrome 155 and 156 collects several small but technically meaningful improvements for applications that render graphics or run GPU computation in the browser. It is not one revolutionary API. Its value lies in removing costs that previously required padding, disabled hardware optimizations, or reduced color fidelity.

The most direct performance improvement is WGSL’s `fragment_depth` extension. When a shader writes to `frag_depth`, drivers often disable early-Z optimizations because they cannot guarantee that the computed depth is compatible with the depth interpolated by the rasterizer. The extension allows developers to declare whether the written value will be less than or greater than the original depth. That information lets the GPU discard hidden fragments before running an expensive shader. Applications should detect the feature through `navigator.gpu.wgslLanguageFeatures` and explicitly declare `requires fragment_depth`, since it remains potentially non-portable.

The `texture-compression-unaligned` feature is also significant. Until now, compressed textures had to respect compression-block dimensions, commonly multiples of four in formats such as BC, ETC2, and ASTC. When an image did not fit, developers had to pad or scale it. The new capability permits compressed textures whose dimensions do not align with those blocks, avoiding distortion and preserving the fidelity of the original assets. As with other WebGPU extensions, applications should inspect `adapter.features` and request the capability only when it is available.

For color handling, WebGPU adds the `srgb-linear` and `display-p3-linear` color spaces. Both represent values in a linear space, which is more appropriate for physical-light calculations, interpolation, antialiasing, and wide-gamut image processing. The distinction matters because storage representation and lighting computation are not the same thing; mixing them can produce incorrect visual results even when the code appears valid.

The update also adds the packed `snorm10-10-10-2` vertex format, which stores four normalized values in 32 bits. It can reduce the bandwidth required for attributes such as normals and auxiliary data, at the cost of more limited precision. Recent NVIDIA drivers on Linux can also use the optional `shader-f16` feature for 16-bit WGSL operations.

The practical lesson for web teams is cautious rather than sensational. WebGPU provides more control, but it also requires progressive enhancement, capability checks, and testing on real hardware. These features do not replace measurement; they give a well-designed implementation more opportunities to preserve performance when it can use device-specific capabilities.

AI-generated content.
