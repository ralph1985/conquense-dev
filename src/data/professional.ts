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

export const experienceEntries: ExperienceEntry[] = [
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
];

export const projectHighlights: ProjectHighlight[] = [
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
];
