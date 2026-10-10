---
translationId: jpeg-xl-chrome-rust-decoder-web-performance-20261006
lang: es
slug: jpeg-xl-chrome-rust-decoder-web-performance-20261006
title: "JPEG XL llega a Chrome con una lección sobre rendimiento y seguridad"
description: "Chrome 155 incorpora decodificación JPEG XL mediante un componente escrito principalmente en Rust. El cambio combina compresión, HDR, SIMD y seguridad de memoria, pero no elimina a"
publishedAt: 2026-10-06
sourceName: "Chrome for Developers"
sourceTitle: "Shipping JPEG XL in Chrome"
sourceUrl: "https://developer.chrome.com/blog/jpeg-xl-in-chrome"
author: "Luca Versari, Moritz Firsching y Philip Jägenstedt"
tags: ["jpeg-xl", "chrome", "rust", "rendimiento-web", "seguridad"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Chrome 155 incorpora soporte de decodificación para JPEG XL, un formato de imagen diseñado para conservar más información visual con menos bytes. El anuncio de Chrome sitúa su ventaja principal en fotografías de alta fidelidad: el formato ofrece, según el equipo, entre un 30 % y un 50 % más de compresión que JPEG, además de compresión sin pérdida, HDR integrado, transcodificación sin pérdida desde JPEG y decodificación progresiva más flexible.

La noticia importa menos por la aparición de otra extensión de imagen que por cómo se ha construido el soporte. Chrome integra `jxl-rs`, una implementación del decodificador escrita en Rust. Los decodificadores procesan datos binarios complejos recibidos desde la red y, por tanto, forman parte de una superficie de ataque especialmente sensible. El sandbox del navegador sigue siendo una barrera importante, pero el equipo plantea la seguridad de memoria como una defensa anterior: reducir en el propio componente los riesgos de lecturas fuera de límites, desbordamientos de memoria y uso después de liberar.

El reto era no pagar esa seguridad con un coste de rendimiento inaceptable. El trabajo utiliza abstracciones SIMD para aprovechar instrucciones específicas del procesador sin extender innecesariamente el código `unsafe`. También intenta reducir copias de datos y mantener un flujo de procesamiento eficiente en los límites entre regiones de la imagen. Es una decisión relevante para cualquier biblioteca que trabaje con formatos multimedia: la comparación útil no es Rust frente a C++, sino seguridad, consumo de CPU, memoria y latencia en el dispositivo real.

Chrome afirma haber sometido la implementación a fuzzing, revisión asistida por IA y pruebas de rendimiento en distintas plataformas. Eso no equivale a demostrar que el decodificador sea invulnerable, pero sí muestra una estrategia razonable: combinar lenguaje con seguridad de memoria, aislamiento, pruebas automáticas y mediciones continuas. Ninguna capa sustituye a las demás.

Para los equipos web, la consecuencia inmediata no es migrar todas las imágenes a `.jxl`. El propio anuncio recomienda probar JPEG XL y AVIF según el caso de uso. La compatibilidad entre navegadores, los costes de decodificación y la necesidad de conservar una alternativa seguirán siendo parte de la decisión. Una implementación prudente puede experimentar con fotografías originales, imágenes HDR o recursos donde la compresión sin pérdida tenga valor, usando negociación y `picture` con formatos alternativos.

La lección más general es que el rendimiento web no termina en el tamaño del archivo. Un formato eficiente necesita un decodificador rápido, seguro y verificable. La llegada de JPEG XL a Chrome convierte esa discusión en una prueba concreta para la cadena completa: generación de activos, selección del formato, entrega, decodificación y observabilidad en dispositivos diversos.
