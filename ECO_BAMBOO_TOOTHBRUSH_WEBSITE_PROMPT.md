# Premium Eco Bamboo Toothbrush E-Commerce Website - Comprehensive Build Prompt

## Executive Summary

Build a high-performance, conversion-optimized single-page e-commerce website for a premium eco bamboo toothbrush brand. The site must deliver an exceptional user experience across all devices, implement cutting-edge web technologies, and effectively convert environmental-conscious visitors into loyal customers through strategic design, compelling copy, and seamless commerce integration.

**Primary Business Objectives:**
- Convert visitors to purchase single units, bundles, and subscription packages
- Build brand trust through transparency and sustainability credentials
- Educate consumers on environmental benefits and product quality
- Capture email subscribers for ongoing marketing
- Support both D2C sales and marketplace discovery

---

## 1. Brand Identity & Voice

### 1.1 Brand Essence
- **Brand Name:** Leafora (placeholder - can be customized)
- **Brand Promise:** Premium sustainable oral care that's good for you and the planet
- **Brand Personality:** Calm, confident, premium-eco, approachable yet sophisticated

### 1.2 Tone of Voice
- **Primary Tone:** Calm, confident, factual, aspirational
- **Communication Style:**
  - Short benefit-driven statements
  - One powerful sentence for hero headlines
  - No environmental jargon or greenwashing
  - Honest, transparent claims backed by facts
  - Conversational yet premium feel

### 1.3 Brand Positioning
- **Target Audience:** 
  - Environmentally-conscious millennials and Gen Z (25-40 years)
  - Middle to upper-middle income households
  - Health-conscious families
  - Early adopters of sustainable products
  
- **Key Differentiators:**
  - 100% biodegradable bamboo handles
  - Made in India - supporting local artisans
  - Customizable engraving for personal/corporate gifts
  - Premium quality at accessible prices
  - Transparent supply chain

### 1.4 Visual Identity
- **Logo:** Minimalist SVG logo with engraved bamboo aesthetic (placeholder provided)
- **Logo Placement:** Top-left of header, responsive sizing
- **Logo Style Guide:**
  - Clean, modern sans-serif or elegant serif wordmark
  - Optional: Small leaf or bamboo icon integration
  - Monochrome or forest green color scheme
  - Scalable from 24px to 200px without quality loss

---

## 2. Technical Architecture & Stack

### 2.1 Core Technology Stack
**Frontend Framework:** Next.js 14+ (App Router)
- Server-side rendering for SEO
- Client-side hydration for interactivity
- Image optimization built-in
- API routes for backend logic

**Styling:** CSS3 + Tailwind CSS (recommended) or CSS Modules
- Mobile-first responsive design
- Dark mode support (optional)
- Custom animations and transitions

**Commerce Integration (Choose One):**
1. **Snipcart** - Easy integration, cart functionality
2. **Stripe Checkout** - Direct payment processing
3. **Marketplace Links** - Amazon/Flipkart buttons for hybrid model

**Analytics & Tracking:**
- Google Analytics 4
- Meta Pixel for social traffic
- Conversion tracking for e-commerce events
- Hotjar or similar for heatmaps (optional)

### 2.2 Performance Requirements
**Lighthouse Targets (Mobile & Desktop):**
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**Optimization Strategies:**
- Images: WebP format with fallback, lazy loading
- Fonts: Self-hosted, subset, preload critical fonts
- Critical CSS: Inline above-the-fold styles
- Code splitting: Dynamic imports for heavy components
- Caching: Aggressive browser and CDN caching
- Minification: CSS, JS, and HTML compression

### 2.3 Hosting & Deployment
**Recommended Platforms:**
- Vercel (optimized for Next.js)
- Netlify
- AWS Amplify

**Requirements:**
- SSL certificate (HTTPS)
- CDN for global performance
- Automatic deployments from Git
- Preview environments for testing

---

## 3. Page Structure & Layout

### 3.1 Sticky Header (Fixed Navigation)
**Behavior:**
- Transparent background on page load
- Solid white background with subtle shadow on scroll (after 80px)
- Smooth transition animation (300ms ease)

**Left Section:**
- Logo (SVG, max-height: 50px desktop, 40px mobile)
- Clickable, returns to top of page

**Right Section - Navigation Links:**
- Shop | Bundles | How it's Made | FAQ | Contact | Cart Icon
- Font: 14px, medium weight, letter-spacing: 0.5px
- Hover state: Accent color with 2px bottom border
- Active state: Bold with accent color
- Mobile: Hamburger menu with slide-in drawer

**Primary CTA Button:**
- Text: "Buy Now"
- Style: Solid background (Forest Green), white text
- Padding: 12px 24px
- Border-radius: 6px
- Hover: Slight lift (translateY: -2px) + deeper shadow
- Scrolls to product offerings section

**Top Announcement Bar (Above Header):**
- Fixed position, 40px height
- Background: Kraft Brown or Forest Green
- Text: "Free shipping on orders ₹499+ | GSTIN: XXXXXXXX"
- Font: 12px, centered
- Dismissible with small X button (optional)
- Mobile: Scrollable if text overflows

### 3.2 Hero Section (Above the Fold)

**Layout:** Two-column grid (60/40 split on desktop, stacked on mobile)

**Left Column - Copy:**
- **Headline:** 
  - Font: Playfair Display or Merriweather, 56px (desktop), 36px (mobile)
  - Color: Dark accent (#1F2E1F)
  - Line-height: 1.2
  - Example: "Brush Green. Live Clean."
  - Emphasis on 2-3 key words (e.g., "Green" and "Clean" in accent color)

- **Subheading:**
  - Font: Inter or Montserrat, 20px (desktop), 16px (mobile)
  - Color: Dark gray (#4A4A4A)
  - Margin-top: 16px
  - Example: "Premium bamboo toothbrushes. Compostable handles. Soft, dentist-approved bristles."

- **Primary CTA:**
  - Text: "Buy 5-Pack ₹249"
  - Style: Large button, solid Forest Green background
  - Size: 16px font, 16px 32px padding
  - Icon: Shopping cart (right side)
  - Margin-top: 32px

- **Secondary CTA:**
  - Text: "View 1-Pack"
  - Style: Outline button, Forest Green border
  - Size: 16px font, 16px 32px padding
  - Position: Adjacent to primary CTA
  - Margin-left: 16px

- **Micro-Trust Badges (Below CTAs):**
  - Three small badges in a row
  - Icons + Text: 
    1. "100% Bamboo Handle" (bamboo icon)
    2. "BPA-Free Bristles" (shield icon)
    3. "Made in India" (flag icon)
  - Font: 12px, medium weight
  - Icon size: 20px
  - Spacing: 24px gap between badges

**Right Column - Product Image:**
- Hero image: High-resolution product photo (minimum 1200px width)
- Product styling: Bamboo toothbrush on kraft paper background
- Optional: Cylindrical kraft tube packaging visible
- Image effects:
  - Subtle drop shadow (0 8px 24px rgba(0,0,0,0.12))
  - Slight 3D tilt (transform: perspective(1000px) rotateY(-5deg))
  - Responsive: Full-width on mobile, maintains aspect ratio

**Section Spacing:**
- Padding: 120px vertical (desktop), 80px (tablet), 60px (mobile)
- Background: Warm Off-White (#F7F3EE)

### 3.3 Key Benefits Section

**Layout:** Three-column grid (1 column on mobile)

**Structure:**
Each benefit card contains:
- SVG icon (64px, stroke width 1.5px, Forest Green color)
- Heading (18px, bold, Dark Accent color)
- Description (14px, 1-2 sentences, line-height 1.6)

**Benefits Examples:**
1. **Biodegradable Handle**
   - Icon: Leaf
   - Text: "100% compostable bamboo. Returns to earth in 6 months."
   
2. **Soft Dentist-Approved Bristles**
   - Icon: Tooth/Brush
   - Text: "Gentle on gums. Effective cleaning. BPA-free nylon."
   
3. **Supports Local Artisans**
   - Icon: Village house/Hands
   - Text: "Handcrafted in rural India. Fair wages. Sustainable livelihoods."

**Styling:**
- Card background: White
- Border-radius: 12px
- Padding: 40px 32px
- Hover effect: Slight lift (translateY: -4px) + shadow increase
- Gap between cards: 32px
- Center-aligned content

**Section Background:** White or very light gray

### 3.4 Product Offerings Grid

**Section Heading:**
- Title: "Choose Your Pack"
- Subtitle: "Premium bamboo toothbrushes for every need"
- Center-aligned

**Layout:** 2x2 grid (desktop), 2 columns (tablet), 1 column (mobile)

**Product Cards (4 SKUs):**

1. **Single Brush - ₹99**
   - Image: Single bamboo toothbrush
   - Bullets:
     - Perfect for trying out
     - Single kraft paper packaging
     - Free delivery on 3+ units
   - CTA: "Add to Cart"

2. **5-Pack Bundle - ₹249** (POPULAR badge)
   - Image: Five brushes in row
   - Bullets:
     - Save ₹45 (18% off)
     - Family pack for 6 months
     - Color variant bristles (optional)
   - CTA: "Add to Cart"

3. **10-Pack Tube - ₹499**
   - Image: Brushes in cylindrical kraft tube
   - Bullets:
     - Best value - ₹49.90 each
     - Year supply for couples
     - Premium tube packaging
   - CTA: "Add to Cart"

4. **Premium Gift Box - ₹799**
   - Image: Luxury gift box presentation
   - Bullets:
     - Perfect corporate/wedding gift
     - Custom engraving included
     - Beautiful presentation box
   - CTA: "Add to Cart"

**Card Design:**
- Background: White
- Border: 1px solid light gray
- Border-radius: 16px
- Padding: 32px
- Image aspect ratio: 1:1 or 4:3
- "POPULAR" badge: Small pill badge, Forest Green background

**Additional Elements:**
- Engraving preview thumbnail (small circular image showing example)
- Color bristle variants (5 small color dots if applicable)
- Shipping info: "Ships in 2-3 days" (small text with truck icon)

### 3.5 How It's Made - Process Timeline

**Section Heading:**
- Title: "Crafted with Care"
- Subtitle: "From bamboo grove to your bathroom"

**Layout:** Horizontal timeline (6 steps), scrollable on mobile

**Process Steps:**

1. **Sourcing**
   - Icon/Mini Photo: Bamboo grove
   - Text: "Locally sourced Moso bamboo from sustainable forests in [State]"

2. **Drying**
   - Icon/Mini Photo: Bamboo drying in sun
   - Text: "Natural sun-drying for 60 days. No harmful chemicals or preservatives."

3. **Shaping**
   - Icon/Mini Photo: Cutting/shaping process
   - Text: "Precision-cut to optimal ergonomic handle dimensions"

4. **Sanding**
   - Icon/Mini Photo: Smooth bamboo surface
   - Text: "Hand-sanded to silky smooth finish. Comfortable grip guaranteed."

5. **Tufting**
   - Icon/Mini Photo: Bristle insertion
   - Text: "Soft BPA-free nylon bristles. Dentist-approved firmness."

6. **Packaging**
   - Icon/Mini Photo: Final packaging
   - Text: "Wrapped in recycled kraft paper. Plastic-free packaging."

**Visual Design:**
- Timeline connector: Dotted line connecting all steps
- Step numbers: Circular badges (Forest Green)
- Photo size: 200px x 200px (desktop), 120px x 120px (mobile)
- Text: 14px, centered below each image

**Callout Box:**
- Background: Light green tint
- Text: "Locally sourced bamboo - minimal chemicals - maximum sustainability"
- Position: Below timeline
- Icon: Leaf checkmark

### 3.6 Personalization & Engraving Feature

**Section Heading:**
- Title: "Make It Personal"
- Subtitle: "Laser engraving for a unique touch"

**Layout:** Two-column (image left, content right)

**Left Column:**
- Large product image showing engraved name
- Zoom-in circle showing engraving detail
- Example text: "PRIYA" or "SHARMA FAMILY"

**Right Column:**
- **Main Copy:**
  "Add a personal touch with laser engraving. Perfect for gifts, weddings, or corporate branding."

- **Features:**
  - Laser-engraved name or message
  - 10-15mm length, elegant font
  - Only ₹15 extra per brush
  - CSV bulk upload for corporate orders

- **CTA Button:**
  - Text: "Request Sample"
  - Links to contact form with engraving inquiry

**Additional Info:**
- Character limits: Max 12 characters
- Font options: 2-3 classic fonts shown
- Turnaround time: +2 days for engraved orders

### 3.7 Sustainability & Certifications

**Section Heading:**
- Title: "Our Commitment to Planet Earth"
- Subtitle: "Certified sustainable. Genuinely eco-friendly."

**Layout:** Icon grid with proof points

**Certifications & Features:**

1. **Compostable Handle**
   - Icon: Compost bin
   - Text: "Handle decomposes in 6 months"

2. **Recycled Packaging**
   - Icon: Recycling symbol
   - Text: "100% recycled kraft paper"

3. **MSME Registered**
   - Icon: Certificate
   - Text: "Udyam Registration: [Number]"

4. **GST Compliant**
   - Icon: Invoice
   - Text: "GSTIN: [Number]"

5. **Carbon Neutral Shipping**
   - Icon: Leaf + Truck
   - Text: "Offset emissions on every order"

6. **Cruelty-Free**
   - Icon: Paw print
   - Text: "Never tested on animals"

**Downloadable Certificates:**
- Small link: "Download Certificates (PDF)"
- Opens modal or downloads PDF with all certifications

**Section Background:** Light green tint (#F0F7F0)

### 3.8 Testimonials / Social Proof

**Section Heading:**
- Title: "Loved by Thousands"
- Subtitle: "Real people. Real results."

**Layout:** Two sections

**Customer Testimonials (Left Side - 60%):**
Carousel of 3-5 customer quotes:

Each testimonial includes:
- Quote text (2-3 sentences, italic font)
- Customer name + location
- Star rating (5 stars, gold color)
- Small customer photo (circular, 60px)

**Example Testimonial:**
> "I love that I'm reducing plastic waste without compromising on quality. The bamboo handle feels premium, and the bristles are gentle yet effective."
> 
> **Priya M., Mumbai** ⭐⭐⭐⭐⭐

**Instagram Grid (Right Side - 40%):**
- Embedded Instagram feed (6-9 recent posts)
- Hashtag: #LeaforaLife or brand-specific
- Shows real customer photos
- Clickable, opens Instagram

**Review Summary:**
- Large number: "4.9/5" stars
- Text: "Based on 2,847 reviews"
- Link: "Read all reviews"

### 3.9 Pricing & Savings Calculator

**Section Heading:**
- Title: "How Much Can You Save?"
- Subtitle: "See your savings when you buy in bulk"

**Interactive Calculator:**

**Slider Input:**
- Label: "Number of toothbrushes:"
- Range: 1-50 brushes
- Current value displayed: Large number
- Visual slider with Forest Green track

**Dynamic Price Display:**

```
Single Price:     ₹99
Your Quantity:    × 15
Subtotal:        ₹1,485
Bulk Discount:   - ₹185
Shipping:         FREE (over ₹499)
─────────────────────
Total:           ₹1,300
You Save:        ₹185 (12%)
```

**Discount Tiers:**
- 1-4 brushes: ₹99 each (no discount)
- 5-9 brushes: ₹85 each (14% off)
- 10-19 brushes: ₹75 each (24% off)
- 20+ brushes: ₹65 each (34% off)

**CTA Below Calculator:**
- "Add to Cart" button with calculated quantity

### 3.10 FAQ Section (Accordion)

**Section Heading:**
- Title: "Frequently Asked Questions"
- Subtitle: "Everything you need to know"

**Accordion Questions (7-10 questions):**

1. **What are the bristles made of?**
   - BPA-free nylon bristles. While we're working on 100% biodegradable bristle options, current soft nylon ensures optimal dental hygiene as recommended by dentists.

2. **How do I dispose of the toothbrush?**
   - Remove bristles with pliers (or send to our recycling program). Compost the bamboo handle or use it in your garden as plant marker.

3. **Can I choose bristle colors?**
   - Yes! 5-packs come with assorted colors (blue, green, pink, white, black) for easy family identification.

4. **What are engraving limits?**
   - Maximum 12 characters including spaces. Available in two classic fonts. +₹15 per brush.

5. **What's the lead time for orders?**
   - Standard orders: 2-3 business days
   - Engraved orders: 4-5 business days
   - Bulk orders (50+): Contact us for timeline

6. **Do you provide GST invoice?**
   - Yes, GST invoice provided with all orders. GSTIN: [Number]

7. **What's your return policy?**
   - 7-day return for unopened products. Hygiene products cannot be returned once opened. Full refund or exchange available.

8. **How often should I replace my bamboo toothbrush?**
   - Every 3 months, same as regular toothbrushes. Subscribe and save 10% on automatic deliveries.

9. **Is the bamboo sustainably sourced?**
   - Yes, we source Moso bamboo from certified sustainable forests in [State]. Bamboo grows 20x faster than trees.

10. **Do you ship pan-India?**
    - Yes, free shipping on orders over ₹499. Ships to all pin codes via India Post/Delhivery.

**Accordion Design:**
- Question: Bold, 16px, clickable
- Answer: Regular, 14px, expands smoothly
- Icons: Plus/Minus toggle
- Dividers between questions
- Keyboard accessible

### 3.11 Subscription CTA Section

**Layout:** Full-width banner with two-column grid

**Left Column:**
- Heading: "Never Run Out"
- Subheading: "Subscribe & Save 10% Every Month"
- Feature bullets:
  - Automatic deliveries every 3 months
  - Cancel anytime, no commitments
  - Free shipping on all subscriptions
  - Reminder emails before each delivery

**Right Column:**
- Subscription plan selector:
  - Radio buttons: 1 brush, 2 brushes, 4 brushes
  - Frequency: Every 3 months (dentist recommended)
  - Price display: "₹89/month (save ₹10)"
- CTA: "Start Subscription"

**Background:** Gradient (Forest Green to Olive)
**Text Color:** White

### 3.12 Footer / Contact

**Layout:** Four-column grid (stacks on mobile)

**Column 1 - Branding:**
- Logo (white/light version)
- Tagline: "Brushing towards a greener future"
- Social media icons:
  - Instagram
  - Facebook
  - Twitter/X
  - YouTube
  - WhatsApp

**Column 2 - Quick Links:**
- Shop
- How It's Made
- Sustainability
- About Us
- Blog
- Affiliate Program

**Column 3 - Customer Service:**
- FAQ
- Shipping & Returns
- Track Order
- Contact Us
- Wholesale Inquiry
- Corporate Gifting

**Column 4 - Contact Info:**
- Email: hello@leafora.in
- Phone: +91 [Number]
- WhatsApp: +91 [Number]
- Address: [Village/City], [State], India

**Subscribe Form:**
- Full-width section above footer columns
- Heading: "Join Our Green Community"
- Email input + Subscribe button
- Small text: "Get 10% off your first order + eco-tips monthly"

**Footer Bottom:**
- Background: Darker green
- Left: "© 2024 Leafora. All Rights Reserved."
- Right: Links to Terms | Privacy Policy | Sitemap
- Small text: "Ships Pan-India. Returns within 7 days. Made in [State]."
- Payment icons: Visa, Mastercard, UPI, Paytm

**Additional Footer Elements:**
- GSTIN: [Number]
- Udyam Registration: [Number]
- Email: For invoice/tax queries

---

## 4. Visual Design System

### 4.1 Color Palette

**Primary Colors:**
```
Forest Green:     #5A8A39  (Primary CTA, accents, icons)
Olive Secondary:  #8FB26B  (Hover states, secondary elements)
Kraft Brown:      #BFA27A  (Badges, warm accents)
Warm Off-White:   #F7F3EE  (Background, sections)
Accent Dark:      #1F2E1F  (Headings, body text)
```

**Functional Colors:**
```
Success Green:    #48B048  (Checkmarks, success messages)
Alert Red:        #E74C3C  (Error states, urgent notifications)
Warning Amber:    #F39C12  (Warnings, stock alerts)
Info Blue:        #3498DB  (Information, links)
```

**Neutral Grays:**
```
Gray 100:         #F8F9FA  (Lightest gray, subtle backgrounds)
Gray 300:         #DEE2E6  (Borders, dividers)
Gray 500:         #6C757D  (Secondary text)
Gray 700:         #495057  (Body text)
Gray 900:         #212529  (Darkest, high-contrast text)
```

### 4.2 Typography

**Font Families:**

**Headings:**
- Primary: Playfair Display (serif, elegant)
- Alternative: Merriweather (serif, traditional)
- Weights: 400 (regular), 600 (semi-bold), 700 (bold)

**Body & UI:**
- Primary: Inter (sans-serif, modern)
- Alternative: Montserrat (sans-serif, geometric)
- Weights: 400 (regular), 500 (medium), 600 (semi-bold), 700 (bold)

**Font Sizes & Hierarchy:**
```
H1 (Hero):        56px / 36px (mobile)  - Line height: 1.2
H2 (Section):     40px / 28px (mobile)  - Line height: 1.3
H3 (Card):        28px / 22px (mobile)  - Line height: 1.4
H4 (Subheading):  20px / 18px (mobile)  - Line height: 1.5
Body Large:       18px / 16px (mobile)  - Line height: 1.6
Body Regular:     16px / 14px (mobile)  - Line height: 1.6
Body Small:       14px / 13px (mobile)  - Line height: 1.5
Caption:          12px / 11px (mobile)  - Line height: 1.4
```

**Font Loading Strategy:**
- Self-hosted fonts (WOFF2 format)
- Font subset: Latin characters only
- Preload critical fonts
- Font-display: swap (avoid FOIT)

### 4.3 Spacing System

**Consistent spacing scale (px):**
```
4px   - Micro spacing (icon padding)
8px   - Tiny spacing (tight elements)
12px  - Small spacing (compact layouts)
16px  - Base spacing (standard gaps)
24px  - Medium spacing (section elements)
32px  - Large spacing (card padding)
48px  - XL spacing (section gaps)
64px  - 2XL spacing (major sections)
80px  - 3XL spacing (hero sections, mobile)
120px - 4XL spacing (hero sections, desktop)
160px - 5XL spacing (maximum vertical spacing)
```

**Application:**
- Use consistent spacing multiples
- Maintain vertical rhythm
- Mobile: Reduce by 33-50% for compact layouts

### 4.4 Iconography

**Icon Style:**
- Type: Line icons (outlined style)
- Stroke width: 1.5px - 2px
- Size: 24px (standard UI), 48px (large features), 64px (benefits)
- Color: Forest Green primary, Gray for neutral

**Icon Set Sources:**
- Lucide Icons (recommended)
- Heroicons
- Feather Icons
- Custom SVG for brand-specific

**Required Icons:**
- Navigation: Menu, X (close), Cart, Search
- Product: Leaf, Bamboo, Shield, Check, Star
- Social: Instagram, Facebook, Twitter, WhatsApp
- UI: Arrow right, Arrow down, Plus, Minus, Truck, Info

**Export:**
- SVG format (optimized, minified)
- Include viewBox for scalability
- Remove unnecessary metadata

### 4.5 Imagery Guidelines

**Product Photography:**
- High-resolution: Minimum 2000px width
- Format: WebP (primary), JPG (fallback)
- Aspect ratios: 1:1 (product cards), 4:3 (hero), 16:9 (lifestyle)
- Background: Kraft paper, white, or natural textures
- Lighting: Natural, soft daylight
- Styling: Minimal, let product shine

**Required Images (6 core + 5 supplementary):**

**Core Product Images:**
1. Single brush - top view on kraft paper (hero)
2. Single brush - angled 45° view
3. Five-pack bundle - arranged in row
4. Ten-pack in cylindrical kraft tube
5. Premium gift box - open view
6. Lifestyle - person brushing (ethical, diverse)

**Supplementary Images:**
1. Engraving close-up (micro detail)
2. Bristle texture close-up
3. Bamboo grove (sourcing)
4. Artisan crafting (how it's made)
5. Packaging materials (sustainability)

**Process Photos (3 for timeline):**
1. Bamboo drying in sun
2. Shaping/sanding workspace
3. Final packaging station

**Image Optimization:**
- Compress to <200KB per image
- Use next/image for automatic optimization (Next.js)
- Lazy load all images below fold
- Provide alt text (SEO + accessibility)

**Color Grading:**
- Warm tones, natural feel
- Consistent editing across all images
- Slight saturation boost for bamboo/kraft
- Avoid overly processed look

### 4.6 Buttons & Interactive Elements

**Primary Button:**
```css
background: #5A8A39 (Forest Green)
color: #FFFFFF
padding: 12px 24px
border-radius: 6px
font-size: 16px
font-weight: 600
text-transform: none
letter-spacing: 0.5px

Hover:
  background: #4A7329 (darker)
  transform: translateY(-2px)
  box-shadow: 0 4px 12px rgba(90, 138, 57, 0.3)
  transition: all 200ms ease

Active:
  transform: translateY(0)
  box-shadow: 0 2px 6px rgba(90, 138, 57, 0.3)
```

**Secondary Button:**
```css
background: transparent
color: #5A8A39
border: 2px solid #5A8A39
padding: 12px 24px
border-radius: 6px

Hover:
  background: #5A8A39
  color: #FFFFFF
  transition: all 200ms ease
```

**Text Link:**
```css
color: #5A8A39
text-decoration: none
border-bottom: 1px solid transparent

Hover:
  border-bottom: 1px solid #5A8A39
  transition: border 150ms ease
```

**Form Inputs:**
```css
background: #FFFFFF
border: 1px solid #DEE2E6
border-radius: 6px
padding: 12px 16px
font-size: 16px

Focus:
  border-color: #5A8A39
  outline: none
  box-shadow: 0 0 0 3px rgba(90, 138, 57, 0.1)
```

### 4.7 Animations & Transitions

**Micro-Animations:**

1. **Scroll Fade-In:**
   - Opacity: 0 → 1
   - Transform: translateY(20px) → translateY(0)
   - Duration: 600ms
   - Easing: cubic-bezier(0.4, 0, 0.2, 1)

2. **Button Hover:**
   - Duration: 200ms
   - Easing: ease-out
   - Properties: transform, box-shadow, background

3. **Card Hover:**
   - Lift: translateY(-4px)
   - Shadow increase
   - Duration: 300ms

4. **Accordion Expand:**
   - Max-height transition
   - Duration: 400ms
   - Easing: ease-in-out

5. **Image Lazy Load:**
   - Blur placeholder → Sharp image
   - Duration: 300ms

**Performance Considerations:**
- Use CSS transforms (GPU-accelerated)
- Avoid animating layout properties (width, height)
- Limit simultaneous animations
- Respect prefers-reduced-motion

**Animation Triggers:**
- Intersection Observer for scroll-based
- CSS :hover for interaction
- JavaScript for complex sequences

---

## 5. Content & Copywriting

### 5.1 SEO Optimization

**Meta Title (60 characters max):**
```
Leafora - Eco Bamboo Toothbrushes | Free Shipping ₹499+
```

**Meta Description (155 characters max):**
```
Buy premium bamboo toothbrushes. 100% compostable handle. Soft BPA-free bristles. Made in India. Shop single packs, bundles & subscriptions.
```

**Open Graph (Social Sharing):**
```
og:title: Leafora - Sustainable Bamboo Toothbrushes
og:description: Switch to eco-friendly oral care. Premium bamboo toothbrushes starting at ₹99.
og:image: [Hero product image - 1200x630px]
og:type: website
og:url: https://leafora.in
```

**Twitter Card:**
```
twitter:card: summary_large_image
twitter:title: Leafora - Bamboo Toothbrushes
twitter:description: Eco-friendly oral care. Made in India. Free shipping.
twitter:image: [Product image - 1200x630px]
```

### 5.2 Heading Structure

**H1:** (Only one per page)
```
Hero headline: "Brush Green. Live Clean."
```

**H2s:** (Section headings)
- "Why Choose Bamboo?"
- "Choose Your Pack"
- "Crafted with Care"
- "Make It Personal"
- "Our Commitment to Planet Earth"
- "Loved by Thousands"
- "Frequently Asked Questions"

**H3s:** (Subsections)
- Product card titles
- Benefit headings
- Process step titles

**Semantic HTML:**
- Use proper heading hierarchy (H1 → H2 → H3)
- No skipping levels
- Descriptive, keyword-rich

### 5.3 Schema Markup (JSON-LD)

**Product Schema:**
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Leafora Bamboo Toothbrush",
  "image": "https://leafora.in/images/bamboo-toothbrush.jpg",
  "description": "Eco-friendly bamboo toothbrush with BPA-free bristles",
  "brand": {
    "@type": "Brand",
    "name": "Leafora"
  },
  "offers": {
    "@type": "AggregateOffer",
    "lowPrice": "99",
    "highPrice": "799",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2847"
  }
}
```

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Leafora",
  "url": "https://leafora.in",
  "logo": "https://leafora.in/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXXXXXXXXX",
    "contactType": "Customer Service"
  },
  "sameAs": [
    "https://instagram.com/leafora",
    "https://facebook.com/leafora"
  ],
  "taxID": "GSTIN: XXXXXXXX"
}
```

**Review Schema:**
```json
{
  "@context": "https://schema.org/",
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "Priya M."
  },
  "reviewBody": "Love these bamboo toothbrushes! Reducing plastic waste.",
  "itemReviewed": {
    "@type": "Product",
    "name": "Leafora Bamboo Toothbrush"
  }
}
```

**LocalBusiness Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Leafora",
  "identifier": "GSTIN: XXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "addressCountry": "IN"
  }
}
```

**BreadcrumbList Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://leafora.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Shop",
      "item": "https://leafora.in#shop"
    }
  ]
}
```

### 5.4 Copy Examples & Templates

**Primary CTA Variations:**
- "Buy 5-Pack ₹249"
- "Shop Now"
- "Start Your Green Journey"
- "Add to Cart"
- "Get Yours Today"

**Secondary CTA Variations:**
- "View 1-Pack"
- "Learn More"
- "See All Options"
- "Request Sample"

**Personalization CTA:**
- "Engrave Name +₹15"
- "Customize Your Brush"
- "Add Personal Touch"

**Subscription CTA:**
- "Subscribe & Save 10%"
- "Never Run Out"
- "Start Monthly Delivery"

**Micro-Copy:**
- Trust badges: "100% Bamboo Handle", "BPA-Free Bristles", "Made in India"
- Shipping: "Free delivery on orders ₹499+"
- Returns: "7-day return policy"
- Stock: "Only 15 left in stock!"
- Urgency: "Order in next 2 hours for same-day dispatch"

**Value Propositions:**
- "Switch to sustainable. No compromise on quality."
- "Gentle on gums. Tough on plastic waste."
- "Your daily choice for a greener planet."
- "Premium oral care. Planet-friendly pricing."

---

## 6. E-Commerce & Marketplace Integration

### 6.1 D2C Checkout Options

**Option 1: Snipcart Integration**
- Easy setup with data attributes
- Hosted checkout (PCI compliant)
- Payment gateways: Razorpay, Stripe, PayPal
- Automatic GST calculation
- Email notifications

**Option 2: Stripe Checkout**
- Direct Stripe integration
- Custom checkout flow
- Supports UPI, cards, wallets
- Subscription billing built-in
- Webhook for order processing

**Option 3: Razorpay (India-focused)**
- UPI, cards, net banking, wallets
- Razorpay Checkout widget
- Automatic tax invoice generation
- Recurring payments for subscriptions
- Dashboard for order management

**Implementation:**
```javascript
// Example: Add to cart button with product data
<button
  data-item-id="bamboo-5pack"
  data-item-price="249"
  data-item-name="5-Pack Bamboo Toothbrush"
  data-item-url="/"
  data-item-description="Family pack with color variants"
  className="add-to-cart"
>
  Add to Cart
</button>
```

### 6.2 Marketplace Links (Hybrid Model)

**Amazon Integration:**
- "Buy on Amazon" button for each SKU
- Links to Amazon product listing (ASIN)
- Opens in new tab
- Shows Amazon Prime badge if applicable

**Flipkart Integration:**
- "Buy on Flipkart" button
- Links to Flipkart product page
- New tab, external link icon

**Button Design:**
```
[Amazon Logo] Buy on Amazon
[Flipkart Logo] Buy on Flipkart

Style: Marketplace brand colors
Size: 14px font, medium weight
Border: 1px solid marketplace color
Hover: Solid background
```

**Placement:**
- Product cards: Below primary "Add to Cart"
- As alternative CTA
- Small text: "Also available on:"

### 6.3 Order Management Backend

**Required Functionality:**

1. **Order Capture:**
   - Customer details (name, email, phone, address)
   - Product SKUs and quantities
   - Engraving text (if applicable)
   - Payment status
   - Order ID generation

2. **Inventory Tracking:**
   - Stock levels for each SKU
   - Low stock alerts (<10 units)
   - Out-of-stock handling

3. **Shipping Integration:**
   - India Post / Delhivery / Shiprocket API
   - Automatic tracking number generation
   - Email notifications with tracking

4. **Packing Slip Generation:**
   - Printable PDF with:
     - Order ID
     - Customer name and address
     - Product list with SKUs
     - Engraving text (highlighted)
     - GST invoice number
     - Barcode/QR code for tracking

5. **Admin Dashboard:**
   - Order list with filters (pending, shipped, delivered)
   - Export to CSV
   - Bulk engraving upload (CSV)
   - Analytics (sales, popular SKUs, conversion rate)

**Tech Stack Options:**
- Headless CMS: Sanity, Strapi
- E-commerce backend: Medusa, Vendure
- Order management: ShipStation, Shippo
- Database: PostgreSQL, MongoDB

### 6.4 Seller Disclosures & Legal

**Required Disclosures:**

1. **GST Details:**
   - GSTIN: [22-digit number]
   - Display on: Footer, invoice, checkout
   - GST rate: 18% (included in price)

2. **Udyam Registration:**
   - Udyam Number: [Registration number]
   - MSME certified
   - Display on footer/about page

3. **Business Details:**
   - Legal entity name
   - Registered address
   - Contact email (for legal notices)
   - Phone number

4. **Terms & Conditions:**
   - Separate page
   - Covers: Returns, refunds, shipping, privacy
   - Link in footer

5. **Privacy Policy:**
   - GDPR/India data compliance
   - Cookie policy
   - Data collection practices
   - Link in footer

6. **Shipping Policy:**
   - Delivery timelines
   - Shipping charges
   - Free shipping threshold (₹499)
   - Return shipping costs

7. **Return & Refund Policy:**
   - 7-day return window
   - Conditions (unopened for hygiene)
   - Refund processing (7-10 days)
   - Exchange process

**Marketplace Compliance:**
- **Amazon:**
  - FNSKU labeling
  - Product ASIN visible in admin
  - FBA/FBM designation

- **Flipkart:**
  - Seller ID
  - Product listing ID
  - FSN (Flipkart Serial Number)

---

## 7. Performance & Accessibility

### 7.1 Performance Optimization Checklist

**Images:**
- [x] WebP format with JPEG/PNG fallback
- [x] Lazy loading for below-fold images
- [x] Responsive images (srcset, sizes)
- [x] Image compression (<200KB per image)
- [x] Next/image or native lazy loading
- [x] Blur placeholder for loading state

**Fonts:**
- [x] Self-hosted fonts (no Google Fonts CDN)
- [x] WOFF2 format (best compression)
- [x] Font subsetting (Latin only)
- [x] Preload critical fonts
- [x] font-display: swap

**CSS:**
- [x] Critical CSS inlined
- [x] Non-critical CSS deferred
- [x] Minified and compressed
- [x] Remove unused CSS
- [x] CSS-in-JS optimization (if applicable)

**JavaScript:**
- [x] Code splitting
- [x] Dynamic imports for heavy components
- [x] Minified and tree-shaken
- [x] Defer non-critical scripts
- [x] Third-party script optimization

**Caching:**
- [x] Browser caching headers (1 year for static)
- [x] CDN caching
- [x] Service worker (optional)
- [x] Cache busting for updates

**Third-Party:**
- [x] Minimize third-party scripts
- [x] Async/defer external scripts
- [x] Use facades for embeds (YouTube, Instagram)

### 7.2 Accessibility (WCAG AA Compliance)

**Color Contrast:**
- [x] Text: Minimum 4.5:1 (body), 3:1 (large text)
- [x] UI components: 3:1 contrast
- [x] Test with contrast checker

**Keyboard Navigation:**
- [x] All interactive elements focusable
- [x] Visible focus indicators
- [x] Skip to main content link
- [x] Logical tab order
- [x] Accordion keyboard controls (Space/Enter)

**Screen Readers:**
- [x] Semantic HTML (nav, main, footer, article)
- [x] Alt text for all images
- [x] ARIA labels for icons
- [x] ARIA expanded for accordions
- [x] Form labels properly associated

**Forms:**
- [x] Label for every input
- [x] Error messages clear and associated
- [x] Required fields indicated
- [x] Autocomplete attributes

**Media:**
- [x] Captions for videos (if any)
- [x] Transcripts for audio
- [x] Alt text descriptive, not "image of"

**Responsive:**
- [x] No horizontal scroll
- [x] Touch targets minimum 44x44px
- [x] Zoom to 200% without loss of functionality

**Testing:**
- [x] Lighthouse accessibility score >90
- [x] WAVE browser extension
- [x] Screen reader testing (NVDA/JAWS)
- [x] Keyboard-only navigation

### 7.3 Legal Compliance

**Cookie & Privacy Banner:**
- Display on first visit
- Essential cookies (no consent needed)
- Analytics cookies (opt-in)
- Marketing cookies (opt-in)
- Easy to dismiss/manage preferences

**GDPR Compliance (if applicable):**
- Data processing lawful basis
- Right to access data
- Right to deletion
- Data portability

**India Data Protection:**
- Reasonable security practices
- Sensitive data encryption
- Data breach notification

**Content Policies:**
- No misleading health claims
- Honest environmental claims
- Transparent pricing
- Clear shipping/return terms

---

## 8. Assets & Deliverables

### 8.1 Assets Required from Client

**Logo & Branding:**
- [ ] Logo SVG (transparent background)
- [ ] Logo PNG (high-res, for fallback)
- [ ] Favicon (ICO + PNG sizes: 16x16, 32x32, 192x192, 512x512)
- [ ] Brand colors (hex codes if different from palette)
- [ ] Brand guidelines (if existing)

**Product Images (6 core):**
- [ ] Single brush - top view on kraft paper (2000px wide)
- [ ] Single brush - angled 45° view (2000px wide)
- [ ] Five-pack bundle arranged (2000px wide)
- [ ] Ten-pack cylindrical tube (2000px wide)
- [ ] Premium gift box - open view (2000px wide)
- [ ] Lifestyle - person brushing (2000px wide)

**Process Images (3 for timeline):**
- [ ] Bamboo drying in sun (600px wide)
- [ ] Shaping/sanding workspace (600px wide)
- [ ] Final packaging station (600px wide)

**Testimonials (5 customer quotes):**
- [ ] Quote text (2-3 sentences each)
- [ ] Customer name + location
- [ ] Star rating (typically 4-5 stars)
- [ ] Optional: Customer photo (300px, circular crop)

**Business Information:**
- [ ] Brand tagline
- [ ] GSTIN number
- [ ] Udyam registration number
- [ ] Contact email
- [ ] Contact phone number
- [ ] WhatsApp number
- [ ] Registered business address
- [ ] Social media handles (Instagram, Facebook, etc.)

**Product Information:**
- [ ] SKU list with exact names
- [ ] Pricing for each SKU
- [ ] Bundle pricing tiers
- [ ] Engraving price (₹15 suggested)
- [ ] Shipping costs/free shipping threshold
- [ ] Subscription discount percentage

**Copy/Content:**
- [ ] Unique value propositions
- [ ] Product descriptions (if not using suggestions)
- [ ] About the brand story
- [ ] Sustainability certifications (if any)

### 8.2 Developer/Designer Deliverables

**Design Phase:**
- [ ] Figma/Adobe XD wireframes and high-fidelity mockups
- [ ] Desktop artboard (1440px)
- [ ] Tablet artboard (768px)
- [ ] Mobile artboard (375px)
- [ ] Component library in Figma
- [ ] Prototype with interactions

**Assets Export:**
- [ ] All icons as optimized SVG
- [ ] Images in WebP format (2x resolution)
- [ ] Images in JPG/PNG format (fallback)
- [ ] Social sharing images (1200x630px)
- [ ] Favicon package (all sizes)

**Development:**
- [ ] Production-ready Next.js codebase
- [ ] Responsive HTML/CSS/JavaScript
- [ ] Component-based architecture
- [ ] Clean, commented code
- [ ] Environment variables template (.env.example)

**Content Management:**
- [ ] CMS integration (if applicable)
- [ ] Editable fields:
  - Product SKUs
  - Prices
  - Short descriptions
  - Long descriptions
  - Inventory levels
  - ASIN/Marketplace links
  - Engraving flag (yes/no)
  - Images

**Documentation:**
- [ ] README.md with:
  - Project overview
  - Tech stack
  - Installation instructions
  - Build commands
  - Deploy steps
  - Environment variables
  - Content editing guide
  - Troubleshooting

**Deployment:**
- [ ] Deployed to production (Vercel/Netlify)
- [ ] Custom domain connected
- [ ] SSL certificate active
- [ ] Analytics ID placeholders
- [ ] Meta tags configured
- [ ] Sitemap.xml generated
- [ ] Robots.txt configured

**Testing:**
- [ ] Lighthouse report (all scores >90)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility audit passed
- [ ] Form submissions tested
- [ ] Checkout flow tested (if D2C)

**Handoff Materials:**
- [ ] Style guide (colors, fonts, spacing)
- [ ] Component documentation
- [ ] Admin panel access (if applicable)
- [ ] Hosting platform credentials
- [ ] Domain registrar info
- [ ] Analytics setup guide

---

## 9. Success Metrics & KPIs

### 9.1 Technical Performance Targets

**Lighthouse Scores:**
- Performance: >90 (mobile and desktop)
- Accessibility: >90
- Best Practices: >90
- SEO: 100

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**Page Load:**
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Total page weight: <2MB
- Number of requests: <50

### 9.2 Business & Conversion Goals

**Conversion Metrics:**
- Add-to-cart rate: Target 15%
- Checkout completion rate: Target 60%
- Overall conversion rate: Target 3-5%

**Engagement Metrics:**
- Average session duration: >2 minutes
- Bounce rate: <50%
- Pages per session: >2.5
- Scroll depth: 70% reach "Product Offerings"

**Revenue Metrics:**
- Average Order Value (AOV): Target ₹400
- Subscription conversion: Target 10% of buyers
- Repeat purchase rate: Target 25% within 6 months

**Email Capture:**
- Subscriber signup rate: Target 5-10%
- Welcome popup conversion: Target 3%

### 9.3 A/B Testing Opportunities

**Test Ideas (Post-Launch):**
1. Hero CTA button text ("Buy Now" vs "Shop Eco-Friendly")
2. Product card layout (vertical vs horizontal)
3. Price display (strike-through vs savings badge)
4. Testimonial format (carousel vs grid)
5. Free shipping threshold (₹399 vs ₹499)
6. Subscription CTA placement (banner vs sticky footer)

---

## 10. Post-Launch Optimization

### 10.1 Analytics Setup

**Google Analytics 4:**
- Enhanced e-commerce events
- Custom events: Add to cart, view product, begin checkout
- Goal completions: Purchase, subscribe, email signup
- User demographics and interests
- Traffic sources analysis

**Heatmaps & Session Recording:**
- Hotjar or Microsoft Clarity
- Identify friction points
- Optimize CTAs based on clicks
- Understand scroll behavior

**E-commerce Metrics:**
- Revenue tracking
- Product performance
- Cart abandonment rate
- Checkout funnel analysis

### 10.2 SEO Enhancements

**Ongoing SEO:**
- Blog content (eco-living tips, oral health)
- Backlink building
- Google My Business (if local)
- Product schema updates
- Alt text optimization
- Internal linking strategy

**Content Ideas:**
- "5 Reasons to Switch to Bamboo Toothbrush"
- "How to Compost Your Bamboo Toothbrush"
- "Bamboo vs Plastic: Environmental Impact"
- "Best Practices for Oral Hygiene"

### 10.3 Marketing Integrations

**Email Marketing:**
- Mailchimp, Klaviyo, or ConvertKit
- Welcome series automation
- Abandoned cart recovery
- Post-purchase follow-up
- Subscription reminders

**Social Media:**
- Instagram Shopping integration
- Facebook Pixel for retargeting
- Pinterest pins for products
- User-generated content campaigns

**Influencer Partnerships:**
- Eco-influencer collaborations
- Unboxing videos
- Honest reviews
- Affiliate program setup

---

## 11. Final Checklist

### Pre-Launch
- [ ] All sections implemented and responsive
- [ ] Images optimized and lazy-loaded
- [ ] Forms functional and validated
- [ ] Checkout flow tested (D2C or marketplace)
- [ ] Analytics and tracking installed
- [ ] Meta tags and schema markup complete
- [ ] Sitemap and robots.txt configured
- [ ] 404 page designed
- [ ] Favicon appears correctly
- [ ] SSL certificate active
- [ ] Domain connected
- [ ] Social sharing images correct
- [ ] Legal pages complete (Privacy, Terms, Shipping)

### Testing
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Desktop testing (Chrome, Firefox, Safari, Edge)
- [ ] Tablet testing
- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Form submissions work
- [ ] Email notifications arrive
- [ ] Payment processing successful
- [ ] Lighthouse scores meet targets

### Launch Day
- [ ] Final content review
- [ ] Prices correct
- [ ] Stock levels accurate
- [ ] Contact info correct
- [ ] Social media announced
- [ ] Email list notified
- [ ] Monitoring in place
- [ ] Backup created

### Post-Launch (Week 1)
- [ ] Monitor analytics
- [ ] Check for errors (console, Sentry)
- [ ] Review user feedback
- [ ] Test checkout flow with real orders
- [ ] Collect initial reviews
- [ ] Social media engagement
- [ ] Email campaign performance

---

## 12. Glossary & References

### Key Terms

**Above the fold:** Content visible without scrolling
**CTA:** Call to Action - button or link prompting user action
**Hero section:** Primary visual/content at top of page
**Lazy loading:** Deferring image load until needed
**Schema markup:** Structured data for search engines
**CLS:** Cumulative Layout Shift - visual stability metric
**LCP:** Largest Contentful Paint - loading performance
**WCAG:** Web Content Accessibility Guidelines

### Recommended Resources

**Design Inspiration:**
- Awwwards.com (premium eco-brands)
- Dribbble (product page designs)
- Land-book.com (landing pages)

**Development:**
- Next.js Documentation
- Tailwind CSS Documentation
- MDN Web Docs (accessibility)

**E-commerce:**
- Shopify's Design Blog
- Baymard Institute (UX research)

**Sustainability:**
- Certified B Corporation
- 1% for the Planet
- Climate Neutral Certified

---

## Conclusion

This comprehensive prompt provides everything needed to build a state-of-the-art, high-converting single-page e-commerce website for an eco bamboo toothbrush brand. The site will be:

✅ **Performance-optimized** - Lighthouse scores >90  
✅ **Conversion-focused** - Strategic CTAs and user flow  
✅ **Accessibility-compliant** - WCAG AA standard  
✅ **SEO-ready** - Complete schema and meta tags  
✅ **Mobile-first** - Responsive on all devices  
✅ **Brand-aligned** - Premium eco aesthetic  
✅ **Commerce-enabled** - D2C and marketplace ready  

By following this detailed specification, the final website will effectively communicate the brand's sustainability mission, build trust through transparency, and convert visitors into loyal customers who care about the planet.

**Next Steps:**
1. Review and approve this prompt
2. Gather all required assets (Section 8.1)
3. Begin design phase (Figma mockups)
4. Develop and test iteratively
5. Launch and optimize based on data

---

**Document Version:** 1.0  
**Last Updated:** October 28, 2024  
**Prepared For:** Eco Bamboo Toothbrush Brand (Leafora)  
**Prepared By:** Advanced Website Development Team
