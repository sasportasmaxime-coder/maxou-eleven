// MAXOU ELEVEN — moteur + UI
"use strict";

let S = null;
let TESTMODE = false;
let TESTLOG = null;
let TESTPLAYS = null;
const app = document.getElementById("app");

// ---------- état ----------
function newGame(cfg) {
  const orig = ORIGINES.find(o => o.id === cfg.origine);
  const ado = ADOS.find(a => a.id === cfg.ado);
  const ent = ENTOURAGES.find(e => e.id === cfg.entourage);
  const club = cfg.club;
  const pot = pick([2, 2, 3, 3, 3, 4, 4, 5]);
  S = {
    nom: cfg.nom, pays: cfg.pays, poste: cfg.poste,
    origine: cfg.origine, ado: cfg.ado, entourage: cfg.entourage,
    club: club.n, tier: club.tier,
    age: 16, year: 2026,
    stats: Object.assign({}, orig.stats),
    forme: 70, moral: 65, argent: orig.argent,
    addiction: 0, heat: 0,
    pot: pot, potShown: clamp(pot + RI(-1, 1), 1, 5),
    contract: { salary: startSalary(club.tier), years: 3 },
    style: null, traits: [],
    injury: false, susp: 0, dopagePris: 0,
    usedEvents: [], queue: [], lastSeen: {}, last: null,
    perso: { rival: pick(RIVALS), michto: pick(MICHTOS), pote: pick(POTES), journa: pick(JOURNAS) },
    flags: { selectionnable: false },
    ctr: { putes: 0, grammes: 0, cuites: 0, gav: 0, amendes: 0, bagarres: 0, michtos: 0, magouilles: 0 },
    career: { matchs: 0, buts: 0, passes: 0, selections: 0, titres: 0, coupes: 0, ldc: 0, cdm: 0, bo: 0, clubs: [club.n], saisons: 0, log: [] },
    ended: null, lastDeltas: [], ovrCache: 0
  };
  applyFxRaw(ado.fx); applyFxRaw(ent.fx);
  S.ovrCache = ovr();
  buildSeasonQueue();
  saveGame();
}

function startSalary(tier) {
  return { REG: 8, D2: 60, D1: 900, ELITE: 1900, GOLF: 8000 }[tier];
}

function ovr() {
  const st = S.stats;
  let v;
  if (S.poste === "ATT") v = st.tech * 0.4 + st.phys * 0.3 + st.mental * 0.3;
  else if (S.poste === "MIL") v = st.tech * 0.4 + st.mental * 0.35 + st.phys * 0.25;
  else if (S.poste === "DEF") v = st.phys * 0.4 + st.mental * 0.35 + st.tech * 0.25;
  else v = st.mental * 0.45 + st.phys * 0.3 + st.tech * 0.25;
  S.ovrCache = Math.round(clamp(v, 1, 99));
  return S.ovrCache;
}

// ---------- effets ----------
const GAUGES = ["forme", "moral", "addiction", "heat"];
function applyFxRaw(fx) {
  if (!fx) return [];
  const deltas = [];
  for (const k in fx) {
    const v = Math.round(fx[k]);
    if (!v) continue;
    if (k === "argent") { S.argent += v; deltas.push({ k, v }); }
    else if (GAUGES.includes(k)) { S[k] = clamp(S[k] + v, 0, 100); deltas.push({ k, v }); }
    else if (k in S.stats) { S.stats[k] = clamp(S.stats[k] + v, 1, 99); deltas.push({ k, v }); }
  }
  return deltas;
}

function resolveChoice(ev, ch) {
  const res = ch.apply ? ch.apply() : { txt: "…" };
  const deltas = applyFxRaw(res.fx);
  if (res.ctr) for (const k in res.ctr) S.ctr[k] = (S.ctr[k] || 0) + res.ctr[k];
  if (res.flags) for (const k in res.flags) S.flags[k] = res.flags[k];
  if (res.injury) S.injury = true;
  if (res.trait && !S.traits.includes(res.trait)) S.traits.push(res.trait);
  if (res.transfert) doTransfer(res.transfert);
  if (res.end) S.ended = res.end;
  if (!S.usedEvents.includes(ev.id)) S.usedEvents.push(ev.id);
  S.lastSeen[ev.id] = S.career.saisons;
  if (TESTMODE && TESTPLAYS) TESTPLAYS[ev.id] = (TESTPLAYS[ev.id] || 0) + 1;
  ovr();
  saveGame();
  return { ev, res, deltas };
}

// ---------- traits auto ----------
function checkTraits() {
  const T = S.traits;
  const add = (t) => { if (!T.includes(t)) { T.push(t); return true; } return false; };
  if (S.addiction >= 40) add("❄️ Sniffeur des surfaces");
  if (S.ctr.cuites >= 4) add("🍾 Roi du carré VIP");
  if (S.ctr.michtos >= 1 && S.flags.pension) add("🧲 Aimant à michtos");
  if (S.ctr.bagarres >= 2) add("🥊 Cogneur de boîte de nuit");
  if (S.ctr.putes >= 4) add("💋 Client fidèle");
  if (S.flags.fraude) add("🏝️ Exilé fiscal");
  if (S.ctr.gav >= 3) add("⛓️ Abonné du commissariat");
  if (S.stats.disc >= 75 && S.addiction === 0) add("🤖 Robot sans salive");
}

// ---------- saison ----------
function buildSeasonQueue() {
  const q = [];
  if (S.addiction >= 85) q.push(EVENTS.find(e => e.id === "overdose"));
  if (S.heat >= 85) q.push(EVENTS.find(e => e.id === "proces"));
  if (S.age === 18 && !S.style) q.push(makeStyleEvent());
  if (S.pendingMercato) { q.push(makeMercatoEvent(S.pendingMercato)); S.pendingMercato = null; }
  if (S.age >= 34) q.push(makeRetireEvent());
  const pool = EVENTS.filter(e => eligible(e, S));
  const weighted = [];
  pool.forEach(e => { const w = e.w || 1; for (let i = 0; i < Math.round(w * 10); i++) weighted.push(e); });
  // rythme calqué sur l'original : 2 events/saison pendant la jeunesse, 1-2 ensuite
  const target = S.age <= 22 ? 2 : RI(1, 2);
  const need = Math.max(0, target - q.length);
  const chosen = [];
  let guard = 0;
  while (chosen.length < need && weighted.length && guard++ < 200) {
    const e = pick(weighted);
    if (!chosen.includes(e)) chosen.push(e);
  }
  q.push(...chosen);
  q.push({ kind: "season" });
  S.queue = q;
  S.seasonLen = q.length;
}

function makeStyleEvent() {
  return {
    id: "playstyle", ico: "🧬", cat: "Identité de jeu",
    text: () => "Le coach te prend entre quatre yeux : « Il est temps de choisir qui tu es sur un terrain, gamin. » Ce que tu choisis maintenant, tu le traînes toute ta carrière.",
    choices: () => STYLES[S.poste].map(st => ({
      label: st.nom, desc: st.desc,
      apply: () => { S.style = st; return { txt: "C'est acté. " + st.nom + " — c'est ça, ton identité. Les défenseurs vont apprendre à te haïr comme il faut.", fx: st.fx }; }
    }))
  };
}

function makeRetireEvent() {
  return {
    id: "retire_" + S.age, ico: "🌅", cat: "Le crépuscule",
    text: () => "T'as " + S.age + " piges. Les genoux grincent au réveil, les jeunes te doublent, et ton banquier dit que t'as « largement assez ». Alors, on continue ou on raccroche ?",
    choices: () => [
      { label: "Encore une saison, pour l'amour du maillot", apply: () => ({ txt: "Le corps suivra. Peut-être. L'ego, lui, est déjà chaud.", fx: { moral: 4, forme: -5 } }) },
      { label: "Raccrocher les crampons", apply: () => ({ txt: "Tour d'honneur, larmes, tifo géant. C'est fini. Enfin… c'est surtout le début du bilan.", end: "retraite" }) }
    ]
  };
}

// ---- mercato ----
function clubPool(tier) {
  if (tier === "ELITE") return CLUBS_ELITE;
  if (tier === "D1") return CLUBS_D1;
  if (tier === "D2") return CLUBS_D2;
  if (tier === "GOLF") return CLUBS_GOLF;
  return ["FC Trou-Perdu", "AS Cambrousse", "Étoile de Nulle-Part"];
}
function offerSalary(tier, o) {
  const base = { REG: 10, D2: 80, D1: 1200, ELITE: 6000, GOLF: 15000 }[tier];
  return Math.round(base * (0.5 + clamp((o - 50) * 0.04, 0, 2)) * (1 + S.stats.rep / 200));
}

function makeMercatoEvent(reason) {
  const o = ovr();
  const offers = [];
  const tiers = [];
  if (o >= 76) tiers.push("ELITE");
  if (o >= 63) tiers.push("D1");
  if (o >= 50) tiers.push("D2");
  if (!tiers.length) tiers.push("REG");
  const nOff = reason === "libre" ? RI(1, 3) : RI(1, 2);
  let guard = 0;
  while (offers.length < nOff && guard++ < 20) {
    const t = pick(tiers);
    const n = pick(clubPool(t));
    if (n !== S.club && !offers.some(x => x.club === n)) {
      offers.push({ club: n, tier: t, salary: offerSalary(t, o), years: RI(2, 4) });
    }
  }
  const txt = reason === "libre"
    ? "Fin de contrat. T'es sur le marché comme un canapé sur Leboncoin. Ton téléphone chauffe."
    : "Le mercato s'agite autour de ton nom. Les offres tombent, ton agent salive.";
  const choices = [];
  if (reason !== "libre") {
    choices.push({ label: "Rester à " + S.club + ", fidèle", apply: () => ({ txt: "Tu restes. Le public t'aime encore un peu plus, ton agent un peu moins.", fx: { rep: 2, vest: 3, moral: 2 } }) });
  } else {
    choices.push({ label: "Re-signer à " + S.club + " (au rabais)", apply: () => { S.contract = { salary: Math.round(S.contract.salary * 0.8), years: 2 }; return { txt: "Prolongé au rabais. La direction sourit, t'as compris pourquoi.", fx: { moral: -2, vest: 2 } }; } });
  }
  offers.forEach(off => {
    choices.push({
      label: off.tier + " · " + off.club + " — " + fmtMoney(off.salary) + "/an, " + off.years + " ans",
      apply: () => { doTransfer(off); return { txt: "Direction " + off.club + ". Nouvelle ville, nouveau vestiaire, nouveaux requins. Prime à la signature encaissée.", fx: { moral: 5, argent: Math.round(off.salary * 0.4) } }; }
    });
  });
  return { id: "mercato_" + S.year, ico: "💼", cat: "Mercato", _reason: reason, text: () => txt, choices: () => choices };
}

function doTransfer(off) {
  S.club = off.club; S.tier = off.tier;
  S.contract = { salary: off.salary, years: off.years };
  S.stats.coach = 55; S.stats.vest = RI(45, 60);
  S._moved = true;
  if (!S.career.clubs.includes(off.club)) S.career.clubs.push(off.club);
}

// ---- simulation de saison ----
function simulateSeason() {
  const st = S.stats;
  const clubLevel = CLUB_LEVELS[S.tier];
  const wasInjured = S.injury;
  const o = ovr();
  const perf = o + (S.forme - 60) * 0.25 + (S.moral - 60) * 0.15 - S.addiction * 0.28 + R(-4, 4);
  let share = clamp(0.55 + (perf - clubLevel) * 0.035 + (st.coach - 50) * 0.006, 0.06, 1);
  let matchs = Math.round(34 * share);
  if (S.injury) { matchs = Math.round(matchs * 0.35); }
  if (S.susp > 0) { matchs = Math.round(matchs * 0.5); }
  const style = S.style || { g: 1, a: 1 };
  const posG = { ATT: 1, MIL: 0.45, DEF: 0.1, GK: 0.02 }[S.poste];
  const posA = { ATT: 0.55, MIL: 1, DEF: 0.25, GK: 0.05 }[S.poste];
  const q = clamp((perf - 42) / 55, 0.02, 1.35);
  const sniff = S.traits.includes("❄️ Sniffeur des surfaces") ? 1.08 : 1;
  const buts = Math.round(matchs * q * 0.75 * posG * style.g * sniff * R(0.7, 1.3));
  const passes = Math.round(matchs * q * 0.5 * posA * style.a * R(0.7, 1.3));
  let note = matchs < 4 ? R(4.2, 5.4) : clamp(5.4 + (perf - clubLevel) * 0.05 + (buts + passes) / Math.max(matchs, 1) * 1.1, 3.8, 9.9);
  note = Math.round(note * 10) / 10;

  const impact = matchs > 15 ? clamp((perf - clubLevel) * 0.25, -4, 6) : 0;
  const teamStr = clubLevel + impact + R(-5, 7);
  let posLg = clamp(Math.round(9 - (teamStr - clubLevel - 1) * 1.4 + R(-2.5, 2.5)), 1, 18);
  const champion = posLg === 1;

  const lines = [];
  let trophee = false;
  if (champion) { S.career.titres++; trophee = true; }
  // coupe / LDC
  let coupe = false, ldc = false;
  if (chance(0.12 + impact * 0.01)) { coupe = true; S.career.coupes++; trophee = true; }
  if (S.tier === "ELITE" && chance(clamp(0.06 + impact * 0.02, 0.02, 0.25))) { ldc = true; S.career.ldc++; trophee = true; }

  // objectif club
  const objByTier = { ELITE: ["Ramener un trophée majeur", champion || ldc || coupe], D1: ["Finir dans le top 5", posLg <= 5], D2: ["Jouer la montée", posLg <= 3], REG: ["Monter, sortir de ce trou", posLg <= 2], GOLF: ["Faire le show pour les caméras", note >= 6.5] };
  const [objTxt, objOk] = objByTier[S.tier];

  // montée / relégation
  let mouvement = null;
  const ladder = ["REG", "D2", "D1", "ELITE"];
  const li = ladder.indexOf(S.tier);
  if (li >= 0 && li < 3 && posLg <= 2 && chance(0.7)) { S.tier = ladder[li + 1]; mouvement = "up"; }
  else if (li > 0 && posLg >= 16 && chance(0.6)) { S.tier = ladder[li - 1]; mouvement = "down"; }

  // sélection + CDM
  let selTxt = null, cdmTxt = null, cdmWin = false;
  if (S.flags.selectionnable && o >= 72 && S.stats.rep >= 40 && S.susp === 0) {
    const caps = RI(3, 8);
    S.career.selections += caps;
    selTxt = "🌍 " + caps + " capes avec la sélection cette saison.";
    if ((S.year - 2026) % 4 === 0 && S.year > 2026) {
      const run = Math.random();
      if (run < 0.12) { S.career.cdm++; cdmWin = true; cdmTxt = "🏆 CHAMPION DU MONDE. Ton nom est gravé à jamais, fils de légende."; applyFxRaw({ rep: 25, moral: 15, cha: 5 }); }
      else if (run < 0.4) { cdmTxt = "🌍 Coupe du Monde : demi-finale. Le pays a pleuré, mais t'as fait rêver."; applyFxRaw({ rep: 10, moral: -3 }); }
      else { cdmTxt = "🌍 Coupe du Monde : élimination gênante. Retour du pays en soute, avec les valises."; applyFxRaw({ rep: -4, moral: -6 }); }
    }
  }

  // Ballon d'Or
  let boTxt = null;
  if (S.poste !== "GK" && buts + passes >= 45 && (champion || ldc) && note >= 8) {
    S.career.bo++;
    boTxt = "🎖️ BALLON D'OR. Smoking, discours, larmes de ta daronne au premier rang.";
    applyFxRaw({ rep: 30, cha: 8, moral: 15, argent: 500 });
  }

  // contrôle antidopage
  let dopTxt = null;
  if (S.addiction > 15 && chance(S.addiction / 260)) {
    S.dopagePris++;
    if (S.dopagePris >= 2) { S.ended = "banni_dopage"; dopTxt = "🧪 Deuxième contrôle positif. Radiation à vie."; }
    else { S.susp = 1; dopTxt = "🧪 CONTRÔLE POSITIF. Suspension, une de la presse, sponsors en fuite. La honte nationale."; applyFxRaw({ rep: -20, moral: -10, argent: -100 }); }
  } else if (S.susp > 0) S.susp = 0;

  // finances
  const agentCut = (S.entourage === "agent" && !S.flags.agent_vire) ? 0.85 : 1;
  const salaire = Math.round(S.contract.salary * agentCut);
  const sponsors = Math.round(Math.max(0, S.stats.rep * 14 * (S.heat > 50 ? 0.4 : 1)));
  const trainDeVie = Math.round(40 + S.stats.cha * 2 + S.addiction * 8 + (S.flags.michto ? 350 : 0) + (S.flags.pension ? 250 : 0) + (S.flags.lambo ? 60 : 0));
  const net = salaire + sponsors - trainDeVie + (objOk && trophee ? 200 : 0);
  S.argent += net;
  if (S.addiction > 20) S.ctr.grammes += Math.round(S.addiction / 6);

  // forme / moral / vieillissement
  if (matchs < 10) { applyFxRaw({ moral: -8 }); lines.push({ t: "⚠️ Temps de jeu famélique : ton moral prend l'eau.", c: "warn" }); }
  if (S.injury) { lines.push({ t: "🏥 Saison plombée par la blessure. L'infirmerie connaît ta playlist par cœur.", c: "bad" }); S.injury = false; applyFxRaw({ forme: 15 }); }
  if (note >= 7.5) applyFxRaw({ moral: 6, rep: 6 });
  if (note < 5.5 && matchs >= 10) applyFxRaw({ moral: -5, rep: -3, coach: -4 });
  S.heat = clamp(S.heat - 4, 0, 100);
  if (S.addiction >= 30) applyFxRaw({ addiction: RI(2, 6), forme: -3 });
  growPlayer();
  checkTraits();

  // stats carrière
  S.career.matchs += matchs; S.career.buts += buts; S.career.passes += passes; S.career.saisons++;
  S.contract.years--;

  const presse = (note >= 7.5 ? pick(PRESSE_BONNE) : note >= 6 ? pick(PRESSE_MOYENNE) : pick(PRESSE_NULLE)).replace("{NOM}", S.nom.split(" ")[1] || S.nom);
  const moment = chance(0.65) ? pick(note >= 7 || champion ? MOMENTS_BON : note < 5.5 || posLg >= 15 ? MOMENTS_NUL : MOMENTS_MOYEN) : null;
  S.potShown = clamp(S.pot + RI(-1, 1), 1, 5);
  S.last = { note, posLg, buts, matchs, champion };
  const ic = (S._moved ? "🚚" : "") + (champion ? "🥇" : "") + (coupe ? "🏆" : "") + (ldc ? "⭐" : "") +
    (cdmWin ? "🌍" : "") + (boTxt ? "🎖️" : "") + (dopTxt ? "🧪" : "") + (wasInjured ? "🚑" : "");
  S._moved = false;
  S.career.log.push({ y: S.year, age: S.age, club: S.club, tier: S.tier, m: matchs, b: buts, p: passes, n: note, pos: posLg, ic });

  return { matchs, buts, passes, note, posLg, champion, coupe, ldc, objTxt, objOk, mouvement, selTxt, cdmTxt, boTxt, dopTxt, net, presse, moment, lines, trophee };
}

function growPlayer() {
  const cap = [68, 75, 82, 89, 96][S.pot - 1];
  const o = ovr();
  const room = cap - o;
  let g = clamp(room * 0.18, 0, 4.5) + (S.age <= 21 ? 1.5 : S.age <= 25 ? 0.8 : 0);
  g += (S.stats.disc - 50) * 0.03 - S.addiction * 0.03 + (S.forme - 60) * 0.01;
  g = Math.max(S.age <= 27 ? 0 : -3, g);
  const split = { tech: 0.35, phys: 0.3, mental: 0.35 };
  for (const k in split) S.stats[k] = clamp(S.stats[k] + Math.round(g * split[k] + R(-0.5, 0.8)), 1, 99);
  if (S.age >= 30) S.stats.phys = clamp(S.stats.phys - Math.round((S.age - 28) * 0.7), 1, 99);
  if (S.age >= 33) S.stats.tech = clamp(S.stats.tech - 1, 1, 99);
}

// ---------- persistance (panthéon + badges) ----------
function metaGet(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
function metaSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
function metaDel(k) { try { localStorage.removeItem(k); } catch (e) {} }

// ---------- sauvegarde de partie ----------
let NOSAVE = false;
function saveGame(sumScreen) {
  if (TESTMODE || NOSAVE || !S || S.ended) return;
  const tokens = S.queue.map(q => q.kind === "season" ? "season" : (q._reason ? "mercato:" + q._reason : q.id));
  const plain = {};
  for (const k in S) { if (k !== "queue" && k[0] !== "_") plain[k] = S[k]; }
  metaSet("maxou_save", { S: plain, queue: tokens, screen: sumScreen ? "summary" : "flow", sum: sumScreen || null });
}
function tokenToStep(t) {
  if (t === "season") return { kind: "season" };
  if (t === "playstyle") return makeStyleEvent();
  if (t.indexOf("retire_") === 0) return makeRetireEvent();
  if (t.indexOf("mercato:") === 0) return makeMercatoEvent(t.slice(8));
  return EVENTS.find(e => e.id === t) || null;
}
function resumeGame() {
  const sv = metaGet("maxou_save", null);
  if (!sv || !sv.S) { renderHome(); return; }
  S = sv.S;
  S.queue = (sv.queue || []).map(tokenToStep).filter(Boolean);
  if (sv.screen === "summary" && sv.sum) renderSummary(sv.sum);
  else if (S.queue.length) step();
  else { buildSeasonQueue(); step(); }
}

function saveCareerMeta(lg, cr) {
  const unlocked = metaGet("maxou_badges", {});
  const newBadges = BADGES.filter(b => !unlocked[b.id] && b.cond(S, lg, cr));
  if (NOSAVE) return { newBadges, isRecord: false };
  newBadges.forEach(b => { unlocked[b.id] = true; });
  if (newBadges.length) metaSet("maxou_badges", unlocked);
  const hof = metaGet("maxou_hof", []);
  const rec = {
    nom: S.nom, poste: S.poste, lg, cr, ending: (ENDINGS[S.ended] || ENDINGS.retraite).t,
    buts: S.career.buts, saisons: S.career.saisons, rank: rankTitle(lg, cr), quand: S.year
  };
  hof.push(rec);
  hof.sort((a, b) => b.lg - a.lg);
  const isRecord = hof[0] === rec && hof.length > 1;
  if (hof.length > 10) hof.length = 10;
  metaSet("maxou_hof", hof);
  return { newBadges, isRecord };
}

// ---------- fins ----------
const ENDINGS = {
  retraite: { t: "RETRAITE", ep: "Parti comme un seigneur, sur tes deux jambes. C'est plus rare que tu crois." },
  retraite_forcee: { t: "FIN DE BAIL", ep: "Plus aucun club ne décroche. Le téléphone qui sonne plus, c'est ça la vraie fin." },
  overdose: { t: "OVERDOSE", ep: "Mort à l'aube dans un appart de luxe, entouré de gens qui ont d'abord effacé les vidéos avant d'appeler les secours." },
  prison: { t: "INCARCÉRÉ", ep: "De la pelouse au parloir. Le maton est fan, il te demande un autographe sur ton propre mandat de dépôt." },
  banni: { t: "RADIÉ À VIE", ep: "Les paris truqués, ça pardonne pas. Ton nom est devenu un avertissement dans les centres de formation." },
  banni_dopage: { t: "RADIÉ POUR DOPAGE", ep: "Deux contrôles positifs. Même les documentaires Netflix veulent plus de toi." },
  accident: { t: "MORT AU VOLANT", ep: "La Lambo, l'alcool, le platane. Le trio classique. Le quartier a repeint un mur à ton nom." }
};

function epilogueHtml() {
  const f = S.flags, p = S.perso, L = [];
  if (S.ended === "overdose") L.push("Le club a retiré ton numéro. Au quartier, une fresque immense porte ton visage, et les darons montrent le mur aux petits : « Le talent, ça se respecte. La vie, encore plus. »");
  else if (S.ended === "accident") L.push("Cinq ans plus tard, la mairie a posé un radar devant le platane et le club organise un tournoi à ton nom. On se souvient du joueur. On essaie d'oublier la nuit.");
  else if (S.ended === "prison") L.push("Sorti en conditionnelle, tu écris tes mémoires — « Surface de réparation ». Best-seller immédiat. Le foot pardonne rarement, le public toujours.");
  else if (S.ended === "banni" || S.ended === "banni_dopage") L.push("Radié à vie, tu commentes désormais les matchs sur une chaîne Twitch depuis un pays sans accord d'extradition. 400 000 viewers par soir, zéro remords apparent.");
  else if (S.argent <= 0) L.push("Comme tant d'ex-pros, tout est parti en cinq ans : placements bidons, « amis », pensions. Aujourd'hui tu vends des berlines d'occasion en glissant tes anecdotes aux clients. Ils achètent surtout les anecdotes.");
  else if (S.stats.cha >= 65) L.push("Reconversion express en consultant TV : costard cintré, punchlines préparées, polémiques du dimanche soir. T'es payé pour engueuler des gamins qui jouent mieux que toi. Le métier rêvé.");
  else if (f.capitaine || S.stats.mental >= 70) L.push("Diplômes en poche, tu reprends les U19 du club. Les gamins t'écoutent bouche ouverte quand tu racontes le vestiaire d'avant — surtout les passages que la fédé préférerait censurer.");
  else if (S.tier === "GOLF") L.push("Resté au Golfe après la retraite : ambassadeur d'un truc flou, villa climatisée jusque sur la terrasse. La belle vie, version pétrole.");
  else L.push("Villa au soleil, padel le matin, business de CBD l'après-midi. La retraite paisible d'un homme qui a tout vu et qui n'a (presque) rien regretté.");
  if (f.rival === "mentor") L.push("💠 " + p.rival + " a fini par gagner son Ballon d'Or. Dans son discours, il t'a appelé « mon grand frère ». T'as chialé devant ta télé, et c'est très bien comme ça.");
  else if (f.rival === "parti") L.push("💠 " + p.rival + " a fait carrière ailleurs. En interview, il te décrit comme « le pire coéquipier et le meilleur prof ». Vous ne vous êtes jamais reparlé.");
  else if (f.rival === "guerre" || f.rival === "treve") L.push("💠 " + p.rival + " et toi, vous vous êtes recroisés en plateau télé. Poignée de main glaciale, audience record. Certaines guerres passent juste en prime time.");
  if (f.mariage_sans_contrat) L.push("💔 Le divorce avec " + p.michto + " t'a coûté la moitié de tout. Elle documente sa nouvelle vie depuis TA villa des Maldives. L'avocat t'avait prévenu.");
  else if (f.michto) L.push("❤️ Contre toute attente, " + p.michto + " est restée. Trois gosses, un chien débile, et plus aucun sac à 40 000. Comme quoi.");
  else if (f.michto_rompu) L.push("💅 " + p.michto + " a refait sa vie avec un pilote de F1. Son documentaire t'évoque au chapitre 3, sobrement intitulé « L'Erreur ».");
  if (f.pension) L.push("👶 Le petit a bien grandi : U15, même frappe que toi, même caractère de chien. Le destin est un comique de répétition.");
  if (f.pote_fin === "barber_ok") L.push("💈 Le barbershop de " + p.pote + " est devenu une chaîne à 12 salons. Il te coupe encore les cheveux gratos, à domicile, en te traitant de star.");
  else if (f.pote_fin === "barber_ko") L.push("💈 Le salon de " + p.pote + " a coulé, mais pas votre lien. Chaque 1er janvier à minuit pile, c'est lui qui appelle en premier.");
  else if (f.pote_fin === "louche") L.push("📦 L'« import-export » de " + p.pote + " a fini par l'importer à l'ombre. Tu payes toujours les mandats. On ne refait pas l'histoire, on la finance.");
  else if (f.pote_fin === "refus") L.push("🤝 " + p.pote + " et toi, c'est plus pareil depuis le refus. Mais quand vous vous croisez au pays, l'accolade est vraie. C'est déjà ça.");
  return '<div class="sum-head" style="margin-top:14px">📜 Épilogue — cinq ans plus tard</div>' +
    L.map(t => '<p class="sum-line" style="line-height:1.5">' + esc(t) + '</p>').join("");
}

function renderTimeline() {
  const rows = S.career.log.length ? S.career.log.map(r =>
    '<div class="tl-row"><span class="tl-y">' + r.y + '<br><span style="color:var(--dim);font-size:.68rem">' + r.age + ' ans</span></span>' +
    '<div style="flex:1"><b>' + esc(r.club) + '</b> <span class="badge ' + r.tier + '">' + r.tier + '</span>' +
    '<div class="tl-sub">' + r.m + ' matchs · ' + r.b + ' buts · ' + r.p + ' passes · note ' + r.n + ' · ' + (r.pos === 1 ? "🥇 champion" : r.pos + "ᵉ") + '</div></div>' +
    '<span class="tl-ic">' + r.ic + '</span></div>').join("")
    : '<p class="sub">Aucune saison jouée. Une carrière fantôme.</p>';
  app.innerHTML = '<div class="card"><h2>📜 ' + esc(S.nom) + ' — saison par saison</h2>' + rows +
    '<button class="primary" style="margin-top:14px" onclick="renderEnd()">RETOUR AU BILAN</button></div>';
  window.scrollTo(0, 0);
}

function legacyScore() {
  const c = S.career;
  return Math.round(c.buts * 2 + c.passes + c.selections * 3 + (c.titres + c.coupes) * 40 + c.ldc * 80 + c.cdm * 120 + c.bo * 150 + Math.max(0, S.argent) / 500);
}
function crapuleScore() {
  const k = S.ctr;
  return Math.round(k.putes * 5 + k.grammes / 8 + k.gav * 20 + k.cuites * 3 + k.amendes * 8 + k.bagarres * 10 + k.michtos * 15 + k.magouilles * 40 + (S.flags.fraude ? 50 : 0));
}
function rankTitle(lg, cr) {
  if (lg >= 1100 && cr >= 130) return "💀 LE GÉNIE MAUDIT";
  if (lg >= 1100) return "👑 LA LÉGENDE PROPRE (chiant mais immense)";
  if (lg >= 500 && cr >= 130) return "🔥 LA CRAPULE MAGNIFIQUE";
  if (lg >= 500) return "⭐ BON JOUEUR, VIE DE NOTAIRE";
  if (cr >= 130) return "🗑️ LA HONTE DU QUARTIER";
  if (cr >= 50) return "🤡 NI TALENT NI VERTU";
  return "👻 MONSIEUR PERSONNE";
}

// ---------- flow ----------
function step() {
  if (S.ended) { renderEnd(); return; }
  if (!S.queue.length) { buildSeasonQueue(); }
  const cur = S.queue.shift();
  if (cur.kind === "season") {
    const sum = simulateSeason();
    renderSummary(sum);
  } else {
    renderEvent(cur);
  }
}

function afterSummary() {
  if (S.ended) { renderEnd(); return; }
  S.age++; S.year++;
  if (S.age >= 39) { S.ended = "retraite_forcee"; renderEnd(); return; }
  if (S.contract.years <= 0) S.pendingMercato = "libre";
  else if (chance(0.3) || S.flags.transfert_demande) { S.pendingMercato = "offres"; S.flags.transfert_demande = false; }
  if (S.age >= 31 && ovr() < 58) { S.ended = "retraite_forcee"; renderEnd(); return; }
  buildSeasonQueue();
  saveGame();
  step();
}

// ---------- UI ----------
function esc(t) { return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

function starsTxt(n) { return "★".repeat(n) + "☆".repeat(5 - n); }

function htmlHeader() {
  const o = ovr();
  const arrow = S._lastOvr != null && o !== S._lastOvr ? (o > S._lastOvr ? " ▲" : " ▼") : "";
  S._lastOvr = o;
  const flag = (PAYS.find(p => p.id === S.pays) || {}).flag || "";
  const pIco = (POSTES.find(p => p.id === S.poste) || {}).ico || "⚡";
  const cc = clubColors(S.club);
  const sLen = S.seasonLen || (S.queue.length + 1);
  const sProg = clamp(Math.round((sLen - S.queue.length) / sLen * 100), 5, 100);
  const gauge = (cls, lab, v) => '<div class="gauge"><span class="g-glab">' + lab + '</span><div class="bar ' + cls + '"><i style="width:' + v + '%"></i></div><span class="g-gval">' + Math.round(v) + '</span></div>';
  let gauges = gauge("f-forme", "Forme", S.forme) + gauge("f-moral", "Moral", S.moral);
  if (S.addiction > 0) gauges += gauge("f-addict", "❄️ Défonce", S.addiction);
  if (S.heat > 0) gauges += gauge("f-heat", "🚨 Judiciaire", S.heat);
  let sheet = "";
  if (S.ui_sheet) {
    const st = S.stats;
    const rows = [["Technique", st.tech], ["Physique", st.phys], ["Mental", st.mental], ["Charisme", st.cha], ["Réputation", st.rep], ["Discipline", st.disc], ["Relation coach", st.coach], ["Vestiaire", st.vest]];
    sheet = '<div class="sheet">' + rows.map(r => '<div class="srow"><span>' + r[0] + '</span><b>' + r[1] + '</b></div>').join("") +
      '<div class="meta">Potentiel estimé : ' + starsTxt(S.potShown) + ' · Contrat : ' + fmtMoney(S.contract.salary) + '/an, ' + Math.max(0, S.contract.years) + ' an(s)' +
      (S.style ? '<br>🧬 ' + esc(S.style.nom) + ' — buts ×' + S.style.g + ' · passes ×' + S.style.a : "") +
      (S.traits.length ? '<br>' + S.traits.map(t => '<span class="trait">' + esc(t) + '</span>').join("") : '<br><span style="color:var(--dim)">Aucun trait débloqué. Pour l\'instant t\'es personne.</span>') +
      '</div></div>';
  }
  return '<div class="hdr">' +
    '<div class="hdr-pill">' +
    '<span class="hdr-name">' + flag + ' ' + esc(S.nom) + '</span>' +
    '<span class="hdr-age">' + S.age + ' ans · ' + S.year + '</span>' +
    '<span class="hdr-clubwrap"><span class="badge ' + S.tier + '">' + S.tier + '</span><span class="hdr-club">' + esc(S.club) + '</span>' +
    '<span class="club-dots"><i style="background:' + cc[0] + '"></i><i style="background:' + cc[1] + '"></i></span></span>' +
    '</div>' +
    '<div class="hdr-chips">' +
    '<span class="chip-ovr">' + pIco + ' ' + o + arrow + '</span>' +
    '<span class="chip-white money">' + fmtMoney(S.argent) + '</span>' +
    '<span class="chip-white stars">' + starsTxt(S.potShown) + '</span>' +
    '<button class="sheetbtn" onclick="toggleSheet()">📋</button>' +
    '</div>' +
    '<div class="gauges">' + gauges + '</div>' +
    '<div class="season-track"><i style="width:' + sProg + '%"></i></div>' + sheet + '</div>';
}
function toggleSheet() { S.ui_sheet = !S.ui_sheet; rerenderCurrent(); }
let _current = null;
function rerenderCurrent() { if (_current) _current(); }

function renderEvent(ev) {
  const choices = ev.choices(S);
  if (TESTMODE) { const out = resolveChoice(ev, pick(choices)); afterResultTest(out); return; }
  _current = () => renderEvent(ev);
  app.innerHTML = htmlHeader() +
    '<div class="card evt"><div class="evt-head"><span class="evt-ico">' + ev.ico + '</span><span class="evt-cat">' + esc(ev.cat) + ' · ' + S.age + ' ans</span></div>' +
    '<p class="evt-txt">' + esc(ev.text(S)) + '</p><div style="margin-top:14px">' +
    choices.map((c, i) => '<button onclick="uiChoose(' + i + ')">' + esc(c.label) + (c.desc ? '<span class="b-desc">' + esc(c.desc) + '</span>' : '') + '</button>').join("") +
    '</div></div>';
  window._choices = choices; window._ev = ev;
  window.scrollTo(0, 0);
}
function uiChoose(i) {
  const out = resolveChoice(window._ev, window._choices[i]);
  renderResult(out);
}
function renderResult(out) {
  _current = () => renderResult(out);
  const chips = out.deltas.map(d => {
    const cls = d.k === "argent" ? (d.v > 0 ? "gold" : "dn") : (d.v > 0 === (d.k !== "addiction" && d.k !== "heat") ? "up" : "dn");
    return '<span class="chip ' + cls + '">' + (d.v > 0 ? "+" : "") + (d.k === "argent" ? fmtMoney(d.v) : d.v + " " + (LBL[d.k] || d.k)) + '</span>';
  }).join("");
  app.innerHTML = htmlHeader() +
    '<div class="card evt"><div class="evt-head"><span class="evt-ico">' + out.ev.ico + '</span><span class="evt-cat">' + esc(out.ev.cat) + '</span></div>' +
    '<p class="evt-txt">' + esc(out.res.txt) + '</p>' +
    (chips ? '<div class="deltas">' + chips + '</div>' : '') +
    '<button class="primary" style="margin-top:16px" onclick="step()">CONTINUER</button></div>';
  window.scrollTo(0, 0);
}

function renderSummary(sum) {
  if (TESTMODE) { afterSummary(); return; }
  saveGame(sum);
  _current = () => renderSummary(sum);
  const cell = (n, l) => '<div class="g-cell"><div class="g-num">' + n + '</div><div class="g-lab">' + l + '</div></div>';
  let html = htmlHeader() + '<div class="card evt">' +
    '<div class="sum-head">📊 Saison ' + (S.year) + '-' + String(S.year + 1).slice(2) + ' · ' + esc(S.club) + '</div>' +
    '<p class="presse">📰 ' + esc(sum.presse) + '</p>' +
    '<div class="grid4">' + cell(sum.matchs, "matchs") + cell(sum.buts, "buts") + cell(sum.passes, "passes") + cell(sum.note, "note") + '</div>' +
    '<p class="sum-line">Championnat : ' + (sum.champion ? "🥇 CHAMPION, bordel !" : sum.posLg + "ᵉ") + '</p>';
  if (sum.coupe) html += '<p class="sum-line good">🏆 Vainqueur de la Coupe ! Une soirée que le car de l\'équipe n\'oubliera pas.</p>';
  if (sum.ldc) html += '<p class="sum-line good">⭐ LIGUE DES CHAMPIONS REMPORTÉE. T\'es entré dans l\'histoire, enfoiré.</p>';
  html += '<p class="sum-line ' + (sum.objOk ? "good" : "bad") + '">' + (sum.objOk ? "✅" : "❌") + ' Objectif du club : ' + esc(sum.objTxt) + '</p>';
  if (sum.mouvement === "up") html += '<p class="sum-line good">📈 Le club MONTE ! Champagne tiède dans des gobelets en plastique.</p>';
  if (sum.mouvement === "down") html += '<p class="sum-line bad">📉 Le club descend. Le président parle de « projet », tout le monde rigole.</p>';
  sum.lines.forEach(l => { html += '<p class="sum-line ' + l.c + '">' + esc(l.t) + '</p>'; });
  if (sum.selTxt) html += '<p class="sum-line good">' + esc(sum.selTxt) + '</p>';
  if (sum.cdmTxt) html += '<p class="sum-line good">' + esc(sum.cdmTxt) + '</p>';
  if (sum.boTxt) html += '<p class="sum-line good">' + esc(sum.boTxt) + '</p>';
  if (sum.dopTxt) html += '<p class="sum-line bad">' + esc(sum.dopTxt) + '</p>';
  if (sum.moment) html += '<p class="sum-line" style="color:var(--dim)">' + esc(sum.moment) + '</p>';
  html += '<p class="sum-line">💰 ' + (sum.net >= 0 ? "+" : "") + fmtMoney(sum.net) + ' (salaire, sponsors, train de vie' + (S.entourage === "agent" && !S.flags.agent_vire ? ", et la dîme du rat" : "") + ')</p>';
  html += '<p class="news">🗞️ ' + esc(pick(NEWS_FLASH)) + '</p>';
  html += '<button class="primary" style="margin-top:14px" onclick="afterSummary()">CONTINUER</button></div>';
  app.innerHTML = html;
  window.scrollTo(0, 0);
}

function renderEnd() {
  const e = ENDINGS[S.ended] || ENDINGS.retraite;
  const lg = legacyScore(), cr = crapuleScore();
  if (TESTMODE) { TESTLOG.push({ ending: S.ended, age: S.age, lg, cr, saisons: S.career.saisons }); return; }
  if (!S._meta) { S._meta = saveCareerMeta(lg, cr); metaDel("maxou_save"); }
  const meta = S._meta;
  const c = S.career, k = S.ctr;
  const cell = (n, l) => '<div class="g-cell"><div class="g-num">' + n + '</div><div class="g-lab">' + l + '</div></div>';
  let metaHtml = "";
  if (meta.isRecord) metaHtml += '<p class="sum-line good" style="text-align:center;font-weight:800">👑 NOUVEAU RECORD PERSONNEL, ENFOIRÉ !</p>';
  if (meta.newBadges.length) {
    metaHtml += '<div class="sum-head" style="margin-top:14px">🎖️ Badges débloqués</div><div style="margin:6px 0">' +
      meta.newBadges.map(b => '<span class="trait">' + b.ico + ' ' + esc(b.nom) + '</span>').join(" ") + '</div>';
  }
  app.innerHTML =
    '<div class="card"><p class="end-title">' + e.t + '</p>' +
    '<p class="end-epitaph">' + esc(e.ep) + '</p>' +
    '<div class="score-big"><div class="legend"><div class="n">' + lg + '</div><div class="g-lab">points de légende</div></div>' +
    '<div class="crapule"><div class="n">' + cr + '</div><div class="g-lab">points de crapule</div></div></div>' +
    '<p style="text-align:center;margin:14px 0;font-weight:800">' + rankTitle(lg, cr) + '</p>' +
    '<div class="sum-head">Carrière · ' + S.nom + ' · ' + c.saisons + ' saisons</div>' +
    '<div class="grid4">' + cell(c.matchs, "matchs") + cell(c.buts, "buts") + cell(c.passes, "passes") + cell(c.selections, "capes") + '</div>' +
    '<div class="grid4">' + cell(c.titres + c.coupes, "trophées") + cell(c.ldc, "LDC") + cell(c.cdm, "CDM") + cell(c.bo, "ballons d'or") + '</div>' +
    '<p class="sum-line">💰 Fortune finale : ' + fmtMoney(S.argent) + ' · Clubs : ' + c.clubs.map(esc).join(", ") + '</p>' +
    '<div class="sum-head" style="margin-top:14px">Palmarès de crapule</div>' +
    '<div class="grid4">' + cell(k.putes, "escorts") + cell(k.grammes, "grammes") + cell(k.cuites, "cuites") + cell(k.gav, "GAV") + '</div>' +
    '<div class="grid4">' + cell(k.bagarres, "bagarres") + cell(k.amendes, "amendes") + cell(k.michtos, "michtos") + cell(k.magouilles, "magouilles") + '</div>' +
    epilogueHtml() +
    metaHtml +
    '<button onclick="renderTimeline()" style="text-align:center;margin-top:14px">📜 Revoir la carrière saison par saison</button>' +
    '<button class="primary" style="margin-top:8px" onclick="renderHome()">REJOUER, BÂTARD</button></div>' +
    '<p class="footer">MAXOU ELEVEN · parodie de fiction · toute ressemblance serait gênante</p>';
  window.scrollTo(0, 0);
}

// ---------- création ----------
const CFG = {};
function renderGate() {
  app.innerHTML = '<div class="warn18"><div class="big">🔞</div>' +
    '<h1 class="logo">Maxou Ele<em>11</em>en</h1>' +
    '<p class="tagline">Drogue, cul, fric sale et langage de chantier.<br>Une parodie de fiction réservée aux adultes.</p>' +
    '<button class="primary" onclick="renderHome()">J\'AI 18 ANS ET JE SUIS COQUIN</button>' +
    '<button class="ghost" onclick="window.location=\'https://www.google.com\'">Je suis un enfant innocent, sortez-moi de là</button></div>';
}
function renderHome() {
  const hof = metaGet("maxou_hof", []);
  const badges = metaGet("maxou_badges", {});
  const nbBadges = Object.keys(badges).length;
  const record = hof.length ? '🏅 Record perso : ' + hof[0].lg + ' pts (' + esc(hof[0].nom) + ')' : "Aucune carrière au compteur. Vierge comme un carnet d'arbitre.";
  const sv = metaGet("maxou_save", null);
  const resumeBtn = (sv && sv.S && !sv.S.ended)
    ? '<button class="primary" onclick="resumeGame()">⏯️ REPRENDRE — ' + esc(sv.S.nom) + ', ' + sv.S.age + ' ans, ' + esc(sv.S.club) + '</button>'
    : "";
  app.innerHTML = '<h1 class="logo">Maxou Ele<em>11</em>en</h1>' +
    '<p class="tagline">De 16 ans à la tombe, écris ta légende de crapule.<br>Chaque choix compte. Surtout les pires.</p>' +
    '<div class="card">' + resumeBtn +
    '<button class="' + (resumeBtn ? "" : "primary") + '" style="text-align:center" onclick="renderPays()">' + (resumeBtn ? "Nouvelle carrière (écrase la sauvegarde)" : "COMMENCER MA CARRIÈRE") + '</button>' +
    '<p style="color:var(--dim);font-size:.78rem;text-align:center;margin-top:10px">' + record + '</p></div>' +
    '<div class="card" style="display:flex;gap:8px;padding:12px">' +
    '<button style="margin:0;text-align:center" onclick="renderHof()">🏛️ Panthéon</button>' +
    '<button style="margin:0;text-align:center" onclick="renderBadges()">🎖️ Badges ' + nbBadges + '/' + BADGES.length + '</button>' +
    '</div>' +
    '<p class="footer">Parodie non affiliée de Destiny Eleven · 100% fiction, 0% conseil de vie</p>';
}

function renderHof() {
  const hof = metaGet("maxou_hof", []);
  let rows;
  if (!hof.length) {
    rows = '<p class="sub" style="margin:10px 0">Personne. Le néant. Lance une carrière au lieu de mater un musée vide.</p>';
  } else {
    rows = hof.map((r, i) =>
      '<div class="hof-row"><div><b>' + (i === 0 ? "👑 " : (i + 1) + ". ") + esc(r.nom) + '</b> <span style="color:var(--dim)">· ' + esc(r.poste) + ' · ' + r.saisons + ' saisons · ' + esc(r.ending) + '</span>' +
      '<div style="color:var(--dim);font-size:.78rem">' + esc(r.rank) + '</div></div>' +
      '<div style="text-align:right;white-space:nowrap"><span style="color:var(--gold);font-weight:800">' + r.lg + '</span><br><span style="color:var(--neon);font-size:.8rem">' + r.cr + ' 🔥</span></div></div>'
    ).join("");
  }
  app.innerHTML = '<div class="card"><h2>🏛️ Panthéon des crapules</h2><p class="sub">Tes 10 meilleures carrières, classées aux points de légende.</p>' + rows +
    '<button class="primary" style="margin-top:14px" onclick="renderHome()">RETOUR</button>' +
    (hof.length ? '<button class="ghost" onclick="clearHof()">Tout effacer (aucun respect pour l\'histoire)</button>' : '') + '</div>';
  window.scrollTo(0, 0);
}
function clearHof() { metaSet("maxou_hof", []); renderHof(); }

function renderBadges() {
  const unlocked = metaGet("maxou_badges", {});
  const rows = BADGES.map(b => {
    const ok = !!unlocked[b.id];
    return '<div class="badge-card' + (ok ? "" : " locked") + '"><span class="badge-ico">' + (ok ? b.ico : "🔒") + '</span>' +
      '<div><b>' + esc(b.nom) + '</b><div style="color:var(--dim);font-size:.78rem">' + esc(b.desc) + '</div></div></div>';
  }).join("");
  const n = Object.keys(unlocked).length;
  app.innerHTML = '<div class="card"><h2>🎖️ Badges · ' + n + '/' + BADGES.length + '</h2><p class="sub">Débloqués pour l\'éternité, carrière après carrière. Collectionne-les tous, gros malade.</p>' +
    '<div class="badge-grid">' + rows + '</div>' +
    '<button class="primary" style="margin-top:14px" onclick="renderHome()">RETOUR</button></div>';
  window.scrollTo(0, 0);
}
function renderPays() {
  app.innerHTML = '<div class="card"><h2>Ta nationalité</h2><p class="sub">Le pays qui te verra grandir… et te sifflera à la première contre-performance.</p>' +
    PAYS.map((p, i) => '<button onclick="pickPays(' + i + ')">' + p.flag + ' ' + p.nom + '<span class="b-desc">' + esc(p.desc) + '</span></button>').join("") + '</div>';
  window.scrollTo(0, 0);
}
function pickPays(i) {
  CFG.pays = PAYS[i].id;
  CFG.nom = pick(PRENOMS[CFG.pays]) + " " + pick(NOMS[CFG.pays]);
  renderPoste();
}
function renderPoste() {
  app.innerHTML = '<div class="card"><h2>Ton poste</h2><p class="sub">Il façonnera tes stats, tes events, et le type d\'insultes que tu recevras.</p>' +
    POSTES.map((p, i) => '<button onclick="pickPoste(' + i + ')">' + p.ico + ' ' + p.nom + '<span class="b-desc">' + esc(p.desc) + '</span></button>').join("") + '</div>';
  window.scrollTo(0, 0);
}
function pickPoste(i) { CFG.poste = POSTES[i].id; renderOrigine(); }
function renderOrigine() {
  app.innerHTML = '<div class="card"><h2>Ton origine</h2><p class="sub">D\'où tu viens, avant les projecteurs et les emmerdes.</p>' +
    ORIGINES.map((o, i) => {
      const st = o.stats;
      return '<button onclick="pickOrigine(' + i + ')">' + o.nom + '<span class="b-desc">' + esc(o.desc) + '</span>' +
        '<span class="b-fx">T ' + st.tech + ' · P ' + st.phys + ' · M ' + st.mental + ' · C ' + st.cha + ' · Rép ' + st.rep + ' · 💰 ' + fmtMoney(o.argent) + '</span></button>';
    }).join("") + '</div>';
  window.scrollTo(0, 0);
}
function pickOrigine(i) { CFG.origine = ORIGINES[i].id; renderAdo(); }
function renderAdo() {
  app.innerHTML = '<div class="card"><h2>Ton adolescence</h2><p class="sub">Le mode de vie qui forgera ta discipline… ou ta descente.</p>' +
    ADOS.map((a, i) => '<button onclick="pickAdo(' + i + ')">' + a.nom + '<span class="b-desc">' + esc(a.desc) + '</span></button>').join("") + '</div>';
  window.scrollTo(0, 0);
}
function pickAdo(i) { CFG.ado = ADOS[i].id; renderEntourage(); }
function renderEntourage() {
  app.innerHTML = '<div class="card"><h2>Ton entourage</h2><p class="sub">Qui gère tes intérêts avant même ton premier contrat ?</p>' +
    ENTOURAGES.map((e, i) => '<button onclick="pickEntourage(' + i + ')">' + e.nom + '<span class="b-desc">' + esc(e.desc) + '</span></button>').join("") + '</div>';
  window.scrollTo(0, 0);
}
function pickEntourage(i) { CFG.entourage = ENTOURAGES[i].id; renderClub(); }
function renderClub() {
  app.innerHTML = '<div class="card"><h2>Les clubs t\'ont repéré</h2><p class="sub">Les recruteurs ont maté ton profil. Choisis ta rampe de lancement — ou ton tombeau.</p>' +
    CLUBS_START.map((c, i) => '<button onclick="pickClub(' + i + ')"><span class="badge ' + c.tier + '">' + c.tier + '</span> ' + esc(c.n) + '<span class="b-desc">' + esc(c.desc) + '</span></button>').join("") + '</div>';
  window.scrollTo(0, 0);
}
function pickClub(i) {
  CFG.club = CLUBS_START[i];
  newGame(CFG);
  step();
}

// ---------- selftest ----------
function afterResultTest() {
  if (S.ended) { renderEnd(); return; }
  step();
}
function runSelftest(n) {
  TESTMODE = true; TESTLOG = [];
  const errors = [];
  const repStats = [];
  for (let i = 0; i < n; i++) {
    TESTPLAYS = {};
    try {
      newGame({
        pays: pick(PAYS).id, nom: "Test Bot" + i,
        poste: pick(POSTES).id, origine: pick(ORIGINES).id,
        ado: pick(ADOS).id, entourage: pick(ENTOURAGES).id,
        club: pick(CLUBS_START)
      });
      let guard = 0;
      step();
      while (!S.ended && guard++ < 2000) { step(); }
      if (!S.ended) errors.push("run " + i + ": no ending after guard");
      const counts = Object.values(TESTPLAYS);
      repStats.push({
        total: counts.reduce((a, b) => a + b, 0),
        uniques: counts.length,
        maxRepeat: counts.length ? Math.max.apply(null, counts) : 0
      });
    } catch (err) {
      errors.push("run " + i + ": " + err.message + "\n" + (err.stack || "").split("\n").slice(0, 4).join("\n"));
    }
  }
  const byEnding = {};
  TESTLOG.forEach(r => { byEnding[r.ending] = (byEnding[r.ending] || 0) + 1; });
  const ages = TESTLOG.map(r => r.age);
  const report = [
    "SELFTEST " + (errors.length ? "FAIL" : "OK"),
    "runs=" + n + " completed=" + TESTLOG.length,
    "endings=" + JSON.stringify(byEnding),
    "age min/max=" + Math.min(...ages) + "/" + Math.max(...ages),
    "avg legacy=" + Math.round(TESTLOG.reduce((a, r) => a + r.lg, 0) / TESTLOG.length),
    "avg crapule=" + Math.round(TESTLOG.reduce((a, r) => a + r.cr, 0) / TESTLOG.length),
    "pool total=" + EVENTS.length + " events",
    "repetition: avg events/carriere=" + Math.round(repStats.reduce((a, r) => a + r.total, 0) / repStats.length) +
      " · avg uniques=" + Math.round(repStats.reduce((a, r) => a + r.uniques, 0) / repStats.length) +
      " · max meme event=" + Math.max.apply(null, repStats.map(r => r.maxRepeat)),
    errors.length ? "ERRORS:\n" + errors.join("\n---\n") : "no errors"
  ].join("\n");
  document.title = errors.length ? "SELFTEST FAIL" : "SELFTEST OK";
  document.body.innerHTML = "<pre id='selftest'>" + esc(report) + "</pre>";
  TESTMODE = false;
}

// ---------- boot ----------
if (location.search.indexOf("selftest") >= 0) {
  try { runSelftest(40); }
  catch (err) { document.title = "SELFTEST FAIL"; document.body.innerHTML = "<pre>BOOT FAIL: " + esc(err.message + "\n" + err.stack) + "</pre>"; }
} else if (location.search.indexOf("demo=end") >= 0) {
  NOSAVE = true;
  newGame({ pays: "fr", nom: "Kylian Diallo", poste: "ATT", origine: "cite", ado: "defonce", entourage: "bande", club: CLUBS_START[6] });
  Object.assign(S.career, { matchs: 512, buts: 301, passes: 88, selections: 74, titres: 4, coupes: 2, ldc: 1, cdm: 1, bo: 1, saisons: 18 });
  Object.assign(S.ctr, { putes: 9, grammes: 240, cuites: 14, gav: 3, amendes: 4, bagarres: 2, michtos: 2, magouilles: 1 });
  Object.assign(S.flags, { rival: "mentor", michto: true, pension: true, pote_fin: "barber_ok", capitaine: true });
  S.career.log = [
    { y: 2026, age: 16, club: "AS Monacash", tier: "ELITE", m: 4, b: 1, p: 0, n: 4.8, pos: 7, ic: "" },
    { y: 2027, age: 17, club: "AS Monacash", tier: "ELITE", m: 4, b: 2, p: 1, n: 4.8, pos: 1, ic: "🥇" },
    { y: 2028, age: 18, club: "Brest-la-Tempête", tier: "D1", m: 31, b: 22, p: 5, n: 7.9, pos: 3, ic: "🚚" },
    { y: 2029, age: 19, club: "Paris Saint-Blindé", tier: "ELITE", m: 33, b: 34, p: 8, n: 8.4, pos: 1, ic: "🚚🥇⭐🎖️" }
  ];
  S.argent = 24800; S.age = 34; S.ended = "overdose";
  renderEnd();
} else if (location.search.indexOf("demo=hof") >= 0) {
  renderHof();
} else if (location.search.indexOf("demo=badges") >= 0) {
  renderBadges();
} else if (location.search.indexOf("demo") >= 0) {
  NOSAVE = true;
  newGame({ pays: "fr", nom: "Kylian Diallo", poste: "ATT", origine: "cite", ado: "defonce", entourage: "bande", club: CLUBS_START[6] });
  S.addiction = 35; S.heat = 25; S.ui_sheet = true;
  step();
} else {
  renderGate();
}
