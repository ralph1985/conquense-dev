---
translationId: strands-box-dogwood-sandbox-20261007
lang: es
slug: strands-box-dogwood-sandbox-para-agentes-ia
title: "Strands Box añade políticas dependientes del historial a los sandboxes de agentes"
description: "AWS presenta un sandbox open source que combina aislamiento del sistema operativo con reglas contextuales para controlar archivos, red, intérpretes y herramientas MCP."
publishedAt: 2026-10-07
sourceName: "AWS Open Source Blog"
sourceTitle: "Introducing Strands Box: AI agent sandboxes powered by Dogwood"
sourceUrl: "https://aws.amazon.com/blogs/opensource/introducing-strands-box-ai-agent-sandboxes-powered-by-dogwood/"
author: "Fernando Dingler"
tags: ["seguridad", "agentes de IA", "sandboxing", "open source"]
readingTime: 6
aiDisclosure: "Contenido generado automáticamente con IA."
---

AWS ha presentado Strands Box, un sandbox open source con licencia Apache 2.0 y disponible inicialmente como developer preview. Su objetivo es controlar agentes que leen archivos, ejecutan comandos, generan código y llaman a APIs. La propuesta parte de una distinción importante: aislar un proceso limita dónde puede entrar, pero no determina qué acciones puede realizar legítimamente dentro de ese espacio.

Box combina dos capas. La primera usa mecanismos de aislamiento del sistema operativo, como macOS Seatbelt, para establecer límites duros sobre el sistema de archivos y la red. La segunda integra Dogwood, un lenguaje de políticas cuyo motor local decide si una acción puede ejecutarse. Las reglas pueden depender del contexto y del historial, no solo de una lista estática de permisos. Por ejemplo, un agente podría publicar avances en un canal de incidentes, pero quedar limitado a tres mensajes cada diez minutos.

Las decisiones se aplican en varios puntos de interceptación: la salida de red, un intérprete de shell, un intérprete de Python y un broker para servidores MCP. Cada operación se registra con una representación común. Leer un archivo mediante shell o Python produce el mismo tipo de evento, y una petición HTTP se evalúa de forma equivalente aunque proceda de herramientas distintas. Esa normalización permite escribir políticas sobre efectos observables en lugar de confiar en que el agente describa correctamente lo que hará.

El gateway de salida también resuelve un problema habitual: las credenciales reales no tienen que entrar en el entorno del agente. Este recibe un token sustituto y el gateway añade el secreto al reenviar una petición autorizada. El sistema admite tokens Bearer, cabeceras personalizadas, autenticación básica, parámetros de consulta y firmas AWS SigV4. La ventaja es reducir la exposición directa de secretos, aunque el gateway y los componentes que aplican políticas pasan a formar parte del perímetro de confianza.

AWS reconoce varios límites del diseño. El intérprete que hace cumplir las reglas se ejecuta fuera del sandbox, por lo que aumenta la base informática de confianza. Además, el acceso directo configurado en el archivo de Box puede quedar protegido por contención sin aparecer en el historial de políticas. La primera implementación se centra en macOS y la cobertura de sistemas operativos adicionales está pendiente.

La propuesta resulta relevante para equipos que usan agentes en desarrollo, operaciones o respuesta a incidentes. Un prompt de confirmación dentro del propio agente no ofrece la misma garantía que una política aplicada fuera de su proceso: el primero observa una intención declarada; la segunda puede inspeccionar archivos, destinos, métodos HTTP y efectos acumulados. Para producción, aún habría que revisar el código, probar escapes, definir políticas mínimas y observar el comportamiento bajo fallo.

La lección es aplicable más allá de AWS: la autonomía segura necesita aislamiento, autorización contextual y trazabilidad juntos. Un agente no debería tener que recordar sus límites; el entorno debe imponerlos.
