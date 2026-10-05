---
translationId: ci-cd-supply-chain-defense-20260924
lang: es
slug: defensa-cadena-suministro-puesto-desarrollador-ci-cd
title: "La defensa de la cadena de suministro empieza en el puesto del desarrollador"
description: "Mandiant propone una estrategia de defensa en profundidad que conecta estaciones de trabajo, repositorios, dependencias, runners de CI/CD y despliegues."
publishedAt: 2026-09-24
sourceName: "Google Cloud Blog"
sourceTitle: "Proactive Defense: Hardening Code Pipelines and CI/CD Infrastructure"
sourceUrl: "https://cloud.google.com/blog/topics/threat-intelligence/hardening-code-pipelines-and-ci-cd-infrastructure"
author: "Mandiant"
tags: ["security", "software-supply-chain", "ci-cd", "developer-tools", "zero-trust"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Mandiant sostiene que la seguridad de la cadena de suministro de software ya no puede tratarse como una comprobación aislada al final de la compilación. Su guía, publicada por Google Cloud, describe ataques que combinan puestos de desarrollo, extensiones de IDE, dependencias, repositorios y automatizaciones de CI/CD. La consecuencia práctica es que el perímetro de seguridad empieza antes del primer commit.

Entre las técnicas señaladas aparecen el envenenamiento de cachés de GitHub Actions, la extracción de tokens OIDC y la sustitución de etiquetas mutables para publicar paquetes que todavía parecen tener una procedencia legítima. También se mencionan extensiones maliciosas, dependencias con nombres parecidos a las legítimas y herramientas de IA con privilegios elevados dentro de los pipelines. El problema no es solo que un paquete contenga código dañino; es que puede entrar por una ruta que el sistema ya considera confiable.

La primera capa propuesta es el equipo del desarrollador. Mandiant recomienda escaneo local de secretos mediante hooks de pre-commit y herramientas integradas en el IDE, además de versiones aprobadas y fijadas para editores, extensiones e integraciones. Los tokens deben tener permisos mínimos y una vida corta. Cuando sea posible, los entornos de desarrollo deberían ejecutarse en contenedores o máquinas virtuales endurecidas, con acceso limitado al sistema de archivos y a la red del equipo anfitrión.

En los repositorios, la guía recomienda autenticación resistente al phishing, protección de ramas y una política de no escribir directamente en la rama principal. Las credenciales de larga duración deberían sustituirse por identidades temporales y vinculadas a una tarea. Para dependencias, propone versiones exactas, lockfiles verificados, análisis de composición de software y generación de un SBOM. Las imágenes y acciones de terceros deben referenciarse mediante resúmenes criptográficos o hashes de commits, no mediante etiquetas que puedan cambiar sin aviso.

El texto también presta atención a los artefactos. Sugiere establecer un periodo de espera antes de permitir que una versión recién publicada entre en las compilaciones, usar proxies internos con cuarentena y verificar la procedencia firmada antes de promocionar un paquete. Estas medidas añaden fricción, pero convierten la instalación de dependencias en una decisión controlada y trazable.

En CI/CD, la recomendación central es reducir el estado persistente. Los runners efímeros, los límites de red, la separación de cachés por nivel de confianza y la aprobación manual para código procedente de forks reducen las posibilidades de persistencia. Los permisos deben ser nulos o de solo lectura por defecto, y cada pipeline debe solicitar únicamente lo que necesita.

La enseñanza técnica es que una firma o un escáner no bastan por separado. La defensa efectiva encadena identidad, aislamiento, procedencia, políticas y monitorización desde la estación de trabajo hasta producción. Diseñar esa cadena también mejora la mantenibilidad: los controles quedan expresados como configuración verificable y no como conocimiento informal que solo conoce una persona del equipo.

Contenido generado automáticamente con IA.
