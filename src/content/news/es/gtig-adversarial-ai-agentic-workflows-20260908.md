---
translationId: gtig-adversarial-ai-agentic-workflows-20260908
lang: es
slug: gtig-adversarial-ai-agentic-workflows-20260908
title: "Google observa cómo los atacantes pasan del prompting a los flujos agentic y presionan la cadena de suministro"
description: "El nuevo informe de Google Threat Intelligence Group describe operaciones en las que la IA reduce la intervención humana, acelera el robo de credenciales y amplía el riesgo en ecos"
publishedAt: 2026-09-08
sourceName: "Google Cloud Blog"
sourceTitle: "GTIG AI Threat Tracker: From Prompting to Autonomy – The Evolution of Adversarial AI"
sourceUrl: "https://cloud.google.com/blog/topics/threat-intelligence/from-prompting-to-autonomy-the-evolution-of-adversarial-ai"
author: "Google Threat Intelligence Group"
tags: ["security", "applied-ai", "software-supply-chain", "cloud", "developer-tools"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Google Threat Intelligence Group ha publicado un nuevo seguimiento sobre el uso ofensivo de la inteligencia artificial. Su conclusión central no es que los atacantes hayan encontrado una herramienta mágica, sino que están conectando modelos, agentes y automatizaciones en cadenas operativas con menos pausas humanas. Esa reducción de latencia cambia la defensa: una organización puede tener menos tiempo para detectar una intrusión, entenderla y revocar los accesos utilizados.

El informe señala que durante el segundo trimestre de 2026 GTIG observó una campaña en la que los actores comprometieron un recurso cloud y, en menos de seis horas, planificaron, construyeron y ejecutaron una operación automatizada de captación masiva de credenciales. El documento también describe actividad atribuida a UNC6780, grupo que habría utilizado varias tácticas para atacar asistentes de programación basados en IA, escáneres de seguridad con modelos de lenguaje y repositorios de software de código abierto.

El punto especialmente relevante para ingeniería es la convergencia entre herramientas de desarrollo y cadena de suministro. GTIG afirma que el uso de asistentes de IA está aumentando la cantidad de recursos open source y la variedad de componentes orientados a IA, incluidos servidores MCP, formatos de modelos, motores de inferencia y bases de datos vectoriales. La velocidad de incorporación puede reducir el escrutinio de paquetes y dependencias, justo cuando los mantenedores reciben más informes de vulnerabilidades generados por modelos y tienen que separar señales útiles de ruido.

El caso de UNC6780 ilustra el riesgo con más detalle. Según el informe, el grupo ha apuntado a ecosistemas como PyPI, npm y Docker Hub, ha comprometido cuentas legítimas de desarrolladores y ha publicado forks troyanizados de servidores MCP. También se describe malware capaz de detectar entornos CI/CD, extraer tokens OIDC de runners de GitHub Actions y utilizarlos para publicar paquetes comprometidos con atestaciones criptográficas válidas. Una firma o una atestación correcta demuestra quién autorizó una publicación, pero no garantiza que el proceso autorizado fuera benigno.

La consecuencia práctica es que la seguridad de los asistentes de programación no puede limitarse al prompt o al modelo. Los equipos deberían tratar el entorno de ejecución, los hooks del workspace, las credenciales efímeras, los tokens OIDC, los repositorios y las dependencias como una única superficie operativa. La revisión humana sigue siendo importante, pero necesita contexto: procedencia del paquete, historial del mantenedor, cambios inesperados, permisos solicitados y comportamiento durante la instalación.

El informe no sostiene que toda automatización con IA sea insegura. Presenta evidencia de que los adversarios ya están explotando la misma aceleración que atrae a los equipos de desarrollo. La respuesta razonable es diseñar controles que acompañen a esa velocidad: privilegio mínimo, publicación reproducible, verificación independiente de artefactos, segmentación de runners, rotación de credenciales y telemetría capaz de enlazar acciones del agente con cambios reales en el repositorio.
