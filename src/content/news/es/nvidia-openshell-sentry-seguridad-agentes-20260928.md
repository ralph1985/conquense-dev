---
translationId: nvidia-agent-safety-openshell-sentry-20260928
lang: es
slug: nvidia-openshell-sentry-seguridad-agentes-20260928
title: "NVIDIA lleva la seguridad de los agentes fuera del modelo con OpenShell y Sentry"
description: "La propuesta combina un entorno de ejecución aislado con supervisión independiente en hardware para controlar permisos, observar desvíos y detener acciones no autorizadas."
publishedAt: 2026-09-28
sourceName: "NVIDIA Technical Blog"
sourceTitle: "NVIDIA Open Agent Safety Platform: A Reference for Continuous In-Silicon Agent Monitoring"
sourceUrl: "https://developer.nvidia.com/blog/nvidia-open-agent-safety-platform-a-reference-for-continuous-in-silicon-agent-monitoring"
author: "John Myers, Alex Watson, Ali Golshan y Ofir Arkin"
tags: ["security", "ai agents", "sandboxing"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

NVIDIA ha presentado una arquitectura de referencia para proteger agentes de inteligencia artificial mediante controles que viven fuera del modelo y del proceso principal del agente. Su propuesta combina OpenShell, un entorno de ejecución abierto y aislado, con Sentry, un supervisor que puede ejecutarse de forma independiente en unidades de procesamiento de datos BlueField-4.

La decisión de diseño responde a un problema conocido: un modelo puede recibir instrucciones de seguridad, pero no debería ser la única entidad responsable de obedecerlas. Un agente que escribe código, utiliza herramientas, accede a archivos o realiza peticiones de red puede desviarse de su objetivo por una instrucción ambigua, un error, una dependencia inesperada o una secuencia de acciones que nadie había previsto. Si la política vive dentro del mismo proceso que se intenta controlar, el límite puede quedar demasiado cerca de la superficie que se quiere proteger.

OpenShell coloca al agente en un sandbox con aislamiento a nivel del kernel. Los operadores pueden definir a qué archivos, redes, herramientas, procesos y credenciales tiene acceso. La política se comprueba antes de iniciar la ejecución y se aplica mientras el agente trabaja. La arquitectura incorpora un gateway para gestionar identidades, ciclos de vida y políticas, además de un supervisor que inspecciona solicitudes de red y entrega credenciales solo cuando la política lo permite. Las decisiones de permitir o denegar quedan registradas para auditoría.

Sentry añade una segunda capa fuera de banda. Según NVIDIA, el componente utiliza BlueField-4 y el software DOCA para observar las interacciones del agente, las decisiones de política y el acceso a herramientas y datos. Al situarse en un dominio separado del host, puede detectar una desviación y aplicar una política sin depender de que el propio agente coopere. En el diseño descrito, también puede actuar como mecanismo de interrupción o cuarentena cuando una actividad intenta salir de sus límites.

El artículo resume la arquitectura en cinco principios: las políticas deben ser verificables; la aplicación debe ser independiente del agente; el camino hacia el modelo puede funcionar como punto de control; la autoridad concedida debe crecer junto con la capacidad de inspeccionar el comportamiento; y la responsabilidad debe repartirse entre laboratorios, empresas y proveedores de infraestructura. No son sustitutos de una revisión de código, de una identidad bien gestionada ni de pruebas de abuso, pero sí ayudan a colocar cada control en una capa concreta.

La importancia práctica está en cambiar el centro de gravedad de la seguridad. Un prompt que diga “no accedas a este archivo” es una instrucción; una política aplicada por un runtime aislado es un límite técnico. La primera puede ser útil para orientar al modelo, pero la segunda es la que debería proteger un sistema real.

La propuesta está optimizada para plataformas de NVIDIA, aunque la compañía afirma que OpenShell puede extenderse a otros sistemas. Como ocurre con cualquier arquitectura de referencia, queda trabajo de integración: probar reglas con tareas reales, revisar falsos positivos, definir permisos mínimos, proteger el canal de administración y verificar que la telemetría sea suficiente para reconstruir una acción. El mensaje más sólido no es que el hardware resuelva la seguridad de los agentes, sino que los agentes necesitan controles independientes, observables y difíciles de eludir.
