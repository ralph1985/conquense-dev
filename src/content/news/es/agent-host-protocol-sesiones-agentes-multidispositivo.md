---
translationId: agent-host-protocol-session-continuity-20261117
lang: es
slug: agent-host-protocol-sesiones-agentes-multidispositivo
title: "Agent Host Protocol: continuar una sesión exige diseñar el estado"
description: "GitHub explica su protocolo para compartir sesiones de agentes entre aplicaciones. La lección técnica está en las reconexiones, las acciones y los permisos."
publishedAt: 2026-11-17
sourceName: "GitHub Blog"
sourceTitle: "Building the Agent Host Protocol for sessions that continue across devices"
sourceUrl: "https://github.blog/engineering/engineering-principles/building-the-agent-host-protocol-for-sessions-that-continue-across-devices/"
author: "Redacción Conquense Dev"
tags: ["arquitectura", "ia-aplicada", "sistemas-distribuidos", "typescript"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

GitHub publicó el 17 de noviembre una explicación de Agent Host Protocol, desarrollado inicialmente en VS Code para compartir sesiones de agentes entre clientes. Su arquitectura utiliza canales identificados mediante URI y estado basado en reducers, con el servidor como autoridad. Los autores describen implementaciones en TypeScript y Rust y problemas de interoperabilidad encontrados al conectarlas. La propuesta aborda una necesidad concreta: continuar el trabajo al cambiar de aplicación o dispositivo. [Fuente: GitHub Blog](https://github.blog/engineering/engineering-principles/building-the-agent-host-protocol-for-sessions-that-continue-across-devices/).

A partir de ese diseño, conviene analizar una cuestión que afecta también a herramientas colaborativas y paneles de operaciones: qué significa realmente recuperar una sesión. Mostrar el historial de mensajes resulta insuficiente si el usuario desconoce si una operación sigue ejecutándose, espera autorización o ya terminó. Una interfaz necesita representar el estado del trabajo y la certeza que tiene sobre él. Durante una desconexión, esa certeza puede ser limitada.

Como ejemplo hipotético, imaginemos una tarea que modifica un archivo y ejecuta pruebas. El portátil pierde conexión justo después de enviar la orden. Cuando el usuario abre el móvil, reenviar automáticamente la operación podría duplicar efectos. Un diseño prudente distinguiría entre orden pendiente de envío, recibida, iniciada y completada. También debería definir cómo identificar intentos repetidos y consultar su resultado. Son criterios de evaluación para cualquier implementación; la existencia de un protocolo compartido no demuestra por sí sola que estén resueltos.

Para equipos frontend, esto sugiere separar el estado confirmado del estado presentado de forma optimista. Un botón puede responder inmediatamente sin afirmar que el servidor aceptó la acción. Una aprobación enviada desde dos dispositivos requiere además una regla explícita de resolución: aceptar la primera, rechazar la obsoleta o solicitar una nueva decisión. Ocultar esa diferencia detrás de un indicador genérico de carga dificulta tanto la comprensión del usuario como el diagnóstico.

La validación debería reproducir esos casos. Una prueba útil desconectaría el cliente después del envío y antes de la confirmación. Otra abriría dos clientes con versiones distintas del mismo estado. También convendría comprobar qué ocurre cuando cambia un permiso mientras una acción está pendiente. Estas pruebas buscan propiedades observables: ausencia de efectos duplicados, recuperación del resultado y mensajes comprensibles cuando una acción deja de ser válida.

La seguridad merece el mismo tratamiento explícito. Poder consultar una sesión no debería implicar automáticamente poder ejecutar comandos en su entorno. Al evaluar una integración, interesa revisar por separado identidad, autorización y alcance de las herramientas. La continuidad entre dispositivos aporta valor cuando conserva esas fronteras y permite entender quién autorizó cada operación. Para un equipo que estudie esta arquitectura, un buen primer experimento sería implementar una acción con efecto verificable, interrumpir la conexión y demostrar que su resultado puede recuperarse sin repetirla.
