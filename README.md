# hansolcreative.github.io

Studio site with per-game privacy policies, terms of service and account deletion pages (KO/EN).

All HTML is generated — edit the sources, not the output.

- `src/games.json` — studio info and one entry per game (logo, store links, `googleLogin`, `iap`, `ads`, `processors`, `effective`)
- `src/legal/` — privacy / terms / deletion templates and the third-party service catalog (`processors.mjs`)
- `css/site.css` — the only stylesheet

## Adding a game

1. Put the logo in `resources/logos/` (app icon → `"logoType": "icon"`, transparent title logo → `"wordmark"`).
2. Add an entry to `src/games.json`. List the SDKs it uses in `processors` (keys from `src/legal/processors.mjs`).
3. Run `node src/build.mjs` and commit the generated files.

Per-game URLs for the store consoles:

- `https://hansolcreative.github.io/games/<slug>/privacy.html`
- `https://hansolcreative.github.io/games/<slug>/terms.html`
- `https://hansolcreative.github.io/games/<slug>/delete-account.html`

`privacy-policy.html` and `delete-account.html` at the root cover every game and stay at the URLs already registered in the stores.

When the content of a policy changes, bump that game's `effective` date and announce it in-game at least 7 days ahead (30 days for unfavorable changes).
