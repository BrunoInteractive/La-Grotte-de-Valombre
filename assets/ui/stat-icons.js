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

  function applyIcon(card) {
    const labelEl = card.querySelector('.tag-label');
    const slot = card.querySelector('.tag-icon');
    if (!labelEl || !slot) return;

    const label = normalize(labelEl.textContent);
    const filename = ICONS[label];
    if (!filename) return;

    const expected = new URL(filename + '?v=68139', ICON_BASE).href;
    const current = slot.querySelector('.valombre-stat-img-v4');

    if (current) {
      if (current.src !== expected) current.src = expected;
      return;
    }

    // On remplace uniquement le pictogramme texte natif.
    // L'observer ne surveille pas le sous-arbre, donc aucune boucle.
    slot.replaceChildren();

    const img = document.createElement('img');
    img.className = 'valombre-stat-img-v4';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.src = expected;

    // Si une icône personnalisée manque, on rétablit un symbole simple.
    const fallback = {
      'VIE': '♥',
      'DEXTERITE': '◆',
      'FORCE': '⚔',
      'ARME': '†',
      'PROTECTION': '🛡',
      'TERRE NOIRE': '●'
    }[label] || '';

    img.addEventListener('error', () => {
      slot.replaceChildren(document.createTextNode(fallback));
      slot.style.fontSize = '';
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

  // La barre est reconstruite par le jeu à chaque changement de page.
  // On observe uniquement ses enfants directs : pas de boucle.
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
