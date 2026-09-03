---
translationId: rust-arrayref-supply-chain-attack
lang: es
slug: ataque-de-cadena-de-suministro-afecta-a-arrayref
title: "Un ataque de cadena de suministro afecta a arrayref en crates.io"
description: "El equipo de seguridad de Rust retiró varias crates maliciosas después de detectar un script de compilación que descargaba una carga útil, con impacto potencial en proyectos que us"
publishedAt: 2026-08-20
sourceName: "Rust Blog"
sourceTitle: "Supply chain attack on arrayref"
sourceUrl: "https://blog.rust-lang.org/2026/08/20/supply-chain-attack-on-arrayref/"
author: "Manish Goregaokar"
tags: ["rust", "seguridad", "supply-chain", "dependencias"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

El equipo de respuesta de seguridad de Rust informó el 20 de agosto de un ataque de cadena de suministro relacionado con varias crates publicadas en crates.io. El incidente comenzó con un aviso sobre `proc-macro1`; la investigación confirmó que incluía un script de compilación capaz de descargar una carga útil maliciosa. Durante la respuesta también se descubrió que la crate popular `arrayref` había sido republicada y configurada para depender de ella.

Las versiones identificadas fueron retiradas del registro. Entre ellas están `arrayref@0.3.10`, disponible durante 86 minutos, `internment@0.8.7`, durante 90 minutos, y `append-only-vec@0.1.9`, durante 107 minutos. También se eliminaron `proc-macro1`, `proc-macro-en`, `aovine`, `arone`, `aronenao` y `tinymember` en las versiones afectadas. El equipo considera probable que el ordenador o las credenciales del autor de `arrayref` estuvieran comprometidos, pero no atribuye una intención maliciosa al mantenedor.

La importancia técnica está en el punto donde se ejecuta el código. Un script de compilación no es solo una fase pasiva de empaquetado: puede ejecutarse durante la construcción de una dependencia y descargar o preparar componentes para el entorno que compila. Si una crate aparentemente inocua incorpora una dependencia comprometida, el riesgo puede llegar a proyectos que nunca añadieron directamente el paquete malicioso. La relación transitiva de `arrayref` ilustra por qué revisar únicamente las dependencias declaradas en el manifiesto no es suficiente.

La primera respuesta para los equipos Rust es comprobar si alguna de las versiones afectadas llegó a sus máquinas. El aviso oficial propone buscar los archivos correspondientes en `~/.cargo/registry/cache`, incluyendo cualquier versión de las crates maliciosas sin versión segura específica. Esa revisión debe complementarse con la inspección de `Cargo.lock`, del grafo de dependencias y de los artefactos producidos por CI durante la ventana de exposición. El objetivo es distinguir entre una versión publicada en el registro y una versión que realmente fue descargada o compilada.

Retirar una versión del registro no borra automáticamente copias locales, cachés de CI ni artefactos ya generados. Por eso conviene conservar evidencias, invalidar cachés según el procedimiento interno y repetir las compilaciones desde fuentes verificadas. Si una versión afectada estuvo presente en un entorno con secretos o permisos relevantes, el equipo debe evaluar la rotación de credenciales y la revisión de resultados como parte de su respuesta habitual a un posible compromiso de build.

El incidente también muestra el valor de la respuesta coordinada del ecosistema. El equipo de Rust eliminó los paquetes maliciosos, restauró versiones retiradas de forma preventiva y bloqueó la cuenta implicada mientras contactaba con el autor. Para los mantenedores, la lección operativa es mantener protegidas las credenciales de publicación, revisar cambios inesperados en dependencias y tratar los scripts de build como código con capacidad real de ejecución.
