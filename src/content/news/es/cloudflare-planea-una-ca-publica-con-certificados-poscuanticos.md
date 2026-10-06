---
translationId: cloudflare-public-ca-postquantum-20260929
lang: es
slug: cloudflare-planea-una-ca-publica-con-certificados-poscuanticos
title: "Cloudflare planea una autoridad certificadora pública preparada para la transición poscuántica"
description: "La compañía solicita entrar en los programas raíz de los principales navegadores y combina un certificado raíz existente, ACME y Merkle Tree Certificates."
publishedAt: 2026-09-29
sourceName: "Cloudflare Blog"
sourceTitle: "Building a certificate authority for the whole Internet"
sourceUrl: "https://blog.cloudflare.com/cloudflare-certificate-authority/"
author: "Steve Goldsmith"
tags: ["seguridad", "tls", "criptografia", "webpki", "poscuantica"]
readingTime: 5
aiDisclosure: "Contenido generado automáticamente con IA."
---

Cloudflare ha anunciado su intención de convertirse en una autoridad certificadora pública, aunque todavía no emite certificados. La empresa afirma haber solicitado su incorporación a los programas raíz de Chrome, Apple, Microsoft y Mozilla, y haber firmado un acuerdo para adquirir una raíz de confianza establecida de GlobalSign. El objetivo declarado es combinar compatibilidad inmediata con una arquitectura preparada para los cambios de la WebPKI.

La decisión responde a un problema operativo concreto. Una raíz nueva necesita ser aceptada por los programas de confianza y después distribuirse mediante sistemas operativos, navegadores y dispositivos. Ese proceso deja fuera a clientes antiguos que siguen generando tráfico. Cloudflare pretende usar la raíz existente para alcanzar ese parque desde el primer día y, al mismo tiempo, presentar nuevas raíces ajustadas a las políticas futuras de los principales programas de confianza.

El servicio se diseñaría con ACME como vía principal de emisión y renovación. ACME ya es el protocolo utilizado por muchas automatizaciones de certificados, por lo que una migración podría limitarse a cambiar la URL del directorio en lugar de introducir una herramienta diferente. La empresa también plantea exigir compatibilidad con ACME Renewal Information, una extensión que permite consultar ventanas de renovación y relacionar el certificado nuevo con el que sustituye. Esa exigencia convierte la renovación automática en una condición de resiliencia, no solo en una comodidad.

Cloudflare presenta la redundancia como otra razón para entrar en el mercado. Según su explicación, una concentración excesiva en una autoridad certificadora gratuita puede convertirse en un riesgo sistémico si esa entidad sufre una interrupción, una revocación masiva o un problema operativo. Un segundo emisor automatizado podría ofrecer una ruta alternativa, aunque solo sería útil si mantiene una cobertura de confianza y una capacidad de emisión suficientes.

La parte más relevante para la transición criptográfica son los Merkle Tree Certificates, o MTC. Cloudflare los describe como una forma más compacta de representar certificados públicos en un escenario poscuántico, donde las cadenas tradicionales pueden aumentar de tamaño y presionar los handshakes TLS. La compañía planea emitir los primeros certificados MTC en producción durante el primer trimestre de 2027, sujeto al avance de los programas raíz y del trabajo de estandarización.

La estrategia no exige elegir de inmediato entre certificados clásicos y poscuánticos. Cloudflare pretende ofrecer ambos bajo una misma autoridad, con ciclos de vida y garantías comunes, para que los clientes migren gradualmente. Esa compatibilidad es importante: cambiar la criptografía de la WebPKI no consiste únicamente en generar claves nuevas, sino en mantener interoperabilidad con clientes antiguos mientras los navegadores y sistemas operativos adoptan nuevos mecanismos.

El anuncio sigue siendo un plan, no una capacidad disponible. Su valor técnico está en tratar la emisión, la renovación, la distribución de confianza, la transparencia operativa y la migración poscuántica como un único sistema. Cloudflare también promete publicar compilaciones reproducibles, acreditar los módulos de seguridad que custodian las claves y ofrecer un panel público de salud. Esas medidas no sustituyen a las auditorías, pero podrían aportar señales operativas entre una auditoría y la siguiente.
