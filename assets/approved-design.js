(() => {
  'use strict';
  const site = document.querySelector('#nicotto-design .n-site');
  if (!site) return;
  const header = site.querySelector('.n-header-wrap');
  const toggle = site.querySelector('.n-menu-toggle');
  const nav = site.querySelector('.n-nav');
  site.classList.add('n-enhanced');
  toggle.hidden = false;
  function menu(open, restoreFocus = false) {
    nav.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    toggle.querySelector('[data-menu-open]').toggleAttribute('hidden', open);
    toggle.querySelector('[data-menu-close]').toggleAttribute('hidden', !open);
    if (restoreFocus) toggle.focus({preventScroll: true});
  }
  menu(false);
  toggle.addEventListener('click', () => menu(nav.hidden));
  nav.addEventListener('click', event => { if (event.target.closest('a')) menu(false); });
  document.addEventListener('click', event => { if (!header.contains(event.target)) menu(false); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !nav.hidden) menu(false, true);
  });
  header.addEventListener('focusout', event => {
    if (event.relatedTarget && !header.contains(event.relatedTarget)) menu(false);
  });
  const params = new URLSearchParams(location.search);
  function tabs(buttonAttribute, panelAttribute, initial) {
    const buttons = [...site.querySelectorAll(`[${buttonAttribute}]`)];
    const panels = [...site.querySelectorAll(`[${panelAttribute}]`)];
    if (!buttons.length) return;
    function activate(value) {
      buttons.forEach(button => {
        const key = button.getAttribute(buttonAttribute);
        const active = key === value;
        button.id = `${buttonAttribute}-${key}-tab`;
        button.setAttribute('aria-controls', `${panelAttribute}-${key}-panel`);
        button.setAttribute('aria-selected', String(active));
        button.tabIndex = active ? 0 : -1;
      });
      panels.forEach(panel => {
        const key = panel.getAttribute(panelAttribute);
        panel.id = `${panelAttribute}-${key}-panel`;
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('aria-labelledby', `${buttonAttribute}-${key}-tab`);
        panel.hidden = key !== value;
      });
      if (buttonAttribute === 'data-service-tab') {
        const dockForm = site.querySelector('.n-dock-form');
        dockForm.href = `/contact?service=${value}&channel=form#consultation`;
      }
    }
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => activate(button.getAttribute(buttonAttribute)));
      button.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
        activate(buttons[next].getAttribute(buttonAttribute));
        buttons[next].focus();
      });
    });
    const selected = buttons.some(button => button.getAttribute(buttonAttribute) === initial) ? initial : buttons[0].getAttribute(buttonAttribute);
    activate(selected);
  }
  // All prices and both contact methods remain readable without JavaScript.
  site.querySelectorAll('[data-price-panel],[data-contact-panel]').forEach(panel => panel.hidden = false);
  tabs('data-service-tab', 'data-price-panel', params.get('service'));
  tabs('data-contact-tab', 'data-contact-panel', params.get('channel'));
  const filters = [...site.querySelectorAll('[data-article-filter]')];
  filters.forEach(filter => filter.addEventListener('click', () => {
    const category = filter.dataset.articleFilter;
    filters.forEach(button => button.setAttribute('aria-pressed', String(button === filter)));
    site.querySelectorAll('[data-category]').forEach(article => article.hidden = category !== 'all' && article.dataset.category !== category);
  }));
  const form = site.querySelector('#contact-form');
  if (form) {
    const service = form.elements.service;
    const ageField = form.querySelector('[data-age-field]');
    const age = form.elements.child_age;
    function ageVisibility() {
      const relevant = ['ベビーシッター', '両方'].includes(service.value);
      ageField.hidden = !relevant;
      age.disabled = !relevant;
    }
    service.addEventListener('change', ageVisibility);
    form.addEventListener('reset', () => queueMicrotask(ageVisibility));
    const serviceNames = {sitter: 'ベビーシッター', cooking: '料理代行', both: '両方', undecided: 'まだ決まっていない'};
    service.value = serviceNames[params.get('service')] || '';
    ageVisibility();
    if (params.get('context') === 'night') {
      site.querySelector('.n-message-sample p').textContent = '夜間の見守りを相談したいです。希望日・開始と終了の時刻をお伝えします。';
    } else if (params.get('service') === 'cooking') {
      site.querySelector('.n-message-sample p').textContent = '作り置きの初回お試しを利用してみたいです。人数やメニューについても相談できますか？';
    }
  }
})();
