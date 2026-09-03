---
translationId: kubernetes-v137-garhwal
lang: es
slug: kubernetes-137-mejora-resiliencia-escala-y-aislamiento
title: "Kubernetes 1.37 lleva la resiliencia del plano de control y la gestión de recursos un paso más allá"
description: "La versión 1.37 de Kubernetes incorpora mejoras estables, beta y alpha para reforzar el plano de control, reducir costes y preparar cargas de IA con requisitos de planificación más"
publishedAt: 2026-08-26
sourceName: "Kubernetes Blog"
sourceTitle: "Kubernetes v1.37: Garhwal"
sourceUrl: "https://kubernetes.io/blog/2026/08/26/kubernetes-v1-37-release/"
author: "Kubernetes v1.37 Release Team"
tags: ["kubernetes", "cloud-native", "arquitectura", "sistemas", "rendimiento"]
readingTime: 4
aiDisclosure: "Texto generado por IA y revisado antes de su publicación."
---

Kubernetes 1.37, publicado el 26 de agosto, reúne 67 mejoras: 16 llegan a Stable, 23 a Beta, 27 entran en Alpha y una función se retira. Más que una versión centrada en una única novedad, Garhwal muestra una evolución del proyecto hacia planos de control más resistentes, una gestión de recursos más precisa y mejores primitivas para cargas complejas.

Uno de los cambios más relevantes afecta a la inicialización del watch cache del API server. Cuando el caché arranca o se reconstruye, Kubernetes evita que las peticiones list y watch generen de golpe una avalancha contra etcd. Las solicitudes se acotan y, cuando no pueden atenderse, se rechazan con HTTP 429. Para operadores y autores de controladores, esto hace más importante tratar 429 como una respuesta normal de presión: hay que respetar Retry-After y aplicar backoff exponencial en lugar de reintentar inmediatamente.

El HorizontalPodAutoscaler para escalar hasta cero llega a Beta y queda habilitado por defecto. La capacidad está pensada para workloads que usan métricas externas u objetuales, como consumidores de colas, trabajos batch o ciertos servicios con GPU. No funciona con CPU y memoria, porque esas métricas dependen de que existan Pods activos. Bien aplicada, la opción puede reducir consumo cuando no hay trabajo, aunque obliga a diseñar cuidadosamente el tiempo de arranque y la latencia de recuperación.

La configuración de admission basada en manifiestos también alcanza Beta. Webhooks y políticas CEL pueden cargarse desde disco al iniciar el API server, seguir activas aunque etcd no esté disponible y proteger los propios recursos de admisión almacenados en la API. Esto ofrece una raíz de confianza más estable durante el arranque y durante incidentes del almacenamiento del clúster.

La versión añade además checkpoint y restore a nivel de Pod en Alpha, nuevas capacidades de Dynamic Resource Allocation, estadísticas obtenidas directamente mediante CRI y soporte Beta para memory QoS con cgroups v2. Para equipos de IA y machine learning, CompositePodGroup introduce una forma jerárquica de describir grupos de Pods, útil para planificación conjunta, preempción consciente del workload y colocación orientada a topología.

La actualización requiere revisión, no solo cambio de imagen. Los clústeres con SELinux deben comprobar si sus volúmenes comparten etiquetas distintas: el nuevo montaje puede hacer que algunos Pods no arranquen y existe una opción temporal para conservar el comportamiento anterior. También conviene verificar clientes frente a 429, métricas `metrics.k8s.io`, cgroups v2 y drivers compatibles con DRA. El valor técnico de 1.37 está en convertir límites operativos conocidos —presión sobre etcd, recursos o aislamiento de políticas— en comportamientos explícitos y observables.
