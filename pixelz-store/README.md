# PIXELZ Store

Arabic RTL storefront for PIXELZ gaming and setup accessories.

## Store features
- Responsive catalog with live product/category counts, search, and category filters.
- Product detail pages with model information, descriptions, and specifications.
- Persistent local shopping bag with quantity controls and graceful image fallbacks.
- WhatsApp checkout request with Egyptian mobile validation and cash-on-delivery preference.
- Clear shipping and availability notes. Card payments are not active, and card details are never requested.

## Vercel configuration
Set the Vercel project's **Root Directory** to `pixelz-store`, Framework Preset to **Other**, Build Command to `npm run build`, and Output Directory to `dist`. The build is dependency-free and creates a fresh output directory on each run so removed files cannot linger from an older local build.

## Order flow
Checkout opens a prefilled WhatsApp message for the customer to review and send. PIXELZ must confirm product availability, final product price, shipping cost, delivery time, and cash-on-delivery availability before the order is accepted. The website does not collect card details or submit the order automatically.
