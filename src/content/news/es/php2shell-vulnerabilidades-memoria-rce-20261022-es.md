---
translationId: php2shell-memory-rce-20261022
lang: es
slug: php2shell-vulnerabilidades-memoria-rce-20261022-es
title: "PHP2Shell recuerda que las imágenes de contenedor también forman parte de la respuesta a una vulnerabilidad"
description: "Dos vulnerabilidades críticas en PHP permiten ejecución remota de código sin autenticación en versiones afectadas. Docker detalla por qué actualizar la imagen base y reconstruir el"
publishedAt: 2026-10-22
sourceName: "Docker Security"
sourceTitle: "Security Update on PHP2Shell: Impact for Docker Customers"
sourceUrl: "https://www.docker.com/blog/security-update-on-php2shell-impact-for-docker-customers/"
author: "Docker Security"
tags: ["php", "security", "remote-code-execution", "containers", "software-supply-chain"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Las vulnerabilidades conocidas como PHP2Shell han convertido una actualización del intérprete PHP en un problema de inventario, cadena de suministro y despliegue. Docker informó el 22 de octubre de que CVE-2026-109618 y CVE-2026-109619 afectan a paquetes PHP distribuidos desde la versión 5.4. Las dos vulnerabilidades tienen una gravedad crítica y pueden permitir ejecución remota de código sin autenticación bajo determinadas condiciones.

El primer fallo está relacionado con la gestión de memoria cuando PHP se queda sin memoria durante una petición. Algunas rutas de error pueden dejar estructuras parcialmente inicializadas y hacer que la fase de limpieza trate datos inválidos como si fueran correctos. El segundo implica estado interno que conserva referencias a memoria ya liberada. En ambos casos, un atacante puede intentar convertir el comportamiento incorrecto del motor en ejecución de código en el servidor.

El riesgo no se limita a una instalación clásica de Apache. Las versiones afectadas pueden aparecer detrás de PHP-FPM, php-cgi, FrankenPHP, LiteSpeed, paneles de hosting, appliances y contenedores. Esa amplitud es la razón por la que la respuesta no debe consistir únicamente en actualizar una dependencia declarada por la aplicación. También hay que identificar qué binario ejecuta realmente cada servicio, qué imagen lo contiene y qué procesos siguen activos después del despliegue.

PHP publicó correcciones para las ramas 8.2, 8.3, 8.4 y 8.5 en las versiones 8.2.35, 8.3.36, 8.4.27 y 8.5.12. Docker actualizó sus imágenes oficiales y sus Docker Hardened Images, pero la existencia de una etiqueta corregida no actualiza por sí sola los contenedores que ya están ejecutándose. Un flujo seguro requiere fijar la versión, reconstruir la imagen, revisar el resultado del escáner, publicar el nuevo artefacto y reemplazar las instancias antiguas.

El incidente ofrece una lección práctica para equipos que gestionan software mediante imágenes inmutables. Las etiquetas flotantes como latest dificultan saber qué código y qué intérprete está en producción. Un inventario útil debe relacionar el servicio desplegado con el digest de la imagen, la versión efectiva de PHP y la fecha de reconstrucción. También conviene revisar imágenes intermedias, dependencias de las herramientas de administración y servicios que no aparecen en el repositorio principal.

Las reglas WAF pueden reducir algunos patrones conocidos mientras se prepara el cambio, pero no sustituyen la actualización del motor. Las versiones antiguas sin soporte requieren una decisión adicional: actualizar la rama, aplicar un backport proporcionado por el proveedor o retirar temporalmente el servicio de Internet. La conclusión técnica es sobria: en una vulnerabilidad del runtime, el límite de seguridad está en el componente que realmente procesa la petición, no en el lenguaje que la aplicación declara usar.
