// MAXOU ELEVEN — données : création + événements
// Parodie de fiction, 18+. Tout est faux, personne n'est réel.
"use strict";

// ---------- utils ----------
const R = (a, b) => a + Math.random() * (b - a);
const RI = (a, b) => Math.floor(R(a, b + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const chance = (p) => Math.random() < p;
const fmtMoney = (k) => {
  k = Math.round(k);
  const s = k < 0 ? "-" : "";
  k = Math.abs(k);
  return k >= 1000 ? s + (k / 1000).toFixed(1).replace(".", ",") + " M€" : s + k + " k€";
};

const LBL = {
  tech: "Technique", phys: "Physique", mental: "Mental", cha: "Charisme",
  rep: "Réputation", disc: "Discipline", coach: "Relation coach", vest: "Vestiaire",
  forme: "Forme", moral: "Moral", argent: "💰", addiction: "❄️ Défonce", heat: "🚨 Problème judiciaire"
};

// ---------- création ----------
const PAYS = [
  { id: "fr", nom: "France", flag: "🇫🇷", desc: "Le pays des centres de formation et des polémiques à la con." },
  { id: "br", nom: "Brésil", flag: "🇧🇷", desc: "Le futsal, la plage, et des dribbleurs au mètre carré." },
  { id: "ar", nom: "Argentine", flag: "🇦🇷", desc: "On y naît avec un ballon et une grande gueule." },
  { id: "en", nom: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", desc: "Kick and rush, pintes et tabloïds qui te fument." },
  { id: "es", nom: "Espagne", flag: "🇪🇸", desc: "Le tiki-taka et les présidents véreux." },
  { id: "it", nom: "Italie", flag: "🇮🇹", desc: "La tactique, la mala, et des défenseurs qui mordent." },
  { id: "pt", nom: "Portugal", flag: "🇵🇹", desc: "Des ailiers qui pleurent et des agents qui encaissent." },
  { id: "sn", nom: "Sénégal", flag: "🇸🇳", desc: "La teranga, le talent brut, et des cousins qui veulent leur part." },
  { id: "ma", nom: "Maroc", flag: "🇲🇦", desc: "Le pays qui fait trembler les gros en Coupe du Monde." },
  { id: "dz", nom: "Algérie", flag: "🇩🇿", desc: "Des pieds gauches magiques et un caractère de chien." },
  { id: "be", nom: "Belgique", flag: "🇧🇪", desc: "La génération dorée qui n'a rien gagné. À toi de faire mieux." },
  { id: "de", nom: "Allemagne", flag: "🇩🇪", desc: "La machine. Efficace, froide, chiante." }
];

const PRENOMS = {
  fr: ["Kylian", "Enzo", "Rayan", "Mattéo", "Ibrahim", "Sofiane", "Théo", "Djibril"],
  br: ["Ronaldinho", "Vini", "Gabigol", "Neymar", "Endrick", "Cafu", "Rivaldo"],
  ar: ["Lautaro", "Julián", "Thiago", "Enzo", "Paulo", "Ángel"],
  en: ["Jayden", "Marcus", "Harry", "Jude", "Callum", "Reece"],
  es: ["Pablo", "Nico", "Álvaro", "Sergio", "Iker", "Dani"],
  it: ["Sandro", "Federico", "Nicolò", "Gianluigi", "Lorenzo"],
  pt: ["João", "Rafael", "Gonçalo", "Nuno", "Bernardo"],
  sn: ["Sadio", "Ismaïla", "Boulaye", "Pape", "Idrissa"],
  ma: ["Achraf", "Youssef", "Hakim", "Sofyan", "Bilal"],
  dz: ["Riyad", "Ismaël", "Yacine", "Houssem", "Amine"],
  be: ["Kevin", "Thibaut", "Romelu", "Eden", "Axel"],
  de: ["Kai", "Leon", "Jamal", "Florian", "Niclas"]
};
const NOMS = {
  fr: ["Diallo", "Martin", "Benzaïd", "Traoré", "Lefèvre", "Ndiaye", "Garcia", "Meunier"],
  br: ["Silva", "Santos", "Oliveira", "Souza", "Ferreira"],
  ar: ["Fernández", "Martínez", "Gómez", "Díaz", "Romero"],
  en: ["Smith", "Johnson", "Walker", "Sterling-Jones", "Bell"],
  es: ["García", "López", "Torres", "Navarro", "Moreno"],
  it: ["Rossi", "Esposito", "Romano", "Greco", "Conti"],
  pt: ["Ferreira", "Costa", "Santos", "Pereira", "Silva"],
  sn: ["Diop", "Ndiaye", "Sarr", "Gueye", "Mané"],
  ma: ["El Amrani", "Ziyani", "Bounou", "Haddadi", "Amrabat"],
  dz: ["Benzema", "Mahrez", "Slimani", "Bennacer", "Zerrouki"],
  be: ["Vermeulen", "De Smet", "Janssens", "Peeters", "Claes"],
  de: ["Müller", "Schmidt", "Wagner", "Becker", "Hoffmann"]
};

// personnages récurrents (générés par carrière, 100% fictifs)
const RIVALS = ["Killian Zango", "Noah Diabaté", "Tiago Furtado", "Ethan Nkulu", "Sofiane Merbah", "Loïs Vandenberg"];
const MICHTOS = ["Cindy", "Maeva", "Jessica", "Wendy", "Kellyana", "Shana"];
const POTES = ["Momo", "Djib", "Ryan", "Ibra", "Kev", "Nordine"];
const JOURNAS = ["Delcourt", "Sanchez-Piquet", "Verbruggen", "Da Fonseca", "Lambert-Riou"];

const POSTES = [
  { id: "ATT", ico: "⚡", nom: "Attaquant", desc: "Tu marques, t'es un dieu. Tu marques pas, t'es une merde. Simple." },
  { id: "MIL", ico: "🎩", nom: "Milieu", desc: "Le cerveau. Personne capte ce que tu fais, mais sans toi c'est le chaos." },
  { id: "DEF", ico: "🛡️", nom: "Défenseur", desc: "Zéro gloire, que des coups. Mais les vrais savent." },
  { id: "GK", ico: "🧤", nom: "Gardien", desc: "Une boulette et t'es un meme pour dix ans. Bon courage, taré." }
];

const ORIGINES = [
  {
    id: "cite", nom: "🏚️ La cité", desc: "Élevé au city-stade entre les deals et les mamans qui gueulent. Technique de rue, discipline de merde.",
    stats: { tech: 62, phys: 55, mental: 60, cha: 44, rep: 12, disc: 38, coach: 50, vest: 58 }, argent: 2
  },
  {
    id: "fils", nom: "👑 Fils de star du foot", desc: "Papa était pro. T'as le nom, le réseau, la pression… et tout le monde attend que tu te vautres.",
    stats: { tech: 55, phys: 52, mental: 40, cha: 62, rep: 38, disc: 50, coach: 55, vest: 45 }, argent: 150
  },
  {
    id: "centre", nom: "🏫 Centre de formation", desc: "Formaté depuis tes 8 ans. Propre, carré, chiant. Les recruteurs adorent les robots.",
    stats: { tech: 58, phys: 55, mental: 52, cha: 42, rep: 18, disc: 62, coach: 60, vest: 55 }, argent: 8
  },
  {
    id: "futsal", nom: "🌀 Futsal des soirs de galère", desc: "Des pieds soyeux forgés en salle. Le grand terrain ? Tu verras bien, gros.",
    stats: { tech: 68, phys: 42, mental: 50, cha: 48, rep: 14, disc: 46, coach: 52, vest: 56 }, argent: 4
  },
  {
    id: "tard", nom: "🧱 Sorti de nulle part", desc: "Personne croyait en toi. T'as la haine, le physique, et une revanche à prendre sur tout le monde.",
    stats: { tech: 46, phys: 63, mental: 66, cha: 38, rep: 5, disc: 55, coach: 52, vest: 52 }, argent: 3
  }
];

const ADOS = [
  { id: "moine", nom: "🥦 Moine soldat", desc: "Couché 21h30, zéro gramme d'alcool, blender de brocolis. Les autres te chambrent, les coachs bandent.", fx: { disc: 10, forme: 10, cha: -6, moral: -5 } },
  { id: "normal", nom: "😐 Normal, quoi", desc: "Sérieux à l'entraînement, chill le week-end. Ni robot ni épave.", fx: { disc: 3, moral: 3 } },
  { id: "defonce", nom: "🍻 Défonce précoce", desc: "Premières cuites à 15 piges, chicha, écrans jusqu'à 4h. Le talent fera le reste… hein ?", fx: { cha: 8, moral: 8, disc: -12, forme: -8, addiction: 5 } }
];

const ENTOURAGES = [
  { id: "daronne", nom: "👵 La daronne qui gère tout", desc: "Elle signe rien sans lire trois fois. T'es à l'abri des rats, mais elle te tient en laisse.", fx: { disc: 5, mental: 5 } },
  { id: "agent", nom: "🐀 L'agent véreux", desc: "Costard brillant, dents longues. Il te promet le Ballon d'Or et se sert au passage. 15% sur tout, bouffon.", fx: { rep: 6, cha: 3 } },
  { id: "bande", nom: "🤙 Les gars du bloc", desc: "Fidèles à la vie à la mort. Bruyants, ingérable, et toujours une embrouille en stock.", fx: { moral: 8, vest: 3, heat: 8 } }
];

// styles de jeu par poste (à 18 ans) — mult buts / passes
const STYLES = {
  ATT: [
    { id: "renard", nom: "🦊 Renard des surfaces", desc: "Vivre pour le but, rien d'autre.", g: 1.35, a: 0.6, fx: { tech: 2 } },
    { id: "dribbleur", nom: "🌀 Dribbleur de rue", desc: "Humilier d'abord, marquer ensuite.", g: 0.95, a: 1.25, fx: { cha: 3 } },
    { id: "complet", nom: "🎯 Attaquant complet", desc: "Peser partout, tout le temps.", g: 1.1, a: 1.0, fx: { phys: 2 } },
    { id: "fauxneuf", nom: "🎭 Faux neuf", desc: "L'attaquant chef d'orchestre.", g: 0.75, a: 1.5, fx: { mental: 2 } }
  ],
  MIL: [
    { id: "maestro", nom: "🎩 Maestro", desc: "Le tempo, c'est toi.", g: 0.5, a: 1.6, fx: { tech: 2 } },
    { id: "boucher", nom: "🪓 Boucher du milieu", desc: "On passe pas. Point.", g: 0.25, a: 0.6, fx: { phys: 3, vest: 3 } },
    { id: "b2b", nom: "📦 Box-to-box", desc: "80 kilomètres par match, poumons en titane.", g: 0.8, a: 1.1, fx: { phys: 2 } }
  ],
  DEF: [
    { id: "muraille", nom: "🧱 Muraille", desc: "Rien ne passe, même pas la lumière.", g: 0.25, a: 0.3, fx: { phys: 3 } },
    { id: "boucherdef", nom: "🪓 Boucher assumé", desc: "La cheville d'abord, le ballon si possible.", g: 0.15, a: 0.2, fx: { phys: 3, heat: 4 } },
    { id: "libero", nom: "🎩 Libéro chic", desc: "Relances laser et col relevé.", g: 0.3, a: 0.6, fx: { tech: 3 } }
  ],
  GK: [
    { id: "chat", nom: "🐈 Le Chat", desc: "Des réflexes de psychopathe.", g: 0.02, a: 0.05, fx: { mental: 3 } },
    { id: "fou", nom: "🤪 Fou furieux", desc: "Sorties kamikazes, hurlements, légende.", g: 0.05, a: 0.1, fx: { cha: 3 } },
    { id: "sweeper", nom: "👑 Gardien-libéro", desc: "Onzième joueur de champ, ego compris.", g: 0.05, a: 0.15, fx: { tech: 3 } }
  ]
};

// clubs
const CLUB_LEVELS = { REG: 48, D2: 58, D1: 68, ELITE: 80, GOLF: 56 };
const CLUBS_START = [
  { n: "Bourg-la-Boue", tier: "REG", desc: "Vestiaire qui pue la Ventoline, terrain en pente. Mais tu joueras, toi." },
  { n: "AS Ronds-Points", tier: "REG", desc: "Sponsorisé par le kebab d'en face. L'école de la débrouille." },
  { n: "Trifouillis FC", tier: "REG", desc: "Le coach est aussi le plombier du village. Ambiance." },
  { n: "Le Havre de Misère", tier: "D2", desc: "Club formateur solide. Du temps de jeu et des éducateurs pas trop cons." },
  { n: "Clermont Fiasco", tier: "D1", desc: "Centre pro réputé. Un vrai cap — si tu craques pas." },
  { n: "Racing de Strasbouffe", tier: "D1", desc: "Public chaud, pression réelle. Les faibles dégagent." },
  { n: "AS Monacash", tier: "ELITE", desc: "Centre d'élite, paillettes et requins. Tu seras un numéro parmi cent cracks." }
];
const CLUBS_D2 = ["Le Havre de Misère", "Grenoble-les-Flaques", "Pau-Paupières FC", "Rodez-vous en Enfer", "Amiens la Pluie"];
const CLUBS_D1 = ["Clermont Fiasco", "Racing de Strasbouffe", "FC Nantes-la-Grisaille", "Stade Rennais du Coin", "Toulouse Tranquille", "OGC Niche", "Montpellier-sur-Suée"];
const CLUBS_ELITE = ["Paris Saint-Blindé", "AS Monacash", "Olympique de Marseillance", "Real Magouille", "FC Barcelosers", "Manchester Shitty", "Loserpool FC", "Bayern Mucheprix", "Juventruc", "Inter Minable", "Borussia Tromblon", "Arsenal-les-Regrets"];
const CLUBS_GOLF = ["Al-Fricard FC", "Qatar Blingz SC", "Al-Nassr-du-Portefeuille"];

// couleurs de maillot [principale, secondaire] — clin d'œil aux vrais clubs parodiés
const CLUB_COLORS = {
  "Bourg-la-Boue": ["#8a6d3b", "#4a7c3f"],
  "AS Ronds-Points": ["#e07b28", "#f2ede0"],
  "Trifouillis FC": ["#4a7fb5", "#f2ede0"],
  "Le Havre de Misère": ["#1b3a6b", "#7db9e8"],
  "Grenoble-les-Flaques": ["#2456a4", "#eef2f6"],
  "Pau-Paupières FC": ["#e8c34a", "#2e7d4f"],
  "Rodez-vous en Enfer": ["#8c1c2c", "#e8c34a"],
  "Amiens la Pluie": ["#eef0f2", "#23272b"],
  "Clermont Fiasco": ["#c22d3f", "#20366b"],
  "Racing de Strasbouffe": ["#2f6fd6", "#f2f4f7"],
  "FC Nantes-la-Grisaille": ["#f0c832", "#1f7a3d"],
  "Stade Rennais du Coin": ["#d6212f", "#1c1c1c"],
  "Toulouse Tranquille": ["#5d3a8e", "#f2f0f6"],
  "OGC Niche": ["#c8102e", "#232323"],
  "Montpellier-sur-Suée": ["#e87722", "#1b2e5a"],
  "Paris Saint-Blindé": ["#1b2f5e", "#d6212f"],
  "AS Monacash": ["#d6212f", "#f5f5f2"],
  "Olympique de Marseillance": ["#f2f4f7", "#57b0dd"],
  "Real Magouille": ["#f5f5f2", "#c9971c"],
  "FC Barcelosers": ["#1f4e9c", "#8c1c3a"],
  "Manchester Shitty": ["#79c1e8", "#1b2f5e"],
  "Loserpool FC": ["#c8102e", "#f5f5f2"],
  "Bayern Mucheprix": ["#dc1f26", "#f5f5f2"],
  "Juventruc": ["#1c1c1c", "#f5f5f2"],
  "Inter Minable": ["#1f4e9c", "#1c1c1c"],
  "Borussia Tromblon": ["#f7d117", "#1c1c1c"],
  "Arsenal-les-Regrets": ["#dc1f26", "#f5f5f2"],
  "Al-Fricard FC": ["#1f8a4c", "#f5f5f2"],
  "Qatar Blingz SC": ["#7a1f3d", "#c9971c"],
  "Al-Nassr-du-Portefeuille": ["#f0c832", "#1b3a6b"]
};
function clubColors(n) {
  if (CLUB_COLORS[n]) return CLUB_COLORS[n];
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return ["hsl(" + h + ",55%,45%)", "hsl(" + ((h + 40) % 360) + ",50%,88%)"];
}

// presse : titres selon la saison
const PRESSE_BONNE = [
  "« {NOM} marche sur l'eau : la ligue est devenue son terrain de jeu privé »",
  "« Arrêtez tout : {NOM} est en train de niquer tous les records »",
  "« {NOM}, le patron. Les défenses prient avant chaque match »",
  "« Génie, taulier, monstre : les superlatifs manquent pour {NOM} »",
  "« Le championnat a un problème et ce problème s'appelle {NOM} »",
  "« {NOM} joue à un autre sport que les 21 autres, c'est gênant »",
  "« Les défenseurs demandent officiellement l'interdiction de {NOM} »",
  "« {NOM} : la saison où tout le monde a fermé sa gueule »",
  "« Vendez vos posters, achetez des statues : {NOM} est éternel »",
  "« {NOM} transforme chaque pelouse en scène de crime »"
];
const PRESSE_MOYENNE = [
  "« {NOM} : ni flop ni crack, juste un salaire qui tombe »",
  "« Une saison à la {NOM} : correcte, sans plus, comme un kebab tiède »",
  "« {NOM} souffle le chaud et le tiède »",
  "« {NOM}, l'art de faire 6,5 de moyenne toute une vie »",
  "« On attendait plus, on a eu ça : {NOM}, saison mi-figue mi-renoi »",
  "« {NOM} existe, c'est déjà ça : bilan d'une saison invisible »",
  "« Le mystère {NOM} : capable du meilleur, abonné au moyen »",
  "« {NOM} : le milieu de tableau fait homme »"
];
const PRESSE_NULLE = [
  "« Banc, tribunes, doutes : l'hiver sans fin de {NOM} »",
  "« {NOM}, le grand n'importe quoi : mais que fout-il de sa carrière ? »",
  "« Payé à rien foutre : enquête sur le naufrage {NOM} »",
  "« {NOM} court moins vite que sa réputation de fêtard »",
  "« Les supporters lancent une cagnotte pour payer le taxi de départ de {NOM} »",
  "« {NOM}, l'homme qui valait des millions (au passé) »",
  "« Scandale : {NOM} aurait été aperçu en train de courir »",
  "« De crack à crash : autopsie de la saison {NOM} »",
  "« {NOM} : même sa mère a arrêté de regarder les matchs »",
  "« Le vestiaire cherche encore à quoi sert {NOM} »"
];
const NEWS_FLASH = [
  "Un club anglais bat le record du transfert le plus cher pour un remplaçant de remplaçant.",
  "Un président de club jure « les mains sur le cœur » qu'il n'a jamais touché de valise. Il transpire.",
  "Un influenceur achète un club de D4 et promet la Ligue des Champions en trois ans. LOL.",
  "Un arbitre avoue qu'il siffle « au feeling ». Personne n'est surpris.",
  "Le Ballon d'Or lance une catégorie « meilleur joueur sur Instagram ».",
  "Un attaquant vedette rate un penalty et accuse la pelouse, le vent et son horoscope.",
  "La fédé lance un « plan anti-chichas » dans les centres de formation. Bonne chance.",
  "Un agent est filmé en train de vendre le même joueur à deux clubs. Promu employé du mois.",
  "Un défenseur central écrit un livre : « Dégager loin, penser jamais ». Déjà best-seller.",
  "Un club du Golfe rachète un stade entier pour le climatiser. La planète applaudit.",
  "Une VAR de 14 minutes annule un but pour « intention de hors-jeu ». Le foot est mort.",
  "Un gardien signe chez un club rival en story Insta avant de prévenir son président.",
  "Un coach est viré après 3 matchs. Son indemnité : le PIB d'un petit pays.",
  "Une mascotte est suspendue 6 mois pour simulation dans la surface.",
  "Un joueur de D2 déclare sa Rolex volée… qu'il porte sur la photo de la plainte.",
  "Le mercato d'hiver bat des records : un espoir de 15 ans vendu sur plan, comme un appart.",
  "Un ultra demande le remboursement de son abonnement « pour préjudice moral ».",
  "Un attaquant célèbre son but en montrant un tatouage de son propre visage. Vertige.",
  "Un président promet « zéro recrue bling-bling » puis signe trois Brésiliens en 48h.",
  "Une pelouse hybride coûte 3 M€ et meurt en une semaine. Le jardinier est en garde à vue.",
  "Un joueur rate le rassemblement : il s'est trompé de pays. De PAYS.",
  "Un sponsor de paris en ligne sponsorise la commission anti-addiction. Personne ne tique.",
  "Un milieu déclare : « Le pressing, c'est une mentalité. » Il n'a pas couru depuis 2024.",
  "Un club lance un maillot third rose fluo « hommage au territoire ». Rupture de stock."
];

// moments de saison (flavor dans le résumé)
const MOMENTS_BON = [
  "🎪 Remontada d'anthologie contre le rival : mené 3-0, gagné 3-4. Le stade a failli s'écrouler.",
  "🚀 Ton but de 35 mètres en pleine lucarne a fait le tour du monde en une nuit.",
  "🧨 Quadruplé en une mi-temps. Le speaker n'avait plus de voix, le gardien adverse plus de dignité.",
  "🛡️ Victoire à 9 contre 11 dans le choc de la saison. Une soirée de guerriers.",
  "🎯 Ton geste de la saison : une roulette-extérieur du pied qui a assis deux défenseurs. Poster instantané.",
  "📣 Le virage a sorti un tifo géant à ton effigie. T'as chialé en scred dans le tunnel."
];
const MOMENTS_MOYEN = [
  "🌧️ Un 0-0 sous la pluie battante dont personne ne se souvient déjà plus. Le foot, parfois, c'est ça.",
  "🤝 Six matchs nuls de suite. Les bookmakers ont fini par suspendre les paris sur vos matchs.",
  "🚌 Huit heures de bus pour perdre 1-0 sur penalty à la 96e. La vie de footballeur, la vraie.",
  "🥶 Match à -5°C reporté à la 60e pour brouillard. T'avais déjà plus de sensations dans les orteils.",
  "😴 Le match le plus chiant de la décennie selon la presse. T'y étais. Désolé pour toi."
];
const MOMENTS_NUL = [
  "🤡 Humiliation en coupe contre une équipe de sixième division. Leur buteur est plombier. PLOMBIER.",
  "🥵 6-0 dans le derby. Les supporters ont quitté le stade à la 30e en jetant leurs écharpes.",
  "🧊 Le kop a tourné le dos au terrain pendant 20 minutes. Le message est passé, glacial.",
  "📉 Trois expulsions, deux buts contre son camp, un penalty raté : votre équipe a inventé le chaos.",
  "🍅 Le bus de l'équipe accueilli aux légumes après la cinquième défaite de suite. Folklorique et mérité."
];

// badges (persistés en localStorage, débloqués en fin de carrière)
const BADGES = [
  { id: "titre", ico: "🏆", nom: "Le Sacre", desc: "Gagner un championnat", cond: (s) => s.career.titres > 0 },
  { id: "ldc", ico: "⭐", nom: "Étoilé", desc: "Gagner la Ligue des Champions", cond: (s) => s.career.ldc > 0 },
  { id: "cdm", ico: "🌍", nom: "Sur le toit du monde", desc: "Gagner la Coupe du Monde", cond: (s) => s.career.cdm > 0 },
  { id: "bo", ico: "🎖️", nom: "Ballon d'Or", desc: "Remporter un Ballon d'Or", cond: (s) => s.career.bo > 0 },
  { id: "legende", ico: "👑", nom: "Immortel", desc: "Finir avec 1100+ points de légende", cond: (s, lg) => lg >= 1100 },
  { id: "crapmag", ico: "🔥", nom: "Crapule magnifique", desc: "500+ légende ET 130+ crapule", cond: (s, lg, cr) => lg >= 500 && cr >= 130 },
  { id: "clean", ico: "🧼", nom: "Blanc comme neige", desc: "Retraite sans GAV, sans poudre, sans escort", cond: (s) => s.ended === "retraite" && s.ctr.gav === 0 && s.ctr.grammes === 0 && s.ctr.putes === 0 },
  { id: "od", ico: "⚰️", nom: "Revenu de l'autre côté", desc: "Survivre à une overdose", cond: (s) => !!s.flags.od_survecu },
  { id: "prison", ico: "⛓️", nom: "Parloir VIP", desc: "Finir sa carrière en prison", cond: (s) => s.ended === "prison" },
  { id: "banni", ico: "🚫", nom: "Persona non grata", desc: "Être radié à vie du football", cond: (s) => s.ended === "banni" || s.ended === "banni_dopage" },
  { id: "riche", ico: "🤑", nom: "Indécent", desc: "Finir avec 50 M€ ou plus", cond: (s) => s.argent >= 50000 },
  { id: "ruine", ico: "🕳️", nom: "Grandeur et décadence", desc: "Finir la carrière à sec (0 € ou moins)", cond: (s) => s.argent <= 0 },
  { id: "daron", ico: "👶", nom: "Daron malgré lui", desc: "Assumer un enfant caché", cond: (s) => !!s.flags.pension },
  { id: "pigeon", ico: "💍", nom: "Pigeon d'or", desc: "Se marier sans contrat de mariage", cond: (s) => !!s.flags.mariage_sans_contrat },
  { id: "golfe", ico: "🛢️", nom: "Vendu au pétrole", desc: "Finir sa carrière dans le Golfe", cond: (s) => s.tier === "GOLF" },
  { id: "chevre", ico: "🐐", nom: "La Chèvre", desc: "Marquer 300 buts en carrière", cond: (s) => s.career.buts >= 300 },
  { id: "fidele", ico: "📿", nom: "Homme d'un seul club", desc: "12+ saisons sous un seul maillot", cond: (s) => s.career.clubs.length === 1 && s.career.saisons >= 12 },
  { id: "fantome", ico: "👻", nom: "Monsieur Personne", desc: "Finir sans gloire ni scandale", cond: (s, lg, cr) => lg < 150 && cr < 30 },
  { id: "soiffard", ico: "🍾", nom: "Rat des boîtes", desc: "10 cuites en carrière", cond: (s) => s.ctr.cuites >= 10 },
  { id: "capitaine", ico: "🎩", nom: "Capitaine courage", desc: "Porter le brassard de capitaine", cond: (s) => !!s.flags.capitaine }
];

// ---------- ÉVÉNEMENTS ----------
// fmt: {id, ico, cat, min, max, once, cond(s), w, text(s), choices(s)=>[{label, desc?, apply()=>{txt, fx, ctr, flags, end, trait, injury, susp}}]}
const EVENTS = [

  // ===== jeunesse =====
  {
    id: "compil", ico: "📱", cat: "Réseaux", min: 16, max: 18, once: true,
    text: () => "Ton pote filme tes gestes à l'entraînement et veut poster la compil : « Frérot, tu vas exploser les compteurs, wallah. »",
    choices: () => [
      { label: "Poste ça, qu'ils voient le crack", apply: () => chance(0.7)
        ? { txt: "2 millions de vues. Les recruteurs demandent ton blaze, les meufs aussi.", fx: { cha: 4, rep: 10, moral: 5 } }
        : { txt: "300 vues, dont ta tante. Et le coach a vu que tu te la pétais. Gros malaise.", fx: { rep: 1, coach: -5, moral: -3 } } },
      { label: "Refuse, le terrain d'abord", apply: () => ({ txt: "Le coach apprend que t'as refusé. « Enfin un qui a pas la tête dans son cul. »", fx: { disc: 4, coach: 5 } }) }
    ]
  },
  {
    id: "jeuxvideo", ico: "🎮", cat: "Hygiène de vie", min: 16, max: 19, once: true,
    text: () => "Les sessions de jeu s'éternisent jusqu'à 4h du mat'. Le staff a vu tes cernes de zombie et tes réflexes de moule.",
    choices: () => [
      { label: "Couvre-feu strict, t'es pas là pour glander", apply: () => ({ txt: "Chiant mais efficace. Ton corps te dit merci.", fx: { disc: 5, forme: 6, moral: -3 } }) },
      { label: "Assumer : ça te détend, merde", apply: () => chance(0.5)
        ? { txt: "Tu gères ton sommeil comme un grand. Ça passe.", fx: { moral: 4 } }
        : { txt: "Endormi sur la table de massage. Amende, moqueries, réputation de branleur.", fx: { rep: -2, forme: -5, disc: -6 }, ctr: { amendes: 1 } } }
    ]
  },
  {
    id: "premiere_paye", ico: "💶", cat: "Première paye", min: 16, max: 18, once: true,
    text: (s) => "Premier virement : " + fmtMoney(Math.max(5, s.contract.salary / 12)) + ". T'as jamais vu autant de zéros. Tes doigts tremblent au distributeur.",
    choices: () => [
      { label: "Tout claquer : sape, chaîne en or, bouteilles", apply: () => ({ txt: "T'es rincé en une semaine mais la photo Insta a cassé le game.", fx: { argent: -10, cha: 5, moral: 6, disc: -3 } }) },
      { label: "Tout envoyer à ta daronne", apply: () => ({ txt: "Elle pleure au téléphone. T'as gagné plus que trois buts aujourd'hui.", fx: { mental: 5, rep: 3, moral: 4 } }) },
      { label: "Placer, comme un vieux radin", apply: () => ({ txt: "Ton banquier hallucine : « Un footballeur qui épargne ? » Les intérêts bosseront pour toi.", fx: { argent: 8, mental: 3, cha: -2 } }) }
    ]
  },
  {
    id: "racket", ico: "🔪", cat: "Le quartier", min: 16, max: 19, once: true, cond: (s) => s.origine === "cite",
    text: () => "Les grands du quartier ont capté que tu touches. « Petit frère, tu vas pas nous oublier hein ? » C'est pas une question.",
    choices: () => [
      { label: "Lâcher l'enveloppe, pas d'embrouille", apply: () => ({ txt: "Ça calme tout le monde. Mais maintenant t'es un distributeur automatique.", fx: { argent: -15, moral: -4, heat: 3 } }) },
      { label: "Refuser, tu dois rien à personne", apply: () => chance(0.5)
        ? { txt: "Ça monte en pression, mais ton nom te protège. Respect gagné à l'arrache.", fx: { mental: 6, rep: 2 } }
        : { txt: "Pneus crevés, rétros arrachés, menaces. Tu dors mal pendant des semaines.", fx: { moral: -8, forme: -4, heat: 6 } } },
      { label: "Déménager ta famille en urgence", apply: () => ({ txt: "Ça coûte un bras mais tout le monde respire. Ta mère a un jardin maintenant.", fx: { argent: -40, mental: 5, moral: 5 } }) }
    ]
  },
  {
    id: "dealer_bloc", ico: "🚬", cat: "Le quartier", min: 17, max: 21, once: true, cond: (s) => s.origine === "cite" || s.entourage === "bande",
    text: (s) => s.perso.pote + ", ton pote d'enfance, stocke « deux-trois trucs » dans ta caisse. « T'inquiète frère, personne fouille la voiture d'un joueur pro. »",
    choices: () => [
      { label: "Laisser faire, c'est le sang", apply: () => chance(0.65)
        ? { txt: "Rien ne se passe. Cette fois.", fx: { moral: 2, heat: 10 } }
        : { txt: "Contrôle routier. Le chien s'excite. T'expliques au commissariat que « c'est pas à toi ». Classique.", fx: { heat: 20, rep: -10, moral: -6 }, ctr: { gav: 1 } } },
      { label: "Couper les ponts, ça pue trop", apply: () => ({ txt: "« T'as changé, frère. » Ouais. C'est le but, en fait.", fx: { moral: -5, mental: 4, heat: -5 } }) }
    ]
  },

  // ===== nuit / vices =====
  {
    id: "premiere_cuite", ico: "🍾", cat: "La nuit", min: 17, max: 20, once: true,
    text: () => "Premier carré VIP. Bouteilles qui pètent, basses dans le sternum, tout le monde connaît ton nom. Bienvenue dans la machine à broyer.",
    choices: () => [
      { label: "Enchaîner les bouteilles comme un prince", apply: () => chance(0.6)
        ? { txt: "Soirée de légende. T'as la tête à l'envers mais des étoiles plein les yeux.", fx: { moral: 8, cha: 4, forme: -5, argent: -8, disc: -3 }, ctr: { cuites: 1 } }
        : { txt: "Story de toi en train de vomir sur le videur. 400k vues avant le réveil.", fx: { moral: 3, rep: -6, forme: -6, argent: -8 }, ctr: { cuites: 1 } } },
      { label: "Un verre et tu rentres", apply: () => ({ txt: "T'es parti à minuit comme un fonctionnaire. Le staff apprécie, tes potes non.", fx: { disc: 3, forme: 2, cha: -2 } }) }
    ]
  },
  {
    id: "coke_intro", ico: "❄️", cat: "La poudre", min: 18, max: 99, once: true,
    text: () => "Chiottes du VIP. La star de l'équipe te tend un sachet avec un clin d'œil : « Ça reste entre nous, petit. Tout le vestiaire y passe. »",
    choices: () => [
      { label: "Sniffer, t'es pas une balance ni une fiotte", apply: () => ({ txt: "Boum. T'as l'impression d'être immortel pendant trois heures. C'est exactement comme ça qu'ils t'ont eu.", fx: { moral: 10, vest: 6, addiction: 18, forme: -3 }, ctr: { grammes: 1 } }) },
      { label: "Refuser cash", apply: () => ({ txt: "« C'est bon, j'ai compris, monsieur propre. » Le clan des tarés te raye de la liste.", fx: { vest: -6, disc: 4, mental: 3 } }) },
      { label: "Faire semblant et jeter le sachet", apply: () => chance(0.7)
        ? { txt: "Ni vu ni connu. T'as gardé le respect ET tes narines.", fx: { mental: 5, vest: 2 } }
        : { txt: "Il t'a cramé direct. « Tu me prends pour un con ? » Ambiance glaciale.", fx: { vest: -8, moral: -3 } } }
    ]
  },
  {
    id: "coke_relapse", ico: "❄️", cat: "La poudre", min: 18, max: 99, cond: (s) => s.addiction >= 10, w: 2.2, cd: 1,
    text: (s) => s.addiction > 50
      ? pick([
        "3h du mat'. Ton dealer répond plus. Tu tournes en rond dans ton salon à 4 millions comme un rat en cage.",
        "Tu caches des sachets dans la chasse d'eau, la boîte à gants, le sac de crampons. Tu te fais peur à toi-même.",
        "Ton nez saigne à l'entraînement devant tout le monde. « L'air sec », tu dis. Personne ne te croit, tout le monde se tait."
      ])
      : pick([
        "Le petit démon revient gratter : « Allez, juste un rail, c'est la fête, personne saura. »",
        "Anniversaire d'un coéquipier. Quelqu'un dessine des lignes sur le marbre de la cuisine comme si c'était du sel de bain. Les regards se tournent vers toi.",
        "Grosse victoire, adrénaline en fusion. Le mec de la table d'à côté tapote sa narine avec un sourire entendu. Ton cerveau dit non. Ton corps négocie déjà."
      ]),
    choices: (s) => [
      { label: "Recharger, tant pis (" + fmtMoney(Math.round(2 + s.addiction / 8)) + ")", apply: () => ({ txt: "Le soulagement, puis la honte, puis le trou. La spirale, quoi.", fx: { moral: 5, addiction: RI(6, 14), forme: -4, argent: -(2 + Math.round(S.addiction / 8)) }, ctr: { grammes: RI(2, 6) } }) },
      { label: "Serrer les dents, appeler personne", apply: () => chance(0.55)
        ? { txt: "Nuit de merde, sueurs froides. Mais au réveil, t'es encore debout. Petit à petit.", fx: { mental: 5, addiction: -10, moral: -4 } }
        : { txt: "T'as tenu 4 heures. Puis t'as craqué comme une brindille.", fx: { addiction: RI(4, 10), moral: -6, argent: -5, forme: -3 }, ctr: { grammes: RI(1, 4) } } }
    ]
  },
  {
    id: "escort", ico: "💋", cat: "La chair", min: 18, max: 99, w: 1.6,
    text: () => pick([
      "Une escort connue du milieu te DM : « Tarif joueur pro : 8 000 la nuit. Discrétion garantie, bébé. » Ton pouce hésite au-dessus de l'écran.",
      "Déplacement à l'étranger. Le concierge de l'hôtel te glisse une carte : « Service très exclusif, monsieur. Vos coéquipiers connaissent déjà. »",
      "Un ancien du vestiaire organise une « soirée privée » dans une villa. Le genre de soirée où les invitées sont payées et les téléphones confisqués à l'entrée.",
      "Après la victoire, une bouteille arrive à ta table « offerte par mademoiselle ». Elle te fixe. Son manager aussi. Tout ici a un tarif, toi compris."
    ]),
    choices: () => [
      { label: "Payer. T'es riche, t'es seul, ta gueule.", apply: () => {
          const roll = Math.random();
          if (roll < 0.55) return { txt: "Nuit de folie, zéro sentiment, gros trou dans le compte. Le glamour du foot moderne.", fx: { argent: -8, moral: 7, forme: -2 }, ctr: { putes: 1 } };
          if (roll < 0.75) return { txt: "Au réveil, elle a filmé. « 200 000 ou tout part à la presse. » Bienvenue dans le game, pigeon.", fx: { argent: -8, moral: -5 }, ctr: { putes: 1 }, flags: { chantage: true } };
          if (roll < 0.9) return { txt: "Un paparazzi planqué devant l'hôtel. Photos floues mais tout le monde a reconnu ta dégaine.", fx: { argent: -8, rep: -8, moral: 2 }, ctr: { putes: 1 } };
          return { txt: "Quinze jours plus tard, le doc te regarde par-dessus ses lunettes : « Faut qu'on parle. » Antibiotiques et humiliation.", fx: { argent: -10, forme: -8, moral: -4 }, ctr: { putes: 1 } };
        } },
      { label: "Négocier, on n'est pas des pigeons", apply: () => chance(0.4)
        ? { txt: "Moitié prix. T'es le seul mec au monde à marchander ça et t'en es fier, gros rat.", fx: { argent: -4, moral: 5, cha: 2 }, ctr: { putes: 1 } }
        : { txt: "Screenshot de ta négo balancé sur X : « Le joueur le plus radin de la ligue ». Mort de honte.", fx: { rep: -6, cha: -4, moral: -5 } } },
      { label: "Bloquer. Tu vaux mieux que ça (si, si)", apply: () => ({ txt: "Tu fermes l'appli et tu vas courir. Qui es-tu et qu'as-tu fait du vrai toi ?", fx: { disc: 3, mental: 3, moral: -2 } }) }
    ]
  },
  {
    id: "sextape", ico: "📼", cat: "Chantage", min: 18, max: 99, once: true, cond: (s) => s.flags.chantage, w: 99,
    text: () => "Le chantage à la sextape se précise : « 200 000 avant vendredi ou t'es la une de tous les torchons d'Europe. »",
    choices: () => [
      { label: "Payer et faire disparaître ça", apply: () => chance(0.7)
        ? { txt: "Le fichier disparaît. Ton compte aussi, à moitié. T'apprends la vie.", fx: { argent: -200, moral: -3 }, flags: { chantage: false } }
        : { txt: "Elle a pris l'argent ET vendu la vidéo. Double peine, gros naïf.", fx: { argent: -200, rep: -15, moral: -10 }, flags: { chantage: false } } },
      { label: "Aller voir les flics", apply: () => ({ txt: "Plainte déposée, réseau démantelé. Ça fuite un peu mais t'as la loi avec toi, pour une fois.", fx: { rep: -4, mental: 6, heat: -5 }, flags: { chantage: false } }) },
      { label: "« Balance, j'assume tout »", apply: () => chance(0.5)
        ? { txt: "La vidéo sort. Scandale une semaine… puis les gens te trouvent légendaire. Internet est bizarre.", fx: { rep: -8, cha: 10, moral: 3 }, flags: { chantage: false } }
        : { txt: "La vidéo sort. Les sponsors te lâchent un par un comme des rats.", fx: { rep: -18, argent: -100, moral: -8 }, flags: { chantage: false } } }
    ]
  },
  {
    id: "casino", ico: "🎰", cat: "Le flambe", min: 19, max: 99, cond: (s) => s.argent > 100, w: 1.2,
    text: () => pick([
      "Soirée casino avec les anciens du vestiaire. Le croupier te reconnaît. Les jetons brillent comme des promesses de merde.",
      "Un coéquipier te montre son appli de paris crypto : « Frère, j'ai fait ×10 cette nuit. » Il oublie de mentionner les trois fois où il a tout perdu.",
      "Cercle de poker privé dans l'arrière-salle d'un resto. Autour de la table : deux rappeurs, un promoteur véreux et un mec qui ne cligne jamais des yeux."
    ]),
    choices: (s) => [
      { label: "All-in comme un taré (" + fmtMoney(Math.round(s.argent * 0.3)) + ")", apply: () => {
          const mise = Math.round(S.argent * 0.3);
          return chance(0.42)
            ? { txt: "JACKPOT. La table hurle, tu doubles ta mise. T'es invincible (non).", fx: { argent: mise, moral: 10, cha: 3 } }
            : { txt: "Rincé en quarante minutes. Le videur te raccompagne avec un regard de pitié.", fx: { argent: -mise, moral: -8 } };
        } },
      { label: "Petit flambeur, 10k max", apply: () => chance(0.5)
        ? { txt: "+15k et l'ego qui va avec. Tu t'arrêtes à temps, miracle.", fx: { argent: 15, moral: 4 } }
        : { txt: "-10k, soirée moyenne, clope au valet parking.", fx: { argent: -10, moral: -2 } } },
      { label: "Regarder les autres se ruiner", apply: () => ({ txt: "Spectacle gratuit : un coéquipier perd sa Ferrari sur un tapis. Instructif.", fx: { mental: 3, moral: 2 } }) }
    ]
  },
  {
    id: "paris_truques", ico: "🤝", cat: "Magouille", min: 21, max: 99, once: true, cond: (s) => s.heat > 15 || s.argent < 50,
    text: () => "Un type en survêt Lacoste t'aborde au parking : « 500 000 cash. Tu te troues juste au bon moment samedi. Personne saura jamais rien. »",
    choices: () => [
      { label: "Accepter. Le fric, c'est le fric.", apply: () => chance(0.6)
        ? { txt: "Tu rates l'immanquable, ton équipe perd, la mallette arrive. Tu dors avec une boule au ventre.", fx: { argent: 500, moral: -8, heat: 25, mental: -5 }, ctr: { magouilles: 1 }, flags: { paris: true } }
        : { txt: "La cellule anti-fraude avait tout tracé. Perquisition à 6h. C'est terminé pour toi, bouffon.", end: "banni" } },
      { label: "Refuser poliment et oublier", apply: () => ({ txt: "Le mec sourit : « Comme tu veux, champion. » Tu regardes derrière toi pendant deux semaines.", fx: { mental: 3, heat: 3 } }) },
      { label: "Balancer à la fédé", apply: () => chance(0.7)
        ? { txt: "Réseau démantelé. Les instances te félicitent en off. T'es un exemple (et une balance, selon le quartier).", fx: { rep: 8, heat: -15, vest: -3 } }
        : { txt: "L'enquête foire et ton nom fuite comme indic. Gênant au possible.", fx: { rep: -5, vest: -8, heat: 5 } } }
    ]
  },
  {
    id: "lambo", ico: "🏎️", cat: "Le bolide", min: 19, max: 99, once: true, cond: (s) => s.argent > 400,
    text: () => "Le concessionnaire t'appelle par ton prénom. La Lambo verte fluo te fait de l'œil. 350 000 balles de crise de la vingtaine.",
    choices: () => [
      { label: "Signer. Vroum vroum, bâtard.", apply: () => ({ txt: "Le quartier entier entend ton pot d'échappement. T'es une légende locale et un cliché ambulant.", fx: { argent: -350, cha: 8, moral: 8, rep: 2 }, flags: { lambo: true } }) },
      { label: "Prendre une berline grise de daron", apply: () => ({ txt: "Fiable, discrète, chiante à mourir. Ton banquier t'aime. Personne d'autre.", fx: { argent: -60, mental: 3, cha: -3 } }) }
    ]
  },
  {
    id: "lambo_bourre", ico: "🚔", cat: "La route", min: 19, max: 99, cond: (s) => s.flags.lambo && s.ctr.cuites > 0, w: 1.4,
    text: () => pick([
      "4h du mat', sortie de boîte, la tête qui tourne. La Lambo est garée là. L'appart est à 15 bornes. Le chauffeur VTC affiche 25 minutes d'attente.",
      "Mariage d'un coéquipier, open bar fatal. Tout le monde est reparti. Reste toi, tes clés, et une ligne droite de 20 bornes qui te fait de l'œil.",
      "After improvisé, t'as « juste bu deux verres » (huit). Un pote te lance les clés de ta propre caisse : « Vas-y montre le moteur ! » Les téléphones sortent déjà."
    ]),
    choices: () => [
      { label: "Conduire, ça va, tu « gères »", apply: () => {
          const roll = Math.random();
          if (roll < 0.5) return { txt: "T'arrives entier. T'es un miraculé et un connard irresponsable, dans cet ordre.", fx: { moral: 2, heat: 4 } };
          if (roll < 0.8) return { txt: "Contrôle. Éthylotest qui explose. GAV, retrait de permis, une de la presse locale.", fx: { rep: -12, argent: -30, heat: 15, moral: -6 }, ctr: { gav: 1, amendes: 1 } };
          if (roll < 0.97) return { txt: "Rail de sécurité. La Lambo est pliée en deux, toi presque. Six mois de rééducation, gros débile.", fx: { phys: -8, forme: -25, rep: -10, argent: -100, moral: -10 }, injury: true, flags: { lambo: false } };
          return { txt: "T'as pas vu le platane. Le platane t'a vu.", end: "accident" };
        } },
      { label: "Attendre le VTC comme un adulte", apply: () => ({ txt: "25 minutes à grelotter devant la boîte. Vivant, par contre.", fx: { mental: 3, argent: -1 } }) }
    ]
  },
  {
    id: "kebab_nuit", ico: "🥙", cat: "Hygiène de vie", min: 17, max: 99, w: 0.8,
    text: () => pick([
      "3h du mat'. Le grec en bas de chez toi t'appelle comme une sirène. Sauce blanche samouraï, frites dedans. Le nutritionniste du club dort, lui.",
      "Le livreur connaît ton code d'immeuble par cœur : tacos XL 4 viandes, cheddar fondu. Ta montre connectée va faire une syncope.",
      "Buffet à volonté à l'hôtel du stage. Le préparateur physique surveille… mais il vient de partir aux chiottes. La fenêtre de tir est ouverte.",
      "Ta grand-mère a cuisiné « un petit truc » : un couscous pour douze. Refuser serait un crime familial. En manger serait un crime professionnel."
    ]),
    choices: () => [
      { label: "Vas-y, régale-toi, on vit qu'une fois", apply: () => ({ txt: pick(["Orgasme gustatif, 4 000 calories. Le lendemain t'as les jambes en parpaing.", "T'as mangé comme un roi déchu. La balance du club affiche +2,3 kg et le staff affiche ta photo.", "Aucun regret. Enfin si, un seul, vers la 70e minute du match suivant."]), fx: { moral: 5, forme: -5 } }) },
      { label: "Rentrer manger tes graines", apply: () => ({ txt: pick(["Quinoa froid devant le frigo ouvert. La gloire a un goût de carton.", "Blanc de poulet, brocolis vapeur, larme discrète. Ton corps te dira merci, ton âme jamais.", "Tu résistes. Le nutritionniste t'enverrait un cœur s'il avait des sentiments."]), fx: { forme: 3, moral: -3, disc: 2 } }) }
    ]
  },
  {
    id: "bagarre_boite", ico: "🥊", cat: "Embrouille", min: 18, max: 99, w: 1.1,
    text: () => pick([
      "En boîte, un gros bras te chauffe : « T'es qu'une merde surcotée, et ta meuf elle me regarde. » Son crew ricane. Tout le monde te filme déjà.",
      "Un supporter adverse bourré te colle au carré VIP : « À cause de toi j'ai perdu 500 balles, tu vas me les rembourser. » Il postillonne à dix centimètres.",
      "Un streamer te suit dans la boîte, caméra au poing : « Réagis à ton pire match, frérot, c'est pour le contenu ! » Sa communauté hurle en direct.",
      "Sortie de restau. Un mec claque une photo de ta copine sans demander, puis te tend le majeur quand tu le regardes. Sa bande attend la suite en souriant."
    ]),
    choices: () => [
      { label: "Le plier devant tout le monde", apply: () => chance(0.55)
        ? { txt: "Une droite, il s'endort. La vidéo fait le tour du pays. Le quartier est fier, ton président beaucoup moins.", fx: { rep: -8, cha: 6, vest: 4, heat: 12, moral: 5 }, ctr: { bagarres: 1 } }
        : { txt: "C'était un cage-fighter. Tu finis aux urgences avec l'arcade ouverte et l'ego en miettes.", fx: { forme: -12, rep: -6, moral: -8, heat: 8 }, ctr: { bagarres: 1 }, injury: chance(0.4) } },
      { label: "Sourire et partir", apply: () => ({ txt: "« C'est ça, casse-toi ! » Il parade. Toi tu joues samedi, lui il pointe lundi. Victoire par KO technique.", fx: { mental: 5, disc: 2, moral: -3 } }) },
      { label: "Envoyer la sécu s'en occuper", apply: () => ({ txt: "Deux armoires l'éjectent. Efficace, mais « le joueur qui se cache derrière les videurs », ça fait jaser.", fx: { cha: -3, mental: 2 } }) }
    ]
  },
  {
    id: "descente_after", ico: "🚨", cat: "Descente", min: 18, max: 99, cond: (s) => s.addiction > 20 || s.heat > 30, w: 1.5,
    text: () => pick([
      "After clandé chez un rappeur. 5h du mat' : BAM BAM BAM. « POLICE ! » Il y a de tout sur la table basse, et rien qui t'appartient, évidemment.",
      "Soirée sur un yacht « prêté par un ami d'ami ». Les douanes accostent à 6h. L'ami d'ami, lui, a disparu à la nage.",
      "Villa louée en cash pour l'anniv d'un pote. Les voisins ont appelé les flics pour le bruit. Les flics, eux, s'intéressent beaucoup plus à ce qu'il y a sur la table."
    ]),
    choices: () => [
      { label: "Sauter par la fenêtre du premier", apply: () => chance(0.5)
        ? { txt: "Réception de chat sur la benne à ordures. Tu cours en claquettes dans la nuit. Légendaire et pathétique.", fx: { moral: 4, forme: -4, heat: 3 } }
        : { txt: "Cheville explosée sur le trottoir. Les flics te ramassent en te filmant. Double humiliation.", fx: { forme: -15, heat: 12, rep: -8 }, ctr: { gav: 1 }, injury: true } },
      { label: "Rester calme, laisser ton avocat parler", apply: () => ({ txt: "GAV de 24h, nuit sur un banc en béton, relâché sans poursuite. Ton nom est dans le dossier quand même.", fx: { heat: 10, rep: -5, moral: -5 }, ctr: { gav: 1 } }) }
    ]
  },
  {
    id: "cure", ico: "🏥", cat: "La chute", min: 19, max: 99, cond: (s) => s.addiction >= 50, w: 3,
    text: () => "Le doc du club te convoque, porte fermée : « Tes analyses sont dégueulasses. Soit tu pars en cure discrète en Suisse, soit tu finis en fait divers. »",
    choices: () => [
      { label: "Accepter la cure (discrétion payante)", apply: () => ({ txt: "Trois mois de clinique entre un chanteur has-been et un trader. Tu ressors vivant. C'est déjà énorme.", fx: { argent: -150, addiction: -45, forme: 10, moral: 5, mental: 8 } }) },
      { label: "« Ça va, je gère, docteur »", apply: () => ({ txt: "Tu gères que dalle et tout le monde le sait. Le staff te regarde comme une bombe à retardement.", fx: { addiction: 8, coach: -8, moral: -4 } }) }
    ]
  },

  // ===== michto / famille =====
  {
    id: "dm_influenceuse", ico: "💅", cat: "Love story", min: 18, max: 26, once: true,
    text: (s) => s.perso.michto + ", influenceuse à 2M d'abonnés, te DM : « Salut toi 😏 ». Son feed : Dubaï, Maserati, et trois ex-footballeurs ruinés.",
    choices: () => [
      { label: "Foncer, elle est bonne", apply: () => ({ txt: "Couple officiel en trois semaines. Elle poste tout, elle dépense tout. T'es heureux… non ?", fx: { moral: 8, cha: 5, argent: -30, disc: -3 }, flags: { michto: true }, ctr: { michtos: 1 } }) },
      { label: "Ghoster, tu connais le film", apply: () => ({ txt: "Elle DM ton coéquipier dans l'heure. CQFD, gros.", fx: { mental: 4, moral: -2 } }) }
    ]
  },
  {
    id: "mariage_michto", ico: "💍", cat: "Love story", min: 23, max: 99, once: true, cond: (s) => s.flags.michto,
    text: (s) => s.perso.michto + " veut le mariage. Grand jeu, 800 invités, drone, robe italienne. Ton avocat te supplie de signer un contrat de séparation de biens.",
    choices: () => [
      { label: "Mariage sans contrat, l'amour, le vrai", apply: () => ({ txt: "Sublime cérémonie. Ton avocat pleure, mais pas d'émotion.", fx: { argent: -300, moral: 10, cha: 3 }, flags: { mariage_sans_contrat: true } }) },
      { label: "Contrat de mariage béton", apply: () => ({ txt: "Elle fait la gueule pendant un mois et ton nom devient « radin » sur les forums. Mais ton patrimoine respire.", fx: { argent: -150, moral: -5, mental: 5 } }) },
      { label: "Rompre. T'as enfin capté le plan.", apply: () => ({ txt: "Interview vengeresse dans la presse people dès la semaine suivante : « Il est nul au lit et il pue. » Merci pour tout.", fx: { moral: -8, rep: -5, argent: -20 }, flags: { michto: false, michto_rompu: true } }) }
    ]
  },
  {
    id: "enfant_cache", ico: "👶", cat: "Paternité", min: 22, max: 99, once: true, cond: (s) => s.ctr.putes >= 2 || s.flags.michto,
    text: () => "Courrier recommandé : demande de test de paternité. Tu te souviens vaguement du prénom. Le test est positif, champion.",
    choices: () => [
      { label: "Assumer, être un vrai daron", apply: () => ({ txt: "Tu découvres un môme de deux ans qui a ton nez. Ça te retourne le cerveau dans le bon sens.", fx: { mental: 8, rep: 4, moral: 5 }, flags: { pension: true } }) },
      { label: "Nier et envoyer les avocats", apply: () => chance(0.3)
        ? { txt: "Procédure enterrée sous les recours. T'as « gagné ». Tu dors moyen, par contre.", fx: { argent: -80, moral: -6, mental: -4 } }
        : { txt: "Procès perdu, pension doublée, et une du magazine Voici : « Le père indigne ». Bravo.", fx: { argent: -150, rep: -12, moral: -8 }, flags: { pension: true } } }
    ]
  },
  {
    id: "pote_prison", ico: "⛓️", cat: "Le quartier", min: 22, max: 99, once: true, cond: (s) => s.origine === "cite" || s.entourage === "bande",
    text: (s) => s.perso.pote + " vient de prendre quatre ans ferme. Sa mère t'appelle en pleurant : mandats, avocat, loyer. T'es sa seule carte.",
    choices: () => [
      { label: "Tout financer sans compter", apply: () => ({ txt: "Avocat, mandats, famille. Il te le revaudra jamais et c'est pas grave. C'est le sang.", fx: { argent: -60, mental: 5, moral: 4, rep: 2 } }) },
      { label: "Un geste, une fois, c'est tout", apply: () => ({ txt: "Tu fais le minimum syndical. Personne ne dit rien, tout le monde a noté.", fx: { argent: -15, moral: -3 } }) },
      { label: "Changer de numéro", apply: () => ({ txt: "Le quartier a un mot pour ça : « ingrat ». Il colle longtemps, ce mot.", fx: { moral: -6, vest: -2, heat: 4 } }) }
    ]
  },

  // ===== business / système =====
  {
    id: "agent_vole", ico: "🐀", cat: "Le rat", min: 20, max: 99, once: true, cond: (s) => s.entourage === "agent",
    text: () => "Un journaliste t'envoie des documents : ton agent prend 30% au lieu de 15, et il a touché des deux côtés sur ton dernier transfert. Le rat.",
    choices: () => [
      { label: "Le virer violemment et médiatiquement", apply: () => ({ txt: "Il balance des dossiers sur toi en représailles, mais t'es libre. Ta daronne reprend les négos.", fx: { rep: -6, mental: 6, moral: 5, argent: -50 }, flags: { agent_vire: true } }) },
      { label: "Fermer ta gueule, il connaît trop de monde", apply: () => ({ txt: "Tu continues de te faire plumer en souriant sur les photos. Confort de lâche.", fx: { moral: -6, mental: -3 } }) },
      { label: "Renégocier à 5% avec menace de procès", apply: () => chance(0.6)
        ? { txt: "Il plie. T'as gagné le bras de fer sans casser la vitrine. Patron.", fx: { mental: 6, cha: 3, argent: 40 } }
        : { txt: "Il contre-attaque avec un procès bidon. Deux ans de procédure et des frais d'avocat obscènes.", fx: { argent: -120, moral: -6 } } }
    ]
  },
  {
    id: "fisc", ico: "🏝️", cat: "Optimisation", min: 23, max: 99, once: true, cond: (s) => s.argent > 2000,
    text: () => "Un « conseiller en gestion de patrimoine » bronzé te propose un montage : droits à l'image aux Îles Vierges, société écran à Malte. « Tout le monde le fait, mon ami. »",
    choices: () => [
      { label: "Signer, l'impôt c'est pour les pauvres", apply: () => ({ txt: "Tu économises des millions. Le document que t'as signé sans lire fait 74 pages. Ça sent le sapin fiscal.", fx: { argent: 400, heat: 15, mental: -3 }, flags: { fraude: true }, ctr: { magouilles: 1 } }) },
      { label: "Payer tes impôts comme un pigeon fier", apply: () => ({ txt: "Ton comptable hallucine. « T'es le seul joueur du top 5 à faire ça. » Tu dors comme un bébé.", fx: { mental: 5, moral: 3 } }) }
    ]
  },
  {
    id: "redressement", ico: "📋", cat: "Le fisc se réveille", min: 24, max: 99, once: true, cond: (s) => s.flags.fraude, w: 2,
    text: () => "Contrôle fiscal surprise. L'inspectrice pose ton montage maltais sur la table, page 74 surlignée en jaune. Elle sourit. Pas toi.",
    choices: () => [
      { label: "Négocier et tout rembourser", apply: () => ({ txt: "Redressement, pénalités, excuses publiques écrites par ton attaché de presse. Ça pique très fort.", fx: { argent: -900, rep: -10, heat: -10, moral: -8 }, flags: { fraude: false }, ctr: { amendes: 1 } }) },
      { label: "Nier en bloc avec tes avocats", apply: () => chance(0.35)
        ? { txt: "Vice de procédure miraculeux. Tu passes entre les gouttes. Cette fois.", fx: { argent: -150, heat: 5 } }
        : { txt: "Procès, condamnation avec sursis, une de tous les journaux. Le mot « fraudeur » est collé à ton nom à vie.", fx: { argent: -1200, rep: -20, heat: 10, moral: -10 }, ctr: { amendes: 1 }, flags: { fraude: false } } }
    ]
  },
  {
    id: "sponsor_slip", ico: "🩲", cat: "Business", min: 20, max: 99, once: true, cond: (s) => s.stats.rep > 45,
    text: () => "Une marque de sous-vêtements te propose une campagne : toi, en slip moulant doré, sur des panneaux de 4 mètres dans toute l'Europe. Le chèque a six zéros.",
    choices: () => [
      { label: "Signer, la thune c'est la thune", apply: () => ({ txt: "Ton fessier surplombe le périph pendant six mois. Le vestiaire imprime l'affiche en format A0. Riche et ridicule.", fx: { argent: 800, cha: 4, vest: -3, rep: -3 } }) },
      { label: "Refuser, t'as une dignité", apply: () => ({ txt: "Ton agent s'arrache les cheveux. Ta dignité te coûte le prix d'une villa.", fx: { mental: 3, rep: 2 } }) }
    ]
  },
  {
    id: "clash_journaliste", ico: "🎤", cat: "Zone mixte", min: 19, max: 99, cond: (s) => s.stats.rep > 30, w: 1.1,
    text: (s) => pick([
      "Zone mixte après une défaite. " + s.perso.journa + " te tend le micro : « Trois matchs sans marquer… vous vous sentez encore légitime, ou c'est fini ? »",
      "Conférence de presse. " + s.perso.journa + ", sourire de serpent : « Votre coach dit que vous êtes intransférable. C'est parce que personne ne veut de vous ? »",
      "Interview d'après-match. " + s.perso.journa + " dégaine : « On dit dans le vestiaire que vous pensez plus à vos soirées qu'au ballon. Un commentaire ? »"
    ]),
    choices: () => [
      { label: "« Et toi, t'es légitime avec tes 1200 balles par mois ? »", apply: () => chance(0.5)
        ? { txt: "Le clip devient culte. Les jeunes t'adorent, les vieux éditorialistes te détestent. Équilibre parfait.", fx: { cha: 6, rep: -5, moral: 6 } }
        : { txt: "Toute la presse se ligue contre toi pendant un mois. Chaque contrôle raté fait un article.", fx: { rep: -10, moral: -5, coach: -3 } } },
      { label: "Langue de bois olympique", apply: () => ({ txt: "« On travaille, on reste humbles, les résultats vont venir. » Personne n'a rien retenu. Mission accomplie.", fx: { mental: 2, disc: 2 } }) },
      { label: "Punchline préparée avec ton CM", apply: () => chance(0.6)
        ? { txt: "« Les statistiques, c'est comme les minijupes… » Rires, reprises, 2M de vues. Charisme +1000.", fx: { cha: 7, rep: 4, moral: 4 } }
        : { txt: "Ta punchline tombe à plat dans un silence de morgue. Quelqu'un tousse. On coupe.", fx: { cha: -4, moral: -4 } } }
    ]
  },
  {
    id: "reseaux_haters", ico: "📵", cat: "Réseaux", min: 18, max: 99, cond: (s) => s.stats.rep > 25, w: 0.9,
    text: () => pick([
      "3h du mat', tu scrolles. Un compte à 12 abonnés : « Joueur de merde, rentre chez toi. » Ton pouce tremble au-dessus du clavier.",
      "Un compte fan de ton propre club poste un montage de tes pires contrôles sur une musique triste. 800k vues. Même ta tante l'a partagé.",
      "Quelqu'un a créé un compte parodique à ton nom qui poste « aujourd'hui encore, j'ai rien foutu » après chaque match. C'est finement observé et ça te rend fou."
    ]),
    choices: () => [
      { label: "Le fumer publiquement", apply: () => chance(0.45)
        ? { txt: "Ta réponse est tellement violente qu'elle finit en compilation « célébrités qui craquent ». Assumé.", fx: { cha: 4, rep: -4, moral: 5 } }
        : { txt: "C'était un gamin de 14 ans. Sa mère fait un thread. Excuses publiques obligatoires. La honte intersidérale.", fx: { rep: -8, moral: -6 } } },
      { label: "Bloquer, poser le tel, dormir", apply: () => ({ txt: "La sagesse a gagné ce soir. Ton sommeil aussi.", fx: { mental: 4, forme: 2 } }) }
    ]
  },
  {
    id: "tatouages", ico: "🪡", cat: "Style", min: 19, max: 30, once: true,
    text: () => "Ton tatoueur te propose « un projet artistique » : la gorge et les mains, lion, horloge, et le prénom de ta mère en gothique.",
    choices: () => [
      { label: "Vas-y, charbonne", apply: () => ({ txt: "Douze heures de douleur. Le résultat est soit magnifique soit atroce, selon l'âge de celui qui regarde.", fx: { cha: 6, rep: -3, argent: -8, moral: 4 } }) },
      { label: "Rester vierge comme un expert-comptable", apply: () => ({ txt: "Les sponsors « familiaux » apprécient ta peau vide. Le vestiaire te surnomme « Le Notaire ».", fx: { rep: 2, vest: -2 } }) }
    ]
  },

  // ===== football pur =====
  {
    id: "coach_clash", ico: "🧠", cat: "Vestiaire", min: 17, max: 99, cond: (s) => s.stats.coach < 45, w: 1.6,
    text: () => pick([
      "Encore sur le banc. Le coach t'explique devant tout le monde : « Tu joueras quand tu le mériteras, fils. » Les remplaçants ricanent.",
      "Le coach t'a remplacé à la mi-temps sans un mot. En vidéo le lundi, il repasse TES erreurs trois fois, au ralenti, avec la télécommande qui tremble de plaisir.",
      "Tu découvres la compo sur le tableau : t'es même pas remplaçant, t'es en tribune. Le coach évite ton regard depuis ce matin, ce lâche."
    ]),
    choices: () => [
      { label: "Le clasher en interview le soir même", apply: () => chance(0.35)
        ? { txt: "Le président t'appelle… pour te donner raison. Le coach saute au mercato d'hiver. Coup de poker gagnant.", fx: { coach: 30, moral: 8, rep: 2, disc: -5 } }
        : { txt: "Mise à pied, amende, excuses forcées face caméra. Le vestiaire t'évite comme la peste.", fx: { rep: -8, disc: -8, vest: -6, moral: -6, argent: -20 }, ctr: { amendes: 1 } } },
      { label: "Fermer ta gueule et charbonner", apply: () => ({ txt: "Premier arrivé, dernier parti, pendant des semaines. Même ce connard de coach finit par le voir.", fx: { coach: 12, disc: 6, forme: 4, moral: -2 } }) },
      { label: "Demander ton transfert par la presse", apply: () => ({ txt: "« Je veux du temps de jeu, sinon je pars. » Ambiance polaire, mais les clubs sont prévenus.", fx: { coach: -10, rep: 3, moral: 2 }, flags: { transfert_demande: true } }) }
    ]
  },
  {
    id: "blessure_choix", ico: "🦵", cat: "Infirmerie", min: 18, max: 99, cond: (s) => s.forme < 40, w: 1.4,
    text: () => pick([
      "Douleur au genou depuis des semaines. L'IRM est moche. Le doc propose l'arrêt ; le coach « aurait vraiment besoin de toi samedi, tu vois ».",
      "L'ischio tire depuis trois matchs. Le kiné fait la grimace en te palpant : « C'est chaud. » Le coach, lui, a déjà mis ton nom sur la feuille.",
      "Cheville en vrac depuis un tacle assassin. Elle double de volume chaque soir. Le staff propose « de la gérer au feeling ». Le feeling dit aïe."
    ]),
    choices: () => [
      { label: "Infiltration et on y va, guerrier", apply: () => chance(0.45)
        ? { txt: "Tu joues, tu marches sur l'eau, le public scande ton nom. Le genou tiendra… jusqu'à quand ?", fx: { coach: 8, rep: 5, moral: 6, phys: -3 } }
        : { txt: "Genou explosé à la 20e minute. Civière, opération, six mois dehors. Le coach, lui, est déjà passé à autre chose.", fx: { phys: -8, forme: -30, moral: -10 }, injury: true } },
      { label: "S'arrêter et se soigner correctement", apply: () => ({ txt: "Deux mois de soins chiants. Le coach fait la gueule mais ton corps est ton seul vrai contrat.", fx: { forme: 20, coach: -5, mental: 4 } }) }
    ]
  },
  {
    id: "penalty_decisif", ico: "⚽", cat: "Le moment", min: 18, max: 99, cond: (s) => s.poste !== "GK", w: 1,
    text: () => pick([
      "Dernière minute du derby. Penalty. 50 000 personnes hurlent, la moitié veut ta mort. Le ballon est posé. C'est toi qui tires, personne d'autre.",
      "Finale de coupe, séance de tirs au but, 5e tireur : toi. Le gardien adverse fait le taré sur sa ligne. Ta daronne a caché ses yeux dans les tribunes.",
      "Match de la peur pour le maintien, penalty au bout du temps additionnel. Si tu rates, tout le club descend avec toi. Le ramasseur de balles n'ose plus te regarder."
    ]),
    choices: () => [
      { label: "PANENKA. Pour la légende.", apply: () => chance(0.4)
        ? { txt: "Le ballon flotte une éternité et rentre. Le stade explose. Clip éternel, ego cosmique.", fx: { cha: 10, rep: 10, moral: 12, vest: 5 } }
        : { txt: "Le gardien reste planté et attrape ta feuille morte comme une lettre à la poste. Le stade entier te maudit sur dix générations.", fx: { rep: -10, moral: -12, cha: -5, coach: -8 } } },
      { label: "Placé, propre, efficace", apply: () => chance(0.8)
        ? { txt: "But. Boulot fait. Les vrais savent que c'est ça, le métier.", fx: { rep: 5, moral: 6, coach: 4 } }
        : { txt: "Poteau rentrant… sorti. Ça arrive. Ça fait mal quand même.", fx: { moral: -6, rep: -3 } } }
    ]
  },
  {
    id: "brassard", ico: "🎖️", cat: "Vestiaire", min: 25, max: 99, once: true, cond: (s) => s.stats.vest > 65,
    text: () => "Le capitaine part à la retraite. Le vestiaire vote. Ton nom sort. Le brassard, c'est des responsabilités et des interviews chiantes en plus.",
    choices: () => [
      { label: "Accepter, t'es un taulier maintenant", apply: () => ({ txt: "Premier discours d'avant-match. T'as la voix qui tremble et 25 paires d'yeux sur toi. T'as grandi, bâtard.", fx: { disc: 6, rep: 6, mental: 6, vest: 4 }, flags: { capitaine: true } }) },
      { label: "Refuser, trop de contraintes", apply: () => ({ txt: "« Je préfère me concentrer sur mon jeu. » Traduction : flemme. Tout le monde a traduit.", fx: { moral: 3, vest: -4 } }) }
    ]
  },
  {
    id: "selection_first", ico: "🌍", cat: "Sélection", min: 18, max: 99, once: true, cond: (s) => s.ovrCache >= 72 && s.stats.rep >= 32, w: 4,
    text: (s) => "Ton téléphone vibre. Numéro inconnu. C'est le sélectionneur : « Petit, prépare ton sac. T'es dans la liste. » Ta daronne hurle dans la cuisine.",
    choices: () => [
      { label: "Fêter ça toute la nuit", apply: () => ({ txt: "Soirée mémorable. T'arrives au rassemblement avec des lunettes de soleil en intérieur. Le staff note tout.", fx: { moral: 10, cha: 3, forme: -6, disc: -4, rep: 8 }, ctr: { cuites: 1 }, flags: { selectionnable: true } }) },
      { label: "Rester focus, l'histoire commence", apply: () => ({ txt: "Premier entraînement avec les stars que t'avais en poster. T'es plus un fan, t'es un collègue.", fx: { mental: 6, rep: 8, moral: 6 }, flags: { selectionnable: true } }) }
    ]
  },
  {
    id: "jeunes_chambrent", ico: "👴", cat: "Le temps passe", min: 31, max: 99, once: true,
    text: () => "Un titi de 17 piges te chambre à l'entraînement : « Alors papy, on récupère ? » Il court plus vite que toi. Ça pique, hein.",
    choices: () => [
      { label: "Le détruire techniquement devant tout le monde", apply: () => chance(0.6)
        ? { txt: "Petit pont, roulette, finition. « Ça, gamin, ça s'apprend pas sur TikTok. » Le vestiaire est plié.", fx: { vest: 6, cha: 4, moral: 8 } }
        : { txt: "Il t'a fait les poches deux fois. Devant tout le monde. Le temps est un enfoiré patient.", fx: { moral: -6, vest: -2 } } },
      { label: "Devenir son mentor", apply: () => ({ txt: "Tu lui apprends le métier, les pièges, les rats. Il te surnomme « Tonton ». C'est beau, en vrai.", fx: { mental: 6, vest: 8, rep: 4, coach: 5 } }) }
    ]
  },
  {
    id: "golfe", ico: "🛢️", cat: "Pont d'or", min: 29, max: 99, once: true, cond: (s) => s.argent > 1000 || s.ovrCache > 80,
    text: (s) => "Al-Fricard FC t'offre un pont d'or : " + fmtMoney(Math.round(Math.max(8000, s.contract.salary * 3))) + " par an pour venir « développer le championnat ». Développer, ouais, ouais.",
    choices: (s) => [
      { label: "Prendre l'oseille et le soleil", apply: () => ({ txt: "Villa avec ascenseur pour la piscine. Le foot y est mou comme une sieste mais ton compte fait des bonds obscènes.", fx: { argent: 500, rep: -12, moral: 6, forme: -3 }, transfert: { club: pick(CLUBS_GOLF), tier: "GOLF", salary: Math.max(8000, Math.round(S.contract.salary * 3)), years: 2 } }) },
      { label: "Rester en Europe, le vrai foot", apply: () => ({ txt: "Les puristes te saluent. Ton banquier, moins. La légende avant la liasse.", fx: { rep: 8, mental: 4 } }) }
    ]
  },

  // ===== overdose / procès (forcés) =====
  {
    id: "overdose", ico: "☠️", cat: "La ligne de trop", min: 16, max: 99, forced: true,
    text: () => "Soirée de trop, rail de trop. Ton cœur part en vrille, les murs se penchent. Ton pote panique et appelle le 15 en tremblant.",
    choices: () => [
      { label: "…", apply: () => chance(0.65)
        ? { txt: "Réveil aux urgences, électrodes partout, ta mère en larmes au pied du lit. Le club impose une cure, la presse impose la une. T'es passé à rien, gros con.", fx: { addiction: -50, forme: -20, rep: -15, moral: -10, argent: -200 }, flags: { od_survecu: true } }
        : { txt: "Le SAMU est arrivé trop tard.", end: "overdose" } }
    ]
  },
  {
    id: "proces", ico: "⚖️", cat: "Tribunal", min: 18, max: 99, forced: true,
    text: () => "Toutes tes conneries ont fini par faire un dossier. Convocation au tribunal correctionnel : le procureur veut faire un exemple avec « le footballeur qui se croit au-dessus des lois ».",
    choices: () => [
      { label: "L'avocat star à 500k", apply: () => chance(0.65)
        ? { txt: "Relaxe au bénéfice du doute. Ton avocat sourit en comptant. T'as eu chaud aux miches.", fx: { argent: -500, heat: -50, rep: -5 } }
        : { txt: "Même le meilleur avocat du pays ne peut rien. Dix-huit mois ferme. Les portes se referment.", end: "prison" } },
      { label: "Commis d'office, on verra bien", apply: () => chance(0.3)
        ? { txt: "Miracle : sursis et travaux d'intérêt général. Tu repeins un gymnase en jogging floqué à ton nom.", fx: { heat: -40, rep: -10, moral: -5 }, ctr: { amendes: 1 } }
        : { txt: "Plaidoirie de 4 minutes montre en main. Deux ans ferme. La cellule fait 9 m².", end: "prison" } }
    ]
  }
];

// vérification d'éligibilité (avec cooldown anti-répétition)
function eligible(e, s) {
  if (e.forced) return false;
  if (s.age < (e.min || 16) || s.age > (e.max || 99)) return false;
  if (e.once && s.usedEvents.includes(e.id)) return false;
  const seen = s.lastSeen ? s.lastSeen[e.id] : null;
  const cd = e.cd != null ? e.cd : 3;
  if (seen != null && (s.career.saisons - seen) < cd) return false;
  if (e.cond && !e.cond(s)) return false;
  return true;
}
