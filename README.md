# FIXYOUREYES
### 16:9 YouTube Thumbnail Design Reference System
**Selected AI References & Creative Direction Vault by [Emanuele BDC](https://linktr.ee/emaf205)**

[![Version](https://img.shields.io/badge/version-4.0.0-black?style=flat-square)](VERSION.txt)
[![Style](https://img.shields.io/badge/design-Swiss%20Editorial-red?style=flat-square)](#-design-manifesto)
[![Aspect Ratio](https://img.shields.io/badge/aspect%20ratio-16%3A9-black?style=flat-square)](#)
[![PWA](https://img.shields.io/badge/PWA-offline%20ready-black?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-black?style=flat-square)](LICENSE)

> **FIXYOUREYES** is a client-side design reference system engineered for YouTubers, creative directors, and digital creators. Built in strict **Swiss International Typographic Style**, it provides 64 curated, uncropped 16:9 aesthetic anchors, extracted color palettes, dynamic prompt recipes, and instant integration with ChatGPT and AI image generators.

---

## 📸 Visual Showcase

### 1. Single-Column Centered Feed (Homepage)
A clean, distraction-free editorial stream displaying 16:9 visual references with generous vertical cadence and side whitespace.

![FIXYOUREYES Homepage Feed](assets/fixyoureyes-home-preview.png)

---

### 2. Reference Detail Modal
Full 16:9 uncropped thumbnail inspection with unified topbar navigation, 5-color palette swatches, 1-click clipboard actions, and single dynamic AI prompt recipe with shuffle.

![FIXYOUREYES Reference Modal](assets/fixyoureyes-modal-preview.png)

---

### 3. Minimal Slide-Over Drawer
A razor-sharp right-side menu containing strictly project overview and curator links.

![FIXYOUREYES Slide-over Menu](assets/fixyoureyes-menu-preview.png)

---

## 🏛️ Design Manifesto

FIXYOUREYES follows the foundational principles of the **Swiss Style (International Typographic Style)**:

- **100% Pure White Canvas:** Built entirely on `#ffffff` with high-contrast `#000000` structure and sharp Swiss red (`#ff0000`) accents. No dark mode, no decorative fluff.
- **Razor-Sharp Geometry:** Absolute zero rounded corners (`border-radius: 0px !important`) across every single card, button, tag, and modal container.
- **Centered Editorial Stream:** Desktop layout focused in a centered 800px column with generous margins and a 3.75rem vertical gap between thumbnail anchors.
- **Zero Artwork Cropping:** Complete 16:9 preservation (`object-fit: cover` with locked `16 / 9` aspect ratio) ensuring typography, lighting, and frame composition remain 100% intact.
- **Bold Grotesk Typography:** Powered by Helvetica Neue, Plus Jakarta Sans, and Space Grotesk.

---

## ⚡ Core Features

- 🎯 **64 Curated 16:9 Visual Anchors:** Across 8 distinct aesthetic packs (Editorial, Cinematic, Minimal, Futuristic, Noir, Visual Shock, Surreal Editorial, and Text Standard).
- 🎨 **Quantized 5-Color Palettes:** Real median-cut palette extracted directly from each reference image. Click any color chip to copy its HEX code with immediate toast confirmation.
- 🎲 **Dynamic Creative AI Prompt Recipes:** Every reference card features a curated creative direction prompt under `TRY WITH THIS PROMPT`. Includes a `🎲 NEW PROMPT` shuffle button (cycling through 5 variations per style) and a `COPY PROMPT` 1-click button.
- 🛠️ **Direct Creator Action Suite:**
  - **Copy Image:** Copies the 16:9 PNG image directly to your clipboard for instant pasting into ChatGPT.
  - **Download PNG:** Saves the full-resolution uncompressed 16:9 reference.
  - **Share Link:** Uses native Web Share API or copies the direct URL.
  - **Share via Email:** Direct `mailto:` action with preformatted subject and style link.
  - **OPEN CHATGPT ↗:** Dedicated shortcut launching [chatgpt.com](https://chatgpt.com) in a new tab.
- 🧭 **Unified Topbar Navigation:** Single, uncluttered header navigation (`← PREV` | `01 / 64` | `NEXT →` | `✕`) paired with keyboard arrow keys (`ArrowLeft`, `ArrowRight`, `Escape`) and mobile touch swipe.
- 🔗 **Deep-Linking & Browser History:** Active modal states automatically sync with URL hashes (`#ref-01`, `#ref-02`), supporting browser Back/Forward navigation.
- 📱 **100% Client-Side Progressive Web App (PWA):** Zero frameworks, zero external server dependencies, powered by modern Vanilla ES6+ and Service Worker (`v6`) network-first caching.

---

## 📁 Repository Structure

```
FIXYOUREYES/
├── index.html                   # Swiss Editorial HTML application
├── manifest.webmanifest         # PWA Manifest (theme #ffffff, icons, display standalone)
├── sw.js                        # Service Worker v6 (network-first navigation caching)
├── VERSION.txt                  # Current release version (v4.0.0)
├── CHANGELOG.md                 # Complete release history
├── README.md                    # Visual documentation and user guide
├── css/
│   └── style.css                # Swiss Design System (0px radius, 800px column, grid, modal)
├── js/
│   ├── app.js                   # Application controller, modal logic, search, clipboard
│   └── data.js                  # 64 reference database, extracted palettes & prompt pools
├── icons/                       # PWA favicons & app icons (192x192, 512x512)
├── images/
│   └── references/              # 64 High-Res 16:9 Reference thumbnails across 8 packs
└── assets/                      # Repository preview screenshots
```

---

## 🚀 Quick Start (Local Run)

FIXYOUREYES is 100% client-side with zero build steps or npm dependencies.

To launch locally using Python's built-in HTTP server:

```bash
# Clone the repository
git clone https://github.com/emaf205/FIXYOUREYES.git

# Navigate into the project
cd FIXYOUREYES

# Start local server
python3 -m http.server 8765

# Open in your browser:
# http://localhost:8765/
```

Or serve with any static web server (Node `npx serve`, Caddy, Nginx, or Netlify).

---

## 🎨 The 8 Reference Packs

| Pack | Name | Visual Focus |
|:---:|:---|:---|
| **01** | **Core Essentials** | High-impact YouTube standards (Editorial Illustration, Cinematic Drama, Minimal Bold, Documentary) |
| **02** | **Design Movements** | Historic art directions (Bauhaus, Brutalism, Swiss Style, Constructivism, Memphis, De Stijl) |
| **03** | **Artistic Riot** | Analog & tactile textures (Vintage Collage, Street Poster, Risograph, Retro Comic, Linocut) |
| **04** | **Digital Futures** | High-tech & computational aesthetics (Cyberpunk UI, Holographic, Blueprint, Isometric, Synthwave) |
| **05** | **Dark & Luxury** | Premium mood & lighting (Dark Noir, Luxury Editorial, Liquid Chrome, Monolith Gold, Obsidian) |
| **06** | **Visual Shock** | Scroll-stopping curiosity hooks (Impossible Maze, Evidence Wall, Spatial Paradox, Glitch Chaos) |
| **07** | **Conceptual Editorial** | Sophisticated visual metaphors (Surreal Stippling, Geometric Editorial, Dual Reality, Engraving) |
| **08** | **Text Standard References** | Typography-led compositions with battle-tested headline placement and readability zones |

---

## 💡 Production Rules & Creator Guardrails

- **YouTube Safe Zone:** YouTube overlays the video duration timestamp in the bottom-right corner. Never place critical focal subjects or punchy text in the lower right quadrant.
- **The 15% Mobile Thumbnail Test:** Always zoom out to 15% on your screen. A winning thumbnail must remain clearly decodable and visually distinct at the size of a postage stamp. High contrast and clean typography are essential.
- **Language Fidelity:** When prompting ChatGPT with attached references, headline copy should always match the language of your video transcript or script.

---

## 👤 Author & Credits

**FIXYOUREYES** is an open source project created by **Emanuele BDC**.  
Made with ❤️ in Milan.

- **Linktree:** [linktr.ee/emaf205](https://linktr.ee/emaf205)
- **YouTube:** [@EmanueleBDC](https://youtube.com/@EmanueleBDC)
- **Instagram:** [@emanuelebdc](https://instagram.com/emanuelebdc)

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
