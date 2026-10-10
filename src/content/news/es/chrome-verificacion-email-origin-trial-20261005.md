---
translationId: chrome-verificacion-email-origin-trial-20261005
lang: es
slug: chrome-verificacion-email-origin-trial-20261005
title: "La verificación de correo de Chrome entra en una fase crítica para integradores"
description: "La actualización de octubre del origin trial añade Android, tokens para terceros y cambios criptográficos que obligan a verificadores y proveedores a preparar una migración"
publishedAt: 2026-10-05
sourceName: "Chrome for Developers"
sourceTitle: "Email verification updates, October 2026"
sourceUrl: "https://developer.chrome.com/blog/email-verification-october-2026"
author: "Rowan Merewood"
tags: ["chrome", "apis-web", "identidad", "autenticacion", "javascript"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

La propuesta de Email Verification de Chrome se acerca a una posible llegada estable, pero la actualización de octubre deja claro que todavía es un protocolo en evolución. El origin trial, iniciado en Chrome 150 para escritorio, permite que un sitio confirme la posesión de una dirección mediante un token emitido por el proveedor de correo, reduciendo la necesidad de enviar al usuario a otra pestaña para abrir un enlace o copiar un código.

La novedad más visible es el soporte en Chrome para Android desde la versión 154. Según Chrome, los verificadores y los proveedores no necesitan cambiar su interfaz de integración por este motivo: se mantiene el mismo protocolo y continúan los requisitos, incluido que el usuario haya iniciado sesión en su proveedor dentro del navegador. El cambio amplía el entorno de prueba, pero no convierte la función en una solución universal para todas las aplicaciones móviles.

La actualización también permite origin trials de terceros. Esto resulta útil para un SDK o un script de identidad que se inserta en múltiples sitios: el proveedor puede registrar un token de prueba para que las páginas que lo integran no tengan que gestionar uno distinto. La restricción es importante para el modelo de seguridad: el registrante del trial y el emisor deben pertenecer al mismo sitio. Un subdominio o un dominio diferente no es automáticamente válido.

Hay además detalles de validación que pueden romper integraciones aparentemente correctas. Al comprobar un Email Verification Token, el servidor consulta el conjunto de claves públicas del proveedor y verifica la firma. El campo opcional `kid` identifica la clave usada, pero no todos los tokens lo incluyen. La guía de Chrome pide que los verificadores puedan probar las claves disponibles cuando ese identificador no aparece, en lugar de asumir que siempre estará presente.

Desde Chrome 156, el correo incluido en el token se devuelve exactamente como se introdujo en el formulario. Los verificadores deberían comparar la dirección sin distinguir mayúsculas y minúsculas, mientras que los proveedores deben comprobar que su respuesta coincide con el valor firmado y recibido. La motivación es limitar la exposición de información: Chrome no debería revelar una forma canónica de la cuenta distinta de la dirección que el usuario entregó.

También cambia el valor de `Sec-Fetch-Dest` en las solicitudes de emisión. Chrome 154 usa `email-verification`, con guion, frente a `emailverification` en Chrome 153. Los endpoints que validen este encabezado, una práctica recomendable para reducir solicitudes fuera de contexto y ciertos riesgos de CSRF, deberían aceptar ambos valores durante la transición.

La lección para los equipos no es activar el trial y olvidar el protocolo. Es tratar cada origin trial como una API experimental: leer las notas de compatibilidad, probar tokens con distintas claves, mantener una ventana de migración y verificar los encabezados en producción. La autenticación web depende tanto de la criptografía como de los detalles de interoperabilidad. Un cambio de una palabra en un encabezado puede ser pequeño en el navegador y material en un sistema distribuido.
