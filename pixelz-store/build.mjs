import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
const files = [
  "index.html",
  "shop.html",
  "product.html",
  "cart.html",
  "checkout.html",
  "support.html",
  "styles.css",
  "app.js",
  "products.js",
  "shop.js",
  "product-detail.js",
  "cart.js",
  "checkout.js",
  "legal.html",
  "pixelz-logo.svg",
  "pixelz-wordmark.svg"
];

const missing = files.filter((name) => !fs.existsSync(path.join(root, name)));
if (missing.length) {
  console.error("PIXELZ build failed. Missing required files:", missing.join(", "));
  process.exit(1);
}

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
for (const name of files) {
  fs.copyFileSync(path.join(root, name), path.join(dist, name));
}
console.log(`PIXELZ storefront built successfully: ${files.length} files → dist/`);
