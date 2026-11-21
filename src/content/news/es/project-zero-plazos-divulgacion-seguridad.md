---
translationId: project-zero-fixed-disclosure-deadlines-20261113
lang: es
slug: project-zero-plazos-divulgacion-seguridad
title: "Project Zero acorta sus plazos: el parche debe llegar hasta el usuario"
description: "La nueva política de divulgación de Project Zero obliga a revisar cómo se reciben, corrigen y distribuyen los fallos de seguridad."
publishedAt: 2026-11-13
sourceName: "Google Project Zero"
sourceTitle: "Policy and Disclosure: 2026 Edition"
sourceUrl: "https://projectzero.google/2026/11/disclosure-policy.html"
author: "Conquense Dev"
tags: ["security", "maintainability", "software-engineering"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google Project Zero ha anunciado una transición hacia plazos fijos de divulgación de vulnerabilidades: 90 días desde el aviso al proveedor, 60 desde el 2 de febrero de 2027 y 30 desde el 3 de enero de 2028. La publicación de los detalles dejará de depender de que exista una corrección. El equipo vincula el cambio a la aceleración del descubrimiento y la explotación mediante IA. [Fuente: Project Zero](https://projectzero.google/2026/11/disclosure-policy.html).

La interpretación práctica para los equipos de ingeniería es que conviene tratar la respuesta a vulnerabilidades como un proceso operativo medible. Un informe recibido necesita un responsable, una reproducción verificable y una evaluación de exposición. Si esas tareas empiezan cuando alguien encuentra tiempo entre entregas, parte del margen disponible desaparece antes de analizar el código. Un canal de entrada atendido y un procedimiento breve pueden ser más útiles que un documento extenso sin propietario.

También conviene distinguir tres resultados: identificar la causa, producir una corrección y comprobar que la versión protegida está realmente en uso. Son hitos diferentes. En una aplicación web, actualizar una dependencia en el repositorio no demuestra que todos los despliegues la incorporen. En una biblioteca, publicar un paquete tampoco garantiza que los consumidores hayan actualizado sus aplicaciones. Esta distinción permite localizar dónde se atasca la respuesta y qué equipo puede desbloquearla.

Una propuesta de trabajo consiste en acompañar cada corrección con una prueba de regresión que falle ante el comportamiento vulnerable. Después deberían revisarse las rutas relacionadas y los supuestos que hicieron posible el fallo. Por ejemplo, si el problema nace de una comprobación de autorización ausente, cambiar una sola llamada puede dejar operaciones equivalentes expuestas. La profundidad de esa revisión debe responder al impacto y al alcance del defecto, sin convertir cada incidente en una reescritura general.

Para reducir el tiempo hasta producción, merece la pena preparar antes un recorrido de actualización urgente: validaciones automatizadas, despliegue gradual, observación de errores y reversión disponible. Estas son recomendaciones editoriales, no requisitos adicionales anunciados por Google. Su utilidad reside en evitar que la urgencia obligue a improvisar cómo se entrega el arreglo o cómo se detecta una regresión.

El calendario de divulgación tampoco debería sustituir la priorización por riesgo. Un equipo necesita valorar qué funciones están expuestas, qué permisos requiere un ataque y qué usuarios podrían verse afectados. La fecha pública aporta una restricción temporal; no resuelve esas preguntas. Para responsables técnicos, la acción concreta es ensayar el recorrido completo con un fallo ficticio y medir sus esperas. Ese ejercicio puede revelar problemas de coordinación y distribución que una simple medición del tiempo de programación deja fuera.
