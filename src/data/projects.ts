import type { Language } from '@/data/i18n';
import type { DetailCopy } from '@/data/detail-types';

export interface ProjectHighlight {
  name: string;
  context: string;
  role: string;
  summary: string;
  stack: string[];
}

export const localizedProjects: Record<Language, DetailCopy & { items: ProjectHighlight[] }> = {
  es: {
      eyebrow: 'Proyectos',
      title: 'Proyectos',
      subtitle: 'Trabajo representativo en banca digital, mobile commerce, booking y herramientas internas.',
      description:
        'Una primera selección de trabajo representativo. Los enlaces y detalles públicos quedan pendientes de revisión antes de ampliar cada caso.',
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
  en: {
      eyebrow: 'Projects',
      title: 'Projects',
      subtitle: 'Representative work in digital banking, mobile commerce, booking and internal tools.',
      description:
        'An initial selection of representative work. Public links and details remain pending review before each case is expanded.',
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
};

export const projectHighlights = localizedProjects.es.items;
