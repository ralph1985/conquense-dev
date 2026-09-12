---
translationId: post-quantum-dnssec-mldsa44-20260910
lang: es
slug: post-quantum-dnssec-mldsa44-20260910
title: "1.1.1.1 empieza a validar DNSSEC poscuántico y convierte el tamaño en un problema operativo"
description: "Cloudflare añade validación de firmas ML-DSA-44 a su resolvedor público y muestra por qué migrar DNSSEC exige resolver transporte, compatibilidad y riesgos de degradación."
publishedAt: 2026-09-10
sourceName: "Cloudflare Blog"
sourceTitle: "1.1.1.1 now supports post-quantum DNSSEC, all 2,420 bytes of it"
sourceUrl: "https://blog.cloudflare.com/post-quantum-dnssec-1111/"
author: "Sebastiaan Neuteboom y Bas Westerbaan"
tags: ["seguridad", "dns", "dnssec", "criptografia", "computacion-cuantica"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha activado en 1.1.1.1 la validación de firmas DNSSEC generadas con ML-DSA-44, un algoritmo poscuántico estandarizado por NIST. No significa que todo DNSSEC haya migrado ni que exista ya una amenaza cuántica inmediata. Es una prueba de despliegue a gran escala para descubrir qué ocurre cuando las firmas son mucho mayores y los sistemas deben mantener compatibilidad durante años.

DNSSEC aporta autenticidad a las respuestas DNS. Un resolvedor valida una cadena de firmas desde la raíz hasta el dominio consultado y puede rechazar respuestas modificadas o falsificadas. Los algoritmos más habituales, como RSA y ECDSA, se consideran vulnerables ante un ordenador cuántico suficientemente potente. La migración es lenta porque requiere coordinación entre operadores autoritativos, registros, registradores y resolvedores.

El tamaño es el primer obstáculo práctico. Una firma ML-DSA-44 ocupa 2.420 bytes, frente a los 64 bytes de una firma ECDSA P-256. La firma ya supera por sí sola límites conservadores habituales para respuestas DNS sobre UDP, antes de añadir claves, nombres y otros registros. Cuando la respuesta no cabe, el servidor debe marcarla como truncada para que el resolvedor reintente por TCP u otro transporte. La prueba de Cloudflare muestra precisamente ese comportamiento: la consulta empieza por UDP y termina en TCP.

Esto importa para sistemas distribuidos porque una migración criptográfica puede cambiar patrones de red, latencia y carga. Cloudflare indica que alrededor del 85 % de las consultas que llegan a 1.1.1.1 usan UDP, aunque esos datos describen el tráfico hacia el resolvedor y no necesariamente cada conexión con servidores autoritativos. Las respuestas grandes pueden aumentar los reintentos TCP, y por tanto deben medirse en redes reales, no solo en laboratorios.

El segundo problema es la degradación. Durante la transición, una zona puede publicar firmas convencionales y poscuánticas para no romper resolvedores antiguos. Pero si un resolvedor moderno acepta cualquier camino válido, un atacante podría intentar forzarlo a usar la firma convencional más débil. Para evitarlo, 1.1.1.1 aplica una política local más estricta cuando el registro DS del padre anuncia soporte poscuántico: exige al menos una cadena válida con ML-DSA-44 y no permite que la ruta convencional sea suficiente.

La distinción es importante: validar firmas poscuánticas en un resolvedor no crea por sí sola una cadena completa. Los servidores autoritativos deben firmar, los registradores deben aceptar los registros DS y los registros superiores deben publicar la información correspondiente, hasta llegar a la raíz.

Para los usuarios de 1.1.1.1 no hay cambios de configuración. Para operadores y desarrolladores de infraestructura, la noticia funciona como un recordatorio útil: la criptografía aplicada también es ingeniería de transporte, compatibilidad y observabilidad. Medir tamaños, fragmentación, reintentos y políticas de fallback será tan importante como elegir el algoritmo.
