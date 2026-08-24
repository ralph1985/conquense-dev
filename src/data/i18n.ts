export type Language = 'es' | 'en';

export interface AlternateLink {
  lang: Language;
  href: string;
}

export interface RouteSet {
  home: string;
  contact: string;
  projects: string;
  experience: string;
  hobbies: string;
  blog: string;
  legalNotice: string;
  privacy: string;
  cookies: string;
}

export const routesByLanguage: Record<Language, RouteSet> = {
  es: {
    home: '/',
    contact: '/#contacto',
    projects: '/proyectos/',
    experience: '/experiencia/',
    hobbies: '/otra-forma-de-mirar/',
    blog: '/blog/',
    legalNotice: '/aviso-legal/',
    privacy: '/politica-privacidad/',
    cookies: '/politica-cookies/',
  },
  en: {
    home: '/en/',
    contact: '/en/#contact',
    projects: '/en/projects/',
    experience: '/en/experience/',
    hobbies: '/en/another-way-of-looking/',
    blog: '/en/blog/',
    legalNotice: '/en/legal-notice/',
    privacy: '/en/privacy-policy/',
    cookies: '/en/cookie-policy/',
  },
};

export const languageNames: Record<Language, string> = {
  es: 'ES',
  en: 'EN',
};

export const uiCopy = {
  es: {
    navLabel: 'Navegación del portfolio',
    skipLink: 'Saltar al contenido',
    languageLabel: 'Cambiar idioma',
    navExperience: 'Experiencia',
    navProjects: 'Proyectos',
    navBlog: 'Blog',
    navContact: 'Contacto',
    goToSectionLabel: 'Ir a',
    themeToggleLabel: 'Cambiar tema',
    themeSystemLabel: 'Auto',
    themeLightLabel: 'Claro',
    themeDarkLabel: 'Oscuro',
    sectionItemsLabel: 'Puntos de',
    sectionActionsLabel: 'Acciones de',
    backToTop: 'Ir arriba',
    backToJourney: 'Volver al inicio',
    stackLabel: 'Tecnologías',
  },
  en: {
    navLabel: 'Portfolio navigation',
    skipLink: 'Skip to content',
    languageLabel: 'Change language',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navBlog: 'Blog',
    navContact: 'Contact',
    goToSectionLabel: 'Go to',
    themeToggleLabel: 'Change theme',
    themeSystemLabel: 'Auto',
    themeLightLabel: 'Light',
    themeDarkLabel: 'Dark',
    sectionItemsLabel: 'Highlights for',
    sectionActionsLabel: 'Actions for',
    backToTop: 'Back to top',
    backToJourney: 'Back home',
    stackLabel: 'Technologies',
  },
} satisfies Record<Language, Record<string, string>>;
