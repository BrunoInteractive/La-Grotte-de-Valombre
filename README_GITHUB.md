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

## Pages et illustrations

L'histoire comporte maintenant **31 pages numérotées**. Chaque choix affiche la page de destination, comme dans un vrai livre-jeu.

Les illustrations sont chargées automatiquement depuis le dossier `images/`.

Pour la page 01, ajoute par exemple :

`images/La-Grotte-de-Valombre-01.png`

Pour la page 02 :

`images/La-Grotte-de-Valombre-02.png`

... jusqu'à la page 31.

Extensions acceptées : `.webp`, `.png`, `.jpg`, `.jpeg`.

Si une image manque, l'application conserve automatiquement l'emplacement **IMAGE À VENIR**. Tu peux donc remplir le dossier progressivement.

Pour remplacer une image plus tard, remplace simplement le fichier sur GitHub en gardant le même nom. La version en ligne privilégie la nouvelle image et la remet ensuite en cache pour l'usage hors connexion.

Le fichier `PAGES_ET_IMAGES.txt` donne la correspondance complète entre les 31 pages et les noms d'images.


## Version « faux livre ancien »

Cette version affiche chaque écran comme une page de livre-jeu : illustration en haut, texte en dessous, numéro de page et choix avec renvoi vers la page de destination.

La logique du chapitre 10 a également été corrigée : l'avertissement de Père Auguste n'est rappelé que si le joueur a réellement lu la lettre dans la sacoche (page correspondant au chapitre 2). Sinon, le symbole de l'œil fermé reste inconnu du héros.
