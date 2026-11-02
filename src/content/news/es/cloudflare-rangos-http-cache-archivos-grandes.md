---
translationId: cloudflare-origin-range-cache-20261023
lang: es
slug: cloudflare-rangos-http-cache-archivos-grandes
title: "Servir pocos bytes puede mover demasiados: las lecciones de la nueva caché de rangos de Cloudflare"
description: "La entrega parcial de archivos exige medir el trabajo interno, además del tamaño de la respuesta que recibe el navegador."
publishedAt: 2026-10-23
sourceName: "Cloudflare Blog"
sourceTitle: "Origin Range Requests: Serving large files without range-request tuning"
sourceUrl: "https://blog.cloudflare.com/origin-range-requests/"
author: "Redacción Conquense Dev"
tags: ["rendimiento-web", "http", "arquitectura", "frontend"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare explicó el 23 de octubre cómo rediseñó su caché de solicitudes parciales. La nueva implementación utiliza fragmentos de almacenamiento y coordina datos disponibles y transferencias en curso. Según sus mediciones para R2, el tiempo hasta el primer byte en el percentil 99 cayó aproximadamente a la mitad. El resultado pertenece a esa infraestructura y carga de trabajo; no constituye una promesa para cualquier aplicación. [Análisis de Cloudflare](https://blog.cloudflare.com/origin-range-requests/).

La documentación permite activar Origin Range Requests mediante una regla de caché. También advierte de una condición operativa relevante: el origen debe admitir solicitudes de rangos y responder correctamente con contenido parcial. La configuración del intermediario necesita, por tanto, acompañarse de una comprobación del servidor que conserva el archivo. [Configuración oficial](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/).

Para un equipo frontend, la cuestión interesante es cómo investigar una reproducción de vídeo que tarda en reanudarse o una descarga que responde lentamente. El tamaño recibido por el navegador describe solo una parte del recorrido. Como criterio de diagnóstico, conviene correlacionar esa petición con los bytes leídos en el origen, las transferencias intermedias y el tiempo dedicado a esperar trabajo compartido. Una respuesta pequeña puede depender de una operación interna mucho mayor.

Una estrategia de pruebas útil debería combinar accesos secuenciales, saltos a posiciones alejadas y solicitudes simultáneas parcialmente solapadas. También interesa comparar caché fría y caliente. Estos escenarios representan necesidades distintas: avanzar de forma continua, buscar una escena o atender a varios usuarios que consultan fragmentos cercanos. Medirlos por separado evita que un promedio favorable oculte una espera elevada en una interacción concreta.

La corrección merece tanta atención como la velocidad. En una implementación propia, las pruebas deberían comprobar que el cuerpo contiene exactamente los bytes solicitados y que sus cabeceras describen ese mismo intervalo. También conviene verificar qué ocurre cuando cambia el archivo entre peticiones. Estos son criterios generales de validación, no afirmaciones sobre defectos encontrados en el servicio anunciado. Una optimización de caché solo es útil si conserva la identidad y coherencia del recurso.

La lección de arquitectura consiste en evaluar dónde vive cada decisión. Exponer un parámetro de ajuste al cliente puede parecer flexible, pero añade una responsabilidad que ese cliente quizá no tenga información suficiente para resolver. Antes de ofrecer otra opción de configuración, merece la pena comprobar si el sistema puede deducirla de sus propias unidades de almacenamiento y sus operaciones pendientes. Para quienes mantienen aplicaciones web, el siguiente paso razonable es medir un recorrido real de acceso parcial y localizar dónde se amplifica el trabajo.
