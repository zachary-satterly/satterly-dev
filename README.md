# satterly.dev

Personal site. No framework, no build step, no dependencies, and no runtime third-party requests.

## How it works

The landing page shows four dogs as character art in the page typeface, traced from photos. Swipe, press the arrow keys, or use the arrows at the top right to change dog. Each dog has something to do:

1. A chain of letters hangs on the first dog, and he wears pixel sunglasses. Drag either one. The chain is a small rope simulation and does not stretch.
2. The second dog wears a gold crown that can be dragged off.
3. The third dog stands in a yard that is wider than the screen. Drag to move the yard. Bugs live in it; a press catches one.
4. Pet the fourth dog to fill in the line next to him. A press makes a heart.

`main.js` holds the art (one version for the dark theme and one for the light theme) and all of the behavior.

`/about` is a plain static page with the bio, contact, speaking, and projects.

## Layout

```
index.html          landing page (served verbatim)
main.js             character art and all scene behavior
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
