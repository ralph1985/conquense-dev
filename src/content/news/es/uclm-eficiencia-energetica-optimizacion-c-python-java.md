---
translationId: uclm-energy-optimization-techniques-20260805
lang: es
slug: uclm-eficiencia-energetica-optimizacion-c-python-java
title: "Una investigación de la UCLM mide cuándo optimizar código también ahorra energía"
description: "Un estudio con participación del grupo Alarcos de la UCLM compara 26 técnicas de optimización en C, Python y Java y muestra que sus efectos dependen del lenguaje y del runtime."
publishedAt: 2026-08-05
sourceName: "Wiley Online Library"
sourceTitle: "Evaluating the Energy Efficiency of Optimization Techniques in C, Python, and Java"
sourceUrl: "https://onlinelibrary.wiley.com/doi/full/10.1002/spe.70096"
author: "Carlos Pulido, Félix García, M.ª Ángeles Moraga, Miguel Baños-González, Juan Antonio Rico-Gallego y Javier Corral-García"
tags: ["software sostenible", "eficiencia energética", "ingeniería del software", "castilla-la-mancha", "uclm"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Optimizar un programa para que termine antes no garantiza que consuma menos energía. Una investigación publicada por Wiley con participación de investigadores del Instituto de Tecnologías y Sistemas de Información de la Universidad de Castilla-La Mancha analiza esa diferencia con un experimento controlado sobre C, Python y Java. El trabajo fue difundido también por el grupo Alarcos de la UCLM, con sede en Ciudad Real, y conecta la ingeniería del software regional con un problema cada vez más práctico para centros de datos, dispositivos IoT y aplicaciones de larga duración.

El estudio evalúa 26 técnicas de optimización en implementaciones funcionalmente equivalentes. Cada versión estándar y optimizada produce el mismo resultado, y el paquete experimental se ha publicado para facilitar la reproducción. Los investigadores comparan además el entorno de ejecución: C con GCC en niveles `-O0` y `-O3`; Python con CPython y Nuitka; y Java con la máquina virtual funcionando con o sin compilación Just-In-Time. Esa separación es importante porque un compilador o runtime puede aplicar automáticamente una transformación que interactúa con la modificación escrita por el programador.

Los resultados no respaldan una lista universal de “buenas prácticas energéticas”. Python fue el lenguaje en el que más técnicas produjeron ahorros, un 58%, con reducciones de hasta el 70,38%, pero siguió presentando el consumo total más alto de los tres. Las mayores reducciones individuales alcanzaron el 99,81% en C y el 99,96% en Java. Son cifras de los casos y configuraciones evaluados, no una promesa general para cualquier aplicación.

El contexto de ejecución cambia la conclusión. En Java, por ejemplo, 17 técnicas redujeron el consumo con el JIT desactivado, frente a ocho con el JIT activado; aun así, el modo habitual con JIT mantuvo un consumo global menor. Algunas transformaciones compiten con optimizaciones del compilador. Separar bucles puede perjudicar el trabajo que el JIT habría fusionado, mientras que otras técnicas conservan ventajas en ambos modos.

El estudio también documenta regresiones. En C, la técnica de sentinelas aumentó el consumo un 357,76% bajo `-O3` en uno de los escenarios, aunque reducía energía bajo `-O0`. El uso de buffer para entrada y salida tuvo malos resultados de forma consistente en los tres lenguajes, y las tablas de búsqueda no fueron beneficiosas de manera uniforme. La velocidad, por tanto, no puede utilizarse como sustituto automático de una medición energética: incluso la paralelización puede reducir el tiempo y aumentar el gasto dinámico.

Para los equipos de software, la consecuencia es metodológica. La sostenibilidad debe entrar en las pruebas de rendimiento con una carga representativa, un hardware conocido y el runtime real de producción. Conviene comprobar primero la equivalencia funcional, comparar más de una configuración y conservar los resultados junto al código. El trabajo de la UCLM ofrece una base reproducible para tratar el consumo como una propiedad medible del sistema, no como una intuición derivada del estilo del código.
