---
translationId: uber-mcp-gateway-governed-agent-access-20261001
lang: en
slug: uber-mcp-gateway-governed-agent-access-20261001
title: "Uber turns MCP into a governed platform for AI agents"
description: "Uber’s MCP Gateway combines discovery, protocol translation, authorization, observability, and human review to connect agents with hundreds of services."
publishedAt: 2026-10-01
sourceName: "Uber Engineering"
sourceTitle: "Designing MCP Gateway Uber's MCP Management Platform"
sourceUrl: "https://www.uber.com/us/en/blog/designing-mcp-gateway/"
author: "Alok Srivastava, Deepanshu Mehndiratta, and Gaurav Gill"
tags: ["ai-agents", "mcp", "software-architecture", "security", "observability"]
readingTime: 5
aiDisclosure: "AI-generated content."
---

Uber has published the design of MCP Gateway, an internal platform for connecting artificial-intelligence agents to existing services without requiring every team to build a separate integration. The initiative starts from a familiar problem: when hundreds of teams adopt agents, ad hoc connections create duplicated tools, difficult-to-discover catalogs, inconsistent security controls, and fragmented operations.

The solution separates two responsibilities. The MCP Registry acts as the control plane and maintains the catalog of servers, tools, owners, and configurations. The Proxy Gateway forms the data plane: it receives MCP calls and translates them into HTTP, gRPC, or TChannel requests before forwarding them to the relevant service. Responses are converted back into an MCP-compatible format. Existing services can therefore be exposed to agents without changing their internal interfaces.

Discovery is automated as well. AutoCrawler watches Uber’s interface-definition registry, analyzes services based on Protobuf or Thrift, generates JSON-RPC schemas, and creates MCP representations. For native servers, it queries the tools they publish and their availability signals. The result is registered disabled by default. Discovering an API does not mean making it accessible: the owning team must review the description, approve the configuration, and enable it. Each modification is represented as a reviewable change, with the option to return to an earlier version.

Governance also extends to runtime execution. The gateway applies authorization at server and tool level, uses Uber’s internal access policies, and redacts personal or sensitive data from responses. For third-party integrations such as Jira or Google, it forwards the user token and delegates the exchange for an external credential to the corresponding service. This prevents the gateway from becoming a store for permanent secrets, although final security still depends on the specific policies and on correctly classifying every tool.

Uber says the platform hosts more than 800 MCP servers and over 5,000 tools. At that scale, another problem appears: sending every schema to the model consumes context and raises cost. Omni MCP addresses some of that pressure through gradual discovery: it first searches for servers, then tools, and finally the required schema. Response Projection allows callers to request only the required fields, while Code Mode lets agents query and execute tools from the command line without loading complete catalogs into their context.

The technical lesson is not that MCP removes complexity, but that it moves complexity into an explicit control architecture. For agents to be operable, an organization needs a catalog, ownership, versioning, permissions, redaction, limits, and traceability. Treating tools as production interfaces, with review and rollback, is more sustainable than relying on improvised connections between every agent and every backend.
