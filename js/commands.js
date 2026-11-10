(function () {
  const commands = window.TEEMOBOT_COMMANDS || [];
  const categories = window.TEEMOBOT_COMMAND_CATEGORIES || [];
  const icons = window.TEEMOBOT_ICONS || {};

  const list = document.getElementById('command-list');
  const search = document.getElementById('command-search');
  const filters = document.getElementById('category-filters');
  const count = document.getElementById('result-count');
  const title = document.getElementById('results-title');
  const empty = document.getElementById('command-empty');
  const expand = document.getElementById('expand-all');

  if (!list || !search || !filters) return;

  const state = {
    query: '',
    category: 'all'
  };

  const categoryMap = new Map(categories.map((cat) => [cat.id, cat.label]));
  const total = commands.length;

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function searchable(command) {
    return normalize(
      [
        command.name,
        command.description,
        categoryMap.get(command.category),
        command.syntax,
        command.cooldown,
        command.permissions,
        ...(command.params || []).map((p) => `${p.name} ${p.type} ${p.description}`),
        ...(command.examples || []),
        ...(command.notes || [])
      ].join(' ')
    );
  }

  function paramsTable(command) {
    if (!command.params || !command.params.length) {
      return '<p class="field-note">Este comando não recebe parâmetros.</p>';
    }

    const rows = command.params
      .map(
        (param) => `
          <tr>
            <td>${escapeHtml(param.name)}</td>
            <td>${escapeHtml(param.type)}</td>
            <td><span class="${param.required ? 'param-required' : 'param-optional'}">${
              param.required ? 'Obrigatório' : 'Opcional'
            }</span></td>
            <td>${escapeHtml(param.description)}${
              param.choices ? ` Valores: ${param.choices.map(escapeHtml).join(', ')}.` : ''
            }</td>
          </tr>`
      )
      .join('');

    return `
      <table class="params-table">
        <thead>
          <tr><th scope="col">Parâmetro</th><th scope="col">Tipo</th><th scope="col">Uso</th><th scope="col">Descrição</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>`;
  }

  function examples(command) {
    if (!command.examples || !command.examples.length) {
      return '<p class="field-note">Sem exemplos cadastrados.</p>';
    }

    return `<div class="example-list">${command.examples
      .map(
        (example) => `
          <div class="example-row">
            <code>${escapeHtml(example)}</code>
            <button type="button" class="copy-btn" data-copy="${escapeHtml(example)}" aria-label="Copiar exemplo ${escapeHtml(example)}">
              ${icons.copy || ''}<span>Copiar</span>
            </button>
          </div>`
      )
      .join('')}</div>`;
  }

  function renderCard(command) {
    const category = categoryMap.get(command.category) || command.category;
    const permission =
      command.permissions === 'Nenhuma permissão específica.'
        ? 'Sem permissão específica'
        : command.permissions.replace(/\.$/, '');

    const rules = `
      <ul class="notes-list">
        <li><strong>Tempo de espera:</strong> ${escapeHtml(command.cooldown)}</li>
        <li><strong>Permissões:</strong> ${escapeHtml(command.permissions)}</li>
      </ul>`;

    const notes =
      command.notes && command.notes.length
        ? `<div class="command-details__section">
             <h4>Observações</h4>
             <ul class="notes-list">${command.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>
           </div>`
        : '';

    return `
      <details class="command-card" id="comando-${escapeHtml(command.name)}" data-category="${escapeHtml(
        command.category
      )}" data-search="${escapeHtml(searchable(command))}">
        <summary class="command-card__summary">
          <span class="command-card__head">
            <span class="command-card__name">/${escapeHtml(command.name)}</span>
            <span class="tag">${escapeHtml(category)}</span>
          </span>
          <span class="command-card__desc">${escapeHtml(command.description)}</span>
          <span class="command-card__syntax">${icons.book || ''}<code>${escapeHtml(command.syntax)}</code></span>
          <span class="command-card__chevron" aria-hidden="true">${icons.chevron || ''}</span>
          <span class="command-card__badges">
            <span class="tag tag--brass">${escapeHtml(command.cooldown)}</span>
            <span class="tag">${escapeHtml(permission)}</span>
          </span>
        </summary>
        <div class="command-details">
          <div class="command-details__section">
            <h4>Parâmetros</h4>
            ${paramsTable(command)}
          </div>
          <div class="command-details__section">
            <h4>Exemplos</h4>
            ${examples(command)}
          </div>
          <div class="command-details__section">
            <h4>Regras</h4>
            ${rules}
          </div>
          ${notes}
        </div>
      </details>`;
  }

  function renderCategories() {
    if (!filters) return;

    const all = document.createElement('button');
    all.type = 'button';
    all.className = 'filter-btn';
    all.dataset.categoryFilter = 'all';
    all.setAttribute('aria-pressed', 'true');
    all.innerHTML = `<span>Todos</span><span class="filter-btn__count">${total}</span>`;
    filters.append(all);

    categories.forEach((cat) => {
      const amount = commands.filter((command) => command.category === cat.id).length;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'filter-btn';
      button.dataset.categoryFilter = cat.id;
      button.setAttribute('aria-pressed', 'false');
      button.innerHTML = `<span>${escapeHtml(cat.label)}</span><span class="filter-btn__count">${amount}</span>`;
      filters.append(button);
    });

    filters.addEventListener('click', (event) => {
      const button = event.target.closest('[data-category-filter]');
      if (!button) return;
      state.category = button.dataset.categoryFilter;
      filters.querySelectorAll('[data-category-filter]').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      applyFilters();
    });
  }

  function renderAll() {
    if (!commands.length) {
      list.innerHTML =
        '<div class="command-card__empty"><h3>Nenhum comando carregado</h3><p>O catálogo de comandos não carregou. Recarregue a página para tentar de novo.</p></div>';
      return;
    }

    list.innerHTML = commands.map(renderCard).join('');

    list.querySelectorAll('.command-card').forEach((card) => {
      card.addEventListener('toggle', () => {
        if (card.open) setHash(card.id);
        updateExpandLabel();
      });
    });
  }

  function setHash(hash) {
    try {
      const url = new URL(window.location.href);
      url.hash = hash;
      history.replaceState(null, '', url);
    } catch (error) {
    }
  }

  function clearHash() {
    try {
      const url = new URL(window.location.href);
      url.hash = '';
      history.replaceState(null, '', url);
    } catch (error) {
    }
  }

  function applyFilters({ updateUrl = true } = {}) {
    const query = normalize(search.value);
    const cards = Array.from(list.querySelectorAll('.command-card'));
    let visible = 0;

    cards.forEach((card) => {
      const matchesCategory = state.category === 'all' || card.dataset.category === state.category;
      const matchesQuery = !query || card.dataset.search.includes(query);
      const show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (!show && card.open) card.open = false;
      if (show) visible += 1;
    });

    if (count) {
      count.textContent = `${visible} ${visible === 1 ? 'comando' : 'comandos'}`;
    }

    if (title) {
      const category = state.category === 'all' ? '' : categoryMap.get(state.category);
      if (query && category) title.textContent = `Resultados em ${category}`;
      else if (query) title.textContent = 'Resultados da busca';
      else if (category) title.textContent = category;
      else title.textContent = 'Todos os comandos';
    }

    if (empty) empty.hidden = visible !== 0;
    if (list) list.hidden = visible === 0;
    if (expand) expand.hidden = visible === 0;

    if (updateUrl) {
      try {
        const url = new URL(window.location.href);
        if (search.value.trim()) url.searchParams.set('q', search.value.trim());
        else url.searchParams.delete('q');

        if (state.category !== 'all') url.searchParams.set('categoria', state.category);
        else url.searchParams.delete('categoria');

        history.replaceState(null, '', url);
      } catch (error) {
      }
    }

    updateExpandLabel();
  }

  function visibleCards() {
    return Array.from(list.querySelectorAll('.command-card')).filter((card) => !card.hidden);
  }

  function updateExpandLabel() {
    if (!expand) return;
    const cards = visibleCards();
    const allOpen = cards.length > 0 && cards.every((card) => card.open);
    expand.textContent = allOpen ? 'Recolher tudo' : 'Expandir tudo';
    expand.setAttribute('aria-label', allOpen ? 'Recolher todos os comandos' : 'Expandir todos os comandos');
  }

  function openFromHash() {
    if (!window.location.hash || !window.location.hash.startsWith('#comando-')) return;
    const card = document.getElementById(window.location.hash.slice(1));
    if (!card || card.hidden) return;
    card.open = true;
    window.setTimeout(() => {
      card.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }, 120);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    if (!ok) throw new Error('copy failed');
  }

  list.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    if (!button) return;

    const label = button.querySelector('span');
    try {
      await copyText(button.dataset.copy);
      button.classList.add('is-copied');
      if (label) label.textContent = 'Copiado';
      window.setTimeout(() => {
        button.classList.remove('is-copied');
        if (label) label.textContent = 'Copiar';
      }, 1800);
    } catch (error) {
      if (label) label.textContent = 'Selecione';
      window.setTimeout(() => {
        if (label) label.textContent = 'Copiar';
      }, 1800);
    }
  });

  search.addEventListener('input', () => applyFilters());

  const searchForm = document.getElementById('command-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      applyFilters();
    });
  }

  if (expand) {
    expand.addEventListener('click', () => {
      const cards = visibleCards();
      const allOpen = cards.length > 0 && cards.every((card) => card.open);
      cards.forEach((card) => {
        card.open = !allOpen;
      });
      updateExpandLabel();
    });
  }

  document.querySelectorAll('[data-clear-filters]').forEach((button) => {
    button.addEventListener('click', () => {
      search.value = '';
      state.category = 'all';
      filters.querySelectorAll('[data-category-filter]').forEach((item) => {
        item.setAttribute('aria-pressed', String(item.dataset.categoryFilter === 'all'));
      });
      applyFilters();
    });
  });

  document.addEventListener('keydown', (event) => {
    const tag = document.activeElement && document.activeElement.tagName;
    const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';

    if (event.key === '/' && !typing) {
      event.preventDefault();
      search.focus();
    }

    if (event.key === 'Escape' && document.activeElement === search && search.value) {
      search.value = '';
      applyFilters();
    }
  });

  window.addEventListener('hashchange', openFromHash);

  renderCategories();
  renderAll();

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  const initialCategory = params.get('categoria') || 'all';

  if (initialQuery) search.value = initialQuery;
  if (initialCategory !== 'all' && categoryMap.has(initialCategory)) {
    state.category = initialCategory;
    filters.querySelectorAll('[data-category-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item.dataset.categoryFilter === initialCategory));
    });
  }

  applyFilters({ updateUrl: false });
  openFromHash();
})();
