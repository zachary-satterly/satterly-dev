# satterly.dev

Personal site. No framework, no build step, no dependencies, and no runtime third-party requests.

## How it works

The landing page is one sentence that hangs as a chain on a character-art dog. Each letter is a link in a small rope simulation (`main.js`). You can drag the chain and the sunglasses. The chain does not stretch.

The dog is text characters in the page typeface, traced from a photo. `main.js` holds one version for the dark theme and one for the light theme.

`/about` is a plain static page with the bio, contact, speaking, and projects.

## Layout

```
index.html          landing page (served verbatim)
main.js             chain physics, sunglasses, character art
about.html          about page, no script
favicon.svg         icon
build.sh            Pages build: copies the site into public/
_headers            security headers; strict CSP
```

## Supply-chain posture

- No dependencies. Nothing is fetched from a CDN or a registry.
- `_headers` ships a strict CSP (`default-src 'none'; script-src 'self'`). Nothing external loads, nothing exfiltrates.
- No CI workflows. If any are added: no `pull_request_target`, actions pinned by full SHA, minimal `permissions:`.

## Run locally

```bash
python3 -m http.server 8080
```

## Deploy

Cloudflare Pages: connect the repo, build command `bash build.sh`, output directory `public`.

## License

Site content © Zachary Satterly.
