---
translationId: cloudflare-cryptolabe-post-quantum-migration-20260929
lang: es
slug: cryptolabe-ia-migracion-poscuantica-20260929
title: "Cloudflare usa IA para localizar criptografía clásica antes de su migración poscuántica"
description: "CryptoLabe combina análisis de repositorios, configuración y dependencias para convertir una migración criptográfica de gran escala en un inventario verificable."
publishedAt: 2026-09-29
sourceName: "Cloudflare Blog"
sourceTitle: "Using AI to chart a course for our post-quantum migration"
sourceUrl: "https://blog.cloudflare.com/ai-driven-cryptography-discovery/"
author: "Sharon Goldberg and Tiago Silva"
tags: ["seguridad", "criptografía", "poscuántica", "inteligencia-artificial", "mantenibilidad"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha explicado cómo está utilizando IA para preparar una migración poscuántica que afecta a una plataforma formada por numerosos productos, repositorios y dependencias. La compañía sitúa 2029 como objetivo para alcanzar una preparación poscuántica completa, pero el interés técnico de la publicación está en el método de inventario y análisis, no en una simple fecha de adopción.

El problema empieza por una dificultad conocida: la criptografía no siempre aparece de forma visible en el código que la utiliza. Puede llegar a través de una biblioteca compartida, de un valor predeterminado de TLS, de un archivo de configuración situado en otro repositorio o de una dependencia externa. Buscar nombres como RSA o X25519 con texto plano produce tanto falsos positivos como falsos negativos. Además, el mismo algoritmo puede participar en TLS, JWT, SSH o un protocolo interno, y cada caso tiene una ruta de migración distinta.

Para abordar esa complejidad, Cloudflare está desarrollando una herramienta interna llamada CryptoLabe. Su proceso tiene dos fases. La primera mapea los repositorios y busca señales en código fuente, manifiestos, lockfiles, scripts, tests, documentación y configuración. El resultado son observaciones sin clasificar. La segunda vuelve a examinar cada observación, sigue su comportamiento en tiempo de ejecución, consulta repositorios relacionados y busca contradicciones, código de pruebas o configuraciones que cambien el significado inicial.

La herramienta asigna categorías como criptografía clásica, dependencia externa o evidencia insuficiente. Esta última opción es esencial: si el sistema no puede justificar una clasificación, debe declarar que necesita más información en lugar de rellenar el hueco con una suposición. Los informes se preparan para dos públicos: responsables de producto, que necesitan entender el alcance, e ingenieros, que necesitan saber qué cambiar y qué dependencias pueden bloquearlo.

El caso más instructivo es el de los prerrequisitos. Una aplicación puede estar preparada para cambiar su código, pero depender de una biblioteca, un emisor de tokens, un navegador, una autoridad certificadora o un protocolo que todavía no soporte la alternativa poscuántica. También pueden aparecer límites de tamaño: firmas y certificados poscuánticos son mayores, por lo que un certificado transportado en una cabecera HTTP puede superar supuestos antiguos de intermediarios o aplicaciones.

Cloudflare reconoce que todavía no dispone de un conjunto de referencia que permita medir de forma reproducible la cobertura de sus prompts. Por eso presenta CryptoLabe como un proceso iterativo que exige revisión de los equipos propietarios. La lección para otras organizaciones es sobria: la IA puede acelerar el descubrimiento de deuda criptográfica, pero la migración necesita inventario, métricas, trazabilidad de dependencias y validación humana. Un grep ayuda a empezar; no basta para cerrar el trabajo.
