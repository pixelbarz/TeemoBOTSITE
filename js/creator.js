(function () {
  const config = window.TEEMOBOT_CONFIG || {};
  const creator = config.creator || {};
  const icons = window.TEEMOBOT_ICONS || {};
  const root = document.body.dataset.root || './';
  const rootUrl = new URL(root, window.location.href);
  const withRoot = (path) => {
    if (!path) return '';
    if (/^(https?:|mailto:|#)/i.test(path)) return path;
    return new URL(path.replace(/^\.?\//, ''), rootUrl).href;
  };

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    const name = creator.name || 'Criador do TeemoBOT';
    setText('[data-creator-heading]', creator.name || 'Criador do TeemoBOT');
    setText('[data-creator-name]', name);
    setText('[data-creator-handle]', creator.handle ? `@${creator.handle.replace(/^@/, '')}` : 'Não informado');
    setText('[data-creator-role]', creator.role || 'Desenvolvedor independente');
    setText('[data-creator-location]', creator.location || '');
    const locationRow = document.querySelector('[data-creator-location-row]');
    if (locationRow) locationRow.hidden = !creator.location;
    if (creator.contact) setText('[data-creator-contact]', creator.contact);

    const portrait = document.querySelector('[data-creator-portrait]');
    const avatar = document.querySelector('[data-creator-avatar]');
    const hasAvatar = Boolean(creator.avatar);
    if (portrait) portrait.hidden = !hasAvatar;
    document.body.classList.toggle('has-creator-avatar', hasAvatar);
    if (avatar) {
      if (hasAvatar) {
        avatar.hidden = false;
        avatar.src = withRoot(creator.avatar);
        avatar.alt = creator.name ? `Retrato de ${creator.name}` : 'Retrato do criador';
      } else {
        avatar.hidden = true;
        avatar.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        avatar.alt = '';
      }
    }

    const fields = {
      '[data-creator-bio]': creator.bio,
      '[data-creator-story]': creator.story,
      '[data-creator-motivation]': creator.motivation,
      '[data-creator-experience]': creator.experience
    };

    Object.entries(fields).forEach(([selector, value]) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (value) {
          el.hidden = false;
          el.textContent = value;
        } else {
          el.hidden = true;
          el.textContent = '';
        }
      });
    });

    const links = document.querySelector('[data-creator-links]');
    if (links) {
      links.replaceChildren();
      (creator.links || []).forEach((item) => {
        if (item.url) {
          const a = document.createElement('a');
          a.className = 'creator-link';
          a.href = item.url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.innerHTML = `<span>${icons[item.icon] || ''}${item.label}</span>${icons.chevron || ''}`;
          links.append(a);
        } else if (item.value) {
          const span = document.createElement('span');
          span.className = 'creator-link creator-link--static';
          span.innerHTML = `<span>${icons[item.icon] || ''}${item.label}</span><small>${item.value}</small>`;
          links.append(span);
        }
      });
    }
  });
})();
