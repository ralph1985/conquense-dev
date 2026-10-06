---
translationId: google-api-gateway-mcp-rest-20260924
lang: en
slug: google-api-gateway-turns-rest-apis-into-mcp-tools
title: "Google API Gateway turns REST APIs into MCP tools without another server"
description: "The public preview connects existing OpenAPI APIs to agents through MCP while reusing the gateway’s authentication, quotas, and logging."
publishedAt: 2026-09-24
sourceName: "Google Developers Blog"
sourceTitle: "Turn your REST APIs into MCP tools with Google Cloud API Gateway"
sourceUrl: "https://developers.googleblog.com/en/turn-your-rest-apis-into-mcp-tools-with-google-cloud-api-gateway/"
author: "Sanjay Pujare, Paul Howell and Geir Sjurseth"
tags: ["apis", "openapi", "mcp", "agents", "architecture"]
readingTime: 4
aiDisclosure: "AI-generated content."
---

Google has introduced a public-preview way to expose existing REST APIs as tools for agents that support the Model Context Protocol (MCP). The proposal is built into Google Cloud API Gateway and avoids operating a separate MCP server that would otherwise have to reimplement the routing, authentication, quotas, and logging of an API that already exists.

The workflow starts with an OpenAPI 3.0 or 3.1 specification. Teams enable MCP at the document level through a Google extension and can customize individual operations with an agent-specific name and description. After deploying the normal gateway configuration, API Gateway serves an /mcp endpoint. MCP requests use JSON-RPC; the gateway translates each tools/call into a REST request, preserves path, query, body, and header parameters, and returns the response as an MCP result.

The most important architectural choice is that both paths share the API’s policy layer. An operation called through REST or through an agent uses the same JWT or API-key authentication, the same quota allocation, and the same logging system. That reduces the risk that an agent channel becomes a security or observability exception. It also lets teams add an API to an agent workflow without duplicating business logic.

Several details still deserve careful treatment. A tool description is not merely documentation: it is a signal the model uses to decide when to call the operation. It should explain when and why the tool should be used, as well as what it returns. The tools/list method should not be treated as harmless discovery either. By default, it can expose tool names and input schemas without authentication; for production, Google recommends securing discovery with JWT. Calls to tools/call still enforce the security configured for each underlying operation.

The preview has clear limits. MCP resources and prompts, response streaming, and Model Armor payload inspection are not included yet. Operations that return HTTP 204 are not exposed, deeply nested schemas may not render completely, and a gateway supports up to 1,000 tools. MCP and model routing also cannot be enabled in the same API configuration.

The technical lesson is less flashy than adding another framework, but more practical: an agent boundary can fit into an existing API architecture when the OpenAPI contract, descriptions, authentication, and quotas are treated as part of the design. The preview does not remove the need to validate permissions or test agent behavior, but it removes an operational component that could otherwise drift away from the original API.
