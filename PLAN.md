# Plan operativo

Este documento guía el trabajo por hitos de Conquense Dev. Es la fuente de verdad para decidir el siguiente paso, cerrar cada entrega y evitar cambios grandes sin dirección.

## Estado actual

- Repositorio Astro inicial creado y publicado en GitHub.
- Stack base: Astro, TypeScript, Tailwind CSS, DaisyUI y scripts cliente mínimos.
- Experiencia principal: scroll vertical nativo con navegación de progreso y fallback accesible para movimiento reducido.
- Secciones actuales: Inicio, Perfil, Cómo trabajo, Arquitectura, Proyectos, Stack y Contacto.
- Contenido actual: primera versión profesional bilingüe ES/EN, redactada a partir de un CV antiguo como material provisional.
- Rutas actuales: `/`, `/proyectos/`, `/experiencia/`, `/en/`, `/en/projects/` y `/en/experience/`.

## Reglas de trabajo

- Trabajar hito a hito, sin adelantar features de hitos posteriores salvo que desbloqueen el hito activo.
- Mantener las secciones en `src/data/sections.ts` mientras no se apruebe otra arquitectura.
- No añadir frameworks cliente, CMS, analítica ni smooth-scroll externo sin aprobación explícita.
- No publicar teléfono móvil por defecto; el contacto público será email y LinkedIn.
- No inventar métricas, cargos, resultados, tecnologías recientes ni responsabilidades no confirmadas por el usuario.
- Cada hito debe cerrarse con commit Conventional Commit en inglés y push a `origin/main`.

## Hitos

### M1 - Base funcional

**Estado:** completado.

Objetivo: dejar una primera app funcional, documentada y publicada.

Cierre:

- Astro inicializado.
- Scroll horizontal implementado con GSAP ScrollTrigger.
- Fallback vertical con `prefers-reduced-motion` disponible.
- README, decisiones arquitectónicas, agentes y contexto del proyecto creados.
- Git inicializado y repo público en GitHub.

### M2 - Contenido real

**Estado:** completado.

Objetivo: convertir el contenido placeholder en una narrativa profesional orientada a Frontend Senior.

Alcance:

- Usar el CV antiguo como fuente provisional.
- Reescribir las 7 secciones con tono profesional, claro y actual.
- Enfatizar arquitectura UI, mobile web, JavaScript, calidad, rendimiento y experiencia en entornos complejos.
- Mantener pendiente la actualización del CV y la exportación de LinkedIn.
- Revisar todos los enlaces antiguos antes de usarlos públicamente.

Cierre:

- No queda Lorem Ipsum visible.
- El contenido no expone el teléfono móvil.
- La sección Contacto usa email y LinkedIn.
- `npm run lint` y `npm run build` pasan.
- Commit y push realizados.

### M3 - Actualización CV y LinkedIn

**Estado:** activo.

Objetivo: actualizar la base factual del contenido profesional.

Alcance:

- Incorporar CV actualizado cuando esté disponible.
- Exportar datos de LinkedIn o revisar el perfil manualmente.
- Actualizar rol actual, fechas, stack reciente, logros e impacto.
- Ajustar la narrativa de M2 si los nuevos datos cambian prioridades.

Cierre:

- Fuente profesional actualizada y revisada.
- Contenido del portfolio alineado con CV y LinkedIn.
- Datos personales públicos revisados.

### M3b - Preparación inglés

**Estado:** completado.

Objetivo: dejar preparada y publicada una primera versión inglesa sin bloquear M3.

Cierre:

- Contenido principal, proyectos y experiencia disponibles en ES/EN.
- Rutas inglesas publicadas bajo `/en/`.
- `lang`, canonical y `hreflang` configurados por ruta.
- Cambio de idioma disponible desde la navegación.
- La traducción queda marcada como provisional hasta actualizar CV y LinkedIn.

### M4 - Pulido visual y responsive

**Estado:** completado.

Objetivo: elevar el acabado visual con un sistema de estilos explícito y mantenible.

Cierre:

- Migración de SCSS a Tailwind CSS y DaisyUI con tema propio claro/oscuro.
- Componentes Astro existentes conservados como unidades de composición y datos.
- Responsive, foco visible y `prefers-reduced-motion` cubiertos en la nueva capa visual.
- `npm run lint` y `npm run build` pasan.

Alcance:

- Ajustar composición, ritmo, jerarquía tipográfica y espaciados.
- Revisar móvil, tablet y escritorio.
- Afinar navegación fija, indicadores, foco visible y legibilidad.
- Mantener una estética sobria, técnica y no orientada a agencia creativa.

Cierre:

- Capturas o revisión manual en escritorio y móvil.
- Sin solapamientos ni saltos visuales relevantes.
- `npm run lint` y `npm run build` pasan.

### M5 - Accesibilidad y rendimiento

**Estado:** pendiente.

Objetivo: validar que la experiencia es usable, ligera y respetuosa con preferencias del usuario.

Alcance:

- Revisar navegación por teclado.
- Revisar `prefers-reduced-motion`.
- Revisar landmarks, headings, foco visible y contraste.
- Medir bundle, CLS básico y errores de consola.

Cierre:

- Flujo principal usable con teclado.
- Reduced motion sin desplazamiento horizontal forzado.
- Sin errores de consola.
- `npm run lint` y `npm run build` pasan.

### M6 - SEO y publicación

**Estado:** pendiente.

Objetivo: preparar la web pública para ser compartida.

Alcance:

- Definir title, description, canonical y Open Graph reales.
- Añadir imagen social y favicon definitivos.
- Revisar idioma, metadatos y enlaces públicos.
- Documentar la URL final de publicación cuando exista.

Cierre:

- Metadata real configurada.
- Imagen OG disponible.
- URL pública revisada.
- `npm run lint` y `npm run build` pasan.

### M7 - Casos de proyecto

**Estado:** iniciado.

Objetivo: convertir experiencia y proyectos en casos reales ampliables.

Alcance:

- Seleccionar proyectos profesionales o personales que puedan contarse públicamente.
- Definir formato para casos: contexto, problema, rol, decisiones, resultado y stack.
- Evitar información confidencial de clientes o empleadores.

Cierre:

- Proyectos renderizados desde datos estructurados.
- Sin datos confidenciales ni claims no verificables.
- `npm run lint` y `npm run build` pasan.

## Pendientes de contenido

- Exportar datos de LinkedIn más adelante.
- Actualizar el CV antes de considerar final el contenido profesional.
- Revisar la traducción inglesa después de actualizar CV y LinkedIn.
- Confirmar si el email público será el personal actual o uno específico para el portfolio.
- Revisar enlaces antiguos del CV antes de publicarlos.
- Definir proyectos/casos que se pueden contar sin problemas de confidencialidad.

## Próximo paso

El siguiente hito activo sigue siendo `M3 - Actualización CV y LinkedIn`. Si se aplaza contenido, el siguiente avance técnico recomendado es `M4 - Pulido visual y responsive`.
