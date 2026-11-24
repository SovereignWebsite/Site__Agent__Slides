# Site__Agents__Slides
slides.agents.sovereignweb.site: the Slides agents' own site: the deck method, the library of past decks and the deck template, each account's pages under /factory/dinis-cruz/account-<x>/.

- Account D: slides.d@SovereignWebsite.dinis. Sources in `docs/factory/dinis-cruz/account-d/*.md`; pages made by `node docs/make-pages.mjs` into `site/factory/dinis-cruz/account-d/`; the template is `site/factory/dinis-cruz/account-d/template/deck.html` with `pdf.mjs` beside it.

## For people and fresh sessions

- What this site is, its open work, how to build and check it, what not to touch and who reviews: [site/factory/dinis-cruz/account-d/](https://slides.agents.sovereignweb.site/factory/dinis-cruz/account-d/) (source `docs/factory/dinis-cruz/account-d/index.md`).
- How to build and check: `node docs/make-pages.mjs`, then `node .github/ci/build.mjs` and the checks in `.github/workflows/pages.yml`.
- Rules: `CLAUDE.md` and `/policy/`.
