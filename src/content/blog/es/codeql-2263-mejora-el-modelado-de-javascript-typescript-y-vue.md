---
translationId: github-codeql-2263-javascript-modeling
lang: es
slug: codeql-2263-mejora-el-modelado-de-javascript-typescript-y-vue
title: "CodeQL 2.26.3 mejora el modelado de JavaScript, TypeScript y Vue"
description: "La nueva versión de CodeQL amplía los modelos de flujo para Vue y mejora la detección de riesgos en GitHub Actions y aplicaciones JavaScript/TypeScript."
publishedAt: 2026-08-19
sourceName: "GitHub Changelog"
sourceTitle: "CodeQL 2.26.3 improves GitHub Actions queries and JavaScript modeling"
sourceUrl: "https://github.blog/changelog/2026-08-19-codeql-2-26-3-improves-github-actions-queries-and-javascript-modeling/"
author: "GitHub"
tags: ["seguridad", "CodeQL", "JavaScript", "TypeScript", "Vue"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

CodeQL 2.26.3 amplía el análisis de seguridad de aplicaciones JavaScript y TypeScript y mejora varias consultas para GitHub Actions. La parte más relevante para equipos frontend es la incorporación de modelos de flujo para helpers de la Composition API de Vue: `ref`, `shallowRef`, `toRef`, `reactive` y `computed`. También se modela `useRoute()` de Vue Router como fuente de datos remotos del lado cliente, incluyendo sus propiedades `query`, `params`, `path`, `fullPath` y `hash`.

El detalle importa porque los analizadores estáticos no pueden inferir automáticamente toda la semántica de cada framework. Una herramienta puede conocer que una entrada procede de una petición, pero perder el rastro cuando esa entrada pasa por un helper reactivo, un router o una capa propia. Los modelos de flujo rellenan ese contexto: describen qué funciones introducen datos potencialmente controlados por el usuario, cómo se transforman y en qué puntos podrían alcanzar un sink peligroso. En esta versión, ese conocimiento puede mejorar consultas como las relacionadas con XSS o inyección de rutas.

CodeQL también permite que los modelos personalizados referencien archivos concretos mediante un nombre de paquete con la forma `file:<path>`. Para una base de código grande, esto ofrece una forma más precisa de declarar fuentes y sinks basados en exportaciones públicas de un módulo. La mejora no sustituye una revisión de la arquitectura: obliga a pensar qué fronteras atraviesan los datos y puede revelar que un wrapper aparentemente inocente concentra demasiada responsabilidad de seguridad.

El cambio se extiende a los workflows. CodeQL reconoce ahora datos no confiables en `github.event.merge_group` para ejecuciones activadas por el evento `merge_group`. Además, varias consultas relacionadas con inyección de variables de entorno, envenenamiento de caché y checkouts no confiables ajustan sus condiciones para distinguir mejor entre triggers, permisos y ámbitos de caché. Esto es importante porque una vulnerabilidad de CI no depende únicamente del código de la aplicación: también puede aparecer cuando una contribución controla expresiones, artefactos o pasos que se ejecutan con privilegios elevados.

Hay una modificación incompatible que conviene revisar: se elimina el módulo `codeql.actions.security.SelfHostedQuery`, por lo que las consultas personalizadas que lo usen deberán actualizarse. La lección operativa es tratar las reglas de seguridad como código versionado: probarlas en repositorios representativos, revisar cambios de precisión y mantener una lista de consultas internas afectadas por cada actualización.

La actualización no convierte el análisis estático en una prueba completa. Sus resultados siguen dependiendo de los modelos, de la configuración y de los caminos que el análisis pueda recorrer. Pero un mejor conocimiento de Vue, Vue Router y GitHub Actions reduce puntos ciegos concretos y acerca la seguridad al lugar donde realmente se construye el sistema: también el frontend, los workflows y sus interfaces entre capas.
