---
translationId: chrome-debugger-enterprise-policy-20260908
lang: es
slug: chrome-155-restringe-chrome-debugger-en-entornos-empresariales
title: "Chrome 155 endurecerá el uso de chrome.debugger en entornos empresariales"
description: "Chrome 155 convertirá ciertas restricciones empresariales en rechazos explícitos al conectar extensiones con el protocolo de depuración de Chrome. El cambio obliga a revisar extens"
publishedAt: 2026-09-08
sourceName: "Chrome for Developers"
sourceTitle: "Stricter enterprise policy enforcement for chrome.debugger in Chrome 155"
sourceUrl: "https://developer.chrome.com/blog/debugger-enterprise-policy-restrictions?hl=en"
author: "Chrome for Developers"
tags: ["browser-security", "chrome-extensions", "enterprise", "web-platform"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Chrome ha anunciado un cambio de seguridad que afectará a las extensiones que utilizan la API `chrome.debugger` en navegadores gestionados. La modificación llegará con Chrome 155: la beta está prevista para el 16 de septiembre de 2026 y el despliegue estable comenzará el 6 de octubre. No cambia el comportamiento de los perfiles personales ni de los navegadores no administrados, pero sí puede romper extensiones internas usadas en organizaciones con políticas de bloqueo de hosts, captura de pantalla o prevención de pérdida de datos.

La razón técnica está en el alcance de la API. `chrome.debugger` proporciona acceso directo al Chrome DevTools Protocol, lo que permite evaluar scripts, interceptar tráfico y ejecutar operaciones que quedan por debajo del modelo normal de orígenes de la plataforma web. Por eso, Chrome considera insuficiente filtrar parcialmente los destinos mediante listas de hosts permitidos y bloqueados. En los casos afectados, `chrome.debugger.attach()` adoptará una decisión de todo o nada y rechazará la conexión antes de que la extensión pueda operar.

El detalle importante para los equipos de desarrollo es que una lista no vacía en `runtime_blocked_hosts` puede impedir la conexión en todos los destinos, aunque algunos aparezcan también en `runtime_allowed_hosts`. Del mismo modo, si la organización desactiva las capturas de pantalla o aplica reglas DLP equivalentes, la conexión fallará con un error específico. La extensión debe tratar estos rechazos como un estado esperado de configuración, no como una avería transitoria que se resuelve reintentando.

La recomendación de Chrome es gestionar explícitamente el error y ofrecer una explicación útil al usuario empresarial. También conviene valorar si la extensión necesita realmente CDP. Para ejecutar scripts o insertar estilos, `chrome.scripting` ofrece un nivel de abstracción más alto y encaja mejor con permisos por host. Para inspeccionar o modificar solicitudes, `declarativeNetRequest` puede cubrir parte del caso sin conceder acceso completo al depurador. `chrome.cookies` también mantiene el modelo habitual de permisos de extensiones.

El cambio deja una lección aplicable más allá de Chrome. Las APIs con privilegios amplios suelen crear conflictos cuando se combinan con las políticas de administración centralizada. Probar una extensión únicamente en un perfil de desarrollo no revela esos fallos: las pruebas deben incluir políticas empresariales reales, restricciones de DLP y listas de hosts representativas. Para los equipos que mantienen automatización de navegador, herramientas de QA o extensiones de soporte, el trabajo prioritario es catalogar los permisos utilizados, reproducir los rechazos en Chrome 155 y definir una ruta de degradación clara. La compatibilidad aquí no depende solo de la API, sino también del contexto de gobierno en el que se ejecuta.
