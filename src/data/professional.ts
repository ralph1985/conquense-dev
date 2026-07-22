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
          role: 'Analista programador / Desarrollador JavaScript',
          summary:
            'Trabajo en aplicaciones web móviles y operativas digitales dentro de un entorno bancario exigente, con foco en calidad, mantenibilidad y colaboración con equipos multidisciplinares.',
          highlights: [
            'Participación en el arranque de operativas relacionadas con GDPR.',
            'Desarrollo de flujos de fondos internacionales y contratación digital.',
            'Trabajo en banca privada, carteras de inversión y optimización de inversiones.',
          ],
          stack: ['JavaScript', 'Ember', 'LitElement', 'QUnit', 'Cucumber', 'Bamboo', 'Git'],
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
          role: 'Software analyst / JavaScript developer',
          summary:
            'Work on mobile web applications and digital banking flows in a demanding environment, focused on quality, maintainability and collaboration with multidisciplinary teams.',
          highlights: [
            'Participation in the start of flows related to GDPR requirements.',
            'Development of international funds and digital contracting flows.',
            'Work on private banking, investment portfolios and investment optimization.',
          ],
          stack: ['JavaScript', 'Ember', 'LitElement', 'QUnit', 'Cucumber', 'Bamboo', 'Git'],
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
