---
translationId: cloudflare-verified-bots-accountability-20261016
lang: es
slug: cloudflare-mide-el-comportamiento-de-los-bots-verificados
title: "Cloudflare quiere que la confianza en los bots se gane con comportamiento sostenido"
description: "El nuevo sistema de Cloudflare evalúa si los bots verificados respetan robots.txt, responden a HTTP 429 y mantienen patrones de tráfico responsables a lo largo del tiempo."
publishedAt: 2026-10-16
sourceName: "Cloudflare Blog"
sourceTitle: "Continuous accountability for Verified bots"
sourceUrl: "https://blog.cloudflare.com/verified-bots-accountability/"
author: "Chris Tsoukaladelis"
tags: ["seguridad", "bots", "web", "agentes-ia"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

La identidad de un bot resuelve una pregunta, pero no todas. Saber quién opera un agente automatizado no demuestra que respete las preferencias de un sitio, reduzca su ritmo cuando se le solicita o deje de insistir después de recibir una respuesta de bloqueo. Cloudflare propone medir esa diferencia entre identidad y confianza mediante observación continua.

La compañía ya utiliza Web Bot Auth para que los bots firmen sus solicitudes y BotBase para catalogar esa identidad en un formato abierto. El siguiente paso es registrar cómo se comportan después de ser identificados. Cloudflare describe un sistema que construye una banda de confianza explicable a partir de patrones observados, en lugar de emitir una sentencia permanente sobre un operador.

La primera señal es robots.txt. El sistema compara el tráfico observado con las reglas publicadas por el sitio y busca patrones repetidos de incumplimiento, no un incidente aislado. La referencia técnica es RFC 9309, que define el protocolo de exclusión de robots. Cloudflare subraya que robots.txt establece restricciones mínimas: que una ruta no esté prohibida expresamente no significa que todo comportamiento sea aceptable.

La segunda señal es la respuesta a HTTP 429, “Too Many Requests”. Un sitio puede utilizarla para pedir que un cliente reduzca su ritmo, se detenga o espere el tiempo indicado. El sistema observa si el bot adapta su tráfico después de recibirla. Disminuir la frecuencia o pausar contribuye a una valoración de confianza más alta; continuar al mismo ritmo la reduce cuando el patrón se repite.

El enfoque introduce una distinción útil para diseñar sistemas automatizados. El riesgo puede cambiar de una solicitud a otra: una petición concreta puede ser inofensiva y la siguiente puede saturar un origen. La confianza, en cambio, se forma con el historial de decisiones y respuestas. Por eso la propuesta no pretende clasificar un bot únicamente por su nombre o por un certificado, sino combinar identidad con evidencia de comportamiento.

El mecanismo se integra con otras piezas de Cloudflare. Bot Preference Sync permite a los propietarios publicar preferencias y alinearlas con políticas configuradas; Bot Management decide cómo tratar el tráfico; y la observación continua aporta contexto sobre si un bot está respetando esas decisiones. La compañía afirma que ya utiliza el sistema internamente y planea ofrecerlo a sus clientes, que podrán elegir el umbral de confianza aplicado.

Para quienes construyen crawlers, agentes o APIs públicas, la noticia tiene una consecuencia práctica: la cortesía de red debe ser un comportamiento verificable, no solo una promesa documental. Los clientes automatizados deberían interpretar robots.txt, manejar 429 con backoff y registrar sus decisiones. Para los propietarios de sitios, medir patrones sostenidos puede ofrecer una señal más útil que permitir o bloquear basándose exclusivamente en una identidad declarada. La propuesta sigue siendo un mecanismo de evaluación, no una garantía universal, pero coloca la responsabilidad operativa dentro del diseño técnico.
