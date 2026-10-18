import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
fs.mkdirSync(dist, { recursive: true });
for (const name of ["index.html", "styles.css", "app.js", "sourcing.html", "legal.html", "pixelz-logo.svg", "pixelz-wordmark.svg"]) {
  fs.copyFileSync(path.join(root, name), path.join(dist, name));
}
console.log("PIXELZ static storefront built.");
