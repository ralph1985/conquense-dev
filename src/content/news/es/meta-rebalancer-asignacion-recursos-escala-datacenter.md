---
translationId: meta-rebalancer-resource-assignment-20260921
lang: es
slug: meta-rebalancer-asignacion-recursos-escala-datacenter
title: "Meta abre Rebalancer, un motor para asignar recursos a escala de centro de datos"
description: "Meta publica Rebalancer, una biblioteca que separa el modelado, la resolución y la depuración de problemas de asignación para infraestructuras de gran escala."
publishedAt: 2026-09-21
sourceName: "Engineering at Meta"
sourceTitle: "Open-Sourcing Rebalancer: A Generic, High-Performance Library for Solving Assignment Problems"
sourceUrl: "https://engineering.fb.com/2026/09/21/open-source/rebalancer-generic-high-performance-library-assignment-problems/"
author: "Equipo de Optimización Algorítmica de Meta"
tags: ["systems", "open-source", "optimization", "datacenters", "maintainability"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Meta ha publicado como código abierto Rebalancer, una biblioteca para resolver problemas de asignación que lleva más de nueve años utilizándose en su infraestructura. La herramienta aborda una familia de decisiones muy común en sistemas distribuidos: colocar objetos en contenedores respetando restricciones y optimizando objetivos. Los objetos pueden ser tareas, servidores, fragmentos de datos o flujos de tráfico; los contenedores pueden ser máquinas, servicios o centros de datos.

La idea más interesante no es solo el algoritmo de búsqueda. Rebalancer separa cuatro responsabilidades que suelen acabar mezcladas: describir el problema, representar sus datos, resolverlo y depurar el comportamiento del solver. Esa separación permite que un equipo exprese políticas de infraestructura sin tener que reescribir el motor cada vez que cambia una restricción o aparece una nueva dimensión de recursos.

La especificación utiliza conceptos como objetos, contenedores, dimensiones, particiones, ámbitos y utilización. Sobre ellos construye una API de expresiones que puede combinar sumas, máximos y transformaciones. Después, una capa de especificaciones de más alto nivel convierte esas construcciones en objetivos y restricciones reutilizables. En un ejemplo de colocación de tareas, la CPU y el almacenamiento son dimensiones, los trabajos son particiones y los racks forman ámbitos que permiten expresar reglas de distribución.

La representación intermedia es un grafo dirigido acíclico de expresiones. A partir de ese grafo, Rebalancer puede generar un programa lineal entero mixto para solvers como HiGHS, Gurobi o FICO Xpress, o ejecutar una búsqueda local directamente sobre el modelo. El primer camino ofrece soluciones óptimas para problemas pequeños y medianos, pero el número de variables puede crecer aproximadamente con el producto entre objetos y contenedores. La búsqueda local sacrifica optimalidad formal para explorar movimientos cercanos y manejar problemas mucho mayores.

El motor también incorpora técnicas de agregación de variables, intercambio y ruptura de simetrías para reducir modelos. En la búsqueda local, evalúa movimientos que trasladan objetos entre contenedores, actualiza el grafo de expresiones y aplica la mejor alternativa que mejora el objetivo sin violar restricciones. Meta afirma que la implementación paralelizada puede realizar millones de evaluaciones por segundo.

Las cifras de uso muestran por qué la arquitectura importa: Rebalancer resuelve aproximadamente 40 millones de problemas al día con más de treinta formulaciones distintas. Meta indica un tiempo P99 de doce segundos para un problema con 265.000 objetos y 3.200 contenedores, y un promedio de 171 segundos para problemas con más de un millón de objetos y 5.000 contenedores.

El proyecto incluye Rebalancer Explorer, una interfaz web distribuida como contenedor para investigar restricciones activas, relajaciones y motivos de cada asignación. Esa pieza responde a una lección de mantenibilidad: cuando un sistema de optimización se vuelve reutilizable, la depuración deja de ser un accesorio y pasa a ser parte del producto. Separar el modelo del solver y hacer visibles sus decisiones facilita cambiar de estrategia sin perder comprensión operativa.

Contenido generado automáticamente con IA.
