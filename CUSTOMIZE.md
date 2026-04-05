# Customization Guide

A quick reference for every piece of text, image, video, and link you can change on this site.

---

## 1. Your Name (Hero Section)

**File:** `src/components/Hero.jsx`

Find the two `<span>` elements near line 65 and change `Genald` / `Komino` to your own first and last name.

```jsx
<span ...>Genald</span>   ← your first name
<span ...>Komino</span>   ← your last name
```

---

## 2. Logo Icon & Logo Text Image

**Files:**
- `src/assets/logo/logo-black.png` — the circular icon on the left of the navbar
- `src/assets/logo/logo-text-black.png` — the text image beside the icon

Replace either PNG with your own file **using the exact same filename**, or update the import path in `src/assets/index.js`.

---

## 3. Hero Background Video

There are now **two separate videos** — one for desktop and one for mobile — so you can use the right aspect ratio for each.

| Device  | File to replace              | Recommended ratio |
|---------|------------------------------|-------------------|
| Desktop | `public/hero-bg.mp4`         | 16:9 landscape    |
| Mobile  | `public/hero-bg-mobile.mp4`  | 9:16 portrait     |

Drop your MP4 files into the `public/` folder using those exact filenames. Both must be MP4 (H.264 recommended).

The filenames are set near the top of `src/components/Hero.jsx`:

```js
const HERO_VIDEO_DESKTOP = '/hero-bg.mp4';
const HERO_VIDEO_MOBILE  = '/hero-bg-mobile.mp4';
```

Change those constants if you want to use different filenames.

---

## 4. Navigation Links

**File:** `src/constants/index.js`

The `navLinks` array controls the menu items. Change `title` to rename a link (the `id` must match the section's HTML `id` attribute).

```js
export const navLinks = [
  { id: 'about',    title: 'About'   },
  { id: 'projects', title: 'Projects' },
  { id: 'contact',  title: 'Contact' },
];
```

---

## 5. About / Introduction Text

**File:** `src/components/About.jsx`

Find the `<motion.p>` block around line 29 and replace the Lorem Ipsum with your own bio.

```jsx
<motion.p ...>
  Your bio goes here.          ← change this
</motion.p>
```

The section heading `Overview.` is hardcoded two lines above — change it if needed:

```jsx
<h2 ...>Overview.</h2>         ← rename section heading
```

---

## 6. Services / Skill Cards (About Section)

**File:** `src/constants/index.js`

The `services` array controls the four cards in the About section. Change `title` and swap the `Icon` import for a different react-icons icon.

```js
const services = [
  { title: 'Photography',  Icon: HiOutlineCamera      },
  { title: 'Video',        Icon: HiOutlineVideoCamera  },
  { title: 'Film making',  Icon: HiOutlineFilm         },
  { title: 'Videoclips',   Icon: HiOutlinePlayCircle   },
];
```

Icons come from the `react-icons/hi2` package. Browse replacements at [react-icons.github.io](https://react-icons.github.io/react-icons/).

---

## 7. Projects

**File:** `src/constants/index.js`

Edit the `projects` array. For each project:

| Field         | What to change                                   |
|---------------|--------------------------------------------------|
| `name`        | Project title shown on the card                  |
| `description` | Short description shown when card is expanded    |
| `image`       | Import a PNG from `src/assets/projects/` and reference it here |
| `repo`        | GitHub (or any) repository URL                   |
| `demo`        | Live demo URL                                    |

**To add a project image:**
1. Drop your PNG into `src/assets/projects/`
2. Import it near the top of `src/constants/index.js` (follow the existing import pattern)
3. Use the import name as the `image` value in your project object

---

## 8. Social / Contact Links

**File:** `src/constants/index.js`

The `socialLinks` array controls the icon links in the contact or footer area.

```js
const socialLinks = [
  { name: 'WhatsApp',  href: 'https://wa.me/YOURNUMBER',          icon: whatsapp  },
  { name: 'Instagram', href: 'https://www.instagram.com/YOURNAME', icon: instagram },
  { name: 'Behance',   href: 'https://www.behance.net/YOURNAME',   icon: behance   },
  { name: 'YouTube',   href: 'https://www.youtube.com/@YOURNAME',  icon: youtube   },
];
```

Replace each `href` with your actual profile URL.

**Social icon images** (outline SVGs) are in `src/assets/social/`. You can swap them for any SVG with the same filename.

---

## 9. Contact Form (EmailJS)

**File:** `src/components/Contact.jsx`

The form uses [EmailJS](https://www.emailjs.com/) to send messages. After creating a free account:

1. Create a **Gmail service** → copy the **Service ID**
2. Create an **email template** → copy the **Template ID**
3. Copy your **Public Key** from your EmailJS profile

Then replace the placeholders in `Contact.jsx` around line 32:

```js
emailjs.send(
  'serviceID',      // ← paste your Service ID
  'templateID',     // ← paste your Template ID
  {
    to_name:  'YourName',           // ← your name
    to_email: 'youremail@gmail.com', // ← your email
    ...
  },
  'yourpublickey'   // ← paste your Public Key
)
```

---

## 10. Browser Tab Title & Favicon

**File:** `index.html` (root of the project)

```html
<title>Your Name</title>
<link rel="icon" type="image/png" href="/favicon.png" />
```

Replace the title text and drop your own `favicon.png` into the `public/` folder.

---

## Quick File Map

```
qorries-web/
├── public/
│   ├── hero-bg.mp4              ← hero background video (desktop, 16:9)
│   └── hero-bg-mobile.mp4       ← hero background video (mobile, 9:16 portrait)
├── index.html                   ← page title & favicon
└── src/
    ├── assets/
    │   ├── logo/
    │   │   ├── logo-black.png       ← navbar icon
    │   │   └── logo-text-black.png  ← navbar text image
    │   ├── projects/                ← project card images
    │   └── social/                  ← social icon SVGs
    ├── components/
    │   ├── Hero.jsx             ← your name text
    │   ├── About.jsx            ← bio paragraph & section heading
    │   ├── Projects.jsx         ← projects section heading & description
    │   └── Contact.jsx          ← EmailJS keys & your email
    └── constants/
        └── index.js             ← nav links, services, projects, social links
```
