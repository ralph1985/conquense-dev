---
translationId: property-based-fuzzing-http-client-20260905
lang: es
slug: fuzzing-basado-en-propiedades-destapa-fallos-en-un-cliente-http-de-typescript
title: "El fuzzing basado en propiedades destapa fallos ocultos en un cliente HTTP de TypeScript"
description: "Un experimento con pruebas generativas encontró once defectos en un cliente HTTP que ya contaba con cientos de pruebas basadas en ejemplos. La experiencia muestra cómo probar"
publishedAt: 2026-09-05
sourceName: "Import Chaos"
sourceTitle: "Fuzzing the State Machines Inside My HTTP Client"
sourceUrl: "https://blog.gaborkoos.com/posts/2026-09-05-Fuzzing-the-State-Machines-Inside-My-HTTP-Client/"
author: "Gabor Koos"
tags: ["testing", "javascript", "typescript", "property-based-testing", "reliability"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

Un artículo reciente de Gabor Koos muestra por qué una suite de pruebas extensa puede seguir dejando zonas críticas sin cubrir. El autor trabajaba con un cliente HTTP en JavaScript y TypeScript que ya tenía pruebas para reintentos, tiempos de espera, cancelación, circuit breakers, bulkheads, deduplicación y combinaciones de plugins. Había diecinueve archivos y 206 bloques de prueba, todos verdes. Aun así, las pruebas generativas encontraron once defectos que no habían aparecido durante el desarrollo habitual.

El primer hallazgo surgió en el mecanismo de hedging. El cliente podía lanzar una segunda copia de una petición después de un retraso breve y devolver la respuesta útil que llegase antes. El problema aparecía cuando la segunda tentativa fallaba rápidamente mientras la original seguía en vuelo. En vez de describir un caso concreto, el autor formuló una propiedad: si cualquier intento puede devolver una respuesta utilizable, el plugin debe devolverla independientemente del orden temporal de los eventos. Un generador produjo un contraejemplo casi de inmediato y lo redujo a una secuencia de apenas tres milisegundos.

La diferencia con una prueba basada en ejemplos no está en que esta última sea inútil. Los ejemplos documentan escenarios importantes y proporcionan regresiones legibles. El límite aparece cuando el comportamiento depende de muchas permutaciones: orden de finalización, errores parciales, cancelaciones, reintentos, temporizadores y respuestas que compiten entre sí. Enumerar manualmente todas las combinaciones es caro y, además, suele dejar fuera precisamente las interacciones que el autor no había imaginado.

El enfoque basado en propiedades cambia la unidad de trabajo. En lugar de escoger entradas y salidas concretas, el equipo expresa invariantes del sistema: una respuesta cancelada no debe volver a entregarse; una operación deduplicada no debe producir resultados incompatibles; una petición no debe quedar bloqueada indefinidamente por la desaparición de uno de sus intentos. Después, la herramienta genera secuencias de eventos, relojes y resultados, y busca una violación. El proceso de shrinking intenta convertir un fallo complejo en el caso mínimo que todavía lo reproduce.

La experiencia también revela un problema de calidad de las propias pruebas. Una suite puede tener muchos bloques y seguir siendo superficial si nunca alcanza estados difíciles. Por eso el artículo recomienda medir cobertura semántica, no solo líneas o ramas: cuántas veces se abrieron circuit breakers, se agotaron límites, se produjeron cancelaciones, se descartaron resultados obsoletos o se resolvieron carreras. Si una ruta interesante permanece en cero, los tests no están demostrando que el sistema sea robusto; solo demuestran que esa ruta no fue visitada.

Para proyectos TypeScript que coordinan concurrencia, redes o plugins, la lección es práctica. Mantén ejemplos claros para los contratos principales, pero añade propiedades para las máquinas de estados y las combinaciones temporales. Conserva las semillas de los fallos encontrados, registra los casos reducidos como regresiones y separa los defectos del generador de los del producto. La automatización no sustituye al criterio del equipo: amplía el espacio que el equipo puede explorar sin tener que escribir a mano cada historia improbable.
