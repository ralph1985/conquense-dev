export type SectionTheme = 'intro' | 'profile' | 'method' | 'architecture' | 'projects' | 'stack' | 'contact';

export interface PortfolioSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  theme: SectionTheme;
  accentColor: string;
  content: string;
  items?: string[];
}

export const portfolioSections: PortfolioSection[] = [
  {
    id: 'home',
    slug: 'inicio',
    title: 'Rafael García Prieto',
    subtitle: 'Frontend Senior especializado en arquitectura UI, JavaScript y aplicaciones web móviles.',
    eyebrow: 'Portfolio',
    theme: 'intro',
    accentColor: '#2563eb',
    content:
      'Diseño y desarrollo interfaces web para entornos exigentes, con foco en claridad técnica, rendimiento, mantenibilidad y experiencia de usuario. Esta es una primera versión del portfolio, construida a partir de un CV que todavía debe actualizarse.',
  },
  {
    id: 'profile',
    slug: 'perfil',
    title: 'Perfil',
    subtitle: 'Más de 15 años construyendo producto web, con una etapa larga centrada en mobile web y banca digital.',
    eyebrow: 'Sobre mí',
    theme: 'profile',
    accentColor: '#0f766e',
    content:
      'Mi trayectoria combina desarrollo frontend, análisis técnico, colaboración con producto y entrega en equipos multidisciplinares. He trabajado en aplicaciones para banca, viajes, e-commerce, hospitality y herramientas internas, con especial atención a interfaces robustas y sostenibles.',
    items: ['Frontend senior', 'Mobile web', 'Producto digital'],
  },
  {
    id: 'workflow',
    slug: 'como-trabajo',
    title: 'Cómo trabajo',
    subtitle: 'Decisiones explícitas, código revisable y avances pequeños que reducen riesgo.',
    eyebrow: 'Proceso',
    theme: 'method',
    accentColor: '#4f46e5',
    content:
      'Trabajo desde el entendimiento del problema hacia una solución simple de operar: requisitos claros, arquitectura proporcional, implementación incremental, pruebas cuando aportan valor y revisión de código como parte natural del proceso.',
    items: ['Análisis', 'Clean code', 'Code review', 'Entrega incremental'],
  },
  {
    id: 'architecture',
    slug: 'arquitectura',
    title: 'Arquitectura',
    subtitle: 'Interfaces mantenibles para productos que evolucionan durante años.',
    eyebrow: 'Sistemas',
    theme: 'architecture',
    accentColor: '#475569',
    content:
      'He participado en el diseño y evolución de arquitecturas frontend para aplicaciones con lógica de negocio compleja, integración con servicios, testing, integración continua y equipos distribuidos. Priorizo fronteras claras, datos explícitos y componentes que se entienden sin ceremonia.',
    items: ['Arquitectura UI', 'Testing', 'Integración continua'],
  },
  {
    id: 'projects',
    slug: 'proyectos',
    title: 'Proyectos',
    subtitle: 'Banca digital, booking, e-commerce móvil y aplicaciones internas.',
    eyebrow: 'Trabajo',
    theme: 'projects',
    accentColor: '#9333ea',
    content:
      'He trabajado en operativas web móviles para BBVA, aplicaciones de inversión y banca privada, plataformas de reserva para compañías de transporte y hoteles, supermercado online y herramientas de gestión para empleados. Los enlaces antiguos del CV quedan pendientes de revisión antes de publicarse.',
    items: ['BBVA', 'Mobile commerce', 'Booking', 'Herramientas internas'],
  },
  {
    id: 'stack',
    slug: 'stack',
    title: 'Stack',
    subtitle: 'JavaScript como eje, con experiencia complementaria en backend, datos y entrega.',
    eyebrow: 'Tecnología',
    theme: 'stack',
    accentColor: '#0369a1',
    content:
      'Mi base principal está en JavaScript, HTML y CSS, con experiencia en Ember, LitElement, jQuery, SCSS, tooling frontend, testing, Git, CI y trabajo con APIs REST. También arrastro una base sólida en PHP, SQL y aplicaciones de gestión, útil para entender producto más allá de la capa visual.',
    items: ['JavaScript', 'Ember', 'LitElement', 'SCSS', 'Testing', 'Git'],
  },
  {
    id: 'contact',
    slug: 'contacto',
    title: 'Contacto',
    subtitle: 'Disponible para conversaciones profesionales sobre frontend, arquitectura UI y producto web.',
    eyebrow: 'Hablemos',
    theme: 'contact',
    accentColor: '#111827',
    content:
      'La forma más directa de contacto es por email o LinkedIn. Esta primera versión evita publicar el teléfono móvil y queda pendiente de actualizar con el CV y el perfil de LinkedIn revisados.',
    items: ['rafaelgarcia1985@gmail.com', 'LinkedIn: es.linkedin.com/in/rgarcia85', 'GitHub: ralph1985'],
  },
];
