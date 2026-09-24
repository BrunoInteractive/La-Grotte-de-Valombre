(() => {
  'use strict';

  const ICONS = {
    'VIE': 'vie.png',
    'DEXTERITE': 'dexterite.jpg',
    'FORCE': 'force.png',
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

  function removeOldV2(card) {
    card.classList.remove('valombre-stat-icon-card');

    card.querySelectorAll('.valombre-stat-icon').forEach(img => img.remove());
    card.querySelectorAll('.valombre-stat-label-with-icon').forEach(el => {
      el.classList.remove('valombre-stat-label-with-icon');
    });
  }

  function applyIcon(card) {
    removeOldV2(card);

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

    // Si notre image V4 est déjà là, ne rien modifier :
    // cela évite la boucle MutationObserver de la V3.
    let img = slot.querySelector('.valombre-stat-img-v4');
    const expected = new URL(filename + '?v=68125', ICON_BASE).href;

    if (img) {
      if (img.src !== expected) img.src = expected;
      return;
    }

    // Première installation seulement : retire l'ancien pictogramme texte ou image.
    slot.replaceChildren();

    img = document.createElement('img');
    img.className = 'valombre-stat-img-v4';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.src = expected;

    // Si un fichier personnalisé n'existe pas encore, on laisse le pictogramme
    // d'origine réapparaître au prochain rendu plutôt qu'une image cassée.
    img.addEventListener('error', () => {
      img.remove();
    }, { once: true });

    slot.appendChild(img);
  }

  function applyIcons() {
    document.querySelectorAll('.status-tags .tag').forEach(applyIcon);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyIcons, { once: true });
  } else {
    applyIcons();
  }

  // Le jeu reconstruit la barre à chaque page.
  // L'observer ne relance le travail que lorsqu'un nouvel élément est créé.
  const target = document.getElementById('statusTags');

  if (target) {
    let scheduled = false;

    new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;

      requestAnimationFrame(() => {
        scheduled = false;
        applyIcons();
      });
    }).observe(target, { childList: true });
  }

  window.addEventListener('load', applyIcons);
})();
