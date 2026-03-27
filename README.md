# GTG Perfumes Dashboard (Static Frontend)

Pixel-perfect, responsive landing page for **GTG Perfumes** built with **HTML + CSS + Vanilla JS**.  
Includes a functional product gallery, subscription selection UI, and scroll-triggered stats animation.

## Highlights
- **Responsive header** with hamburger menu on tablet/mobile
- **Functional product gallery** (arrows, dots, thumbnails)
- **Subscription UI** with expandable *Single* / *Double* plans
- **Add to Cart link updates** based on selected options (dummy URL)
- **Stats count-up animation** when the section enters the viewport
- **Comparison section uses a real HTML table**
- **Cross-browser friendly** (Chrome / Firefox / Edge / Safari)

## Tech
- HTML5
- CSS3 (Grid/Flexbox, responsive breakpoints)
- Vanilla JavaScript (no frameworks)

## Project Structure
- `index.html` – page markup
- `css/styles.css` – all styles
- `js/script.js` – interactions (gallery, menus, radios, counters)
- `assets/images/` – images
  - `assets/images/figma/` – design exports (recommended location)

## Run Locally
Option 1 (quick):
- Open `index.html` directly in your browser.

Option 2 (recommended):
- Use **VS Code → Live Server** so links/paths behave like a real site.

## Replacing Images (Figma / Your Exports)
This project is wired to load assets from `assets/images/figma/` and `assets/images/`.

Common swaps:
- Hero background: `assets/images/grass_bottle.png`
- Product gallery: `assets/images/figma/gallery-02.jpg` … `gallery-08.jpg` and `assets/images/figma/group-main.png`
- Fragrance thumbs: `assets/images/figma/fragrance-lily.jpg`, `assets/images/figma/fragrance-rose.jpg`

Keep filenames the same to avoid code changes.

## Key Behaviors (Where to Edit)
- Gallery images list: `js/script.js` (`GALLERY_IMAGES`)
- Plan expand/collapse: `js/script.js` (`setActivePlan`)
- Add-to-cart URL building: `js/script.js` (`updateAddToCartLink`)
- Stats count-up: `js/script.js` (`initStatCounters`)

## Deploy (GitHub Pages)
1. Push to GitHub
2. Repo → **Settings → Pages**
3. Source: **Deploy from branch** → select `main` → `/root`

## Notes
- Links are dummy (example.com) and meant to demonstrate interaction only.
- If you need the UI to match a specific Figma 1:1, export exact assets and overwrite the files under `assets/images/figma/`.

