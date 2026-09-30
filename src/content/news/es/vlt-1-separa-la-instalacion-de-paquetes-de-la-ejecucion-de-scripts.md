---
translationId: vlt-1-package-security-20260907
lang: es
slug: vlt-1-separa-la-instalacion-de-paquetes-de-la-ejecucion-de-scripts
title: "vlt 1.0 separa la instalación de paquetes de la ejecución de scripts"
description: "El nuevo gestor compatible con npm introduce instalaciones por fases, consultas sobre el grafo de dependencias y bloqueo de paquetes maliciosos conocidos."
publishedAt: 2026-09-07
sourceName: "InfoQ"
sourceTitle: "vlt 1.0 Ships as a Drop-in npm Replacement with Phased Installs, Graph Queries, and Malware-Blocking"
sourceUrl: "https://www.infoq.com/news/2026/09/vlt-npm-replacement/"
author: "Daniel Curtis"
tags: ["javascript", "npm", "supply-chain", "security"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

La instalación de dependencias sigue siendo uno de los puntos más delicados de cualquier proyecto JavaScript. Descargar un paquete no siempre significa únicamente copiar archivos: los scripts de ciclo de vida pueden ejecutarse durante la instalación, acceder al entorno de CI y leer credenciales antes de que el equipo haya revisado qué acaba de entrar en el árbol. vlt 1.0, creado por parte del equipo original de npm, intenta reducir esa confianza implícita sin abandonar la compatibilidad con el ecosistema existente.

Su cambio más importante es la instalación por fases. `vlt install` descarga y extrae las dependencias, pero no ejecuta automáticamente sus scripts. La ejecución se traslada a `vlt build`, donde el equipo puede aprobar qué paquetes deben construir componentes nativos o realizar tareas de preparación. El diseño no convierte una dependencia en segura por arte de magia, pero sí separa dos acciones que normalmente ocurren juntas: introducir código externo y permitirle ejecutar código local.

La distinción tiene valor especial en CI y en flujos de agentes. Un lockfile fija versiones, pero no responde por sí solo a la pregunta de qué ocurrirá cuando una dependencia lance un script postinstall. Con una fase explícita, las políticas pueden inspeccionar el grafo antes de activar ese comportamiento, registrar la decisión y fallar de forma visible cuando aparece una excepción. También reduce la superficie de una instalación exploratoria en un portátil de desarrollo, aunque no sustituye el aislamiento del sistema ni la revisión de los paquetes.

La segunda pieza es `vlt query`, un lenguaje de selectores para consultar el grafo de dependencias. Sus más de 60 selectores permiten localizar paquetes por relaciones, procedencia o propiedades de seguridad, y algunos están orientados expresamente a identificar riesgos. Las consultas pueden producir una vista Mermaid, útil para explicar por qué una aplicación depende indirectamente de una biblioteca concreta. Ese enfoque convierte la dependencia en un objeto inspeccionable: no basta con saber que existe un paquete, también importa quién lo introduce, qué scripts tiene y qué otros proyectos lo comparten.

vlt añade además registros y espejos compatibles con la API de npm que rechazan paquetes maliciosos conocidos antes de servirlos. El proyecto afirma haber identificado cientos de miles de versiones problemáticas; esa cifra procede de sus propios sistemas y no debe interpretarse como una medida completa del malware existente en npm. La ventaja arquitectónica está en colocar un control en el registro, además de los controles locales del gestor y del repositorio.

La migración no es gratuita. Aparecen `vlt.json` y `vlt-lock.json`, hay que revisar la resolución de configuración y los equipos deben entender cuándo aprobar `build`. Los benchmarks de instalación tampoco convierten a vlt en el gestor más rápido para todos los escenarios. Su interés reside en otro sitio: hacer explícita la frontera entre resolver dependencias y ejecutar código. En una cadena de suministro cada vez más automatizada, esa frontera es una decisión de seguridad, no un detalle de ergonomía.
