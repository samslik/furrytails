# Furry Tails Pet Photography Website

## Overview
A Node.js website for a pet photographer featuring a hero section with four distinct card layouts, an about section, and navigation to subpages for gallery, sessions, prices, vouchers, about, and contact.

## Tech Stack
- **Backend**: Express.js (Node.js)
- **Templating**: EJS
- **Styling**: CSS3 with Google Fonts
- **Fonts**: Anton (headlines, buttons, menu), Spectral (body text), Cochin (logo), Inter (nav/buttons)

## Project Structure
```
/Users/sbochniak/code/furrytails/
├── server.js                 # Express server configuration
├── package.json              # Dependencies and scripts
├── views/
│   ├── index.ejs            # Hero page with 4 cards
│   ├── how-it-works.ejs     # Sessions/How it works page
│   ├── about.ejs            # About photographer page
│   ├── prices.ejs           # Pricing packages page
│   ├── gallery.ejs          # Photo gallery page
│   └── contact.ejs          # Contact form page
├── public/
│   ├── styles.css           # Main stylesheet
│   └── gallery/             # Pet photos and logo
│       ├── turqouse.jpeg    # Teal card image
│       ├── pink.jpeg        # Pink card image
│       ├── blue.jpeg        # Light blue card image
│       ├── brown.jpeg       # Brown card image
│       └── logo.jpeg        # Pet Photography logo
└── mockup/                  # Design mockups and screenshots
```

## Key Features

### Hero Section (4 Custom Cards)
Each card has a unique layout with specific image sizing and positioning:

1. **Teal Card** (Top Left - 360px height)
   - Text: Left side, centered vertically
   - Image: Full height (360px) aligned to right edge
   - Content: Headline (2 lines), description, 2 buttons

2. **Pink Card** (Top Right - 472px height)
   - Text: Centered at top
   - Image: Bottom left (234×286px, 30% larger)
   - Special: Subtitle and button positioned at middle of picture height, centered between image and right edge
   - Buttons: White background

3. **Light Blue Card** (Bottom Left - 472px height)
   - Text: Top section
   - Image: Centered at bottom (384×268px, doubled size)
   - Layout: Flexbox column

4. **Brown Card** (Bottom Right - 360px height)
   - Text: Top section
   - Image: Bottom right (182×208px, 30% larger)
   - Layout: Flexbox column

### Column Structure
- **Left Column**: Teal + Light Blue (stacked, 25px gap)
- **Right Column**: Pink + Brown (stacked, 25px gap)
- Total heights balanced: Both columns = 857px (360 + 25 + 472)

### About Section
- Two-column layout
- Left: Photographer bio with button
- Right: Three feature slogans with black/white SVG icons
- Background: Matches hero section (#f5f5f5)

### Navigation
- Sticky top navbar with logo and links
- Links: GALLERY, SESSIONS, PRICES, VOUCHERS, ABOUT, CONTACT
- Font: Inter Medium for menu items

## Color Palette
- Teal: #5fa39a
- Pink: #e84a81 (with #a8e8d9 accents in mockup, #fff in current)
- Light Blue: #6bc6d5
- Brown: #a68672
- Background: #f5f5f5
- Text: #000

## Running the Website
```bash
npm install
npm run dev
# or
npm start
```
Server runs on http://localhost:3000

## Page Routes
- `/` - Hero page
- `/how-it-works` - Sessions information
- `/about` - About photographer
- `/prices` - Pricing packages
- `/gallery` - Photo gallery
- `/contact` - Contact form

## Typography
- **Headlines (h1-h6)**: Anton font, bold, black text
- **Body text**: Spectral serif, regular weight
- **Logo**: Cochin serif
- **Menu/Buttons**: Inter medium weight

## Notes
- Text containers positioned to avoid overlap with images
- Card images use `object-fit: cover` for proper scaling
- Responsive design with mobile breakpoints
- All buttons have white background with black text
