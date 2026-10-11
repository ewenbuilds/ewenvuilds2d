# EWENBUILDS.xyz — Cloudflare Pages Deployment & Architecture Guide

This guide details the complete deployment pipeline, domain configuration, and analytics setup for hosting **EWENBUILDS.xyz** on **Cloudflare Pages**.

---

## 1. Cloudflare Pages Deployment Pipeline

### Step 1: Connect Your GitHub Repository
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com).
2. In the left-hand navigation, navigate to **Compute (Workers & Pages)** > **Create application** > select the **Pages** tab.
3. Click **Connect to Git**.
4. Select your GitHub account and choose the repository containing the `EWENBUILDS.xyz` codebase.

### Step 2: Configure Build Settings
Under the **Set up builds and deployments** screen, enter the exact configuration below:

| Field | Configuration Value |
|---|---|
| **Framework preset** | `Vite` (or `None`) |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/` (leave blank or default) |

### Step 3: Runtime Environment & Node Version
The `.nvmrc` file in the root of the repository is set to `20`, ensuring Cloudflare automatically builds with **Node.js 20**.
If configuring manually:
- Under **Environment variables**, add:
  - Variable: `NODE_VERSION`
  - Value: `20`

> **CRITICAL LOCKFILE RULE**:
> Do **NOT** commit artificial `bun.lock`, `yarn.lock`, or `package-lock.json` files generated outside your specific package manager. Cloudflare Pages uses standard npm/pnpm dependency resolution. Only provide `package.json`.

Click **Save and Deploy**. Cloudflare Pages will build and deploy the static bundle in approximately 20–30 seconds.

---

## 2. Custom Domain Configuration (`ewenbuilds.xyz`)

### Step 1: Add the Domain Zone (if not already managed on Cloudflare)
1. Go to the Cloudflare dashboard homepage and click **Add a site**.
2. Enter `ewenbuilds.xyz` and select the Free plan.
3. Update your domain registrar's nameservers to point to the Cloudflare nameservers provided.

### Step 2: Attach the Domain to Cloudflare Pages
1. In Cloudflare Dashboard, go to **Compute (Workers & Pages)** > click your **ewenbuilds** project.
2. Select the **Custom domains** tab > click **Set up a custom domain**.
3. Enter `ewenbuilds.xyz` (and optionally repeat for `www.ewenbuilds.xyz`).
4. Click **Continue**. Cloudflare automatically adds the appropriate CNAME DNS record targeting `<project-name>.pages.dev`.

### Step 3: Automatic SSL / TLS Certificate
Cloudflare automatically provisions and auto-renews an edge SSL/TLS certificate for `ewenbuilds.xyz` at no cost.
- Navigate to **SSL/TLS** > verify encryption mode is set to **Full** or **Strict**.
- Under **Edge Certificates**, enable **Always Use HTTPS**.

---

## 3. Static Assets & File Downloads Architecture

All downloadable assets are served directly from the `public/` directory and copied automatically into the `dist/` folder on build:

| Target File | Static Repository Location | Deployed Public URL |
|---|---|---|
| Full Project Archive (.zip) | `public/downloads/[INSERT PROJECT NAME].zip` | `/downloads/[INSERT PROJECT NAME].zip` |
| Build Files (CAD / STEP / STL) | `public/downloads/[INSERT BUILD FILES - CAD STL].step` | `/downloads/[INSERT BUILD FILES - CAD STL].step` |
| Engineering Resume (PDF) | `public/downloads/[INSERT RESUME FILE].pdf` | `/downloads/[INSERT RESUME FILE].pdf` |
| 3D Model File (.glb / .gltf) | `public/models/[INSERT 3D MODEL FILE].glb` | `/models/[INSERT 3D MODEL FILE].glb` |

### Replacing Placeholders:
Simply drop your actual compiled `.zip`, `.step`, `.stl`, `.glb`, and `.pdf` files into `public/downloads/` and `public/models/`, then update the filenames in the corresponding component props (`ProjectsSection.tsx`, `BuildGuidesSection.tsx`, and `ResumeSection.tsx`).

---

## 4. SPA Routing & Security Headers

The following files are pre-configured in `public/` and automatically applied by Cloudflare Pages:
1. `public/_redirects`:
   ```
   /* /index.html 200
   ```
   Ensures deep links and direct browser refreshes route to the SPA without 404 errors.

2. `public/_headers`:
   ```
   /*
     X-Content-Type-Options: nosniff
     X-Frame-Options: SAMEORIGIN
     Referrer-Policy: strict-origin-when-cross-origin
   ```

---

## 5. Analytics & Admin Access

### Admin Dashboard (No Custom Auth or Firebase Required)
In a modern static architecture, **you do NOT need a custom database or admin authentication backend**.
- View all live analytics, unique visitors, bandwidth, geographic distribution, and referrers directly in:
  **[dash.cloudflare.com](https://dash.cloudflare.com) > Analytics & Logs > Web Analytics**

### Enabling Cloudflare Web Analytics:
1. In Cloudflare Dashboard, go to **Analytics & Logs** > **Web Analytics** > **Add a site**.
2. Enter `ewenbuilds.xyz`.
3. Cloudflare provides a Site Token.
4. In `index.html`, locate line 29:
   ```html
   <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "[INSERT CLOUDFLARE WEB ANALYTICS TOKEN]"}'>
   </script>
   ```
   Replace `[INSERT CLOUDFLARE WEB ANALYTICS TOKEN]` with your 32-character token.

### Button-Click & Download Tracking:
- All download buttons trigger lightweight custom JavaScript events via `src/utils/analytics.ts` (`trackDownload(...)` and `trackEvent(...)`).
- **Optional GA4 Integration**: To send events to Google Analytics 4, uncomment the GA4 snippet in `index.html` and supply your Measurement ID (`G-XXXXXXXXXX`). The tracking utility automatically forwards all download events to `window.gtag`.

---

## 6. Contact Form Dispatch Options

### Option A: Formspree (Default Static)
In `src/components/ContactSection.tsx`, replace `[INSERT FORMSPREE ENDPOINT URL]` in the form tag with your Formspree endpoint (e.g. `https://formspree.io/f/xyz123`).

### Option B: Cloudflare Pages Function (`/api/contact`)
The repository includes a ready-to-run edge function at `functions/api/contact.js`.
1. In Cloudflare Pages project settings: **Settings** > **Environment variables** > add:
   - `EMAIL_API_KEY`: Your Resend or SendGrid API key
   - `RECIPIENT_EMAIL`: Your personal notification email
2. Cloudflare Pages automatically detects the `functions/` directory and mounts `/api/contact` on deployment.
