---
translationId: google-api-gateway-mcp-rest-20260924
lang: es
slug: google-api-gateway-convierte-apis-rest-en-herramientas-mcp
title: "Google API Gateway convierte APIs REST en herramientas MCP sin otro servidor"
description: "La vista previa pública conecta APIs OpenAPI existentes con agentes mediante MCP, reutilizando autenticación, cuotas y registros del gateway."
publishedAt: 2026-09-24
sourceName: "Google Developers Blog"
sourceTitle: "Turn your REST APIs into MCP tools with Google Cloud API Gateway"
sourceUrl: "https://developers.googleblog.com/en/turn-your-rest-apis-into-mcp-tools-with-google-cloud-api-gateway/"
author: "Sanjay Pujare, Paul Howell y Geir Sjurseth"
tags: ["apis", "openapi", "mcp", "agentes", "arquitectura"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google ha presentado en vista previa pública una forma de exponer APIs REST existentes como herramientas para agentes compatibles con el Model Context Protocol (MCP). La propuesta se apoya en Google Cloud API Gateway y evita construir un servidor MCP separado que vuelva a implementar el enrutamiento, la autenticación, las cuotas y los registros de una API ya operativa.

El mecanismo parte de una especificación OpenAPI 3.0 o 3.1. El equipo debe activar MCP en el documento mediante una extensión de Google y puede personalizar cada operación con un nombre y una descripción específicos para el agente. Después de desplegar la configuración habitual del gateway, este ofrece una ruta /mcp. Las solicitudes MCP usan JSON-RPC; API Gateway transforma cada llamada tools/call en una petición REST, conserva los parámetros de ruta, consulta, cuerpo y cabeceras, y devuelve la respuesta como resultado MCP.

La decisión arquitectónica más importante es que ambos caminos comparten la política de la API. Una operación invocada desde REST o desde un agente pasa por la misma autenticación JWT o mediante clave de API, las mismas cuotas y el mismo sistema de logging. Esto reduce la posibilidad de que el canal para agentes se convierta en una excepción de seguridad o de observabilidad. También permite incorporar una API a un flujo agentic sin duplicar la lógica de negocio.

Hay, sin embargo, varios detalles que merecen atención. La descripción de una herramienta no es solo documentación: es una señal que el modelo emplea para decidir cuándo llamarla. Debe explicar cuándo y por qué usar la operación, además de qué devuelve. La publicación de tools/list tampoco debe darse por inocua. En la configuración predeterminada puede revelar nombres de herramientas y esquemas de entrada sin autenticación; para producción, Google recomienda proteger el descubrimiento con JWT. Las llamadas a tools/call siguen aplicando la seguridad definida por cada operación.

La vista previa tiene límites explícitos. No cubre todavía recursos ni prompts MCP, streaming de respuestas o inspección de cargas mediante Model Armor. Las respuestas HTTP 204 no se exponen, los esquemas profundamente anidados pueden representarse de forma incompleta y un gateway admite hasta 1.000 herramientas. Además, MCP y el enrutamiento de modelos no pueden activarse en la misma configuración.

La lección técnica es menos espectacular que añadir otro framework, pero más útil: una frontera de agentes puede integrarse en una arquitectura API existente si el contrato OpenAPI, las descripciones, la autenticación y las cuotas se tratan como parte del diseño. La vista previa no elimina la necesidad de validar permisos ni de probar el comportamiento del agente, pero reduce una pieza operativa que, de otro modo, sería fácil de mantener de forma divergente.
