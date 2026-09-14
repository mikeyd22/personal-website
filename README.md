# personal-website

Source for **[damichael.com](https://damichael.com)**, the personal site of
Michael Da. Static, no build step, hosted on Firebase Hosting.

## Pages

| File | What it is |
| --- | --- |
| `public/index.html` | Home page: banner photo, three paragraphs, contact icons |
| `public/projects.html` | Five GIS analysis write-ups with report PDFs |
| `public/drone.html` | Drone page, currently just the heading |
| `public/404.html` | Not-found page |
| `public/site.css` | The one stylesheet, shared by every page |
| `public/theme.js` | Light/dark toggle, loaded blocking in `<head>` |

All plain HTML. Edit in any text editor. The header block is copied into each
page, so a nav change means editing it in all three.

Old URLs `/spatial-analysis` and `/drone-build` redirect (301) to `/projects`
and `/drone` in `firebase.json`.

The drone page's previous content (component list, build log) is saved in
`source-assets/drone-build-content.md` and its photos in
`source-assets/drone/`.

## Theme toggle

Every page follows the visitor's system theme by default. Clicking the
sun/moon saves a choice in `localStorage`. `theme.js` is loaded blocking in
`<head>` so `data-theme` is set before first paint and there is no flash.

## Local preview

Use the Firebase emulator so clean URLs and headers behave like production:

```bash
firebase serve --only hosting --port 5555
```

Claude Code users: `.claude/launch.json` defines this as the `firebase`
config. The `site` config (plain Python server on 5501) works for quick
looks but does not apply headers or clean URLs.

## Deploy

```bash
firebase deploy --only hosting
```

Firebase project: `personal-website-7c1da` (see `.firebaserc`). `public/` is
the hosting root; everything in it ships.

`firebase.json` turns on clean URLs and sets security headers: HSTS, a strict
CSP (`script-src 'self'`, no inline scripts, fonts only from Google Fonts),
nosniff, frame-ancestors none, referrer and permissions policies. Assets are
cached 30 days, CSS and JS one day.

## Assets

`public/assets/` holds only files a page references. Everything in it is
publicly downloadable. Photos are saved without EXIF; if you add new phone
photos, strip the metadata first (the original drone photos carried GPS
coordinates).

`source-assets/` (not deployed) keeps originals and files no page uses right
now: old thumbnails, the logo source, the social card, and so on.

## DNS

Domain is at GoDaddy. Records that matter:

- `@` A record → Firebase Hosting
- `www` CNAME → `personal-website-7c1da.web.app` (Firebase custom domain)
- `@` TXT `v=spf1 -all` (domain sends no mail)
- `_dmarc` TXT (quarantine)

## License

[MIT](LICENSE) © Michael Da
