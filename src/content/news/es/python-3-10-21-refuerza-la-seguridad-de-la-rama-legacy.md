---
translationId: python-31021-20260812
lang: es
slug: python-3-10-21-refuerza-la-seguridad-de-la-rama-legacy
title: "Python 3.10.21 refuerza la seguridad de la rama legacy"
description: "La actualización de seguridad de Python 3.10 corrige vulnerabilidades en parsing, archivos comprimidos, HTTP, XML y carga de código."
publishedAt: 2026-08-12
sourceName: "Python.org"
sourceTitle: "Python 3.10.21"
sourceUrl: "https://www.python.org/downloads/release/python-31021/"
tags: ["python", "seguridad", "supply chain", "software engineering"]
readingTime: 3
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Python 3.10.21, publicada el 12 de agosto, es una actualización de seguridad para una rama que ya solo recibe correcciones de este tipo. No añade las capacidades de una nueva versión de características y se distribuye como código fuente, pero sí reúne cambios relevantes para aplicaciones que todavía dependen de Python 3.10.

La lista afecta a varias superficies que suelen quedar lejos del código de negocio. El cargador `SourcelessFileLoader` cambia la forma de abrir archivos `.pyc` para corregir CVE-2026-2297. `tarfile` recibe varias correcciones para evitar bypasses de sus filtros de extracción y enlaces simbólicos que podrían escapar del directorio de destino. También se corrige una vulnerabilidad de `shutil.unpack_archive()` en Windows relacionada con rutas que contienen prefijos de unidad.

La actualización endurece además componentes de red y protocolos. `http.client` limita el número de líneas de tráiler de una respuesta fragmentada y de respuestas intermedias que puede procesar, evitando que un servidor malicioso mantenga al cliente ocupado indefinidamente. `wsgiref.handlers` rechaza caracteres de control en estados HTTP para prevenir inyecciones de cabeceras. En `webbrowser`, varias comprobaciones impiden que URLs con prefijos o caracteres inesperados atraviesen las protecciones destinadas a evitar invocaciones peligrosas.

También hay correcciones en XML, compresión y normalización Unicode. Se arregla un posible agotamiento de recursos al normalizar secuencias especialmente grandes de caracteres combinantes, se mejora la protección frente a ataques tipo billion laughs y se corrigen errores de memoria en descompresores `bz2` y `lzma`. En conjunto, el alcance muestra por qué una dependencia de runtime debe tratarse como parte de la superficie de ataque, aunque la aplicación no utilice directamente todas sus funciones.

La recomendación operativa depende del modo de instalación. Los equipos que mantengan Python 3.10 deberían comprobar cómo construyen sus imágenes o entornos, incorporar el código fuente corregido y repetir las pruebas de compatibilidad. También conviene revisar si terceros empaquetan el intérprete dentro de una imagen base, una función serverless o una herramienta de automatización: actualizar el `requirements.txt` no actualiza necesariamente el runtime.

La versión no elimina la deuda de permanecer en una rama antigua. Python 3.10 está en fase de correcciones de seguridad y dejará de recibirlas en octubre de 2026. Por eso la actualización inmediata y la migración a una versión soportada son tareas distintas: la primera reduce el riesgo actual; la segunda evita convertir cada aviso futuro en una operación excepcional. El cambio debe validarse con pruebas de archivos comprimidos, parsing HTTP/XML, arranque de workers y reproducibilidad de las imágenes de despliegue.
