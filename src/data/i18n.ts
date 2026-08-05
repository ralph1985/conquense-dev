export type Language = 'es' | 'en';

export interface AlternateLink {
  lang: Language;
  href: string;
}

export interface RouteSet {
  home: string;
  projects: string;
  experience: string;
  hobbies: string;
}

export const routesByLanguage: Record<Language, RouteSet> = {
  es: {
    home: '/',
    projects: '/proyectos/',
    experience: '/experiencia/',
    hobbies: '/otra-forma-de-mirar/',
  },
  en: {
    home: '/en/',
    projects: '/en/projects/',
    experience: '/en/experience/',
    hobbies: '/en/another-way-of-looking/',
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
