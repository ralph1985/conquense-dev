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
          role: 'Analista programador / Frontend mobile web',
          summary:
            'Diseño y desarrollo de aplicaciones mobile web y webapps para clientes de transporte, hoteles, retail y entretenimiento, combinando frontend, integración con servicios y entrega a producción.',
          highlights: [
            'Diseño e implantación del framework JavaScript propio MO2OJS.',
            'Desarrollo de procesos de booking, compra y pasarelas de pago.',
            'Aplicaciones embebidas con Cordova y PhoneGap para distintos dispositivos.',
          ],
          stack: ['JavaScript', 'jQuery', 'HTML5', 'CSS3', 'Sass', 'PHP', 'Silex', 'Cordova'],
        },
        {
          company: 'Geanet onDemand',
          period: '2011 - 2012',
          role: 'Desarrollador PHP, HTML, CSS y JavaScript',
          summary:
            'Mantenimiento y evolución de una plataforma CRM, resolución de incidencias, nuevas funcionalidades y colaboración en una nueva versión con foco en usabilidad.',
          highlights: [
            'Trabajo en frontend y backend dentro de una plataforma de gestión empresarial.',
            'Integración con peticiones REST y procesos internos.',
            'Evolución de interfaz con HTML5, CSS3 y JavaScript.',
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
          stack: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'REST', 'SOAP'],
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
          role: 'Software analyst / Mobile web frontend developer',
          summary:
            'Design and development of mobile web applications and webapps for transport, hotel, retail and entertainment clients, combining frontend, service integration and production delivery.',
          highlights: [
            'Design and rollout of the internal MO2OJS JavaScript framework.',
            'Development of booking, purchase and payment gateway flows.',
            'Embedded applications with Cordova and PhoneGap for different devices.',
          ],
          stack: ['JavaScript', 'jQuery', 'HTML5', 'CSS3', 'Sass', 'PHP', 'Silex', 'Cordova'],
        },
        {
          company: 'Geanet onDemand',
          period: '2011 - 2012',
          role: 'PHP, HTML, CSS and JavaScript developer',
          summary:
            'Maintenance and evolution of a CRM platform, incident resolution, new features and collaboration on a new version with a focus on usability.',
          highlights: [
            'Frontend and backend work inside a business management platform.',
            'Integration with REST requests and internal processes.',
            'Interface evolution with HTML5, CSS3 and JavaScript.',
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
          stack: ['JavaScript', 'HTML5', 'CSS3', 'PHP', 'REST', 'SOAP'],
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
