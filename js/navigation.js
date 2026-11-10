(function () {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-site-nav]');

  if (!toggle || !nav) return;

  const label = toggle.querySelector('[data-menu-label]');
  let lastFocused = null;

  function focusable() {
    return [
      toggle,
      ...nav.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ].filter((el) => el.offsetParent !== null || el === toggle);
  }

  function open() {
    lastFocused = document.activeElement;
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (label) label.textContent = 'Fechar menu';
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const first = nav.querySelector('a[href]');
        if (first) first.focus();
      });
    });
  }

  function close({ restore = true } = {}) {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (label) label.textContent = 'Abrir menu';
    if (restore && lastFocused instanceof HTMLElement) lastFocused.focus();
  }

  toggle.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') close();
    else open();
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) close({ restore: false });
  });

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    close({ restore: false });
  });

  document.addEventListener('keydown', (event) => {
    if (!nav.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== 'Tab') return;

    const items = focusable();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860 && nav.classList.contains('is-open')) {
      close({ restore: false });
    }
  });
})();
