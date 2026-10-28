---
translationId: nodejs-rendering-wattpm-booking-20260929
lang: es
slug: booking-nodejs-rendering-wattpm-coste-20260929-es
title: "Booking.com reduce un 38 % el coste de su mayor servicio Node.js sin reescribir la aplicación"
description: "Booking.com documenta cómo una combinación de worker threads, balanceo y ajustes de memoria redujo costes y latencia en sus servicios de renderizado server-side."
publishedAt: 2026-09-29
sourceName: "Booking.com Engineering"
sourceTitle: "Node.js at scale, rebalanced: how we cut cost by 38%"
sourceUrl: "https://medium.com/booking-com-development/node-js-at-scale-rebalanced-how-we-cut-cost-by-38-62ce247a3002"
author: "Ilya Malyavin"
tags: ["nodejs", "javascript", "performance", "server-side-rendering", "kubernetes"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Booking.com ha publicado un caso de optimización especialmente útil porque no parte de una reescritura ni de hardware nuevo. La compañía redujo un 38 % el coste de cómputo de su mayor servicio Node.js, utilizó un 30 % menos de pods, disminuyó un 20 % la memoria de los pods restantes y obtuvo mejoras de hasta el 10 % en latencias p75 y p99. El trabajo se centró en la plataforma de ejecución y en varias decisiones de configuración que habían permanecido sin revisar durante años.

El servicio genera páginas con renderizado server-side de React. Ese trabajo es intensivo en CPU: cada render ocupa un hilo mientras construye la página, de modo que el rendimiento depende tanto del número de núcleos disponibles como del tiempo que cada petición espera detrás de otra. La arquitectura original usaba pm2 y el módulo cluster de Node.js. Cada worker era un proceso independiente, con una copia separada de lo que V8 construía durante el arranque. El diseño funcionaba, pero añadía un salto de coordinación y dejaba margen para mejorar el uso de memoria y la distribución de conexiones.

El cambio principal fue probar wattpm, que utiliza worker threads y permite que el kernel distribuya conexiones mediante SO_REUSEPORT. Las pruebas aisladas mostraron entre un 20 % y un 50 % más de capacidad según la carga, pero la producción introdujo una sorpresa: con carga moderada, la nueva configuración podía rendir peor. Las métricas agregadas de CPU, garbage collection y event loop no explicaban la diferencia. El problema apareció al observar cada worker por separado. La combinación de conexiones reutilizadas por nginx y tcp_tw_reuse concentraba tráfico en algunos workers, mientras otros quedaban infrautilizados.

Booking.com mantuvo nginx, pero lo convirtió en una capa explícita de balanceo. Los workers escuchaban en puertos consecutivos y las peticiones pesadas de renderizado se separaban de las llamadas ligeras de metadatos. La configuración final reservó cuatro workers para páginas y uno para solicitudes auxiliares. Para este servicio, least_conn aportó una mejora adicional de entre el 2 % y el 7 % en algunos percentiles extremos, aunque round robin ya ofrecía buenos resultados.

Con la memoria liberada, el equipo revisó también el tamaño de la semi-heap de V8. El valor heredado de 16 MiB era razonable para fragmentos pequeños, pero insuficiente para páginas completas. Subirlo gradualmente a 32 y después a 64 MiB redujo la frecuencia de las recolecciones y mejoró la latencia sin consumir más memoria total gracias a las optimizaciones anteriores. Además, la rotación progresiva de workers resolvió acumulaciones asociadas a actualizaciones de módulos ES.

La lección no es copiar wattpm sin medir. Es tratar la plataforma como parte del rendimiento, observar colas y percentiles por worker, y validar las hipótesis con tráfico real. Booking.com utilizó instalaciones paralelas, una división controlada del tráfico y despliegues reversibles antes de reducir pods progresivamente. En servicios Node.js con SSR, los valores por defecto pueden ser tan importantes como el código de aplicación.
