---
translationId: webdriverio-verification-loops-agents-20261005
lang: es
slug: webdriverio-v10-verificacion-agentes-bucle-reproducible
title: "WebdriverIO v10 convierte la verificación de agentes en un bucle reproducible"
description: "WebdriverIO v10 combina exploración asistida por modelos, reproducción determinista, trazas y WebDriver BiDi para probar aplicaciones web, móviles y de escritorio."
publishedAt: 2026-10-05
sourceName: "WebdriverIO"
sourceTitle: "WebdriverIO v10: Verification Loops for Coding Agents, on Every Platform"
sourceUrl: "https://webdriver.io/blog/2026/10/05/webdriverio-v10-release"
author: "Christian Bromann"
tags: ["testing", "javascript", "webdriver-bidi", "applied-ai", "maintainability"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

WebdriverIO v10 plantea una respuesta concreta a uno de los problemas menos resueltos de la programación asistida por IA: que el agente pueda comprobar su trabajo y dejar una prueba mantenible, en lugar de limitarse a producir código. La versión incorpora herramientas para abrir una sesión persistente, inspeccionar una aplicación paso a paso y exportar las acciones que han funcionado como un test convencional.

La idea central es separar exploración y ejecución. En la primera pasada, una acción como añadir un producto al carrito puede expresarse como intención mediante act(). El modelo interpreta la página y ejecuta comandos normales de WebdriverIO. Después, esas acciones quedan registradas junto al test y pueden reproducirse sin volver a llamar al modelo. El resultado es importante para la ingeniería: la IA se usa donde aporta flexibilidad, mientras que las ejecuciones posteriores conservan el coste, la velocidad y la previsibilidad de un test escrito a mano.

La herramienta también puede reparar ciertos pasos cuando cambia una interfaz. La ejecución deja capturas, vídeo y evidencias de red para revisar qué ocurrió. Ese detalle reduce una debilidad habitual de los sistemas de auto-reparación: un test verde no basta si el equipo no puede entender por qué una interacción cambió. WebdriverIO permite además validar extracciones contra Standard Schema y usar datos de red recogidos mediante WebDriver BiDi, útil cuando una respuesta no aparece completa en la interfaz.

La versión introduce otro cambio relevante en la gestión del contexto. En sesiones BiDi, una pestaña, una ventana o un iframe se representan como valores independientes que el test puede conservar. Abrir una nueva pestaña ya no obliga a mover un puntero global y recordar dónde estaba el flujo anterior. Ese modelo hace más explícitas las relaciones entre contextos y reduce errores difíciles de diagnosticar en pruebas con pagos, ventanas emergentes o contenido de terceros.

El mantenimiento de la suite también recibe atención. El selector $ pasa a ser estricto cuando encuentra varios elementos, de modo que los selectores ambiguos fallan pronto en vez de producir intermitencias. El sistema de trazas ofrece un archivo portable que puede adjuntarse a CI y revisarse fuera de la máquina que ejecutó la prueba. En pruebas visuales, WebdriverIO sustituye dependencias sin mantenimiento por Pixelmatch y fast-png, y mejora la cobertura de capturas en Safari, iOS y aplicaciones híbridas.

El proyecto publica un benchmark inicial de 100 tareas para comparar herramientas orientadas a agentes, pero reconoce que una muestra de ese tamaño deja intervalos de confianza amplios y no permite declarar un ganador definitivo. Esa cautela es una lección útil: la automatización asistida por IA debe medirse con tareas repetibles, evidencias y ejecuciones posteriores, no solo con una demostración convincente. Para los equipos, la propuesta más sólida de v10 no es reemplazar los tests deterministas, sino utilizar modelos para descubrir interacciones y convertir después el resultado en una verificación auditable.
