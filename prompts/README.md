# AI YouTube Thumbnail Studio — Prompt Suite

This directory contains the modular prompt toolkit for directing, generating, and polishing high-CTR 16:9 thumbnails with ChatGPT, Midjourney, and AI image generators.

---

## 📂 Prompts Directory Overview

| Folder | File | Purpose |
|:---|:---|:---|
| **[`01_MASTER_PROMPT/`](01_MASTER_PROMPT/)** | [`MASTER_PROMPT.md`](01_MASTER_PROMPT/MASTER_PROMPT.md) / [`.txt`](01_MASTER_PROMPT/MASTER_PROMPT.txt) | **The Core Engine.** Complete Creative Director prompt that parses transcripts/scripts and generates structured 16:9 thumbnail concepts. |
| **[`02_HOOKS_AND_COPY/`](02_HOOKS_AND_COPY/)** | [`HEADLINE_AND_HOOK_PROMPT.md`](02_HOOKS_AND_COPY/HEADLINE_AND_HOOK_PROMPT.md) | **Copywriting.** Extracts 10 high-CTR headlines (2-4 words max) using psychological curiosity gaps. |
| **[`03_CREATOR_PORTRAITS/`](03_CREATOR_PORTRAITS/)** | [`PORTRAIT_AND_LIGHTING_PROMPT.md`](03_CREATOR_PORTRAITS/PORTRAIT_AND_LIGHTING_PROMPT.md) | **Creator Studio.** Directs cinematic studio lighting, rim edge lights, and natural expressions. |
| **[`04_STYLE_REFINEMENT/`](04_STYLE_REFINEMENT/)** | [`IMAGE_REFINEMENT_AND_VARIATIONS_PROMPT.md`](04_STYLE_REFINEMENT/IMAGE_REFINEMENT_AND_VARIATIONS_PROMPT.md) | **Iteration & Polish.** Tweaks mobile contrast, typography backdrop, and generates alternative palette shifts. |

---

## ⚡ Quick Start: Standard Workflow

1. Start a new chat session in ChatGPT (GPT-4o / GPT-4).
2. Paste the **Master Prompt** from [`01_MASTER_PROMPT/MASTER_PROMPT.md`](01_MASTER_PROMPT/MASTER_PROMPT.md).
3. Attach one of the 16:9 reference images from `references/`.
4. Paste your video transcript, notes, or article.
5. *(Optional)* If you need sharper text hooks or need to iterate on lighting/contrast, use the prompts in `02_HOOKS_AND_COPY/` and `04_STYLE_REFINEMENT/`.
