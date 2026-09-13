# La Grotte de Valombre — design restauré + mécaniques de jeu

Cette version repart directement de la maquette visuelle `maquette_stricte_sans_crane`.

Le CSS principal des pages de livre n'a pas été remplacé.

Ajouts :
- fiche du héros au lancement ;
- Vie, Chance, Force et Dextérité ;
- épée lourde : Force +2 / Dextérité -2 ;
- choix de l'épée maniable chez le forgeron ;
- Journal texte avec copier/coller normal du téléphone ;
- parchemin conservé dans l'inventaire et relisible à tout moment ;
- potion de guérison utilisable depuis l'inventaire (+2 PV) ;
- argent du joueur.

## Image du parchemin

Place ton image ici :

`images/objets/La-Grotte-de-Valombre-Parchemin.png`

## Images des pages

Toujours le même système :

`images/La-Grotte-de-Valombre-01.png`
`images/La-Grotte-de-Valombre-02.png`
etc.

## Direction narrative

Le ton doit rester constamment ambigu et inquiétant :
- ne pas montrer trop vite des monstres clairement identifiables ;
- laisser planer le doute entre folie, mensonge, maladie, secte et présence surnaturelle ;
- préférer les signes partiels : odeurs, voix, mouvements sous la peau, silhouettes mal perçues, phrases incomplètes ;
- les révélations doivent arriver lentement ;
- même quand le héros voit quelque chose, il ne doit pas toujours être certain de l’avoir compris correctement.

Référence d’esprit : horreur cosmique / inquiétude à la Lovecraft, mais avec un univers, des noms et des créatures originaux.


## Branche ajoutée — pages 8 à 20

Cette mise à jour ajoute exactement la nouvelle séquence :
- intersection sur le chemin ;
- cadavre de Gaspard Vellin ;
- choix du coup de pommeau ou de la parole ;
- perte de 1 PV et 1 Dextérité sur la branche de la terre noire ;
- fouille : potion sombre + 3 pièces d’or ;
- forêt de Rochebrume ;
- village désert ;
- Élias à la taverne ;
- possibilité d’acheter plusieurs lames de jet ;
- étranger familier mais impossible à replacer ;
- reconvergence vers la grotte.

Le ton reste volontairement ambigu : les manifestations sont inquiétantes, mais jamais totalement expliquées.


## Mise à jour — la grotte (pages 20 à 28)

Cette version ajoute :
- le chemin escarpé vers la grotte ;
- le choix entre le passage au soufre et le passage étroit ;
- la mauvaise branche mortelle du soufre ;
- la grande salle aux ombres mouvantes ;
- la fuite qui mène à une fin de folie ;
- l’attaque du grondement ;
- l’utilisation possible des lames de jet ;
- un vrai jet de dé contre la Dextérité ;
- la poursuite de l’exploration plus loin dans la grotte.

Le ton reste volontairement ambigu et inquiétant.


## Ajustements V4

- Le jeu ne rappelle plus automatiquement l’indice du soufre : c’est au joueur de se souvenir du parchemin ou de le consulter.
- Le lancer de dé ne révèle plus à l’avance ce qui constitue une réussite ou un échec.
- Le résultat affiche clairement :
  - Résultat du dé
  - Dextérité du personnage
- Un point de sauvegarde est créé automatiquement lorsque le héros quitte Valombre.
- En cas de fin mortelle/folie, le joueur peut choisir :
  - Reprendre à la sortie du village
  - Recommencer depuis le début


## Ajustements V5

- À Rochebrume, après avoir parlé à l’étranger dans la rue, le joueur peut maintenant :
  - entrer dans la taverne de Gaspard ;
  - ou repartir directement vers la grotte.
- Le dé utilise désormais `crypto.getRandomValues()` avec rejet des valeurs biaisées,
  afin d’obtenir un tirage uniforme réel entre 1 et 6.
- Deux résultats identiques de suite restent naturellement possibles : par exemple,
  faire deux 5 de suite a une probabilité de 1 sur 36.
