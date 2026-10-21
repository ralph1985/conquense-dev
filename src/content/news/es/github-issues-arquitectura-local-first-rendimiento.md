---
translationId: github-issues-local-first-performance-20261014
lang: es
slug: github-issues-arquitectura-local-first-rendimiento
title: "GitHub convierte la navegación de Issues en un problema de arquitectura local-first"
description: "GitHub explica cómo combinó IndexedDB, precalentamiento, service workers y revalidación en segundo plano para reducir la latencia percibida en Issues."
publishedAt: 2026-10-14
sourceName: "The GitHub Blog"
sourceTitle: "From latency to instant: Modernizing GitHub Issues navigation performance"
sourceUrl: "https://github.blog/engineering/architecture-optimization/from-latency-to-instant-modernizing-github-issues-navigation-performance/"
author: "Alexander Lelidis"
tags: ["frontend", "rendimiento web", "react", "indexeddb", "arquitectura web"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha documentado una mejora de rendimiento en Issues que resulta más interesante por su arquitectura que por una optimización aislada. El equipo no intentó resolver toda la latencia trasladando progresivamente la aplicación de Rails a React. En su lugar, identificó qué rutas podían hacerse rápidas de inmediato y construyó un modelo local-first con caché persistente, precalentamiento, revalidación en segundo plano y service workers.

El punto de partida era incómodo: la mayoría de las navegaciones hacia una incidencia seguían siendo navegaciones completas. En la medición inicial, el 57,6 % eran hard navigations, con carga de HTML, recursos, JavaScript y eventual hidratación. Las navegaciones suaves de React eran más rápidas, pero representaban solo una parte del tráfico. La frontera entre las páginas renderizadas por Rails y las superficies React obligaba con frecuencia a arrancar de cero, por lo que esperar a una migración completa no habría resuelto el problema a corto plazo.

La primera pieza fue una caché persistente en IndexedDB para las respuestas de Issues. En una navegación suave, la aplicación intenta recuperar primero los datos locales y renderizar una interfaz utilizable. Después solicita una versión fresca al servidor y reconcilia el estado si ha cambiado. Este patrón stale-while-revalidate separa dos objetivos que a menudo se mezclan: mostrar algo útil rápidamente y mantener la información correcta. Si la red falla, una copia razonablemente reciente puede seguir sosteniendo la interacción mientras llega la actualización.

El equipo añadió después precalentamiento para aumentar la probabilidad de aciertos de caché y un service worker para acelerar rutas que todavía implicaban una navegación completa. La decisión técnica relevante es que cada capa tiene un papel: IndexedDB aporta persistencia entre sesiones, la memoria evita lecturas repetidas durante la sesión activa y el service worker ayuda en determinados ciclos de navegación. No se trata simplemente de almacenar más datos en el navegador; hay que definir caducidad, invalidación, reconciliación y comportamiento cuando el servidor devuelve una versión distinta.

Los resultados publicados muestran una mejora desigual, pero significativa. En todo el tráfico de Issues, el percentil 10 pasó aproximadamente de 600 a 70 milisegundos; el percentil 25, de 800 a 120; y la mediana, de unos 1.200 a 700. El percentil 90 bajó de 2.400 a 2.100 milisegundos, una reducción más modesta que revela dónde sigue estando el coste: los arranques en frío, la ejecución de JavaScript y las rutas que aún dependen del renderizado completo.

La lección aplicable a otras aplicaciones web es metodológica. Antes de reescribir una interfaz, conviene clasificar las navegaciones, medir qué porcentaje paga cada coste y localizar los caminos repetidos donde una caché puede eliminar trabajo sin ocultar cambios. La consistencia eventual no es gratuita y exige una política explícita, pero puede mejorar la experiencia sin esperar a que una migración arquitectónica termine. GitHub deja además una advertencia útil: cuando el servidor deja de ser el cuello de botella, el arranque del cliente puede convertirse en el siguiente límite.
