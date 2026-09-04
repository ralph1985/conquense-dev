---
translationId: meta-zgateway-zippydb-20260903
lang: es
slug: meta-coloca-zgateway-delante-de-zippydb-para-controlar-la-escalabilidad
title: "Meta coloca un proxy delante de ZippyDB para controlar conexiones, cargas y fallos"
description: "ZGateway transforma una malla de conexiones entre clientes y servidores de ZippyDB en dos saltos acotados, y centraliza batching, caché, control de admisión y observabilidad."
publishedAt: 2026-09-03
sourceName: "Engineering at Meta"
sourceTitle: "ZGateway: Learnings from Putting a Proxy in Front of ZippyDB"
sourceUrl: "https://engineering.fb.com/2026/09/03/core-infra/zgateway-proxy-zippydb-meta/"
author: "Engineering at Meta"
tags: ["sistemas distribuidos", "bases de datos", "fiabilidad", "proxy", "rendimiento"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Meta explica cómo ZGateway, un proxy sin estado situado delante de ZippyDB, está resolviendo un problema de crecimiento que no podía corregirse de forma sencilla en cada cliente. ZippyDB es el almacén de clave-valor más utilizado internamente por Meta y sirve metadatos, contadores y configuración a una flota distribuida capaz de procesar miles de millones de operaciones por segundo.

En el modelo original, cada cliente conectaba directamente con los hosts que alojaban los fragmentos que necesitaba. Un cliente podía tocar decenas de miles de shards repartidos entre cientos de miles de hosts, mientras cada servidor de base de datos aceptaba conexiones de numerosos clientes. El resultado era una malla TLS muchos-a-muchos: conexiones que consumían memoria, CPU y descriptores de archivo incluso cuando estaban inactivas. Un cambio en el comportamiento de pooling o un reinicio coordinado podía producir una tormenta de reconexiones. Meta describe un incidente en el que un error de routing provocó una conexión por shard, agotó los descriptores y llevó a un ciclo de reinicios.

ZGateway convierte esa malla en dos saltos controlados. Los clientes mantienen un pool pegajoso hacia gateways regionales y los servidores de ZippyDB solo reciben conexiones de la flota de proxies, cuyo tamaño y comportamiento puede controlar el equipo de plataforma. La capa termina TLS, aplica ACL, validación, control de admisión por tenant y shaping, resuelve la ubicación del shard y registra métricas, trazas y cuotas por caso de uso. No intenta reimplementar todo el cliente de base de datos: mantiene en otros componentes el mapeo de claves, la selección de réplicas y el hedging.

La posición central también permite combinar peticiones de clientes distintos. Un batcher agrupa operaciones destinadas al mismo shard y las envía en una llamada RPC. El coalescing hace que varias lecturas simultáneas de una misma clave se conviertan en una sola lectura al backend. Esto reduce QPS, CPU y riesgo de stampede en claves calientes. La implementación limita la memoria mediante ventanas de espera, límites de tamaño y número de peticiones, expulsión de entradas inactivas y un tope de operaciones en vuelo cuando el backend se ralentiza.

Meta afirma que ZGateway ya transporta alrededor del 40% del tráfico de ZippyDB, con una previsión superior al 60%, y añade aproximadamente un 6% de sobrecoste computacional en un caso medio. Un modelo con cifras redondeadas estima una reducción del 97-98% en conexiones por host y unas 19 veces menos conexiones persistentes extremo a extremo; son estimaciones del modelo, no una medición universal. En una prueba de sobrecarga, solo seis de unos 1.350 buckets de tenants sufrieron limitación, mientras los demás mantuvieron un 99,9% de ejecución y el goodput quedó cerca del 97-98%.

La decisión no es gratuita: añade una capa operativa y un salto de red. Su valor está en cambiar la ley de escalado. La carga de entrada del backend deja de crecer directamente con el número de clientes y pasa a depender de una flota regional que Meta puede observar, proteger y ajustar. Es una lección aplicable a otros sistemas compartidos: cuando los clientes son numerosos, heterogéneos y difíciles de actualizar, una capa central puede convertirse en el lugar adecuado para controlar el riesgo, siempre que sus límites, aislamiento y reversibilidad estén diseñados desde el principio.
