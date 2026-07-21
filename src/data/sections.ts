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
    title: 'Inicio',
    subtitle: 'Software pensado con estructura, claridad y oficio.',
    eyebrow: 'Portfolio',
    theme: 'intro',
    accentColor: '#2563eb',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel lectus at est gravida posuere. Donec dictum, justo sed posuere facilisis, risus urna luctus arcu, vitae gravida neque elit non lorem.',
  },
  {
    id: 'profile',
    slug: 'perfil',
    title: 'Perfil',
    subtitle: 'Una mirada práctica a producto, arquitectura y ejecución.',
    eyebrow: 'Sobre mí',
    theme: 'profile',
    accentColor: '#0f766e',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non nibh sed neque pharetra porttitor. Sed consequat nibh vitae erat porttitor, sed tempor augue pretium.',
    items: ['Criterio técnico', 'Comunicación clara', 'Entrega sostenible'],
  },
  {
    id: 'workflow',
    slug: 'como-trabajo',
    title: 'Cómo trabajo',
    subtitle: 'Decisiones pequeñas, sistemas mantenibles y feedback temprano.',
    eyebrow: 'Proceso',
    theme: 'method',
    accentColor: '#4f46e5',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit, odio at tincidunt posuere, nisl nisl lacinia arcu, a mattis ipsum ligula et eros.',
    items: ['Explorar', 'Diseñar', 'Implementar', 'Validar'],
  },
  {
    id: 'architecture',
    slug: 'arquitectura',
    title: 'Arquitectura',
    subtitle: 'Sistemas comprensibles antes que abstracciones ornamentales.',
    eyebrow: 'Sistemas',
    theme: 'architecture',
    accentColor: '#475569',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Suspendisse vitae dictum metus. Curabitur a turpis sed mauris efficitur ullamcorper.',
    items: ['Fronteras claras', 'Datos explícitos', 'Coste operativo bajo'],
  },
  {
    id: 'projects',
    slug: 'proyectos',
    title: 'Proyectos',
    subtitle: 'Interfaces y productos que priorizan uso real y rendimiento.',
    eyebrow: 'Trabajo',
    theme: 'projects',
    accentColor: '#9333ea',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam convallis mauris vitae quam aliquet, ac dictum sem pretium. Etiam efficitur nibh sed erat placerat.',
    items: ['Producto interno', 'Aplicación web', 'Automatización'],
  },
  {
    id: 'stack',
    slug: 'stack',
    title: 'Stack',
    subtitle: 'Herramientas modernas usadas con moderación y propósito.',
    eyebrow: 'Tecnología',
    theme: 'stack',
    accentColor: '#0369a1',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.',
    items: ['Astro', 'TypeScript', 'SCSS', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'contact',
    slug: 'contacto',
    title: 'Contacto',
    subtitle: 'Conversaciones directas, expectativas claras y próximos pasos simples.',
    eyebrow: 'Hablemos',
    theme: 'contact',
    accentColor: '#111827',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus blandit augue eu lorem tempus, a porta lorem dignissim. Donec a tellus lectus.',
    items: ['email@example.com', 'LinkedIn', 'GitHub'],
  },
];
