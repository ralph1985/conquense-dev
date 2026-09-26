---
translationId: cloudflare-containers-cross-tenant-vulnerability-20260924
lang: es
slug: cloudflare-detalla-una-fuga-de-datos-entre-contenedores
title: "Cloudflare detalla una fuga de datos entre contenedores"
description: "Cloudflare ha explicado cómo un ajuste de almacenamiento en dm-thin podía exponer bloques residuales de otros contenedores y cómo corrigió el problema en toda su flota."
publishedAt: 2026-09-24
sourceName: "Cloudflare Blog"
sourceTitle: "How Cloudflare addressed a cross-tenant data exposure vulnerability in Containers"
sourceUrl: "https://blog.cloudflare.com/containers-cross-tenant-vulnerability/"
author: "Rushil Mehra, Cody Roseborough, Avishek Sarkar y Hrushikesh Deshpande"
tags: ["cloud-security", "containers", "multi-tenant-security", "vulnerability"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha publicado el análisis técnico de una vulnerabilidad de aislamiento entre clientes en Cloudflare Containers y Cloudflare Sandboxes. Un investigador de Accomplish la comunicó el 4 de septiembre mediante el programa de recompensas de errores. Cloudflare afirma que corrigió el problema, completó la limpieza de los datos potencialmente afectados y no encontró evidencias de explotación maliciosa.

El fallo estaba relacionado con la forma de reutilizar almacenamiento en Linux device mapper thin provisioning. Cada contenedor recibía un disco raíz escribible dentro de una máquina virtual ejecutada con Firecracker. Los volúmenes eliminados devolvían sus bloques físicos a un conjunto compartido por cargas de trabajo de distintas cuentas.

El detalle decisivo era la opción skip_block_zeroing. Con ella activada, dm-thin no limpiaba un bloque físico antes de asignarlo a otro volumen. El tamaño de bloque utilizado era de 64 KiB. Una escritura pequeña de 4 KiB podía provocar la asignación del bloque y sustituir solo una parte; los 60 KiB restantes podían conservar bytes del propietario anterior.

La lectura directa de una región todavía no asignada devolvía ceros, por lo que el problema no aparecía con una comprobación superficial. La prueba de concepto localizaba regiones alineadas con bloques de 64 KiB, escribía un bloque de 4 KiB y después examinaba el contenido restante mediante el dispositivo de almacenamiento. Los investigadores utilizaron comprobaciones de directorios ext4 para distinguir los bloques de prueba de los procedentes de otros sistemas de archivos.

Según Cloudflare, el material residual apareció en 18 de 24 ubicaciones y en 20 de 22 nodos subyacentes examinados. Se identificaron estructuras de directorios, páginas de bases de datos y bases SQLite completas desde el punto de vista estructural. La técnica no permitía elegir una víctima concreta, un contenedor específico o un host determinado, y dependía de la colocación de las cargas y de la reutilización de bloques.

La mitigación tuvo dos partes. Primero, Cloudflare eliminó skip_block_zeroing para recuperar el comportamiento predeterminado de dm-thin, que limpia las nuevas asignaciones. Después retiró discos de contenedores en ejecución y snapshots de imágenes OCI creados antes del cambio, drenó hosts y reconstruyó las capas con bloques inicializados.

El caso recuerda que el aislamiento de contenedores no termina en el proceso o en el hipervisor. También depende de las garantías del almacenamiento, de sus tamaños de bloque, de las cachés y de las operaciones de reciclaje. La respuesta resulta especialmente instructiva porque combina divulgación técnica, reproducción controlada, detección retrospectiva mediante telemetría y limpieza de artefactos antiguos.
