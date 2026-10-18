import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });
const files = [
  "index.html",
  "product.html",
  "checkout.html",
  "styles.css",
  "app.js",
  "products.js",
  "product-detail.js",
  "checkout.js",
  "legal.html",
  "pixelz-logo.svg",
  "pixelz-wordmark.svg"
];
for (const name of files) {
  fs.copyFileSync(path.join(root, name), path.join(dist, name));
}
console.log("PIXELZ storefront built.");