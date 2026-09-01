---
translationId: sqlite-wal-reset-2026
lang: es
slug: la-corrupcion-silenciosa-de-sqlite-que-obligo-a-mirar-el-wal
title: "La corrupción silenciosa de SQLite que obligó a mirar el WAL"
description: "La investigación de Tailscale sobre un fallo de carrera de 16 años muestra cómo la telemetría, las copias verificadas y los despliegues graduales convierten una corrupción intermit"
publishedAt: 2026-08-12
sourceName: "Tailscale"
sourceTitle: "How we tracked down a 16-year-old SQLite bug"
sourceUrl: "https://tailscale.com/blog/sqlite-wal-reset-bug"
author: "Alex Chan"
tags: ["sistemas", "sqlite", "fiabilidad", "bases-de-datos"]
readingTime: 3
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Tailscale ha publicado la investigación de un fallo de SQLite que provocó 19 casos de corrupción de bases de datos en seis meses dentro de su plano de control. El interés del caso no está solo en la antigüedad del defecto —los desarrolladores de SQLite estiman que llevaba al menos 16 años presente—, sino en cómo una configuración válida y poco habitual puede llevar un sistema estable hasta una zona de riesgo que las pruebas normales no cubren.

El plano de control de Tailscale está dividido en shards. Cada shard tiene una base de datos SQLite y un proceso Go que la utiliza como único escritor. La elección es razonable: SQLite ofrece transacciones serializables y un modelo sencillo para almacenar metadatos de redes y dispositivos. El problema apareció en la estrategia operativa. Tailscale controlaba manualmente los checkpoints del fichero WAL y los ejecutaba con mucha frecuencia, una ruta compatible con SQLite pero distinta de la más habitual.

La corrupción era difícil de reproducir. No dependía de un cliente, un shard concreto, una franja horaria o un nivel de carga claro. En lugar de esperar a que apareciera un patrón sintético, el equipo añadió telemetría forense a producción, supervisó las copias con PRAGMA integrity_check y creó un registro separado de las transacciones SQL. Como SQLite tiene un único escritor y transacciones lineales, ese registro permitía reconstruir cambios entre copias y reducir el coste de una recuperación.

La pista decisiva llegó con una herramienta de depuración desarrollada junto con los mantenedores de SQLite. El fallo era una carrera entre un checkpoint y una transacción de escritura: bajo una secuencia temporal muy concreta, el checkpoint podía creer que había copiado páginas desde el WAL al fichero principal cuando todavía no lo había hecho. Después se escribían índices que apuntaban a esas páginas ausentes, dejando el fichero inconsistente.

El arreglo añadió una comprobación en el proceso de checkpoint. El despliegue también dejó una lección adicional: la primera versión que contenía la corrección produjo falsos avisos de corrupción relacionados con índices de expresiones y conversiones numéricas. Tailscale y SQLite retiraron esa versión, publicaron otra con el cambio aislado y modificaron sus marcas de tiempo para evitar la ambigüedad de las conversiones de texto a coma flotante.

Para equipos de ingeniería, el caso ofrece un patrón práctico. Una copia de seguridad no demuestra que la restauración funcione; debe comprobarse y ensayarse. La ausencia temporal de incidentes tampoco confirma que el defecto haya desaparecido. La señal más sólida llegó cuando, meses después del arreglo, una alerta confirmó que la condición de carrera seguía ocurriendo en producción, pero ya no provocaba corrupción.

La conclusión no es que SQLite sea inadecuado para sistemas grandes. Es más precisa: una tecnología conocida puede comportarse de forma inesperada cuando se utiliza fuera de sus rutas operativas más probadas. La combinación de instrumentación específica, colaboración con mantenedores, canarios y pruebas de recuperación convirtió un fallo esquivo en una hipótesis verificable y, finalmente, en una corrección demostrada.
