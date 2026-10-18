# PIXELZ Store

Arabic RTL storefront for PIXELZ gaming and setup accessories.

- Product catalog with search and category filters.
- Individual product pages with photos, descriptions and specifications.
- Shopping bag with quantity controls and a WhatsApp checkout request.
- Cash-on-delivery request flow; card payments are not active yet.

## Vercel
Set the project root directory to \`pixelz-store\`, framework preset to Other/None, build command to \`npm run build\`, and output directory to \`dist\`. The build copies the static storefront without installing dependencies.

## Order flow
The checkout prepares a WhatsApp message with the selected items and delivery details. A buyer reviews and sends that message to PIXELZ; the store then confirms availability, shipping and payment-on-delivery details. The website does not collect card details.