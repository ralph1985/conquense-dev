---
translationId: github-css-modules-performance-20260925
lang: es
slug: github-mejora-rendimiento-css-modules-css-in-js
title: "GitHub mejora el rendimiento de su web enviando más CSS y ejecutando menos JavaScript"
description: "La migración de GitHub desde CSS-in-JS hacia CSS Modules redujo trabajo en el cliente y el servidor, y muestra cómo trasladar costes de ejecución al proceso de compilación sin arru"
publishedAt: 2026-09-25
sourceName: "The GitHub Blog"
sourceTitle: "Improving site performance by shipping more CSS"
sourceUrl: "https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/"
author: "Josh Black and Marie Lucca"
tags: ["frontend", "css", "rendimiento-web", "arquitectura"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha completado la migración de github.com desde CSS-in-JS hacia CSS Modules, una decisión que parece contraria a una intuición habitual: enviar más CSS puede mejorar el rendimiento si evita ejecutar trabajo de estilos en cada página y en cada componente.

El problema apareció cuando el número de componentes de Primer, el sistema de diseño de GitHub, empezó a crecer. Con la solución anterior, los estilos se inicializaban en el cliente y se recopilaban durante el renderizado del servidor. A medida que aumentaban los componentes, también crecían el tiempo de carga inicial, el coste de renderizado en servidor y el trabajo necesario para actualizar estilos dinámicos. La propiedad `sx`, basada en objetos JavaScript, ofrecía buena integración con TypeScript y los tokens de diseño, pero exigía más trabajo durante la ejecución.

CSS Modules cambió el reparto de responsabilidades. Los estilos viven junto al código del componente, pero se procesan como CSS y generan nombres de clase locales por defecto. El navegador recibe hojas de estilo junto con el HTML y no necesita que un runtime de CSS-in-JS construya reglas durante la ejecución. La encapsulación se conserva en buena medida, mientras desaparece parte del coste de JavaScript y de la recopilación de estilos.

La parte más interesante fue el método de migración. GitHub no sustituyó todos los componentes en un único despliegue. Para cada pieza añadió una implementación con CSS Modules, la protegió con una feature flag y utilizó pruebas de regresión visual para comprobar que las capturas seguían siendo equivalentes. El cambio se desplegó primero al equipo, después al personal de GitHub y finalmente al resto de usuarios. Esa secuencia permitió medir mejoras y localizar errores antes de ampliar el alcance.

En diciembre de 2024, Primer había migrado sus componentes y registraba un 55 % menos de tiempo de renderizado en servidor y un 25 % menos de tiempo de inicialización de componentes. Después llegó el trabajo más costoso: retirar miles de usos de `sx` y las capas de compatibilidad que permitían mantener el código antiguo funcionando. Ocho ingenieros migraron 6.419 propiedades en seis meses, con mejoras de renderizado en servidor de entre el 1 % y el 22 % según la página. Más adelante, otros equipos redujeron el inventario restante de 895 usos a cero en tres semanas.

GitHub afirma que toda la web funciona con CSS Modules desde junio de 2026. El resultado no es solo una sustitución de biblioteca. Es una reconfiguración del límite entre compilación y ejecución, apoyada por migración incremental, pruebas visuales, banderas de funcionalidad y observación en producción. La lección para otros equipos frontend es concreta: cuando una abstracción de estilo añade coste proporcional al número de componentes, conviene medir si parte de ese trabajo puede resolverse antes de que llegue al navegador.
