export type Language = 'es' | 'en';

export interface AlternateLink {
  lang: Language;
  href: string;
}

export interface RouteSet {
  home: string;
  projects: string;
  experience: string;
}

export const routesByLanguage: Record<Language, RouteSet> = {
  es: {
    home: '/',
    projects: '/proyectos/',
    experience: '/experiencia/',
  },
  en: {
    home: '/en/',
    projects: '/en/projects/',
    experience: '/en/experience/',
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
    goToSectionLabel: 'Ir a',
    themeToggleLabel: 'Cambiar tema',
    themeSystemLabel: 'Auto',
    themeLightLabel: 'Claro',
    themeDarkLabel: 'Oscuro',
    sectionItemsLabel: 'Puntos de',
    sectionActionsLabel: 'Acciones de',
    backToJourney: 'Volver al recorrido',
    stackLabel: 'Tecnologías',
  },
  en: {
    navLabel: 'Portfolio navigation',
    skipLink: 'Skip to content',
    languageLabel: 'Change language',
    goToSectionLabel: 'Go to',
    themeToggleLabel: 'Change theme',
    themeSystemLabel: 'Auto',
    themeLightLabel: 'Light',
    themeDarkLabel: 'Dark',
    sectionItemsLabel: 'Highlights for',
    sectionActionsLabel: 'Actions for',
    backToJourney: 'Back to the journey',
    stackLabel: 'Technologies',
  },
} satisfies Record<Language, Record<string, string>>;
