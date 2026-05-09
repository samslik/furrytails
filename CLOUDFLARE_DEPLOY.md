# Cloudflare Deployment Guide

## Prerequisites

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

## Deployment Steps

### Local Testing

Test locally before deploying:
```bash
npm run dev
```

### Build for Cloudflare

Build the project for Cloudflare Workers:
```bash
npm run build
```

This creates a `dist/` directory with all necessary files for Cloudflare.

### Deploy to Cloudflare

Deploy to Cloudflare Workers:
```bash
npm run deploy
```

Or deploy to production environment:
```bash
wrangler deploy --env production
```

## Project Setup

Your Cloudflare deployment is configured in `wrangler.toml` with:

- **Compatibility**: Node.js runtime enabled (`nodejs_compat`)
- **Main entry**: `cf-index.js` (Express app wrapper)
- **Static assets**: Served from `/public`
- **Views**: EJS templates from `/views`
- **Translations**: JSON files from `/translations`

## Environment Configuration

To add environment-specific configurations:

1. Update `wrangler.toml` with environment-specific routes:
   ```toml
   [env.production]
   name = "furrytails-prod"
   route = "yourdomain.com/*"
   ```

2. Deploy to specific environment:
   ```bash
   wrangler deploy --env production
   ```

## Important Notes

- The app uses Express with EJS templating
- Static files are served from the `/public` directory
- Multi-language support (English/German) is built-in
- All routes are relative to the language prefix (`:lang`)

## Monitoring

After deployment, check the live URL at:
- Development: https://<account-subdomain>.workers.dev
- Production: https://yourdomain.com

View logs:
```bash
wrangler tail
```
