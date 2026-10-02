---
translationId: dirtyblanket-npm-worm-20260929
lang: es
slug: dirtyblanket-npm-gusano-linux-paquetes-falsos
title: "Nueve paquetes falsos de npm convierten un `preinstall` en un gusano para Linux"
description: "El incidente DirtyBlanket combina suplantación de paquetes, descargas externas y robo de credenciales para propagarse desde una instalación de Node.js."
publishedAt: 2026-09-29
sourceName: "SafeDep"
sourceTitle: "DirtyBlanket: Fake Express Packages on npm Spread a Linux Worm"
sourceUrl: "https://safedep.io/dirtyblanket-express-impersonation-npm/"
author: "Kunal Singh"
tags: ["seguridad", "npm", "nodejs", "supply-chain", "malware"]
readingTime: 4
aiDisclosure: "Contenido generado automáticamente con IA."
---

SafeDep ha documentado una campaña que publicó nueve paquetes maliciosos en npm bajo la cuenta `dirtyblanket`. Ocho imitaban nombres y versiones de Express y otro imitaba React. Según el análisis, todos fueron publicados el 29 de septiembre de 2026 en un intervalo de 33 minutos. El objetivo no era simplemente engañar a un desarrollador, sino convertir la instalación de una dependencia en el primer paso de una infección con capacidad de propagación.

El mecanismo inicial se apoyaba en un script `preinstall`. Al ejecutar `npm install` en Linux, el paquete descargaba un archivo JavaScript desde una instantánea de Internet Archive y lo ejecutaba con Node.js. Ese archivo obtenía después `linux.sh` desde Codeberg y lo canalizaba directamente a Bash. La primera descarga no estaba incluida en el paquete, carecía de una versión fijada y no incorporaba una comprobación de integridad, por lo que el contenido podía cambiar fuera del control del registro npm.

El segundo script instalaba un backdoor basado en la herramienta de acceso remoto CHAOS y lo disfrazaba como un servicio de fuentes de systemd. El informe describe dos comportamientos especialmente relevantes. Primero, el malware podía utilizar Tor para proporcionar acceso remoto, manipulación de archivos y capturas de pantalla. Segundo, intentaba reutilizar las claves privadas SSH encontradas en el equipo para conectarse a los hosts presentes en `known_hosts`. En las máquinas comprometidas también buscaba tokens de npm y repositorios del Arch User Repository para publicar nuevas versiones maliciosas.

La cadena demuestra por qué la seguridad de dependencias no termina al comprobar el nombre y la versión de un paquete. La resolución correcta de un paquete popular puede seguir ejecutando código arbitrario durante la instalación, y un script externo introduce además una segunda cadena de suministro. Los lockfiles ayudan a fijar versiones, pero no convierten en segura una URL descargada dinámicamente desde un hook. Del mismo modo, una revisión superficial del código del paquete puede no detectar el payload si este llega después desde la red.

La respuesta debe combinar controles, no depender de una única herramienta. En entornos donde no sean necesarios, los equipos pueden desactivar los scripts de ciclo de vida y reservarlos para dependencias revisadas. Las instalaciones de CI deberían ejecutarse con permisos mínimos, sin claves SSH persistentes y con tokens de publicación de corta duración y alcance limitado. También resulta útil bloquear salidas de red inesperadas durante la instalación, revisar hooks antes de aceptar nuevas dependencias y separar el entorno de compilación del resto de la infraestructura.

SafeDep recomienda tratar como comprometidos los equipos Linux que hayan instalado uno de los paquetes. Eso implica aislarlos, rotar credenciales y revisar los repositorios y hosts accesibles desde ellos. La parte más instructiva del caso no es solo el nombre de los paquetes, sino la combinación de suplantación, ejecución silenciosa en segundo plano, persistencia y propagación lateral. Para proyectos JavaScript, `npm install` debe considerarse una operación con efectos de seguridad, no una tarea puramente administrativa.
