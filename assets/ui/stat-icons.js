
(() => {
  'use strict';

  if (window.__VALOMBRE_STAT_ICONS__) return;
  window.__VALOMBRE_STAT_ICONS__ = true;

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
  const cacheBust = Date.now().toString(36);

  function normalize(value) {
    return (value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();
  }

  function directLabelElements() {
    return Array.from(document.querySelectorAll(
      'span, strong, label, p, div'
    )).filter(el => {
      if (el.closest('.valombre-stat-icon-card')) return false;
      if (el.childElementCount !== 0) return false;
      return Object.prototype.hasOwnProperty.call(ICONS, normalize(el.textContent));
    });
  }

  function containsAnotherStatLabel(el, ownLabel) {
    const text = normalize(el.textContent);
    let count = 0;
    for (const key of Object.keys(ICONS)) {
      if (text.includes(key)) count++;
    }
    return count > 1 || (count === 1 && !text.includes(ownLabel));
  }

  function likelyCard(labelEl, label) {
    let node = labelEl.parentElement;
    for (let depth = 0; node && depth < 4; depth++, node = node.parentElement) {
      const txt = normalize(node.textContent);
      if (!txt.includes(label)) continue;
      if (containsAnotherStatLabel(node, label)) continue;

      const rect = node.getBoundingClientRect();
      const sensibleWidth = !rect.width || rect.width <= 520;
      const sensibleHeight = !rect.height || rect.height <= 220;
      const shortEnough = txt.length <= 90;

      if (sensibleWidth && sensibleHeight && shortEnough) return node;
    }
    return labelEl.parentElement;
  }

  function addIcon(labelEl) {
    const label = normalize(labelEl.textContent);
    const filename = ICONS[label];
    if (!filename) return;

    const card = likelyCard(labelEl, label);
    if (!card || card.querySelector(':scope > .valombre-stat-icon')) return;

    card.classList.add('valombre-stat-icon-card');
    card.dataset.valombreStatIcon = label.toLowerCase().replace(/\s+/g, '-');

    const img = document.createElement('img');
    img.className = 'valombre-stat-icon';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.decoding = 'async';
    img.src = new URL(filename + '?v=' + cacheBust, ICON_BASE).href;

    card.prepend(img);
  }

  function apply() {
    directLabelElements().forEach(addIcon);
  }

  let scheduled = false;
  function scheduleApply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      apply();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener('load', apply);
})();
