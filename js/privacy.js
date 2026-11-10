(function () {
  const config = window.TEEMOBOT_CONFIG || {};
  const privacy = config.privacy || {};

  function formatDate(value) {
    if (!value) return 'Data a definir';
    const date = new Date(`${value}T12:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-privacy-updated]').forEach((el) => {
      el.textContent = formatDate(privacy.updatedAt);
    });

    const values = {
      '[data-privacy-controller]': privacy.controller,
      '[data-privacy-retention]': privacy.retention,
      '[data-privacy-dpo]': privacy.dpo
    };

    Object.entries(values).forEach(([selector, value]) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (value) {
          el.textContent = value;
          el.classList.remove('pending');
        }
      });
    });

    document.querySelectorAll('[data-privacy-contact]').forEach((el) => {
      if (!privacy.contact) return;
      el.classList.remove('pending');
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(privacy.contact)) {
        const link = document.createElement('a');
        link.href = `mailto:${privacy.contact}`;
        link.textContent = privacy.contact;
        el.replaceChildren(link);
      } else {
        el.textContent = privacy.contact;
      }
    });

    const print = document.querySelector('[data-print]');
    if (print) print.addEventListener('click', () => window.print());

    const links = Array.from(document.querySelectorAll('.legal-toc a[href^="#"]'));
    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 1] }
    );

    sections.forEach((section) => observer.observe(section));
  });
})();
