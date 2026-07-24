# 💀 MAXOU ELEVEN

Parodie hardcore et grossière du mode carrière de [Destiny Eleven](https://destinyeleven.com/).
De 16 ans à la tombe : écris ta légende de crapule. **Fiction, 18+.**

## Jouer

Ouvre simplement `index.html` dans un navigateur. Aucune dépendance, aucun serveur.

```bash
open index.html
```

## Le jeu

Uniquement le mode carrière, refait en version trash :

- **Création** : nationalité → poste → origine (la cité, fils de star, futsal…) → adolescence → entourage (la daronne, l'agent véreux, les gars du bloc) → club de départ (Régional → Élite).
- **Boucle** : ~3 événements narratifs à choix par saison → résumé de saison (matchs, buts, note, classement, objectif, finances) → vieillissement jusqu'à la retraite… ou pire.
- **Stats** : Technique, Physique, Mental, Charisme, Réputation, Discipline, Relation coach, Vestiaire + jauges Forme, Moral, **❄️ Défonce** et **🚨 Problème judiciaire**.
- **Les vices** : coke (avec vraie spirale d'addiction et contrôles antidopage), escorts (chantage sextape, paparazzis), casino, paris truqués, fraude fiscale, bagarres, Lambo bourré, michtos, enfant caché…
- **Systèmes** : mercato et offres de transfert, identité de jeu à 18 ans (modificateurs permanents), traits débloquables, sélection nationale, Coupe du Monde, Ballon d'Or, montées/descentes de club, exil doré dans le Golfe.
- **Diversification** : ~63 événements + variantes de texte aléatoires, cooldown anti-répétition, événements contextuels (course au titre, lutte pour le maintien, année de CDM, année de contrat, lendemain de gloire ou de naufrage), arcs narratifs à personnages récurrents générés par partie (le rival, la michto, le pote du bloc, l'agent rat), et événements spécifiques par poste (boulette du gardien, tacle assassin du défenseur, disette de l'attaquant…).
- **Fins** : retraite, fin de bail, overdose, prison, radiation à vie (dopage ou paris), platane.
- **Bilan final** : points de légende vs points de crapule, rang (du « Génie maudit » à « Monsieur Personne ») et palmarès de crapule (escorts, grammes, GAV, amendes…).
- **Rejouabilité** : 🏛️ Panthéon local (tes 10 meilleures carrières, sauvegardées dans le navigateur), 🎖️ 20 badges à débloquer carrière après carrière (du « Ballon d'Or » à « Revenu de l'autre côté »), record perso affiché à l'accueil, et moments de saison aléatoires dans les résumés (remontada, humiliation en coupe, bus caillassé aux légumes…).

## Dev

- `index.html?selftest=1` — joue 40 carrières automatiques au hasard et affiche un rapport (endings, âges, scores, erreurs).
- `index.html?demo=1` — écran de partie pré-rempli (pour vérifier le rendu).
- `index.html?demo=end` — écran de fin pré-rempli.
- `index.html?demo=hof` / `?demo=badges` — écrans Panthéon / Badges.

Fichiers : `index.html` (coquille + CSS + thème light), `data.js` (création, événements, presse, badges), `events2.js` (événements contextuels, arcs narratifs, événements par poste), `engine.js` (moteur de saison, mercato, UI, fins, persistance locale).
