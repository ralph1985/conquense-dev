---
translationId: beacon-datos-rendimiento-web-20260928
lang: es
slug: beacon-datos-rendimiento-web-real-usuarios
title: "BEACON convierte el rendimiento web real en un conjunto de datos abierto"
description: "Cloudflare publica BEACON, un conjunto de datos agregado de mediciones de usuarios reales que permite estudiar LCP, transferencia y calidad de red a escala global."
publishedAt: 2026-09-28
sourceName: "Cloudflare Blog"
sourceTitle: "How fast is the web? Explore billions of real-user measurements with BEACON"
sourceUrl: "https://blog.cloudflare.com/how-fast-is-the-web/"
author: "Ryan Townsend y Nic Jansma"
tags: ["rendimiento-web", "rum", "observabilidad", "privacidad"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

La optimización web suele comenzar en un entorno demasiado cómodo: un portátil rápido, una conexión estable y una aplicación que se prueba cerca del equipo que la construyó. Cloudflare intenta ampliar esa perspectiva con BEACON, un conjunto de datos abierto basado en mediciones de usuarios reales. El proyecto reúne miles de millones de observaciones diarias y permite analizar cómo se comportan las páginas según el país, el navegador, el sistema operativo y el protocolo de conexión.

El valor técnico de BEACON no está solo en el volumen. También está en separar dos factores que a menudo se mezclan en los informes de rendimiento: la calidad de la propia web y la calidad de la red que la transporta. Cloudflare planea relacionar sus datos con el Internet Quality Index de Radar para estudiar esa interacción. Una página puede tener un buen Largest Contentful Paint (LCP) en una red rápida y, sin embargo, ofrecer una experiencia deficiente cuando el ancho de banda o la latencia empeoran. Del mismo modo, una red excelente puede ocultar problemas de peso, procesamiento o entrega que aparecerían en conexiones más limitadas.

La primera tabla pública incluye páginas de una muestra de 10.000 sitios, normalizada para evitar que los dominios con más tráfico dominen el resultado. Los registros se agregan por dimensiones como país, sistema operativo, navegador y protocolo. Además, se descartan grupos con menos de cinco observaciones, y Cloudflare elimina identificadores potenciales como el dominio y la ruta de la URL. Esa combinación intenta equilibrar representatividad, utilidad analítica y privacidad.

Los primeros resultados muestran diferencias relevantes entre regiones. Para páginas de aterrizaje, la tabla publicada sitúa la mediana de LCP en 1.370 milisegundos, el percentil 75 en 2.681 y el 95 en 8.940. También aparece una relación esperable entre ancho de banda y LCP, pero una observación más interesante en el tamaño transferido: algunas regiones descargan menos contenido, posiblemente porque sus sitios están más adaptados a redes limitadas. Cloudflare presenta esto como una hipótesis para investigar, no como una explicación demostrada.

La lección para los equipos de ingeniería es metodológica. Las pruebas de laboratorio siguen siendo útiles para localizar regresiones y comparar cambios controlados, pero no sustituyen a los datos de campo. Un presupuesto de JavaScript, una estrategia de imágenes o una decisión de renderizado deben contrastarse con dispositivos y redes reales. BEACON también recuerda que los promedios globales pueden esconder desigualdades importantes: el mismo bundle puede parecer aceptable en una oficina con fibra y convertirse en una barrera para usuarios con móviles modestos.

El conjunto está disponible en BigQuery y se acompaña de consultas reproducibles. Sus resultados iniciales aún no explican causalidades, pero ofrecen una base pública para estudiar dónde falla la web y qué mejoras benefician realmente a sus usuarios.
