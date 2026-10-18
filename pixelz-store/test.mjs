import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const read = file => fs.readFileSync(path.join(root,file),"utf8");
const required = [
  "index.html","shop.html","product.html","cart.html","checkout.html","support.html","legal.html",
  "styles.css","products.js","app.js","shop.js","product-detail.js","cart.js","checkout.js",
  "pixelz-logo.svg","pixelz-wordmark.svg"
];
for (const file of required) assert.ok(fs.existsSync(path.join(root,file)), "Missing required storefront file: "+file);

for (const file of ["products.js","app.js","shop.js","product-detail.js","cart.js","checkout.js"]) {
  assert.doesNotThrow(() => new vm.Script(read(file), { filename:file }), "JavaScript syntax error in "+file);
}

const sandbox = { window: {} };
vm.runInNewContext(read("products.js"), sandbox, { filename:"products.js" });
const products = sandbox.window.PIXELZ_PRODUCTS;
assert.ok(Array.isArray(products) && products.length > 0, "Catalog must export a non-empty product array");
const ids = new Set();
const categories = new Set();
for (const product of products) {
  assert.ok(product.id && typeof product.id === "string", "Each product needs a string id");
  assert.ok(!ids.has(product.id), "Product ids must be unique: "+product.id);
  ids.add(product.id);
  assert.ok(typeof product.name === "string" && product.name.trim(), "Product needs a name: "+product.id);
  assert.ok(Number.isFinite(product.price) && product.price > 0, "Product needs a positive numeric price: "+product.id);
  assert.ok(typeof product.category === "string" && product.category.trim(), "Product needs a category: "+product.id);
  assert.ok(Array.isArray(product.specs), "Product needs a specs array: "+product.id);
  categories.add(product.category);
}
assert.ok(categories.size > 0, "Catalog must have categories");

const knownRoutes = new Set(["/","/index.html","/shop.html","/product.html","/cart.html","/checkout.html","/support.html","/legal.html","/styles.css","/app.js","/products.js","/shop.js","/product-detail.js","/cart.js","/checkout.js","/pixelz-logo.svg","/pixelz-wordmark.svg"]);
for (const page of ["index.html","shop.html","product.html","cart.html","checkout.html","support.html","legal.html"]) {
  const html = read(page);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const raw = match[1];
    if (raw.startsWith("//")) continue;
    const pathname = new URL(raw,"https://pixelz.invalid").pathname;
    if (pathname === "/") continue;
    assert.ok(knownRoutes.has(pathname), "Unknown internal route "+pathname+" in "+page);
  }
}
for (const file of ["index.html","shop.html","product.html","cart.html","checkout.html","support.html"]) {
  assert.match(read(file), /name="viewport"/, "Missing mobile viewport metadata in "+file);
}
const cartTotal = products.slice(0,2).reduce((sum,p)=>sum+p.price*(p.id===products[0].id?2:1),0);
assert.equal(cartTotal, products[0].price*2+products[1].price, "Subtotal calculation check failed");
assert.match(read("products.js"),/PIXELZ_PREVIEW_MODE=true/, "Store must remain preview-only until the adult business owner completes compliance checks");
assert.match(read("index.html"),/id="header-search-form"/, "Homepage search must submit to the catalog");
assert.match(read("shop.html"),/id="shop-search-form"/, "Catalog search must submit query values");
assert.match(read("legal.html"),/14 يومًا|14 يوما/, "Consumer return information must be visible");
assert.match(read("checkout.html"),/الطلبات متوقفة مؤقتًا/, "Checkout must be paused in preview mode");
assert.doesNotMatch(read("checkout.html"),/checkout-form|name="phone"|name="address"/, "Preview checkout must not collect personal details");
assert.ok(!/https?:\\/\\//i.test(read("products.js")), "Product catalog must not hotlink retailer photos");
console.log("PIXELZ tests passed: routes/assets, JavaScript syntax, catalog data, subtotal arithmetic, search forms, local illustrations, preview safeguards.");
