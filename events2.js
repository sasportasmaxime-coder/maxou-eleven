// MAXOU ELEVEN — événements contextuels, arcs narratifs, événements par poste
// Tout est fictif. Chargé après data.js, avant engine.js.
"use strict";

const isCdmYear = (s) => s.year > 2026 && (s.year - 2026) % 4 === 0;

EVENTS.push(

  // ============ CONTEXTUELS : la saison te parle ============
  {
    id: "cdm_veille", ico: "🌍", cat: "Année de Coupe du Monde", min: 19, max: 99, cd: 2,
    cond: (s) => isCdmYear(s) && s.flags.selectionnable,
    text: () => "Année de Coupe du Monde. Chaque match est une audition, chaque blessure une tragédie nationale. Les journalistes campent devant chez toi et ta boulangère donne son avis sur ta forme.",
    choices: () => [
      { label: "Se sur-entraîner comme un possédé", apply: () => chance(0.6)
        ? { txt: "T'arrives au rassemblement affûté comme une lame. Le sélectionneur te regarde différemment.", fx: { forme: 8, phys: 3, moral: 4, disc: 3 } }
        : { txt: "Trop, c'est trop. Le corps lâche à deux mois de la compét'. Course contre la montre avec les kinés.", fx: { forme: -12, moral: -8 } } },
      { label: "Gérer tranquille, la sélection viendra", apply: () => ({ txt: "Pas de zèle, pas de blessure. Les cadors font ça depuis toujours.", fx: { mental: 3, forme: 2 } }) },
      { label: "Couper les réseaux et disparaître", apply: () => ({ txt: "Plus de bruit, plus de pression. La presse te déclare « en dépression ». T'es juste en paix, bande de vautours.", fx: { mental: 6, moral: 4, rep: -3 } }) }
    ]
  },
  {
    id: "course_titre", ico: "🔥", cat: "Sprint final", min: 18, max: 99, cd: 2,
    cond: (s) => s.last && s.last.posLg <= 3 && (s.tier === "ELITE" || s.tier === "D1"),
    text: () => "Le club joue le titre cette saison. Le président descend au vestiaire, l'haleine chargée : « Les gars, si on gagne, prime doublée. Si on perd… » Il ne finit pas sa phrase.",
    choices: () => [
      { label: "Prendre le vestiaire par les couilles", apply: () => chance(0.6)
        ? { txt: "Discours d'avant-match, sacrifices, grinta. Le groupe te suit comme une meute. C'est TON équipe maintenant.", fx: { vest: 8, rep: 5, mental: 4, moral: 5 } }
        : { txt: "Ton discours tombe à plat. « Calme-toi, t'es pas capitaine. » Gênance intergalactique.", fx: { vest: -4, moral: -4 } } },
      { label: "La boucler et empiler les perfs", apply: () => ({ txt: "Pas de bla-bla, que du concret. Les leaders silencieux sont les plus dangereux.", fx: { forme: 4, disc: 3, coach: 3 } }) },
      { label: "Craquer sous la pression, sortir décompresser", apply: () => ({ txt: "T'as « décompressé » jusqu'à 5h du mat' à trois jours d'un choc. Le kiné sent l'alcool dans ta sueur.", fx: { moral: 6, forme: -6, disc: -4 }, ctr: { cuites: 1 } }) }
    ]
  },
  {
    id: "lutte_maintien", ico: "🚨", cat: "Zone rouge", min: 18, max: 99, cd: 2,
    cond: (s) => s.last && s.last.posLg >= 15,
    text: () => "Le club est dans la zone rouge. Salaires en retard, coach viré, supporters qui bloquent le centre d'entraînement avec des fumigènes et des banderoles « MERCENAIRES ».",
    choices: () => [
      { label: "Monter au front en interview : « On va se sauver »", apply: () => chance(0.55)
        ? { txt: "Le peuple retient ton nom. Dans la tempête, t'as pas fui. Ça, un vestiaire s'en souvient.", fx: { rep: 6, vest: 6, mental: 4 } }
        : { txt: "Promesse non tenue, l'équipe coule encore. Ta déclaration tourne en boucle avec des rires enregistrés.", fx: { rep: -6, moral: -5 } } },
      { label: "Appeler ton agent : « Sors-moi de là »", apply: () => ({ txt: "Sauve-qui-peut assumé. Le vestiaire te grille direct : t'as déjà la tête ailleurs.", fx: { vest: -8, moral: 3 }, flags: { transfert_demande: true } }) },
      { label: "Baisser la tête et ramer", apply: () => ({ txt: "Tu bosses, tu dis rien, tu pries. La dignité du soldat en plein naufrage.", fx: { disc: 4, mental: 3 } }) }
    ]
  },
  {
    id: "apres_scandale", ico: "🧯", cat: "Opération rédemption", min: 19, max: 99, cd: 4,
    cond: (s) => s.stats.rep < 25 || s.heat > 45,
    text: () => "Ton image est en ruine. Ton attaché de presse débarque avec un plan « rédemption » : assos, orphelinats, documentaire larmoyant. « On va te refaire une virginité, mon grand. »",
    choices: () => [
      { label: "Jouer le jeu à fond, caméras partout", apply: () => chance(0.6)
        ? { txt: "Toi + des gamins malades + une musique triste = 12M de vues. Le public pardonne. Le cynisme gagne toujours.", fx: { rep: 12, cha: 3, argent: -80 } }
        : { txt: "Une fuite révèle que t'as exigé une loge climatisée à l'orphelinat. C'est encore pire qu'avant, bravo champion.", fx: { rep: -8, argent: -80, moral: -5 } } },
      { label: "Faire du bien en vrai, sans caméra", apply: () => ({ txt: "T'as financé trois city-stades anonymement. Ça se saura dans dix ans. Ou jamais. C'est ça, le vrai.", fx: { mental: 8, moral: 6, argent: -120 } }) },
      { label: "« Mon image ? J'encule mon image »", apply: () => ({ txt: "Zéro com, zéro excuse. Une moitié du pays te déteste, l'autre te respecte à mort. Aucun sponsor ne te touche.", fx: { cha: 5, mental: 4, rep: -4 } }) }
    ]
  },
  {
    id: "retour_suspension", ico: "⏳", cat: "Le retour du banni", min: 19, max: 99, once: false, cd: 2,
    cond: (s) => s.susp > 0,
    text: () => "Suspendu. Des mois sans compét', à t'entraîner seul pendant que le monde t'oublie. Ton nom est devenu une punchline dans les émissions du dimanche soir.",
    choices: () => [
      { label: "Revenir en machine de guerre", apply: () => chance(0.55)
        ? { txt: "Double séances, diète militaire, silence radio. Le jour du retour, t'es un monstre affamé.", fx: { forme: 12, phys: 4, mental: 5, disc: 5 } }
        : { txt: "Tu forces trop, le corps dit stop. Rechute physique en pleine reconstruction. La totale.", fx: { forme: -8, moral: -6 } } },
      { label: "Sombrer un peu plus", apply: () => ({ txt: "Plus rien à perdre, alors autant tout perdre. Les soirées s'enchaînent, les excuses aussi.", fx: { moral: 4, forme: -8, addiction: 8, disc: -5 }, ctr: { cuites: 1 } }) }
    ]
  },
  {
    id: "annee_contrat", ico: "📄", cat: "Année de contrat", min: 20, max: 99, cd: 2,
    cond: (s) => s.contract.years === 1,
    text: () => "Dernière année de contrat. Traduction : chaque match est un entretien d'embauche. Ton agent t'appelle deux fois par jour avec la voix d'un télévendeur sous coke.",
    choices: () => [
      { label: "Saison de mercenaire : stats, stats, stats", apply: () => ({ txt: "Tu joues pour ta gueule et ça se voit — mais les chiffres, eux, ne mentent pas au mercato.", fx: { forme: 4, vest: -4, rep: 3 } }) },
      { label: "Jouer collectif, la valeur se verra", apply: () => ({ txt: "Les puristes et les coachs adorent. Les recruteurs regardent quand même la colonne buts, ces philistins.", fx: { vest: 5, coach: 4, mental: 2 } }) },
      { label: "Te préserver : zéro risque, zéro tacle", apply: () => chance(0.5)
        ? { txt: "Pas de blessure, contrat sécurisé. T'as joué à 60% et personne n'a rien vu. Escroc.", fx: { forme: 5, disc: -2 } }
        : { txt: "Ton non-engagement crève l'écran. « Il lève le pied », titre la presse. Les offres refroidissent.", fx: { rep: -6, coach: -5 } } }
    ]
  },
  {
    id: "grosse_saison", ico: "🌟", cat: "Lendemain de gloire", min: 18, max: 99, cd: 2,
    cond: (s) => s.last && s.last.note >= 7.6,
    text: () => "Ta saison a été énorme et le monde entier l'a vue. Marques, groupies, faux amis d'enfance retrouvés : tout ce qui brille rapplique en meute.",
    choices: () => [
      { label: "Encaisser tout ce qui se signe", apply: () => ({ txt: "Pubs, apparitions, placements. Ton compte explose, ton temps de récupération aussi.", fx: { argent: 300, cha: 3, forme: -5, disc: -3 } }) },
      { label: "Trier : trois contrats, pas un de plus", apply: () => ({ txt: "Sélectif et pro. Les marques sérieuses respectent, les rapaces vont chasser ailleurs.", fx: { argent: 120, mental: 4 } }) },
      { label: "La grosse tête, l'assumer pleinement", apply: () => chance(0.5)
        ? { txt: "Lunettes en intérieur, retards assumés, ego cosmique. Bizarrement, ça marche : les gens adorent les personnages.", fx: { cha: 8, rep: 3, disc: -5, coach: -4 } }
        : { txt: "Le vestiaire organise un « conseil de discipline » parodique et te fait bouffer ton melon. Retour sur terre, violent.", fx: { cha: -3, vest: -5, moral: -4 } } }
    ]
  },
  {
    id: "saison_pourrie", ico: "🕳️", cat: "Le trou noir", min: 18, max: 99, cd: 2,
    cond: (s) => s.last && s.last.note < 5.4 && s.last.matchs >= 8,
    text: () => "Ta saison a été une insulte au football. Même le stadier te regarde avec pitié. Il faut comprendre pourquoi — ou trouver un coupable, c'est moins fatigant.",
    choices: () => [
      { label: "Consulter un psy du sport en secret", apply: () => ({ txt: "Trois séances pour admettre que t'as la tête en vrac depuis des mois. C'est pas magique, mais ça répare.", fx: { mental: 8, moral: 6, argent: -15 } }) },
      { label: "Accuser l'arbitrage, le coach, la lune", apply: () => ({ txt: "Interview lunaire où t'accuses littéralement la pelouse. Les memes fusent. Le problème, lui, est toujours là.", fx: { cha: 2, rep: -5, mental: -3 } }) },
      { label: "Retour au quartier, retrouver la dalle", apply: () => chance(0.6)
        ? { txt: "Deux semaines à jouer au city avec les petits. La rage est revenue. Le ballon sonne à nouveau juste.", fx: { moral: 8, tech: 2, mental: 4 } }
        : { txt: "Le retour aux sources finit en soirées jusqu'à l'aube avec les anciens. Mauvaise nostalgie.", fx: { moral: 3, forme: -5, heat: 5 }, ctr: { cuites: 1 } } }
    ]
  },
  {
    id: "chambre_centre", ico: "🛏️", cat: "La piaule", min: 16, max: 17, once: true,
    text: () => "22h30 au centre de formation. Ta piaule de 9m², un poster au mur, et ta mère au téléphone qui demande si tu manges bien. T'as 16 ans et le mal du pays dans un pays qui est le tien.",
    choices: () => [
      { label: "Chialer un coup et t'endurcir", apply: () => ({ txt: "Personne t'a vu. Le lendemain, t'étais le premier au petit-déj. C'est comme ça qu'on grandit, en vrai.", fx: { mental: 6, moral: -2 } }) },
      { label: "Faire le mur avec les autres de la chambrée", apply: () => chance(0.6)
        ? { txt: "McDo à 23h en scred, fous rires étouffés au retour. Des souvenirs pour la vie, zéro conséquence. Cette fois.", fx: { moral: 8, vest: 4, disc: -3 } }
        : { txt: "Le veilleur vous a cramés au retour. Rapport à la direction, appel aux parents. Ta mère a pleuré, et pas de fierté.", fx: { disc: -5, coach: -5, moral: -4 } } }
    ]
  },
  {
    id: "vieux_os", ico: "🦴", cat: "Le corps parle", min: 33, max: 99, cd: 2,
    cond: (s) => true,
    text: () => "Le réveil est devenu une négociation avec ton propre squelette. Vingt minutes d'étirements pour marcher normalement. Le doc parle « d'usure normale ». Normale, ta gueule.",
    choices: () => [
      { label: "Protocole de vieux : cryo, sommeil, science", apply: () => ({ txt: "Tu récupères comme un moine bionique. Coûteux, chiant, efficace. C'est ça ou la chaise roulante.", fx: { forme: 8, phys: 2, argent: -60, disc: 3 } }) },
      { label: "Infiltrations et déni total", apply: () => chance(0.5)
        ? { txt: "Piqûre, terrain, répète. Ça tient. Combien de temps ? Personne veut savoir, surtout pas toi.", fx: { forme: 5, phys: -3 } }
        : { txt: "Le corps envoie la facture en plein match : claquage sale. On ne négocie pas avec la biologie, papy.", fx: { forme: -15, moral: -6 }, injury: true } }
    ]
  },
  {
    id: "derby_semaine", ico: "😤", cat: "Semaine de derby", min: 18, max: 99, cd: 4,
    text: (s) => pick([
      "Semaine de derby. Un joueur adverse te chambre en interview : « " + (s.nom.split(" ")[1] || s.nom) + " ? Connais pas. » Toute la ville attend ta réponse.",
      "Semaine de derby. Des ultras adverses ont accroché une banderole avec ta tête et une brouette. Tu ne comprends même pas la blague mais elle te rend fou."
    ]),
    choices: () => [
      { label: "Répondre médiatiquement, à la mitraillette", apply: () => chance(0.5)
        ? { txt: "Ta punchline retourne le game une semaine entière. Si tu perds le match, par contre, elle te suivra dix ans.", fx: { cha: 5, rep: 3, moral: 4 } }
        : { txt: "Ta réponse était nulle et tout le monde l'a trouvée nulle. Même ton CM a liké le tweet adverse par erreur.", fx: { cha: -4, moral: -3 } } },
      { label: "Répondre sur le terrain uniquement", apply: () => chance(0.55)
        ? { txt: "T'as marché sur le derby. Doigt sur la bouche devant leur virage. Iconique, gravé, éternel.", fx: { rep: 8, moral: 8, vest: 5 } }
        : { txt: "T'es passé au travers du derby comme un fantôme. Leur virage a chanté ton nom sur un air de clown.", fx: { moral: -8, rep: -4 } } }
    ]
  },

  // ============ ARCS NARRATIFS : personnages récurrents ============
  {
    id: "arc_rival_1", ico: "⚔️", cat: "Le rival", min: 18, max: 27, once: true, w: 2,
    text: (s) => s.perso.rival + ", 17 piges, débarque du centre avec une hype de dingue. Il joue à TON poste, il a TES gestes en mieux jeune, et il te regarde comme un meuble à dégager.",
    choices: (s) => [
      { label: "Le prendre sous ton aile", apply: () => ({ txt: "Tu lui montres tout : les courses, les pièges, les rats du milieu. Il t'écoute comme un prophète. Pour l'instant.", fx: { vest: 5, mental: 4 }, flags: { rival: "mentor" } }) },
      { label: "Le remettre à sa place, violemment", apply: () => ({ txt: "Tacle appuyé au premier entraînement, regard de tueur. Message reçu. La guerre est déclarée, gamin.", fx: { vest: -3, disc: -2, moral: 3 }, flags: { rival: "guerre" } }) },
      { label: "L'ignorer royalement", apply: () => ({ txt: "Tu ne calcules même pas son existence. L'indifférence, l'arme des vieux singes.", fx: { mental: 2 }, flags: { rival: "froid" } }) }
    ]
  },
  {
    id: "arc_rival_guerre", ico: "⚔️", cat: "Le rival", min: 18, max: 99, once: true, w: 2.5,
    cond: (s) => s.flags.rival === "guerre",
    text: (s) => "Article assassin dans la presse : « Un cadre du vestiaire fait vivre un enfer aux jeunes. » Pas de nom, mais tout le monde a compris. " + s.perso.rival + " a balancé, ce serpent.",
    choices: (s) => [
      { label: "Le fumer en interview, nom inclus", apply: () => chance(0.45)
        ? { txt: "Ta réponse est tellement cinglante que même ses fans rigolent. Il sort du club par la petite porte au mercato.", fx: { cha: 5, rep: -3, moral: 6, vest: 3 }, flags: { rival: "parti" } }
        : { txt: "Attaquer un minot de 18 ans publiquement : mauvaise idée. La presse te fait passer pour le harceleur de service.", fx: { rep: -10, vest: -5, moral: -4 } } },
      { label: "Régler ça en privé, entre hommes", apply: () => ({ txt: "Une heure porte fermée. Vous sortez sans vous aimer, mais avec un pacte de non-agression. Le vestiaire respire.", fx: { mental: 5, vest: 4, coach: 3 }, flags: { rival: "treve" } }) },
      { label: "Le détruire à l'entraînement, chaque jour", apply: () => chance(0.5)
        ? { txt: "Tu le fais disparaître dans les petits espaces, séance après séance. Il demande son prêt en hiver. K.O. technique.", fx: { moral: 6, tech: 2, vest: -2 }, flags: { rival: "parti" } }
        : { txt: "Le problème, c'est qu'il progresse plus vite que toi. Chaque duel perdu te vieillit de six mois.", fx: { moral: -6, mental: -3 } } }
    ]
  },
  {
    id: "arc_rival_mentor", ico: "🤝", cat: "Le rival", min: 18, max: 99, once: true, w: 2.5,
    cond: (s) => s.flags.rival === "mentor",
    text: (s) => s.perso.rival + " explose tout : doublé en coupe, la presse en transe. Au micro, il lâche : « Tout ce que je sais, je le dois à mon grand frère du vestiaire. » Les caméras se braquent sur toi.",
    choices: () => [
      { label: "Savourer : c'est aussi ta victoire", apply: () => ({ txt: "Former un crack, c'est un trophée que personne peut te retirer. Le club et le vestiaire te voient autrement.", fx: { rep: 5, vest: 6, mental: 5, moral: 5 } }) },
      { label: "Sentir la jalousie te bouffer", apply: () => ({ txt: "Il a ta place dans les cœurs et bientôt sur le terrain. T'as créé ton propre bourreau, gros malin.", fx: { moral: -6, mental: -4, forme: 2 } }) }
    ]
  },
  {
    id: "arc_rival_depasse", ico: "👑", cat: "Le rival", min: 26, max: 99, once: true, w: 2,
    cond: (s) => s.flags.rival && s.flags.rival !== "parti",
    text: (s) => "Les années ont passé. " + s.perso.rival + " est aujourd'hui coté plus cher que toi, sélectionné avant toi, affiché plus grand que toi sur le poster du club. Le môme t'a doublé.",
    choices: () => [
      { label: "L'accepter avec classe", apply: () => ({ txt: "Le foot est une course de relais, pas un trône. Tu lui as tendu le témoin. Peu savent faire ça sans amertume.", fx: { mental: 8, rep: 4, vest: 4 } }) },
      { label: "Le vivre comme une humiliation", apply: () => ({ txt: "Chaque une de journal avec sa gueule te brûle. Tu t'entraînes avec la rage… ou tu rumines au fond du canapé.", fx: { moral: -5, forme: 3, mental: -3 } }) }
    ]
  },
  {
    id: "pote_sortie", ico: "🚪", cat: "Le quartier", min: 24, max: 99, once: true, w: 2,
    cond: (s) => s.usedEvents.includes("pote_prison"),
    text: (s) => s.perso.pote + " sort de prison. Il a changé — plus sec, plus calme, plus flou. Il te présente son « projet » : un barbershop-lavage auto-« import-export ». Il lui manque juste 150 000.",
    choices: (s) => [
      { label: "Financer le barbershop (le vrai projet)", apply: () => chance(0.55)
        ? { txt: "Contre toute attente, ça cartonne. Trois salons en deux ans. Il pleure en te rendant ton argent. Immense.", fx: { argent: 50, moral: 8, mental: 5, rep: 3 }, flags: { pote_fin: "barber_ok" } }
        : { txt: "Le salon coule en huit mois. L'argent est parti, l'amitié est bancale, mais au moins il a essayé proprement.", fx: { argent: -150, moral: -4 }, flags: { pote_fin: "barber_ko" } } },
      { label: "Financer sans poser de questions sur l'« import-export »", apply: () => chance(0.5)
        ? { txt: "L'argent revient doublé, sans facture, sans explication. Tu dors avec un œil ouvert maintenant.", fx: { argent: 150, heat: 18, mental: -3 }, ctr: { magouilles: 1 }, flags: { pote_fin: "louche" } }
        : { txt: "L'« import-export » finit sur BFM avec ton nom dans le dossier des investisseurs. Magnifique.", fx: { argent: -150, heat: 25, rep: -10 }, ctr: { magouilles: 1 }, flags: { pote_fin: "louche" } } },
      { label: "Refuser : « Je t'aime, mais non »", apply: () => ({ txt: "Il encaisse mal, puis il comprend. Les vraies limites, c'est aussi ça, le respect.", fx: { mental: 5, moral: -3 }, flags: { pote_fin: "refus" } }) }
    ]
  },
  {
    id: "agent_revenge", ico: "🐀", cat: "Le rat", min: 20, max: 99, once: true, w: 2.5,
    cond: (s) => s.flags.agent_vire,
    text: () => "Ton ex-agent contre-attaque : il vend à un tabloïd un dossier « explosif » sur tes années folles — messages privés, notes de frais, photos de soirées. Le rat connaît tous tes squelettes.",
    choices: () => [
      { label: "Racheter le dossier avant publication", apply: () => ({ txt: "500 000 pour tes propres secrets. Le rat gagne, mais le silence n'a pas de prix. Enfin si : celui-là.", fx: { argent: -500, mental: -3, heat: -5 } }) },
      { label: "Laisser publier : « Balance tout, minable »", apply: () => chance(0.45)
        ? { txt: "Le dossier fait pschit : des soirées, des grosses dépenses, rien d'illégal. Le rat s'est grillé tout seul dans le milieu.", fx: { rep: -4, moral: 5, mental: 5 } }
        : { txt: "C'est sale, précis, daté. Une semaine de une. Les sponsors familiaux se barrent en courant.", fx: { rep: -14, argent: -200, moral: -8, heat: 8 } } },
      { label: "Le menacer via tes « connaissances »", apply: () => chance(0.5)
        ? { txt: "Deux types passent le voir « pour discuter ». Le dossier disparaît. Toi aussi tu deviens quelqu'un d'autre, doucement.", fx: { heat: 15, mental: -4 }, ctr: { magouilles: 1 } }
        : { txt: "Il portait un micro, ce rat de laboratoire. « Menaces et intimidation » : le dossier s'alourdit méchamment.", fx: { heat: 30, rep: -8 }, ctr: { magouilles: 1 } } }
    ]
  },
  {
    id: "michto_depense", ico: "💸", cat: "Love story", min: 19, max: 99, cd: 2, w: 1.4,
    cond: (s) => s.flags.michto,
    text: (s) => pick([
      s.perso.michto + " a « craqué pour une petite folie » : un sac à 40 000 et un séjour aux Maldives réservé pour douze. Douze. « Bébé, c'est pour mon contenu. »",
      s.perso.michto + " veut refaire toute la déco « en marbre de Carrare, comme chez les vraies stars ». Le devis ressemble à un budget de transfert.",
      s.perso.michto + " a offert des montres à ses frères, sa mère, son coach sportif et son « ami d'enfance » Bryan. Avec ta carte. Bryan, donc."
    ]),
    choices: (s) => [
      { label: "Payer sans discuter, la paix n'a pas de prix", apply: () => ({ txt: "Le compte pleure, le couple ronronne. Jusqu'à la prochaine « petite folie ».", fx: { argent: -60, moral: 3 } }) },
      { label: "Poser des limites, enfin", apply: () => chance(0.5)
        ? { txt: "Grosse scène, trois jours de silence… puis du respect. Miracle : elle t'aime peut-être vraiment, en fait.", fx: { argent: -10, mental: 5, moral: 2 } }
        : { txt: "« T'es devenu radin comme un comptable. » Story cryptique, DM ouverts, ambiance de fin de règne.", fx: { moral: -6, mental: 2 } } }
    ]
  },

  // ============ PAR POSTE : ta vie dépend de ton rôle ============
  {
    id: "gk_boulette", ico: "🧤", cat: "La boulette", min: 17, max: 99, cd: 3, w: 1.3,
    cond: (s) => s.poste === "GK",
    text: () => pick([
      "Passe en retrait anodine. Ton contrôle part en vrille, le ballon roule tout seul dans ton but. Le stade entier fait « OOOOH ». Le temps s'arrête.",
      "Corner adverse, tu sors dans le vide comme un parachutiste sans parachute. But de la tête dans le but vide. Ta grand-mère a coupé la télé."
    ]),
    choices: () => [
      { label: "Assumer face caméra le soir même", apply: () => ({ txt: "« C'est ma faute, ça ne se reproduira pas. » Les vrais respectent. La boulette devient une leçon, pas une malédiction.", fx: { mental: 6, rep: 3, coach: 4, moral: -3 } }) },
      { label: "Disparaître des réseaux une semaine", apply: () => ({ txt: "Le meme tourne sans toi. Il finira par mourir. Enfin, sauf à chaque anniversaire de la boulette, où il ressuscitera.", fx: { mental: 2, moral: -5 } }) },
      { label: "En rire toi-même avant les autres", apply: () => chance(0.6)
        ? { txt: "Tu postes le meme toi-même avec une légende parfaite. Internet t'adore : on ne se moque pas de qui se moque déjà de lui.", fx: { cha: 7, moral: 4, rep: 2 } }
        : { txt: "L'autodérision passe pour de la désinvolture. « Il trouve ça DRÔLE ?! » hurle un consultant. Raté.", fx: { rep: -5, coach: -4 } } }
    ]
  },
  {
    id: "gk_heros", ico: "🦸", cat: "Le mur", min: 18, max: 99, cd: 3, w: 1.2,
    cond: (s) => s.poste === "GK",
    text: () => "Penalty contre ton équipe à la 94e, score de la peur. Le tireur est leur star. 50 000 personnes retiennent leur souffle. Toi, tu souris comme un psychopathe sur ta ligne.",
    choices: () => [
      { label: "La provoc totale : danser sur la ligne", apply: () => chance(0.5)
        ? { txt: "Il s'énerve, tire dans les nuages. T'as gagné le duel mental avant le duel tout court. Le stade scande ton nom.", fx: { rep: 8, cha: 6, moral: 10, vest: 5 } }
        : { txt: "Il attend que tu finisses ton cirque et la pose côté opposé, à 2 km/h. L'humiliation intégrale, en mondovision.", fx: { rep: -5, moral: -8, cha: -3 } } },
      { label: "L'analyse froide : les datas, la vidéo", apply: () => chance(0.6)
        ? { txt: "Trois pas à gauche comme prévu par la vidéo. Arrêt. Les datas, c'est pas sexy, mais ça gagne des matchs.", fx: { rep: 6, mental: 6, coach: 5, moral: 6 } }
        : { txt: "Il avait changé ses habitudes, évidemment. But. On ne met pas les génies dans un tableur.", fx: { moral: -5 } } }
    ]
  },
  {
    id: "def_tacle", ico: "☠️", cat: "Le tacle de trop", min: 18, max: 99, cd: 3, w: 1.3,
    cond: (s) => s.poste === "DEF",
    text: (s) => "Duel 50-50 avec le petit génie adverse, celui que tout le pays adore. Tu peux y aller proprement… ou marquer les esprits. Ton sang de boucher ne fait qu'un tour.",
    choices: () => [
      { label: "Y aller à la retourne, cartouche comprise", apply: () => chance(0.5)
        ? { txt: "Tacle d'assassin, jaune miraculeux, le crack sort en boitant. Ton virage t'idolâtre, le pays te maudit. Métier.", fx: { vest: 5, rep: -6, moral: 4, heat: 5 }, ctr: { bagarres: 0 } }
        : { txt: "Rouge direct, le gamin part sur civière, et son IRM fait la une. Tu deviens l'ennemi public numéro un.", fx: { rep: -15, moral: -6, heat: 10, disc: -5 } } },
      { label: "Jouer le ballon, proprement", apply: () => ({ txt: "Tacle chirurgical, ballon gagné, ovation des connaisseurs. Défendre, c'est un art, pas une boucherie.", fx: { rep: 4, coach: 4, mental: 3 } }) }
    ]
  },
  {
    id: "def_mission", ico: "🔒", cat: "Mission marquage", min: 19, max: 99, cd: 3, w: 1.1,
    cond: (s) => s.poste === "DEF",
    text: () => "Le coach t'affiche la vidéo du crack adverse : 34 buts cette saison. « Samedi, il est à toi. S'il touche trois ballons, t'es en tribune la semaine d'après. » Motivant.",
    choices: () => [
      { label: "Le suivre jusqu'aux chiottes s'il faut", apply: () => chance(0.55)
        ? { txt: "90 minutes dans sa poche. Il a fini par changer d'aile pour te fuir, puis par sortir. Mission exterminée.", fx: { coach: 8, rep: 5, mental: 5, moral: 6 } }
        : { txt: "Un seul décrochage, une seule erreur : doublé pour le crack. Le coach ne te regarde même plus.", fx: { coach: -6, moral: -6 } } },
      { label: "Le déstabiliser au mental dès l'échauffement", apply: () => chance(0.5)
        ? { txt: "Deux-trois vérités murmurées à l'oreille et le crack a disparu du match. La guerre psychologique, un art ancestral.", fx: { moral: 5, coach: 4, rep: 2 } }
        : { txt: "Il a répondu par un triplé et un doigt sur la bouche devant toi. T'as réveillé le monstre, bravo.", fx: { moral: -7, rep: -3 } } }
    ]
  },
  {
    id: "mil_invisible", ico: "📊", cat: "L'ingrat du milieu", min: 19, max: 99, cd: 3, w: 1.1,
    cond: (s) => s.poste === "MIL",
    text: () => "Les datas te classent meilleur joueur du championnat à ton poste. Les médias, eux, parlent de l'attaquant qui a marqué sur TA passe après TON pressing et TA récupération. Personne ne te calcule.",
    choices: () => [
      { label: "Le dire publiquement, chiffres à l'appui", apply: () => chance(0.5)
        ? { txt: "Ton thread « ce que vous ne voyez pas » devient viral chez les tacticos. Les nerds du foot t'introniser roi.", fx: { rep: 6, cha: 4, moral: 5 } }
        : { txt: "« Le joueur qui se plaint avec des tableurs. » La moquerie est facile, mais elle colle.", fx: { rep: -4, moral: -4 } } },
      { label: "Rester dans l'ombre, les vrais savent", apply: () => ({ txt: "Les coachs, les scouts, les joueurs : tous savent. La lumière viendra en retard, comme toujours pour les tiens.", fx: { mental: 6, coach: 4, vest: 3 } }) }
    ]
  },
  {
    id: "att_secheresse", ico: "🏜️", cat: "La disette", min: 18, max: 99, cd: 3, w: 1.3,
    cond: (s) => s.poste === "ATT",
    text: () => "Neuf matchs sans marquer. NEUF. Le ballon est devenu un ennemi personnel, la surface un labyrinthe. Un consultant a sorti ta stat en prime time avec un petit rire.",
    choices: () => [
      { label: "Rester après chaque séance : 200 frappes", apply: () => chance(0.6)
        ? { txt: "La 201e frappe du samedi finit en lucarne en match. Le déclic. La machine est réparée, la meute peut aboyer.", fx: { tech: 3, moral: 8, forme: -2, disc: 3 } }
        : { txt: "Tu frappes, tu frappes, et le mal est ailleurs : dans la tête. Le poteau devient ton meilleur ennemi.", fx: { moral: -5, forme: -3 } } },
      { label: "Voir une « guérisseuse énergétique » à 5 000 la séance", apply: () => chance(0.35)
        ? { txt: "Aucune explication rationnelle : triplé le week-end suivant. Tu continues d'y aller EN SECRET ABSOLU.", fx: { argent: -15, moral: 10, mental: 3 } }
        : { txt: "Elle a « réaligné tes chakras de finition ». Toujours zéro but, moins 15 000, et une photo de toi sortant de chez elle dans la presse.", fx: { argent: -15, rep: -5, moral: -4 } } },
      { label: "Exiger de tirer TOUS les coups de pied arrêtés", apply: () => chance(0.45)
        ? { txt: "Coup franc direct dès le match suivant. Égoïste, mais réparé. Les attaquants sont des créatures simples.", fx: { moral: 7, rep: 3, vest: -2 } }
        : { txt: "Trois coups francs dans le mur et un penalty raté plus tard, même le kiné tire les corners à ta place.", fx: { moral: -6, vest: -4, rep: -3 } } }
    ]
  },
  {
    id: "att_celebration", ico: "🎭", cat: "La célébration", min: 18, max: 99, once: true, w: 1,
    cond: (s) => s.poste === "ATT",
    text: () => "T'as préparé une célébration signature en secret avec ton frère : un truc entre la danse, le gang signe et la performance artistique. Il ne manque plus qu'un but pour la lâcher sur le monde.",
    choices: () => [
      { label: "La sortir en plein derby", apply: () => chance(0.55)
        ? { txt: "Le geste devient culte en 48h. Des gamins le font dans toutes les cours d'Europe. T'es entré dans la pop culture.", fx: { cha: 10, rep: 6, moral: 8 } }
        : { txt: "Un consultant y voit « un geste provocateur à caractère douteux ». Trois jours de polémique nationale pour une danse. Ce pays est fatigant.", fx: { rep: -6, cha: 3, moral: -3 } } },
      { label: "Rester sobre : doigt au ciel, merci, au revoir", apply: () => ({ txt: "Classique, propre, sans risque. Les marques familiales adorent les joueurs beiges.", fx: { rep: 2, disc: 2 } }) }
    ]
  }
);
