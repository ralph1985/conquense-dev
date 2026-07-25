import type { Language } from '@/data/i18n';

export interface ExperienceEntry {
  company: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectHighlight {
  name: string;
  context: string;
  role: string;
  summary: string;
  stack: string[];
}

export interface DetailCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
}

export const professionalContent: Record<
  Language,
  {
    experience: DetailCopy & { items: ExperienceEntry[] };
    projects: DetailCopy & { items: ProjectHighlight[] };
  }
> = {
  es: {
    experience: {
      eyebrow: 'Experiencia',
      title: 'Experiencia profesional',
      subtitle: 'Trayectoria en frontend, mobile web, banca digital, producto y aplicaciones de gestión.',
      description:
        'Contenido provisional extraído del CV antiguo. Falta contrastarlo con LinkedIn y actualizar fechas, stack reciente, impacto y logros.',
      items: [
        {
          company: 'BBVA',
          period: '2016 - actualidad',
          role: 'Senior Frontend Engineer',
          summary:
            'Trabajo en producto de inversión dentro de banca móvil para particulares, combinando desarrollo frontend, criterio arquitectónico y coordinación técnica en funcionalidades complejas.',
          highlights: [
            'Referente técnico dentro del equipo de inversiones para decisiones frontend, definición de componentes, responsabilidades y comunicación entre piezas de UI.',
            'Validador de PRs para el conjunto de la aplicación móvil, con capacidad de validación sobre cambios en una organización de desarrollo amplia.',
            'Coordinación técnica dentro de un equipo frontend de cuatro personas, con apoyo a planificación de hitos, entrega de valor, formación de nuevos compañeros y gestión de deuda técnica.',
            'Validación de viabilidad técnica a partir de necesidades de negocio, coordinación con diseño y backend, diseño de integración con servicios y definición de datos necesarios.',
            'Integración reciente del módulo de tendencias de inversión en la Posición Global del cliente, priorizando rendimiento, convivencia con otros módulos y sincronía con métricas de uso y configuración.',
            'Aterrizaje técnico de una integración con una librería externa de visualización financiera como componente LitElement: requisitos, viabilidad con proveedor, revisión con arquitectura y enfoque Spec-Driven Development para agentes de IA.',
            'Integración de funcionalidades complejas de LitElement dentro de Ember y migración progresiva de piezas antiguas de Ember a LitElement.',
            'Revisión de renderizados innecesarios, peso de engines Ember y calidad frontend mediante accesibilidad, QUnit, Cucumber, ESLint, Prettier, Sonar y plugins internos.',
            'Uso diario de Jira, GitFlow, Agile/Scrum/SAFe y seguimiento de pipelines con Bamboo, Jenkins y GitHub Actions.',
            'Experiencia previa en fondos de terceros, GDPR, banca privada, migración a microservicios multicanal y aplicación de banca particular para México con Cells.',
          ],
          stack: [
            'JavaScript',
            'Ember.js',
            'Web Components',
            'LitElement',
            'Handlebars',
            'SCSS',
            'Chrome DevTools',
            'Accesibilidad',
            'Git',
            'GitFlow',
            'Scrum',
            'Agile',
            'SAFe',
            'Spec-Driven Development',
            'Desarrollo asistido por IA',
            'Jira',
            'ESLint',
            'Prettier',
            'Sonar',
            'QUnit',
            'Cucumber',
            'Bamboo',
            'Jenkins',
            'GitHub Actions',
          ],
        },
        {
          company: 'Mobile One2One',
          period: '2012 - 2016',
          role: 'Analista programador web / Frontend mobile',
          summary:
            'Diseño y desarrollo de aplicaciones mobile web y webapps para clientes como Vueling, Iberostar, National Express, Carrefour y Alsa, combinando frontend, integración con servicios, backend y entrega a producción.',
          highlights: [
            'Trabajo transversal en booking, compra, pagos, webapps mobile, maquetación responsive, backend PHP/Silex, MySQL e integración con APIs REST.',
            'Interlocución directa con cliente en proyectos para Vueling, Iberostar, Renfe y otras cuentas, incluyendo desplazamientos, análisis funcional/técnico, toma de requisitos, estimación parcial y seguimiento hasta producción.',
            'Desarrollo de flujos mobile completos de reserva, compra y pago, con integración de servicios, gestión de estados de operación, validaciones y tratamiento de errores.',
            'Desarrollo para Iberostar de una web de reservas de estancias y una webapp privada para gestión interna de trabajadores, con chat, soporte para tablet y PC y primeras notificaciones web en Google Chrome.',
            'Desarrollo para National Express de flujos de reserva de trayectos, compra de billetes de bus, pago y gestión de QR.',
            'Desarrollo para Carrefour de una experiencia mobile de supermercado online con catálogo, carrito, promociones, pago y navegación lateral compleja por categorías y subcategorías.',
            'Diseño principal desde cero, con colaboraciones puntuales, del framework JavaScript propio MO2OJS, inspirado en patrones de jQuery y usado para routing, AJAX, plantillas propias y vistas en proyectos para Carrefour, National Express, Sanitas y otros clientes.',
            'Criterio técnico para valorar el coste de mantener tooling propio frente a adoptar estándares y frameworks abiertos.',
            'Desarrollo de aplicaciones embebidas con Cordova, una webapp para Tizen en Samsung Watch dentro de un proyecto para Renfe y una aplicación interna para operativas de tripulación de Vueling.',
            'Evolución desde tareas full-stack con PHP hacia un foco cada vez mayor en JavaScript y frontend mobile web.',
          ],
          stack: ['JavaScript', 'jQuery', 'HTML5', 'CSS3', 'Sass', 'PHP', 'Silex', 'REST', 'MySQL', 'Cordova', 'GitLab'],
        },
        {
          company: 'Geanet onDemand',
          period: '2011 - 2012',
          role: 'Desarrollador web full-stack',
          summary:
            'Mantenimiento y evolución de una plataforma SaaS de gestión empresarial con módulos de CRM, ERP, portales, intranet y procesos internos.',
          highlights: [
            'Trabajo principalmente centrado en JavaScript, mantenimiento de producto existente y desarrollo de nuevas funcionalidades.',
            'Resolución de incidencias y soporte interno sobre módulos existentes de la plataforma.',
            'Participación en una nueva versión del producto con foco en evolución de interfaz y mejora de usabilidad.',
            'Desarrollo de informes y funcionalidades para la gestión de declaración de la renta de fundaciones, con formularios largos, validaciones, cálculos y generación de documentación.',
            'Trabajo full-stack con PHP, HTML, CSS, JavaScript, AJAX, JSON, REST y MySQL sobre una plataforma construida con framework propio.',
            'Criterio técnico reforzado sobre el coste de mantener capas internas frente a estándares abiertos.',
          ],
          stack: ['PHP', 'JavaScript', 'jQuery', 'AJAX', 'JSON', 'MySQL', 'SVN'],
        },
        {
          company: 'ComNet',
          period: '2005 - 2011',
          role: 'Analista programador',
          summary:
            'Desarrollo de aplicaciones de gestión web, interfaces para dispositivos biométricos, control presencial, cálculo de nóminas y trato directo con clientes finales.',
          highlights: [
            'Análisis, documentación y diseño de arquitectura para aplicaciones de gestión.',
            'Interfaz web de gestión para dispositivos biométricos.',
            'Desarrollos complementarios en videoconferencia y videovigilancia móvil.',
          ],
          stack: ['PHP', 'CodeIgniter', 'jQuery', 'SQL Server', 'MySQL', 'C#', 'Visual Basic 6'],
        },
        {
          company: 'Goitek',
          period: '2005',
          role: 'Programador junior',
          summary:
            'Primer trabajo profesional desarrollando procedimientos almacenados e interfaces para control de procesos productivos en tiempo real.',
          highlights: ['Desarrollo SQL DML/DDL.', 'Interfaces de usuario para procesos industriales.'],
          stack: ['Visual Basic 6', 'SQL Server', 'OLANET'],
        },
      ],
    },
    projects: {
      eyebrow: 'Proyectos',
      title: 'Proyectos',
      subtitle: 'Trabajo representativo en banca digital, mobile commerce, booking y herramientas internas.',
      description:
        'Una primera selección basada en el CV antiguo. Los enlaces y detalles públicos quedan pendientes de revisión antes de ampliar cada caso.',
      items: [
        {
          name: 'Operativas de banca digital',
          context: 'BBVA',
          role: 'Desarrollo frontend y colaboración técnica',
          summary:
            'Aplicaciones web móviles para operativas bancarias, fondos internacionales, banca privada y carteras de inversión. Trabajo en flujos con alta exigencia de calidad, revisión y coordinación.',
          stack: ['JavaScript', 'Ember', 'LitElement', 'Testing', 'CI'],
        },
        {
          name: 'Framework mobile web propio',
          context: 'Mobile One2One',
          role: 'Diseño, desarrollo e implantación',
          summary:
            'Framework JavaScript interno usado como base para múltiples proyectos mobile web de la compañía. El objetivo era acelerar entregas, homogeneizar patrones y facilitar mantenimiento.',
          stack: ['JavaScript', 'jQuery', 'Sass', 'REST', 'GitLab'],
        },
        {
          name: 'Booking y compra mobile',
          context: 'Transporte, hoteles y retail',
          role: 'Arquitectura frontend e integración',
          summary:
            'Flujos de reserva, compra y pago para compañías de transporte, hoteles y supermercado online. Incluye integración con servicios backend y pasarelas de pago.',
          stack: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'REST'],
        },
        {
          name: 'Herramientas internas para empleados',
          context: 'Hospitality y gestión empresarial',
          role: 'Análisis y desarrollo',
          summary:
            'Aplicaciones para gestión de estancia de huéspedes, incidencias, servicios, reservas internas, comunicación y plataformas CRM o de control presencial.',
          stack: ['JavaScript', 'Bootstrap', 'PHP', 'SQL Server', 'MySQL'],
        },
      ],
    },
  },
  en: {
    experience: {
      eyebrow: 'Experience',
      title: 'Professional experience',
      subtitle: 'A career across frontend, mobile web, digital banking, product and management applications.',
      description:
        'Provisional content extracted from an old CV. It still needs to be checked against LinkedIn and updated with recent dates, stack, impact and achievements.',
      items: [
        {
          company: 'BBVA',
          period: '2016 - present',
          role: 'Senior Frontend Engineer',
          summary:
            'I work on investment product experiences within retail mobile banking, combining frontend development, architectural judgment and technical coordination on complex features.',
          highlights: [
            'Technical reference within the investments team for frontend decisions, component definition, responsibilities and communication across UI pieces.',
            'PR validator for the whole mobile application, with validation capacity over PRs in a large development organization.',
            'Technical coordination within a four-person frontend team, supporting milestone planning, value delivery, onboarding of new teammates and technical debt management.',
            'Technical feasibility validation from business needs, coordination with design and backend, service integration design and definition of required data.',
            'Recent integration of the investment trends module into the customer Global Position experience, prioritizing performance, coexistence with other modules and alignment with usage metrics and configuration.',
            'Technical framing of an external financial visualization library integration as a LitElement component: requirements, vendor feasibility, architecture review and a Spec-Driven Development approach for AI agents.',
            'Integration of complex LitElement features inside Ember and progressive migration of legacy Ember pieces to LitElement.',
            'Review of unnecessary rendering, Ember engine weight and frontend quality through accessibility, QUnit, Cucumber, ESLint, Prettier, Sonar and internal plugins.',
            'Daily use of Jira, GitFlow, Agile/Scrum/SAFe and pipeline monitoring with Bamboo, Jenkins and GitHub Actions.',
            'Previous experience in third-party funds, GDPR, private banking, migration to multichannel microservices and the retail banking application for Mexico with Cells.',
          ],
          stack: [
            'JavaScript',
            'Ember.js',
            'Web Components',
            'LitElement',
            'Handlebars',
            'SCSS',
            'Chrome DevTools',
            'Accessibility',
            'Git',
            'GitFlow',
            'Scrum',
            'Agile',
            'SAFe',
            'Spec-Driven Development',
            'AI-assisted development',
            'Jira',
            'ESLint',
            'Prettier',
            'Sonar',
            'QUnit',
            'Cucumber',
            'Bamboo',
            'Jenkins',
            'GitHub Actions',
          ],
        },
        {
          company: 'Mobile One2One',
          period: '2012 - 2016',
          role: 'Web software analyst / Mobile frontend developer',
          summary:
            'Design and development of mobile web applications and webapps for clients such as Vueling, Iberostar, National Express, Carrefour and Alsa, combining frontend, service integration, backend work and production delivery.',
          highlights: [
            'Cross-functional work across booking, purchase, payments, mobile webapps, responsive layout, PHP/Silex backend, MySQL and REST API integration.',
            'Direct client interaction on projects for Vueling, Iberostar, Renfe and other accounts, including on-site work, functional/technical analysis, requirement gathering, partial estimation and follow-up through production.',
            'Development of complete mobile booking, purchase and payment flows, with service integration, operation state management, validations and error handling.',
            'Development for Iberostar of a stay booking website and a private employee management webapp, including chat, tablet and desktop support and early web notifications in Google Chrome.',
            'Development for National Express of journey booking flows, bus ticket purchase, payment and QR handling.',
            'Development for Carrefour of an online grocery mobile experience with catalogue, cart, promotions, payment and complex side navigation across categories and subcategories.',
            'Main design from scratch, with occasional collaboration, of the internal MO2OJS JavaScript framework, inspired by jQuery patterns and used for routing, AJAX, custom templates and views in projects for Carrefour, National Express, Sanitas and other clients.',
            'Technical judgment to evaluate the maintenance cost of custom tooling compared with adopting open standards and frameworks.',
            'Development of embedded applications with Cordova, a Tizen webapp for Samsung Watch within a Renfe project and an internal application for Vueling crew operations.',
            'Evolution from full-stack PHP tasks toward an increasing focus on JavaScript and mobile web frontend.',
          ],
          stack: ['JavaScript', 'jQuery', 'HTML5', 'CSS3', 'Sass', 'PHP', 'Silex', 'REST', 'MySQL', 'Cordova', 'GitLab'],
        },
        {
          company: 'Geanet onDemand',
          period: '2011 - 2012',
          role: 'Full-stack web developer',
          summary:
            'Maintenance and evolution of a SaaS business management platform with CRM, ERP, portals, intranet and internal process modules.',
          highlights: [
            'Work mainly focused on JavaScript, existing product maintenance and development of new features.',
            'Incident resolution and internal support for existing platform modules.',
            'Contribution to a new product version focused on interface evolution and usability improvements.',
            'Development of reports and features for foundation income tax filing management, including long forms, validations, calculations and document generation.',
            'Full-stack work with PHP, HTML, CSS, JavaScript, AJAX, JSON, REST and MySQL on a platform built with a custom framework.',
            'Reinforced technical judgment around the maintenance cost of internal layers compared with open standards.',
          ],
          stack: ['PHP', 'JavaScript', 'jQuery', 'AJAX', 'JSON', 'MySQL', 'SVN'],
        },
        {
          company: 'ComNet',
          period: '2005 - 2011',
          role: 'Software analyst',
          summary:
            'Development of web management applications, interfaces for biometric devices, attendance control, payroll calculation and direct work with end clients.',
          highlights: [
            'Analysis, documentation and architecture design for management applications.',
            'Web management interface for biometric devices.',
            'Complementary work on videoconferencing and mobile video surveillance.',
          ],
          stack: ['PHP', 'CodeIgniter', 'jQuery', 'SQL Server', 'MySQL', 'C#', 'Visual Basic 6'],
        },
        {
          company: 'Goitek',
          period: '2005',
          role: 'Junior developer',
          summary:
            'First professional role developing stored procedures and interfaces for real-time production process control.',
          highlights: ['SQL DML/DDL development.', 'User interfaces for industrial processes.'],
          stack: ['Visual Basic 6', 'SQL Server', 'OLANET'],
        },
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'Projects',
      subtitle: 'Representative work in digital banking, mobile commerce, booking and internal tools.',
      description:
        'An initial selection based on the old CV. Public links and details remain pending review before each case is expanded.',
      items: [
        {
          name: 'Digital banking flows',
          context: 'BBVA',
          role: 'Frontend development and technical collaboration',
          summary:
            'Mobile web applications for banking flows, international funds, private banking and investment portfolios. Work on flows with high quality, review and coordination demands.',
          stack: ['JavaScript', 'Ember', 'LitElement', 'Testing', 'CI'],
        },
        {
          name: 'Internal mobile web framework',
          context: 'Mobile One2One',
          role: 'Design, development and rollout',
          summary:
            'Internal JavaScript framework used as the foundation for multiple company mobile web projects. The goal was to speed up delivery, standardize patterns and simplify maintenance.',
          stack: ['JavaScript', 'jQuery', 'Sass', 'REST', 'GitLab'],
        },
        {
          name: 'Mobile booking and purchase flows',
          context: 'Transport, hotels and retail',
          role: 'Frontend architecture and integration',
          summary:
            'Reservation, purchase and payment flows for transport companies, hotels and online grocery shopping. Includes backend service and payment gateway integration.',
          stack: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'REST'],
        },
        {
          name: 'Internal employee tools',
          context: 'Hospitality and business management',
          role: 'Analysis and development',
          summary:
            'Applications for guest stay management, incidents, services, internal reservations, communication and CRM or attendance control platforms.',
          stack: ['JavaScript', 'Bootstrap', 'PHP', 'SQL Server', 'MySQL'],
        },
      ],
    },
  },
};

export const experienceEntries = professionalContent.es.experience.items;
export const projectHighlights = professionalContent.es.projects.items;
