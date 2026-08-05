import type { Language } from '@/data/i18n';
import type { DetailCopy } from '@/data/detail-types';

export interface ExperienceEntry {
  company: string;
  period: string;
  context?: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const localizedExperience: Record<Language, DetailCopy & { items: ExperienceEntry[] }> = {
  es: {
      eyebrow: 'Experiencia',
      title: 'Experiencia profesional',
      subtitle: 'Trayectoria en frontend, mobile web, banca digital, producto y aplicaciones de gestión.',
      description:
        'Recorrido profesional revisado desde las prácticas iniciales en industria hasta el trabajo actual en frontend senior, banca móvil e inversión.',
      items: [
        {
          company: 'BBVA Technology',
          period: '2016 - actualidad',
          context: 'BBVA IT España (2018–2024) · GFT (2016–2018)',
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
            'Mantenimiento y evolución de una plataforma SaaS de gestión empresarial con módulos de CRM, ERP, portales, intranet y procesos internos. Geanet onDemand evolucionó posteriormente a Yunbit.',
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
          role: 'Programador junior / Analista programador',
          summary:
            'Primera etapa profesional en desarrollos web a medida dentro de una compañía de soluciones tecnológicas e integración de software.',
          highlights: [
            'Desarrollo de aplicaciones de gestión, control presencial, nóminas, portales, intranets, videoconferencia y videovigilancia.',
            'Mantenimiento, evolución, nuevos desarrollos y resolución de incidencias en aplicaciones existentes.',
            'Trato directo con clientes finales para toma de requisitos, seguimiento, soporte, desplazamientos e implantación de soluciones a medida.',
            'Apoyo en análisis, documentación y estructuración técnica de aplicaciones de gestión.',
            'Implementación de módulos de nóminas y gestión laboral a partir de reglas definidas por cliente, e interfaces web para datos de control de presencia y acceso procedentes de sistemas biométricos.',
            'Desarrollos de videoconferencia con Visual Basic 6 y primeras aplicaciones de videovigilancia para PDAs con C#.',
          ],
          stack: [
            'PHP',
            'CodeIgniter',
            'JavaScript',
            'jQuery',
            'HTML',
            'CSS',
            'AJAX',
            'JSON',
            'SQL Server',
            'MySQL',
            'C#',
            'Visual Basic 6',
          ],
        },
        {
          company: 'Goitek',
          period: '2005',
          role: 'Programador en prácticas',
          summary:
            'Prácticas en empresa en el entorno OLANET, una solución MES para control y monitorización de producción industrial en tiempo real.',
          highlights: [
            'Trabajo principalmente centrado en SQL Server, DML/DDL, procedimientos almacenados y apoyo puntual en interfaces de usuario.',
            'Primer contacto con entornos industriales, sistemas MES y datos de producción en tiempo real.',
          ],
          stack: ['Visual Basic 6', 'SQL Server', 'OLANET'],
        },
      ],
    },
  en: {
      eyebrow: 'Experience',
      title: 'Professional experience',
      subtitle: 'A career across frontend, mobile web, digital banking, product and management applications.',
      description:
        'A professional journey reviewed from an initial industrial internship to current senior frontend work in mobile banking and investment products.',
      items: [
        {
          company: 'BBVA Technology',
          period: '2016 - present',
          context: 'BBVA IT España (2018–2024) · GFT (2016–2018)',
          role: 'Senior Frontend Engineer',
          summary:
            'I work on investment product experiences within retail mobile banking, combining frontend development, architectural judgment and technical coordination on complex features.',
          highlights: [
            'Technical point of reference within the investments team for frontend decisions, component definition, responsibilities and communication across UI pieces.',
            'I review PRs across the mobile application, with validation responsibility in a large development organization.',
            'Technical coordination within a four-person frontend team, supporting milestone planning, value delivery, onboarding of new teammates and technical debt management.',
            'Technical feasibility validation from business needs, coordination with design and backend, service integration design and definition of required data.',
            'Recent integration of the investment trends module into the customer Global Position experience, prioritizing performance, coexistence with other modules and alignment with usage metrics and configuration.',
            'Technical framing of an external financial visualization library integration as a LitElement component: requirements, feasibility with the vendor, architecture review and a Spec-Driven Development approach for AI agents.',
            'Integration of complex LitElement features inside Ember and progressive migration of legacy Ember pieces to LitElement.',
            'Review of unnecessary renders, Ember bundle size and frontend quality through accessibility, QUnit, Cucumber, ESLint, Prettier, Sonar and internal plugins.',
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
            'Direct client interaction on projects for Vueling, Iberostar, Renfe and other accounts, including on-site work, functional/technical analysis, requirement gathering, partial estimation and follow-up through to production.',
            'Development of complete mobile booking, purchase and payment flows, with service integration, operation state management, validations and error handling.',
            'Development for Iberostar of a stay booking website and a private employee management webapp, including chat, tablet and desktop support and early web notifications in Google Chrome.',
            'Development for National Express of journey booking flows, bus ticket purchase, payment and QR handling.',
            'Development for Carrefour of an online grocery mobile experience with catalogue, cart, promotions, payment and complex side navigation across categories and subcategories.',
            'I designed most of the internal MO2OJS JavaScript framework from scratch, with occasional collaboration. It was inspired by jQuery patterns and used for routing, AJAX, custom templates and views in projects for Carrefour, National Express, Sanitas and other clients.',
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
            'Maintenance and evolution of a SaaS business management platform with CRM, ERP, portals, intranet and internal process modules. Geanet onDemand later evolved into Yunbit.',
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
          role: 'Junior developer / Software analyst',
          summary:
            'First professional stage in custom web development within a technology solutions and software integration company.',
          highlights: [
            'Development of management applications, attendance control, payroll, portals, intranets, videoconferencing and video surveillance.',
            'Maintenance, evolution, new development and incident resolution in existing applications.',
            'Direct work with end clients for requirement gathering, follow-up, support, on-site work and rollout of custom solutions.',
            'Support in analysis, documentation and technical structuring of management applications.',
            'Implementation of payroll and labor management modules from client-defined rules, plus web interfaces for attendance and access-control data coming from biometric systems.',
            'Videoconferencing developments with Visual Basic 6 and early video surveillance applications for PDAs with C#.',
          ],
          stack: [
            'PHP',
            'CodeIgniter',
            'JavaScript',
            'jQuery',
            'HTML',
            'CSS',
            'AJAX',
            'JSON',
            'SQL Server',
            'MySQL',
            'C#',
            'Visual Basic 6',
          ],
        },
        {
          company: 'Goitek',
          period: '2005',
          role: 'Intern developer',
          summary:
            'Internship at a company working with OLANET, a MES solution for real-time industrial production control and monitoring.',
          highlights: [
            'Work mainly focused on SQL Server, DML/DDL, stored procedures and occasional support on user interfaces.',
            'First exposure to industrial environments, MES systems and real-time production data.',
          ],
          stack: ['Visual Basic 6', 'SQL Server', 'OLANET'],
        },
      ],
    },
};

export const experienceEntries = localizedExperience.es.items;
