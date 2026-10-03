---
translationId: alloydb-agentic-database-architecture-20260924
lang: es
slug: alloydb-arquitectura-base-datos-agentes-20260924
title: "AlloyDB replantea la arquitectura de bases de datos para agentes de IA"
description: "Google Cloud propone separar físicamente las cargas de agentes del sistema transaccional, manteniendo datos recientes, baja latencia y escalado elástico."
publishedAt: 2026-09-24
sourceName: "Google Cloud Blog"
sourceTitle: "A new, no-compromises database architecture for the agentic era"
sourceUrl: "https://cloud.google.com/blog/products/databases/alloydbs-agentic-database-architecture"
author: "Amit Ganesh y Sailesh Krishnamurthy"
tags: ["database architecture", "agentic ai", "postgresql"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google Cloud ha descrito una nueva arquitectura de AlloyDB orientada a cargas de agentes que necesitan consultar datos operativos en tiempo casi real sin competir con el sistema transaccional. La propuesta parte de una idea sencilla, pero exigente: compartir los datos necesarios, no los recursos críticos que mantienen funcionando la producción.

El artículo organiza el diseño alrededor de tres propiedades: aislamiento, latencia y escala. El aislamiento exige que los agentes puedan leer el estado reciente de la base de datos mediante un camino que no comparta componentes con el clúster primario. La latencia fija como objetivo un acceso de almacenamiento inferior al milisegundo incluso cuando se produce un fallo de caché. La escala contempla ráfagas impredecibles: nodos de cómputo que aparecen en segundos, crecen hasta miles durante una tarea y desaparecen cuando termina.

Para conseguirlo, los agentes se conectan mediante el Model Context Protocol a un conjunto independiente y efímero de nodos AlloyDB basados en microVM. Esos nodos leen directamente de segmentos de almacenamiento de Colossus separados de los utilizados por producción. El clúster transaccional permanece en infraestructura dedicada y preprovisionada, mientras que la capacidad para agentes puede crecer desde cero y volver a cero. La separación alcanza a cómputo, red y almacenamiento, no solo a las cuotas de CPU de una réplica convencional.

La diferencia es relevante porque los patrones habituales resuelven únicamente una parte del problema. Las réplicas independientes ofrecen aislamiento y latencia predecible, pero tardan demasiado en aprovisionarse para una carga que dura segundos o minutos. Los servidores de almacenamiento compartido permiten añadir cómputo con rapidez, pero introducen competencia directa por el ancho de banda y pueden afectar al primario. El almacenamiento de objetos con una caché intermedia reduce la latencia de los datos calientes, pero deja una cola mucho más lenta en los fallos de caché y no escala el acceso al mismo ritmo que los agentes.

Google afirma haber medido la propuesta con búsquedas de índices sobre un conjunto mayor que la memoria disponible. En su prueba, el rendimiento pasó de 3.900 a 41.000 consultas por segundo al crecer de uno a diez nodos y mantuvo un crecimiento casi lineal hasta 1.000 nodos. La compañía también informa de tres millones de consultas por segundo y más de ocho millones de operaciones de entrada y salida por segundo en esa configuración, sin impacto medible en el clúster primario. Son resultados del propio proveedor, no una garantía general para cualquier base de datos o aplicación.

La lección arquitectónica va más allá de AlloyDB. Dar acceso a datos vivos a un agente no debería significar darle acceso directo al mismo camino de recursos que usa el negocio. Un diseño robusto debe separar el plano de razonamiento del plano transaccional, preservar los índices y capacidades del motor y hacer explícito qué ocurre cuando la carga se dispara. También conviene validar frescura, permisos de solo lectura, costes de los picos y comportamiento ante fallos antes de convertir una arquitectura de referencia en una dependencia de producción.
