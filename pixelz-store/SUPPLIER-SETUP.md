# Pixelz supplier plan — keyboards, mice and gaming accessories

Updated: 19 October 2026

## Direction

PIXELZ is an Egypt-first gaming-accessories storefront for keyboards, gaming mice, mousepads, headsets and setup accessories. The visual catalog in `products.js` is a **preview only**, with illustrative local SVGs and indicative prices. It is not synced to a supplier's inventory or wholesale list.

**Do not activate checkout yet.** Pixelz has not received a written supplier quote, one-piece fulfilment agreement, confirmed stock feed, authorized product images, or approved payment/return workflow. `window.PIXELZ_PREVIEW_MODE=true` must remain enabled until those exist.

## First supplier to approach: Essawy Group (Elessawi)

Website: https://www.elessawi.com/  
Arabic brand portfolio: https://www.elessawi.com/ar/brands  
Wholesale / reseller contact page: https://www.elessawi.com/ar/contact  
Sales email published by the company: info@elessawi.com  
Phone published on the company site: +20 10 25069999

The company's public website describes it as Egypt's official Redragon distributor and lists AULA, T-Dagger and Marvo among its gaming-peripheral partner brands. It invites registered resellers and retail buyers to request volume pricing and bulk-order fulfilment. This makes it a relevant **local authorized-supply prospect** for keyboard, mouse and headset sourcing.

**Important:** The public information does not confirm consumer-by-consumer dropshipping, no minimum order, or an API that can sync stock/prices with Pixelz. Treat those points as unanswered questions—not supported features. No account was created and no connection/integration has been made.

## Ask the supplier these questions before listing any SKU

1. Can you supply single orders shipped directly to a Pixelz customer, or do you only supply bulk/wholesale orders?
2. Is there a minimum order value or minimum quantity per SKU? What are the reseller registration and account-age requirements?
3. Can you provide a current price list, available stock, exact model/colour/SKU, warranty terms and expected restock time?
4. If you ship on our behalf, can parcels be sent without a wholesale invoice or third-party branding? What paperwork is included?
5. What are delivery costs/timings to Cairo and other Egyptian governorates? Is cash on delivery available for approved resellers?
6. How are damaged, missing, failed-delivery and returned orders handled? Who pays each return/shipping cost?
7. Can we use their authorized product photos and descriptions, and do they offer a CSV/XML/API stock-and-price feed?
8. What payment/payout terms apply, and can a parent/guardian hold or supervise any required account if the platform's rules require an adult?

### Message template (have a parent/guardian review before sending)

**Subject:** Reseller quote request — gaming keyboards, mice and accessories for PIXELZ

Hello Essawy Sales Team,

We are preparing PIXELZ, a small Egypt-focused online catalog for gaming keyboards, mice, mousepads and headsets. We are looking for an authorized source for genuine products and warranty-backed supply.

Could you please let us know:
- whether you support single-item orders shipped directly to the end customer, or require bulk purchases;
- reseller eligibility, any minimum quantities and the process to receive a current reseller price list;
- available Redragon, AULA, T-Dagger and Marvo keyboard/mouse/headset SKUs, stock status and warranty details;
- shipping costs and delivery times across Egypt, and how returns/failed deliveries are handled;
- whether approved resellers may use your product photos and whether a CSV/XML/API stock feed is available.

We will not publish a product as available until price, stock, shipping and warranty terms are confirmed. Please let us know the appropriate next step and any required documentation.

Thank you,
PIXELZ

## Product shortlist to request (not yet committed)

Ask Essawy for a quote and availability on these exact candidate models/categories first:
1. **Redragon S102** wired keyboard + mouse combo — retail reference only: https://www.gamesworldegypt.com/redragon-s102-yaksaenemeanlion-gaming-combo-keyboarde-mouse
2. **Redragon K552 Kumara** TKL keyboard — market reference only: https://qarenly.com/en/uptodate/redragon-k552-kumara-mechanical-gaming-keyboard-black-10282
3. **Redragon K617 Fizz** 60% keyboard — market reference only: https://connect4techs.com/hardware-prices/redragon-k617-fizz/
4. **AULA F75 Max** 75% keyboard — market reference only: https://plugz-eg.com/shop/
5. **Redragon M612 Predator** wired gaming mouse — market reference only: https://www.qualityeg.com/shop/m612-redragon-gaming-mouse-predator-m612-rgb-4103
6. **Redragon H510 Zeus-X** headset — market reference only: https://www.jumia.com.eg/redragon-h510-zeus-x-rgb-wired-gaming-headset-black-134935568.html
7. **Extended 90 × 40 cm mousepad** — only if the supplier confirms an exact available model and approved image.

These are candidate SKUs, not confirmed supplier inventory. Some linked retail products may be sold out or have different model variants. Verify every SKU, language layout, switch, connector, color, warranty and current selling price before publishing. For example, the current K617 market page lists 6 retail offers and prices as of 15 October 2026; that does not say what an authorized reseller will pay.

The Pixelz catalog's displayed prices are **market references only**, not wholesale costs or promises that Pixelz can sell at that price. Do not calculate a profit margin until the supplier has quoted its price and fulfilment costs.

Do not decide a product using headline retail prices alone. Compare the supplier's actual cost, shipping, packaging, payment fees, failed delivery/return costs and realistic selling price. Retail listings at Plugz are useful only for market comparison, not supplier quotations or permission to reuse images. For example, Plugz publicly lists some AULA and Logitech/ATTACK SHARK products, while stock statuses can change: https://plugz-eg.com/shop/

## Why not select a worldwide dropshipper yet?

We have not found a verified international dropshipping vendor that simultaneously confirms the exact gaming SKUs, Egypt shipping route, tracked delivery, returns/dispute coverage, and a payout/payment workflow suitable for PIXELZ. A worldwide platform's existence is not proof that any specific SKU can be safely delivered to Egypt.

For the first attempt, ask an Egypt-based distributor about **single-piece fulfilment**. If they require buying stock in advance, do not pretend it is dropshipping and do not place a wholesale order without adult review and a written margin calculation. A local distributor is also not the same as a live website integration: Pixelz would still need authorized product data and an approved feed/API or an honest manual update process.

## Release checklist

Only consider turning `PIXELZ_PREVIEW_MODE` off after all boxes are confirmed:

- [ ] Guardian-reviewed supplier relationship and eligibility.
- [ ] Written reseller or single-order fulfilment terms.
- [ ] Exact SKUs, authentic photos authorized for use, live supplier costs and stock.
- [ ] Delivery price/range and returns/warranty responsibilities confirmed.
- [ ] A payment and payout path available to the eligible account holder.
- [ ] Final price leaves positive margin after delivery, failed orders, returns, payment costs and any required taxes.
- [ ] Test the order flow without collecting payment-card details on this static website.
- [ ] Catalog disclaimers and availability text match the real supplier agreement.

Never commit account passwords, cookies, private API keys or payout credentials to GitHub. Keep those in the owner's approved provider dashboard/server environment.

## Status

- Storefront redesign: committed to `pixelz-store` branch; fresh Vercel deployment is currently blocked by the deployment API's free-per-day quota.
- Catalog: 8 candidate products (Redragon S102, K552, K617, M612, H510, AULA F75 Max, Logitech G305 market comparison, and extended mousepad).
- First local supplier to ask: Essawy Group, pending quote and proof of single-order fulfilment.
- Supplier account/contract/API: not connected.
- Exact supplier SKUs/prices/stock: not yet verified.
- Customer orders: keep disabled.
