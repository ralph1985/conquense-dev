---
translationId: vercel-drives-agent-workspaces-20261015
lang: es
slug: vercel-drives-persistencia-y-ramificacion-para-entornos-de-agentes
title: "Vercel separa el espacio de trabajo persistente del entorno de ejecución de los agentes"
description: "Vercel Drives permite conservar archivos entre sandboxes, compartir conjuntos de datos y crear copias de trabajo aisladas para agentes que ejecutan tareas en paralelo."
publishedAt: 2026-10-15
sourceName: "Vercel Engineering"
sourceTitle: "Introducing Vercel Drives: persistent storage for agents"
sourceUrl: "https://vercel.com/blog/introducing-vercel-drives-persistent-storage-for-agents"
author: "Kevin Sundstrom, Harpreet Arora, Elisabeth Rülke"
tags: ["agentes-ia", "arquitectura", "sandbox", "almacenamiento"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Los agentes que trabajan durante varias sesiones necesitan conservar algo más que el historial de conversación. También deben mantener archivos, dependencias, resultados intermedios, datasets y memoria de trabajo cuando cambia el entorno en el que ejecutan código. Vercel ha generalizado Drives para Sandbox con ese objetivo: separar el estado persistente del sandbox efímero que lo utiliza.

Un Drive se crea una vez y se monta como un directorio al iniciar un sandbox. Si el entorno termina, los archivos permanecen disponibles para una ejecución posterior. El agente puede cambiar de runtime o de capacidad de cómputo sin reconstruir todo su espacio de trabajo. La interfaz se apoya en el SDK de Vercel Sandbox y permite recuperar un Drive por nombre antes de montarlo en el nuevo entorno.

La separación resuelve un problema habitual en arquitecturas de agentes. El entorno de ejecución debe ser reemplazable para facilitar aislamiento, escalado y control de dependencias; el estado de trabajo, en cambio, necesita continuidad. Mezclar ambos conceptos obliga a reconstruir archivos en cada ejecución o a convertir el contenedor temporal en una base de datos improvisada. Drives ofrece una frontera más clara: el sandbox ejecuta y el Drive conserva.

La característica también contempla colaboración entre workers. Un agente puede preparar un dataset en un Drive y otros sandboxes pueden montarlo en modo de solo lectura para analizarlo o generar informes. Cuando varias estrategias necesitan modificar los mismos datos iniciales, un Drive puede bifurcarse. Cada fork hereda el contenido, la región y el tamaño máximo del origen, pero obtiene un espacio escribible independiente. Los trabajadores pueden experimentar en paralelo sin alterar la copia original.

La bifurcación no fusiona cambios automáticamente. Esa decisión es importante: el sistema proporciona aislamiento y un punto de partida común, no un sistema de control de versiones para resultados incompatibles. Si dos agentes modifican el mismo archivo, la aplicación debe decidir cómo comparar, validar o integrar sus salidas. La persistencia resuelve la disponibilidad del estado; no sustituye a los contratos de datos ni a la revisión de resultados.

Vercel indica que los Drives están disponibles de forma general en Sandbox, con un tamaño predeterminado de 1 TiB —o 1 GiB en Hobby— y hasta 16 TiB según la configuración. Estas cifras describen capacidad, no una garantía de que cualquier dataset sea apropiado para el modelo operativo. Los equipos deberán definir ciclos de vida, permisos, regiones, limpieza de forks y tratamiento de información sensible.

La noticia importa porque muestra una evolución de la arquitectura de agentes: pasar de sesiones aisladas a espacios de trabajo duraderos y reproducibles. Para una aplicación, la pregunta deja de ser únicamente qué herramientas puede llamar el agente y pasa a incluir qué estado puede conservar, quién puede leerlo, cómo se ramifica y cómo se recupera. Esa separación puede simplificar sistemas complejos, siempre que la persistencia se trate como un recurso explícito y gobernado, no como una carpeta conveniente sin límites.
