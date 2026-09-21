---
translationId: safari-27-quality-and-web-testing-20260917
lang: es
slug: safari-27-prioriza-la-calidad-y-conecta-los-agentes-con-el-navegador
title: "Safari 27 convierte la calidad del navegador en una herramienta de desarrollo"
description: "La nueva versión de Safari combina un servidor MCP local para agentes de programación con mejoras profundas en WebKit, formularios, desplazamiento, módulos JavaScript y pruebas Web"
publishedAt: 2026-09-17
sourceName: "WebKit"
sourceTitle: "WebKit Features for Safari 27.0"
sourceUrl: "https://webkit.org/blog/18325/webkit-features-for-safari-27-0/"
author: "Jen Simmons, Saron Yitbarek, Tim Nguyen, Antoine Quint y otros colaboradores de WebKit"
tags: ["webkit", "safari", "browser-apis", "web-testing", "accessibility"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Safari 27.0 llega con una lección más interesante que una simple lista de APIs: en la plataforma web, la compatibilidad y la calidad de las implementaciones son una parte central de la infraestructura de desarrollo. WebKit presenta 844 correcciones y mejoras, junto con un nuevo cargador de módulos ES, una reconstrucción de CSS Zoom y ajustes para acercar comportamientos como `innerText` y la caché HTTP a los estándares.

La novedad con mayor impacto en los flujos de ingeniería es la incorporación del servidor MCP de Safari. Se ejecuta en la máquina local y permite que un agente de programación observe el DOM, las peticiones de red, las capturas de pantalla y la salida de consola del navegador. Con esos datos, el agente puede comprobar estados de formularios, comparar estilos calculados entre navegadores, detectar problemas de etiquetas, atributos ARIA o contraste, y consultar tiempos de navegación y carga de recursos. No sustituye al criterio del equipo, pero convierte parte de la verificación manual en un flujo reproducible y observable.

El diseño local también importa. WebKit indica que el servidor no realiza llamadas de red por su cuenta ni accede a la información personal de Safari: los datos capturados se entregan directamente al agente elegido por el desarrollador. Para equipos que experimentan con agentes en tareas de frontend, esa frontera reduce una de las preocupaciones habituales: que una herramienta de depuración tenga más acceso del estrictamente necesario.

Safari 27 también mejora la plataforma base. El elemento `select` personalizable permite construir controles visualmente adaptados sin reemplazar el control nativo por una colección de `div` y JavaScript. El desplazamiento con anclaje evita que la página salte cuando se inserta contenido por encima de la posición actual, un problema frecuente en interfaces con carga progresiva. En componentes y sistemas de diseño, `revert-rule` ofrece una forma más precisa de deshacer declaraciones sin perder el resto de la regla, mientras que `:host:has()` permite que un elemento personalizado reaccione al estado de su propio árbol Shadow DOM.

Hay mejoras menos visibles pero relevantes para proyectos especializados. JavaScript añade compatibilidad completa con top-level `await`; WebAssembly incorpora JSPI para suspender código de aspecto síncrono mientras espera Promesas; WebDriver puede simular credenciales digitales en pruebas; y WebRTC expone más controles y estadísticas relacionadas con latencia, códecs y búferes.

La conclusión práctica no es activar cada función inmediatamente. Es probar la nueva versión en una matriz real de navegadores, observar las diferencias y aprovechar las capacidades nativas cuando resuelvan un problema concreto. Safari 27 muestra que una plataforma madura avanza tanto mediante APIs nuevas como mediante cientos de correcciones que eliminan casos límite, inconsistencias y trabajo de mantenimiento.
