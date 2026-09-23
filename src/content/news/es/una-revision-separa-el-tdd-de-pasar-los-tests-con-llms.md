---
translationId: test-driven-llm-software-engineering-survey-20260910
lang: es
slug: una-revision-separa-el-tdd-de-pasar-los-tests-con-llms
title: "Una revisión separa el TDD real de simplemente pasar los tests con LLM"
description: "Un estudio de 87 trabajos propone evaluar qué decisión cambia una prueba y advierte que un resultado verde no demuestra equivalencia de comportamiento ni mantenibilidad."
publishedAt: 2026-09-10
sourceName: "arXiv"
sourceTitle: "Test-Driven Approaches to Software Engineering with Large Language Models: A Survey of Phases, Tasks, and Agent Skills"
sourceUrl: "https://arxiv.org/abs/2609.12012"
author: "Yunhao Liang, Chengguang Gan, Ruixuan Ying, Hanjun Wei, Zhe Cui y Shiwen Ni"
tags: ["testing", "ai", "software-engineering", "maintainability", "tdd"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Una revisión publicada en arXiv analiza 87 trabajos sobre pruebas, modelos de lenguaje y agentes de ingeniería de software. Su aportación principal no es afirmar que el TDD haya sido sustituido por la IA, sino separar prácticas que a menudo aparecen agrupadas bajo la misma etiqueta. Para equipos que evalúan asistentes de programación, esa distinción ayuda a interpretar mejor tanto los resultados de los benchmarks como los de la integración continua.

El estudio diferencia el ciclo Red-Green-Refactor de varias técnicas cercanas. En algunos sistemas, las pruebas condicionan la generación antes de que exista una implementación. En otros, sirven para guiar una reparación después de producirse un fallo, seleccionar entre varias soluciones, localizar un cambio o aportar trazas para una tarea de análisis. Todas esas prácticas usan ejecución o aserciones, pero no exigen el mismo orden, la misma fuente de expectativas ni los mismos permisos para el agente.

La revisión propone observar qué decisión cambia realmente una prueba. Puede definir el comportamiento esperado, modificar una implementación, descartar un candidato, detener una iteración o proporcionar evidencia para comparar programas. El marco también separa cuatro propiedades que suelen confundirse: disponibilidad de las pruebas, validez de las pruebas, uso efectivo del feedback y independencia de la evaluación. Que una suite exista no demuestra que cubra el riesgo importante; que un agente la ejecute no demuestra que haya utilizado su resultado de manera correcta.

La advertencia más útil para la práctica es que pasar los tests no prueba por sí solo la equivalencia de comportamiento. Una prueba generada por el mismo modelo que escribió el código puede compartir sus errores o sus supuestos. Un compilador puede aceptar una implementación que incumple una propiedad funcional. Y un benchmark con tests públicos puede medir la capacidad de ajustar una salida conocida, no la robustez ante casos que el agente nunca ha visto.

Esto no reduce el valor de las pruebas. Lo vuelve más concreto. Un equipo puede empezar por documentar quién propone cada entrada, quién determina la salida esperada y qué valida esa expectativa. Para cambios generados por agentes, resulta razonable combinar tests visibles con casos ocultos o independientes, comprobar regresiones de comportamiento y medir el coste de mantener las pruebas a largo plazo. También conviene evaluar el procedimiento, no solo el resultado: si el agente debía reproducir un fallo antes de corregirlo, hay que registrar si realmente observó ese fallo.

La revisión amplía el mapa hacia traducción, refactorización, reparación, búsqueda de código, localización de errores y validación formal. Su mensaje editorial es sobrio: una prueba es una intervención en una decisión de ingeniería, no un simple contador de cobertura. Adoptar esa perspectiva permite diseñar mejores experimentos, evitar titulares inflados sobre agentes y construir puertas de calidad que aporten evidencia sobre comportamiento, seguridad y mantenibilidad.
