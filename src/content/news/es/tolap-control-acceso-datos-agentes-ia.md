---
translationId: tolap-object-level-access-control-20260922
lang: es
slug: tolap-control-acceso-datos-agentes-ia
title: "TOLAP lleva el control de acceso al punto donde los agentes consultan los datos"
description: "AWS publica TOLAP, una especificación y conjunto de SDK de código abierto para aplicar permisos a filas, columnas, campos y resultados antes de que los datos entren en el contexto的"
publishedAt: 2026-09-22
sourceName: "AWS Open Source Blog"
sourceTitle: "Introducing TOLAP: object-level access control for AI agent tools"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-tolap-object-level-access-control-for-ai-agent-tools/"
author: "Phillip Spies"
tags: ["ia aplicada", "seguridad", "agentes", "typescript", "control de acceso"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

La autorización de un agente de IA no termina cuando el usuario puede invocar una herramienta. El problema más delicado aparece después: qué filas, columnas o documentos puede devolver esa herramienta en una llamada concreta. AWS ha publicado TOLAP (Tool-Object Level Access Protocol), una especificación de código abierto que sitúa ese control en el límite entre la herramienta y la fuente de datos.

La propuesta parte de una distinción importante. El control basado en roles suele responder si una identidad puede acceder a un recurso, pero no describe con suficiente precisión qué campos puede ver. Los permisos basados en atributos funcionan bien cuando todas las solicitudes pasan por un motor centralizado; sin embargo, un agente puede construir una consulta a través de una herramienta que mantiene una conexión directa con una base de datos. Las políticas de seguridad de salida tampoco resuelven el problema: cuando se intenta ocultar un dato en la respuesta, ese dato ya pudo haber entrado en el contexto del modelo y estar disponible para razonamiento, resumen o extracción mediante prompt injection.

TOLAP propone aplicar la política antes de que la información cruce esa frontera. Su modelo puede restringir columnas, filtrar filas, limitar resultados, ocultar campos, transformar valores o limitar endpoints y prefijos de almacenamiento. La política efectiva se resuelve para un usuario, organización y fuente concretos; después se firma para impedir modificaciones y se aplica en cada llamada. Cuando coinciden varias políticas, gana la combinación más restrictiva: los conjuntos permitidos se intersectan, las denegaciones se acumulan y los límites numéricos se reducen.

El lanzamiento incluye un esquema versionado, SDK para .NET, Python y TypeScript, un servidor de políticas, una consola de autoría y catorce integraciones con herramientas y marcos de agentes. El comportamiento común se comprueba mediante fixtures compartidos, una decisión relevante para evitar que tres implementaciones interpreten de forma distinta una regla de seguridad. Los paquetes principales no añaden dependencias externas, lo que facilita incorporarlos a funciones, workers perimetrales o plugins.

La arquitectura también introduce contextos firmados con caducidad, validación de propósito y cadenas de delegación. La parte determinista debe comprobar primero la fuente, la acción y el alcance; un juez basado en un modelo de lenguaje queda como capa opcional y no sustituye a esas reglas. TOLAP reconoce además sus límites: solo protege las rutas en las que se instala el wrapper, y los contextos firmados siguen siendo reutilizables hasta su expiración si no se activa una defensa contra replay.

La lección técnica es aplicable más allá de AWS. En sistemas con agentes, la seguridad de los datos debe imponerse antes del contexto y en el mismo camino que los entrega. Las instrucciones del prompt y el filtrado posterior pueden complementar el diseño, pero no deberían ser la frontera principal de autorización.
