
(() => {
  'use strict';

  const ICONS = {
    'VIE': 'vie.jpg',
    'DEXTERITE': 'dexterite.jpg',
    'FORCE': 'force.jpg',
    'ARME': 'arme.jpg',
    'PROTECTION': 'protection.jpg',
    'TERRE NOIRE': 'terre-noire.jpg'
  };

  const SCRIPT = document.currentScript;
  const scriptUrl = SCRIPT && SCRIPT.src
    ? new URL(SCRIPT.src, document.baseURI)
    : new URL('./assets/ui/stat-icons.js', document.baseURI);

  const ICON_BASE = new URL('./icons/caracteristiques/', scriptUrl);

  function normalize(value) {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();
  }

  function removeOldInjection() {
    document.querySelectorAll('.valombre-stat-icon').forEach(img => img.remove());
    document.querySelectorAll('.valombre-stat-icon-card').forEach(el => {
      el.classList.remove('valombre-stat-icon-card');
      delete el.dataset.valombreStatIcon;
    });
    document.querySelectorAll('.valombre-stat-label-with-icon').forEach(el => {
      el.classList.remove('valombre-stat-label-with-icon');
    });
  }

  function findLabels() {
    return Array.from(document.querySelectorAll('span, strong, label, p, div'))
      .filter(el => {
        if (el.childElementCount !== 0) return false;
        return Object.prototype.hasOwnProperty.call(ICONS, normalize(el.textContent));
      });
  }

  function addIconToLabel(labelEl) {
    if (labelEl.querySelector('.valombre-stat-icon')) return;

    const label = normalize(labelEl.textContent);
    const filename = ICONS[label];
    if (!filename) return;

    labelEl.classList.add('valombre-stat-label-with-icon');

    const img = document.createElement('img');
    img.className = 'valombre-stat-icon';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';

    /* Paramètre de version pour éviter qu'un ancien JPG reste en cache. */
    img.src = new URL(filename + '?v=2', ICON_BASE).href;

    /* L'icône est placée directement devant le titre, pas dans la case entière. */
    labelEl.prepend(img);
  }

  function apply() {
    findLabels().forEach(addIconToLabel);
  }

  /* Supprime d'abord les injections de l'ancienne version si la page
     a été mise à jour sans rechargement complet. */
  removeOldInjection();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  let scheduled = false;
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener('load', apply);
})();
