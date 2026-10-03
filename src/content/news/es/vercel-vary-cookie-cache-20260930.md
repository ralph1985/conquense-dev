---
translationId: vercel-vary-cookie-cache-20260930
lang: es
slug: vercel-vary-cookie-cache-20260930
title: "Vercel deja de almacenar en caché respuestas que varían por Cookie"
description: "El cambio de Vercel convierte una decisión aparentemente menor sobre HTTP en una lección práctica sobre cardinalidad, personalización y diagnóstico de CDN."
publishedAt: 2026-09-30
sourceName: "Vercel Changelog"
sourceTitle: "Vercel CDN no longer caches responses with Vary: Cookie"
sourceUrl: "https://vercel.com/changelog/vary-cookie-responses-no-longer-cached"
author: "Shina Patel y Kelly Davis"
tags: ["web performance", "caching", "cdn"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Vercel ha anunciado que su CDN ya no almacenará respuestas del origen cuando la cabecera `Vary` incluya `Cookie`. La respuesta seguirá llegando al usuario, pero no se guardará para futuras peticiones. En la práctica, una ruta que antes podía reutilizar contenido desde el borde pasará a comportarse como una ruta sin almacenamiento compartido, salvo que cambie la configuración de la aplicación.

La decisión tiene una explicación técnica sencilla. `Vary` indica a una caché qué cabeceras de la petición pueden modificar la respuesta. Si una respuesta varía según `Cookie`, el espacio de posibles variantes puede crecer enormemente: cada usuario, sesión, experimento o combinación de preferencias puede producir una clave diferente. El resultado es una caché con pocas reutilizaciones y un coste de almacenamiento y validación poco justificable. En una CDN, el problema no es solo ocupar más espacio; también es que una política aparentemente correcta puede convertir la ruta en una sucesión de fallos de caché.

Vercel identifica este caso mediante la cabecera `x-vercel-cache`, que aparecerá como `MISS`, y mediante el motivo `vary_key_denied:cookie` en los registros de ejecución. Esa información es importante porque permite distinguir entre una aplicación lenta por lógica de servidor y una aplicación que está generando respuestas correctas, pero no reutilizables. El diagnóstico debe comenzar en la respuesta real del origen, no en la intención del equipo que configuró el framework.

La recomendación depende de la semántica del contenido. Si una página es idéntica independientemente de las cookies, la aplicación debería eliminar `Cookie` de `Vary`. No se trata de ocultar una señal para mejorar el porcentaje de aciertos: se trata de declarar correctamente que esa entrada no cambia el resultado. Si, por el contrario, la respuesta contiene información personalizada, mantener la variación es lo correcto y Vercel recomienda acompañarla de `Cache-Control: private`, para evitar que una respuesta individualizada se almacene en una caché compartida.

El caso también recuerda que la personalización no debería propagarse automáticamente a toda una página. Un sitio puede tener una estructura pública perfectamente cacheable y reservar para el cliente o para una petición privada únicamente el pequeño fragmento que depende de la sesión. Separar esas dos capas suele ofrecer mejores resultados que marcar como variable por cookie todo el documento.

La lección general es aplicable aunque no se use Vercel. Las cabeceras de caché forman parte del contrato funcional de una aplicación: afectan a rendimiento, privacidad y consistencia. Conviene revisar qué middleware añade `Vary`, qué cookies son realmente relevantes, si el contenido puede dividirse en una parte pública y otra privada, y qué observan los registros en producción. Un `MISS` aislado no es un incidente; una política que hace imposible reutilizar respuestas que nunca fueron personalizadas sí es deuda técnica medible.
