---
translationId: codeql-2264-github-actions-2026-09-03
lang: es
slug: codeql-2264-mejora-la-deteccion-de-riesgos-en-github-actions
title: "CodeQL 2.26.4 mejora la detección de riesgos en GitHub Actions"
description: "La nueva versión de CodeQL amplía el modelado de JavaScript y TypeScript y refina las comprobaciones de flujo y referencias mutables en GitHub Actions."
publishedAt: 2026-09-03
sourceName: "GitHub Changelog"
sourceTitle: "CodeQL 2.26.4 improves GitHub actions security detections"
sourceUrl: "https://github.blog/changelog/2026-09-03-codeql-2-26-4-improves-github-actions-security-detections/"
author: "GitHub"
tags: ["seguridad", "javascript", "typescript", "github-actions"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha publicado CodeQL 2.26.4, una actualización del motor de análisis estático que añade soporte para Go 1.27, mejora la precisión de algunas alertas de flujo de datos en Rust y modifica varios modelos de seguridad. Aunque se presenta como una actualización incremental, sus cambios muestran dónde se concentra actualmente el riesgo: en los límites entre lenguajes, frameworks, automatización y datos controlados por terceros.

Para JavaScript y TypeScript, la versión incorpora soporte para expresiones regulares que utilizan la bandera d, además de reconocer la directiva worklet de React Native. El detalle importa porque un analizador solo puede seguir el flujo de datos si entiende las construcciones que realmente aparecen en el código. Cuando una sintaxis nueva queda fuera del modelo, una alerta puede no localizar el origen y el destino de un dato peligroso, o puede perder una ruta completa de propagación.

La actualización también introduce modelos de sinks de inyección SQL para DatabaseClient de Spring R2DBC y para la SPI de R2DBC. En paralelo, amplía la propagación de taint en Java y Kotlin a través de String.valueOf(Object) cuando el argumento es un CharSequence. En Python, list.extend y list.insert reciben un tratamiento coherente con list.append. El patrón común es que las comprobaciones de seguridad deben seguir las abstracciones habituales de cada ecosistema, no limitarse a detectar llamadas directas a APIs de bajo nivel.

La parte más relevante para equipos de plataforma afecta a GitHub Actions. CodeQL cambia la forma en que interpreta los campos del actor dentro del payload de eventos: una comprobación sobre un campo solo cuenta como protección cuando ese campo existe realmente en el evento concreto. Como consecuencia, algunos repositorios pueden recibir más alertas. La modificación evita que una condición aparentemente segura se considere válida en un contexto donde el dato no está presente o tiene otra semántica.

La consulta actions/unpinned-tag también pasa a detectar referencias mutables a workflows reutilizables. El problema no se limita a fijar acciones de terceros. Un workflow reutilizable que apunte a una etiqueta movible puede cambiar después de que una revisión haya sido aprobada, alterando el código que ejecuta el pipeline. Detectar ese patrón ayuda a convertir la inmutabilidad de las dependencias en una propiedad de toda la cadena de CI/CD.

Por último, CodeQL permite especificar EnvironmentCheck mediante un modelo de datos. GitHub advierte que algunas consultas basadas en ControlCheck pueden encontrar más resultados cuando un entorno deja de ser un sanitizador suficiente. Para los equipos, la consecuencia práctica es revisar alertas nuevas en lugar de descartarlas como ruido y comprobar si sus workflows dependen de referencias de versión, permisos o entornos que pueden cambiar.

La actualización se despliega automáticamente en GitHub Code Scanning y llegará posteriormente a una versión futura de GHES. La lección no es activar una herramienta y olvidar el resultado: el modelado de seguridad evoluciona junto al lenguaje y la plataforma, por lo que las reglas deben mantenerse, probarse y revisarse como cualquier otra parte crítica del código.
