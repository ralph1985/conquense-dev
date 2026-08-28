---
translationId: github-august-17-outage
lang: es
slug: github-analiza-el-apagon-del-17-de-agosto-y-sus-lecciones-de-escala
title: "El apagón de GitHub muestra que la escala también falla sin cambios de código"
description: "El análisis de GitHub atribuye una interrupción global de 7 horas y 47 minutos a una falta de capacidad que se propagó por autenticación, Actions, APIs y Copilot"
publishedAt: 2026-08-20
sourceName: "The GitHub Blog"
sourceTitle: "The August 17 outage, and the work ahead"
sourceUrl: "https://github.blog/news-insights/company-news/the-august-17-outage-and-the-work-ahead/"
author: "Vlad Fedorov"
tags: ["github", "fiabilidad", "sistemas distribuidos", "observabilidad", "arquitectura"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

GitHub publicó el 20 de agosto el análisis inicial de la interrupción sufrida el día 17. El incidente duró 7 horas y 47 minutos y afectó a github.com, la autenticación, GitHub Actions, las APIs, pull requests, issues y varios servicios de Copilot. La explicación es técnicamente útil porque no apunta a un despliegue defectuoso: el origen fue una combinación de crecimiento, capacidad insuficiente y dependencias que amplificaron el fallo.

Según GitHub, el tráfico alcanzó un nuevo máximo y un componente crítico de su centro de datos de Central US no pudo escalar a tiempo. La presión de capacidad se extendió por los sistemas y provocó fallos de autenticación. La recuperación exigió desviar tráfico, aislar infraestructura afectada y restaurar servicios por etapas. Durante ese proceso, algunos errores de Copilot activaron un bucle de reintentos en el cliente que incrementó todavía más el tráfico. El equipo tuvo que contener ese comportamiento antes de devolver carga a los servicios.

La compañía califica tanto este incidente como otro fallo de Actions ocurrido el 6 de agosto como fallos de capacidad, no de cambios de código o configuración. El contexto ayuda a entender la presión: GitHub afirma que los commits mensuales pasaron de 1.400 millones en abril a 2.900 millones. El crecimiento explica la tensión, pero no sustituye a la planificación de capacidad ni a los límites de seguridad operativa.

La respuesta anunciada combina infraestructura y arquitectura. GitHub dice haber añadido más de tres millones de núcleos de CPU, 120 petabytes de almacenamiento rápido y capacidad de red adicional, mientras acelera la migración a Azure. En el momento de la publicación, Azure soportaba aproximadamente el 58% de la carga de la plataforma y la mitad de las operaciones Git, frente al 12% de la carga de plataforma en mayo.

También hay trabajo menos visible y más relevante para otros equipos. GitHub está desarrollando una arquitectura en la que la capacidad de lectura de los repositorios monolíticos crezca linealmente con el número de lectores. Además, está aislando sistemas críticos, eliminando dependencias compartidas, reforzando pruebas, despliegues seguros, observabilidad y alertas. Tras los incidentes de agosto, anunció límites homogéneos de reintentos, presupuestos de retry y timeouts variables para evitar tormentas de reintentos y carga en cascada.

La lección no es que escalar hardware resuelva la fiabilidad. Es que el diseño de resiliencia debe cubrir el comportamiento de los clientes durante una degradación, la capacidad de recuperación y los límites entre servicios. Para cualquier plataforma, el incidente sugiere revisar tres puntos: qué componente define el techo real de capacidad, qué reintentos convierten un fallo parcial en una tormenta y qué dependencias compartidas permiten que un problema local alcance a todo el producto.
