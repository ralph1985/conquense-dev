---
translationId: ghostaction-github-actions-history-20261009
lang: es
slug: ghostaction-workflows-github-secretos-historial-git
title: "GhostAction vuelve con workflows falsos que extraen secretos del historial de Git"
description: "Una nueva oleada de GhostAction abusó de cuentas legítimas para insertar workflows de GitHub Actions capaces de leer secretos y credenciales históricas."
publishedAt: 2026-10-09
sourceName: "StepSecurity"
sourceTitle: "GhostAction Returns: Malicious “Security Audit” Workflows Now Mine Credentials from Entire Git Histories"
sourceUrl: "https://www.stepsecurity.io/blog/ghostaction-returns"
author: "Rohan Prabhu"
tags: ["seguridad", "github-actions", "supply-chain", "ci-cd", "git"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

StepSecurity ha documentado una nueva oleada de la campaña GhostAction, en la que cuentas legítimas de mantenedores fueron utilizadas para insertar workflows con nombres tranquilizadores como `Security Audit`. La campaña resulta especialmente relevante porque el problema no está en una dependencia vulnerable, sino en la propia automatización de CI/CD y en los permisos que esa automatización hereda.

Según el análisis publicado, el 8 de octubre se produjeron dos barridos masivos. Una cuenta comprometida añadió el workflow a 27 repositorios y otra alcanzó 318 repositorios, incluidos repositorios de código y forks. Los commits parecían cambios normales de mantenimiento y fueron realizados con las identidades reales de los propietarios. En uno de los casos, la inyección llegó directamente a la rama principal de un repositorio de una gran empresa sin pasar por una pull request.

La variante más reciente, `security-audit.yml`, se ejecuta mediante `workflow_dispatch` y ante cualquier `push`, sin limitarse a una rama concreta. Utiliza `fetch-depth: 0`, por lo que descarga el historial completo, y busca credenciales no solo en los secretos configurados actualmente, sino también en referencias presentes en ramas y commits antiguos. Después envía la información a una infraestructura controlada por el atacante. El detalle técnico cambia la respuesta operativa: borrar el archivo malicioso del estado actual no basta, porque la exposición puede haber incluido valores que fueron eliminados hace meses.

La campaña también muestra por qué la identidad del commit no es una defensa suficiente. El atacante opera con la cuenta comprometida, de modo que el autor, el committer y el repositorio pueden parecer legítimos. El nombre del workflow y el mensaje del commit tampoco constituyen una señal fiable. Hay que revisar el contenido, los permisos, los destinos de red y el contexto de ejecución.

La primera medida para un repositorio afectado es asumir la exposición y rotar todos los secretos que el workflow pudo leer. Eso incluye credenciales de Actions, tokens de GitHub, claves de nubes, proveedores de IA, servicios de mensajería y registros de paquetes. También hay que revocar la credencial que permitió la inyección; rotar secretos sin cerrar la vía de acceso deja abierta la posibilidad de una segunda intrusión. El análisis debe cubrir todas las ramas, tags y forks, además de las ejecuciones desde finales de agosto.

El control preventivo más concreto es proteger `.github/workflows/` con revisión obligatoria mediante pull request y limitar la salida de red de los runners a una lista explícita de destinos. Un runner que puede conectarse a cualquier IP es un canal de exfiltración incluso cuando no hay un dominio que bloquear. También resulta razonable exigir aprobación para workflows nuevos o para ejecuciones que manejen secretos.

La noticia recuerda una regla básica de seguridad de software: el pipeline es parte del producto. Sus archivos, permisos, historiales y conexiones deben recibir el mismo nivel de revisión que el código que compila.

Contenido generado automáticamente con IA.
