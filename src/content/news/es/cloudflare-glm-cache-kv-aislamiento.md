---
translationId: cloudflare-glm-kv-cache-isolation-20261026
lang: es
slug: cloudflare-glm-cache-kv-aislamiento
title: "Una fuga en la caché de inferencia recuerda que los errores también deben aislarse"
description: "El incidente de GLM-5.3 en Workers AI ofrece lecciones sobre memoria compartida, rechazo de solicitudes y pruebas de aislamiento."
publishedAt: 2026-10-26
sourceName: "Cloudflare Blog"
sourceTitle: "Cross-request KV cache exposure in the GLM-5.3 Workers AI model, and our remediation with SGLang"
sourceUrl: "https://blog.cloudflare.com/kv-cache-exposure-remediation/"
author: "Redacción Conquense Dev"
tags: ["seguridad", "ia", "sistemas", "testing"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare publicó el 26 de octubre un incidente de aislamiento en GLM-5.3: 155 respuestas incorporaron datos de solicitudes ajenas. Un desajuste de capacidad y un fallo de SGLang permitieron reutilizar estado residual tras rechazar internamente solicitudes demasiado largas. La empresa corrigió la configuración y el motor; afirma que ningún otro modelo resultó afectado. El incidente ocurrió entre agosto y septiembre, aunque su explicación técnica se ha publicado ahora. [Informe de Cloudflare](https://blog.cloudflare.com/kv-cache-exposure-remediation/).

La lectura de ingeniería es que rechazar una operación debe impedir todos sus efectos posteriores. En una arquitectura distribuida, eso exige algo más que producir un código de error: cada componente necesita conocer si la operación sigue siendo válida y qué recursos puede utilizar. Un mensaje de transferencia completada no debería interpretarse automáticamente como prueba de que los datos están completos y pertenecen a la solicitud correcta.

La propuesta de corrección publicada en el repositorio de SGLang aborda el rechazo antes de transferir la caché y comprueba la correspondencia entre los tokens reservados y transferidos. Son controles sobre el protocolo interno, además de sobre la capacidad disponible. [Propuesta técnica](https://github.com/sgl-project/sglang/pull/38704).

Como recomendación general, las pruebas de aislamiento pueden utilizar marcadores sintéticos distintos para cada cliente. Después se alternan solicitudes normales con otras que superan límites, se cancelan o fallan durante una transferencia. La condición de éxito debería incluir tanto la respuesta esperada como la ausencia de cualquier marcador ajeno. Conviene repetir la secuencia bajo concurrencia y después de reutilizar recursos, porque ejecutar cada caso en un proceso nuevo elimina precisamente el estado que interesa examinar.

También resulta útil separar tres propiedades en el diseño: autorización para acceder a un recurso, propiedad de su contenido y validez de ese contenido para una operación concreta. Comprobar solamente la primera deja preguntas abiertas. Una página de memoria asignada legalmente puede conservar información anterior; una transferencia terminada puede contener menos datos de los previstos. Expresar estas propiedades como invariantes facilita revisar las transiciones y construir pruebas que fallen cuando se incumplen.

Para los equipos que integran modelos mediante una API, la consecuencia práctica es incorporar el aislamiento a la evaluación del proveedor y a las pruebas de regresión. Revisar únicamente la calidad de las respuestas o la resistencia a instrucciones maliciosas deja fuera otra categoría de fallos: los del servicio que ejecuta el modelo. Una evaluación útil debe preguntar qué ocurre cuando se agotan recursos, se interrumpe una petición o se devuelve un error, y qué evidencia demuestra que esas rutas conservan la separación entre clientes.
