# Pre-Launch Checklist & Customization Guide

Work through every section below **in order** before going live.  
Items marked **[BLOCKER]** will break the site for visitors if skipped.

---

## 1. EmailJS — Contact Form **[BLOCKER]**

The contact form will silently fail until you complete this step.

### Step 1 — Create the `.env.local` file

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

Then open `.env.local` and replace every placeholder:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_TO_NAME=Your Name
VITE_EMAILJS_TO_EMAIL=youremail@gmail.com
```

### Step 2 — Get your EmailJS credentials

1. Sign up (free) at [emailjs.com](https://www.emailjs.com)
2. **Add a service** → choose Gmail → connect your account → copy the **Service ID**
3. **Create a template** → click Save → copy the **Template ID**  
   Make sure the template uses these variable names:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{to_name}}` — your name
   - `{{message}}` — the message body
4. Go to **Account → API Keys** → copy your **Public Key**

### Step 3 — Verify locally

```bash
npm run dev
```

Fill out the contact form and check your inbox. You should receive a test email.

> **Security:** `.env.local` is already in `.gitignore`. Never commit it.  
> When deploying (e.g. Netlify / Vercel), add these same variables in your  
> hosting provider's environment settings panel.

---

## 2. Social Links **[BLOCKER]**

**File:** `src/constants/index.js`

Replace every placeholder URL in the `socialLinks` array with your real profiles:

```js
const socialLinks = [
  { name: 'WhatsApp',  href: 'https://wa.me/YOUR_PHONE_NUMBER',        icon: whatsapp  },
  { name: 'Instagram', href: 'https://www.instagram.com/YOURUSERNAME', icon: instagram },
  { name: 'Behance',   href: 'https://www.behance.net/YOURUSERNAME',   icon: behance   },
  { name: 'YouTube',   href: 'https://www.youtube.com/@YOURCHANNEL',   icon: youtube   },
];
```

- **WhatsApp:** use international format without `+` or spaces (e.g. `447911123456`)
- If you don't use one of these platforms, remove its object from the array entirely

---

## 3. Projects **[BLOCKER]**

**File:** `src/constants/index.js`

All 5 projects currently point to someone else's GitHub and live demos. Replace them with your own work.

For each project in the `projects` array, update:

| Field         | What to put                                       |
|---------------|---------------------------------------------------|
| `name`        | Your project's title                              |
| `description` | One or two sentences about it                    |
| `tags`        | Tech stack used (name + a color class)            |
| `image`       | Screenshot import (see below)                    |
| `repo`        | Your GitHub repository URL                        |
| `demo`        | Your live demo URL (or `'#'` if not deployed yet) |

**To add a project screenshot:**
1. Export a screenshot as PNG and drop it in `src/assets/projects/`
2. Open `src/assets/index.js` and add an export:
   ```js
   export { default as myProject } from './projects/my-project.png';
   ```
3. Import it at the top of `src/constants/index.js` and use it as the `image` value

---

## 4. Your Name — Hero Section

**File:** `src/components/Hero.jsx`

Find the two `<span>` elements around line 65 and change the name:

```jsx
<span ...>Genald</span>   {/* ← your first name */}
<span ...>Komino</span>   {/* ← your last name  */}
```

---

## 5. About / Bio Text

**File:** `src/components/About.jsx`

Replace the placeholder paragraph around line 29 with your own bio:

```jsx
<motion.p ...>
  Write your bio here.
</motion.p>
```

The section heading `Overview.` is two lines above — rename it if you want.

---

## 6. Services / Skill Cards

**File:** `src/constants/index.js`

The `services` array controls the four cards in the About section:

```js
const services = [
  { title: 'Photography',  Icon: HiOutlineCamera      },
  { title: 'Video',        Icon: HiOutlineVideoCamera  },
  { title: 'Film making',  Icon: HiOutlineFilm         },
  { title: 'Videoclips',   Icon: HiOutlinePlayCircle   },
];
```

- Change `title` to describe your skills
- Swap `Icon` for any icon from [react-icons/hi2](https://react-icons.github.io/react-icons/)

---

## 7. Logo

**Files:**
- `src/assets/logo/logo-black.png` — circular icon shown in the navbar
- `src/assets/logo/logo-text-black.png` — text image beside the icon

Replace either PNG with your own file using the **exact same filename**, or update the import in `src/assets/index.js`.

> Recommended size for `logo-black.png`: 200×200 px, transparent background.

---

## 8. Browser Tab Title & Favicon

**File:** `index.html`

```html
<title>Qorries | Portfolio</title>
<link rel="icon" type="image/svg+xml" href="/logo.png" />
```

- Change the `<title>` to your own name or brand
- Replace `/logo.png` in `public/` with your own favicon  
  (PNG ≤ 32×32 px for a favicon; the current file is 121 KB — swap it for a smaller one)

---

## 9. Hero Background Video

| Device  | File to replace             | Recommended ratio |
|---------|-----------------------------|-------------------|
| Desktop | `public/hero-bg.mp4`        | 16:9 landscape    |
| Mobile  | `public/hero-bg-mobile.mp4` | 9:16 portrait     |

Drop your MP4 files into `public/` using those exact filenames.  
The current videos are ~57 MB each — **compress them** before launch:

```bash
# Example using ffmpeg (install via your package manager)
ffmpeg -i hero-bg.mp4 -vcodec libx264 -crf 28 -preset slow hero-bg-compressed.mp4
```

Aim for **under 10 MB** per video. Rename the compressed file to the expected filename.

---

## 10. Grain Background Video

**File:** `public/grain-bg.mp4`

Replace this with your own grain / texture overlay video, or delete the `<video>` block in `src/App.jsx` if you don't want it.

---

## 11. Project Images — Optimise Before Build

The current project screenshots are 1–2.5 MB PNG files each. Convert them to WebP before deploying:

```bash
# Using ffmpeg or cwebp (install cwebp via your package manager)
cwebp -q 80 my-project.png -o my-project.webp
```

Then update the imports in `src/assets/index.js` and `src/constants/index.js` to reference the `.webp` files.

---

## 12. SEO Meta Tags

**File:** `index.html`

Add these inside `<head>` for better search engine visibility and link previews:

```html
<meta name="description" content="Portfolio of [Your Name] — photographer, filmmaker and videographer." />
<meta property="og:title" content="[Your Name] | Portfolio" />
<meta property="og:description" content="Portfolio of [Your Name]" />
<meta property="og:image" content="https://yoursite.com/logo.png" />
<meta property="og:url" content="https://yoursite.com" />
```

---

## 13. Final Build & Check

Run the production build one last time after completing all steps above:

```bash
npm run build
```

Then preview it locally to confirm everything works end-to-end:

```bash
npm run preview
```

Open [http://localhost:4173](http://localhost:4173) and manually verify:
- [ ] Contact form sends a real email to your inbox
- [ ] All social links open the correct profiles
- [ ] All project cards show your work with working repo/demo links
- [ ] Your name, bio, and skills are correct
- [ ] Logo and favicon look right on the browser tab
- [ ] Videos load and play (check on mobile too)
- [ ] No browser console errors

---

## 14. Deploying

When you deploy to **Netlify** or **Vercel**, add your environment variables in the hosting dashboard — **do not commit `.env.local`**.

| Platform | Where to add env vars |
|----------|----------------------|
| Netlify  | Site settings → Environment variables |
| Vercel   | Project settings → Environment Variables |

Add all five `VITE_EMAILJS_*` variables there, then trigger a new deploy.

---

## Quick File Map

```
qorries-web/
├── .env.example              ← template — copy to .env.local and fill in
├── .env.local                ← YOUR secrets (never commit this)
├── public/
│   ├── hero-bg.mp4           ← hero video (desktop 16:9)
│   ├── hero-bg-mobile.mp4    ← hero video (mobile 9:16)
│   ├── grain-bg.mp4          ← grain overlay video
│   └── logo.png              ← favicon / OG image
├── index.html                ← page title, favicon link, meta tags
└── src/
    ├── assets/
    │   ├── logo/
    │   │   ├── logo-black.png       ← navbar icon
    │   │   └── logo-text-black.png  ← navbar text image
    │   └── projects/                ← project card screenshots
    ├── components/
    │   ├── Hero.jsx           ← your first & last name
    │   ├── About.jsx          ← bio paragraph
    │   └── Contact.jsx        ← reads credentials from .env.local automatically
    └── constants/
        └── index.js           ← nav links, services, projects, social links
```
