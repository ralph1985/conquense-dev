---
translationId: verificacion-email-chrome-153
lang: es
slug: verificacion-email-chrome-153
title: "La verificación de correo de Chrome cambia su protocolo antes de Chrome 153"
description: "El ensayo de la API de verificación de correo modifica su solicitud de emisión: los proveedores deben prepararse para JSON y HTTP Message Signatures."
publishedAt: 2026-08-13
sourceName: "Chrome for Developers"
sourceTitle: "Email verification updates, August 2026"
sourceUrl: "https://developer.chrome.com/blog/email-verification-august-2026"
author: "Rowan Merewood"
tags: ["web security", "authentication", "standards"]
readingTime: 3
aiDisclosure: "Texto generado con IA y revisado antes de su publicación."
---

Los proveedores que participan en el ensayo de Email Verification de Chrome tienen un cambio de protocolo que revisar antes de Chrome 153. La propuesta busca que el navegador compruebe directamente con el proveedor de correo que una dirección pertenece a la persona usuaria, de modo que el sitio pueda validar un token y evitar, en ciertos flujos, enviar un enlace mágico o un código de un solo uso. La actualización de agosto modifica cómo se solicita la emisión de ese token.

Hasta Chrome 152, el endpoint de emisión recibe un `POST` con formato `application/x-www-form-urlencoded` y un `request_token` en el cuerpo. Desde Chrome 153, la solicitud pasa a `application/json`, contiene la clave `email` y utiliza HTTP Message Signatures en cabeceras como `Signature`, `Signature-Input` y `Signature-Key`. El proveedor debe validar esa firma y el contenido asociado antes de entregar la respuesta de emisión.

El detalle importa porque los cambios de formato en autenticación suelen fallar de manera poco visible. Un servidor que solo acepte el cuerpo antiguo no interpretará la solicitud nueva. Otro que adopte solo la ruta nueva puede dejar fuera a personas que aún usan una versión anterior del navegador durante la transición. Chrome plantea dos opciones: soportar ambos formatos y decidir según el tipo de contenido, o cambiar directamente cuando el tráfico observado permita retirar el legado. Para un sistema de identidad, la primera suele ofrecer una migración más controlada, siempre que ambas rutas reciban pruebas equivalentes.

También cambia la recomendación de análisis del token devuelto. El token usa el formato SD-JWT, con un JWT firmado por el emisor, posibles disclosures y un JWT de vinculación de clave. Aunque la forma actual no incluya disclosures, separar el valor en dos fragmentos es frágil: una evolución válida del formato rompería esa suposición. Chrome recomienda usar una biblioteca que analice SD-JWT y validar correctamente audiencia, nonce, hash de vinculación y firmas del emisor y del navegador.

Esta es una buena ocasión para revisar los límites de confianza del flujo. El backend debe verificar el token; el cliente no debe decidir por sí solo que un correo está confirmado. Hay que registrar errores sin almacenar tokens completos, aplicar límites a los intentos, asociar el nonce a una transacción de vida corta y mantener una alternativa cuando el navegador o el proveedor no participen. La API se describe como mejora progresiva, no como sustitución universal de todos los mecanismos de verificación.

La actualización añade matices de producto con impacto técnico: introducir o pegar una dirección puede disparar la verificación al salir del campo, se está probando un indicador de progreso y el soporte se limita al escritorio hasta Chrome 152. Las integraciones deberían tratar esas condiciones como capacidad negociada. Medir la tasa de éxito, los abandonos y los fallos por versión permitirá decidir si el nuevo recorrido mejora el acceso sin crear un punto frágil en la recuperación de cuentas.
