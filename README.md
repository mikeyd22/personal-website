# personal-website

Source for **[damichael.com](https://damichael.com)** — the personal site and
portfolio of Michael Da. Static, no build step, hosted on Firebase Hosting.

## Pages

| File | What it is |
| --- | --- |
| `public/index.html` | One-page portfolio: hero with spinning D3 globe, about, selected work, contact |
| `public/drone-build.html` | Case study / build log for the F450 quadcopter |
| `public/spatial-analysis.html` | Hand-written HTML: five GIS analysis write-ups with report PDFs |
| `public/404.html` | Simple not-found page in the site's colours |

## ⚠️ The HTML files are generated, not hand-written

`index.html` and `drone-build.html` are **self-extracting exports from a Claude
Design canvas**. Each one inlines its fonts and JS libraries as base64 in a
`<script type="__bundler/manifest">` block, plus the real page markup in a
`<script type="__bundler/template">` block. On load, a small loader decodes the
manifest into blob URLs, substitutes them into the template, and then calls
`document.documentElement.replaceWith(...)` — swapping out the entire document.

That has two consequences worth remembering:

1. **Don't hand-edit the page content here.** Re-export from the canvas instead,
   or your changes get overwritten the next time you do.
2. **`<head>` exists twice.** The outer `<head>` is what crawlers, search
   engines and link unfurlers read, because they don't run the JS. The
   template's `<head>` is what the browser ends up with after the swap. The SEO
   and Open Graph tags are duplicated into **both** on purpose — if you
   re-export the canvas, you must re-apply them or the page goes back to
   `<title>Bundled Page</title>` with no description or preview image.

Because the body is rendered by JS, view-source shows no content. The meta tags
and the `Person` JSON-LD block in `index.html` are what give search engines and
social previews something to work with.

## Local preview

```bash
python3 -m http.server 5501 --directory public
```

Then open <http://localhost:5501>. (Claude Code users: `.claude/launch.json`
defines this as the `site` config.)

## Deploy

```bash
firebase deploy --only hosting
```

Firebase project: `personal-website-7c1da` (see `.firebaserc`). `public/` is the
hosting root — everything in it ships.

`firebase.json` turns on clean URLs (`/spatial-analysis`, `/drone-build`) and
sets security headers (HSTS, CSP, nosniff, frame-ancestors none, referrer and
permissions policies) plus a 30-day cache on `/assets/**`. The CSP has to allow
`unsafe-inline`, `unsafe-eval`, `blob:` and unpkg.com because the bundled pages
load React from unpkg at runtime and compile their page script with
`new Function`. Tighten it once those pages are rewritten as plain HTML.

To test headers locally, use the `firebase` config in `.claude/launch.json`
(`firebase serve --only hosting`); the plain Python server does not apply them.

## Assets

`public/assets/` holds the images, resume PDF, report PDFs and social card.
Everything in it is publicly downloadable, so keep it to files the pages
actually use. Photos are saved without EXIF (the original drone photos carried
GPS coordinates); if you add new phone photos, strip the metadata first.

`source-assets/` (not deployed) keeps originals that no page references:
`Michael-Da-thumbail.png` (source of `og-image.png`) and `Canda_GDP_Map.png`.
`favicon-32.png` and `apple-touch-icon.png` come from `personal_logo.png`.

## History

This started life as the [DevFolio](https://github.com/AnilSeervi/DevFolio)
template. None of that code remains — the SCSS, the vendored JS (particles,
scrollreveal, vanilla-tilt) and the template's placeholder assets were all
removed once the canvas-exported pages replaced them.

## License

[MIT](LICENSE) © Michael Da
