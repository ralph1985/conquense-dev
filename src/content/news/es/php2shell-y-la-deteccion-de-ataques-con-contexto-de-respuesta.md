---
translationId: cloudflare-php2shell-transaction-detection-20261021
lang: es
slug: php2shell-y-la-deteccion-de-ataques-con-contexto-de-respuesta
title: "php2shell y la detección de ataques con contexto de respuesta"
description: "Las vulnerabilidades php2shell muestran por qué la defensa web puede necesitar analizar la petición y la respuesta de una misma transacción HTTP."
publishedAt: 2026-10-21
sourceName: "Cloudflare Blog"
sourceTitle: "Cloudflare deploys protections against php2shell vulnerability"
sourceUrl: "https://blog.cloudflare.com/php-vulnerabilities-waf-protection/"
author: "Daniele Molteni, Dan Jones, and Kuber Nandwani"
tags: ["security", "php", "web-security", "waf", "vulnerabilities"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

El 21 de octubre se hicieron públicas dos vulnerabilidades del runtime de PHP conocidas como php2shell, identificadas como CVE-2026-109618 y CVE-2026-109619. Según Cloudflare, afectan a servidores que ejecutan PHP 5.4 o posterior y pueden permitir denegación de servicio, exposición de datos o ejecución remota de código cuando se procesan peticiones HTTP especialmente preparadas. El problema no está en un plugin concreto: se encuentra en la gestión de memoria del propio runtime cuando una petición falla durante su procesamiento.

Las dos variantes comparten una clase de error de memoria, pero se activan en momentos distintos. En un caso, PHP se queda sin memoria antes de inicializar correctamente ciertos datos internos y después intenta utilizarlos durante la limpieza. En el otro, un error fatal deja referencias a memoria que ya se ha liberado y un proceso posterior puede acceder a ellas. El resultado potencial va más allá de un proceso caído: un atacante puede intentar obtener información de memoria o influir en la ejecución del proceso.

La respuesta defensiva anunciada por Cloudflare es interesante porque no se limita a añadir otra regla basada en el contenido de la petición. La compañía desplegó protecciones antes de la divulgación pública y observó tráfico de ataque que mutaba sus cargas útiles. Para reducir falsos positivos, desarrolló una capacidad denominada full transaction detection, que combina señales de la petición y de la respuesta originada por el servidor dentro de la misma transacción HTTP. Si la respuesta contiene indicios de que la explotación tuvo éxito, una regla puede bloquearla antes de entregarla al cliente.

El cambio refleja una limitación habitual de los cortafuegos de aplicaciones web. El atacante controla parte de la entrada, pero el servidor revela información adicional al responder: códigos de estado, patrones de error, contenido inesperado o señales de una ejecución anómala. Analizar ambos lados no convierte al WAF en un parche para el runtime, pero ofrece más contexto para distinguir una solicitud legítima de una explotación que ha atravesado las defensas de entrada.

La protección, además, no sustituye la actualización. Cloudflare recomienda aplicar la corrección del proyecto PHP y mantener el WAF como defensa en profundidad. La página incorporó el 23 de octubre una advertencia sobre CVE-2026-115560, una vulnerabilidad relacionada con la función de progreso de subida de sesiones, que afecta incluso a versiones de PHP completamente parcheadas según el aviso informativo del proyecto PHP.

Para los equipos que mantienen aplicaciones web, el caso deja varias acciones concretas. Hay que identificar qué servidores ejecutan PHP y qué versiones mantienen, coordinar la actualización con el proveedor si la infraestructura es gestionada y revisar los registros de WAF en busca de reglas activadas. También conviene limitar cargas innecesarias y subidas de archivos, aunque esas medidas solo reducen superficie y no corrigen el defecto. La lección arquitectónica es más amplia: la detección mejora cuando correlaciona entrada, procesamiento y salida, pero la mitigación perimetral siempre debe acompañar, nunca reemplazar, el parche del componente vulnerable.
