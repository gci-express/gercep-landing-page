
# GERCEP Landing Page

Official landing page for **Gercep** — a modern logistics solutions provider focused on fast, reliable, customer-centric service.

## Tech Stack

- Astro
- React
- Tailwind CSS
- framer-motion
- shadcn/ui
- TypeScript
- Ultracite (lint/format)

## Prerequisites

- Bun

## Development

```sh
bun install
bun dev
```

Open `http://localhost:4321`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command | Description |
| :-- | :-- |
| `bun dev` | Start the dev server |
| `bun build` | Build for production to `dist/` |
| `bun preview` | Preview the production build |
| `bun typecheck` | TypeScript typecheck (`tsc --noEmit`) |
| `bun lint` | Lint (`ultracite check`) |
| `bun format` | Format/fix (`ultracite fix`) |
| `bun ui` | Run the shadcn/ui CLI |
| `bun ultracite:validate` | Validate Ultracite |

## Project Structure

```text
public/            Static assets (logos, images)
src/pages/         Astro pages (routing)
src/components/    UI/section components (React)
src/layouts/       Layout Astro
src/lib/           Constants & utilities
```

## Notes

- Homepage: `src/pages/index.astro`
- Navigation/CTA/clients/services/values/team data: `src/lib/constants.ts`
