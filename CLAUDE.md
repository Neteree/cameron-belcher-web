# Cameron Belcher web

Cameron's own business site: websites for local Auckland businesses. Astro 7 with Svelte 5 islands (runes only), static output. Project decisions, agents and the client request plan live in `Neteree/new-empty-repo` (see its CLAUDE.md).

- **Content:** business details and all prices are in `src/site.config.ts`; portfolio items are in `src/data/work.ts`, with images in `src/assets/work/` (optimised by `astro:assets`).
- **Pricing model:** no monthly fees. A $150 base site, one-off add-ons, then pay per request for changes. Discounted or free deals are word of mouth only, never on the site.
- **Portfolio:** every item is a demo and must keep its "Demo" label until it's replaced with real client work (with permission).
- **Contact form:** `ContactForm.svelte` posts to Web3Forms using `formKey` in `src/site.config.ts` (a public access key, tied to the inbox it emails). The key is set; if it were null, the forms would send nothing and say so. `email` stays null: form only, no public address.
- **Onboarding:** `onboarding.html` (private: not linked, `noindex`) collects a new client's details and look, sent through Web3Forms with a `---CLIENT-JSON---` block that the starter's `scripts/onboard.js` turns into their site. Add-ons come from the link (`?modules=food`). Look choices in `src/data/themes.ts` must match the starter's `src/themes.ts`.
- **Change requests:** `request.html` (private, `noindex`, linked from client emails) lets a client list changes (wording, hours, news, menu items, or something else). It sends a `---CHANGES-JSON---` block that `ops/intake.js` in `new-empty-repo` reads; the change types must match the starter's `scripts/changes.js`.
- **Hosting:** Cloudflare Pages, build command `npm run build`, output folder `dist`. Node version is pinned in `.node-version`.
- **Build:** `npm run build` (runs `scripts/relative-paths.js` afterwards so the build works from any folder).
- **Checks:** `npm run check` builds, then checks HTML, spelling (NZ/UK English; add real names to `cspell.json`), phone and desktop layout, images, links, forms and accessibility (including colour contrast). Screenshots go in `check-output/`. Run it before every push; GitHub Actions also runs it on every pull request (`.github/workflows/check.yml`, same as the starter's).
- **Share image and icons:** `public/og.png` and `public/apple-touch-icon.png` come from `npm run share-images`; `public/favicon.svg` is hand-written. The share image only appears in link previews once `url` is set in `src/site.config.ts`.
- **Parked (Cameron to set up later):** Cloudflare Pages account and deploy, custom domain, then set `url` to the live address. See the Parked list in `new-empty-repo`'s CLAUDE.md.
