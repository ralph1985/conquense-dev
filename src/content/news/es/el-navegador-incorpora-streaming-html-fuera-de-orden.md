---
translationId: native-out-of-order-html-streaming-20260921
lang: es
slug: el-navegador-incorpora-streaming-html-fuera-de-orden
title: "El navegador empieza a incorporar el streaming HTML fuera de orden"
description: "Nuevas primitivas declarativas y APIs de streaming trasladan al navegador una técnica que hasta ahora dependía de frameworks JavaScript para rellenar la página por partes."
publishedAt: 2026-09-21
sourceName: "InfoQ"
sourceTitle: "Out-of-Order HTML Streaming Moves from JS Frameworks into the Browser"
sourceUrl: "https://www.infoq.com/news/2026/09/native-deferred-html-streaming/"
author: "Bruno Couriol"
tags: ["frontend", "browser-apis", "web-performance", "html"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Una página no tiene por qué esperar a que estén listos todos sus datos para empezar a ser útil. Durante años, frameworks como React y Next.js han implementado streaming del renderizado en servidor: envían primero la estructura principal y rellenan después las zonas lentas, como recomendaciones, perfiles o resultados personalizados. La técnica mejora la percepción de velocidad, pero cada framework ha tenido que resolver por su cuenta los marcadores, la hidratación y la reconciliación con el DOM.

La propuesta que describe InfoQ intenta llevar parte de esa capacidad al propio navegador. El modelo declarativo amplía el uso de `<template>` con un atributo `for` y utiliza instrucciones de procesamiento como marcadores de inserción. El documento puede enviar un marcador con contenido provisional y transmitir más tarde una plantilla asociada; el parser encuentra la relación y actualiza la zona correspondiente sin que una biblioteca tenga que coordinar manualmente cada fragmento.

La semántica de alcance es importante. Una plantilla diferida opera normalmente sobre los marcadores de su contenedor inmediato, lo que limita que un fragmento pueda modificar regiones arbitrarias del documento. La especificación contempla una excepción para plantillas colocadas directamente bajo `body`, con alcance global. Esa regla no resuelve todos los riesgos de contenido dinámico, pero introduce una frontera estructural que las implementaciones pueden validar de manera uniforme.

La parte programática completa el modelo. La propuesta incluye métodos de inserción como `setHTML`, `replaceWithHTML` y `appendHTML`, junto a variantes de streaming capaces de consumir un `ReadableStream`. También aparece `response.textStream()`, pensado para conectar una respuesta de Fetch con un parser de fragmentos. En combinación con métodos marcados como inseguros, el ejemplo exige decisiones explícitas sobre scripts y sanitización; una API que inserta HTML progresivamente no debería convertirse en una vía para saltarse Trusted Types o las políticas de contenido.

Según la cobertura publicada, las primitivas declarativas ya se han incorporado al estándar HTML vivo y cuentan con soporte inicial en Chrome y Edge 150, mientras que `textStream()` llega en una versión posterior. Los métodos DOM de streaming siguen una vía de estandarización separada. WebKit ha expresado una posición positiva y Mozilla una disposición receptiva, pero eso no equivale todavía a una disponibilidad interoperable. Los equipos tendrán que comprobar Baseline, ofrecer una ruta alternativa y medir el comportamiento real antes de depender de estas APIs.

La importancia no está en reemplazar mañana a los frameworks. Está en cambiar el lugar donde vive una parte de la complejidad. Si el navegador puede recibir HTML fuera de orden y rellenar huecos con semántica compartida, los frameworks pueden concentrarse más en datos, composición y navegación, mientras el cliente necesita menos JavaScript para coordinar actualizaciones. Para el rendimiento, el beneficio potencial es doble: contenido útil antes y menos trabajo de hidratación. La condición es la habitual en la plataforma web: estándares maduros, límites de seguridad claros y pruebas en varios motores, no solo una demo rápida en un navegador.
