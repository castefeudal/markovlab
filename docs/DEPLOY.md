# Deploy MARKOVLAB 3.0 to GitHub Pages

## Ready archive

The release archive contains a `markovlab/` folder. Upload its **contents** to the publishing branch/root. Keep `.nojekyll`. No production build command is required.

1. Create or open a GitHub repository.
2. Place all files from `markovlab/` at the repository root.
3. In **Settings → Pages**, choose the publishing branch and root folder.
4. Wait for Pages to publish, then open `https://<owner>.github.io/<repository>/`.
5. Test profile persistence, one calculation, explicit history save, export/import and offline reload.

All runtime paths are relative, hash routes do not require server rewrites, and the manifest/service worker scope remains inside the repository subpath.

## Final domain input

When the public base URL is known, edit only:

```js
// assets/js/config.js
productionBaseUrl: 'https://example.com'
```

Do not add a trailing slash. The application will create canonical and social URL metadata from this value. Generate a domain-based sitemap only after this input is real; the included sitemap intentionally remains empty rather than inventing a URL.

## PWA notes

- HTTPS is supplied by GitHub Pages.
- Offline works after a successful first load.
- A new release must change the cache version in `sw.js`.
- Update UI appears when a new worker has installed and waits for explicit user action.
- Keep all new runtime assets same-origin and relative so repository subpaths and offline scope remain correct.
