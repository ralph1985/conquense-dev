---
translationId: cypress-16-http2-testing-2026
lang: es
slug: cypress-16-acerca-las-pruebas-e2e-a-la-web-real
title: "Cypress 16 acerca las pruebas E2E a las condiciones reales de la web"
description: "Cypress 16 incorpora HTTP/2, mejora las comprobaciones de visibilidad y protege mejor los secretos de prueba. El cambio recuerda que la velocidad y la fidelidad del entorno también"
publishedAt: 2026-09-01
sourceName: "Cypress Blog"
sourceTitle: "Cypress 16: faster tests, starting with HTTP/2 support"
sourceUrl: "https://www.cypress.io/blog/cypress-16-faster-tests-starting-with-http2-support"
author: "Jennifer Shehane"
tags: ["testing", "javascript", "web-performance", "security"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cypress 16 llega con una idea más importante que cualquier ajuste aislado: una suite de pruebas end-to-end no debería medir un entorno artificialmente más lento, menos realista o menos seguro que el que utilizan los usuarios. La versión incorpora HTTP/2 de forma predeterminada en los navegadores basados en Chromium, junto con cambios destinados a reducir la duración y la fragilidad de las ejecuciones largas.

Hasta ahora, el proxy de Cypress trabajaba con HTTP/1.1 aunque muchas aplicaciones de producción ya utilizan HTTP/2. La diferencia no es puramente protocolaria. HTTP/2 multiplexa solicitudes sobre una misma conexión, de modo que una página con muchos recursos pequeños puede evitar colas innecesarias. Cypress comunica una prueba interna con 1.000 imágenes que terminó en 1.362 milisegundos con HTTP/2, frente a 3.896 milisegundos con HTTP/1.1. No es una garantía para cualquier proyecto, pero sí una señal de que el transporte usado durante las pruebas puede distorsionar sus resultados.

El cambio también abre una posibilidad práctica para aplicaciones con actualizaciones en tiempo real. Los eventos enviados por el servidor dejan de estar condicionados por el límite habitual de seis conexiones HTTP/1.1 por dominio cuando se ejecutan sobre HTTP/2. La compatibilidad, sin embargo, no es uniforme: en esta versión la mejora se aplica a Chromium, mientras que Firefox y WebKit siguen usando HTTP/1.1. Esa diferencia debe formar parte de la matriz de navegadores, especialmente si el producto depende de streaming, notificaciones o progreso de cargas.

La herramienta sustituye además su algoritmo anterior de visibilidad por otro que consulta primero las capacidades del navegador y utiliza muestreo adaptativo para comprobar si un elemento está cubierto. El objetivo es reducir recalculados de layout en árboles de componentes grandes. Es una lección útil para cualquier sistema de pruebas: una aserción aparentemente barata puede acumular coste cuando se repite miles de veces sobre interfaces complejas.

Cypress 16 elimina también el retraso predeterminado de 10 milisegundos entre pulsaciones de cy.type, activa la gestión de memoria del navegador para evitar que las ejecuciones largas terminen colapsando y actualiza su base a Node.js 24, Electron 41, Chromium 146 y Vite 8. Son cambios de infraestructura, pero afectan directamente al tiempo de feedback del equipo.

La decisión con más impacto de seguridad es la retirada de Cypress.env. La API podía hacer visibles en el navegador variables que debían permanecer en el proceso de Node.js, exponiéndolas al código de la aplicación, a scripts de terceros o a contextos de otro origen visitados durante la prueba. Las nuevas APIs separan los valores destinados al navegador de los secretos que solo debe leer el proceso de automatización. La migración exige revisar configuraciones, pero también corrige una frontera de confianza que las suites E2E no deberían difuminar.
