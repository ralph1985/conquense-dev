---
translationId: github-copilot-runtime-rust-migration-20260916
lang: es
slug: github-copilot-runtime-rust-migration-20260916
title: "GitHub migra el runtime de Copilot de TypeScript a Rust con agentes y validación incremental"
description: "La reescritura de más de 800.000 líneas muestra cómo dividir una migración compleja, conservar los contratos y usar agentes sin sustituir la supervisión arquitectónica"
publishedAt: 2026-09-16
sourceName: "The GitHub Blog"
sourceTitle: "Migrating the GitHub Copilot runtime to Rust, using Copilot"
sourceUrl: "https://github.blog/ai-and-ml/generative-ai/migrating-the-github-copilot-runtime-to-rust-using-copilot/"
author: "Stephen Toub"
tags: ["rust", "typescript", "software-engineering", "testing", "ai-assisted-development"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha descrito una migración especialmente ambiciosa: el runtime de agentes que utilizan Copilot CLI, la aplicación de Copilot y su SDK pasó de TypeScript sobre Node.js y V8 a más de 800.000 líneas de Rust. El trabajo se completó principalmente con agentes de programación, en 128 pull requests integradas de forma incremental, mientras el resto del equipo seguía ampliando el producto.

El motivo no fue que TypeScript fuese una mala elección. Para una interfaz de terminal permitía desarrollar rápido y ofrecía un rendimiento razonable. El problema apareció cuando el mismo runtime empezó a servir como componente compartido para productos con necesidades distintas de arranque, densidad de servidores, memoria y rendimiento. La arquitectura inicial también había acoplado la interfaz de terminal y el runtime. El SDK terminó lanzando la CLI como un proceso separado y comunicándose mediante JSON-RPC, una solución práctica que añadía procesos, saltos de comunicación y consumo de memoria.

La migración se organizó de abajo arriba. Primero se establecieron el workspace de Rust, las reglas de lint, la integración continua, el pipeline de compilación y los patrones de interoperabilidad. Después se portaron pequeños componentes de lógica pura, sin entrada/salida ni estado compartido, que ya contaban con pruebas sólidas. Esos pilotos sirvieron para validar todo el recorrido: repositorio, FFI, empaquetado, pruebas y revisión. Las piezas posteriores avanzaron desde utilidades y operaciones de archivos hasta subsistemas con estado, herramientas, clientes de modelos, MCP y, al final, la orquestación de sesiones, que era la zona más acoplada.

Durante la transición coexistieron Rust y TypeScript mediante shims N-API. La superficie temporal llegó a 2.019 exportaciones internas y 3.356 puntos de llamada de TypeScript el 3 de agosto; al terminar el runtime, ambas cifras internas quedaron en cero. La interfaz pública persistió: los SDK para TypeScript, Python, Go, C#, Java y Rust siguen usando un contrato común, y Rust permite ofrecer tanto un addon nativo para Node como una puerta C ABI para clientes que quieran ejecutar el runtime dentro de su propio proceso.

La validación fue tan importante como la generación de código. Las pruebas end-to-end existentes se conservaron, los cambios pasaron por CI y los agentes compararon línea por línea el comportamiento antiguo y el nuevo. GitHub registró 13.852 ejecuciones de `pnpm test`, 8.437 de `cargo test` y miles de comprobaciones de lint y formato durante el esfuerzo. Los revisores humanos se concentraron en arquitectura, contratos, riesgo y decisiones ambiguas. Un caso revelador ocurrió cuando una automatización intentó justificar con una etiqueta la eliminación accidental de un método del SDK; la revisión humana detectó que el cambio no era aceptable y el método se restauró.

Los fallos conocidos se agruparon en contratos de comportamiento distintos, cambios de estado o ciclo de vida, migraciones incompletas, límites entre host e interoperabilidad y oráculos de prueba incorrectos. Algunos procedían de diferencias sutiles entre JavaScript y Rust, como `||` frente a `unwrap_or`, tipos numéricos o zonas horarias implícitas. La conclusión no es que los agentes hagan innecesaria la ingeniería: hacen viable una escala de trabajo mayor, pero siguen necesitando límites explícitos, pruebas que protejan contratos y una persona capaz de juzgar si el resultado es correcto.
