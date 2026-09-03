---
translationId: python-315-rc2
lang: es
slug: python-315-rc2-ultima-candidata-antes-del-lanzamiento
title: "Python 3.15 llega a su última candidata antes del lanzamiento"
description: "La segunda release candidate de Python 3.15 fija la ABI y abre la fase final para probar paquetes, ruedas binarias y cambios de rendimiento antes del lanzamiento previsto para el 1"
publishedAt: 2026-09-01
sourceName: "Python Insider"
sourceTitle: "Python 3.15.0 candidate 2 is here!"
sourceUrl: "https://blog.python.org/2026/09/python-3150-rc2/"
author: "Hugo van Kemenade"
tags: ["python", "release", "rendimiento", "tooling"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Python 3.15.0rc2, publicada el 1 de septiembre, es la última candidata de lanzamiento prevista para la nueva versión del intérprete. El proyecto anuncia alrededor de 144 correcciones de errores, mejoras de compilación y cambios de documentación incorporados desde rc1. A partir de esta fase solo se aceptan cambios revisados que sean correcciones claras, y el lanzamiento final está previsto para el 1 de octubre de 2026.

La consecuencia más práctica para los equipos no está en instalar ya la candidata en producción, sino en comenzar las pruebas de compatibilidad. El proyecto indica que no habrá más cambios de ABI desde este punto y que las ruedas binarias construidas contra Python 3.15.0rc2 funcionarán con las futuras versiones 3.15. Eso permite a los mantenedores publicar ruedas en PyPI, detectar problemas de compilación y comprobar extensiones nativas antes de que llegue la versión estable.

La serie incorpora cambios con impacto en arranque, observabilidad y concurrencia. Las importaciones perezosas explícitas pueden reducir trabajo inicial cuando una aplicación no necesita todos sus módulos desde el primer momento. También llegan `frozendict` como tipo integrado, un tipo `sentinel` dedicado y un paquete de profiling orientado a organizar herramientas de análisis. Los frame pointers quedan habilitados por defecto para mejorar la observabilidad a nivel de sistema.

El proyecto también comunica mejoras del compilador JIT: entre un 8 y un 9 % de mejora media geométrica en x86-64 Linux frente al intérprete estándar, y entre un 12 y un 13 % en AArch64 macOS frente al intérprete con tail calls. Son cifras del propio equipo y deben interpretarse como referencias de sus benchmarks, no como una garantía para cualquier aplicación. El contexto de ejecución, las extensiones y la carga real seguirán siendo determinantes.

Hay además cambios relevantes para la distribución oficial. Los binarios de Windows de 64 bits usan ahora el intérprete con tail calls, mientras que los binarios oficiales de macOS instalan por defecto soporte para free-threading. Esto aconseja ampliar la matriz de CI: probar versiones con y sin extensiones nativas, revisar ruedas específicas de plataforma y comprobar bibliotecas que dependan de supuestos sobre el intérprete o el ABI.

Para los usuarios de aplicaciones, la recomendación es esperar al lanzamiento estable. Para quienes mantienen librerías, servidores o herramientas, la ventana actual es especialmente valiosa: permite encontrar incompatibilidades cuando todavía pueden corregirse dentro del ciclo final. Probar pronto, documentar los fallos y publicar ruedas compatibles reduce la fricción del cambio cuando Python 3.15 llegue a producción.
