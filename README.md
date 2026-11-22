# Anna. Home Organization — website

One-page multilingual (EN / RU / FR / PT) website for Anna Goldfarb, professional home organizer in Portugal & worldwide.

Plain static site: no build step, no framework, no dependencies.

## Structure

```
index.html            Page markup (inside <template id="page">) + meta tags
css/styles.css        All styles
js/app.js             Page logic: translations, contact settings, form, carousel, tabs, language switcher
js/dc-lite.js         Tiny template renderer ({{holes}}, <sc-for>, <sc-if>, onClick/onChange/onSubmit)
assets/images/        Photos (hero, about, before & after)
assets/video/         Intro video + poster
design/Main.dc.html   Original design file from the Claude canvas (reference only, not served)
netlify.toml          Netlify config (publish the repo root)
```

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening index.html directly from disk also works in most browsers.)

## Editing

- **Text / translations:** `js/app.js` → `i18n()` (main copy) and `formI18n()` (contact form). Every string exists in `en`, `ru`, `fr`, `pt`.
- **Contact details:** `js/app.js` → `config()` — WhatsApp, Telegram, Instagram, email, form endpoint.
- **Before & after slides:** `js/app.js` → `slides` array inside `renderVals()`.
- **Styles / colors:** `css/styles.css`. Palette: ivory `#F8F6F2`, beige `#EAE4DA`, sage `#A4AD9B`, charcoal `#33332F`, terracotta `#C79C86` (text accent `#8E5F49`).
- **Template syntax** (in `index.html`): `{{path}}` = value from `renderVals()`; `<sc-for list="{{items}}" as="item">` repeats; `<sc-if value="{{flag}}">` shows conditionally.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) and is delivered to `anna.b.goldfarb@gmail.com` with the subject
`New home org request: {Full Name} / {Service needed}`.

- The **first real submission** sends an activation email to that inbox — Anna must click **Activate** (check spam).
- If the request fails, the visitor gets a fallback link that opens a pre-filled email.
- Alternative: switch to **Netlify Forms** (add `data-netlify="true"` handling) if you prefer submissions in the Netlify dashboard.

## Deploy to Netlify

1. Push this folder to a GitHub repo.
2. Netlify → **Add new site → Import an existing project** → pick the repo.
3. Build command: *(leave empty)*. Publish directory: `.`
4. Deploy, then add a custom domain in **Domain settings**.

## To do before launch

- Replace the privacy-policy placeholder (footer) with the real policy text or a separate `privacy.html`.
- Confirm the client is happy for the medicine-drawer photos to be shown (names are blurred).
- Optional: language-specific URLs (`/en`, `/ru`, `/fr`, `/pt`) with `hreflang` tags for SEO — currently the language is switched in-page.
- Optional: official WhatsApp / Telegram / Instagram icons (current icons are simple line drawings).
