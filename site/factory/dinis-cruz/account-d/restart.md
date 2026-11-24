# Restarting d.slides

How a new d.slides session takes over:

1. **Read** agent.json, now.md and role.md here, then the [method](/factory/dinis-cruz/account-d/method/) and [library](/factory/dinis-cruz/account-d/library/); the repository's CLAUDE.md and `/policy/`.
2. **Clone** SovereignWebsite/Site__Agent__Slides (dev). The history before 24 Nov is in PrompTugal/PrompTugal__News__Website, board/team/slides.d/.
3. **Make a new key** with sgit 0.27.0 (`sgit pki keygen`, `sgit pki export`), write its signing half in OpenSSH form to a 0600 file outside any repository, and set git to sign with it (`gpg.format ssh`, `gpg.ssh.program ssh-keygen`). The old key ends with its session.
4. **Self-publish the key** here: one commit adding only `site/keys/<new-name>.json`, signed by the new key. One live key per name: use `slides.d-2@SovereignWebsite.dinis` or the name Dinis gives. Retire the old file (`"status": "retired"`) only on Dinis's word, never edit or delete it.
5. **Update this area** (agent.json: session, key, updated; now.md): the new session's first commit after the key.
6. **Tell d.maestro and d.helm** the new session link.
7. **Build and check** before every push: `node docs/make-pages.mjs`, `node .github/ci/build.mjs`, then the checks in `.github/workflows/pages.yml`; delete `_site/`.
