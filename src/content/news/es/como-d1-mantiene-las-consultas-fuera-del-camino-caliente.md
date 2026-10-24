---
translationId: cloudflare-d1-control-plane-20261013
lang: es
slug: como-d1-mantiene-las-consultas-fuera-del-camino-caliente
title: "Cómo D1 mantiene las consultas fuera del camino caliente"
description: "Cloudflare explica la arquitectura de control de D1 para gestionar millones de bases de datos SQLite pequeñas sin convertir Postgres en un cuello de botella."
publishedAt: 2026-10-13
sourceName: "Cloudflare Blog"
sourceTitle: "Under the hood, off the hot path: How D1 scales to millions of databases"
sourceUrl: "https://blog.cloudflare.com/d1-control-plane"
author: "David Laban and Lambros Petrou"
tags: ["distributed-systems", "cloud", "databases", "edge", "performance"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha descrito cómo está rediseñando el plano de control de D1, su base de datos serverless basada en SQLite, para operar con millones de bases de datos pequeñas. El caso de uso cambia el supuesto clásico de una aplicación con uno o dos clústeres grandes: las plataformas de generación asistida pueden crear una base por usuario, tenant, entorno de preview o aplicación. El reto no consiste solo en almacenar más datos, sino en evitar que cada consulta dependa de un componente central.

La arquitectura separa tres tipos de trabajo. El plano de datos atiende consultas y debe permanecer cerca del usuario. El plano de control gestiona operaciones como crear, borrar o enumerar bases de datos y puede depender de componentes centrales. El plano asíncrono procesa facturación, analítica y límites de uso, donde la consistencia eventual es aceptable. Esta separación permite que cada camino tenga garantías distintas en lugar de obligar a todas las operaciones a compartir la latencia y la disponibilidad de una única base regional.

Según Cloudflare, D1 multiplicó por 15 el número de bases de datos vivas en un año y por 65 en dos años, mientras que las bases activas diariamente crecieron 18 veces en un año. Para absorber ese crecimiento, las consultas pasan por Workers en el edge y por objetos duraderos que representan cada base. Workers KV conserva metadatos de enrutamiento distribuidos, mientras Hyperdrive proporciona acceso cacheado a réplicas de Postgres cuando el plano de control necesita consultar su fuente de verdad.

La creación de una base ilustra una decisión importante. El sistema puede iniciar el objeto duradero cerca de la solicitud, registrar la creación en Postgres y completar pasos secundarios de forma asíncrona. El punto de confirmación es aquel en el que la base se considera creada, incluso si la respuesta final no llega al cliente. Los reintentos utilizan identificadores nuevos para evitar que dos objetos crean que son propietarios de la misma base. Los latidos periódicos permiten que esos objetos corrijan su estado a partir de la fuente de verdad.

El control de consumo sigue una lógica parecida. Los objetos publican cambios en colas; consumidores limitados los agrupan antes de escribir en Postgres. Para no recalcular la suma de almacenamiento de millones de bases en cada comprobación, el sistema mantiene agregados incrementales por cuenta. Una tabla de cambios acumula deltas y un proceso periódico los aplica en bloque. Esa cifra es deliberadamente eventual: se prioriza que el mecanismo no sobrecargue la base transaccional.

La lección es aplicable fuera de Cloudflare. Un sistema multiinquilino no escala simplemente añadiendo réplicas. Conviene sacar del camino caliente las operaciones administrativas, cachear metadatos de forma segura, aceptar consistencia eventual donde el negocio lo permita y elegir Postgres, una caché distribuida, una cola o un almacén analítico según el tipo de trabajo. También conviene diseñar desde el principio la recuperación de fallos, los reintentos y la idempotencia. La complejidad no desaparece; se coloca donde no penaliza cada consulta.
