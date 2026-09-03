---
translationId: opentelemetry-go-logs-rc
lang: es
slug: opentelemetry-go-logs-api-sdk-candidatos-estabilidad
title: "OpenTelemetry Go acerca su API de logs a la estabilidad"
description: "La API y el SDK de logs de OpenTelemetry Go llegan a release candidate tras una larga fase beta, con especial atención a backpressure, asignaciones y compatibilidad futura."
publishedAt: 2026-08-31
sourceName: "OpenTelemetry"
sourceTitle: "OpenTelemetry Go Logs API and SDK reach release candidate status"
sourceUrl: "https://opentelemetry.io/blog/2026/go-logs-api-sdk-rc/"
author: "Robert Pająk"
tags: ["opentelemetry", "observabilidad", "go", "arquitectura"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

OpenTelemetry Go ha publicado `v1.47.0-rc.1` de su API y SDK de logs. El paso a release candidate significa que el diseño entra en la última fase de validación antes de recibir garantías de compatibilidad estable en la línea 1.x. El proyecto pide probarlo en aplicaciones e integraciones reales y deja claro que los módulos de exportadores y `logtest` siguen siendo experimentales.

El alcance concreto del RC incluye `go.opentelemetry.io/otel/log` y `go.opentelemetry.io/otel/sdk/log`. Ambos pasan desde la versión beta `v0.22.0` a `v1.47.0-rc.1`, alineándose con el esquema de versiones coordinadas del resto de módulos Go estables. También se incorporan `Logger`, `GetLoggerProvider` y `SetLoggerProvider` al paquete raíz `go.opentelemetry.io/otel`; las APIs equivalentes de `go.opentelemetry.io/otel/log/global` quedan obsoletas. El cambio acerca el acceso global a logs a los patrones que ya usan trazas y métricas.

La noticia importa para la arquitectura de observabilidad porque reduce la distancia entre las tres señales principales. Una aplicación puede conservar proveedores, ámbitos de instrumentación, procesadores, exportadores y opciones con conceptos parecidos para trazas, métricas y logs. Eso no elimina las decisiones de diseño, pero facilita construir una canalización común y conectar registros con contexto de ejecución sin introducir un marco de logging completamente separado.

El proyecto ha mantenido la API en beta durante un periodo largo precisamente porque el logging suele ejecutarse en rutas calientes. Entre los cambios recientes están el uso compartido de `attribute.Value` y `attribute.KeyValue`, además de un rediseño del `BatchProcessor` para comportarse con más seguridad cuando el exportador experimenta backpressure. El SDK utiliza una cola acotada y evita que la emisión de logs tenga que esperar a la E/S del exportador. También define de forma explícita el vaciado y el apagado.

El rendimiento se ha considerado desde el diseño: las operaciones habituales buscan reducir asignaciones en el heap y la presión del recolector de basura. La configuración de referencia está optimizada para un exportador OTLP con procesamiento por lotes, pero eso no sustituye las mediciones de cada servicio. Aplicaciones de alto volumen deben observar memoria, pérdida o retraso de registros, límites de atributos y comportamiento durante reinicios.

El equipo mantendrá un periodo de feedback de al menos 14 días antes de estabilizar la API y el SDK. Para probarlos, recomienda actualizar los módulos a `v1.47.0-rc.1` y ejercitar uso directo, bridges de logging, procesadores o exportadores propios, cargas intensivas y el cierre de la aplicación. Es una oportunidad concreta para detectar incompatibilidades antes de que la promesa de compatibilidad v1 haga más costivos los cambios incompatibles.
