# Changelog

All notable changes to the **FIXYOUREYES** project (16:9 YouTube Thumbnail Design Reference System) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0] - 2026-09-30

### Added
- **Swiss International Typographic Style**: Complete redesign on a pure white `#ffffff` canvas, razor-sharp 90° geometry (`border-radius: 0 !important`), crisp black borders, and Helvetica/Jakarta/Space Grotesk typography.
- **Single Column Centered Feed**: Homepage gallery configured in a single centered column (`max-width: 800px`) with generous vertical spacing (`3.75rem`) and side whitespace for maximum visual impact.
- **Dynamic Reference Counter**: Header subtitle, slide-over menu, and footer dynamically display the exact reference count (`64 AI REFERENCES`), updating in real time during search.
- **100% Uncropped References**: Containment rendering (`object-fit: contain; background: #000;`) with `16:9` and `YOUTUBE` corner badges ensuring zero artwork cropping.
- **Dynamic Creative Prompts**: Single random creative prompt recipe per reference view under `TRY WITH THIS PROMPT`, complete with `🎲 NEW PROMPT` shuffle and `COPY PROMPT` clipboard utility.
- **Action Buttons**: Instant clipboard image copy, direct PNG download, link share, `mailto:` email sharing, and direct `OPEN CHATGPT ↗` shortcut.
- **5-Color Palettes**: Extracted quantized 5-color palettes per reference with click-to-copy HEX and toast feedback.
- **Minimal Slide-Over Menu**: Expandable right menu containing strictly project **ABOUT** and **AUTHOR** link to Emanuele BDC (Linktree).
- **Deep Linking & Hash Navigation**: URL hash synchronization (`#ref-01`, `#ref-02`) with browser Back/Forward navigation support.

### Changed
- Unified reference modal navigation to a single, uncluttered topbar control (`← PREV` | `01 / 64` | `NEXT →`) plus keyboard arrows and mobile touch swipe.
- Upgraded Service Worker cache to `fixyoureyes-v2026-swiss-v5` for robust offline PWA caching.

### Removed
- Removed 4-column wide grid in favor of the centered single-column feed.
- Eliminated all duplicate navigation arrows (outer floating buttons, on-image hover click zones, bottom card buttons).
- Stripped unnecessary category tabs, filters, and clutter from the header and side drawer.
