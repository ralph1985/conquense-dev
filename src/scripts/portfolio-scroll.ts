import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

type PortfolioElements = {
  stage: HTMLElement;
  track: HTMLElement;
  panels: HTMLElement[];
  links: HTMLAnchorElement[];
  currentIndex: HTMLElement | null;
  currentName: HTMLElement | null;
  progressBar: HTMLElement | null;
};

function getElements(): PortfolioElements | null {
  const stage = document.querySelector<HTMLElement>('[data-portfolio-stage]');
  const track = document.querySelector<HTMLElement>('[data-portfolio-track]');

  if (!stage || !track) {
    return null;
  }

  return {
    stage,
    track,
    panels: Array.from(document.querySelectorAll<HTMLElement>('[data-section-panel]')),
    links: Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-section-link]')),
    currentIndex: document.querySelector<HTMLElement>('[data-current-index]'),
    currentName: document.querySelector<HTMLElement>('[data-current-name]'),
    progressBar: document.querySelector<HTMLElement>('[data-progress-bar]'),
  };
}

function setActiveSection(elements: PortfolioElements, index: number, progress?: number) {
  const safeIndex = Math.min(Math.max(index, 0), elements.panels.length - 1);
  const panel = elements.panels[safeIndex];
  const totalProgress = progress ?? (elements.panels.length <= 1 ? 1 : safeIndex / (elements.panels.length - 1));

  elements.currentIndex?.replaceChildren(String(safeIndex + 1).padStart(2, '0'));
  elements.currentName?.replaceChildren(panel?.dataset.sectionTitle ?? '');

  if (elements.progressBar) {
    elements.progressBar.style.transform = `scaleX(${Math.min(Math.max(totalProgress, 0), 1)})`;
  }

  elements.links.forEach((link, linkIndex) => {
    if (linkIndex === safeIndex) {
      link.setAttribute('aria-current', 'step');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  elements.panels.forEach((panelElement, panelIndex) => {
    const sectionProgress = elements.panels.length <= 1 ? 0 : totalProgress * (elements.panels.length - 1) - panelIndex;
    const boundedProgress = Math.min(Math.max(sectionProgress, -1), 1);

    panelElement.classList.toggle('is-active', panelIndex === safeIndex);
    panelElement.style.setProperty('--panel-progress', boundedProgress.toFixed(3));
  });
}

function getHashIndex(elements: PortfolioElements) {
  const slug = window.location.hash.slice(1);

  if (!slug) {
    return -1;
  }

  return elements.panels.findIndex((panel) => panel.id === slug);
}

function updateHash(panel: HTMLElement | undefined) {
  if (!panel || window.location.hash === `#${panel.id}`) {
    return;
  }

  window.history.replaceState(null, '', `#${panel.id}`);
}

function initVerticalMode(elements: PortfolioElements) {
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
      threshold: [0.35, 0.6, 0.8],
    },
  );

  elements.panels.forEach((panel) => observer.observe(panel));

  return () => observer.disconnect();
}

function initHorizontalMode(elements: PortfolioElements) {
  gsap.registerPlugin(ScrollTrigger);

  const distance = () => Math.max(0, elements.track.scrollWidth - window.innerWidth);
  const tween = gsap.to(elements.track, {
    x: () => -distance(),
    ease: 'none',
  });

  const trigger = ScrollTrigger.create({
    trigger: elements.stage,
    animation: tween,
    pin: true,
    scrub: 0.7,
    invalidateOnRefresh: true,
    anticipatePin: 1,
    end: () => `+=${distance()}`,
    snap:
      elements.panels.length > 1
        ? {
            snapTo: (value) => Math.round(value * (elements.panels.length - 1)) / (elements.panels.length - 1),
            duration: { min: 0.18, max: 0.36 },
            delay: 0.04,
            ease: 'power2.out',
          }
        : undefined,
    onUpdate: (self) => {
      const index = Math.round(self.progress * (elements.panels.length - 1));
      setActiveSection(elements, index, self.progress);
    },
  });

  const initialIndex = getHashIndex(elements);

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();

    if (initialIndex >= 0) {
      window.setTimeout(() => goToIndex(initialIndex, 'auto'), 0);
    }
  });

  function goToIndex(index: number, behavior: ScrollBehavior = 'smooth') {
    const safeIndex = Math.min(Math.max(index, 0), elements.panels.length - 1);
    const progress = elements.panels.length <= 1 ? 0 : safeIndex / (elements.panels.length - 1);
    const scrollTop = trigger.start + (trigger.end - trigger.start) * progress;

    window.scrollTo({
      left: 0,
      top: scrollTop,
      behavior,
    });
    setActiveSection(elements, safeIndex, progress);
    updateHash(elements.panels[safeIndex]);
  }

  elements.links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      goToIndex(index);
    });
  });

  const onKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement | null;

    if (target?.matches('input, textarea, select, button')) {
      return;
    }

    const activeIndex = elements.links.findIndex((link) => link.getAttribute('aria-current') === 'step');

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goToIndex(activeIndex + 1);
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goToIndex(activeIndex - 1);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      goToIndex(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      goToIndex(elements.panels.length - 1);
    }
  };

  const onLoad = () => {
    ScrollTrigger.refresh();

    const hashIndex = getHashIndex(elements);

    if (hashIndex >= 0) {
      goToIndex(hashIndex, 'auto');
    }
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('load', onLoad, { once: true });

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('load', onLoad);
    trigger.kill();
    tween.kill();
    gsap.set(elements.track, { clearProps: 'transform' });
  };
}

export function initPortfolioScroll() {
  const setup = () => {
    const elements = getElements();

    if (!elements || elements.panels.length === 0) {
      return;
    }

    setActiveSection(elements, 0, 0);

    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
    const cleanup = prefersReducedMotion ? initVerticalMode(elements) : initHorizontalMode(elements);

    if (prefersReducedMotion) {
      const initialIndex = getHashIndex(elements);

      if (initialIndex >= 0) {
        setActiveSection(elements, initialIndex);
        requestAnimationFrame(() => {
          const panel = elements.panels[initialIndex];

          if (panel) {
            window.scrollTo({ left: 0, top: panel.offsetTop, behavior: 'auto' });
          }
        });
      }
    }

    return cleanup;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
}
