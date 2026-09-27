---
translationId: nextjs-image-response-satori-rce-20260922
lang: es
slug: nextjs-corrige-rce-en-imageresponse-y-dependencias-satori
title: "Next.js corrige una ejecución remota de código en ImageResponse"
description: "Una actualización fuera de ciclo de Next.js corrige un problema crítico en la implementación Node.js de ImageResponse, relacionado con Satori y dependencias usadas para generar SVG"
publishedAt: 2026-09-22
sourceName: "Next.js"
sourceTitle: "Next.js Security Update for a Critical Upstream Issue"
sourceUrl: "https://nextjs.org/blog/nextjs-security-update-september-22-2026"
author: "Josh Story, Karim Rahal y Sebastian Silbermann"
tags: ["seguridad", "Next.js", "React", "Node.js", "dependencias"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Next.js publicó el 22 de septiembre una actualización de seguridad fuera de ciclo para corregir una vulnerabilidad crítica de ejecución remota de código en una ruta concreta de generación de imágenes. El problema afecta a la implementación Node.js de `ImageResponse`, disponible a través de `next/og`, y no a la variante Edge.

Las versiones afectadas son las de Next.js desde la 16.2.0 hasta cualquier versión anterior a la 16.3.6. El origen técnico está en el procesamiento de SVG generado por Satori, una dependencia utilizada para producir imágenes a partir de componentes o contenido estructurado. Según el aviso, un escape incorrecto del SVG, combinado con vulnerabilidades de otras dependencias ascendentes, podía abrir una vía de ejecución de código en determinadas condiciones.

La corrección principal llega en Next.js 16.3.6, la versión Active LTS recomendada para la rama 16. Para la rama 15, Next.js 15.5.26 incorpora hardening relacionado, aunque esa rama no está afectada por la ejecución remota de código descrita en el aviso. Esta diferencia importa: no todas las versiones citadas requieren la misma respuesta, y actualizar no debe sustituirse por una clasificación genérica basada solo en la rama mayor.

El alcance también depende del runtime. Las aplicaciones que usan la implementación Edge de `ImageResponse` no están afectadas por este problema concreto. En cambio, una aplicación que genere respuestas mediante Node.js debe revisar si utiliza `next/og`, aunque esa ruta no aparezca como una superficie de red tradicional. Los generadores de imágenes, documentos, plantillas o SVG son procesadores de entrada y salida; sus dependencias merecen el mismo tratamiento que un endpoint que analiza datos externos.

El incidente ofrece varias lecciones para equipos frontend. Primero, los avisos de seguridad deben leerse con precisión de versión, runtime y API: “usar Next.js” no es una descripción suficiente del riesgo. Segundo, las dependencias transitivas forman parte de la superficie de ataque aunque no aparezcan en el código de aplicación. Satori y sus dependencias no son un detalle aislado del gestor de paquetes cuando participan en una ruta de producción.

La acción inmediata es comprobar la versión instalada y actualizar con el parche correspondiente, por ejemplo mediante `npm install next@16.3.6` para la rama 16 o `npm install next@15.5.26` para la rama 15. Después conviene revisar los puntos que generan `ImageResponse`, validar el pipeline de despliegue y comprobar que las pruebas cubren las rutas de imágenes generadas. No es necesario convertir el problema en una auditoría completa del framework, pero sí verificar que el runtime real coincide con el supuesto del equipo.

La conclusión práctica es sencilla: las abstracciones de frontend pueden encapsular código de servidor, parsers y dependencias nativas. La seguridad debe seguir esa cadena completa. Un componente visual puede terminar ejecutando un procesador en Node.js; por eso las actualizaciones, los inventarios de dependencias y las pruebas de rutas generativas pertenecen también al mantenimiento cotidiano del frontend.
