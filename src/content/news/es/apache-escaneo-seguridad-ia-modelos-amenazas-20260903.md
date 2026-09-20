---
translationId: apache-ai-security-scanning-threat-models-20260903
lang: es
slug: apache-escaneo-seguridad-ia-modelos-amenazas-20260903
title: "Apache prueba el escaneo de seguridad asistido por IA a escala de fundación"
description: "La Apache Software Foundation combinó modelos especializados, contexto arquitectónico y modelos de amenazas revisados para analizar 230 repositorios sin convertir cada hallazgo en "
publishedAt: 2026-09-03
sourceName: "The ASF Blog"
sourceTitle: "Security scanning at Foundation scale"
sourceUrl: "https://news.apache.org/foundation/entry/security-scanning-at-foundation-scale"
author: "ASF Tooling and ASF Security"
tags: ["security", "open source", "ai", "threat modeling", "software maintainability"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

## El problema no es solo encontrar vulnerabilidades

La Apache Software Foundation ha contado cómo ejecutó escaneos completos de seguridad sobre 230 repositorios durante una ventana de tres días en agosto. El trabajo combinó la infraestructura de ASF Tooling con la experiencia de ASF Security y una capacidad de investigación donada a través del programa Project Glasswing. El interés técnico del caso está menos en el uso de un modelo concreto que en el diseño del proceso alrededor de los modelos.

La fundación partía de dos problemas contrapuestos. Los equipos de seguridad reciben cada vez más informes generados por IA, pero muchos contienen falsos positivos o ignoran decisiones de arquitectura que el proyecto ya considera válidas. Revisarlos consume el mismo tiempo limitado de los mantenedores que corregir un problema real. Al mismo tiempo, ejecutar auditorías manuales proyecto por proyecto no escala cuando la organización mantiene cientos de repositorios.

ASF construyó una canalización con tres niveles. Un nivel ligero filtra a gran volumen, otro crea inventarios del contenido del código y un nivel pesado realiza el análisis que necesita razonamiento más profundo. Los modelos y parámetros pueden cambiarse en tiempo de ejecución sin modificar la canalización. Esa separación permite equilibrar calidad, velocidad y coste, además de comparar diferentes combinaciones sin rediseñar todo el sistema.

## El contexto reduce el ruido

Antes de escanear, 75 comités de gestión de proyectos, que representaban más de 180 repositorios, prepararon modelos de amenazas. Estos documentos describían componentes relevantes, límites de confianza, decisiones de despliegue, supuestos aceptados y áreas fuera de alcance. ASF Security revisó cada modelo antes de incorporarlo al análisis.

La consecuencia práctica fue doble. El sistema podía concentrar la investigación en las superficies que el proyecto consideraba importantes, y los mantenedores recibían menos informes sobre comportamientos que estaban permitidos por diseño. Según ASF, escanear con un modelo de amenazas revisado costó aproximadamente una quinta parte menos que hacerlo sin ese contexto. No es una propiedad mágica de la IA: es el resultado de evitar que el sistema redescubra decisiones ya documentadas.

Los hallazgos se canalizaron por el procedimiento oficial de divulgación de Apache. Cada proyecto decide el significado del informe y su calendario de corrección. Además, los resultados se ordenan por riesgo operativo, no solo por una etiqueta de severidad. Una vulnerabilidad aparentemente grave en una ruta que nadie alcanza puede esperar frente a un defecto menos llamativo que afecta al flujo principal de un servicio.

## La parte que puede reutilizar cualquier equipo

ASF planea hacer los escaneos incrementales, conservar el historial de resultados y relacionar cambios con correcciones y CVE publicados. También estudia convertirlos en una función autoservicio con presupuestos de tokens administrados por la fundación.

La lección para otros equipos es clara: un asistente de seguridad necesita límites, memoria del sistema y una vía de divulgación gobernada. Un modelo puede sugerir un hallazgo, pero la calidad final depende de la amenaza que se está modelando, del contexto que recibe, de la revisión humana y de la capacidad de convertir una observación en una corrección verificable. En seguridad de código abierto, el cuello de botella no es producir más alertas, sino producir alertas que alguien pueda entender y atender.
