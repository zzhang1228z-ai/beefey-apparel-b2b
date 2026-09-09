# Nightgowns & Robes Collection Design Contract

## Product goal and audience

Upgrade `collections/nightgowns-sleep-dresses.html` into an English B2B collection page for US boutique, private-label, and wholesale buyers. The page should help buyers compare three starting directions—nightgown, sleep dress, and robe—then move to a product detail page or request a quote. Confirmed commercial facts used on the page: OEM/ODM development, MOQ 100 sets, and customization around silhouette, fabric, trim, color, sizing, labels, and packaging.

## Visual direction

**Soft Sleepwear Atelier:** a calm American boutique editorial language adapted from the existing Satin Pajama Sets collection. Use warm ivory surfaces, muted rose accents, generous whitespace, serif display headings, restrained borders, and AI-generated apparel photography. The page must feel like a buyer-facing line sheet, not a retail promotion page.

## Reference sources

- `vendor/open-design/adapter/STATIC_POLICY.md`
- `vendor/open-design/adapter/RESOURCE_INDEX.md`
- `vendor/open-design/upstream/design-systems/warm-editorial/DESIGN.md`
- `vendor/open-design/upstream/design-systems/warm-editorial/tokens.css`
- `vendor/open-design/upstream/design-systems/warm-editorial/components.html`
- `vendor/open-design/upstream/craft/anti-ai-slop.md`
- `vendor/open-design/upstream/craft/typography.md`
- `vendor/open-design/upstream/craft/typography-hierarchy-editorial.md`
- `vendor/open-design/upstream/craft/color.md`
- `vendor/open-design/upstream/craft/animation-discipline.md`
- `vendor/open-design/upstream/craft/accessibility-baseline.md`
- `collections/satin-pajama-sets.html`
- `collections/satin-pajama-sets.css`
- `collections/satin-pajama-sets.js`

## Vendor grounding

Baseline: Warm Editorial. Translate its warm paper surfaces, serif display hierarchy, fine rules, low-elevation components, focus behavior, and restrained motion into the existing static site. Use `#a7636a` rather than the baseline terracotta to align with the Satin collection. Anti-AI-slop checks: no gradients, no placeholder images, no invented reviews or metrics, no excessive feature-card wall, no promotional stickers, and no unsupported product claims.

## Tokens

- Page `#fbf6ee`; surface `#fffdf8`; warm surface `#f1e3cf`
- Text `#201914`; secondary `#4c4037`; muted `#7a6d63`
- Border `#ded2c3`; soft border `#eee4d7`
- Accent `#a7636a`; accent dark `#7f4d55`; on-accent `#fffdf8`
- Display: Georgia / Times New Roman serif stack
- Body: system-ui / Segoe UI / Arial sans stack
- Spacing: 4, 8, 12, 16, 20, 24, 32, 48, 80, 112 px rhythm
- Radius: 10, 16, 24 px
- Raised shadow only on hover: `0 20px 52px rgba(32,25,20,.12)`
- Motion: 150–240ms with reduced-motion fallback

## Components

- Existing site chrome and navigation
- Editorial collection hero with quote CTA and anchor CTA
- Three-link category index
- Six starting-style cards, each showing one large full-style image only in a compact 5:6 fashion-commerce crop
- Each large image links to a shared dynamic detail page
- Card titles are plain text; the lower card action sends a style-specific WhatsApp inquiry instead of opening the detail page
- Detail page shows the full image, its matching construction-detail image, style code, category, and four-cell procurement specification grid
- Style code and category badge
- Four-step development route
- Final inquiry CTA and existing contact paths

## Page and responsive structure

Desktop uses a 12-column, 1180px container. Hero is 5/7 columns; six cards form a three-column grid. Collection images use compact 5:6 containers with centered fashion crops. Tablet uses two columns and mobile uses one column. Mobile category navigation stacks vertically, CTAs stack, and the detail-page spec grid remains 2×2. All images have explicit dimensions/aspect ratios and meaningful alt text. Major sections carry `data-component` attributes.

## Interaction and motion

- Category filters update visible cards and `aria-pressed` state.
- Category links scroll to the styles section.
- Card media lifts no more than 2px; images scale no more than 1.015.
- Focus rings remain visible on keyboard navigation.
- Reduced motion disables smooth scrolling and transforms.
- No carousel, parallax, autoplay, or publishing action.

## Image Manifest

| Local path | Source | Usage | Ratio |
|---|---|---|---|
| `assets/images/custom/nightgowns-generated/nightgowns-hero-wide.png` | AI generated | Collection hero | 3:2 |
| `assets/images/custom/nightgowns-generated/ng-101-full.png` | AI generated | NG-101 full view | 2:3 |
| `assets/images/custom/nightgowns-generated/ng-101-detail.png` | AI edit from NG-101 | NG-101 neckline detail | 2:3 |
| `assets/images/custom/nightgowns-generated/sd-102-full.png` | AI generated | SD-102 full view | 2:3 |
| `assets/images/custom/nightgowns-generated/sd-102-detail.png` | AI edit from SD-102 | SD-102 strap and binding detail | 2:3 |
| `assets/images/custom/nightgowns-generated/rb-103-full.png` | AI generated | RB-103 full view | 2:3 |
| `assets/images/custom/nightgowns-generated/rb-103-detail.png` | AI edit from RB-103 | RB-103 belt and pocket detail | 2:3 |
| `assets/images/custom/nightgowns-generated/ng-104-full.png` | AI generated | NG-104 full view | 2:3 |
| `assets/images/custom/nightgowns-generated/ng-104-detail.png` | AI edit from NG-104 | NG-104 neckline and sleeve detail | 2:3 |
| `assets/images/custom/nightgowns-generated/ng-105-full.png` | AI generated | NG-105 full view | 2:3 |
| `assets/images/custom/nightgowns-generated/ng-105-detail.png` | AI edit from NG-105 | NG-105 neckline and waist detail | 2:3 |
| `assets/images/custom/nightgowns-generated/rb-106-full.png` | AI generated | RB-106 full view | 2:3 |
| `assets/images/custom/nightgowns-generated/rb-106-detail.png` | AI edit from RB-106 | RB-106 piping, belt and cuff detail | 2:3 |

Every manifest image must be used. Generated imagery is presented as a starting-style direction, not proof of a shipped customer product.
