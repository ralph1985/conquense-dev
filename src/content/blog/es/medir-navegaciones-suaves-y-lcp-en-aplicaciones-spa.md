---
translationId: cloudflare-soft-navigation-rum
lang: es
slug: medir-navegaciones-suaves-y-lcp-en-aplicaciones-spa
title: "Medir las navegaciones suaves cambia la observabilidad de las SPA"
description: "Cloudflare Web Analytics mejora la medición de navegaciones client-side y separa los datos nativos de Soft Navigation API de sus rutas alternativas."
publishedAt: 2026-08-21
sourceName: "Cloudflare Developers"
sourceTitle: "Web Analytics improves soft navigation measurement for Single Page Applications (SPAs)"
sourceUrl: "https://developers.cloudflare.com/changelog/post/2026-08-21-improved-soft-navigation-measurement-for-single-page-applications/"
author: "Cloudflare Web Analytics"
tags: ["rendimiento web", "SPA", "Core Web Vitals", "RUM", "browser APIs"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha actualizado Web Analytics para mejorar la medición de las navegaciones suaves en aplicaciones de una sola página. El cambio parece pequeño en una interfaz, pero afecta a una pregunta fundamental de rendimiento: cuánto tarda en aparecer el contenido principal después de que una persona cambia de vista sin recargar todo el documento.

En una navegación tradicional, el navegador crea un nuevo contexto de carga y las métricas de esa página se pueden asociar con relativa claridad. En una SPA, React, Angular, Vue, Svelte o una implementación propia pueden interceptar el enlace, modificar el historial y actualizar el DOM sin descargar un documento nuevo. Para la persona usuaria sigue siendo una navegación; para muchas herramientas de medición, durante años fue difícil separar ese evento del trabajo de la pantalla anterior.

La mejora se apoya en la Soft Navigation API de Chrome. Cuando está disponible y la aplicación realiza una navegación client-side, Cloudflare registra el tipo `soft-navigation` y puede medir el Largest Contentful Paint de esa transición. Esto permite observar mejor el rendimiento percibido de las rutas internas, no solo el de la primera carga. Una SPA que arranca rápido pero tarda demasiado al abrir cada vista puede ocultar ese problema si solo se analizan navegaciones completas.

La compatibilidad sigue siendo parte del diseño. Para navegadores sin la API nativa, Cloudflare utiliza una ruta basada en Navigation API o History API y registra `routing-apis`. En ese caso puede conservar otras métricas de Core Web Vitals, pero no puede recopilar LCP para esas navegaciones suaves. La diferencia impide comparar sin más todos los datos como si procedieran del mismo mecanismo. También significa que las decisiones sobre router, historial y actualización del DOM tienen consecuencias directas en la observabilidad.

El cambio puede alterar el volumen de pageviews mostrado en el panel y en la API GraphQL, porque eventos que antes se agrupaban como `navigate` ahora se clasifican con más detalle. Los equipos deberían revisar dashboards, alertas y consultas que dependan de `navigationType`, especialmente si los umbrales se calculan por ruta o por navegador. Una caída aparente puede ser un cambio de clasificación; una mejora aparente puede esconder que solo ha cambiado la cobertura.

La lección técnica es separar navegación, renderizado y medición como responsabilidades relacionadas, pero no idénticas. El router debe emitir transiciones identificables, la interfaz debe actualizar de forma medible y el sistema RUM debe indicar qué método utilizó. Conviene validar los datos con trazas de usuario y pruebas en varios motores, no confiar únicamente en Lighthouse ni en una única sesión local.

Para las SPA maduras, la disponibilidad de LCP en navegaciones suaves ofrece una oportunidad concreta: establecer presupuestos de rendimiento por ruta y detectar regresiones después de cambios de código, datos o arquitectura. La API no elimina la complejidad del frontend, pero hace visible una parte que antes quedaba fuera del cuadro.
