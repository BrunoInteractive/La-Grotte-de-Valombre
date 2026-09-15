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

Ainsi, une future V21 pourra toujours utiliser le même dossier `books/ecuyer/01-la-grotte-de-valombre/` et le même ID `ecuyer-01`.

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


## V17 TEST — nouvel équilibrage Force / armes
- Héros au départ : Vie 18, Chance 12, Force 8, Dextérité 13, Puissance de l’arme 0.
- Épée lourde de Sir Aldren : Dextérité -4 (DEX 9 au départ), Puissance 4.
- Épée du forgeron : Dextérité -1 (DEX 12 au départ), Puissance 1.
- Combat opposé inchangé : Dextérité + 2D6 contre Dextérité + 2D6.
- Dégâts : bonus de Force + Puissance de l’arme ; bonus de Force = ⌊Force / 4⌋, minimum 1.
- Masse dans l’ombre : Vie 6, Force 8, Dextérité 5, dégâts 2.
- Disparu de Rochebrume : Vie 3, Force 3, Dextérité 8, dégâts 1.
- La mini-fiche adversaire affiche aussi les dégâts.
- Aucun fichier d’illustration n’est inclus ; le dossier images reste vide.


## V18 TEST — trois routes vers la Cité morte
- Suite développée jusqu’au point de convergence dans la Cité morte (page 66).
- Trois routes majeures : Lac noir, Grandes Marches, Pont.
- Illustrations toujours gérées séparément.

## V19 TEST — navigation directe entre les pages
- Le bouton ☰ en haut à droite devient un navigateur de test.
- Il affiche toutes les pages 001 à 066, triées par numéro, avec leur titre.
- La page courante est surlignée et automatiquement centrée à l’ouverture.
- Cliquer sur une page y va directement sans exécuter les effets des choix ou des pages précédentes.
- L’état courant (inventaire, caractéristiques, objets, blessures) est conservé pendant ce saut de test.
- Le menu ne contient plus les anciens boutons Continuer / Inventaire / Recommencer ; ces fonctions restent accessibles ailleurs dans l’interface.


## V21 — Inventaire de test

- L’inventaire affiche dès le départ tous les objets déjà introduits jusqu’à la page 66.
- Chaque objet peut être coché/décoché pour simuler sa possession.
- Le Brassard et l’Anneau appliquent leurs bonus uniquement lorsqu’ils sont cochés.
- Les lames de jet passent à 3 lorsqu’elles sont cochées et à 0 lorsqu’elles sont décochées.
- Un sélecteur permet d’équiper Aucune arme / Grosse épée / Petite épée depuis l’inventaire.
- Cette interface est destinée uniquement aux versions TEST.
