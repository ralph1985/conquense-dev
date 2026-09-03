---
translationId: tech-2026-08-npm-release-workflow-compromise
lang: es
slug: el-caso-npm-que-rompe-la-confianza-en-la-provenance
title: "El incidente de npm demuestra que la provenance no basta"
description: "Diez versiones maliciosas de un generador de React Query llegaron al registro mediante un workflow de GitHub Actions que ejecutaba código no confiable con identidad de publicación."
publishedAt: 2026-08-28
sourceName: "GitHub Security Advisories"
sourceTitle: "Malicious versions of @7nohe/openapi-react-query-codegen published via a compromised release workflow"
sourceUrl: "https://github.com/7nohe/openapi-react-query-codegen/security/advisories/GHSA-9pvf-vcx3-x239"
author: "7nohe"
tags: ["security", "javascript", "npm", "supply-chain", "github-actions"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

El 28 de agosto se publicaron diez versiones maliciosas de `@7nohe/openapi-react-query-codegen`, un paquete que genera hooks de React Query a partir de especificaciones OpenAPI. El incidente es especialmente útil para equipos JavaScript porque no dependió de una contraseña de npm robada. El problema estuvo en la frontera entre una pull request no confiable y un workflow de publicación con privilegios.

El workflow escuchaba comentarios sobre issues y pull requests. Si el texto era `npm publish`, podía iniciar el proceso sin comprobar adecuadamente la relación del autor con el repositorio. Después, el job obtenía el código de la cabeza de la pull request y ejecutaba `pnpm install`. Esa combinación permitía que código controlado desde un fork se ejecutara dentro de un job con `id-token: write`, suficiente para usar trusted publishing de npm y publicar bajo la identidad legítima del proyecto.

El resultado fueron versiones estables y preliminares publicadas entre las 20:00 y las 20:21 UTC. Las versiones afectadas incluían `0.5.4`, `0.5.5`, `1.6.3`, `1.6.4`, `2.2.1`, `2.2.2`, `3.0.3`, `3.0.4` y dos prereleases. Los artefactos añadían un archivo JavaScript ofuscado de varios megabytes y, en algunos casos, un hook `preinstall`. Otras versiones utilizaban `binding.gyp` para activar el mismo payload cuando intervenía node-gyp. Por eso no basta con buscar un único script de instalación.

El caso contiene una lección incómoda sobre la provenance. Las versiones maliciosas conservaron attestations válidas de SLSA porque fueron publicadas por el workflow real y mediante la identidad real. Esa evidencia demuestra dónde y con qué proceso se construyó un artefacto, pero no demuestra que el código ejecutado por ese proceso fuera benigno. La procedencia debe combinarse con revisión de cambios, controles de autorización y análisis del contenido publicado.

La corrección arquitectónica es separar claramente construir, verificar y publicar. Un job que analiza código de una pull request no debería tener credenciales de publicación ni permisos OIDC capaces de obtenerlas. La publicación debe partir de un commit o tag protegido, con revisores explícitos, restricciones sobre quién puede activar el workflow y una lista mínima de permisos. Los scripts de instalación y los archivos de build merecen atención especial porque se ejecutan antes de que la aplicación importe el paquete.

Para los consumidores, el aviso recomienda evitar las versiones afectadas, revisar lockfiles y rotar credenciales accesibles desde cualquier máquina o runner que las haya instalado. Para los mantenedores, la enseñanza es más amplia: la automatización de releases forma parte del perímetro de seguridad. Un workflow corto y cómodo puede ser también una ruta directa desde una contribución externa hasta todo el ecosistema de dependencias.
