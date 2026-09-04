---
translationId: spotify-portal-model-routing-20260903
lang: es
slug: spotify-portal-reduce-el-consumo-de-tokens-de-agentes-de-codigo
title: "Spotify usa model routing para sacar el trabajo repetitivo del contexto de su agente"
description: "Una integración entre Backstage Portal y Claude Code delega lecturas masivas y generación predecible a modelos más baratos, con un ahorro medio cercano al 90% en una prueba de mon "
publishedAt: 2026-09-03
sourceName: "Spotify Engineering"
sourceTitle: "Spotify’s Backstage Portal cut my Claude Code token usage by 90%"
sourceUrl: "https://www.engineering.atspotify.com/2026/9/spotifys-backstage-portal-cut-my-claude-code-token-usage-by-90"
author: "Dimitri Mazmanov"
tags: ["agentes de código", "developer experience", "model routing", "Backstage", "costes"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Spotify describe una forma práctica de reducir el consumo de tokens de un agente de programación: separar la entrada y salida repetitivas del trabajo que realmente requiere razonamiento. La solución combina Backstage Portal, sus AiKA Modes y un plugin de Claude Code llamado shunt. En una prueba sobre un monorepo Java, las lecturas agrupadas consumieron aproximadamente un 90% menos de tokens del modelo principal.

El punto de partida es que un agente puede gastar una gran parte de su contexto leyendo varios archivos, buscando patrones o generando código repetitivo. Esas tareas son necesarias, pero no siempre justifican utilizar el modelo más caro o mantener todo el material dentro del contexto de la sesión. Spotify propone tratar el tipo de trabajo como una señal de routing: el modelo principal conserva las decisiones complejas y delega I/O o generación predecible.

Un AiKA Mode es un agente declarativo que se ejecuta en un runtime efímero. Define instrucciones, modelo, parámetros y herramientas MCP sin que el equipo tenga que operar infraestructura permanente, claves o servidores de larga duración. Puede exponerse de forma privada o compartirse con la organización. Para el experimento se crearon dos modos: bulk-reader, que lee varios archivos y devuelve un resumen estructurado, y code-writer, que genera un archivo a partir de una especificación y un archivo de referencia.

El plugin shunt añade controles en varias capas. Dos hooks PreToolUse interceptan lecturas grandes y comandos como cat o head cuando superan un umbral configurable, cuyo valor predeterminado es de 350 líneas. Scripts con argumentos explícitos construyen las peticiones y llaman al Portal CLI. Dos archivos de skills explican al agente cuándo usar esos scripts. Las lecturas dirigidas con offset y límite siguen permitidas, porque el modelo principal todavía necesita inspeccionar una sección concreta para editar o razonar sobre ella.

El diseño tiene límites claros. El trabajador no se utiliza para editar, depurar ni tomar decisiones arquitectónicas. El autor observó que un modelo secundario podía detectar patrones superficiales, pero perder un problema sutil de seguridad o concurrencia. Cada delegación añade una ida y vuelta de red de entre 10 y 30 segundos, y las llamadas tienen un límite de 30 segundos; para tareas pequeñas, esa latencia puede superar el ahorro de tokens. El code-writer también necesita un archivo de referencia para no producir código aislado de las convenciones del proyecto.

La lección técnica es que optimizar agentes no consiste solo en elegir un modelo mejor. También implica diseñar fronteras de contexto, rutas de delegación y mecanismos que impidan que el agente ignore esas reglas. El resultado de Spotify es una medición localizada, no una garantía universal, pero ofrece un patrón reusable: reservar el modelo de razonamiento para entender y decidir, y mover el trabajo predecible a componentes baratos, acotados y observables.
