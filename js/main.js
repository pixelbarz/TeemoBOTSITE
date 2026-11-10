(function () {
  const config = window.TEEMOBOT_CONFIG || {};
  const site = config.site || {};
  const icons = window.TEEMOBOT_ICONS || {};

  const root = document.body.dataset.root || './';
  const rootUrl = new URL(root, window.location.href);
  const withRoot = (path) => {
    if (!path) return '';
    if (/^(https?:|mailto:|#)/i.test(path)) return path;
    return new URL(path.replace(/^\.?\//, ''), rootUrl).href;
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('is-ready');

    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });

    const page = document.body.dataset.page;
    if (page) {
      document.querySelectorAll('[data-nav]').forEach((link) => {
        if (link.dataset.nav === page) link.setAttribute('aria-current', 'page');
      });
    }

    document.querySelectorAll('[data-invite-link]').forEach((link) => {
      if (site.inviteUrl) {
        link.setAttribute('href', site.inviteUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
        link.removeAttribute('aria-disabled');
        link.removeAttribute('title');
        link.classList.remove('btn--soon');
        link.classList.add('btn--primary');
        link.textContent = 'Entrar no servidor';
      } else {
        link.removeAttribute('href');
        link.setAttribute('aria-disabled', 'true');
        link.setAttribute('title', 'O convite público ainda não foi publicado.');
      }
    });

    document.querySelectorAll('[data-social-list]').forEach((list) => {
      list.replaceChildren();
      (config.social || []).forEach((item) => {
        const li = document.createElement('li');
        if (item.url) {
          const a = document.createElement('a');
          a.href = item.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.innerHTML = `${icons[item.icon] || ''}<span>${item.label}</span>`;
          a.className = 'footer-social-link';
          li.append(a);
        } else if (item.value) {
          const span = document.createElement('span');
          span.className = 'footer-social-link footer-social-link--static';
          span.innerHTML = `${icons[item.icon] || ''}<span>${item.label}</span><small>${item.value}</small>`;
          li.append(span);
        } else {
          const span = document.createElement('span');
          span.className = 'footer-link--soon';
          span.innerHTML = `<span>${item.label}</span><small>em breve</small>`;
          li.append(span);
        }
        list.append(li);
      });
    });

    const skip = document.querySelector('.skip-link');
    const main = document.querySelector('main');
    if (skip && main) {
      skip.addEventListener('click', () => {
        main.focus({ preventScroll: true });
      });
    }
  });
})();
