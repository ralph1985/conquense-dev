---
translationId: go-http1-connection-reuse-20261014
lang: en
slug: go-127-improves-http1-connection-reuse
title: "Go 1.27 improves HTTP/1 connection reuse"
description: "Go 1.27’s HTTP transport tries to reuse connections when a program closes a response without consuming its entire body, reducing hidden TCP and TLS costs."
publishedAt: 2026-10-14
sourceName: "The Go Programming Language"
sourceTitle: "Better HTTP/1 connection reuse"
sourceUrl: "https://go.dev/blog/http-connection-reuse"
author: "Nicholas Husin and Damien Neil"
tags: ["go", "web performance", "http", "networking"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Go 1.27 adds a small change to net/http with potentially large effects for clients that make many HTTP/1 requests. The transport now tries to asynchronously drain a bounded portion of a response body that the application has not read before closing it. If the drain finishes in time, the connection can return to the reusable connection pool instead of being discarded.

The problem comes from how HTTP/1 carries multiple responses over a sequential byte stream. A client can parse the status line and headers and return a Response object before the body has been consumed. To locate the next response, it must reach the end of the current body, based on Content-Length or Transfer-Encoding. If the program only needs the status code and calls Close() without reading the body, the traditional transport cannot know that the connection is ready for another request and commonly opens a new one.

Repeating that process costs both the TCP and TLS handshakes. In cross-region communication, establishing a connection alone can require several round trips before the useful request arrives. The maintainers’ example compares one hundred HTTP/1 requests to index.golang.org: about 710 milliseconds on Go 1.26 versus 150 milliseconds on Go 1.27 under the same conditions. The difference does not come from a server change, but from avoiding unnecessary connections.

The implementation uses deliberate limits: up to 256 KB and up to 50 milliseconds of draining. If the body is large or arrives slowly, continuing to download it may cost more than opening another connection. The transport also avoids the work when the response already contains Connection: close. HTTP/2 is different because its streams are multiplexed within one connection, so an unread body does not block other requests in the same way.

The case exposes a common source of performance regressions: code that is functionally correct but prevents the network stack from using its infrastructure efficiently. Even a JSON decoder can stop immediately after the closing brace and leave a trailing newline unread. In the past, developers often wrote their own body-draining helpers with byte limits, timeouts, and goroutines; every workaround introduced more decisions and risks.

Go’s current recommendation is simple again: close the body when it is no longer needed and let Transport handle bounded recovery. Teams should still measure their actual traffic patterns. With large responses, servers that force connection closure, or unstable networks, reuse will not always be possible. The improvement is especially useful for SDKs, crawlers, workers, and services making many small requests, where the cost of each handshake can dominate total execution time.
