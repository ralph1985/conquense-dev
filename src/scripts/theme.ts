const THEME_STORAGE_KEY = 'conquense-dev-theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';

type ThemePreference = 'system' | 'light' | 'dark';

type ThemeToggle = HTMLButtonElement & {
  dataset: DOMStringMap & {
    labelToggle?: string;
    labelSystem?: string;
    labelLight?: string;
    labelDark?: string;
  };
};

function isStoredTheme(value: string | null): value is Exclude<ThemePreference, 'system'> {
  return value === 'light' || value === 'dark';
}

function getPreference(): ThemePreference {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    return isStoredTheme(storedTheme) ? storedTheme : 'system';
  } catch {
    return 'system';
  }
}

function resolveTheme(preference: ThemePreference) {
  if (preference === 'system') {
    return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
  }

  return preference;
}

function applyTheme(preference: ThemePreference) {
  const resolvedTheme = resolveTheme(preference);

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = resolvedTheme;
}

function persistPreference(preference: ThemePreference) {
  try {
    if (preference === 'system') {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // Theme selection still works for the current page when persistence is unavailable.
  }
}

function getNextPreference(preference: ThemePreference): ThemePreference {
  if (preference === 'system') {
    return 'light';
  }

  if (preference === 'light') {
    return 'dark';
  }

  return 'system';
}

function updateToggle(toggle: ThemeToggle, preference: ThemePreference) {
  const label = {
    system: toggle.dataset.labelSystem ?? 'Auto',
    light: toggle.dataset.labelLight ?? 'Light',
    dark: toggle.dataset.labelDark ?? 'Dark',
  }[preference];

  const state = toggle.querySelector('[data-theme-state]');
  const toggleLabel = toggle.dataset.labelToggle ?? toggle.getAttribute('aria-label') ?? 'Change theme';

  state?.replaceChildren(label);
  toggle.setAttribute('aria-label', `${toggleLabel}: ${label}`);
  toggle.setAttribute('title', `${toggleLabel}: ${label}`);
}

export function initThemeControls() {
  const toggle = document.querySelector<ThemeToggle>('[data-theme-toggle]');
  const mediaQuery = window.matchMedia(DARK_QUERY);

  let preference = getPreference();

  applyTheme(preference);

  if (toggle) {
    updateToggle(toggle, preference);

    toggle.addEventListener('click', () => {
      preference = getNextPreference(preference);
      persistPreference(preference);
      applyTheme(preference);
      updateToggle(toggle, preference);
    });
  }

  mediaQuery.addEventListener('change', () => {
    if (preference !== 'system') {
      return;
    }

    applyTheme(preference);
  });
}
