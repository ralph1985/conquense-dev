---
translationId: vscode-agent-host-2026-08-26
lang: es
slug: vs-code-separa-las-sesiones-de-agentes-del-editor-con-un-host-persistente
title: "VS Code separa las sesiones de agentes del editor con un host persistente"
description: "Microsoft presenta Agent Host y el protocolo AHP para mantener sesiones de agentes activas, sincronizadas y accesibles desde distintos clientes locales o remotos."
publishedAt: 2026-09-06
sourceName: "Microsoft"
sourceTitle: "Introducing the Agent Host for persistent, portable agent sessions"
sourceUrl: "https://code.visualstudio.com/blogs/2026/08/26/agent-host-architecture/"
author: "Rob Lourens, Connor Peet y Brigit Murtaugh"
tags: ["software-engineering", "ai-agents", "architecture", "developer-tools"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

Microsoft ha presentado Agent Host, un proceso separado que se encarga de mantener las sesiones de agentes de VS Code. La propuesta, descrita en una entrada publicada el 26 de agosto, intenta resolver un problema práctico de los asistentes de programación: una sesión larga no debería desaparecer porque el usuario cierre una carpeta, cambie de ventana o se conecte desde otro dispositivo.

Hasta ahora, el agente local se ejecutaba dentro del extension host asociado a cada ventana de VS Code. Esa frontera aislaba las extensiones del núcleo del editor, pero también ataba el ciclo de vida del agente al de una ventana concreta. Cerrar esa ventana detenía el tiempo de ejecución y obligaba a cargar de nuevo parte de la infraestructura al abrir otra. Agent Host mueve el estado de la sesión, los adaptadores de los distintos agentes y las capacidades básicas del espacio de trabajo a un proceso dedicado.

El cambio tiene consecuencias arquitectónicas más interesantes que la simple persistencia. Varias ventanas pueden conectarse al mismo host y mostrar la misma sesión sin crear copias. El usuario puede comenzar un trabajo en el editor, seguirlo desde la ventana Agents y, si el host se ejecuta en otra máquina, observarlo desde VS Code para la web mediante SSH o túneles de desarrollo. La sesión conserva su estado mientras cambian los clientes que la observan.

Para hacer posible esa coordinación, Microsoft ha publicado Agent Host Protocol, o AHP. El protocolo no intenta uniformar la forma en que razona cada agente. Copilot y Claude mantienen sus propios SDK, bucles de ejecución, herramientas y capacidades específicas. AHP estandariza la experiencia de sesión que ven los clientes: conversaciones, permisos, progreso, cancelaciones y cambios producidos en el espacio de trabajo.

Su diseño es deliberadamente orientado al estado. El host mantiene la versión autoritativa y los clientes reciben una instantánea seguida de un flujo ordenado de acciones. Los clientes pueden aplicar cambios de forma optimista, reconciliarlos con las respuestas secuenciadas del host y reproducir acciones perdidas tras una reconexión. Esa estrategia reduce la necesidad de que cada interfaz conozca los detalles internos de cada SDK.

Los canales del protocolo son direccionables mediante URI e incluyen sesiones, chats, terminales y changesets. El modelo de changeset permite describir cambios de código sin imponer que el almacenamiento sea siempre un repositorio Git: también puede representar sistemas de archivos virtuales. Ya existen clientes y bibliotecas para Rust, TypeScript, Kotlin, Go y Swift.

La lección técnica para equipos que construyen herramientas con agentes es clara: las sesiones duraderas necesitan una frontera de ejecución independiente de la interfaz, un estado autoritativo y un mecanismo explícito de sincronización. AHP aún está en desarrollo, pero su separación entre host, cliente y harness ofrece una base concreta para diseñar experiencias remotas y multiagente sin mezclar responsabilidades.
