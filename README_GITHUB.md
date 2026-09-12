# La Grotte de Valombre — PWA

Cette version est prête à être publiée gratuitement avec GitHub Pages.

## Publication sur GitHub Pages

1. Crée un nouveau dépôt GitHub, par exemple `la-grotte-de-valombre`.
2. Dépose **tout le contenu de ce dossier à la racine du dépôt** : `index.html`, `manifest.webmanifest`, `sw.js`, les dossiers `icons/` et `images/`, ainsi que `.nojekyll`.
3. Dans GitHub : **Settings → Pages**.
4. Dans **Build and deployment**, choisis **Deploy from a branch**.
5. Sélectionne la branche **main** et le dossier **/(root)**, puis **Save**.
6. Après quelques instants, GitHub affiche l'adresse publique du jeu.

L'URL sera généralement de la forme :

`https://TON-COMPTE.github.io/la-grotte-de-valombre/`

## Installation sur téléphone

### Android / Chrome
Ouvre l'adresse du jeu, puis utilise **Installer l'application** ou **Ajouter à l'écran d'accueil** dans le menu du navigateur.

### iPhone / iPad / Safari
Ouvre l'adresse du jeu dans Safari, touche **Partager**, puis **Sur l'écran d'accueil**.

## Fonctionnement hors connexion

Après une première ouverture en ligne, le service worker conserve le cœur de l'application en cache. Les images ajoutées ensuite dans `images/` seront également mises en cache après leur première consultation.

## Ajouter les illustrations

Le dossier `images/` est prévu pour les illustrations de l'histoire. La version actuelle conserve volontairement les emplacements « IMAGE À VENIR » de la démo d'origine.
