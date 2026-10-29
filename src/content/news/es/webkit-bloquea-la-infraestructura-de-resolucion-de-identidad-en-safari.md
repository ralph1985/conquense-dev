---
translationId: webkit-identity-resolution-blocking-20261019
lang: es
slug: webkit-bloquea-la-infraestructura-de-resolucion-de-identidad-en-safari
title: "WebKit bloquea la infraestructura de resolución de identidad para frenar el rastreo poscookies"
description: "Safari y WebKit bloquean a nivel de dominio las conexiones de terceros que convierten correos electrónicos y teléfonos en identificadores persistentes entre sitios."
publishedAt: 2026-10-19
sourceName: "WebKit"
sourceTitle: "Blocking Identity Resolution Infrastructure"
sourceUrl: "https://webkit.org/blog/18438/"
author: "John Wilander, Charlie Wolfe y Matthew Finkel"
tags: ["privacidad", "navegadores", "web", "rastreo"]
readingTime: 3
aiDisclosure: "Contenido generado automáticamente con IA."
---

WebKit ha descrito una protección que Safari incorpora en sus versiones de iOS, iPadOS, macOS y visionOS 27 para bloquear una forma de rastreo que intenta sobrevivir al fin de las cookies de terceros. La técnica recibe el nombre de resolución de identidad y utiliza datos que el usuario introduce en un sitio, como su correo electrónico, para enlazar su actividad con una identidad común en otros sitios.

El patrón es técnicamente sencillo, aunque sus consecuencias son amplias. Un tercero presente en una página puede recibir una dirección de correo durante un registro o una suscripción, convertirla en un identificador opaco y devolver ese identificador al navegador. Ese valor puede almacenarse en el sitio y utilizarse más adelante para relacionar visitas, dispositivos o perfiles. El tercero termina construyendo un grafo de identidad que conecta datos procedentes de distintos contextos.

WebKit afirma que la nueva protección bloquea el acceso de red a la infraestructura utilizada para esa resolución. El bloqueo se realiza a nivel de dominio, de modo que cambiar la forma concreta de la petición no basta para eludirlo. La medida busca impedir que el correo electrónico llegue al servidor externo y cortar también las operaciones posteriores basadas en ese identificador.

La distinción importante para quienes desarrollan aplicaciones web está entre personalización de primera parte y seguimiento de terceros. Un servicio puede seguir utilizando los datos que necesita para gestionar su propia cuenta o adaptar su experiencia dentro de su dominio. Lo que se limita es la presencia invisible de una infraestructura externa que actúa como intermediaria entre varios sitios y conserva la capacidad de emparejar sus registros.

Esto tiene consecuencias prácticas para la arquitectura frontend. Los equipos deberían revisar qué scripts reciben valores de formularios, qué dominios aparecen en las peticiones después de un inicio de sesión y qué funciones dependen de identificadores compartidos entre sitios. Una integración que parece analítica, publicidad o personalización puede estar apoyándose en un resolvedor de identidad externo. La comprobación debe hacerse observando el tráfico real y documentando el propósito de cada transferencia, no solo leyendo el nombre del paquete.

La decisión también ilustra un cambio en la defensa de la privacidad web. Bloquear cookies ya no cubre todos los caminos para correlacionar usuarios. El navegador debe intervenir en la red y en los intermediarios que reciben los datos, incluso cuando la aplicación utiliza APIs web legítimas y el usuario ha introducido voluntariamente su información en un formulario.

WebKit mantiene una excepción conceptual para la personalización de primera parte y menciona Hide My Email como una protección adicional basada en direcciones aleatorias. Para los desarrolladores, la conclusión es menos comercial que arquitectónica: diseñar la identidad y la telemetría con límites claros, minimizar el envío de datos personales y asumir que los navegadores continuarán trasladando parte de la responsabilidad de privacidad desde la configuración del sitio hacia la propia plataforma.
