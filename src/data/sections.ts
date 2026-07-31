import { routesByLanguage, type Language } from '@/data/i18n';

export type SectionTheme = 'intro' | 'profile' | 'method' | 'architecture' | 'experience' | 'projects' | 'stack' | 'contact';

export interface SectionItemLink {
  label: string;
  href: string;
}

export interface PortfolioSection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  eyebrow?: string;
  theme: SectionTheme;
  accentColor: string;
  content: string;
  items?: Array<string | SectionItemLink>;
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
        'Diseño y desarrollo interfaces web para entornos exigentes, con foco en claridad técnica, rendimiento, mantenibilidad y experiencia de usuario. Trabajo especialmente cómodo en producto bancario, arquitectura UI, calidad frontend y aplicaciones web móviles.',
      items: [
        'Banca móvil e inversión',
        'Arquitectura UI con Ember y Lit',
        'Rendimiento y calidad frontend',
        'Coordinación técnica de producto',
      ],
      actions: [
        { label: 'Ver experiencia', href: routesByLanguage.es.experience },
        { label: 'Ver proyectos', href: routesByLanguage.es.projects },
      ],
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
      subtitle: 'Experiencia, criterio técnico y capacidad para llevar productos completos desde la idea hasta su evolución.',
      eyebrow: 'Proceso',
      theme: 'method',
      accentColor: '#4f46e5',
      content:
        'Trabajo para convertir necesidades complejas en productos útiles, comprensibles y sostenibles. Empiezo por entender el problema, el contexto y las restricciones; después alineo las decisiones con producto, diseño, backend y negocio. Mi experiencia me ayuda a detectar riesgos y elegir una solución proporcionada, sin perder de vista a quien va a utilizarla. En la ejecución, Codex forma parte importante de mi método actual: me ayuda a explorar alternativas, transformar especificaciones en código y mantener el ritmo, pero el criterio, la revisión y la responsabilidad siguen siendo míos. Trabajo de principio a fin —arquitectura, interfaz, datos, despliegue y evolución— y reviso cada etapa para equilibrar experiencia, calidad técnica y entrega.',
      items: ['Entender antes de construir', 'Decidir con el equipo', 'Construir y revisar con IA', 'Evolucionar lo que funciona'],
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
      id: 'experience',
      slug: 'experiencia',
      title: 'Experiencia',
      subtitle: 'De prácticas en industria a frontend senior en banca móvil e inversión.',
      eyebrow: 'Trabajo',
      theme: 'experience',
      accentColor: '#334155',
      content:
        'Mi recorrido profesional combina producto bancario, mobile web, desarrollos a medida, SaaS de gestión empresarial e integración con clientes reales. La experiencia laboral ya está revisada por etapas y separada de los proyectos representativos.',
      items: ['BBVA', 'Mobile One2One', 'Geanet onDemand', 'ComNet', 'Goitek'],
      actions: [{ label: 'Ver experiencia', href: routesByLanguage.es.experience }],
    },
    {
      id: 'projects',
      slug: 'proyectos',
      title: 'Proyectos',
      subtitle: 'Banca digital, booking, e-commerce móvil y aplicaciones internas.',
      eyebrow: 'Casos',
      theme: 'projects',
      accentColor: '#9333ea',
      content:
        'Los proyectos se revisarán aparte, empezando por GitHub y por los casos públicos que puedan enseñarse con rigor. Esta sección queda reservada para seleccionar trabajo representativo sin mezclarlo con la cronología laboral.',
      items: ['GitHub', 'Casos públicos', 'Trabajo representativo'],
      actions: [{ label: 'Ver proyectos', href: routesByLanguage.es.projects }],
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
        'La forma más directa de contacto es por email o LinkedIn. Si quieres hablar sobre frontend, arquitectura UI, producto web o colaboración técnica, estaré encantado de leerte.',
      items: [
        { label: 'hola@conquense.dev', href: 'mailto:hola@conquense.dev' },
        { label: 'LinkedIn', href: 'https://es.linkedin.com/in/rgarcia85' },
        { label: 'GitHub', href: 'https://github.com/ralph1985' },
      ],
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
        'I design and build web interfaces for demanding environments, with a strong focus on technical clarity, performance, maintainability and user experience. I am especially comfortable with banking product, UI architecture, frontend quality and mobile web applications.',
      items: ['Mobile banking and investment', 'UI architecture', 'Senior JavaScript', 'Quality and review'],
      actions: [
        { label: 'View experience', href: routesByLanguage.en.experience },
        { label: 'View projects', href: routesByLanguage.en.projects },
      ],
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
      subtitle: 'Experience, technical judgement and the ability to take complete products from idea to evolution.',
      eyebrow: 'Process',
      theme: 'method',
      accentColor: '#4f46e5',
      content:
        'I work to turn complex needs into useful, understandable and sustainable products. I start by understanding the problem, the context and the constraints; then I align decisions with product, design, backend and business. My experience helps me identify risks and choose a proportionate solution without losing sight of the people who will use it. In execution, Codex is an important part of my current method: it helps me explore alternatives, turn specifications into code and keep moving, but the judgement, review and responsibility remain mine. I work across the full cycle —architecture, interface, data, deployment and evolution— and review each stage to balance user experience, technical quality and delivery.',
      items: ['Understand before building', 'Decide with the team', 'Build and review with AI', 'Evolve what works'],
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
      id: 'experience',
      slug: 'experience',
      title: 'Experience',
      subtitle: 'From an industrial internship to senior frontend work in mobile banking and investment.',
      eyebrow: 'Work',
      theme: 'experience',
      accentColor: '#334155',
      content:
        'My professional path combines banking product, mobile web, custom development, business-management SaaS and integration with real clients. The work experience is now reviewed by stage and separated from representative projects.',
      items: ['BBVA', 'Mobile One2One', 'Geanet onDemand', 'ComNet', 'Goitek'],
      actions: [{ label: 'View experience', href: routesByLanguage.en.experience }],
    },
    {
      id: 'projects',
      slug: 'projects',
      title: 'Projects',
      subtitle: 'Digital banking, booking, mobile e-commerce and internal applications.',
      eyebrow: 'Cases',
      theme: 'projects',
      accentColor: '#9333ea',
      content:
        'Projects will be reviewed separately, starting with GitHub and public cases that can be shown rigorously. This section is reserved for representative work without mixing it with the employment timeline.',
      items: ['GitHub', 'Public cases', 'Representative work'],
      actions: [{ label: 'View projects', href: routesByLanguage.en.projects }],
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
        'The most direct way to get in touch is by email or LinkedIn. If you want to talk about frontend, UI architecture, web product or technical collaboration, I will be glad to hear from you.',
      items: [
        { label: 'hola@conquense.dev', href: 'mailto:hola@conquense.dev' },
        { label: 'LinkedIn', href: 'https://es.linkedin.com/in/rgarcia85' },
        { label: 'GitHub', href: 'https://github.com/ralph1985' },
      ],
    },
  ],
};

export const portfolioSections = localizedPortfolioSections.es;
