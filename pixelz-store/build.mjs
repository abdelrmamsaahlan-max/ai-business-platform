const fs = require("node:fs");
const path = require("node:path");
const root = process.cwd();
const dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });
for (const name of ["index.html", "styles.css", "app.js", "sourcing.html", "legal.html", "pixelz-logo.svg"]) {
  fs.copyFileSync(path.join(root, name), path.join(dist, name));
}
console.log("PIXELZ static storefront built.");
