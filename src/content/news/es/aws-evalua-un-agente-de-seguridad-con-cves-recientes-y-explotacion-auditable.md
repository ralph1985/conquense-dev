---
translationId: aws-security-agent-cve-benchmark-20261015
lang: es
slug: aws-evalua-un-agente-de-seguridad-con-cves-recientes-y-explotacion-auditable
title: "AWS evalúa un agente de seguridad con CVE recientes y explotación auditable"
description: "AWS ha presentado un benchmark de pentesting autónomo que mide explotación completa sobre vulnerabilidades recientes y audita si el agente siguió realmente la ruta prevista."
publishedAt: 2026-10-15
sourceName: "AWS Security Blog"
sourceTitle: "AWS Security Agent (now part of AWS Continuum) exploited 33 of 37 new real-world CVEs"
sourceUrl: "https://aws.amazon.com/blogs/security/aws-security-agent-now-part-of-aws-continuum-exploited-33-of-37-new-real-world-cves/"
author: "Dazhi Zhang y Hamed Soleimani"
tags: ["seguridad", "ia-aplicada", "pentesting", "vulnerabilidades", "evaluacion"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

AWS ha publicado una evaluación de su agente autónomo de pruebas de penetración sobre 37 CVE recientes desplegados como objetivos contenedorizados. El experimento no entregaba al agente un exploit ni una prueba de concepto: comenzaba desde una URL de endpoint, una pista breve y, cuando correspondía, credenciales iniciales de baja confianza. Para obtener la puntuación debía descubrir la superficie, construir el ataque, encadenar primitivas y extraer una bandera colocada detrás de la vulnerabilidad.

El resultado comunicado fue de 35 banderas capturadas, pero la auditoría redujo la cifra de explotaciones válidas de extremo a extremo a 33 de 37, un 89,2 %. Dos capturas llegaron a la bandera por rutas no previstas y fueron reclasificadas como fallos del benchmark. En dos casos más, el agente encontró y explotó el error, pero dejó el servicio fuera de funcionamiento antes de poder leer la bandera. La diferencia entre esos números es más importante que el titular: una evaluación de seguridad necesita comprobar qué ocurrió, no solo si apareció una respuesta correcta.

Los objetivos cubrían ocho clases de vulnerabilidad y varios tipos de software, incluidos frameworks web, plataformas de aprendizaje automático, un registro de contenedores, una API tRPC y plataformas de comercio y medios. El flujo tenía siete etapas: arranque del objetivo en un entorno aislado, reconocimiento, agentes especialistas, validación de hallazgos, explotación con shell, Python, navegador real y callbacks fuera de banda, comprobación de la bandera y auditoría de integridad.

AWS diseñó el conjunto para reducir dos formas de contaminación. Las vulnerabilidades se seleccionaron de divulgaciones suficientemente recientes para dificultar que el modelo hubiera memorizado la solución, y el agente no podía consultar CVE ni pruebas de concepto durante la ejecución. La propia publicación reconoce que ninguna medida elimina por completo la contaminación, porque una vulnerabilidad reciente puede aparecer parcialmente en avisos o discusiones públicas.

También resulta relevante la capa de validación. Durante la ejecución se registraron 475 hallazgos: 234 fueron clasificados como explotables con alta confianza, 82 quedaron en categorías de menor confianza y 159 fueron marcados como falsos positivos. Además, se eliminaron más de 1.200 duplicados. Esa separación entre descubrimiento, confirmación y explotación es una condición práctica para que un agente de seguridad sea útil en CI/CD; un escáner que produce más alertas no necesariamente reduce el trabajo humano.

El experimento deja una advertencia operativa. Un agente capaz de encadenar una subida de archivos, una ejecución remota o un SSRF también puede causar daños durante una prueba. AWS señala como líneas de trabajo la explotación no destructiva, la recuperación de objetivos y el control estricto del alcance. Por tanto, la lección para los equipos no es sustituir el pentesting tradicional por un porcentaje llamativo, sino exigir benchmarks recientes, auditorías por caso, aislamiento y guardarraíles antes de trasladar esa autonomía a sistemas autorizados pero reales.
