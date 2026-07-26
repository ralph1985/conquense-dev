type PortfolioElements = {
  panels: HTMLElement[];
  links: HTMLAnchorElement[];
  currentIndex: HTMLElement | null;
  currentName: HTMLElement | null;
  progressBar: HTMLElement | null;
};

function getElements(): PortfolioElements | null {
  const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-section-panel]'));

  if (panels.length === 0) {
    return null;
  }

  return {
    panels,
    links: Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-section-link]')),
    currentIndex: document.querySelector<HTMLElement>('[data-current-index]'),
    currentName: document.querySelector<HTMLElement>('[data-current-name]'),
    progressBar: document.querySelector<HTMLElement>('[data-progress-bar]'),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPageProgress() {
  const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight;

  if (scrollableDistance <= 0) {
    return 1;
  }

  return clamp(window.scrollY / scrollableDistance, 0, 1);
}

function setActiveSection(elements: PortfolioElements, index: number) {
  const safeIndex = clamp(index, 0, elements.panels.length - 1);
  const panel = elements.panels[safeIndex];
  const totalProgress = getPageProgress();

  elements.currentIndex?.replaceChildren(String(safeIndex + 1).padStart(2, '0'));
  elements.currentName?.replaceChildren(panel?.dataset.sectionTitle ?? '');

  if (elements.progressBar) {
    elements.progressBar.style.transform = `scaleX(${totalProgress})`;
  }

  elements.links.forEach((link, linkIndex) => {
    if (linkIndex === safeIndex) {
      link.setAttribute('aria-current', 'step');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  elements.panels.forEach((panelElement, panelIndex) => {
    const sectionProgress = safeIndex - panelIndex;

    panelElement.classList.toggle('is-active', panelIndex === safeIndex);
    panelElement.style.setProperty('--panel-progress', clamp(sectionProgress, -1, 1).toFixed(3));
  });
}

function getActiveIndex(elements: PortfolioElements) {
  const viewportAnchor = window.innerHeight * 0.38;

  return elements.panels.reduce((activeIndex, panel, index) => {
    const rect = panel.getBoundingClientRect();

    if (rect.top <= viewportAnchor) {
      return index;
    }

    return activeIndex;
  }, 0);
}

function goToIndex(elements: PortfolioElements, index: number, behavior: ScrollBehavior = 'smooth') {
  const safeIndex = clamp(index, 0, elements.panels.length - 1);
  const panel = elements.panels[safeIndex];

  panel?.scrollIntoView({ block: 'start', behavior });
  setActiveSection(elements, safeIndex);
}

function initVerticalNavigation(elements: PortfolioElements) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      const index = Number((visible.target as HTMLElement).dataset.sectionIndex ?? 0);
      setActiveSection(elements, index);
    },
    {
      root: null,
      rootMargin: '-28% 0px -50% 0px',
      threshold: [0.12, 0.28, 0.5, 0.72],
    },
  );

  const updateFromScroll = () => setActiveSection(elements, getActiveIndex(elements));

  elements.panels.forEach((panel) => observer.observe(panel));
  window.addEventListener('scroll', updateFromScroll, { passive: true });
  window.addEventListener('resize', updateFromScroll);

  elements.links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      goToIndex(elements, index);
    });
  });

  const onKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;

    if (target?.matches('input, textarea, select, button')) {
      return;
    }

    const activeIndex = getActiveIndex(elements);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      goToIndex(elements, activeIndex + 1);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      goToIndex(elements, activeIndex - 1);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      goToIndex(elements, 0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      goToIndex(elements, elements.panels.length - 1);
    }
  };

  window.addEventListener('keydown', onKeyDown);
  updateFromScroll();

  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', updateFromScroll);
    window.removeEventListener('resize', updateFromScroll);
    window.removeEventListener('keydown', onKeyDown);
  };
}

export function initPortfolioScroll() {
  const elements = getElements();

  if (!elements) {
    return;
  }

  let cleanup = initVerticalNavigation(elements);

  document.addEventListener('astro:before-swap', () => cleanup?.(), { once: true });

  document.addEventListener('astro:after-swap', () => {
    const nextElements = getElements();

    if (!nextElements) {
      return;
    }

    cleanup = initVerticalNavigation(nextElements);
  });
}
