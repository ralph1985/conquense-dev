---
translationId: chrome-152-rendimiento-y-conexiones
lang: es
slug: chrome-152-rendimiento-y-conexiones
title: "Chrome 152 incorpora señales de rendimiento y control de conexiones"
description: "La nueva versión de Chrome añade una API para adaptar experiencias al rendimiento de CPU y un mecanismo experimental para limitar destinos de red."
publishedAt: 2026-08-25
sourceName: "Chrome for Developers"
sourceTitle: "New in Chrome 152"
sourceUrl: "https://developer.chrome.com/blog/new-in-chrome-152"
author: "Rachel Andrew"
tags: ["web performance", "security", "browsers"]
readingTime: 3
aiDisclosure: "Texto generado con IA y revisado antes de su publicación."
---

Chrome 152 llega al canal estable con dos novedades que merecen atención desde la ingeniería web: la CPU Performance API y Connection Allowlists. No son cambios de diseño ni simples comodidades del navegador; abren opciones concretas para tomar decisiones de ejecución y para reducir la superficie de salida de una aplicación.

La CPU Performance API permite que una aplicación conozca una clasificación del rendimiento de CPU del dispositivo. El uso razonable no es convertir esa señal en un requisito de acceso, sino ajustar trabajo opcional: una simulación visual, la complejidad de una animación, el tamaño de un lote de procesamiento local o la frecuencia de una tarea costosa. Una experiencia debe seguir siendo funcional en cualquier nivel; la señal puede servir para evitar que mejoras no esenciales degraden la interacción en equipos menos capaces.

Esto obliga a diseñar con degradación progresiva. Antes de condicionar una ruta de código, conviene separar qué parte es imprescindible y cuál puede simplificarse. También hay que medir el resultado con usuarios y dispositivos reales: una etiqueta de rendimiento no sustituye a métricas como INP, LCP, consumo de batería o tasa de errores. Chrome indica además que las personas usuarias pueden anular el nivel reportado en ajustes y que las organizaciones pueden gestionarlo mediante política. Por tanto, no debe tratarse como una prueba fiable de hardware ni como un mecanismo de control de acceso.

La segunda novedad, Connection Allowlists, se presenta como un mecanismo de seguridad basado en una cabecera HTTP. Mediante `Connection-Allowlist`, un sitio puede declarar patrones de URL permitidos para las comunicaciones de red iniciadas por un documento o un web worker. La idea es que el navegador aplique ese límite, no solo el código de la aplicación. Si un script comprometido intenta contactar con un destino no autorizado, una política bien definida puede impedir esa conexión.

El valor técnico está en convertir inventario en restricción ejecutable. Muchos frontends cargan analítica, pagos, mapas, fuentes, APIs propias y recursos de terceros; conocer esos destinos ya es difícil. Una lista permitida fuerza a documentarlos, descubrir dependencias implícitas y revisar cambios de proveedores. También puede complementar CSP, reglas de salida de infraestructura y controles del backend, pero no los reemplaza.

La adopción exige prudencia. Las aplicaciones con endpoints dinámicos, pruebas A/B o integraciones de terceros pueden romperse si la lista es demasiado estrecha. Lo sensato es empezar por observación y entornos de prueba, mantener el inventario junto a la configuración de despliegue y definir quién revisa cada nuevo origen. Chrome 152 no elimina la necesidad de validar entradas ni de proteger secretos; ofrece otra capa para que un error en el cliente tenga menos caminos disponibles hacia el exterior.
