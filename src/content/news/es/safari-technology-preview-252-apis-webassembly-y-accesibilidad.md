---
translationId: safari-technology-preview-252-web-platform-20260911
lang: es
slug: safari-technology-preview-252-apis-webassembly-y-accesibilidad
title: "Safari Technology Preview 252 pone a prueba nuevas piezas del navegador"
description: "WebKit incorpora avances en CSS, WebAssembly, WebGPU y accesibilidad que obligan a probar capacidades reales, no solo versiones del navegador."
publishedAt: 2026-09-11
sourceName: "WebKit"
sourceTitle: "Release Notes for Safari Technology Preview 252"
sourceUrl: "https://webkit.org/blog/18304/release-notes-for-safari-technology-preview-252/"
author: "Jon Davis"
tags: ["webkit", "safari", "javascript", "css", "webassembly"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

WebKit ha publicado las notas de Safari Technology Preview 252, una versión experimental que reúne cambios pequeños pero relevantes para quienes mantienen aplicaciones web multiplataforma. No es una actualización que pueda resumirse como una única API estrella: su interés está en la combinación de avances de plataforma, correcciones de accesibilidad y ajustes de rendimiento que acabarán influyendo en las pruebas de compatibilidad.

En CSS aparecen varias mejoras orientadas a detectar capacidades y consultar el estado de las reglas desde JavaScript. WebKit añade la función named-feature() en condiciones de @supports, incorpora CSSConditionRule.supports y expone CSSMediaRule.matches. También suma soporte para la propiedad user-select sin prefijo y corrige detalles relacionados con text-decoration-inset. Estas piezas pueden reducir comprobaciones basadas en cadenas de agente de usuario y favorecer una estrategia de mejora progresiva: primero se detecta la capacidad disponible y después se activa la experiencia correspondiente.

La versión también añade soporte para WebAssembly memory64 junto con múltiples memorias. El cambio es especialmente relevante para aplicaciones que manejan grandes volúmenes de datos en el navegador, herramientas de edición, visualización científica o motores que necesitan superar las limitaciones de direccionamiento de WebAssembly tradicional. Todavía no significa que cualquier aplicación deba migrar inmediatamente. La lección práctica es otra: cuando un proyecto depende de WebAssembly, conviene probar compilación, inicialización, intercambio de buffers y gestión de errores en cada motor, porque la compatibilidad efectiva puede llegar por fases.

En el apartado gráfico, WebKit mejora el tratamiento de contenidos WebGL copiados a imágenes y añade el formato snorm10-10-10-2 para GPUVertexFormat en WebGPU. Son cambios de bajo nivel, pero afectan a bibliotecas que encapsulan el acceso a la GPU. Una capa de abstracción mantenible debería comprobar la capacidad del dispositivo, ofrecer una ruta alternativa y no asumir que un formato presente en un navegador está disponible en todos los demás.

Las correcciones de accesibilidad también merecen atención. Safari Technology Preview 252 corrige nombres accesibles incorrectos relacionados con display: contents y con marcadores de listas. Esto recuerda que una modificación aparentemente visual puede alterar el árbol que interpretan los lectores de pantalla. Las pruebas de componentes deberían incluir nombres accesibles, orden de lectura y navegación por teclado, no únicamente capturas visuales.

El valor editorial de esta versión no está en recomendar el canal experimental para producción, sino en usarlo como señal anticipada. Los equipos pueden incorporar Safari Technology Preview a una matriz de pruebas, activar las capacidades mediante detección y observar qué partes de su arquitectura dependen de comportamientos no estandarizados. La compatibilidad web se mantiene con pruebas continuas y degradaciones razonables; las notas de WebKit ofrecen una lista concreta de lugares donde empezar.
