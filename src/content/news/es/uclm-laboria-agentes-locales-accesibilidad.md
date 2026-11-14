---
translationId: uclm-laboria-local-accessible-agents-20261108
lang: es
slug: uclm-laboria-agentes-locales-accesibilidad
title: "LaborIA plantea agentes locales para un puesto de trabajo accesible"
description: "El proyecto de la UCLM aborda la interacción por voz y gestos y permite examinar cómo evaluar autonomía, errores y control del usuario."
publishedAt: 2026-11-08
sourceName: "Escuela Superior de Informática · UCLM"
sourceTitle: "El proyecto LaborIA, del grupo AIR, para hacer accesible el trabajo de oficina"
sourceUrl: "https://esi.uclm.es/index.php/2026/11/08/el-proyecto-laboria-del-grupo-air-para-hacer-accesible-el-trabajo-de-oficina/"
author: "Redacción Conquense Dev"
tags: ["castilla-la-mancha", "accessibility", "applied-ai", "software-architecture"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

La UCLM presentó el 8 de noviembre LaborIA, un proyecto del grupo AIR dirigido por Santiago Sánchez Sobrino. Desarrollará asistencia mediante voz, gestos e IA local para personas con discapacidad motora. Su diseño contempla acciones mediante API de accesibilidad, confirmaciones y reversión. Está prevista una evaluación con unas veinte personas y un demostrador en el Hospital Nacional de Parapléjicos de Toledo. Son planes de desarrollo y validación, según la [información de la Escuela](https://esi.uclm.es/index.php/2026/11/08/el-proyecto-laboria-del-grupo-air-para-hacer-accesible-el-trabajo-de-oficina/).

La propuesta ofrece un caso concreto para examinar una cuestión de arquitectura: cómo transformar una intención expresada por una persona en una operación que pueda entender, autorizar y corregir. Para quienes construyen aplicaciones, esta cuestión invita a revisar qué acciones expone el software y cuánto dependen de detalles visuales. Una interfaz puede resultar comprensible a simple vista y, sin embargo, describir de forma insuficiente el propósito de sus controles a otras formas de interacción.

Como criterio de ingeniería, convendría evaluar cada tarea completa en lugar de limitar la medición al reconocimiento de una orden. En un ejemplo hipotético de correo electrónico, entender el destinatario sería solo una parte del trabajo. También habría que comprobar el contenido, revisar los adjuntos y distinguir entre preparar un borrador y enviarlo. Un error en cualquiera de esos pasos cambia el resultado aunque la transcripción inicial sea correcta. Este ejemplo ilustra una posible evaluación; no describe una capacidad ya validada de LaborIA.

La recuperación merece una atención equivalente. Una prueba útil podría introducir una ambigüedad deliberada y observar si la persona consigue aclararla sin abandonar su modo habitual de interacción. También sería pertinente medir cuántas intervenciones necesita para corregir un paso y si comprende el estado final. Esas medidas permitirían separar rapidez, esfuerzo y control, tres dimensiones que una cifra global de tareas completadas puede ocultar.

Otro criterio propuesto es hacer explícito el alcance de cada permiso. Consultar información, modificar un documento y compartirlo deberían poder distinguirse durante la revisión del comportamiento. Para una implementación mantenible, los responsables podrían definir contratos de acciones con entradas, resultados y errores previsibles. Las pruebas tendrían entonces un objeto concreto que inspeccionar, y los cambios en una aplicación podrían evaluarse frente a ese contrato.

La ejecución local tampoco debería convertirse por sí sola en una garantía general. Una revisión técnica tendría que considerar registros, almacenamiento temporal, actualizaciones y acceso al equipo, además del procesamiento. Estos son puntos de evaluación sugeridos, no deficiencias atribuidas al proyecto. El interés de LaborIA para Castilla-La Mancha reside en reunir un problema de accesibilidad concreto y decisiones de software comprobables. La evidencia sobre su eficacia deberá proceder de la validación prevista, manteniendo separados los objetivos anunciados y los resultados que se obtengan.
