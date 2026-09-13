# La Grotte de Valombre — V8 transitions et combats

Corrections principales :

- La galerie condamnée ne peut être tentée qu’une seule fois.
  Après l’essai, réussi ou raté, elle disparaît des choix du camp.
- Le tunnel voisin n’annonce plus les sanglots à l’avance :
  le joueur les entend seulement après s’y être engagé.
- La lame noire n’est plus ajoutée automatiquement à l’inventaire en entrant
  sur sa page. Elle est obtenue uniquement au moment où le joueur choisit
  réellement de la prendre.
- Nouvelles clés de sauvegarde/checkpoint pour éviter qu’un ancien état bugué
  ne transporte la lame noire dans une nouvelle partie.
- Chaque lancer de 2D6 incrémente maintenant un compteur visible
  (« Jet n°… »), afin de confirmer qu’un nouveau tirage est effectué.
- Le tirage reste uniforme avec `crypto.getRandomValues()` et rejet de biais.
- Lors d’un deuxième échange raté en combat, le héros est blessé mais finit
  tout de même par tuer son adversaire : plus de boucle de jets sans fin.
- Les pages du camp, de la descente, du tunnel, du monde impossible,
  du lac, des marches et de la terrasse ont été enrichies avec davantage
  de déplacement, de paysage et de transitions narratives.
