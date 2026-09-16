---
translationId: software-factory-verification-evidence-20260914
lang: es
slug: verificar-codigo-de-agentes-con-evidencias
title: "Verificar código generado por agentes exige un paquete de evidencias"
description: "Vercel propone un flujo de revisión para conectar cada requisito con observaciones reproducibles y mantener visibles las comprobaciones pendientes antes de aceptar un cambio."
publishedAt: 2026-09-14
sourceName: "Vercel"
sourceTitle: "How do you verify code from a software factory?"
sourceUrl: "https://vercel.com/i/verify-software-factory-code"
author: "Ben Sabic"
tags: ["ingeniería de software", "agentes de código", "testing", "mantenibilidad"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

A medida que los agentes de programación producen cambios más grandes y con menos intervención directa, la revisión técnica necesita algo más que una frase como “los tests pasan”. Vercel ha publicado una guía sobre verificación de código generado por una software factory que propone reunir, para cada cambio, un paquete compacto de evidencias: requisitos de aceptación, resultado antes de modificar, resultado después del cambio, comprobaciones del repositorio, revisión del diff y cualquier incertidumbre que siga abierta.

La distinción es importante porque cada prueba responde a una pregunta diferente. Los criterios de aceptación describen el comportamiento esperado, pero no demuestran que esté implementado. El resultado anterior confirma que el fallo se reproduce bajo unas condiciones concretas, mientras que el resultado posterior muestra el efecto de la corrección. El build y los tests indican qué comprobaciones automatizadas han pasado, pero no cubren requisitos que nunca fueron expresados en ellos. La revisión del diff ayuda a evaluar alcance y diseño, pero no sustituye una comprobación de comportamiento en ejecución.

La guía recomienda etiquetar cada verificación como pasada, fallida, bloqueada o no ejecutada. “Bloqueada” y “no ejecutada” no equivalen a un fallo: indican que falta evidencia. Esa diferencia evita que una ejecución incompleta se presente como una conclusión negativa o, peor aún, como una confirmación implícita.

Para una regresión, el procedimiento más sólido consiste en ejecutar la prueba contra la revisión original y contra la propuesta, y comprobar por qué falla inicialmente. Un test que solo verifica que existe un archivo puede pasar aunque el contenido siga truncado. Un fixture independiente, con identificadores y resultados esperados conocidos, ofrece más confianza que una expectativa calculada con la misma lógica defectuosa que se está probando. También conviene revisar los cambios en los tests: debilitar una aserción hasta que desaparezca el fallo no es lo mismo que actualizar correctamente el comportamiento esperado.

La revisión independiente añade otra barrera. El revisor debe empezar por los requisitos y el diff, no limitarse a repetir la explicación del agente que implementó el cambio. Un segundo modelo puede ayudar a variar el proceso, pero el acuerdo entre dos modelos no demuestra corrección. La autoridad para fusionar debe mantenerse separada de cualquier veredicto automático.

Cuando la aceptación depende de una interacción real, la guía aconseja usar un navegador y registrar las condiciones relevantes, el estado de la cuenta y la revisión exacta desplegada. Una vista previa verificada solo demuestra lo que se ejercitó en ese entorno; no prueba que producción, con otros datos o configuración, sea equivalente.

La idea central es aplicable aunque no se utilicen agentes: una revisión útil conecta afirmaciones con observaciones y hace visibles los límites de lo comprobado. Automatizar la implementación puede reducir tiempo, pero aumenta el valor de los registros reproducibles, los fixtures bien diseñados y la responsabilidad humana sobre la decisión final.
