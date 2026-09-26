# satterly.dev

Personal site with a typed headline. No framework, no build step, and no runtime third-party requests.

## How it works

The headline types itself out, and nothing below it shifts while it types. That's [`@chenglou/pretext`](https://github.com/chenglou/pretext): the final text's wrapped height is computed up front (`prepare()` + `layout()`, pure arithmetic, no DOM reflow) and set as `min-height` before the first character appears. Recomputed on resize; falls back to a one-shot clone measurement if the module fails to load.

## Layout

```
index.html          homepage (served verbatim)
main.js             typewriter + height reservation
favicon.svg         icon
vendor/pretext/     the one dependency, vendored at a pinned version (MIT)
build.sh            Pages build: copies the site into public/
_headers            security headers; strict CSP
```

## Supply-chain posture

- The dependency is vendored, not fetched from a CDN at runtime. To update: `npm pack @chenglou/pretext@<ver>`, diff `dist/`, replace `vendor/pretext/`.
- `_headers` ships a strict CSP (`default-src 'none'; script-src 'self'`) — nothing external loads, nothing exfiltrates.
- No CI workflows. If any are added: no `pull_request_target`, actions pinned by full SHA, minimal `permissions:`.

## Run locally

```bash
python3 -m http.server 8080
```

## Deploy

Cloudflare Pages: connect the repo, build command `bash build.sh`, output directory `public`.

## License

Site content © Zachary Satterly. `vendor/pretext/` is MIT, © chenglou (license included).
