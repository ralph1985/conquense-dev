---
translationId: ai-agent-harness-supply-chain-defects-20260907
lang: es
slug: configuraciones-de-agentes-de-codigo-y-riesgo-de-cadena-de-suministro
title: "La configuración de los agentes de código ya es una dependencia de seguridad"
description: "Un estudio sobre 3.171 repositorios encuentra defectos verificables en configuraciones de agentes, MCP y skills compartidas públicamente."
publishedAt: 2026-09-07
sourceName: "arXiv"
sourceTitle: "Scanning the Harness: An Empirical Study of Supply-Chain Defects in AI Coding-Agent Configurations"
sourceUrl: "https://arxiv.org/abs/2609.07360"
author: "Benjamin Kapner, Carmel Soceanu, Alicia Petrunin y Hofni Gartner"
tags: ["seguridad", "inteligencia-artificial", "agentes-de-codigo", "cadena-de-suministro", "mcp"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Un estudio publicado en arXiv plantea una cuestión que muchas organizaciones todavía tratan como configuración local: los archivos que dirigen a un agente de programación forman una nueva capa de dependencias de la cadena de suministro. Instrucciones, skills, hooks, subagentes y declaraciones de servidores MCP pueden llegar desde repositorios públicos o marketplaces y ejecutarse con los privilegios del desarrollador. En la práctica, se parecen más a paquetes instalables que a simple documentación.

Los autores analizaron 3.171 repositorios públicos de GitHub: 2.660 configuraciones que combinaban al menos dos tipos de componentes y 511 colecciones de skills. El diseño del estudio intenta evitar una fuente habitual de exageración en investigaciones de seguridad: no cuenta cualquier coincidencia de un escáner como vulnerabilidad. Las reglas debían poder decidirse a partir de los archivos o del sistema de archivos, y cada hallazgo se revisó mediante una segunda implementación independiente y sesiones separadas de validación.

El resultado principal es que el 16 % de las configuraciones analizadas contenía al menos un defecto de seguridad confirmado. El 9,8 % declaraba servidores MCP sin versión fijada; el 3,1 % concedía permisos que permitían ejecución arbitraria bajo una apariencia de alcance limitado; y el 3,8 % incluía una skill que preautorizaba el uso del shell. El 16,7 % tenía algún defecto confirmado al incluir también problemas de funcionamiento. El estudio no confirmó rutas de exfiltración de credenciales, una precisión importante porque delimita lo que los datos demuestran.

El problema de las versiones sin fijar es familiar para cualquier equipo que haya gestionado npm, PyPI o imágenes de contenedor. Una declaración como npx -y junto con un nombre de servidor puede descargar una versión diferente cada vez que arranca el agente. Sin lockfile, digest o revisión de cambios, la ejecución depende del contenido publicado en ese momento. La diferencia es que el proceso puede tener acceso a código, archivos locales, red y credenciales disponibles para la sesión.

La respuesta técnica no consiste en prohibir todos los agentes, sino en aplicar controles de ingeniería que todavía faltan. Los equipos deberían fijar versiones y hashes de servidores MCP, revisar permisos con una semántica realmente restrictiva, separar tareas de lectura y escritura, y someter skills y hooks a análisis estático antes de incorporarlos. También conviene registrar qué componentes se cargan en cada proyecto y ejecutar comprobaciones en CI para detectar permisos demasiado amplios o cambios inesperados.

El artículo tiene límites: estudia repositorios públicos, mide reglas decidibles por archivos y reconoce que su prevalencia es una cota inferior. Aun así, ofrece una conclusión útil y verificable: el harness del agente debe recibir el mismo tratamiento de inventario, revisión y actualización que cualquier otra dependencia privilegiada.
