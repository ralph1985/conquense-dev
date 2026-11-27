---
translationId: vite84-dev-server-file-allowlist-20261126
lang: es
slug: vite-84-servidor-desarrollo-lista-permitidos
title: "Vite 8.4 cambia cómo proteger los archivos del servidor de desarrollo"
description: "La nueva comprobación por lista de permitidos plantea una revisión concreta de permisos, plugins y pruebas en los proyectos frontend."
publishedAt: 2026-11-26
sourceName: "Vite"
sourceTitle: "Vite 8.4 is out!"
sourceUrl: "https://vite.dev/blog/announcing-vite8-4"
author: "Redacción Conquense Dev"
tags: ["javascript", "vite", "frontend", "security", "testing"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Vite publicó el 26 de noviembre una actualización con una novedad especialmente relevante para la seguridad del desarrollo frontend: permitir que el acceso a archivos dependa de referencias conocidas desde el punto de entrada. La combinación `server.fs.strict: 'extended'` y `server.fs.allow: []` activa este enfoque. Sigue siendo opcional; el equipo pretende convertirlo en predeterminado en la próxima versión mayor. [Anuncio de Vite 8.4](https://vite.dev/blog/announcing-vite8-4).

La lección técnica es revisar qué significa autorizar un recurso. Una carpeta compartida puede contener materiales necesarios para una aplicación y otros que nunca deberían llegar al navegador. Una comprobación basada en las dependencias permite razonar sobre recursos concretos. Como criterio de ingeniería, esto invita a documentar por qué necesita acceso cada parte del proyecto, además de comprobar que la página principal funciona.

También conviene distinguir las distintas barreras. La documentación de Vite explica que `server.host` determina dónde escucha el proceso y que `server.allowedHosts` controla los nombres de host aceptados. Advierte además de que permitir cualquier host facilita ataques de DNS rebinding. Son controles diferentes del acceso al sistema de archivos: revisar uno no sustituye revisar los demás. [Opciones del servidor](https://vite.dev/config/server-options).

Los plugins merecen una revisión específica. La API documenta `this.environment.addSafeModule` para registrar recursos seguros que una transformación referencia de maneras que el análisis automático no reconoce. Esto proporciona un punto explícito para declarar esa relación. Para quien mantiene una integración, la consecuencia práctica es tratar esa declaración como parte del contrato del plugin y justificarla durante la revisión del código. [API de entornos para plugins](https://vite.dev/guide/api-environment-plugins).

Una adopción razonable empezaría en una rama de prueba. La propuesta editorial es recorrer las rutas principales, cargar componentes diferidos y comprobar imágenes, fuentes y hojas de estilo. Después, intentar solicitar un archivo de prueba ajeno a las dependencias esperadas. Así se evalúan tanto la disponibilidad de los recursos necesarios como la denegación de los innecesarios. Un arranque sin errores solo cubre una parte de esa comprobación.

En un monorepositorio, también sería útil inventariar los recursos compartidos antes de ampliar permisos para resolver un fallo. Si una fuente deja de cargar, conviene localizar qué transformación produce su URL y qué relación falta declarar. Autorizar de golpe un directorio superior puede ocultar esa información y dificultar futuras revisiones. Esta es una recomendación de adopción, no un resultado de pruebas propias.

El interés de Vite 8.4 supera, por tanto, la actualización de una dependencia: ofrece una ocasión concreta para hacer verificable la frontera entre los archivos del proyecto y los que el navegador necesita recibir. La decisión útil para cada equipo es probar esa frontera con su aplicación y sus plugins.
