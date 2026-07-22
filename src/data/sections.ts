import { routesByLanguage, type Language } from '@/data/i18n';

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
  actions?: Array<{
    label: string;
    href: string;
  }>;
}

export const localizedPortfolioSections: Record<Language, PortfolioSection[]> = {
  es: [
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
      actions: [
        { label: 'Ver proyectos', href: routesByLanguage.es.projects },
        { label: 'Ver experiencia', href: routesByLanguage.es.experience },
      ],
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
  ],
  en: [
    {
      id: 'home',
      slug: 'home',
      title: 'Rafael Garcia Prieto',
      subtitle: 'Senior Frontend Engineer focused on UI architecture, JavaScript and mobile web applications.',
      eyebrow: 'Portfolio',
      theme: 'intro',
      accentColor: '#2563eb',
      content:
        'I design and build web interfaces for demanding environments, with a strong focus on technical clarity, performance, maintainability and user experience. This is an early portfolio draft based on a CV that still needs to be updated.',
    },
    {
      id: 'profile',
      slug: 'profile',
      title: 'Profile',
      subtitle: 'More than 15 years building web products, with a long stage focused on mobile web and digital banking.',
      eyebrow: 'About',
      theme: 'profile',
      accentColor: '#0f766e',
      content:
        'My background combines frontend development, technical analysis, product collaboration and delivery in multidisciplinary teams. I have worked on banking, travel, e-commerce, hospitality and internal tools, with particular attention to robust and sustainable interfaces.',
      items: ['Senior frontend', 'Mobile web', 'Digital product'],
    },
    {
      id: 'workflow',
      slug: 'how-i-work',
      title: 'How I work',
      subtitle: 'Explicit decisions, reviewable code and small steps that reduce risk.',
      eyebrow: 'Process',
      theme: 'method',
      accentColor: '#4f46e5',
      content:
        'I move from understanding the problem toward a solution that is simple to operate: clear requirements, proportionate architecture, incremental implementation, tests where they add value and code review as a natural part of the process.',
      items: ['Analysis', 'Clean code', 'Code review', 'Incremental delivery'],
    },
    {
      id: 'architecture',
      slug: 'architecture',
      title: 'Architecture',
      subtitle: 'Maintainable interfaces for products that evolve over years.',
      eyebrow: 'Systems',
      theme: 'architecture',
      accentColor: '#475569',
      content:
        'I have contributed to the design and evolution of frontend architectures for applications with complex business logic, service integration, testing, continuous integration and distributed teams. I prioritize clear boundaries, explicit data and components that can be understood without ceremony.',
      items: ['UI architecture', 'Testing', 'Continuous integration'],
    },
    {
      id: 'projects',
      slug: 'projects',
      title: 'Projects',
      subtitle: 'Digital banking, booking, mobile e-commerce and internal applications.',
      eyebrow: 'Work',
      theme: 'projects',
      accentColor: '#9333ea',
      content:
        'I have worked on BBVA mobile web flows, investment and private banking applications, booking platforms for transport and hotel companies, online grocery shopping and employee management tools. Old CV links remain pending review before being published.',
      items: ['BBVA', 'Mobile commerce', 'Booking', 'Internal tools'],
      actions: [
        { label: 'View projects', href: routesByLanguage.en.projects },
        { label: 'View experience', href: routesByLanguage.en.experience },
      ],
    },
    {
      id: 'stack',
      slug: 'stack',
      title: 'Stack',
      subtitle: 'JavaScript as the core, with complementary experience in backend, data and delivery.',
      eyebrow: 'Technology',
      theme: 'stack',
      accentColor: '#0369a1',
      content:
        'My main foundation is JavaScript, HTML and CSS, with experience in Ember, LitElement, jQuery, SCSS, frontend tooling, testing, Git, CI and REST APIs. I also bring a solid PHP, SQL and management applications background, useful for understanding product beyond the visual layer.',
      items: ['JavaScript', 'Ember', 'LitElement', 'SCSS', 'Testing', 'Git'],
    },
    {
      id: 'contact',
      slug: 'contact',
      title: 'Contact',
      subtitle: 'Available for professional conversations about frontend, UI architecture and web product.',
      eyebrow: 'Let us talk',
      theme: 'contact',
      accentColor: '#111827',
      content:
        'The most direct way to get in touch is email or LinkedIn. This first version avoids publishing my mobile phone number and still needs to be updated with a reviewed CV and LinkedIn profile.',
      items: ['rafaelgarcia1985@gmail.com', 'LinkedIn: es.linkedin.com/in/rgarcia85', 'GitHub: ralph1985'],
    },
  ],
};

export const portfolioSections = localizedPortfolioSections.es;
