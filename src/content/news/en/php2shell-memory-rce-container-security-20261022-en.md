---
translationId: php2shell-memory-rce-20261022
lang: en
slug: php2shell-memory-rce-container-security-20261022-en
title: "PHP2Shell shows why container images are part of the response to a runtime vulnerability"
description: "Two critical PHP vulnerabilities enable unauthenticated remote code execution in affected versions. Docker explains why updating the base image and rebuilding deployments are both"
publishedAt: 2026-10-22
sourceName: "Docker Security"
sourceTitle: "Security Update on PHP2Shell: Impact for Docker Customers"
sourceUrl: "https://www.docker.com/blog/security-update-on-php2shell-impact-for-docker-customers/"
author: "Docker Security"
tags: ["php", "security", "remote-code-execution", "containers", "software-supply-chain"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

The vulnerabilities known as PHP2Shell have turned a PHP interpreter update into an inventory, supply-chain, and deployment problem. Docker reported on October 22 that CVE-2026-109618 and CVE-2026-109619 affect PHP packages distributed since version 5.4. Both vulnerabilities are critical and can allow unauthenticated remote code execution under certain conditions.

The first flaw concerns memory handling when PHP runs out of memory during a request. Some error paths can leave structures partially initialized and cause cleanup code to treat invalid data as valid. The second involves internal state retaining references to memory that has already been freed. In both cases, an attacker may try to turn incorrect engine behavior into code execution on the server.

The risk is not limited to a traditional Apache installation. Affected versions may appear behind PHP-FPM, php-cgi, FrankenPHP, LiteSpeed, hosting panels, appliances, and containers. That breadth is why the response cannot consist only of updating a dependency declared by the application. Teams also need to identify which binary each service actually runs, which image contains it, and which processes remain active after deployment.

PHP released fixes for the 8.2, 8.3, 8.4, and 8.5 branches in versions 8.2.35, 8.3.36, 8.4.27, and 8.5.12. Docker updated its official images and Docker Hardened Images, but a corrected tag does not update containers that are already running. A safer workflow pins the version, rebuilds the image, reviews the scanner results, publishes the new artifact, and replaces the old instances.

The incident offers a practical lesson for teams that manage software through immutable images. Floating tags such as latest make it difficult to know which code and interpreter are running in production. A useful inventory should connect the deployed service to the image digest, the effective PHP version, and the rebuild date. It should also cover intermediate images, administration-tool dependencies, and services that do not appear in the main application repository.

WAF rules may reduce known attack patterns while a change is being prepared, but they do not replace an engine update. Unsupported branches require an additional decision: upgrade the branch, apply a vendor-provided backport, or temporarily remove the service from the Internet. The technical conclusion is straightforward: when a runtime is vulnerable, the security boundary is the component actually processing the request, not the language the application claims to use.
