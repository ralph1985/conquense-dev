---
translationId: github-git-infrastructure-agent-scale-20261006
lang: es
slug: github-reconstruye-infraestructura-git-escala-agentes
title: "GitHub rediseña su infraestructura de Git para la escala de los agentes"
description: "GitHub explica cómo está separando almacenamiento, capacidad de lectura y coordinación de escrituras para soportar repositorios con actividad de agentes y CI mucho más concurrente."
publishedAt: 2026-10-06
sourceName: "GitHub Engineering"
sourceTitle: "Building Git infrastructure for agent-scale development"
sourceUrl: "https://github.blog/engineering/architecture-optimization/building-git-infrastructure-for-agent-scale-development/"
author: "Brian Celenza"
tags: ["git", "infraestructura", "sistemas-distribuidos", "agentes-ai"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub está reconstruyendo la infraestructura que sostiene sus repositorios para responder a un cambio de escala: los agentes de programación generan más ramas, commits, pushes y ejecuciones de CI, y lo hacen de forma concurrente. En su análisis técnico, Brian Celenza describe una arquitectura que debe seguir funcionando mientras se reemplaza la anterior, sin exigir cambios en los flujos conocidos de ramas, revisiones y fusiones.

Los datos publicados ayudan a entender el problema. Entre septiembre de 2025 y agosto de 2026, la actividad total de Git en GitHub pasó de 218.200 millones a 473.300 millones de eventos mensuales. Solo en septiembre se registraron 7.380 millones de commits y 3.260 millones de ejecuciones de GitHub Actions. En este entorno, una operación que para una persona resulta casi instantánea puede convertirse en el cuello de botella de un agente que confirma o publica cambios después de casi cada acción.

La arquitectura actual replica repositorios completos en discos locales de varios servidores. Es una solución eficaz para lecturas de baja latencia y redundancia, pero introduce una relación incómoda: añadir réplicas para absorber más lecturas también añade participantes al camino de cada escritura. Un push debe hacer visibles sus datos de forma duradera y consistente, por lo que su latencia queda condicionada por la réplica más lenta. Además, la compactación y la recolección de objetos compiten por recursos con las operaciones interactivas.

La propuesta de GitHub aplica tres principios. El primero es minimizar la coordinación: la actualización de una referencia es la parte que realmente necesita acuerdo; almacenar objetos, comprobar su conectividad y ejecutar análisis como el escaneo de secretos puede avanzar en paralelo. El segundo es sacar el mantenimiento del camino de servicio, utilizando trabajadores independientes para compactación y recolección. El tercero es desacoplar almacenamiento y cómputo.

En el diseño nuevo, Azure Blob Storage conserva la copia autoritativa y duradera del repositorio, mientras trabajadores ligeros atienden lecturas y mantienen cachés. Así, una oleada de clones, compilaciones o agentes no obliga a crear otra réplica durable completa. También cambia la recuperación ante fallos: perder un trabajador de cómputo se parece más a perder una caché que a reconstruir un repositorio entero.

El artículo afirma que las pruebas internas han alcanzado hasta 35 veces más rendimiento de escritura, mientras la capacidad de lectura puede crecer de manera independiente. La lección técnica no es que todos los equipos deban copiar esta arquitectura, sino que la concurrencia extrema obliga a identificar qué estado necesita coordinación y qué trabajo puede hacerse después. Para plataformas de desarrollo, esa separación puede ser más determinante que optimizar únicamente la velocidad de los clones.
