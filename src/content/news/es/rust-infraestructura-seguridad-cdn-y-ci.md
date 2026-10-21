---
translationId: rust-infrastructure-security-cdn-20261012
lang: es
slug: rust-infraestructura-seguridad-cdn-y-ci
title: "Rust refuerza la infraestructura que sostiene crates.io y docs.rs"
description: "El equipo de infraestructura de Rust detalla mejoras de seguridad, CDN, observabilidad, automatización de dependencias y auditoría de GitHub Actions."
publishedAt: 2026-10-12
sourceName: "Inside Rust Blog"
sourceTitle: "Infrastructure Team 2026 Q3 Recap and Q4 Plan"
sourceUrl: "https://blog.rust-lang.org/inside-rust/2026/10/12/infrastructure-team-q3-recap-and-q4-plan/"
author: "Marco Ieni, en nombre del equipo de infraestructura de Rust"
tags: ["seguridad", "supply chain", "cdn", "ci/cd", "rust"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

El resumen trimestral del equipo de infraestructura de Rust ofrece una visión concreta de cómo se protege y opera un ecosistema de paquetes a gran escala. No anuncia una nueva versión del lenguaje: describe controles operativos alrededor de crates.io, docs.rs, los repositorios de Rust y sus pipelines de integración continua. Para equipos que mantienen servicios públicos o repositorios con muchas contribuciones, el valor está en la combinación de medidas pequeñas y verificables.

En seguridad, Rust activó el envío de registros de auditoría de GitHub Enterprise, AWS, Heroku, Wiz, Fastly y Datadog hacia Cloud SIEM. Centralizar esos eventos no evita por sí mismo un incidente, pero permite correlacionar actividad de identidades, infraestructura y proveedores en un mismo sistema de análisis. El proyecto también incorporó protección WAF y mitigación DDoS de Fastly para crates.io y docs.rs. Según el informe, estas medidas ayudaron a mitigar ataques DDoS durante el trimestre y redujeron la carga de docs.rs.

La parte de rendimiento muestra una optimización deliberadamente poco llamativa: eliminar una expresión regular del código de Fastly que procesa descargas de crates y aplicar otros ajustes. El resultado fue un 10 % menos de tiempo de cómputo en los nodos CDN. El equipo advierte que la mayoría de usuarios no percibirá directamente ese cambio porque la red domina la latencia de descarga, pero el menor coste de procesamiento mejora la eficiencia y deja más margen para picos de tráfico.

También se trasladaron recursos estáticos de crates.io, como README y otros archivos, al borde de la red. Las respuestas HEAD para artefactos no comprimibles incorporan ahora Content-Length, lo que corrige problemas encontrados con Buck2. Además, docs.rs envía registros del CDN a Datadog y se mantuvo una pequeña fracción del tráfico en CloudFront como ruta de contingencia. Es una decisión operativa importante: una arquitectura redundante solo es útil si la ruta secundaria se ejercita antes de necesitarla.

En la cadena de suministro, Renovate quedó configurado para abrir actualizaciones de dependencias, lockfiles y GitHub Actions en el repositorio de Rust. Dependabot proporciona alertas de vulnerabilidades, mientras que Rust prefiere que Renovate gestione las actualizaciones automáticas. El proyecto convirtió siete crates en candidatos para trusted publishing, reduciendo la dependencia de credenciales de publicación tradicionales. Para los workflows, crabwatch ejecuta 23 auditorías de Zizmor por defecto, y el proyecto amplía gradualmente esa cobertura.

El informe también conecta seguridad con gobernanza: se añadieron controles de acceso para colaboradores de confianza, colas de merge que esperan a que CI termine correctamente y planes para desplegar infraestructura desde un entorno centralizado, en lugar de ordenadores personales. La conclusión técnica no es que una herramienta resuelva la supply chain. Es que la seguridad operativa mejora cuando los logs, las credenciales, las actualizaciones, la configuración y la recuperación dejan de depender de pasos manuales dispersos. El modelo es transferible a cualquier organización que mantenga software crítico y necesite demostrar cómo se construye, publica y supervisa.
