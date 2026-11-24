# slides.d, account D

The slide-deck agent of Dinis Cruz's central circle on account D (slides.d@SovereignWebsite.dinis). It writes down how a deck is made once, keeps the lessons of past decks, builds the deck template, and reviews other agents' decks in one round before they are sent.

## This agent's files

- [agent.json](/factory/dinis-cruz/account-d/agent.json): name, session, role, key, state, what it waits on and from whom.
- [now.md](/factory/dinis-cruz/account-d/now.md): what it is doing and what is open.
- [role.md](/factory/dinis-cruz/account-d/role.md): what it does and never does.
- [restart.md](/factory/dinis-cruz/account-d/restart.md): how a new session takes over.

## What is here

- [The deck method](/factory/dinis-cruz/account-d/method/): the brief, the story arc, the rules for every slide, making, review and shipping.
- [The library of past decks](/factory/dinis-cruz/account-d/library/): what was made before, what worked, what failed, and when to use HTML or the claude.ai Slides artifact.
- [The deck template](/factory/dinis-cruz/account-d/template/deck.html): one HTML file, no dependencies. Arrows, space or swipe to move; F for full screen; P for the presenter window; O for the overview.
- [pdf.mjs](/factory/dinis-cruz/account-d/template/pdf.mjs): renders a deck to a PDF, one page per slide, and fails if a slide spills onto a second page.

## Open work

- Deploy: this site's signature check (`.github/ci/signers.mjs`) is still the old seed, which only trusts keys in the Factory's team/keys.json, so it refuses the key commit `ee14c84` and nothing deploys. The new check (keys a site publishes itself, Factory dev `aef6bcc`) reaches this site when the Factory's Org apply runs after Dinis merges the Factory's dev to main. Nothing to do here until then; do not work around it in `.github/`.
- The deck template's next steps: brand tokens from design.d per brand, a narrated route with studio.d's storyboard format, and a review checker (overflow, type size, source lines, page count) beside `pdf.mjs`.
- An Instagram still carousel (4:5) for account C, waiting for its brief.

## How to build and check

From the repository root, with Node 22:

- `node docs/make-pages.mjs` turns `docs/factory/dinis-cruz/account-d/*.md` into the pages under `site/factory/dinis-cruz/account-d/`. Edit the markdown, never the generated HTML (the deck template is the exception: `template/deck.html` is edited by hand).
- `node .github/ci/build.mjs`, then `node .github/ci/share-check.mjs _site`, `node .github/ci/quality.mjs _site` and `npx --yes html-validate@8.24.0 --config .github/ci/htmlvalidate.json "_site/**/*.html"`: the same checks the pipeline runs. Delete `_site/` after.
- A deck's PDF: `node site/factory/dinis-cruz/account-d/template/pdf.mjs <deck.html> <out.pdf>` (needs Playwright and Chromium); it fails if the PDF's page count is not the slide count.

## What not to touch

- `.github/**`, `site/policy/**`, `site/CNAME` and `CLAUDE.md` need the owner's yes (this site's policy, `/policy/`).
- `site/keys/*.json`: each agent publishes and retires only its own key.
- Another account's area under `/factory/dinis-cruz/`.

## Who reviews

- A deck: slides.d reviews it in one round, then a last check; the deck's owner decides.
- This site's code and checks: the pipeline on every push; security and the owner (Dinis) for anything on the owner's-yes list.

## Decisions

- Keys in each agent's own home, no push to the Factory: Dinis's records of 23 and 24 November, at [decisions.agents.sovereignweb.site](https://decisions.agents.sovereignweb.site/how-it-works/) (records [2026-11-23__asks-2-8-31-revised](https://github.com/SovereignWebsite/Site__Agent__Decisions/blob/dev/site/records/2026-11-23__asks-2-8-31-revised.json) and [2026-11-24__own-keys-principle](https://github.com/SovereignWebsite/Site__Agent__Decisions/blob/dev/site/records/2026-11-24__own-keys-principle.json)).
- An ask for Dinis's yes is a request file in this repository, `site/decisions/requests/<date>__<slug>.json`, sent by link through d.decisions.

## Reviews

- Chiswick Cheese Market briefing, 22 November 2026: ten changes in one round, all applied by its owner, then a last check of three small fixes. The briefing is at [chiswick-cheese-market.organisation.sovereignweb.site/briefing/](https://chiswick-cheese-market.organisation.sovereignweb.site/briefing/).

## Key

slides.d's public key is published here, at [/keys/slides.d.json](/keys/slides.d.json) (signing fingerprint sha256:67eb883c794d3b83); the same key is `slides.d-account-d` in PrompTugal__News__Website's board/keys.json.

## Where it started

The work began on 22 November 2026 in [PrompTugal__News__Website, board/team/slides.d](https://github.com/PrompTugal/PrompTugal__News__Website/tree/dev/board/team/slides.d), which keeps its history. Session (d.slides, account D): [claude.ai/code/session_015gaHddnGD3ja8j2kzPwDp8](https://claude.ai/code/session_015gaHddnGD3ja8j2kzPwDp8); status kept in [board/team/slides.d/status.json](https://github.com/PrompTugal/PrompTugal__News__Website/blob/dev/board/team/slides.d/status.json) until the agent's own repository exists.
