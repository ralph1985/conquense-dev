---
translationId: meta-gem-recsys-scale-20261013
lang: es
slug: meta-gem-escala-modelo-recomendacion-anuncios
title: "Meta explica cómo escala un modelo unificado de recomendación para anuncios"
description: "La nueva generación de GEM combina un modelo central, transferencia de representaciones y optimizaciones de hardware para entrenar recomendación a escala de modelos fundacionales."
publishedAt: 2026-10-13
sourceName: "Engineering at Meta"
sourceTitle: "Meta’s Generative Ads Model (GEM): Scaling the Central Model and Compute Engine for Frontier Ads AI"
sourceUrl: "https://engineering.fb.com/2026/10/13/ml-applications/generative-ads-model-gem-scaling-frontier-ads-ai/"
author: "Huayu Li, Darren Liu, Xiaoyi (Leo) Liu, Ellie Wen, Jackie (Jiaqi) Xu, Chunzhi Yang y Reva Srinivasan"
tags: ["applied AI", "machine learning", "recommender systems", "GPU systems", "scaling"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Meta ha publicado detalles de la generación 2026 de GEM, su modelo fundacional para recomendación de anuncios. El interés técnico del trabajo no está únicamente en el tamaño del modelo, sino en la decisión de sustituir sistemas separados por superficie y objetivo por un modelo central capaz de aprender de señales procedentes de Facebook, Instagram, Reels, Stories y otras partes del ecosistema publicitario.

Los sistemas de recomendación no se comportan exactamente como los modelos de lenguaje. Trabajan con características heterogéneas, interacciones entre usuarios y elementos, secuencias de comportamiento y distribuciones que cambian con rapidez. Meta afirma que la arquitectura Kunlun permite combinar modelado de secuencias largas con interacciones específicas de recomendación y que, a su mayor escala de preentrenamiento, observó un patrón de crecimiento parecido a las leyes de escala de los modelos de lenguaje. La empresa informa de un aumento de 2,5 veces en la complejidad del modelo respecto a versiones anteriores.

El segundo componente es la transferencia de inteligencia hacia modelos que sí pueden ejecutarse en los recorridos de usuario. Servir directamente un modelo de esta magnitud para cada candidato publicitario sería demasiado costoso y podría aumentar la latencia. GEM utiliza representaciones estructuradas, destilación y precomputación elástica para trasladar parte de la información del modelo central a modelos descendentes. Según Meta, este mecanismo duplica la transferencia de inteligencia sin añadir coste de cómputo ni latencia al servicio final.

La unificación también cambia la forma de entrenar objetivos distintos. El modelo aprende conjuntamente clics y conversiones, y puede reutilizar representaciones aprendidas en tareas con muchos datos para mejorar otras con menos datos. Meta describe una mezcla de datos que intenta mantener proporciones cercanas al flujo que recibe el sistema en producción, además de expertos compartidos y expertos específicos por dominio. La arquitectura busca así combinar conocimiento general con patrones particulares de cada superficie.

La infraestructura es tan importante como el modelo. GEM se entrena en varios miles de GPU y utiliza kernels personalizados, precisión reducida y paralelismo en cinco dimensiones. Meta separa la eficiencia local de cada GPU de la eficiencia al distribuir el trabajo entre miles de dispositivos. Con optimizaciones de kernels, memoria, red y paralelismo, la compañía afirma haber duplicado la eficiencia de entrenamiento de extremo a extremo hasta un 20-25 % de MFU mientras multiplicaba por cuatro los FLOPs totales.

La conclusión técnica es prudente: escalar un sistema de recomendación no consiste en aumentar parámetros y comprar más aceleradores. Requiere co-diseñar arquitectura, datos, modelos descendentes, comunicación entre dispositivos y memoria. También exige medir por separado la calidad del modelo, la latencia de servicio y la eficiencia del entrenamiento. El caso de GEM resulta relevante para otros sistemas de IA aplicados porque muestra que una arquitectura central puede simplificar la transferencia de conocimiento, pero solo cuando la infraestructura y el camino de producción están diseñados para que esa escala sea operable.
