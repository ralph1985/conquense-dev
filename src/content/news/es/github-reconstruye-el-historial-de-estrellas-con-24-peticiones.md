---
translationId: github-star-history-api-20261014
lang: es
slug: github-reconstruye-el-historial-de-estrellas-con-24-peticiones
title: "GitHub reconstruye el historial de estrellas con 24 peticiones en lugar de 2.500"
description: "GitHub presenta una API agregada para consultar tendencias de estrellas sin exponer identidades ni obligar a la base de datos a recorrer todos los registros."
publishedAt: 2026-10-14
sourceName: "GitHub Engineering"
sourceTitle: "From 2,500 requests to 24: Rebuilding star history without the stargazers"
sourceUrl: "https://github.blog/engineering/architecture-optimization/from-2500-requests-to-24-rebuilding-star-history-without-the-stargazers/"
author: "Taylor Cuilty y Sarita Iyer"
tags: ["apis", "arquitectura", "bases-de-datos", "privacidad", "rendimiento"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub ha rediseñado la forma de consultar la evolución temporal de las estrellas de un repositorio. El cambio resuelve a la vez dos problemas que suelen aparecer juntos en sistemas maduros: una API que devuelve más datos de los necesarios y una consulta que sigue siendo cara aunque la respuesta final sea pequeña.

La API anterior estaba pensada para responder a una pregunta concreta: quién ha marcado como favorito un repositorio. Cada página devolvía hasta cien personas y, mediante un formato específico, la fecha en que cada una había añadido la estrella. Algunas herramientas utilizaban esas fechas para construir gráficos históricos, pero descartaban los nombres después de descargarlos. Esa reutilización indirecta convirtió una lista de identidades en un registro temporal improvisado.

El diseño tenía dos costes. Por un lado, facilitaba la extracción masiva de nombres que podían utilizarse para spam o phishing. Por otro, el trabajo crecía con la popularidad del repositorio. Para reconstruir la curva de react/react, con unas 251.000 estrellas, una herramienta podía necesitar alrededor de 2.511 peticiones. Además, cada petición tenía que contar el conjunto completo de estrellas para calcular la paginación. GitHub registró casi 37.000 consultas lentas en una semana, con una duración media cercana a tres segundos; más de mil fueron terminadas por las protecciones de la base de datos.

La solución no consistió simplemente en devolver menos campos. GitHub creó un endpoint agregado que devuelve recuentos diarios agrupados en periodos de hasta treinta semanas y elimina las identidades. La clave está en el orden de las operaciones: cada página se traduce primero a un intervalo de fechas sobre un índice de creación; después se leen las filas de ese intervalo y se agrupan por día. Así, la base de datos procesa el periodo solicitado en lugar de agrupar y ordenar todo el historial antes de aplicar el límite.

En el caso de react/react, el historial completo pasa de unas 2.511 peticiones a unas 24. El sistema examina aproximadamente cada estrella una vez, en vez de reprocesar millones de filas en cada página. GitHub también aplicó el aprendizaje a otras vistas que contaban estrellas bajo demanda y las cambió para utilizar recuentos almacenados en caché.

La lección es útil más allá de GitHub. Un límite sobre la respuesta no garantiza un límite sobre el trabajo interno: LIMIT y OFFSET pueden reducir el JSON sin reducir el escaneo, la agrupación o la ordenación. Diseñar una API debe empezar por la información que necesita el consumidor, no por el modelo histórico que ya existe. El endpoint nuevo conserva algunos límites: las semanas con una concentración excepcional de estrellas pueden seguir siendo costosas, y las bajas de estrellas afectan a la interpretación histórica. Hacer explícitos esos límites forma parte del contrato técnico.
