---
translationId: cloudflare-tsrs-typescript-rust-20261020
lang: es
slug: tsrs-el-compilador-de-typescript-que-busca-la-velocidad-de-rust
title: "tsrs: el compilador de TypeScript que busca la velocidad de Rust"
description: "Cloudflare, VoidZero y colaboradores presentan un puerto experimental de TypeScript en Rust con mejoras prometedoras de rendimiento y memoria."
publishedAt: 2026-10-20
sourceName: "Cloudflare Blog"
sourceTitle: "Introducing tsrs: a Port of TypeScript to Rust"
sourceUrl: "https://blog.cloudflare.com/typescript-rust-port"
author: "Boshen Chen, Dimitri Mitropoulos, and Christoph Nakazawa"
tags: ["typescript", "rust", "javascript", "tooling", "performance"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare, VoidZero y Max Schwenk han presentado `tsrs`, un puerto experimental del compilador de TypeScript escrito en Rust e integrado en el ecosistema de herramientas Oxc. El proyecto nace con una ambición concreta: reducir el tiempo que los equipos pasan esperando al análisis de tipos y disminuir el consumo de memoria de las herramientas que forman parte del ciclo diario de desarrollo.

Los primeros resultados publicados por sus autores son llamativos, aunque todavía deben interpretarse como benchmarks iniciales. Con la misma configuración y el mismo número de trabajadores para comprobar tipos, `tsrs` llega a ser hasta ocho veces más rápido y utiliza aproximadamente un 70 % menos de memoria que TypeScript 7.0. El propio artículo recuerda que TypeScript 7.1 beta ya incorpora mejoras importantes y puede ser hasta 2,5 veces más rápido que TypeScript 7.0. La comparación relevante, por tanto, no es una promesa de sustitución inmediata, sino la evidencia de que el coste del compilador se ha convertido en un objetivo de optimización de primer orden.

La decisión técnica más importante es también la más fácil de pasar por alto: `tsrs` no pretende redefinir el lenguaje. No es un fork orientado a cambiar el diseño de TypeScript. El equipo quiere seguir fielmente la implementación original y mantener al equipo de TypeScript como autoridad sobre la evolución del lenguaje. Esa restricción aumenta la dificultad del proyecto, porque cada diferencia en diagnósticos, resolución de tipos o comportamiento del compilador puede convertirse en una incompatibilidad difícil de mantener.

El motivo para asumir ese coste es arquitectónico. Un compilador más pequeño y eficiente puede hacer viable un entorno de desarrollo completo en lugares donde un proceso tradicional de Node.js resulta demasiado pesado: un navegador mediante WebAssembly, un entorno aislado para agentes de programación, un dispositivo integrado o una plataforma edge. En esos escenarios, la memoria no es solo una cuestión de comodidad del desarrollador; condiciona qué herramientas pueden ejecutarse juntas y cuánto cuesta mantenerlas disponibles.

El proyecto también propone un modelo de mantenimiento interesante. Sus responsables quieren sincronizar los cambios de TypeScript con revisiones automatizadas, matrices de compatibilidad y ejecución periódica de la suite de pruebas del proyecto de referencia. La idea se parece al flujo que Cloudflare utiliza para seguir la evolución de Next.js en Vinext: detectar cambios aguas arriba, abrir incidencias, reproducir diferencias y trasladar pruebas antes de aceptar una divergencia.

Para los equipos de frontend, la noticia importa menos por instalar hoy un paquete experimental que por la dirección que señala. El rendimiento del toolchain, el consumo de memoria y la portabilidad pasan a ser parte de la arquitectura de desarrollo. Aun así, `tsrs` no debe tratarse como reemplazo estable: todavía necesita completar funciones como LSP y content mappers, reducir diferencias de comportamiento y demostrar compatibilidad sostenida. La lección práctica es prudente: medir el tiempo real del ciclo de tipos, vigilar el consumo de memoria y separar una mejora prometedora de una dependencia lista para producción.
