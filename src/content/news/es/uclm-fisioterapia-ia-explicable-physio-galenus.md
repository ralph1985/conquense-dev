---
translationId: uclm-physio-galenus-explainable-ai-20261015
lang: es
slug: uclm-fisioterapia-ia-explicable-physio-galenus
title: "La UCLM investiga una IA para fisioterapia que permite revisar sus recomendaciones"
description: "Una tesis de Castilla-La Mancha plantea una separación útil entre medición, reglas de decisión y supervisión profesional."
publishedAt: 2026-10-15
sourceName: "Escuela Superior de Informática de la UCLM"
sourceTitle: "Sergio Martínez Cid defiende su tesis doctoral sobre inteligencia artificial para la fisioterapia neurológica"
sourceUrl: "https://esi.uclm.es/index.php/2026/10/15/sergio-martinez-cid-defiende-su-tesis-doctoral-sobre-inteligencia-artificial-para-la-fisioterapia-neurologica/"
author: "Redacción Conquense Dev"
tags: ["castilla-la-mancha", "ia", "arquitectura", "investigacion"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

La UCLM presentó el 15 de octubre una tesis de Sergio Martínez Cid sobre apoyo mediante IA a la fisioterapia neurológica. Su sistema combina reglas difusas, mediciones mediante una cámara económica y recomendaciones justificadas para el terapeuta. El trabajo incluye Physio Galenus, una plataforma modular de código abierto. La universidad sitúa la validación clínica y la ampliación del prototipo con modelos de lenguaje entre las tareas futuras. [Información de la UCLM](https://esi.uclm.es/index.php/2026/10/15/sergio-martinez-cid-defiende-su-tesis-doctoral-sobre-inteligencia-artificial-para-la-fisioterapia-neurologica/).

Su interés para la ingeniería de software está en la posibilidad de distinguir lo observado, lo inferido y lo recomendado. Como lectura de arquitectura, esa separación permite formular preguntas verificables para cada etapa: qué señal entró, cómo se transformó y qué criterio produjo una sugerencia. La explicación de una decisión puede convertirse así en una parte del contrato del sistema, junto al resultado que presenta la interfaz.

Esta distinción también ayuda a pensar las pruebas. Un equipo que construya una herramienta semejante podría evaluar por separado la captura de datos, el cálculo de indicadores y la lógica de recomendaciones. Después necesitaría comprobar su funcionamiento conjunto. Una medición incorrecta puede alimentar una regla perfectamente implementada y producir una sugerencia inadecuada; por eso, aprobar las pruebas de un módulo no demuestra por sí solo que el recorrido completo funcione correctamente.

Desde la mantenibilidad, sería razonable conservar versiones de los criterios utilizados y de las transformaciones aplicadas a las señales. Es una recomendación general, no una característica adicional atribuida a esta plataforma. Si una actualización modifica el comportamiento, disponer de entradas sintéticas y resultados esperados facilita detectar la diferencia y explicarla. También ayuda a separar un cambio intencionado de una regresión, especialmente cuando participan profesionales con conocimientos distintos a los del equipo de desarrollo.

La supervisión plantea además requisitos de producto. Una interfaz de apoyo debería permitir entender la recomendación, consultar sus datos relevantes y expresar desacuerdo sin perder el contexto. Mostrar una explicación larga no garantiza que resulte útil: conviene evaluar si la persona puede identificar el motivo de una sugerencia y actuar sobre ella. La revisión humana necesita un recorrido concreto dentro del software, con acciones comprensibles y consecuencias visibles.

El valor regional de esta investigación reside en aplicar ingeniería e IA a un problema definido, con una responsabilidad profesional identificable. Su presentación no equivale a demostrar eficacia clínica general ni disponibilidad asistencial. Para lectores técnicos, ofrece un caso con el que revisar sus propios diseños: separar medición y decisión, hacer comprobables las recomendaciones y definir qué sigue requiriendo validación. Son criterios trasladables a otras herramientas de apoyo, siempre ajustando las pruebas y los límites al contexto real de uso.
