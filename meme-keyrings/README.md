# KEYROT meme keyrings site

Static site with no build step. To run it, serve this folder and open `index.html`:

    python3 -m http.server 8000   # then visit http://localhost:8000

It has to be served over a local server. Opening it as `file://` won't work, because the 3D code uses ES modules.

## Things to edit
- **Contact / handle**: `CONFIG` at the top of `app.js`.
- **Prices**: `BUNDLES` in `app.js`. The bag always picks the cheapest combination.
- **Characters, names and taglines**: `PRODUCTS` in `art.js`.
- **Real photos**: put the image in `images/` and set `photo: 'images/your-file.png'` on that
  product in `art.js`. A transparent PNG looks best: it gets a white die-cut edge and is
  printed onto the 3D acrylic charm. Products without a photo use the built-in vector art.
- **Specs** (size, materials): the "What you get" section in `index.html`. Make sure it matches your real product.

Three.js r160 is vendored in `vendor/`, so the site works without a CDN.
