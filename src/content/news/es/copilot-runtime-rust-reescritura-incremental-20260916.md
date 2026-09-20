---
translationId: copilot-runtime-rust-incremental-rewrite-20260916
lang: es
slug: copilot-runtime-rust-reescritura-incremental-20260916
title: "GitHub reescribe el runtime de Copilot en Rust con una migración incremental"
description: "La transformación de más de 800.000 líneas muestra cómo separar un runtime compartido, reducir fronteras de procesos y validar una reescritura asistida por agentes sin detener el ̀"
publishedAt: 2026-09-16
sourceName: "The GitHub Blog"
sourceTitle: "Migrating the GitHub Copilot runtime to Rust, using Copilot"
sourceUrl: "https://github.blog/ai-and-ml/github-copilot/migrating-the-github-copilot-runtime-to-rust-using-copilot/"
author: "Stephen Toub"
tags: ["rust", "typescript", "ai", "software architecture", "developer tools"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

## Una reescritura con una restricción poco habitual

GitHub ha descrito cómo trasladó a Rust el runtime de agentes que comparten Copilot CLI, Copilot App, Copilot SDK y otros productos. El proyecto terminó con más de 800.000 líneas de Rust en producción y sustituyó un runtime que originalmente estaba escrito en TypeScript sobre Node.js y V8. La parte interesante no es el lenguaje elegido por sí mismo, sino el problema arquitectónico que obligó a tomar la decisión.

El runtime se había construido alrededor de una aplicación de terminal. Cuando apareció la necesidad de ofrecer un SDK reutilizable, el SDK acabó lanzando la CLI como un proceso separado y hablando con ella mediante JSON-RPC. Ese diseño era rápido de entregar, pero cada consumidor tenía que arrancar Node y V8, asumir su consumo de memoria y pagar una frontera de procesos para cada llamada. También complicaba el diagnóstico: un fallo del proceso de Node podía arrastrar la sesión completa.

Rust encajó con los requisitos concretos de GitHub: una biblioteca embebible mediante una ABI C, menor sobrecoste de arranque y memoria, recursos más predecibles y una mejor base para integrar clientes escritos en C#, TypeScript, Python, Go, Java o Rust. El artículo subraya, con buen criterio, que esto no convierte a Rust en el destino obligatorio de cualquier aplicación TypeScript. La elección dependía de las necesidades de incrustación, densidad y aislamiento del runtime.

## Cambiar la arquitectura mientras el producto sigue vivo

La migración también sirvió para separar la interfaz de terminal del núcleo del runtime. GitHub descartó una sustitución masiva y eligió reemplazar componentes uno a uno. Cada cambio eliminaba la implementación TypeScript y dejaba un adaptador fino hacia Rust, manteniendo la rama principal desplegable. Así, los pull requests eran más pequeños, revisables y fáciles de asociar con posibles regresiones.

La validación combinó las pruebas end-to-end existentes con lanzamientos progresivos. En unas catorce semanas se publicaron 135 versiones, primero con versiones preliminares cuando era posible. Ese ritmo permitió observar fallos en consumidores reales, localizar mejor qué cambio los había introducido y corregirlos sin esperar a una migración final. A finales de agosto, el runtime ya era completamente Rust, mientras las pruebas end-to-end seguían escritas principalmente en TypeScript.

## La lección para otros equipos

Los agentes escribieron la mayor parte del código portado, pero el mecanismo de seguridad no fue confiar en la generación automática. Fueron decisivos la división por componentes, la continuidad de la rama principal, las pruebas existentes, los contratos de interfaz y el despliegue gradual. El caso muestra una aplicación sobria de la IA al mantenimiento: acelerar una transformación costosa sin convertirla en una apuesta irreversible.

Para equipos más pequeños, la conclusión es transferible aunque la escala no lo sea. Antes de reescribir, conviene identificar qué frontera de rendimiento o integración justifica el cambio, aislar el núcleo de las interfaces y diseñar una secuencia de sustituciones que pueda verificarse en producción. La tecnología puede cambiar; la disciplina de entrega sigue siendo el componente más importante.
