# La Grotte de Valombre — V12 Collection / moteur séparé

Cette version conserve l’interface et le fonctionnement de la V11, mais prépare l’application à accueillir plusieurs livres.

## Structure

- `index.html` : coque visuelle du lecteur.
- `engine/core.js` : dés, inventaire générique, rendu des résultats et registre de livres.
- `engine/reader.js` : navigation, sauvegarde, checkpoints, journal, affichage et chargement des images.
- `app/catalog.js` : catalogue de la future bibliothèque.
- `books/ecuyer-01-valombre/book.js` : **tout le contenu narratif et les règles propres à Valombre**.
- `books/ecuyer-01-valombre/images/` : images propres au livre.
- `books/ecuyer-01-valombre/book.json` : métadonnées du livre.

## Sauvegardes

Les sauvegardes sont désormais séparées :

- partie du livre : `ldveh.book.ecuyer-01-valombre...`
- mémoire de la série : `ldveh.series.ecuyer...`

Au premier lancement, la V12 tente automatiquement de récupérer la sauvegarde locale de la V11 (`valombre_save_v12_3d6_stats18`) et son checkpoint.

La mémoire inter-livres est volontairement vide pour le moment : les décisions durables seront ajoutées explicitement à `exportSeriesMemory()` lorsqu’elles seront validées, afin de ne pas figer trop tôt les suites.

## Ajouter un futur livre

Un futur livre devra créer son propre dossier dans `books/`, enregistrer son contenu via `BookRegistry.register(...)`, puis ajouter une entrée dans `app/catalog.js`. Le moteur ne devra pas être modifié pour ajouter des personnages, des lieux ou des objets propres à ce livre.
