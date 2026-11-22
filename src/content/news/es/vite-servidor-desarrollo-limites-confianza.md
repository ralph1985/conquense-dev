---
translationId: vite-dev-server-trust-boundary-20261110
lang: es
slug: vite-servidor-desarrollo-limites-confianza
title: "Vite corrige un fallo crítico que convierte peticiones al servidor de desarrollo en ejecución de código"
description: "La vulnerabilidad revela cómo una URL puede atravesar el grafo de módulos y alcanzar funciones que evalúan código durante el desarrollo."
publishedAt: 2026-11-10
sourceName: "Vite / GitHub Security Advisories"
sourceTitle: "Remote code execution using `__vite-browser-external` virtual module"
sourceUrl: "https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7"
author: "Redacción Conquense Dev"
tags: ["javascript", "frontend", "vite", "security", "web-tooling"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

El equipo de Vite publicó el 10 de noviembre un aviso crítico sobre ejecución de código mediante peticiones HTTP al servidor de desarrollo expuesto a la red. El aviso identifica correcciones en las versiones 8.3.7, 8.2.5, 8.1.7, 7.3.8 y 6.4.6, además de Vite+ 1.5.1. La condición de exposición incluye el uso de `--host` o `server.host`. Los equipos deben consultar la rama correspondiente y utilizar una versión corregida disponible. [Aviso de Vite](https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7).

El interés técnico está en el recorrido de una entrada externa. El identificador de ciertos módulos virtuales incorporaba datos procedentes de la URL sin escaparlos. La inyección podía modificar el grafo de módulos y alcanzar mecanismos de evaluación utilizados durante las transformaciones. Es un ejemplo de cómo una infraestructura que procesa código necesita distinguir su procedencia, incluso cuando todo termina representado como un módulo. [Detalles técnicos](https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7).

La política de seguridad del proyecto ayuda a interpretar el problema: las solicitudes de red se consideran entradas no fiables, mientras que los desarrolladores, su infraestructura y los plugins forman parte del entorno de confianza. Un puerto reenviado o una red compartida pueden acercar clientes externos a ese límite. Por tanto, revisar exclusivamente el código de la aplicación deja fuera una parte relevante de la superficie de desarrollo. [Modelo de amenazas de Vite](https://github.com/vitejs/vite/security).

La documentación también distingue entre escuchar en una interfaz y validar los nombres de host. `server.host` utiliza `localhost` por defecto; configurarlo como `true` o `0.0.0.0` amplía las interfaces de escucha. Por separado, permitir cualquier valor en `server.allowedHosts` elimina una protección frente a DNS rebinding. Son controles distintos que conviene revisar juntos, sin presentar ninguno como sustituto de la actualización. [Opciones del servidor](https://vite.dev/config/server-options).

Como propuesta operativa, una revisión útil empieza por localizar las versiones realmente instaladas, incluidos monorepos, herramientas internas y proyectos de demostración. Después puede comprobarse qué procesos siguen activos, qué interfaces escuchan y qué túneles o reenvíos permiten llegar hasta ellos. Actualizar una dependencia en el repositorio y sustituir un proceso que ya estaba ejecutándose son verificaciones diferentes; ambas deberían quedar cubiertas por el procedimiento del equipo.

Para quienes mantienen herramientas de compilación, el caso sugiere pruebas que recorran el sistema completo: entrada HTTP, resolución, generación de módulos y transformación. Comprobar cada función por separado puede pasar por alto una combinación peligrosa entre componentes que individualmente parecen correctos. El criterio de éxito debe incluir que una entrada no fiable conserve esa clasificación durante todo el recorrido. Esa es la lección de mantenibilidad: documentar los límites de confianza y probar sus transiciones merece tanta atención como acelerar el servidor de desarrollo.
