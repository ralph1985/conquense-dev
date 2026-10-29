---
translationId: selenium-451-bidi-typescript-20261009
lang: es
slug: selenium-451-consolida-bidi-y-publica-sus-atoms-de-javascript-en-typescript
title: "Selenium 4.51 consolida BiDi y publica sus componentes JavaScript escritos en TypeScript"
description: "La nueva versión de Selenium combina generación de código BiDi, soporte de extensiones web y una distribución independiente de sus browser atoms en npm."
publishedAt: 2026-10-09
sourceName: "Selenium"
sourceTitle: "Selenium 4.51 Released!"
sourceUrl: "https://www.selenium.dev/blog/2026/selenium-4-51-released/"
author: "Diego Molina"
tags: ["testing", "javascript", "typescript", "webdriver"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Selenium 4.51 llega con cambios que afectan especialmente a quienes mantienen automatización web en JavaScript y TypeScript. Aunque se presenta como una versión del proyecto, el contenido muestra una dirección técnica clara: sustituir piezas específicas del navegador por componentes tipados, ampliar WebDriver BiDi y hacer más resistente la infraestructura de publicación.

Una de las novedades principales es que los llamados browser atoms, ahora escritos en TypeScript, se publican como el paquete npm independiente `@selenium/atoms`. Estos componentes contienen lógica que Selenium ejecuta dentro del navegador para realizar operaciones comunes. Separarlos en un paquete explícito facilita su distribución y hace visible una frontera de mantenimiento que antes quedaba más integrada en el proyecto principal. También se eliminan los atoms obsoletos relacionados con WebSQL y AppCache, dos tecnologías heredadas que ya no representan la plataforma web actual.

La versión continúa ampliando el soporte de WebDriver BiDi, el protocolo bidireccional que permite una comunicación más rica entre el cliente de automatización y el navegador. Selenium añade generación de clases específicas para proveedores en JavaScript y un generador BiDi para Java. En el caso de Firefox, fija el CDDL del proveedor desde su propio repositorio. La combinación apunta a reducir código manual y a mantener las definiciones del protocolo alineadas con sus fuentes.

Para JavaScript también se incorpora la instalación y desinstalación de extensiones web mediante BiDi, con una caída al protocolo clásico cuando el navegador no ofrece esa capacidad. El patrón es relevante para suites multiplataforma: una API moderna puede ser la ruta preferida, pero la compatibilidad debe estar expresada de forma explícita y verificable. De ese modo, una prueba no falla simplemente porque un entorno todavía necesita el mecanismo anterior.

Otros cambios tienen una relación directa con la mantenibilidad. En Java desaparece Guava como dependencia de los bindings del cliente y se retrasa una retirada incompatible para dar más tiempo de migración. Selenium Manager deja de fallar cuando no puede leer su caché y utiliza metadatos vacíos. En la infraestructura de publicación, los artefactos Java se firman en proceso y el flujo de release puede recuperarse de una publicación incompleta.

Estas decisiones importan porque una plataforma de pruebas no solo debe ejecutar aserciones. También necesita distribuir código de navegador, generar clientes para protocolos en evolución, resolver drivers y publicar artefactos reproducibles. Cada dependencia eliminada, cada fallback documentado y cada recuperación automatizada reduce una clase distinta de fallo operativo.

La lectura útil para los equipos no es actualizar sin revisar. Conviene comprobar si se utilizan imports afectados por la retirada de Guava, si alguna suite depende de los atoms antiguos o si las pruebas de extensiones pueden migrar a BiDi. También merece la pena observar el comportamiento del fallback en los navegadores del pipeline. Selenium 4.51 convierte el mantenimiento del framework en parte visible de la calidad de las pruebas: las capas que sostienen la automatización deben ser tipadas, auditables y capaces de degradarse con seguridad.
