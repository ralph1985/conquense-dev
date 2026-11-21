---
translationId: workers-request-signal-cancellation-20261102
lang: es
slug: workers-request-signal-cancelacion-trabajo
title: "Workers activa Request.signal por defecto: cancelar también forma parte de la arquitectura"
description: "El cambio efectivo desde el 17 de noviembre permite diseñar la cancelación de operaciones cuando el cliente abandona una petición."
publishedAt: 2026-11-02
sourceName: "Cloudflare"
sourceTitle: "Request.signal will be enabled by default in Workers on November 17"
sourceUrl: "https://developers.cloudflare.com/changelog/post/2026-11-02-request-signal-default/"
author: "Conquense Dev"
tags: ["javascript", "web-apis", "performance", "testing"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Desde el 17 de noviembre, los Workers de Cloudflare con fecha de compatibilidad igual o posterior a ese día reciben por defecto las desconexiones del cliente mediante request.signal. Los existentes mantienen su comportamiento hasta modificar su configuración. La señal debe transmitirse explícitamente a las operaciones posteriores: el cambio no activa request_signal_passthrough. [Fuente: Cloudflare](https://developers.cloudflare.com/changelog/post/2026-11-02-request-signal-default/).

La consecuencia arquitectónica merece atención: abandonar una pantalla puede convertirse en una condición que el servidor utiliza para dejar de hacer trabajo innecesario. Pensemos en un buscador que consulta varios servicios mientras el usuario cambia repetidamente los filtros. Como ejemplo de diseño, si una respuesta antigua ya no tiene destinatario, continuar todas sus consultas puede consumir capacidad sin mejorar la experiencia. Conviene identificar qué operaciones siguen teniendo valor después de la desconexión.

La recomendación editorial es clasificar el trabajo por su relación con la petición. Las lecturas destinadas únicamente a construir la respuesta suelen ser buenas candidatas a cancelación. Una operación que registra una acción confirmada necesita otro análisis: perder la conexión no demuestra que deba deshacerse ni que no se haya completado. Esa diferencia evita aplicar la misma política a una búsqueda y a una escritura con efectos persistentes.

En JavaScript, el diseño puede apoyarse en interfaces internas que acepten una señal de cancelación cuando corresponda. El objetivo es hacer explícito quién controla la vida de una operación. Si una función inicia varias tareas, debería quedar claro cómo se propaga la cancelación y qué recursos libera cada una. También conviene comprobar las capacidades de cada biblioteca: aceptar un parámetro en una capa propia no demuestra que la operación subyacente pueda detenerse.

Las pruebas deberían cubrir situaciones que una respuesta exitosa no ejercita. Una propuesta concreta es iniciar una petición lenta, desconectar el cliente y observar si termina el trabajo asociado. Después se puede repetir el escenario cuando una tarea ya ha finalizado, cuando hay varias en paralelo y cuando se produce un error independiente. El resultado esperado debe definirse para cada caso, especialmente si existe una escritura o una tarea que deba continuar por razones de negocio.

La observabilidad también necesita intención. Una cancelación esperada merece distinguirse de un fallo del servicio para que los indicadores no mezclen abandono con indisponibilidad. Como evaluación práctica, se pueden comparar operaciones iniciadas, completadas y canceladas, junto con su duración. El anuncio no aporta una mejora de rendimiento universal: cualquier ahorro dependerá del trabajo realmente interrumpido. La oportunidad técnica está en revisar los límites de cada petición y verificar que el servidor deja de trabajar cuando hacerlo ya no aporta valor.
