---
translationId: nodejs-security-releases-20261021
lang: es
slug: nodejs-corrige-fallos-de-seguridad-en-dns-tls-brotli-y-el-modelo-de-permisos
title: "Node.js corrige fallos de seguridad en DNS, TLS, Brotli y el modelo de permisos"
description: "La actualización de seguridad de octubre afecta a las ramas 26, 24 y 22 e incluye fallos de alto impacto en validación de nombres, compresión, entropía y aislamiento del sistema de"
publishedAt: 2026-10-21
sourceName: "Node.js Project"
sourceTitle: "Wednesday, October 21, 2026 Security Releases"
sourceUrl: "https://nodejs.org/en/blog/vulnerability/october-2026-security-releases"
author: "Node.js Project"
tags: ["javascript", "node.js", "seguridad", "supply chain"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

El proyecto Node.js publicó el 21 de octubre una actualización de seguridad para las líneas 26.x, 24.x y 22.x. El aviso reúne correcciones en dependencias y en componentes centrales del runtime, por lo que interesa tanto a quienes mantienen servicios HTTP como a quienes distribuyen herramientas de línea de comandos, procesos de build o aplicaciones con acceso a red.

Entre los fallos de mayor severidad aparece una vulnerabilidad en la resolución DNS que permite truncar nombres que contienen un carácter NUL. También se corrigen dos problemas de validación de certificados TLS. Uno puede permitir que una dirección IP escrita con dígitos de ancho completo eluda la comprobación del nombre del host; el otro afecta a casos en los que el host resuelve de forma laxa a una dirección IP. En ambos escenarios, la consecuencia importante no es una simple entrada mal formada, sino la posibilidad de que una aplicación confíe en un endpoint distinto del que pretendía autenticar.

El aviso también describe un fallo de alta severidad en el decodificador Brotli que puede provocar una escritura fuera de límites y ejecución remota de código. Brotli se usa habitualmente para comprimir respuestas HTTP y otros artefactos, así que el riesgo depende de qué entradas comprimidas procesa cada aplicación y de qué controles existen alrededor del parsing. No basta con asumir que el código de negocio es seguro: una librería de compresión situada antes de la lógica de la aplicación también forma parte de la superficie de ataque.

Otro caso menos visible afecta a crypto.randomUUID() y randomInt() cuando la entropía almacenada se incorpora a snapshots de inicio o aplicaciones autocontenidas. Si esos valores se repiten entre procesos, una fuente que normalmente se considera impredecible deja de cumplir esa expectativa. Las aplicaciones que usan identificadores aleatorios para seguridad, correlación o control de acceso deben revisar no solo la API, sino también cómo se crean y restauran los procesos.

Las correcciones incluyen además problemas en SQLite, Undici, c-ares, OpenSSL, el procesamiento de archivos ZIP y el modelo de permisos de Node.js. Dos fallos de este último componente podían conceder acceso excesivo mediante búsquedas con comodines o permitir un bypass relacionado con fs.realpathSync(). El hecho de que sean vulnerabilidades de severidad baja no las vuelve irrelevantes en herramientas que ejecutan código parcialmente confiable.

La acción práctica es actualizar la línea soportada que corresponda y repetir las pruebas de integración, especialmente en clientes TLS, resolutores DNS, endpoints que aceptan compresión y runners con snapshots o permisos restringidos. También conviene revisar imágenes base y lockfiles: actualizar Node.js en el portátil no corrige automáticamente contenedores, workers o pipelines que fijan otra versión. La noticia recuerda que la seguridad del runtime es una cadena: protocolos, parsers, dependencias y políticas de aislamiento pueden fallar de formas distintas y deben mantenerse juntos.
