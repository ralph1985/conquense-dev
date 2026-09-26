---
translationId: shopify-liquid-streaming-performance-20260922
lang: es
slug: shopify-liquid-streaming-performance-20260922
title: "Shopify adelanta el envío del HTML y reduce un 29% el TTFB de sus tiendas Liquid"
description: "La plataforma empieza a transmitir la cabecera mientras renderiza el resto de la plantilla, permitiendo que el navegador descargue antes estilos, fuentes y scripts críticos"
publishedAt: 2026-09-22
sourceName: "Performance @ Shopify"
sourceTitle: "Liquid storefronts now start loading 29% faster"
sourceUrl: "https://performance.shopify.com/blogs/blog/liquid-storefronts-now-start-loading-29-faster"
author: "Mateusz Krzeszowiak"
tags: ["web-performance", "streaming-html", "ttfb", "frontend-architecture", "shopify"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Shopify ha cambiado el orden temporal de su renderizado Liquid para que el navegador empiece a trabajar antes. En las páginas que cumplen determinados requisitos, la plataforma envía la parte del layout situada hasta `{{ content_for_header }}` en cuanto está lista y continúa transmitiendo el resto del documento después. El HTML final no cambia; cambia el momento en que llegan sus piezas.

La diferencia es importante porque la cabecera suele contener metadatos, enlaces a hojas de estilo, precargas de fuentes y scripts. Antes, el navegador no recibía nada hasta que terminaban tanto la cabecera como las secciones de la plantilla, que concentran la mayor parte del coste de renderizado. Con el envío por fragmentos, puede analizar la cabecera, abrir conexiones y comenzar las descargas mientras Shopify sigue generando el contenido. El servidor y el navegador trabajan en paralelo en lugar de esperar uno al otro.

Durante el despliegue, Shopify midió una reducción aproximada del 29% en el TTFB del percentil 75 para la tienda mediana y del 21% en el percentil 90. FCP y LCP mejoraron entre un 2% y un 6%. Esos números requieren una lectura cuidadosa: el streaming no elimina trabajo del servidor ni garantiza que todo ese adelanto llegue a la primera pintura. La mejora depende de que los recursos críticos estén realmente antes del punto de corte.

Por ahora, la función se aplica sobre todo a páginas generadas desde plantillas JSON. Las plantillas `.liquid` no entran en el caso general porque pueden cambiar el layout durante el renderizado o asignar variables que este necesita leer más tarde. Además, `{{ content_for_header }}` debe aparecer como una salida directa dentro de `<head>`; envolverlo en una condición, una captura o un snippet impide identificar un punto seguro para cortar la respuesta.

La comparación entre temas ilustra el principio. Dawn coloca recursos importantes después de `content_for_header`, mientras que Horizon define casi todo lo necesario antes. Ambos obtienen una mejora parecida de TTFB, pero Horizon convierte mejor ese adelanto en FCP y LCP porque las hojas de estilo y otros recursos bloqueantes ya están llegando mientras se renderiza la plantilla. Para quienes mantienen un tema, la recomendación es revisar el orden de las dependencias críticas, aunque mover una hoja de estilo puede alterar la especificidad y un script que dependa de `Shopify.*` puede fallar si se ejecuta demasiado pronto.

El cambio también revela un límite de observabilidad. TTFB ya no describe limpiamente todo el trabajo de renderizado cuando la primera parte del documento llega antes que el resto. Shopify propone usar el intervalo entre `responseEnd` y `finalResponseHeadersStart` como aproximación y complementar los datos con Theme Inspector. La lección es útil fuera de Shopify: optimizar la entrega inicial exige medir lo que percibe el usuario, pero también conservar una métrica separada para el trabajo que queda pendiente en el servidor.
