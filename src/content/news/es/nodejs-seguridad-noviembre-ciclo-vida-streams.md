---
translationId: nodejs-november-security-stream-lifecycles-20261111
lang: es
slug: nodejs-seguridad-noviembre-ciclo-vida-streams
title: "Node.js corrige fallos de HTTP/2 y TLS: las cancelaciones también necesitan pruebas"
description: "Las actualizaciones de noviembre muestran por qué el cierre de conexiones, los buffers pendientes y las políticas TLS deben formar parte de las pruebas de un servidor JavaScript."
publishedAt: 2026-11-11
sourceName: "Node.js"
sourceTitle: "Wednesday, November 11, 2026 Security Releases"
sourceUrl: "https://nodejs.org/en/blog/vulnerability/november-2026-security-releases"
author: "Redacción Conquense Dev"
tags: ["nodejs", "javascript", "security", "testing", "http2"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

El proyecto Node.js publicó el 11 de noviembre actualizaciones de seguridad para sus ramas 22, 24 y 26. Además de orientar una actualización del runtime, las correcciones ofrecen una lección práctica para quienes mantienen servidores JavaScript: la seguridad depende también de cómo termina una operación. Cancelar una descarga, cerrar una sesión o destruir un stream con escrituras pendientes exige conservar correctamente recursos y referencias.

Las versiones publicadas fueron [22.23.5](https://nodejs.org/en/blog/release/v22.23.5), [24.22.3](https://nodejs.org/en/blog/release/v24.22.3) y [26.13.1](https://nodejs.org/en/blog/release/v26.13.1). Sus notas incluyen cambios para retener buffers hasta que terminen las escrituras y mantener streams durante operaciones pendientes. Para un equipo de backend o frontend con renderizado en servidor, esto sitúa el mantenimiento del runtime dentro del trabajo de fiabilidad de la aplicación.

El [aviso técnico de Node.js](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases) describe problemas de disponibilidad y confidencialidad en HTTP/2 y HTTPS. Entre ellos figura una liberación prematura de memoria durante el cierre de streams con presión de escritura, capaz de exponer datos de respuestas. Otro fallo permite que la ejecución del parser HTTP vuelva a entrar mientras procesa un cuerpo HTTPS. Su explotación requiere condiciones concretas del manejador; el aviso distingue expresamente este caso del HTTP sin cifrar.

La lectura técnica es que una respuesta correcta en condiciones normales aporta evidencia incompleta. Una prueba que únicamente comprueba estado, cabeceras y contenido puede omitir lo que ocurre cuando el cliente deja de leer o desaparece. Como recomendación de ingeniería, conviene incorporar clientes lentos, cancelaciones durante transferencias y cierres mientras quedan escrituras pendientes. El objetivo es observar tanto la respuesta como la supervivencia y el consumo de recursos del proceso.

También hay correcciones relacionadas con el aislamiento de políticas TLS. Las notas de Node.js 24.22.3 recogen cambios en las claves de política de `https.Agent` y restricciones sobre reanudación de sesiones y SNI. La implicación para las pruebas es revisar conexiones reutilizadas entre configuraciones distintas: compartir infraestructura de transporte exige mantener separadas las decisiones de confianza. Estos escenarios merecen especial atención cuando una aplicación habla con varios servicios.

En el ámbito operativo, la propuesta es inventariar el ejecutable que utiliza cada servicio, incluidas imágenes de contenedor y procesos de renderizado, y contrastarlo con la versión corregida de su rama. Después, ejecutar pruebas representativas de conexiones y streaming en un entorno controlado. La aprobación debería registrar la versión realmente ejecutada y los resultados observados.

Estas medidas son recomendaciones derivadas de las correcciones, no resultados de pruebas realizadas sobre una aplicación concreta. El valor de esta actualización está en convertir fallos de infraestructura en casos de regresión útiles: comprobar qué sucede durante una interrupción ayuda a evaluar la fiabilidad de cualquier servicio que entregue contenido de forma incremental.
