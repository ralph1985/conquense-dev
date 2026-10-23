---
translationId: go-http1-connection-reuse-20261014
lang: es
slug: go-127-mejora-la-reutilizacion-de-conexiones-http1
title: "Go 1.27 mejora la reutilización de conexiones HTTP/1"
description: "El transporte HTTP de Go 1.27 intenta reutilizar conexiones aunque el programa cierre una respuesta sin consumir todo su cuerpo, reduciendo costes ocultos de TCP y TLS."
publishedAt: 2026-10-14
sourceName: "The Go Programming Language"
sourceTitle: "Better HTTP/1 connection reuse"
sourceUrl: "https://go.dev/blog/http-connection-reuse"
author: "Nicholas Husin y Damien Neil"
tags: ["go", "rendimiento web", "http", "redes"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Go 1.27 incorpora un cambio pequeño en net/http con un efecto potencialmente grande en clientes que realizan muchas peticiones HTTP/1. El transporte ahora intenta drenar de forma asíncrona una parte limitada del cuerpo de una respuesta que la aplicación no ha leído antes de cerrarla. Si consigue terminar a tiempo, la conexión puede volver al grupo de conexiones reutilizables en lugar de ser descartada.

El problema nace de cómo HTTP/1 transporta varias respuestas sobre un flujo secuencial de bytes. El cliente puede analizar la línea de estado y las cabeceras y devolver un objeto Response antes de que el cuerpo se haya consumido. Para localizar la siguiente respuesta, necesita llegar al final del cuerpo actual, según Content-Length o Transfer-Encoding. Si el programa solo necesita el código de estado y llama a Close() sin leer el cuerpo, el transporte tradicional no sabe si la conexión está lista para otra petición y suele abrir una nueva.

El coste de repetir ese proceso incluye el handshake TCP y el de TLS. En comunicaciones entre regiones, solo establecer la conexión puede consumir varias idas y vueltas antes de que llegue la petición útil. El ejemplo de los mantenedores compara cien consultas HTTP/1 a index.golang.org: aproximadamente 710 milisegundos en Go 1.26 frente a 150 milisegundos en Go 1.27 bajo las mismas condiciones. La diferencia no procede de un cambio en el servidor, sino de evitar conexiones innecesarias.

La implementación adopta límites deliberados: hasta 256 KB y hasta 50 milisegundos de drenaje. Si el cuerpo es grande o llega lentamente, seguir descargándolo puede costar más que abrir otra conexión. El transporte también evita hacer trabajo cuando la respuesta ya incluye Connection: close. Para HTTP/2 la situación es distinta, porque sus streams se multiplexan dentro de una conexión y un cuerpo no leído no bloquea del mismo modo a las demás peticiones.

El caso revela una fuente frecuente de regresiones de rendimiento: código correcto desde el punto de vista funcional que impide aprovechar la infraestructura de red. Incluso un decoder JSON puede detenerse justo después de la llave de cierre y dejar un salto de línea pendiente. Antes, los desarrolladores solían implementar funciones propias para drenar el cuerpo, con límites de bytes, tiempos de espera y goroutines; cada solución añadía decisiones y riesgos.

La recomendación actual de Go vuelve a ser simple: cerrar el cuerpo cuando ya no se necesita y dejar que Transport gestione la recuperación limitada. Aun así, conviene medir el patrón real de tráfico. En clientes con grandes respuestas, servidores que fuerzan cierre o redes inestables, la reutilización no será siempre posible. La mejora es especialmente útil para SDK, crawlers, workers y servicios que hacen muchas consultas pequeñas, donde el coste de cada handshake puede dominar el tiempo total.
