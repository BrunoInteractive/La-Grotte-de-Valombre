/* Écuyer 01 — La Grotte de Valombre
   Contenu narratif et règles spécifiques au livre.
   Le moteur commun ne contient aucune référence à Aldren, Gaspard ou Valombre. */
(function () {
  'use strict';

const STORY = {
  start: {
    sheet: true,
    number: 'FICHE DU HÉROS',
    title: 'Ton personnage',
    text: state => `
      <div class="hero-sheet">
        <div class="hero-sheet-row">
          <span class="hero-label">Nom</span>
          <input id="heroNameInput" class="hero-name-input" type="text" maxlength="24"
            placeholder="Ton nom" value="${escapeHtml(state.heroName || '')}">
        </div>
        <div class="hero-sheet-row"><span class="hero-label">Rang</span><span class="hero-value">Écuyer de Sir Aldren de Rochebrune</span></div>
        <div class="hero-sheet-row"><span class="hero-label">Style</span><span class="hero-value">Vif, prudent et observateur</span></div>
        <div class="hero-sheet-row"><span class="hero-label">Technique de bataille</span><span class="hero-value">Esquive, déplacement rapide et contre-attaque</span></div>

        <div class="hero-sheet-grid">
          <div class="hero-stat"><strong>Vie</strong><span>${state.hp} / ${state.maxHp}</span></div>
          <div class="hero-stat"><strong>Chance</strong><span>${state.chance} / 18</span></div>
          <div class="hero-stat"><strong>Force</strong><span>${currentForce(state)} / 18</span></div>
          <div class="hero-stat"><strong>Dextérité</strong><span>${currentDexterity(state)} / 18</span></div>
          <div class="hero-stat"><strong>Puissance</strong><span>${combatPower(state)}</span></div>
        </div>

        <div class="hero-weapon">Au départ, tu ne portes encore aucune arme.</div>
        <div class="hero-weapon"><strong>Tests :</strong> lance 3 dés. Si le total est inférieur ou égal à la caractéristique, le test est réussi.<br><strong>Blessures :</strong> lance 1 dé. Son résultat indique directement le nombre de points de Vie perdus.</div>
      </div>
      <p>Sir Aldren t’a ordonné de rester au village. Pourtant, la nuit est tombée depuis longtemps et son cheval vient de revenir seul.</p>
    `,
    choices: [{ label: 'Commencer l’aventure', to: 'c1' }]
  },

  c1: {
    number: 'PAGE 1',
    title: 'Le cheval revenu seul',
    image: 'Le cheval revenu seul',
    onEnter: s => equipHeavySword(s),
    text: state => `
      <p>Des sabots résonnent soudain sur les pavés de Valombre.</p>
      <p>Le cheval de <strong>Sir Aldren de Rochebrune</strong> apparaît au bout de la rue. Seul.</p>
      <p>De l’écume couvre son poitrail. Une longue entaille traverse la selle et du sang séché macule l’une des sacoches.</p>

      <p>Ton regard se pose alors sur l’ancienne épée de Sir Aldren, appuyée contre le mur de l’écurie.</p>
      <p>Tu l’as vu la manier des centaines de fois.</p>
      <p>Pourtant, lorsque tes doigts se referment sur sa poignée, tu ressens quelque chose d’étrange.</p>
      <p>Un mélange de <strong>crainte et de fierté</strong>.</p>
      <p>Jusqu’à aujourd’hui, cette arme appartenait à ton maître. La prendre donne soudain à son absence une réalité que tu aurais préféré repousser encore un peu.</p>
      <p>Tu soulèves la lame.</p>
      <p>Elle est lourde. Beaucoup plus lourde que les armes avec lesquelles Aldren t’a appris à combattre.</p>
      <p>Mais lorsque tu la tiens devant toi, tu sens également sa puissance.</p>
      <p>Ce n’est pas une arme faite pour être rapide.</p>
      <p>C’est une arme faite pour <strong>frapper fort</strong>.</p>
      <p>Tu la passes à ton côté.</p>
      <p>Si Sir Aldren est encore vivant quelque part dans cette montagne, tu comptes bien le retrouver.</p>
    `,
    choices: [
      { label: 'Fouiller la sacoche de Sir Aldren', to: 'c2' },
      { label: 'Aller au village demander de l’aide', to: 'c3' },
      { label: 'Partir immédiatement vers la grotte', to: 'c8' }
    ]
  },

  c2: {
    number: 'PAGE 2',
    title: 'La sacoche de Sir Aldren',
    image: 'La sacoche de Sir Aldren',
    onEnter: s => {
      if (!s.flags.sacocheFouillee) {
        s.flags.sacocheFouillee = true;
        s.silver += 3;
        addItem(
          s,
          'parchemin',
          'Parchemin ancien',
          'Un fragment ancien découvert dans les affaires de Sir Aldren. Il peut être relu quand tu veux.'
        );
      }
    },
    text: state => `
      <p>Tu ouvres la sacoche. À l’intérieur, tu trouves <strong>trois pièces d’argent</strong>, une petite <strong>fiole rouge sombre</strong> et un morceau de parchemin plié plusieurs fois.</p>
      <p>Le papier paraît beaucoup plus ancien que le reste. Certaines lettres sont presque effacées.</p>

      <div class="parchment-verse">
        <strong>L’œil qui dort doit demeurer fermé,</strong><br>
        <strong>Car nul vivant ne doit le réveiller.</strong><br><br>
        <strong>Là où le soufre vient empoisonner l’air,</strong><br>
        <strong>Détourne tes pas et rebrousse en arrière.</strong><br><br>
        <strong>Lorsque les liens ne pourront plus céder,</strong><br>
        <strong>Cherche la lame noire : elle seule peut libérer.</strong>
      </div>

      <p>Tu plies soigneusement le parchemin et le ranges dans ton inventaire. Tu pourras désormais le relire quand tu le souhaites.</p>
      ${hasItem(state,'fiole_rouge') || state.flags.fioleLaissee
        ? '<p>Tu as déjà décidé quoi faire de la mystérieuse fiole rouge.</p>'
        : '<p>La fiole rouge reste entre tes mains. Tu ignores encore ce qu’elle contient.</p>'}
    `,
    choices: state => {
      if (!hasItem(state,'fiole_rouge') && !state.flags.fioleLaissee) {
        return [
          { label: 'Prendre la fiole et aller au village', to: 'c3', effect: s => { addItem(s,'fiole_rouge','Fiole rouge','Une petite fiole au liquide rouge sombre. Son utilité est encore inconnue.'); } },
          { label: 'Prendre la fiole et partir vers les grottes', to: 'c8', effect: s => { addItem(s,'fiole_rouge','Fiole rouge','Une petite fiole au liquide rouge sombre. Son utilité est encore inconnue.'); } },
          { label: 'Laisser la fiole et aller au village', to: 'c3', effect: s => { s.flags.fioleLaissee = true; } },
          { label: 'Laisser la fiole et partir vers les grottes', to: 'c8', effect: s => { s.flags.fioleLaissee = true; } }
        ];
      }
      return [
        { label: 'Aller au village', to: 'c3' },
        { label: 'Partir vers les grottes', to: 'c8' }
      ];
    }
  },

  c3: {
    number: 'PAGE 3',
    title: 'La place de Valombre',
    image: 'La place de Valombre',
    text: `
      <p>La place de Valombre est presque déserte. Les volets se ferment les uns après les autres.</p>
      <p>Sous son auvent, le <strong>marchand</strong> termine de ranger ses affaires. Dans la forge, une lueur rouge éclaire encore les murs.</p>
      <p>Plus loin, dans l’ombre d’une ruelle, une étrange silhouette semble parler toute seule.</p>
      <p>Tu peux rencontrer qui tu veux — ou quitter le village immédiatement.</p>
    `,
    choices: [
      { label: 'Voir le marchand', to: 'c4' },
      { label: 'Voir le forgeron', to: 'c5' },
      { label: 'Approcher la personne dans la ruelle', to: 'c6' },
      { label: 'Partir vers la grotte', to: 'c8' }
    ]
  },

  c4: {
    number: 'PAGE 4',
    title: 'Le marchand',
    image: 'Le marchand de Valombre',
    text: state => {
      if (hasItem(state,'potion_guerison')) {
        return `
          <p>Le marchand reconnaît la potion qui dépasse de ton sac.</p>
          <blockquote>« Garde-la pour le moment où tu en auras vraiment besoin. »</blockquote>
        `;
      }
      if (state.silver >= 3) {
        return `
          <p>Le marchand t’écoute raconter le retour du cheval. Son visage devient grave.</p>
          <p>Il sort alors d’une petite caisse une fiole soigneusement bouchée.</p>
          <blockquote>« Une potion de guérison. Elle te rendra <strong>1 dé de Vie</strong>. Trois pièces d’argent. »</blockquote>
        `;
      }
      return `
        <p>Le marchand fouille rapidement ses étagères, puis secoue la tête.</p>
        <blockquote>« Sans argent, je ne peux rien faire pour toi, mon ami. Reviens quand tu auras de quoi payer. »</blockquote>
      `;
    },
    choices: state => {
      if (!hasItem(state,'potion_guerison') && state.silver >= 3) {
        return [
          {
            label: 'Acheter la potion de guérison',
            to: 'c3',
            effect: s => {
              s.silver -= 3;
              addItem(
                s,
                'potion_guerison',
                'Potion de guérison',
                'Une potion achetée au marchand. Elle peut être utilisée à tout moment : lance un dé pour savoir combien de points de Vie tu récupères.'
              );
            }
          },
          { label: 'Ne rien acheter et repartir', to: 'c3' }
        ];
      }
      return [{ label: 'Retourner sur la place', to: 'c3' }];
    }
  },

  c5: {
    number: 'PAGE 5',
    title: 'Le forgeron',
    image: 'Le forgeron de Valombre',
    text: state => `
      <p>Le forgeron lève immédiatement les yeux lorsque tu entres.</p>

      <blockquote>« Toi ? Où est Aldren ? »</blockquote>

      <p>Lorsqu’il apprend ce qui s’est passé, son visage se ferme.</p>

      <p>Il connaissait ton maître depuis des années.</p>

      <blockquote>« J’irais avec toi si je le pouvais. Mais ma jambe ne me mènerait même pas jusqu’au pied de la montagne. »</blockquote>

      <p>Son regard tombe alors sur l’ancienne épée de Sir Aldren.</p>

      <p>Il sourit légèrement.</p>

      <blockquote>« Cette chose ? Aldren maniait ça comme une brindille. Toi, elle va te faire tomber avant ton adversaire. »</blockquote>

      <p>Il disparaît dans l’arrière-boutique et revient avec une lame plus courte, parfaitement équilibrée.</p>

      <blockquote>« Je te propose un échange. Elle frappe moins fort… mais entre de bonnes mains, elle frappe beaucoup plus vite. »</blockquote>

      <div class="weapon-compare">
        <div>
          <strong>Garder l’épée lourde</strong><br><br>
          <strong>Épée de Sir Aldren</strong><br>
          Puissance : <strong>10</strong><br>
          Dextérité : <strong>9</strong>
        </div>
        <div>
          <strong>Accepter l’échange</strong><br><br>
          <strong>Épée du forgeron</strong><br>
          Puissance : <strong>4</strong><br>
          Dextérité : <strong>15</strong>
        </div>
      </div>
    `,
    choices: state => {
      if (state.weapon === 'light') {
        return [
          { label: 'Remercier le forgeron et retourner sur la place', to: 'c3' }
        ];
      }
      return [
        {
          label: 'Accepter l’échange',
          to: 'c3',
          effect: s => { s.weapon = 'light'; }
        },
        {
          label: 'Garder l’épée lourde de Sir Aldren',
          to: 'c3',
          effect: s => { s.weapon = 'heavy'; }
        }
      ];
    }
  },

  c6: {
    number: 'PAGE 6',
    title: 'La silhouette dans la ruelle',
    image: 'La silhouette dans la ruelle',
    text: `
      <p>Tu t’approches de la personne étrangement accoudée contre le mur.</p>
      <p>Elle semble parler seule, marmonnant quelque chose dans sa barbe. Sa silhouette est si maigre qu’elle paraît presque déformée.</p>
      <p>Plus tu avances, plus une odeur particulière devient nette.</p>
      <p><strong>Du soufre.</strong></p>
    `,
    choices: [
      { label: 'S’approcher encore davantage', to: 'c7' },
      { label: 'Repartir vers la place', to: 'c3' }
    ]
  },

  c7: {
    number: 'PAGE 7',
    title: 'Ils arrivent',
    image: 'Les yeux du fou',
    onEnter: s => { s.flags.avertissementSoufre = true; },
    text: `
      <p>Tu avances encore.</p>

      <p>La silhouette s’immobilise.</p>

      <p>Puis sa tête se tourne brusquement vers toi.</p>

      <p>Son visage est presque humain.</p>

      <p><em>Presque.</em></p>

      <p>Sa peau semble trop pâle. Ses joues trop creuses.</p>

      <p>Et ses yeux sont si largement ouverts que tu distingues le blanc tout autour de ses pupilles.</p>

      <p>Il recule contre le mur.</p>

      <blockquote>« Recule… »</blockquote>

      <p>Sa voix tremble.</p>

      <blockquote>« Recule si tu ne veux pas mourir… »</blockquote>

      <p>Il fixe quelque chose derrière toi.</p>

      <blockquote>« Ils arrivent. »</blockquote>

      <p>Puis il se met à rire.</p>

      <p>Un rire étouffé, presque douloureux.</p>

      <blockquote>« Vous ne voyez donc pas ? »</blockquote>

      <p>Son regard revient vers toi.</p>

      <blockquote><strong>« Ils arrivent… »</strong></blockquote>

      <p>Et soudain, quelque chose remue sous la peau de son cou.</p>
    `,
    choices: [
      { label: 'Reculer lentement et retourner sur la place', to: 'c3' },
      { label: 'Quitter Valombre et partir vers la grotte', to: 'c8' }
    ]
  },

  c8: {
    number: 'PAGE 8',
    title: 'Le chemin de la montagne',
    image: 'Le chemin de la montagne',
    text: `
      <p>Tu quittes Valombre.</p>

      <p>À mesure que tu t’éloignes du village, les dernières lumières disparaissent derrière les arbres.</p>

      <p>Le chemin monte lentement vers les collines.</p>

      <p>Au bout d’une demi-heure, la lune apparaît entre deux masses de nuages et éclaire brièvement le sentier.</p>

      <p>C’est alors que tu aperçois quelque chose sur le bas-côté.</p>

      <p>Un homme est étendu dans l’herbe.</p>

      <p>Quelques mètres plus loin, le chemin se divise.</p>

      <p>Le sentier principal continue de monter vers la montagne et l’entrée des grottes.</p>

      <p>L’autre chemin descend vers la forêt.</p>

      <p>Dans la boue, plusieurs <strong>traces de bottes</strong> s’éloignent dans cette direction.</p>
    `,
    choices: [
      { label: 'T’approcher du cadavre', to: 'c9' },
      { label: 'Continuer directement vers la grotte', to: 'c20' },
      { label: 'Suivre les traces de bottes vers la forêt', to: 'c14' }
    ]
  },

  c9: {
    number: 'PAGE 9',
    title: 'L’homme au bord du chemin',
    image: 'L’homme au bord du chemin',
    text: `
      <p>Tu t’approches lentement.</p>

      <p>À quelques pas du corps, tu reconnais les vêtements.</p>

      <p>Puis le visage.</p>

      <p>Ou plutôt ce qu’il en reste.</p>

      <p>C’est <strong>Gaspard Vellin</strong>, un marchand de Rochebrume, le village situé de l’autre côté de la forêt.</p>

      <p>Tu l’as déjà croisé plusieurs fois sur les marchés de Valombre. Un homme bruyant, toujours souriant, qui vendait aussi bien des étoffes que des outils ou des remèdes.</p>

      <p>Il est presque méconnaissable.</p>

      <p>Quelque chose semble avoir tiré ses traits vers le bas.</p>

      <p>Sa peau ne paraît ni brûlée, ni véritablement blessée. Pourtant son visage donne l’impression étrange d’avoir <strong>coulé autour de ses os</strong>, comme de la cire trop longtemps exposée à une flamme.</p>

      <p>Ses joues pendent mollement.</p>

      <p>Ses lèvres sont distendues.</p>

      <p>Et ses yeux, à demi ouverts, ne semblent plus regarder dans la même direction.</p>

      <p>Une odeur te parvient.</p>

      <p><strong>Du soufre.</strong></p>

      <p>Elle n’est pas seulement présente dans l’air.</p>

      <p>Elle paraît venir de lui.</p>

      <p>De ses vêtements.</p>

      <p>De sa peau.</p>

      <p>Peut-être même de l’intérieur de son corps.</p>

      <p>Tu te penches légèrement.</p>

      <p>Sa bouche est entrouverte.</p>

      <p>Quelque chose de noir emplit sa gorge.</p>

      <p>De la terre.</p>

      <p>Une terre sombre et humide, tassée entre ses dents jusque derrière sa langue.</p>

      <p>Pendant un instant, une pensée absurde te traverse : ce n’est peut-être pas de la terre qu’on lui a mise dans la bouche.</p>

      <p>Peut-être qu’elle est remontée de l’intérieur.</p>

      <p>Tu chasses immédiatement cette idée.</p>

      <p>Puis tu remarques sa main droite.</p>

      <p>Ses ongles sont cassés.</p>

      <p>Sous chacun d’eux se trouve la même terre noire.</p>

      <p>Comme s’il avait essayé de creuser quelque chose.</p>

      <p>Ou d’en sortir.</p>

      <p>Tu restes immobile.</p>

      <p>Tu ne saurais dire pourquoi, mais tu as soudain la certitude désagréable que <strong>Gaspard Vellin n’est peut-être pas mort</strong>.</p>
    `,
    choices: [
      { label: 'T’approcher encore et l’examiner', to: 'c10' },
      { label: 'T’éloigner et continuer vers la grotte', to: 'c20' },
      { label: 'Partir vers la forêt', to: 'c14' }
    ]
  },

  c10: {
    number: 'PAGE 10',
    title: 'Le dernier réflexe',
    image: 'Le dernier réflexe',
    text: `
      <p>Tu t’accroupis à côté de lui.</p>

      <p>Rien.</p>

      <p>Pas de respiration.</p>

      <p>Pas de mouvement.</p>

      <p>Tu avances lentement une main vers son cou.</p>

      <p>Ses doigts se referment brutalement autour de ton poignet.</p>

      <p>Tu étouffes un cri.</p>

      <p>Les yeux de Gaspard s’ouvrent entièrement.</p>

      <p>Ils sont injectés de sang.</p>

      <p>Mais ce n’est pas la douleur que tu y vois.</p>

      <p>C’est de la <strong>terreur</strong>.</p>

      <p>Une terreur si entière que, pendant une seconde, tu oublies même de dégager ton bras.</p>

      <p>Sa bouche s’entrouvre.</p>

      <p>La terre noire craque entre ses dents.</p>
    `,
    choices: [
      { label: 'Lui asséner un coup de pommeau avec ton épée', to: 'c11' },
      { label: 'Essayer de lui parler', to: 'c12' }
    ]
  },

  c11: {
    number: 'PAGE 11',
    title: 'Le coup',
    image: 'Le coup',
    text: `
      <p>Tu tires brusquement ton bras et frappes.</p>

      <p>Le pommeau de ton épée heurte sa tempe.</p>

      <p>Le son qui accompagne le choc n’est pas celui auquel tu t’attendais.</p>

      <p>Ce n’est pas véritablement le craquement d’un os.</p>

      <p>C’est un bruit mat et sec.</p>

      <p>Comme une branche morte que l’on brise contre une pierre.</p>

      <p>Le crâne de Gaspard heurte le sol.</p>

      <p>Son corps se détend immédiatement.</p>

      <p>Quelque chose s’écoule lentement de son nez.</p>

      <p>Ce n’est pas du sang.</p>

      <p>La matière est noire, granuleuse.</p>

      <p>Elle ressemble encore à de la terre.</p>

      <p>Tu recules d’un pas.</p>

      <p>Il ne bouge plus.</p>
    `,
    choices: [
      { label: 'Fouiller le corps de Gaspard Vellin', to: 'c13' },
      { label: 'Continuer vers la grotte', to: 'c20' },
      { label: 'Partir vers la forêt', to: 'c14' }
    ]
  },

  c12: {
    number: 'PAGE 12',
    title: 'Une voix sous la terre',
    image: 'Une voix sous la terre',
    onEnter: s => {
      s.dexPenalty = Math.min(6, (s.dexPenalty || 0) + 1);
    },
    text: state => `
      <p>Tu maintiens son poignet.</p>

      <blockquote>« Gaspard ? »</blockquote>

      <p>Ses yeux bougent vers toi.</p>

      <blockquote>« Tu m’entends ? »</blockquote>

      <p>Ses lèvres tremblent.</p>

      <p>Pendant un instant, tu crois qu’il essaie réellement de répondre.</p>

      <p>Puis sa bouche s’ouvre brutalement.</p>

      <p>Un cri rauque et impossible s’en échappe.</p>

      <p>Avec lui, une gerbe de terre noire te frappe au visage.</p>

      <p>Tu lâches immédiatement son bras.</p>

      <p>La matière brûle ta peau.</p>

      <p>Tu fermes les yeux, mais trop tard.</p>

      <p>Des grains s’y sont glissés.</p>

      <p>La douleur est vive.</p>

      <p><strong>Ta Dextérité diminue de 1 point.</strong></p>

      <p>Lorsque tu parviens enfin à rouvrir les yeux, Gaspard ne bouge plus.</p>

      <p>Sa tête est retombée lourdement en arrière.</p>

      <p>Son crâne a heurté un rocher.</p>

      <p>Cette fois, tu sais qu’il est mort.</p>

      <p>Ou du moins…</p>

      <p>tu ne vois plus rien qui ressemble encore à de la vie.</p>

      ${damageResultHtml(state, 'c12')}
    `,
    choices: state => {
      if (!hasDamageRoll(state, 'c12')) {
        return [{ label: 'Lancer le dé de blessure', action: 'damage', damageKey: 'c12' }];
      }
      if (state.hp <= 0) return fatalChoices();
      return [
        { label: 'Fouiller le corps', to: 'c13' },
        { label: 'Continuer vers la grotte', to: 'c20' },
        { label: 'Partir vers la forêt', to: 'c14' }
      ];
    }
  },

  c13: {
    number: 'PAGE 13',
    title: 'Les affaires de Gaspard Vellin',
    image: 'Les affaires de Gaspard Vellin',
    onEnter: s => {
      if (!s.flags.gaspardFouille) {
        s.flags.gaspardFouille = true;
        s.goldCoins += 3;
        addItem(
          s,
          'potion_sombre',
          'Potion de guérison sombre',
          'Une potion de guérison dont le liquide paraît presque noir. Quelque chose semble parfois flotter à l’intérieur.'
        );
      }
    },
    text: `
      <p>Tu fouilles rapidement ses vêtements.</p>

      <p>Dans une bourse, tu trouves :</p>

      <p><strong>3 pièces d’or.</strong></p>

      <p>Puis ta main rencontre une petite bouteille dans la doublure de son manteau.</p>

      <p>Tu la retires.</p>

      <p>C’est une potion de guérison.</p>

      <p>Tu en as déjà vu auparavant.</p>

      <p>Mais quelque chose t’inquiète.</p>

      <p>Le liquide devrait être rouge clair.</p>

      <p>Celui-ci est presque noir.</p>

      <p>Lorsque tu inclines la fiole, quelque chose semble flotter à l’intérieur.</p>

      <p>Tu regardes de plus près.</p>

      <p>Plus rien.</p>

      <p>Peut-être simplement un dépôt.</p>

      <p>Tu ranges néanmoins la fiole.</p>
    `,
    choices: [
      { label: 'Continuer vers la grotte', to: 'c20' },
      { label: 'Suivre les traces vers la forêt', to: 'c14' }
    ]
  },

  c14: {
    number: 'PAGE 14',
    title: 'La forêt de Rochebrume',
    image: 'La forêt de Rochebrume',
    text: `
      <p>Tu suis les traces de bottes.</p>

      <p>Le sentier descend rapidement entre les arbres.</p>

      <p>Tu connais cette forêt.</p>

      <p>Ou du moins, tu croyais la connaître.</p>

      <p>Lorsque tu étais enfant, tu l’as traversée plusieurs fois pour rejoindre Rochebrume.</p>

      <p>Elle n’avait rien de remarquable.</p>

      <p>Des chênes.</p>

      <p>Des hêtres.</p>

      <p>Quelques chemins de chasse.</p>

      <p>Pourtant, ce soir, quelque chose ne correspond pas à ton souvenir.</p>

      <p>Les arbres paraissent trop proches les uns des autres.</p>

      <p>Leurs troncs poussent selon des angles étranges, comme s’ils s’étaient lentement courbés pour éviter quelque chose situé sous la terre.</p>

      <p>Certaines branches s’entrecroisent si étroitement au-dessus de toi qu’elles dissimulent presque entièrement le ciel.</p>

      <p>Même les distances semblent fausses.</p>

      <p>Un arbre que tu pensais à quelques pas demande une minute entière de marche pour être atteint.</p>

      <p>Puis tu entends un oiseau.</p>

      <p>Trois notes.</p>

      <p>Toujours les mêmes.</p>

      <p>Trois notes espacées exactement de la même manière.</p>

      <p>Encore.</p>

      <p>Encore.</p>

      <p>Encore.</p>

      <p>Tu t’arrêtes.</p>

      <p>Le chant continue.</p>

      <p>Mais tu réalises alors quelque chose qui te glace.</p>

      <p>Le son ne vient jamais du même endroit.</p>

      <p>Il se déplace autour de toi sans que rien ne vole entre les branches.</p>

      <p>Tu reprends ta marche.</p>

      <p>Tu ne regardes plus derrière toi.</p>

      <p>Quelques minutes plus tard, les premières maisons de Rochebrume apparaissent enfin.</p>

      <p>Et là encore…</p>

      <p>quelque chose ne va pas.</p>
    `,
    choices: [
      { label: 'Entrer dans Rochebrume', to: 'c15' }
    ]
  },

  c15: {
    number: 'PAGE 15',
    title: 'Rochebrume',
    image: 'Rochebrume',
    text: `
      <p>Le village est désert.</p>

      <p>Pas silencieux.</p>

      <p><strong>Désert.</strong></p>

      <p>Une porte est ouverte.</p>

      <p>Une brouette a été abandonnée au milieu de la rue.</p>

      <p>Du linge pend encore entre deux maisons.</p>

      <p>Sur une table, devant une habitation, une miche de pain a été laissée à moitié coupée.</p>

      <p>Comme si tous les habitants avaient simplement cessé ce qu’ils faisaient.</p>

      <p>Tu aperçois cependant deux signes de vie.</p>

      <p>La taverne de Gaspard Vellin est encore ouverte.</p>

      <p>Et plus loin, une personne se tient seule au milieu de la rue.</p>
    `,
    choices: [
      { label: 'Entrer dans la taverne de Gaspard', to: 'c16' },
      { label: 'Parler à la personne dans la rue', to: 'c19' }
    ]
  },

  c16: {
    number: 'PAGE 16',
    title: 'La taverne',
    image: 'La taverne de Rochebrume',
    text: `
      <p>Tu pousses la porte.</p>

      <p>Un jeune homme lève immédiatement les yeux.</p>

      <p>Tu le reconnais vaguement.</p>

      <p>C’est <strong>Élias</strong>, l’assistant de Gaspard.</p>

      <p>Il sourit en te voyant.</p>

      <blockquote>« Ah ! Tu viens de Valombre ? »</blockquote>

      <p>Il regarde derrière toi.</p>

      <blockquote>« Tu n’aurais pas croisé Gaspard par hasard ? »</blockquote>

      <p>Ton estomac se noue.</p>

      <blockquote>« Il devait rentrer hier soir. »</blockquote>

      <p>Il hausse les épaules avec un sourire gêné.</p>

      <blockquote>« Avec lui, ça ne veut pas forcément dire grand-chose. Quand il trouve quelqu’un avec qui boire, il oublie parfois jusqu’au chemin de sa propre maison. »</blockquote>
    `,
    choices: [
      { label: 'Lui annoncer que Gaspard est mort', to: 'c17' },
      { label: 'Ne rien lui dire', to: 'c18' }
    ]
  },

  c17: {
    number: 'PAGE 17',
    title: 'La nouvelle',
    image: 'La nouvelle',
    text: `
      <p>Tu lui expliques ce que tu as trouvé sur le chemin.</p>

      <p>À mesure que tu parles, le visage d’Élias se décompose.</p>

      <p>Il ne pose aucune question.</p>

      <p>Pas même sur la manière dont Gaspard est mort.</p>

      <p>Il s’assoit.</p>

      <p>Ses mains tremblent.</p>

      <blockquote>« Non… »</blockquote>

      <p>Puis plus bas :</p>

      <blockquote>« Pas lui aussi. »</blockquote>

      <p>Tu t’arrêtes.</p>

      <blockquote>« Lui aussi ? »</blockquote>

      <p>Élias relève brusquement les yeux.</p>

      <p>Pendant une fraction de seconde, tu crois voir autre chose que du chagrin.</p>

      <p>De la peur.</p>

      <blockquote>« Va-t’en. »</blockquote>

      <p>Tu hésites.</p>

      <blockquote>« Élias… »</blockquote>

      <blockquote>« S’il te plaît. Va-t’en. »</blockquote>

      <p>Il refuse désormais de répondre.</p>
    `,
    choices: [
      { label: 'Aller parler à la personne dans la rue', to: 'c19' },
      { label: 'Quitter Rochebrume et repartir vers la grotte', to: 'c20' }
    ]
  },

  c18: {
    number: 'PAGE 18',
    title: 'Les lames d’Élias',
    image: 'Les lames d’Élias',
    text: state => `
      <p>Tu ne lui dis rien.</p>

      <p>Élias soupire.</p>

      <blockquote>« Enfin… il reviendra bien. »</blockquote>

      <p>Son regard tombe sur ton épée.</p>

      <blockquote>« Tu vas vers la montagne ? »</blockquote>

      <p>Sans attendre ta réponse, il ouvre un tiroir sous le comptoir.</p>

      <p>Plusieurs petites lames sont soigneusement alignées à l’intérieur.</p>

      <blockquote>« Gaspard vend ça aux voyageurs. Ça ne tue pas grand-chose, mais lancé au visage, ça peut te donner quelques secondes. »</blockquote>

      <blockquote>« Une pièce d’or la lame. »</blockquote>

      <p><strong>Tu possèdes ${state.goldCoins} pièce${state.goldCoins > 1 ? 's' : ''} d’or.</strong></p>
    `,
    choices: state => {
      const list = [];
      const maxBuy = Math.min(3, state.goldCoins);

      for (let qty = 1; qty <= maxBuy; qty++) {
        list.push({
          label: `Acheter ${qty} lame${qty > 1 ? 's' : ''} de jet — ${qty} pièce${qty > 1 ? 's' : ''} d’or`,
          to: 'c43',
          effect: s => {
            s.goldCoins -= qty;
            s.throwingBlades += qty;
            syncThrowingBlades(s);
          }
        });
      }

      list.push(
        { label: 'Ne rien acheter et retourner dans la rue', to: 'c15' },
        { label: 'Ne rien acheter et repartir vers la grotte', to: 'c20' }
      );

      return list;
    }
  },

  c19: {
    number: 'PAGE 19',
    title: 'L’étranger',
    image: 'L’étranger de Rochebrume',
    text: `
      <p>La personne se tient toujours au milieu de la rue.</p>

      <p>En t’approchant, tu éprouves immédiatement une sensation étrange.</p>

      <p>Tu connais cet homme.</p>

      <p>Tu en es presque certain.</p>

      <p>Pourtant, impossible de te souvenir d’où.</p>

      <p>Son visage ne possède rien de remarquable.</p>

      <p>Une quarantaine d’années.</p>

      <p>Des cheveux sombres.</p>

      <p>Une barbe de quelques jours.</p>

      <p>Un manteau poussiéreux.</p>

      <p>Et pourtant chaque fois que tu détournes légèrement les yeux, tu es incapable de te rappeler précisément ses traits.</p>

      <p>Lui te regarde avec méfiance.</p>

      <p>Tu lui demandes où sont passés les habitants.</p>

      <p>Il hausse les épaules.</p>

      <blockquote>« Je n’en sais rien. »</blockquote>

      <p>Puis il observe les maisons.</p>

      <blockquote>« Ça a commencé il y a quelques jours. »</blockquote>

      <blockquote>« Les gens partent. Un par un. »</blockquote>

      <p>Tu lui demandes pourquoi.</p>

      <blockquote>« Certains disent qu’ils vont voir de la famille. D’autres ne disent rien du tout. »</blockquote>

      <p>Il hésite.</p>

      <blockquote>« Le plus étrange, c’est que personne ne semble vraiment s’en inquiéter. »</blockquote>

      <p>Tu regardes autour de toi.</p>

      <blockquote>« Et toi ? »</blockquote>

      <p>Il sourit faiblement.</p>

      <blockquote>« Moi ? Je ne suis que de passage. »</blockquote>

      <p>Puis son sourire disparaît.</p>

      <blockquote>« Mais je crois que je vais repartir plus tôt que prévu. »</blockquote>

      <p>Tu observes encore son visage.</p>

      <p>Cette impression de déjà-vu ne disparaît pas.</p>

      <p>Au contraire.</p>

      <p>Elle devient presque douloureuse.</p>

      <p>Comme un souvenir que ton esprit refuse obstinément de laisser remonter.</p>

      <p>L’homme te salue et s’éloigne.</p>

      <p>Tu le regardes tourner au coin d’une maison.</p>

      <p>Une seconde plus tard, tu avances jusqu’au croisement.</p>

      <p>Il n’y a personne.</p>

      <p>Seulement la route vide.</p>
    `,    choices: [
      { label: 'Entrer dans la taverne de Gaspard avant de repartir', to: 'c16' },
      { label: 'Repartir vers la grotte', to: 'c20' }
    ]
  },

  c20: {
    number: 'PAGE 20',
    title: 'L’entrée de la grotte',
    image: 'L’entrée de la grotte',
    text: state => `
      <p>Tu reprends l’ascension.</p>

      <p>Le chemin devient rapidement escarpé, pierreux, difficile d’accès. Par endroits, il faut presque t’aider des mains pour progresser.</p>

      <p>Le vent semble s’éteindre à mesure que tu montes, comme si même l’air hésitait à venir jusque-là.</p>

      <p>Enfin, la roche s’ouvre devant toi.</p>

      <p>Tu es arrivé à l’entrée de la grotte.</p>

      <p>Tu t’y engages avec prudence. Après quelques pas à peine, deux chemins s’offrent à toi.</p>

      <p>L’un <strong>descend</strong> dans l’obscurité, et de ce passage monte une <strong>forte odeur de soufre</strong>.</p>

      <p>L’autre continue tout droit et semble s’enfoncer dans un passage beaucoup plus étroit.</p>

    `,
    choices: [
      { label: 'Descendre dans le passage où l’odeur de soufre est la plus forte', to: 'c21' },
      { label: 'Prendre le passage étroit qui continue tout droit', to: 'c22' }
    ]
  },

  c21: {
    number: 'PAGE 21',
    title: 'Le souffle acide',
    image: 'Le souffle acide',
    text: `
      <p>Tu t’enfonces dans le passage qui descend.</p>

      <p>Très vite, l’odeur de soufre augmente. Elle te pique le nez, puis la gorge, puis les yeux.</p>

      <p>L’air devient épais. Presque liquide.</p>

      <p>Tu poursuis malgré tout, jusqu’à te retrouver dans une cavité fermée.</p>

      <p>Un cul-de-sac.</p>

      <p>Tu comprends aussitôt ton erreur et fais demi-tour, mais il est déjà trop tard.</p>

      <p>L’air acide a commencé son travail.</p>

      <p>Il te brûle les yeux. Il te ronge la gorge. Chaque inspiration paraît t’arracher quelque chose à l’intérieur de la poitrine.</p>

      <p>Tu tentes de remonter tant bien que mal.</p>

      <p>Mais la force te quitte peu à peu.</p>

      <p>Tu tombes à genoux.</p>

      <p>Puis sur les mains.</p>

      <p>Puis plus rien.</p>

      <p>Personne ne sait où tu es allé.</p>

      <p>Personne ne viendra te chercher.</p>
    `,    choices: [
      { label: 'Reprendre à la sortie du village', action: 'checkpoint' },
      { label: 'Recommencer depuis le début', action: 'restart' }
    ]
  },

  c22: {
    number: 'PAGE 22',
    title: 'La salle aux ombres mouvantes',
    image: 'La salle aux ombres mouvantes',
    text: `
      <p>Tu choisis l’autre passage.</p>

      <p>Tu avances dans un couloir de plus en plus étroit, au point que la roche semble vouloir se refermer sur toi.</p>

      <p>Puis, soudain, l’espace s’ouvre.</p>

      <p>Tu débouches dans une grande pièce sombre, creusée à même la pierre.</p>

      <p>La faible lumière venue de derrière toi n’éclaire la salle qu’à peine. Elle s’épuise avant d’atteindre le fond, et les ombres paraissent s’y mouvoir d’elles-mêmes.</p>

      <p>Tu as l’impression que les murs respirent, ou qu’ils ondulent faiblement, comme si la roche n’était pas tout à fait immobile.</p>

      <p>Tu avances encore de quelques pas dans la pénombre.</p>

      <p>C’est alors qu’un <strong>grondement</strong> retentit sur le côté.</p>
    `,
    choices: [
      { label: 'Retourner en arrière en courant', to: 'c23' },
      { label: 'Attaquer la source du grondement', to: 'c24' }
    ]
  },

  c23: {
    number: 'PAGE 23',
    title: 'La fuite',
    image: 'La fuite',
    text: `
      <p>Tu fais demi-tour et détales sans réfléchir.</p>

      <p>Derrière toi, tu sens aussitôt une présence qui te poursuit. Tu n’oses pas te retourner.</p>

      <p>Tu cours de plus en plus vite, trébuchant presque dans le passage étroit, jusqu’à surgir dehors dans l’air glacé de la montagne.</p>

      <p>Là seulement tu t’effondres.</p>

      <p>La peur te fait trembler les jambes pendant de longues heures. Tu restes incapable de repartir.</p>

      <p>À la tombée de la nuit, tes forces reviennent un peu… mais quelque chose en toi s’est déjà brisé.</p>

      <p>Tu te mets à parler à voix basse de monstres, de soufre, d’ombres qui bougent.</p>

      <p>Tu vois des mouvements partout. Tu contrôles mal ton corps. La peur ne te quitte plus.</p>

      <p>Finalement, tu redescends jusqu’au village, te caches dans l’écurie et attends que le temps passe… en espérant que la mort finira par tout faire taire.</p>
    `,    choices: [
      { label: 'Reprendre à la sortie du village', action: 'checkpoint' },
      { label: 'Recommencer depuis le début', action: 'restart' }
    ]
  },

  c24: {
    number: 'PAGE 24',
    title: 'Le grondement dans l’ombre',
    image: 'Le grondement dans l’ombre',
    text: state => `
      <p>Tu te tournes vers le grondement, l’épée prête.</p>
      <p>Quelque chose bouge dans l’obscurité.</p>
      <p>Quelque chose de massif, de mal défini.</p>
      ${state.throwingBlades > 0
        ? `<p>Tu possèdes encore <strong>${state.throwingBlades} lame${state.throwingBlades > 1 ? 's' : ''} de jet</strong>.</p>`
        : '<p>Tu n’as rien d’autre que ton épée.</p>'}
    `,
    choices: state => {
      const list = [];
      if (state.throwingBlades > 0) {
        list.push({
          label: 'Lancer une lame dans l’ombre',
          to: 'c25',
          effect: s => {
            s.throwingBlades -= 1;
            syncThrowingBlades(s);
            s.lastCombatOutcome = roll3D6(s, 'Dextérité', currentDexterity(s))
              ? 'blade_kill' : 'blade_fail';
          }
        });
      }
      list.push({ label: 'Te jeter en avant, l’épée levée', to: 'c26' });
      return list;
    }
  },

  c25: {
    number: 'PAGE 25',
    title: 'La lame de jet',
    image: 'La lame de jet',
    text: state => {
      const r = diceResultHtml(state);
      if (state.lastCombatOutcome === 'blade_kill') {
        return r + `
          <p>La lame disparaît dans l’ombre.</p>
          <p>Un choc sourd. Puis un corps massif s’effondre.</p>
          <p>Tu refuses de t’approcher davantage.</p>
        `;
      }
      return r + `
        <p>La lame frappe quelque chose sans l’abattre.</p>
        <p>Le grondement devient un hurlement.</p>
        <p>La masse bondit vers toi.</p>
      `;
    },
    choices: state => state.lastCombatOutcome === 'blade_kill'
      ? [{ label: 'Continuer plus loin dans la grotte', to: 'c28' }]
      : [{ label: 'Lever ton épée et combattre', to: 'c26' }]
  },

  c26: {
    number: 'PAGE 26',
    title: 'Le choc',
    image: 'Le choc',
    text: `
      <p>La masse se jette sur toi.</p>
      <p>Tu frappes.</p>
    `,
    choices: [{
      label: 'Lancer les trois dés',
      to: 'c27',
      effect: s => {
        const hit = roll3D6(s, 'Dextérité', currentDexterity(s));
        if (!hit) {
          s.lastCombatOutcome = 'miss';
        } else if (combatPower(s) >= 8) {
          s.lastCombatOutcome = 'one_hit';
        } else {
          s.lastCombatOutcome = 'needs_second_round';
        }
      }
    }]
  },

  c27: {
    number: 'PAGE 27',
    title: 'Le résultat du combat',
    image: 'Le résultat du combat',
    text: state => {
      const r = diceResultHtml(state);
      if (state.lastCombatOutcome === 'one_hit') {
        return r + `<p>Ton coup porte. La puissance de ton arme suffit : la masse s’effondre.</p>`;
      }
      if (state.lastCombatOutcome === 'needs_second_round') {
        return r + `<p>Ton coup porte, mais ne suffit pas à l’abattre. La créature se redresse.</p>`;
      }
      return r + `
        <p>Tu rates ton attaque. La créature t’atteint.</p>
        ${damageResultHtml(state, 'c27')}
      `;
    },
    choices: state => {
      if (state.lastCombatOutcome === 'one_hit') return [{ label: 'Continuer', to: 'c28' }];
      if (state.lastCombatOutcome === 'needs_second_round') return [{ label: 'Reprendre le combat', to: 'c29' }];
      if (!hasDamageRoll(state, 'c27')) {
        return [{ label: 'Lancer le dé de blessure', action: 'damage', damageKey: 'c27' }];
      }
      if (state.hp <= 0) return fatalChoices();
      return [{ label: 'Reprendre le combat', to: 'c29' }];
    }
  },

  c28: {
    number: 'PAGE 28',
    title: 'Le camp sous la roche',
    image: 'Le camp sous la roche',
    onEnter: s => setCheckpoint(s, 'Le camp sous la roche'),
    text: `
      <p>Tu quittes enfin la salle du combat.</p>

      <p>Le passage descend en longues courbes entre des parois humides. À plusieurs reprises, tu crois entendre des pas derrière toi, mais chaque fois que tu t’arrêtes, le silence revient.</p>

      <p>Après quelques minutes, une faible lumière orangée apparaît entre les rochers.</p>

      <p>Tu débouches dans une cavité plus large. Un feu presque éteint brûle entre trois pierres noircies. Près de lui, un homme est adossé à la paroi.</p>

      <p>Sa barbe est longue, ses vêtements déchirés. Une de ses jambes est enveloppée de bandages raidis par le sang.</p>

      <p>Lorsqu’il te voit, il lève brusquement une main devant son visage.</p>

      <blockquote>« Non… pas encore. »</blockquote>

      <p>Puis il te fixe plus attentivement.</p>

      <blockquote>« Tu es réel ? »</blockquote>

      <p>Il dit s’appeler <strong>Anselme Varn</strong>.</p>

      <p>Tu lui demandes depuis combien de temps il se trouve ici.</p>

      <blockquote>« Deux jours… peut-être trois. »</blockquote>

      <p>Il baisse les yeux vers ses mains.</p>

      <blockquote>« Non… des mois. »</blockquote>

      <p>Son regard se perd un instant dans le feu.</p>

      <blockquote>« Ce n’est pas une grotte. Pas vraiment. »</blockquote>

      <blockquote>« Ceux qui disparaissent… personne ne les enlève. Ils viennent ici. »</blockquote>

      <blockquote>« La terre noire… ne la laisse pas entrer en toi. »</blockquote>

      <p>Il se penche soudain et serre ton poignet.</p>

      <blockquote>« Et si tu entends Aldren… assure-toi d’abord que c’est bien lui. »</blockquote>

      <p>Puis son visage se fige.</p>

      <p>Il regarde derrière toi.</p>

      <blockquote>« Tu l’as amené avec toi. »</blockquote>

      <p>Tu te retournes.</p>

      <p>Il n’y a personne.</p>

      <p>Lorsque tu fais de nouveau face à Anselme, il marmonne déjà pour lui-même.</p>

      <p>La cavité se prolonge dans plusieurs directions. À quelques mètres du feu, tu distingues les restes d’un <strong>ancien campement</strong>. Sur la droite, une galerie est presque entièrement <strong>barrée par un énorme bloc de pierre</strong>. Plus loin, un <strong>tunnel étroit</strong> s’enfonce dans l’obscurité.</p>
    `,
    choices: state => {
      const list = [
        { label: 'Examiner le vieux campement', to: 'c30' }
      ];

      if (!state.flags.galleryAttempted) {
        list.push({ label: 'Explorer la galerie bloquée par une pierre', to: 'c31' });
      }

      list.push(
        { label: 'Aller dans le tunnel voisin', to: 'c34' },
        { label: 'Quitter le camp et poursuivre la descente', to: 'c37' }
      );

      return list;
    }
  },

  c29: {
    number: 'PAGE 29',
    title: 'Le deuxième échange',
    image: 'Le deuxième échange',
    text: `
      <p>La créature a encaissé ton premier coup.</p>

      <p>Elle recule d’un pas, heurte la paroi, puis revient immédiatement sur toi.</p>

      <p>Tu n’as plus l’espace nécessaire pour esquiver longtemps. Le prochain échange se fera presque au corps à corps.</p>
    `,
    choices: [{
      label: 'Lancer les trois dés',
      to: 'c33',
      effect: s => {
        if (roll3D6(s, 'Dextérité', currentDexterity(s))) {
          s.lastCombatOutcome = 'second_round_win';
        } else {
          s.lastCombatOutcome = 'second_round_wounded_win';
        }
      }
    }]
  },

  c30: {
    number: 'PAGE 30',
    title: 'Le journal d’Anselme',
    image: 'Le journal d’Anselme',
    text: `
      <p>Tu laisses Anselme près du feu et t’approches de l’ancien campement.</p>

      <p>Il semble abandonné depuis bien plus longtemps. Une couverture moisie s’est presque soudée au sol. Une tasse de métal repose près d’un cercle de cendres froides.</p>

      <p>Sous la tasse, tu découvres un petit carnet protégé par une couverture de cuir.</p>

      <p>Les premières pages sont datées.</p>

      <blockquote>Troisième jour. J’ai encore entendu ma femme cette nuit.</blockquote>

      <p>Plus loin :</p>

      <blockquote>Septième jour. Elle est morte depuis onze ans.</blockquote>

      <p>À partir de là, les dates disparaissent.</p>

      <p>Les phrases deviennent courtes, nerveuses. Certaines pages ne contiennent qu’un même mot répété jusqu’au bord du papier.</p>

      <p>La dernière ligne est écrite d’une main tremblante :</p>

      <blockquote>J’entends quelqu’un arriver. Peut-être enfin un autre vivant.</blockquote>

      <p>Sur la couverture intérieure, tu lis un nom.</p>

      <p><strong>ANSELME VARN.</strong></p>

      <p>Tu regardes vers l’homme assis près du feu.</p>

      <p>Il t’a pourtant affirmé être entré dans cette grotte il y a deux ou trois jours.</p>
    `,
    choices: state => {
      const list = [{ label: 'Continuer vers les profondeurs', to: 'c37' }];

      if (!state.flags.galleryAttempted) {
        list.push({ label: 'Explorer la galerie bloquée', to: 'c31' });
      }

      list.push({ label: 'Aller dans le tunnel voisin', to: 'c34' });
      return list;
    }
  },

  c31: {
    number: 'PAGE 31',
    title: 'La galerie condamnée',
    image: 'La galerie condamnée',
    text: state => `
      <p>Tu t’engages dans la galerie de droite.</p>

      <p>Elle ne va pas loin. Après une vingtaine de pas, un bloc de pierre énorme bouche presque entièrement le passage.</p>

      <p>Une fente sombre subsiste sur le côté. Elle est trop étroite pour ton corps, mais suffisamment large pour laisser passer un courant d’air froid.</p>

      <p>En examinant la pierre, tu remarques qu’elle repose dans une sorte de logement circulaire. Avec assez de force, il est peut-être possible de la faire pivoter une fois.</p>

      <p><strong>Ta Force : ${currentForce(state)}</strong></p>
    `,
    choices: [
      {
        label: 'Tenter de déplacer le bloc — lancer les trois dés',
        to: 'c32',
        effect: s => {
          s.flags.galleryAttempted = true;
          s.lastCombatOutcome = roll3D6(s, 'Force', currentForce(s))
            ? 'force_success'
            : 'force_fail';
        }
      },
      { label: 'Ne pas prendre le risque et revenir au camp', to: 'c28' }
    ]
  },

  c32: {
    number: 'PAGE 32',
    title: 'La pierre',
    image: 'La pierre',
    onEnter: s => {
      if (s.lastCombatOutcome === 'force_success' && !s.flags.brassardPris) {
        s.flags.brassardPris = true;
        s.forceBonus += 1;
        addItem(
          s,
          'brassard_veilleurs',
          'Brassard des Veilleurs',
          'Un brassard sombre étonnamment léger une fois porté. +1 Force.'
        );
      }
    },
    text: state => {
      const r = diceResultHtml(state);

      if (state.lastCombatOutcome === 'force_success') {
        return r + `
          <p>Tu cales ton épaule contre la pierre et pousses de toutes tes forces.</p>

          <p>Elle résiste longtemps.</p>

          <p>Puis un grondement profond traverse la galerie.</p>

          <p>Le bloc pivote de quelques dizaines de centimètres et libère juste assez d’espace pour te glisser de l’autre côté.</p>

          <p>La petite chambre derrière lui est sèche et parfaitement silencieuse.</p>

          <p>Un squelette est assis contre le mur. Autour de son avant-bras repose un brassard de métal sombre.</p>

          <p>Lorsque tu le prends, il paraît incroyablement lourd.</p>

          <p>Une fois passé autour de ton bras, son poids disparaît presque totalement.</p>

          <p><strong>Brassard des Veilleurs : +1 Force.</strong></p>
        `;
      }

      return r + `
        <p>Tu prends appui contre la paroi et pousses jusqu’à sentir tes muscles trembler.</p>

        <p>La pierre bouge à peine.</p>

        <p>Un craquement sec retentit alors dans son logement. Le bloc s’affaisse de quelques centimètres et se coince définitivement contre la roche.</p>

        <p>Tu essaies encore de trouver une prise, mais il n’y en a plus.</p>

        <p>Cette galerie ne s’ouvrira pas pour toi.</p>
      `;
    },
    choices: [
      { label: 'Revenir au camp d’Anselme', to: 'c28' },
      { label: 'Poursuivre vers les profondeurs', to: 'c37' }
    ]
  },

  c33: {
    number: 'PAGE 33',
    title: 'La fin du combat',
    image: 'La fin du combat',
    text: state => {
      const r = diceResultHtml(state);

      if (state.lastCombatOutcome === 'second_round_win') {
        return r + `
          <p>Cette fois, tu anticipes son mouvement.</p>

          <p>Au moment où la masse se jette sur toi, tu te décales et frappes de toutes tes forces.</p>

          <p>La lame s’enfonce profondément.</p>

          <p>La créature se raidit, puis s’effondre contre la pierre.</p>

          <p>Dans sa chute, son bras passe dans la faible lumière.</p>

          <p>Sous la terre noire et la peau déformée, tu crois distinguer une manche de chemise.</p>

          <p>Quelque chose de parfaitement humain.</p>

          <p>Tu détournes les yeux avant d’en voir davantage.</p>
        `;
      }

      return r + `
        <p>Tu réagis une fraction de seconde trop tard.</p>

        <p>La créature te percute et une douleur vive traverse ton épaule.</p>

        <p>Vous tombez tous les deux contre la paroi.</p>

        <p>Pendant quelques secondes, il n’y a plus ni technique ni distance : seulement son poids contre toi, son souffle humide, et ta main qui cherche désespérément la garde de ton arme.</p>

        <p>Tu parviens finalement à libérer ton bras.</p>

        <p>Tu frappes presque au hasard.</p>

        <p>Une fois.</p>

        <p>Puis une seconde.</p>

        <p>La masse cesse enfin de bouger.</p>

        <p>Lorsque tu recules, haletant, tu aperçois sous la terre noire un morceau de vêtement qui ressemble terriblement à une chemise humaine.</p>

        <p>Tu viens de gagner.</p>

        <p>Mais tu n’es plus certain d’avoir combattu un monstre.</p>

        ${damageResultHtml(state, 'c33')}
      `;
    },
    choices: state => {
      if (state.lastCombatOutcome !== 'second_round_wounded_win') {
        return [{ label: 'Quitter la salle et poursuivre dans la grotte', to: 'c28' }];
      }
      if (!hasDamageRoll(state, 'c33')) {
        return [{ label: 'Lancer le dé de blessure', action: 'damage', damageKey: 'c33' }];
      }
      if (state.hp <= 0) return fatalChoices();
      return [{ label: 'Quitter la salle et poursuivre dans la grotte', to: 'c28' }];
    }
  },

  c34: {
    number: 'PAGE 34',
    title: 'Le tunnel voisin',
    image: 'Le tunnel voisin',
    text: `
      <p>Tu laisses la lumière du feu derrière toi et t’engages dans le tunnel voisin.</p>

      <p>Le passage descend doucement. La roche y est plus sombre et le sol couvert d’une fine poussière grise qui étouffe presque le bruit de tes pas.</p>

      <p>Tu avances prudemment.</p>

      <p>Après quelques dizaines de mètres, un son très faible te parvient.</p>

      <p>Des sanglots.</p>

      <p>Ils sont lointains au début, à peine perceptibles.</p>

      <p>Mais plus tu avances, plus ils deviennent distincts.</p>

      <p>Quelqu’un pleure dans l’obscurité.</p>

      <p>Le tunnel tourne une dernière fois.</p>

      <p>Tu tombes finalement sur une silhouette recroquevillée contre la roche.</p>

      <p>Elle porte encore ce qui ressemble à des vêtements humains.</p>

      <blockquote>« Ne me regarde pas… »</blockquote>

      <p>Sa voix est faible, presque brisée.</p>

      <blockquote>« S’il te plaît. Ne me regarde pas. »</blockquote>
    `,
    choices: [
      { label: 'Lui parler sans t’approcher', to: 'c35' },
      { label: 'T’approcher pour essayer de l’aider', to: 'c36' },
      { label: 'Reculer lentement et repartir', to: 'c37' }
    ]
  },

  c35: {
    number: 'PAGE 35',
    title: 'Une voix humaine',
    image: 'Une voix humaine',
    text: `
      <p>Tu restes à plusieurs pas de la silhouette.</p>

      <blockquote>« Je ne vais pas te faire de mal. »</blockquote>

      <p>Les sanglots cessent.</p>

      <p>Un long silence suit.</p>

      <blockquote>« Rochebrume… »</blockquote>

      <p>Tu lui demandes si elle vient du village.</p>

      <p>La silhouette redresse légèrement la tête, sans jamais te montrer complètement son visage.</p>

      <blockquote>« Ils ont dit que ma fille m’appelait. »</blockquote>

      <p>Ses doigts se crispent contre la pierre.</p>

      <blockquote>« Je l’ai suivie jusque-là. »</blockquote>

      <p>Sa respiration devient irrégulière.</p>

      <blockquote>« Je n’ai pas de fille. »</blockquote>

      <p>Un rire étouffé lui échappe.</p>

      <p>Ou peut-être recommence-t-elle simplement à pleurer.</p>

      <p>Tu recules sans la quitter des yeux, puis reprends le tunnel en sens inverse.</p>

      <p>Lorsque tu retrouves la galerie principale, les sanglots continuent encore derrière toi.</p>
    `,
    choices: [
      { label: 'Poursuivre vers les profondeurs', to: 'c37' }
    ]
  },

  c36: {
    number: 'PAGE 36',
    title: 'Sous la terre noire',
    image: 'Sous la terre noire',
    text: `
      <p>Tu avances lentement, les mains bien visibles.</p>

      <blockquote>« Je veux seulement t’aider. »</blockquote>

      <p>La silhouette cesse de respirer pendant une seconde.</p>

      <p>Puis elle se retourne d’un seul mouvement.</p>

      <p>Elle bondit.</p>

      <p>Tu n’as qu’un instant pour distinguer un visage couvert de plaques sombres, des yeux injectés de sang et une bouche déformée par la terre noire.</p>

      <p>Mais sous toute cette saleté, il y a autre chose.</p>

      <p>Un morceau de tissu bleu.</p>

      <p>Sur la poitrine, un petit écusson.</p>

      <p><strong>ROCHEBRUME.</strong></p>

      <p>Humain ou non, tu dois réagir.</p>
    `,
    choices: [{
      label: 'Lancer les trois dés',
      to: 'c38',
      effect: s => {
        const hit = roll3D6(s, 'Dextérité', currentDexterity(s));

        if (!hit) {
          s.lastCombatOutcome = 'crying_wounded_win';
        } else if (combatPower(s) >= 5) {
          s.lastCombatOutcome = 'crying_kill';
        } else {
          s.lastCombatOutcome = 'crying_wound';
        }
      }
    }]
  },

  c37: {
    number: 'PAGE 37',
    title: 'Toujours plus bas',
    image: 'Toujours plus bas',
    text: `
      <p>Tu quittes finalement les galeries proches du camp.</p>

      <p>Le chemin descend désormais sans interruption.</p>

      <p>Par endroits, les murs portent encore des traces d’outils : entailles régulières, anciennes niches pour des torches, marches grossièrement taillées.</p>

      <p>Puis ces marques disparaissent.</p>

      <p>La roche devient lisse.</p>

      <p>Presque trop lisse.</p>

      <p>Tu marches longtemps sans savoir combien de temps s’écoule. Une demi-heure peut-être. Davantage.</p>

      <p>Le tunnel se resserre peu à peu jusqu’à t’obliger à avancer de profil.</p>

      <p>Ton épaule frotte contre la pierre. Ton souffle te revient au visage.</p>

      <p>Devant toi, pourtant, un courant d’air froid commence à se faire sentir.</p>

      <p>Encore quelques pas.</p>

      <p>La fissure s’élargit.</p>

      <p>Tu avances.</p>

      <p>Et le monde s’ouvre devant toi.</p>
    `,
    choices: [
      { label: 'Sortir de la fissure', to: 'c40' }
    ]
  },

  c38: {
    number: 'PAGE 38',
    title: 'Ce qui restait de lui',
    image: 'Ce qui restait de lui',
    text: state => {
      const r = diceResultHtml(state);

      if (state.lastCombatOutcome === 'crying_kill') {
        return r + `
          <p>Tu te décales au dernier moment et ton coup l’atteint avant qu’il puisse refermer ses mains sur toi.</p>

          <p>La silhouette s’effondre lourdement.</p>

          <p>Pendant quelques secondes, tu restes immobile, l’arme levée.</p>

          <p>Elle ne bouge plus.</p>

          <p>Sous les plaques de terre noire, tu distingues encore un visage humain.</p>

          <p>Tu préfères ne pas chercher à savoir depuis combien de temps il ne l’était plus tout à fait.</p>
        `;
      }

      if (state.lastCombatOutcome === 'crying_wound') {
        return r + `
          <p>Ton coup porte, mais ton arme manque de puissance pour l’abattre immédiatement.</p>

          <p>La silhouette hurle et recule en titubant.</p>

          <p>Pendant une seconde, tu crois qu’elle va revenir sur toi.</p>

          <p>Au lieu de cela, elle se retourne et s’enfuit à quatre pattes dans une fissure latérale.</p>

          <p>Tu l’entends encore quelques instants racler la pierre, puis plus rien.</p>

          <p>Au sol reste un lambeau de tissu bleu portant l’écusson de Rochebrume.</p>
        `;
      }

      return r + `
        <p>Tu réagis trop tard.</p>

        <p>La silhouette te percute et ses ongles labourent ton bras.</p>

        <p>Vous tombez ensemble dans la poussière.</p>

        <p>Son visage est maintenant à quelques centimètres du tien.</p>

        <p>Derrière la terre noire, tu aperçois une expression qui ressemble moins à de la rage qu’à de la terreur.</p>

        <p>Tu réussis enfin à dégager ton arme.</p>

        <p>Tu frappes à bout portant.</p>

        <p>Le corps se contracte puis retombe contre toi.</p>

        <p>Tu le repousses lentement.</p>

        <p>Il est mort.</p>

        <p>Sur sa poitrine, l’écusson de Rochebrume est maintenant parfaitement visible.</p>

        ${damageResultHtml(state, 'c38')}
      `;
    },
    choices: state => {
      if (state.lastCombatOutcome !== 'crying_wounded_win') {
        return [{ label: 'Reprendre ton souffle et poursuivre', to: 'c37' }];
      }
      if (!hasDamageRoll(state, 'c38')) {
        return [{ label: 'Lancer le dé de blessure', action: 'damage', damageKey: 'c38' }];
      }
      if (state.hp <= 0) return fatalChoices();
      return [{ label: 'Reprendre ton souffle et poursuivre', to: 'c37' }];
    }
  },

  c39: {
    number: 'PAGE 39',
    title: 'La corniche',
    image: 'La corniche',
    text: state => {
      if (hasItem(state, 'lame_noire')) {
        return `
          <p>Tu retrouves la corniche suspendue au-dessus du gouffre.</p>

          <p>Le vide s’étend à ta gauche, noyé dans une brume bleuâtre.</p>

          <p>Tu passes devant l’anfractuosité où reposait la petite lame noire.</p>

          <p>La niche est vide.</p>

          <p>Plus loin, la corniche rejoint les premières pierres d’un pont ancien.</p>
        `;
      }

      return `
        <p>Tu t’engages sur une corniche étroite qui longe la falaise.</p>

        <p>À ta gauche, le vide descend si profondément que la brume finit par en masquer le fond.</p>

        <p>Tu avances lentement, une main contre la roche.</p>

        <p>Après plusieurs dizaines de mètres, quelque chose attire ton regard dans une petite anfractuosité.</p>

        <p>Une dague.</p>

        <p>Elle repose seule sur la pierre, comme si quelqu’un venait de la déposer.</p>

        <p>Son métal est parfaitement noir.</p>

        <p>Pas sombre. Pas terni.</p>

        <p>Noir au point de sembler absorber la faible lumière qui l’entoure.</p>

        <p>Tu ne ressens pourtant ni chaleur, ni froid, ni vibration.</p>

        <p>Rien qui ressemble à de la magie.</p>
      `;
    },
    choices: state => {
      if (hasItem(state, 'lame_noire')) {
        return [{ label: 'Continuer vers le pont', to: 'c46' }];
      }

      return [
        {
          label: 'Prendre la lame noire et l’équiper',
          to: 'c46',
          effect: s => {
            s.flags.blackBladeFound = true;
            addItem(
              s,
              'lame_noire',
              'Lame noire',
              'Une petite dague d’un métal noir, presque sans reflet. Son effet reste inconnu.'
            );
            s.weapon = 'black_blade';
          }
        },
        {
          label: 'Prendre la lame noire et garder ton arme actuelle',
          to: 'c46',
          effect: s => {
            s.flags.blackBladeFound = true;
            addItem(
              s,
              'lame_noire',
              'Lame noire',
              'Une petite dague d’un métal noir, presque sans reflet. Son effet reste inconnu.'
            );
          }
        }
      ];
    }
  },

  c40: {
    number: 'PAGE 40',
    title: 'Le monde sous la montagne',
    image: 'Le monde sous la montagne',
    onEnter: s => setCheckpoint(s, 'Le monde sous la montagne'),
    text: `
      <p>Tu sors de la fissure.</p>

      <p>Et tu t’arrêtes aussitôt.</p>

      <p>Devant toi s’ouvre un espace si vaste que ton esprit refuse d’abord de lui donner une forme.</p>

      <p>Tu avais cru atteindre une grande caverne.</p>

      <p>Ce n’est pas une caverne.</p>

      <p>Le plafond disparaît dans une brume lumineuse, peut-être à plusieurs kilomètres au-dessus de toi.</p>

      <p>Une clarté blanc-bleu baigne le paysage sans que tu puisses en identifier la source.</p>

      <p>Pas de torches.</p>

      <p>Pas de soleil.</p>

      <p>Très loin en contrebas, des masses rocheuses émergent de la brume comme des chaînes de montagnes.</p>

      <p>Tu te retournes.</p>

      <p>La fissure dont tu viens de sortir n’est plus qu’une fente minuscule dans une falaise gigantesque.</p>

      <p>La montagne de Valombre ne pourrait pas contenir cet endroit.</p>

      <p>Cette certitude est presque rassurante tant elle est simple.</p>

      <p>Soit le soufre, la fatigue ou la peur ont fini par briser quelque chose dans ton esprit.</p>

      <p>Soit ce lieu est réel.</p>

      <p>Et cette seconde possibilité te paraît soudain bien pire.</p>

      <p>Trois voies s’enfoncent dans ce monde impossible : un sentier vers un lac parfaitement noir, un escalier monumental taillé dans la falaise, et une corniche qui disparaît derrière un éperon rocheux.</p>
    `,
    choices: state => [
      { label: 'Descendre vers le lac noir', to: 'c41' },
      { label: 'Prendre les marches gigantesques', to: 'c44' },
      {
        label: hasItem(state, 'lame_noire')
          ? 'Reprendre la corniche vers le pont'
          : 'Longer la corniche',
        to: hasItem(state, 'lame_noire') ? 'c46' : 'c39'
      }
    ]
  },

  c41: {
    number: 'PAGE 41',
    title: 'Le lac noir',
    image: 'Le lac noir',
    text: `
      <p>Le sentier descend longtemps en lacets.</p>

      <p>À mesure que tu approches du fond, l’air devient plus froid et la lumière plus diffuse.</p>

      <p>Tu finis par atteindre une rive de pierre parfaitement lisse.</p>

      <p>Le lac s’étend devant toi jusqu’à disparaître dans la brume.</p>

      <p>Son eau est si noire qu’elle ne reflète presque rien.</p>

      <p>Une vieille embarcation est attachée à un anneau de pierre.</p>

      <p>Le bois paraît gonflé par l’humidité mais encore solide.</p>

      <p>Tu détaches la corde et pousses la barque sur l’eau.</p>

      <p>Pendant plusieurs minutes, seul le bruit régulier des rames trouble le silence.</p>

      <p>Puis trois coups résonnent sous la coque.</p>

      <p><strong>TOC.</strong></p>

      <p><strong>TOC.</strong></p>

      <p><strong>TOC.</strong></p>

      <p>Tu te figes.</p>

      <p>Ce rythme.</p>

      <p>Les trois mêmes temps que le chant impossible entendu dans la forêt de Rochebrume.</p>

      <p>Quelque chose effleure lentement le bois sous tes pieds.</p>
    `,
    choices: [
      { label: 'Ne pas regarder et continuer à ramer', to: 'c45' },
      { label: 'Te pencher et regarder dans l’eau', to: 'c42' }
    ]
  },

  c42: {
    number: 'PAGE 42',
    title: 'Un visage sous l’eau',
    image: 'Un visage sous l’eau',
    text: `
      <p>Tu poses les rames et te penches lentement au-dessus du bord.</p>

      <p>Au début, tu ne vois que ton propre reflet déformé.</p>

      <p>Puis il disparaît.</p>

      <p>Très loin sous la surface, des points lumineux apparaissent.</p>

      <p>Des dizaines.</p>

      <p>Des centaines peut-être.</p>

      <p>Ils ressemblent à des étoiles vues dans un ciel parfaitement clair.</p>

      <p>Mais elles sont sous toi.</p>

      <p>Tu te penches davantage.</p>

      <p>Un visage surgit soudain dans l’obscurité.</p>

      <p><strong>Sir Aldren.</strong></p>

      <p>Il semble flotter plusieurs mètres sous l’eau.</p>

      <p>Ses yeux s’ouvrent.</p>

      <p>Sa bouche prononce quelque chose que tu n’entends pas.</p>

      <p>Tu recules si brusquement que la barque oscille dangereusement.</p>

      <p>Lorsque tu regardes de nouveau, il n’y a plus rien.</p>

      <p>Seulement l’eau noire.</p>

      <p>Tu ne sais pas si Aldren était réellement là, si quelque chose a emprunté son visage… ou si ton esprit commence à fabriquer lui-même ce qu’il craint le plus de voir.</p>

      <p>Tu reprends les rames.</p>

      <p>Quoi que tu aies vu, rester immobile au milieu de ce lac te paraît soudain une très mauvaise idée.</p>
    `,
    choices: [
      { label: 'Continuer jusqu’à l’autre rive', to: 'c45' }
    ]
  },

  c43: {
    number: 'PAGE 43',
    title: 'Les lames dans la poche',
    image: 'Les lames dans la poche',
    text: state => `
      <p>Élias enveloppe soigneusement les lames dans un morceau de cuir avant de te les tendre.</p>

      <blockquote>« Garde-les à portée de main. Si quelque chose te saute dessus, tu n’auras probablement pas le temps de fouiller ton sac. »</blockquote>

      <p>Tu possèdes maintenant <strong>${state.throwingBlades} lame${state.throwingBlades > 1 ? 's' : ''} de jet</strong>.</p>
    `,
    choices: [
      { label: 'Retourner dans la rue de Rochebrume', to: 'c15' },
      { label: 'Quitter Rochebrume et repartir vers la grotte', to: 'c20' }
    ]
  },

  c44: {
    number: 'PAGE 44',
    title: 'Les marches des géants',
    image: 'Les marches des géants',
    text: `
      <p>Tu choisis l’escalier.</p>

      <p>Les premières marches suffisent à te faire comprendre qu’il n’a pas été conçu pour des hommes.</p>

      <p>Chacune arrive presque à hauteur de ton genou. Certaines sont si hautes que tu dois poser les mains sur la pierre pour te hisser.</p>

      <p>Tu montes longtemps.</p>

      <p>Lorsque tu regardes derrière toi, la fissure par laquelle tu es arrivé n’est déjà plus visible.</p>

      <p>Au-dessus, la lumière blanche ne change jamais.</p>

      <p>Tu ignores si quelques minutes ou plusieurs heures se sont écoulées lorsque l’escalier débouche enfin sur une terrasse.</p>

      <p>Des fresques couvrent toute la paroi.</p>

      <p>Tu y vois de petites silhouettes humaines disposées autour d’une forme immense, si vaste que l’artiste n’en a représenté qu’une partie.</p>

      <p>Au-dessus d’elles revient sans cesse le même symbole.</p>

      <p><strong>Un œil fermé.</strong></p>

      <p>Tu observes plus attentivement les scènes.</p>

      <p>Les hommes ne semblent pas adorer la forme.</p>

      <p>Ils l’entourent de murs.</p>

      <p>Ils ferment des portes.</p>

      <p>Ils construisent une prison.</p>

      <p>Un peu plus loin, une autre fresque représente un homme tenant une petite lame noire.</p>

      <p>Devant lui, de fins traits relient plusieurs personnages à une masse située hors du dessin.</p>

      <p>La lame coupe l’un de ces traits.</p>

      <p>Tu ne comprends pas encore ce que cela signifie.</p>

      <p>Au bout de la terrasse, un passage étroit descend vers une arche monumentale.</p>
    `,
    choices: [
      { label: 'Suivre le passage jusqu’à l’arche', to: 'c46' }
    ]
  },

  c45: {
    number: 'PAGE 45',
    title: 'L’autre rive',
    image: 'L’autre rive',
    text: `
      <p>La traversée continue encore un long moment.</p>

      <p>Peu à peu, une ligne sombre apparaît devant toi.</p>

      <p>L’autre rive.</p>

      <p>La barque finit par grincer contre la pierre.</p>

      <p>Tu descends rapidement et attaches l’embarcation à une colonne naturelle.</p>

      <p>Derrière toi, l’eau redevient parfaitement immobile.</p>

      <p>Le silence est si complet que tu pourrais presque croire n’avoir jamais traversé le lac.</p>

      <p>Devant toi, un sentier monte entre deux parois claires.</p>

      <p>Tu le suis.</p>

      <p>Au sommet, le paysage s’ouvre de nouveau sur le gouffre.</p>

      <p>Pour la première fois depuis ton entrée dans ce monde impossible, tu aperçois au loin une construction aux lignes nettement régulières.</p>

      <p>Une terrasse.</p>

      <p>Une arche.</p>

      <p>Quelque chose qui a été bâti.</p>

      <p>Ou du moins quelque chose qui en donne l’impression.</p>
    `,
    choices: [
      { label: 'Monter vers la terrasse', to: 'c46' }
    ]
  },

  c46: {
    number: 'PAGE 46',
    title: 'La terrasse de l’œil fermé',
    image: 'La terrasse de l’œil fermé',
    onEnter: s => setCheckpoint(s, 'La terrasse de l’œil fermé'),
    text: `
      <p>Après la dernière pente, tu atteins enfin la terrasse.</p>

      <p>Elle est immense.</p>

      <p>Le sol est composé de dalles noires dont les jointures forment des lignes si régulières qu’elles semblent avoir été tracées hier.</p>

      <p>Pourtant, certaines pierres sont fendues par des racines minérales épaisses comme des troncs d’arbres.</p>

      <p>Les différentes routes du monde souterrain semblent toutes finir ici.</p>

      <p>Devant toi se dresse une arche de pierre noire, haute de plusieurs dizaines de mètres.</p>

      <p>Au centre de sa clé de voûte est gravé le symbole désormais familier.</p>

      <p><strong>L’œil fermé.</strong></p>

      <p>Au-delà de l’arche, un chemin plonge de nouveau vers les profondeurs.</p>

      <p>Très loin, presque au bord de ta vision, une lueur rouge pulse dans l’obscurité.</p>

      <p>Une fois.</p>

      <p>Le silence revient.</p>

      <p>Puis une seconde.</p>

      <p>Comme un battement extrêmement lent.</p>

      <p>Tu restes longtemps immobile à contempler ce passage.</p>

      <p>Tout ce que tu as traversé jusqu’ici — Valombre, Rochebrume, les premières galeries, Anselme, le lac ou les marches — te paraît soudain appartenir à la surface d’un monde beaucoup plus vaste.</p>

      <p>Et quelque part plus bas se trouve encore Sir Aldren.</p>

      <p>Ou quelque chose qui sait parfaitement quel visage lui donner.</p>

      <p><strong>Fin de cette version test.</strong></p>
    `,
    choices: [
      { label: 'Reprendre au dernier point de sauvegarde', action: 'checkpoint' },
      { label: 'Recommencer depuis le début', action: 'restart' }
    ]
  }
};

  const PAGE_ORDER = Array.from({ length: 46 }, (_, i) => `c${i + 1}`);
  const PAGE_BY_NODE = Object.fromEntries(PAGE_ORDER.map((id, i) => [id, i + 1]));
  const padPage = n => String(n).padStart(3, '0');

  function equipHeavySword(state) {
    if (state.weapon === 'none') state.weapon = 'heavy';
  }

  function currentForce(state) {
    return Math.max(3, Math.min(18, state.baseForce + (state.forceBonus || 0)));
  }

  function currentDexterity(state) {
    const weaponModifier =
      state.weapon === 'heavy' ? -4 :
      state.weapon === 'light' ? 2 : 0;
    return Math.max(3, Math.min(18,
      state.baseDexterity +
      (state.dexBonus || 0) -
      (state.dexPenalty || 0) +
      weaponModifier
    ));
  }

  function combatPower(state) {
    if (state.weapon === 'heavy') return 10;
    if (state.weapon === 'light') return 4;
    if (state.weapon === 'black_blade') return 6;
    return 2;
  }

  function weaponLabel(state) {
    if (state.weapon === 'heavy') return 'Épée lourde de Sir Aldren';
    if (state.weapon === 'light') return 'Épée du forgeron';
    if (state.weapon === 'black_blade') return 'Lame noire';
    return 'Aucune';
  }

  function syncThrowingBlades(state) {
    if ((state.throwingBlades || 0) > 0) {
      state.inventory.lames_jet = {
        name: 'Lames de jet',
        description: 'De petites lames destinées à être lancées au visage pour gagner quelques secondes.',
        quantity: state.throwingBlades
      };
    } else {
      delete state.inventory.lames_jet;
    }
  }

  function createInitialState(seriesProfile = {}) {
    const base = seriesProfile.baseStats || {};
    return {
      node: 'start',
      heroName: seriesProfile.heroName || '',
      inventory: {},
      flags: {},
      visited: {},
      history: [],
      journal: '',
      hp: base.maxHp || 18,
      maxHp: base.maxHp || 18,
      chance: base.chance || 12,
      baseForce: base.force || 9,
      baseDexterity: base.dexterity || 13,
      forceBonus: 0,
      dexBonus: 0,
      dexPenalty: 0,
      weapon: 'none',
      silver: 0,
      goldCoins: 0,
      throwingBlades: 0,
      lastDice: null,
      lastTotal: null,
      lastStat: null,
      lastStatName: '',
      rollCount: 0,
      lastCombatOutcome: null,
      damageRolls: {},
      lastDamageDie: null,
      lastDamageKey: null,
      lastHealingDie: null,
      currentCheckpoint: null
    };
  }

  const inventory = {
    topLine(state) {
      return `Argent : ${state.silver} · Or : ${state.goldCoins} · Arme : ${weaponLabel(state)}`;
    },

    extraHtml(state) {
      if (!Number.isInteger(state.lastHealingDie)) return '';
      return `<div class="dice-result"><p class="roll-number">Dernière potion</p><div class="dice-faces">${renderDie(state.lastHealingDie)}</div><p><strong>+${state.lastHealingDie} point${state.lastHealingDie > 1 ? 's' : ''} de Vie</strong></p><p>Vie : <strong>${state.hp} / ${state.maxHp}</strong></p></div>`;
    },

    actionHtml(id, item, state) {
      if (id === 'parchemin') {
        return `<div class="inventory-actions"><button class="inventory-action-btn" data-action="read-parchment">Lire le parchemin</button></div>`;
      }
      if (id === 'potion_guerison') {
        return `<div class="inventory-actions"><button class="inventory-action-btn" data-action="use-potion" ${state.hp >= state.maxHp ? 'disabled' : ''}>Boire la potion (1 dé de Vie)</button></div>`;
      }
      if (id === 'lame_noire') {
        return `<div class="inventory-actions"><button class="inventory-action-btn" data-action="equip-black-blade">Équiper la lame noire</button></div>`;
      }
      return '';
    },

    handleAction(action, state, api) {
      if (action === 'read-parchment') {
        api.showModal('Parchemin ancien', `
          <img class="inventory-parchment-image" src="${api.book.assetBase}/objets/La-Grotte-de-Valombre-Parchemin.png" alt="Parchemin ancien" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
          <div class="inventory-image-fallback">Ton image apparaîtra ici dès que tu ajouteras :<br><strong>books/ecuyer/01-la-grotte-de-valombre/images/objets/La-Grotte-de-Valombre-Parchemin.png</strong></div>
          <div class="parchment-verse"><strong>L’œil qui dort doit demeurer fermé,</strong><br><strong>Car nul vivant ne doit le réveiller.</strong><br><br><strong>Là où le soufre vient empoisonner l’air,</strong><br><strong>Détourne tes pas et rebrousse en arrière.</strong><br><br><strong>Lorsque les liens ne pourront plus céder,</strong><br><strong>Cherche la lame noire : elle seule peut libérer.</strong></div>
          <button class="inventory-action-btn" data-action="back-inventory">Retour à l’inventaire</button>`);
        return true;
      }

      if (action === 'use-potion') {
        if (!hasItem(state, 'potion_guerison') || state.hp >= state.maxHp) {
          api.openInventory();
          return true;
        }
        const healing = cryptoDie6();
        state.lastHealingDie = healing;
        state.hp = Math.min(state.maxHp, state.hp + healing);
        removeItem(state, 'potion_guerison');
        api.saveState();
        api.render();
        api.openInventory();
        return true;
      }

      if (action === 'equip-black-blade') {
        state.weapon = 'black_blade';
        api.saveState();
        api.render();
        api.openInventory();
        return true;
      }

      return false;
    }
  };

  BookRegistry.register({
    id: 'ecuyer-01',
    seriesId: 'ecuyer',
    seriesLabel: 'ÉCUYER 01',
    episode: 1,
    orderInSeries: 1,
    slug: 'la-grotte-de-valombre',
    title: 'La Grotte de Valombre',
    description: 'Première aventure de la série de l’Écuyer.',
    access: 'free',
    contentVersion: 2,
    saveVersion: 1,
    assetBase: './books/ecuyer/01-la-grotte-de-valombre/images',
    story: STORY,
    pageOrder: PAGE_ORDER,
    pageByNode: PAGE_BY_NODE,
    padPage,
    imageBaseForPage: n => `La-Grotte-de-Valombre-${padPage(n)}`,
    imageExtensions: ['webp', 'png', 'jpg', 'jpeg'],
    createInitialState,
    rules: { currentForce, currentDexterity, combatPower, weaponLabel },
    inventory,
    checkpoints: [
      { node: 'c8', label: 'Sortie de Valombre', onlyIfNone: true }
    ],
    legacyStorageKeys: ['ldveh.book.ecuyer-01-valombre.save.v1', 'valombre_save_v12_3d6_stats18'],
    legacyCheckpointKeys: ['ldveh.book.ecuyer-01-valombre.checkpoint.v1', 'valombre_checkpoint_v12_3d6_stats18'],
    exportSeriesMemory(state) {
      // Les décisions durables seront explicitement ajoutées ici lorsqu’elles
      // seront validées comme conséquences inter-livres. Rien n’est exporté
      // automatiquement afin d’éviter de figer trop tôt l’arbre narratif.
      return {};
    }
  });
})();
