# Étude de marché — Cloner Guideflow en France

*Rédigée le 30 septembre 2026. Sources en fin de document.*

---

## 0. Point de vigilance avant tout

**Guideflow est déjà une entreprise française.** Fondée en 2023, siège à Neuilly-sur-Seine / Paris, ~25 personnes, seed round bouclé en novembre 2024 auprès de Kima Ventures, 50 Partners et 14Peaks Capital. Son site est en anglais et son go-to-market est mondial (Paris + San Francisco), mais elle vend déjà en France.

Conséquence : « faire la même chose en France » ne peut pas se résumer à une localisation. Il faut un angle différenciant (voir section 7). Le reste de l'étude part de ce constat.

---

## 1. Le produit Guideflow

**Catégorie** : plateforme de démos produit interactives (« demo automation »). On capture son logiciel via une extension Chrome, on obtient une réplique cliquable (screenshots ou HTML), on l'enrichit (tooltips, branches, formulaires de leads, voix off IA, traduction IA) puis on la partage par lien ou embed sur site, email, blog, base de connaissance.

**Cas d'usage** : marketing (démo « Take a tour » sur le site), sales (démo personnalisée envoyée avant/après call), support et onboarding (guides pas-à-pas), formation interne.

**Tarifs (facturation annuelle, USD)**

| Plan | Prix / mois | Inclus |
|---|---|---|
| Free | 0 | 5 guideflows, viewers illimités, analytics 7 jours, watermark |
| Solo | 35–40 | Guideflows illimités, analytics avancés, lead forms, IA, export vidéo/GIF |
| Growth | 499 | 10 sièges inclus, capture HTML, personnalisation IA, branching avancé |
| Advanced | 1 499 | Sandbox, environnement cliquable, démos offline |
| Enterprise | dès 2 999 | SSO, sécurité, support dédié |

**Traction** : 143 avis G2, note 5,0/5. Bootstrappé au départ, puis levée seed.

**Forces perçues** : facilité d'usage, rapidité de création, support réactif, prix bas pour petites équipes (sièges groupés).

**Faiblesses perçues** : capture HTML verrouillée au palier 499 $/mois, écosystème d'intégrations plus petit que Navattic/Storylane, branching moins profond, produit jeune parfois buggy, personnalisation limitée, capture uniquement via Chrome (pas d'app desktop ni plugin Figma).

---

## 2. Taille et dynamique du marché

**Mondial**

| Indicateur | Valeur | Source |
|---|---|---|
| Marché des plateformes de démo interactive 2025 | 3,2 Md$ | Dataintelo |
| Projection 2034 | 10,8 Md$ (CAGR 14,4 %) | Dataintelo |
| Segment « demo automation software » 2025 | 504 M$ → 1,57 Md$ en 2035 (CAGR 12 %) | DataHorizzon |
| Croissance des démos interactives sur les sites B2B SaaS depuis 2022 | +80 % | Navattic 2025 |
| Sites B2B avec un CTA « Take a tour » | +29 % en 2 ans | Navattic 2025 |

Les chiffres des cabinets divergent fortement (périmètres différents). Retenir l'ordre de grandeur : quelques centaines de M$ pour le cœur de catégorie, croissance à deux chiffres.

**Comportement acheteur** : 83 % des acheteurs B2B se renseignent seuls avant de parler à un commercial ; ils ne passent que 17 % de leur temps d'achat avec des fournisseurs. Résultats reportés par les éditeurs : conversion demande-de-démo passée de 4,5 % à 7,3 % après embed, +20–25 % de leads qualifiés, conversion démo→opportunité ×3 vs page produit statique.

**France**

| Indicateur | Valeur | Source |
|---|---|---|
| CA des éditeurs de logiciels et plateformes 2025 | 29,1 Md€ (+8,2 %) | Numeum |
| Dont SaaS | 18,7 Md€ (+13 %) vs 10,3 Md€ on-premise | Numeum |
| Éditeurs disposant d'une offre SaaS | 85 % | Numeum S2 2025 |
| Top 250 éditeurs français | 23,1 Md€ (+7,4 %) | EY / Numeum |
| Part de la France dans le SaaS européen | 15 % (3e) | Tool Advisor |

Cible adressable en France : quelques milliers d'éditeurs SaaS B2B (Top 250 + scale-ups French Tech + longue traîne de PME éditrices), plus les ESN/intégrateurs qui démontrent des solutions tierces, plus les équipes support/formation des grands comptes.

---

## 3. Paysage concurrentiel

| Acteur | Origine | Positionnement | Prix d'entrée | Notes |
|---|---|---|---|---|
| **Guideflow** | France | Facile, bon rapport prix/équipe | Free / 35 $ | Déjà sur le marché français |
| **Navattic** | US | Référence capture HTML haute fidélité, workflows | Sur devis | Le plus « enterprise marketing » |
| **Storylane** | US | Sandbox, intégrations, sales | Free / 40 $/user | Add-ons coûteux, courbe d'apprentissage |
| **Arcade** | US | Design, personnalisation, rapidité (6 min capture→publish) | Free / 32 $/user | Beaucoup de formats de sortie |
| **Supademo** | Canada | IA (voix, clone, traduction, agents) | Free / 27 $/user | Capture HTML en retrait |
| **Walnut** | Israël | Sales enterprise, personnalisation | Sur devis | 56 M$ levés |
| **Reprise, Demostack, Consensus, Saleo** | US | Enterprise presales, démos live | 100–200 k$/an (Reprise) | Grands comptes uniquement |
| **HowdyGo, Puppydog, Layerpath, Hexus** | Divers | Challengers low-cost / IA | 20–40 $/user | Longue traîne |

**Adjacents en France** : Stonly (guides interactifs support, Paris), Screeb (feedback in-app, Nantes). Ils ne font pas de démo commerciale mais touchent les mêmes acheteurs produit/support.

**Constat** : aucun acteur ne s'adresse spécifiquement au marché français en français, avec hébergement France/UE, conformité RGPD native et un positionnement « souveraineté ». Guideflow elle-même joue la carte internationale.

---

## 4. Segments clients en France

1. **Scale-ups SaaS B2B (50–500 salariés)** — équipes Product Marketing et Sales. Besoin : démos site web, démos personnalisées par les SDR/AE. Budget 5–30 k€/an. Décideur : Head of Marketing / CRO.
2. **Éditeurs mid-market et grands comptes (Top 250)** — besoins presales complexes, sandbox, SSO, hébergement UE, DPA. Budget 30–150 k€/an. Cycle long, appels d'offres.
3. **PME éditrices et agences / intégrateurs** — démos de solutions tierces, support client. Budget < 5 k€/an. Self-serve.
4. **Équipes formation / support internes** (banques, assurances, secteur public) — guides pas-à-pas pour outils métier. Exigence forte : données on-premise ou cloud souverain (SecNumCloud).

Le segment 4 est celui que les acteurs américains adressent le moins bien et où la souveraineté est un vrai critère d'achat.

---

## 5. Réglementation et contraintes locales

- **RGPD** : les démos capturent des interfaces contenant parfois des données personnelles ; les formulaires de leads et l'analytics viewer sont soumis au consentement (CNIL). Argument commercial : anonymisation automatique des captures, hébergement des données en France.
- **Hébergement** : proposer un hébergement UE par défaut (Scaleway, OVHcloud, Outscale) et une option SecNumCloud pour le public/régulé.
- **Accessibilité** : RGAA obligatoire pour le secteur public ; peu de concurrents conformes → différenciant.
- **Langue** : produit, support, documentation et voix off IA en français natif (les concurrents traduisent, rarement bien).

---

## 6. Modèle économique proposé

**Tarification** en euros, HT, alignée sur la sensibilité prix française (inférieure aux US) :

| Plan | Prix / mois (annuel) | Cible |
|---|---|---|
| Gratuit | 0 € | 3 démos, watermark, analytics 7 j |
| Starter | 29 € / utilisateur | Indépendants, PME |
| Équipe | 349 € (5 sièges inclus) | Scale-ups — **capture HTML incluse dès ce palier** (attaque directe de la faiblesse de Guideflow) |
| Business | 990 € (15 sièges) | Sandbox, SSO, hébergement France, DPA |
| Souverain | sur devis | SecNumCloud / on-premise, RGAA, support 24/7 FR |

**Unit economics cibles (année 2–3)** : ACV moyen 6–8 k€, CAC < 4 k€ via contenu SEO FR + partenariats (Numeum, French Tech, agences growth), churn annuel < 15 %, marge brute > 80 %.

**Objectif de revenus indicatif** : 200 clients payants à 18 mois ≈ 1–1,2 M€ ARR ; 600 clients à 36 mois ≈ 3,5–4 M€ ARR.

---

## 7. Positionnement recommandé

Ne pas copier Guideflow, mais l'attaquer sur trois axes qu'elle a laissés ouverts :

1. **Souveraineté et conformité** : hébergement France, RGPD natif, RGAA, SecNumCloud en option. Argument décisif pour le public, la santé, la finance et les grands comptes.
2. **Prix d'accès à la capture HTML** : la débloquer dès ~350 €/mois au lieu de 499 $/mois. C'est la fonctionnalité qui fait la différence entre une « slideshow » et une vraie démo.
3. **Français natif et écosystème local** : intégrations avec les outils utilisés en France (Sellsy, Axonaut, Brevo, HubSpot FR, Pipedrive, Salesforce, Lemlist, Aircall, Qonto pour la facturation), voix off IA FR de qualité, support FR en journée.

**Nom de catégorie** : « démo produit interactive » / « démo automatisée ». Le terme n'a pas encore de propriétaire en français sur Google — opportunité SEO.

---

## 8. Roadmap produit MVP (6 mois)

| Mois | Livrable |
|---|---|
| 1–2 | Extension Chrome de capture (screenshots), éditeur de parcours, hotspots/tooltips, partage par lien et embed |
| 3 | Capture et édition HTML (masquage/remplacement de texte, blur données perso), analytics par étape, formulaire de leads |
| 4 | Branching, personnalisation par variables (nom, société, logo), export vidéo/GIF, voix off IA FR |
| 5 | Intégrations HubSpot, Salesforce, Brevo, Slack, webhooks ; SSO SAML ; hébergement UE |
| 6 | Sandbox cliquable (bêta), API publique, marketplace de templates FR |

**Stack suggérée** : Next.js + TypeScript, Postgres (Supabase ou RDS UE), stockage objet Scaleway, extension Chrome Manifest V3, rendu HTML via DOM snapshot (rrweb-like), IA via API Claude pour descriptions, traductions et voix (TTS partenaire FR).

---

## 9. Go-to-market France

- **SEO français** : « démo interactive », « démo produit », « alternative Navattic », « alternative Guideflow ». Concurrence faible en FR.
- **Product-led** : plan gratuit + watermark = boucle virale (chaque démo diffusée fait la pub).
- **Communauté** : Product Marketing Alliance FR, Les Product Marketers, Sales Ops FR, meetups French Tech.
- **Partenariats** : agences growth/RevOps, intégrateurs HubSpot/Salesforce, Numeum, Bpifrance (référencement solutions), Station F.
- **Grands comptes** : réponse aux appels d'offres via UGAP/marchés publics une fois SecNumCloud obtenu.
- **Comparatifs assumés** : pages « X vs nous » comme le font tous les acteurs (Storylane, Arcade, Saltfish).

---

## 10. Risques

| Risque | Gravité | Mitigation |
|---|---|---|
| Guideflow renforce son offre FR (elle est déjà là) | Élevée | Vitesse sur la souveraineté + prix HTML ; ne pas jouer sur son terrain « facilité » |
| Commoditisation par l'IA (génération de démos depuis un prompt/vidéo) | Élevée | Intégrer l'IA dès le MVP ; miser sur la conformité et les intégrations, pas seulement la capture |
| Marché FR trop petit pour un pure player | Moyenne | Viser DACH/Benelux/Espagne dès l'an 2 avec le même argument « hébergement UE » |
| Coût d'acquisition élevé face à des concurrents financés (Walnut 56 M$) | Moyenne | PLG + SEO FR à faible coût ; éviter le paid US |
| Dépendance à l'extension Chrome | Faible | Ajouter capture Firefox/Edge et app desktop |

---

## 11. Besoins de financement

- **Pré-seed 300–500 k€** : 2 fondateurs + 2 devs, MVP 6 mois, 50 premiers clients.
- **Seed 1,5–2,5 M€** (mois 12–18) : équipe 10–12, SecNumCloud, sales grands comptes, expansion UE.
- Sources : Bpifrance (Bourse French Tech, prêt d'amorçage), Kima Ventures (attention : déjà investisseur de Guideflow → conflit), 50 Partners (idem), Elaia, ISAI, Breega, business angels SaaS.

---

## 12. Conclusion

Le marché est réel, en croissance à deux chiffres, et la France est le 3e marché SaaS européen. Mais l'espace « clone de Guideflow » est déjà occupé par Guideflow elle-même, qui est française. La fenêtre se situe sur un positionnement **souverain, conforme et moins cher sur la capture HTML**, avec un ancrage dans l'écosystème SaaS français puis européen. Sans cet angle, le projet est un me-too face à un acteur local financé et à cinq acteurs américains mieux dotés.

---

## Sources

- [Guideflow — About](https://www.guideflow.com/company/about-us) · [Pricing](https://www.guideflow.com/pricing)
- [Nordic9 — Guideflow pre-seed](https://nordic9.com/news/guideflow-raised-pre-seed-funding-with-angel-investors-in-france/) · [PitchBook — Guideflow](https://pitchbook.com/profiles/company/534513-97) · [Tracxn — Guideflow](https://tracxn.com/d/companies/guideflow/__xXZ2zkL9gqcRy5c0x6NBz08c3MXFnmUXk_z1H3DTNMU)
- [G2 — Guideflow reviews](https://www.g2.com/products/guideflow-2023-08-01/reviews)
- [Saltfish — Guideflow review](https://saltfish.ai/blog/guideflow-review) · [Saltfish — Guideflow alternatives](https://www.saltfish.ai/blog/guideflow-alternatives) · [ColdIQ — Guideflow pricing](https://coldiq.com/blog/guideflow-pricing)
- [Storylane — Guideflow alternatives](https://www.storylane.io/blog/guideflow-alternatives) · [Arcade — Guideflow alternatives](https://www.arcade.software/post/guideflow-alternatives) · [Arcade — Best interactive demo software 2026](https://www.arcade.software/post/best-interactive-demo-software-2026)
- [Supademo — Storylane alternatives](https://supademo.com/blog/storylane-alternatives) · [Storylane — Walnut alternatives](https://www.storylane.io/blog/top-walnut-alternatives)
- [Dataintelo — Interactive Demo Platform Market](https://dataintelo.com/report/interactive-demo-platform-market) · [DataHorizzon — Demo Automation Software Market](https://datahorizzonresearch.com/demo-automation-software-market-45251)
- [Navattic — State of the Interactive Product Demo 2025](https://www.navattic.com/report/state-of-the-interactive-product-demo-2025) · [Walnut — Interactive demos convert](https://www.walnut.io/blog/sales-tips/interactive-demos-b2b-content-marketing-convert/) · [Optif — Demo-to-close rate](https://optif.ai/learn/questions/demo-to-close-conversion-rate/)
- [Numeum — Bilan 2025 / perspectives 2026](https://numeum.fr/wp-content/uploads/2025/12/Numeum_Communique-de-presse-S2-2025-2026.pdf) · [EY / Numeum — Top 250 éditeurs 2025](https://www.ey.com/fr_fr/newsroom/2025/10/panorama-top-250-des-editeurs-de-logiciels-francais-15eme-edition) · [Tool Advisor — Chiffres SaaS](https://tool-advisor.fr/blog/chiffres-logiciels-saas/)
- [TechCrunch — Stonly](https://techcrunch.com/2019/07/17/stonly-lets-you-create-interactive-step-by-step-guides-to-improve-support/)
