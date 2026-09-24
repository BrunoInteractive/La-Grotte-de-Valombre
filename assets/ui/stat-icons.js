
(() => {
  'use strict';

  const ICONS = {
    'VIE': 'vie.png',
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

  function cleanOldV2(card) {
    card.classList.remove('valombre-stat-icon-card');

    card.querySelectorAll('.valombre-stat-icon').forEach(img => img.remove());
    card.querySelectorAll('.valombre-stat-label-with-icon').forEach(el => {
      el.classList.remove('valombre-stat-label-with-icon');
    });
  }

  function applyIcons() {
    const cards = document.querySelectorAll('.status-tags .tag');

    cards.forEach(card => {
      cleanOldV2(card);

      const copy = card.querySelector('.tag-copy');
      const labelEl = copy ? copy.querySelector('small') : null;
      if (!copy || !labelEl) return;

      const label = normalize(labelEl.textContent);
      const filename = ICONS[label];
      if (!filename) return;

      let slot = card.querySelector(':scope > .tag-icon');
      if (!slot) {
        slot = document.createElement('span');
        slot.className = 'tag-icon';
        card.insertBefore(slot, copy);
      }

      // Remplace les anciens pictogrammes texte par l'image choisie.
      slot.textContent = '';

      let img = slot.querySelector('.valombre-stat-img-v3');
      if (!img) {
        img = document.createElement('img');
        img.className = 'valombre-stat-img-v3';
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.decoding = 'async';
        slot.appendChild(img);
      }

      const expected = new URL(filename + '?v=68123', ICON_BASE).href;
      if (img.src !== expected) img.src = expected;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyIcons, { once: true });
  } else {
    applyIcons();
  }

  // La barre est recréée à chaque changement de page.
  const target = document.getElementById('statusTags') || document.documentElement;
  let scheduled = false;

  new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyIcons();
    });
  }).observe(target, { childList: true, subtree: true });

  window.addEventListener('load', applyIcons);
})();
