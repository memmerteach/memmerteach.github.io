# AGENTS.md

## Purpose
Single source of truth for agent and Copilot instructions in this repo.

## Project Overview
- Static site built with Astro.
- Content lives in `src/` and is rendered with Astro layouts.
- Do not edit generated output in `dist/`.

## Key Locations
- Pages: `src/pages/`
- Layouts: `src/layouts/`
- Components: `src/components/`
- Assets & static files: `public/`

## Local Build & Validation (Astro)
Run these from the repo root:
- Install dependencies: `pnpm install`
- Dev server: `pnpm dev`
- Build once: `pnpm build`
- Preview build: `pnpm preview`
- Validation: `./scripts/validate.sh`

## Local Validation Hooks
Set up git hooks (once per clone): `./scripts/setup-githooks.sh`
- Pre-commit: `./scripts/validate.sh --quick`
- Pre-push: `./scripts/validate.sh`

## Images (Required)
- Store images under `public/assets/images/` and organize by topic.
- Optimize images before commit.
- Provide descriptive alt text for every image and aria labels for controls; avoid generic placeholders.

## Editing Rules
- Do not commit large or unoptimized binaries.
- Prefer Markdown over HTML unless needed for layout control.
- Keep HTML/CSS changes minimal and accessibility-focused.

## Instruction Sources
- Copilot instructions should reference this file.
- Keep `.github/copilot-instructions.md` in sync with this file.
