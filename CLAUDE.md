# Cameron Belcher web

Cameron's own business site: websites for local Auckland businesses. Astro 7 with Svelte 5 islands (runes only), static output. Project decisions, agents and the client request plan live in `Neteree/new-empty-repo` (see its CLAUDE.md).

- **Content:** business details and all prices are in `src/site.config.ts`; portfolio items are in `src/data/work.ts`, with images in `src/assets/work/` (optimised by `astro:assets`).
- **Pricing model:** no monthly fees. A $150 base site, one-off add-ons, then pay per request for changes. Discounted or free deals are word of mouth only, never on the site.
- **Portfolio:** every item is a demo and must keep its "Demo" label until it's replaced with real client work (with permission).
- **Contact form:** `ContactForm.svelte` posts to Web3Forms using `formKey` in `src/site.config.ts` (a public access key, tied to the inbox it emails). While `formKey` is null, the form sends nothing and says so. `email` stays null: form only, no public address.
- **Hosting:** Cloudflare Pages, build command `npm run build`, output folder `dist`. Node version is pinned in `.node-version`.
- **Build:** `npm run build` (runs `scripts/relative-paths.js` afterwards so the build works from any folder). Check phone width (390px) for sideways scrolling.
