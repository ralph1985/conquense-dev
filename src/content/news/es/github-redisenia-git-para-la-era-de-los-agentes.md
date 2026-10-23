---
translationId: github-git-infrastructure-agent-scale-20261021
lang: es
slug: github-redisenia-git-para-la-era-de-los-agentes
title: "GitHub rediseña Git para la era de los agentes: menos coordinación, más concurrencia"
description: "GitHub está separando durabilidad, cómputo y escalado de lecturas para que repositorios sometidos a trabajo concurrente puedan crecer sin convertir cada escritura en una cola."
publishedAt: 2026-10-21
sourceName: "GitHub Engineering"
sourceTitle: "The bridge to agent-scale Git infrastructure"
sourceUrl: "https://github.blog/engineering/architecture-optimization/the-bridge-to-agent-scale-git-infrastructure/"
author: "Eleanor White y Victoria Dye"
tags: ["git", "sistemas distribuidos", "infraestructura", "agentes de IA"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha explicado cómo está trasladando la última fracción de sus repositorios a una arquitectura capaz de soportar tráfico generado simultáneamente por desarrolladores, CI y agentes de software. El problema no es solamente almacenar más objetos Git: es evitar que cada escritura tenga que esperar a todas las demás mientras aumenta la latencia entre centros de datos.

La solución descrita aplica una regla conocida en sistemas distribuidos: coordinar únicamente aquello que necesita orden global. En la arquitectura actual, el quórum de escritura opera a escala de repositorio. Aunque el quórum solo necesita una mayoría para confirmar una operación, el sistema espera a que respondan todas las réplicas saludables, hasta alcanzar un tiempo de espera. Además, cada actualización mantiene un bloqueo del repositorio durante el proceso. Cuando una réplica está a unos 1.600 kilómetros y cada ida y vuelta añade aproximadamente 25 milisegundos, ese diseño convierte la réplica más lenta en el límite de todas las escrituras.

GitHub está reduciendo el ámbito de serialización desde el repositorio completo a cada referencia. Una rama, una etiqueta o una referencia concreta debe conservar consistencia monotónica: después de aceptar un valor, ningún cliente debería observar uno anterior. Pero dos ramas distintas normalmente no dependen entre sí. Permitir que sus actualizaciones avancen en paralelo elimina una cola artificial. En pruebas internas con tráfico realista, las escrituras sobre referencias diferentes alcanzaron entre tres y cuatro veces más rendimiento con menor latencia.

El segundo paso consiste en separar almacenamiento y cómputo. Los objetos duraderos se escriben en Azure Blob Storage mediante una réplica virtual que participa en el quórum, pero no sirve lecturas. Después, réplicas de lectura efímeras pueden calentarse desde el almacenamiento de objetos y atender picos de demanda sin convertirse en copias duraderas adicionales. Así, la capacidad de lectura puede crecer para absorber clones, CI o consultas automatizadas sin aumentar proporcionalmente el coste de cada push.

La lección es aplicable mucho más allá de GitHub. Cuando el sistema mezcla durabilidad, caché, compaction y servicio de lecturas en los mismos nodos, una pérdida de capacidad afecta a varias propiedades a la vez. Separar responsabilidades permite recuperar un nodo de cómputo como si fuera una pérdida de caché, escalar lecturas según la demanda y reservar la coordinación para los metadatos que realmente necesitan orden. No elimina los problemas de consenso, reparación o garbage collection, pero los coloca en fronteras más manejables.

Para equipos que diseñan plataformas internas, el artículo ofrece un criterio útil: medir qué datos necesitan consistencia conjunta y cuáles solo comparten un contenedor histórico. En un entorno con agentes, cada commit frecuente y cada ejecución de CI amplifican los costes de una coordinación demasiado amplia. La arquitectura que funciona para un equipo humano pequeño puede necesitar otra granularidad cuando el trabajo concurrente deja de ser excepcional.
