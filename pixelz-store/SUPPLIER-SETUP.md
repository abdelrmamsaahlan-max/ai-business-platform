# Pixelz sourcing decision (checked 19 October 2026)

## Decision for the first test

**Do not turn on Pixelz checkout yet.** The current 13-item catalog is a visual preview with illustrative SVGs and indicative EGP prices; it is not a supplier-synced inventory feed. The page deliberately has `window.PIXELZ_PREVIEW_MODE=true`, so adding items and checkout cannot create a real order. Keep that protection until item, price, delivery, payout and return terms are verified.

### Zero-capital route: Angazny affiliate, Egypt-first

Official source: https://www.angazny.com/  
Registration: https://eg.angazny.com/register

The public site says affiliate registration is free, promoters can select listed products and share them through social media/WhatsApp, and the platform manages delivery/collection for its network. Its FAQ currently states successful-delivery commissions can be withdrawn from EGP 100 and shows an EGP 80 nationwide shipping rate. These are the platform's own public statements, not an earnings guarantee. Re-check them in the dashboard before relying on them.

Important limitation: this is an **affiliate / reseller network**, not verified proof of a supplier API that can automatically sync stock into Pixelz or accept checkout payments under Pixelz. No direct API integration or affiliate account has been connected in this repository because no authorized account, product links, or API documentation/credentials were supplied.

**Recommended first product types to look for inside the logged-in catalog:**
1. Plain desk mats / mouse pads (low-complexity, easy to demonstrate).
2. Desk organisation accessories or headset stands (small, light, fewer compatibility questions).
3. Basic wired mouse/keyboard bundles (only after checking real images, exact model, return terms and stock).

Do not promote a category until the exact SKU, commission, live selling price, inventory, customer-facing delivery promise and return/cancellation rules are visible in the affiliate dashboard. Prefer real supplier images and product names; do not reuse the preview SVGs as if they were photos of the item.

This route requires organic marketing and does not guarantee sales. The landing page can help explain PIXELZ, but customers must use the platform's authorized tracking link for commission attribution. Do not make up or manually guess affiliate URLs.

### Why not use CJdropshipping for an Egypt-first launch?

Official sources:
- https://cjdropshipping.com/user-agreement
- https://www.cjdropshipping.com/prime

CJ offers a free tier for basic listing/sourcing features, but its user agreement flags Egypt as a destination with possible customs-clearance delays and restricts some delivery dispute claims. Shipping cost also varies by exact SKU, weight/parcel dimensions, destination and shipping channel. Therefore, do not select CJ for Egypt-bound orders unless the supplier confirms the precise SKU, route, tracking, customs handling and dispute coverage in writing.

### Local wholesale alternative: HDML (not the zero-capital route)

Catalog: https://www.hdmlstore.com/catalog

HDML describes itself as an Egyptian electronics wholesaler and its public catalog states per-product minimums apply. Its product page listings say availability is confirmed after ordering and deliveries typically take 15–30 days. That makes it a possible future quotation source, **not a verified no-inventory supplier** for the current plan. Do not publish its wholesale prices as Pixelz retail prices without a margin calculation and written fulfilment agreement.

## Required connection checklist

Before changing `PIXELZ_PREVIEW_MODE` to `false`:
- A guardian-approved account where required, using accurate account details.
- Written supplier permission and exact product/affiliate links (or published API documentation and owner-managed credentials).
- Live item price, stock, commission or wholesale cost, shipping fee, tracking, delivery range and returns checked.
- A test order process that does not collect card details on this static site.
- A reliable payout method and confirmation that the account holder is eligible.
- Recalculate profit after shipping, failed deliveries, returns, payment costs and any tax/import costs.

Never commit API keys, session cookies, passwords, or payout credentials to GitHub. Secrets must stay in the approved provider dashboard/server environment.

## Go/no-go status

- Storefront style update: in progress on branch `pixelz-store`.
- Supplier selected for a no-inventory first test: Angazny affiliate, Egypt-only pending account/age eligibility and product checks.
- Supplier account connection: **not connected**.
- Verified product SKUs and affiliate links: **not yet available**.
- Customer orders: **keep disabled** until the items above are confirmed.
