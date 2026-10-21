---
translationId: chrome-devtools-agent-css-diagnostics-20261020
lang: es
slug: chrome-devtools-agentes-css-diagnosticos-y-trazas
title: "Chrome DevTools amplía la depuración asistida por agentes y el diagnóstico CSS"
description: "La actualización de octubre incorpora inspección CSS para agentes, edición visual de anchor positioning, análisis de trazas grandes y diagnósticos de instalación web."
publishedAt: 2026-10-20
sourceName: "Chrome for Developers"
sourceTitle: "New in DevTools - November 2026"
sourceUrl: "https://developer.chrome.com/blog/new-in-devtools-november-2026"
author: "Matthias Rohmer"
tags: ["javascript", "devtools", "css", "browser APIs", "rendimiento web"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

La actualización de Chrome DevTools publicada el 20 de octubre amplía dos líneas que empiezan a converger: herramientas para depurar interfaces modernas y herramientas que permiten a agentes de programación inspeccionar una aplicación con límites más precisos. No es solo una colección de pequeños cambios de interfaz. Incluye mecanismos para explorar estilos calculados, analizar trazas de rendimiento de gran tamaño y diagnosticar errores de instalación web.

La novedad más relevante para el trabajo asistido por agentes es la inspección de estilos CSS mediante el servidor MCP de Chrome DevTools. La herramienta get_css_styles puede devolver por páginas las reglas calculadas y coincidentes, las reglas heredadas, los pseudo-elementos, los keyframes y varias reglas at. La paginación es importante: obliga a que el consumidor trate el árbol de estilos como un conjunto potencialmente grande, en lugar de volcarlo completo en cada consulta. También se incorporan archivos de configuración, raíces del sistema de archivos y controles de rutas, piezas necesarias para que una automatización no tenga acceso implícito a todo el entorno.

El servidor añade además análisis de trazas por bloques y un búfer predeterminado de 1,2 GB. Procesar una grabación grande por partes evita que la inspección dependa de cargar todo el contenido de una vez y permite aislar mejor la memoria de cada instancia del motor de trazas. Para equipos que investigan INP, trabajo en segundo plano o regresiones de renderizado, esto puede hacer más reproducibles los análisis. La mejora no sustituye una instrumentación adecuada, pero reduce una limitación práctica de los flujos automatizados.

En el panel Elements, DevTools añade un editor visual para position-area, una propiedad relacionada con CSS anchor positioning. El desarrollador puede seleccionar regiones de la cuadrícula de anclaje, configurar ejes, activar self y observar la caja de posicionamiento sobre la página. También se puede inspeccionar un ancla implícita cuando un popover tiene varias candidatas. Estas ayudas son útiles porque el problema del posicionamiento anclado no suele ser recordar la sintaxis, sino entender qué caja, eje o relación geométrica está produciendo el resultado.

El panel Application incorpora diagnósticos para Web Install, incluyendo fallos de descarga del manifiesto, errores de sintaxis, start_url inválidas, nombres o identificadores ausentes y manifiestos que no se encuentran. La herramienta también añade información sobre procedencia de scripts publicitarios y mejoras en la inspección del almacenamiento. En conjunto, desplaza parte del diagnóstico desde la lectura manual de consola y red hacia señales contextualizadas dentro de DevTools.

Hay una cautela importante para quienes integren el servidor MCP en agentes: los controles de ejecución de JavaScript, las raíces permitidas y los permisos de rutas deben formar parte de la configuración de seguridad, no quedar como detalles de conveniencia. La actualización muestra una dirección clara: los agentes necesitan observabilidad estructurada, consultas acotadas y trazabilidad sobre qué inspeccionan. Para el desarrollo web, eso puede significar depuraciones más repetibles; para la plataforma, significa que el navegador se convierte gradualmente en una fuente de herramientas de diagnóstico programables, con el riesgo correspondiente si se concede acceso sin límites.
