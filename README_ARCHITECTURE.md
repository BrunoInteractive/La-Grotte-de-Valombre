# Collection — V13 / identifiants stables

Cette version conserve l’application et le moteur séparés, mais fixe une convention durable pour les séries et les épisodes.

## Identité permanente de Valombre

- Série : `ecuyer`
- Épisode : `01`
- ID permanent du livre : `ecuyer-01`
- Slug : `la-grotte-de-valombre`
- Dossier : `books/ecuyer/01-la-grotte-de-valombre/`

L’ID et le chemin interne ne doivent plus dépendre du numéro de version de développement.

## Structure

- `index.html` : coque visuelle du lecteur.
- `engine/core.js` : dés, inventaire générique et registre des livres.
- `engine/reader.js` : navigation, sauvegarde, checkpoints, journal et affichage.
- `app/catalog.js` : catalogue de la future bibliothèque.
- `books/ecuyer/01-la-grotte-de-valombre/book.js` : contenu narratif et règles propres à Valombre.
- `books/ecuyer/01-la-grotte-de-valombre/images/` : images propres au livre.
- `books/ecuyer/01-la-grotte-de-valombre/book.json` : métadonnées du livre.

## Versionnage

Le numéro `V13` ne sert qu’au ZIP de travail. Il n’apparaît pas dans l’identité permanente du livre.

Le livre possède des métadonnées séparées :

- `contentVersion` : version du contenu du livre ; peut évoluer à chaque mise à jour.
- `saveVersion` : version du format de sauvegarde ; ne change que si la structure de sauvegarde doit réellement migrer.

Ainsi, une future V20 pourra toujours utiliser le même dossier `books/ecuyer/01-la-grotte-de-valombre/` et le même ID `ecuyer-01`.

## Sauvegardes

La sauvegarde principale utilise désormais l’ID stable :

- partie du livre : `ldveh.book.ecuyer-01.save.v1`
- mémoire de série : `ldveh.series.ecuyer.profile.v1`

La V13 tente aussi de récupérer automatiquement :

- la sauvegarde V12 utilisant l’ancien ID `ecuyer-01-valombre` ;
- les anciennes sauvegardes Valombre de la V11.

## Futurs épisodes

Exemple de structure :

```text
books/
  ecuyer/
    01-la-grotte-de-valombre/
    02-nouvelle-aventure/
    03-autre-aventure/
```

Les ZIP de développement peuvent continuer à s’appeler `..._V13.zip`, `..._V14.zip`, etc. Cela ne change jamais les IDs ni les chemins internes.


## V14 TEST — combats opposés
- Combat : Dextérité + 2D6 contre Dextérité + 2D6.
- Égalité : aucun dégât.
- Victoire du héros : dégâts = Puissance de l’arme.
- Victoire de l’adversaire : dégâts = Force de l’adversaire.
- Fiches adversaires intégrées : Masse dans l’ombre (Vie 6, Force 3, Dextérité 4) ; Disparu de Rochebrume (Vie 3, Force 3, Dextérité 5).
- Les tests hors combat restent en 3D6 ≤ caractéristique.


## V15 TEST — Force + puissance de l’arme
- Combat : Dextérité + 2D6 contre Dextérité + 2D6.
- Égalité : aucun dégât.
- Le gagnant inflige : Force + Puissance de l’arme s’il en possède une.
- Masse dans l’ombre : Vie 14, Force 3, Dextérité 4.
- Disparu de Rochebrume : Vie 6, Force 3, Dextérité 5.
- Les caractéristiques Chance, Force et Dextérité n’affichent plus `/18` et n’ont plus de plafond à 18.
- Seule la Vie conserve un maximum affiché.
- Les tests hors combat restent en 3D6 ≤ caractéristique.
- Ajout d’une bulle « Règles des combats » et d’un rappel clair de chaque caractéristique au début.
- Les illustrations sont désormais gérées séparément et ne sont plus incluses dans les ZIP de développement.


## V16 TEST — textes de présentation
- La Vie est décrite simplement comme la santé du héros ; la phrase sur ce qui le rend humain est retirée.
- La Dextérité précise désormais qu’elle peut être affectée par l’équipement porté, notamment une arme lourde.
- Le rappel général des tests en 3D6 est retiré de la page d’introduction ; les règles apparaîtront au moment où les tests surviennent dans le jeu.
