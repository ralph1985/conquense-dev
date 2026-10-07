---
translationId: uber-mcp-gateway-governed-agent-access-20261001
lang: es
slug: uber-mcp-gateway-gobernanza-acceso-agentes-20261001
title: "Uber convierte MCP en una plataforma gobernada para agentes de IA"
description: "La arquitectura MCP Gateway de Uber combina descubrimiento, traducción de protocolos, autorización, observabilidad y revisión humana para conectar agentes con cientos de servicios."
publishedAt: 2026-10-01
sourceName: "Uber Engineering"
sourceTitle: "Designing MCP Gateway Uber's MCP Management Platform"
sourceUrl: "https://www.uber.com/us/en/blog/designing-mcp-gateway/"
author: "Alok Srivastava, Deepanshu Mehndiratta y Gaurav Gill"
tags: ["ai-agents", "mcp", "software-architecture", "security", "observability"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Uber ha publicado el diseño de MCP Gateway, una plataforma interna para conectar agentes de inteligencia artificial con servicios existentes sin obligar a cada equipo a construir una integración independiente. La iniciativa parte de un problema reconocible: cuando cientos de equipos incorporan agentes, las conexiones ad hoc producen herramientas duplicadas, catálogos difíciles de descubrir, controles de seguridad inconsistentes y una operación fragmentada.

La solución separa dos responsabilidades. El MCP Registry actúa como plano de control y mantiene el catálogo de servidores, herramientas, propietarios y configuraciones. El Proxy Gateway forma el plano de datos: recibe llamadas MCP y las traduce a HTTP, gRPC o TChannel antes de reenviarlas al servicio correspondiente. Las respuestas vuelven al formato compatible con MCP. Así, los servicios existentes pueden exponerse a agentes sin modificar sus interfaces internas.

El descubrimiento también está automatizado. AutoCrawler observa el registro de definiciones de interfaces de Uber, analiza servicios basados en Protobuf o Thrift, genera esquemas JSON-RPC y crea representaciones MCP. En los servidores nativos, consulta las herramientas publicadas y sus señales de disponibilidad. El resultado se registra desactivado por defecto. Descubrir una API no equivale a hacerla accesible: el equipo propietario debe revisar la descripción, aprobar la configuración y habilitarla. Cada modificación queda representada como un cambio revisable, con posibilidad de volver a una versión anterior.

La gobernanza se extiende al tiempo de ejecución. El gateway aplica autorización por servidor y herramienta, utiliza las políticas internas de acceso de Uber y redacciona datos personales o sensibles en las respuestas. Para integraciones de terceros, como Jira o Google, retransmite el token del usuario y delega el intercambio por la credencial externa al servicio correspondiente. Esto evita convertir el gateway en un almacén de secretos permanentes, aunque la seguridad final sigue dependiendo de las políticas concretas y de la correcta clasificación de cada herramienta.

Uber afirma que la plataforma aloja más de 800 servidores MCP y más de 5.000 herramientas. A esa escala aparece otro problema: entregar todos los esquemas al modelo consume contexto y aumenta el coste. Omni MCP resuelve parte de esa presión mediante descubrimiento gradual: primero busca servidores, después herramientas y finalmente el esquema necesario. Response Projection permite solicitar solo los campos requeridos, mientras que Code Mode deja que los agentes consulten y ejecuten herramientas desde la línea de comandos sin cargar catálogos completos en su contexto.

La lección técnica no es que MCP elimine la complejidad, sino que la desplaza hacia una arquitectura explícita de control. Para que los agentes sean operables, una organización necesita catálogo, propiedad, versiones, permisos, redacción, límites y trazabilidad. Tratar las herramientas como interfaces de producción, con revisión y rollback, resulta más sostenible que confiar en conexiones improvisadas entre cada agente y cada backend.
