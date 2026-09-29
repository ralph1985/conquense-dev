---
translationId: firefox-157-webgpu-apis-20260929
lang: es
slug: firefox-157-webgpu-apis-y-pruebas-web
title: "Firefox 157 afina WebGPU, las animaciones y las pruebas automatizadas"
description: "La versión estable de Firefox 157 incorpora mejoras de interoperabilidad y rendimiento, mientras mantiene varias capacidades de WebGPU, Web Crypto y notificaciones en fase de exper"
publishedAt: 2026-09-29
sourceName: "MDN Web Docs"
sourceTitle: "Firefox 157 release notes for developers (Stable)"
sourceUrl: "https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/157"
author: "Colaboradores de MDN"
tags: ["firefox", "webgpu", "web-apis", "testing"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Firefox 157 llegó a la versión estable el 29 de septiembre con cambios que interesan menos por la cantidad de novedades que por el tipo de problemas que resuelven: interoperabilidad, uso eficiente de memoria y pruebas más precisas. Las notas para desarrolladores mezclan capacidades estables con funciones experimentales, una distinción importante para cualquier equipo que mantenga una aplicación web multiplataforma.

En WebGPU destaca el soporte para el uso de texturas `TRANSIENT_ATTACHMENT`. Este tipo de recurso está pensado para adjuntos que solo se utilizan durante el renderizado de una pasada. Mantener esas operaciones en la memoria de teselas puede reducir el tráfico hacia la VRAM y evitar asignaciones completas para texturas temporales. La mejora no convierte automáticamente una aplicación gráfica en más rápida, pero ofrece a los motores y a los desarrolladores una forma más explícita de describir recursos de vida corta. En aplicaciones de visualización, edición o gráficos generados en el navegador, ese detalle puede reducir presión de memoria y movimientos innecesarios de datos.

La versión también corrige el comportamiento de dos piezas de Web Animations. `Animation.reverse()` vuelve a iniciar una animación cuyo `playbackRate` es cero, y los cambios entre velocidades positivas y negativas en animaciones controladas por desplazamiento ajustan el `startTime` al extremo opuesto de la línea temporal. El resultado es más coherente con la especificación y evita estados difíciles de razonar cuando una interfaz combina scroll-driven animations, reproducción inversa y controles interactivos.

En automatización, WebDriver BiDi modifica `browser.setDownloadBehavior`: cuando el tipo es `allowed`, ahora exige `destinationFolder`. Para restaurar el comportamiento predeterminado se utiliza `null`. Es un cambio pequeño, pero precisamente este tipo de ajuste rompe suites de pruebas que dependen de valores implícitos. Los equipos que ejecutan pruebas end-to-end en varios navegadores deberían revisar los comandos de descarga y hacer explícita la política que esperan.

Las notas incluyen además varias funciones experimentales. Las notificaciones pueden recibir una URL de navegación directamente, tanto en `Notification()` como en `ServiceWorkerRegistration.showNotification()`. El HTML Sanitizer API puede limpiar elementos y atributos mientras analiza el marcado, reduciendo el trabajo de recorrer posteriormente el árbol DOM. Y Web Crypto incorpora, detrás de una preferencia de Nightly, operaciones de encapsulado y desencapsulado basadas en ML-KEM, un mecanismo de establecimiento de claves diseñado para resistir ataques de ordenadores cuánticos.

La lección editorial y técnica es separar disponibilidad de interés. Una API experimental puede ser relevante para prototipos y pruebas de compatibilidad, pero no debe entrar en producción solo porque aparece en las notas de una versión. Para equipos frontend, Firefox 157 sirve como recordatorio de que la plataforma evoluciona en capas: primero llega la semántica especificada, después la implementación estable y, entre ambas, una etapa en la que las pruebas con navegadores reales son parte del trabajo de arquitectura.
