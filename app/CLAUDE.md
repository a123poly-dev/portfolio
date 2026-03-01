# Portfolio App

Product designer portfolio — React SPA, migrated from Webflow.

## Tech Stack

- **React 19** + **TypeScript 5.7** (strict mode)
- **Vite 6** — bundler
- **React Router 7** — client-side routing
- **SCSS Modules** — scoped styles with CSS custom properties
- **Storybook 10** — component docs (`@storybook/react-vite`)
- **Vitest + Playwright** — testing via Storybook addon
- **classnames** — conditional CSS classes

## Commands

```bash
npm run dev              # Dev server
npm run build            # tsc + vite build
npm run lint             # ESLint
npm run storybook        # Storybook on :6006
npm run build-storybook  # Static Storybook build
```

## Project Structure

```
app/
├── .storybook/          # Storybook config (main.ts, preview.ts)
├── src/
│   ├── design-system/   # Reusable UI components
│   │   ├── common/      # Heading, Tag, Icons, IconButton, ButtonLink
│   │   └── features/    # Header, Footer, Navbar, BurgerButton, CaseImage
│   ├── components/      # App-specific components
│   │   ├── About/
│   │   ├── WorkCard/
│   │   ├── WorksGrid/
│   │   └── case/        # Case study components (CaseHero, CaseLayout, etc.)
│   ├── pages/           # Route pages (HomePage, OkeyAppPage, TaxiPage, etc.)
│   ├── hooks/           # useScrollReveal
│   ├── constants/       # Route path constants
│   ├── styles/          # Global SCSS: global.scss, colors.scss, variables.scss
│   └── App.tsx          # Router setup
```

## Design System

Path alias: `@design-system` → `src/design-system` (configured in vite.config.ts and tsconfig.app.json).

### Component Structure

Each component follows the pattern:

```
ComponentName/
├── ComponentName.tsx          # Component code
├── ComponentName.module.scss  # Scoped styles
├── index.ts                   # Barrel export
└── docs/
    └── ComponentName.stories.tsx
```

Import via alias:
```tsx
import { Tag } from "@design-system/common/Tag"
import { Navbar } from "@design-system/features/Navbar"
```

Or via root barrel:
```tsx
import { Tag, Navbar } from "@design-system"
```

### Components

- **common/Heading** — polymorphic heading (h1–h6), supports `as` tag override and visual `type`
- **common/Tag** — colored label (`blue | orange | green | yellow | purple | red`), optional `href` makes it a link
- **common/Icons** — компонент Icon (`linkedin`, `telegram`, `instagram`), рендерит SVG как `<img>`
- **common/IconButton** — иконка-ссылка (`<a>` с Icon внутри), props: `icon`, `href`, `label`, `size`
- **common/ButtonLink** — pill-shaped ссылка с hover-эффектом, props: `href`, `children`, `isExternal`
- **features/Header** — hero section with title, avatar, subtitle
- **features/Footer** — copyright footer
- **features/Navbar** — fixed navbar with mobile burger menu, `isMainPage` prop toggles full/minimal links
- **features/BurgerButton** — кнопка-бургер с анимацией в X, props: `isOpen`, `onClick`
- **features/CaseImage** — `<figure>` с изображением и опциональной подписью (`caption`)

### Stories

All stories use `tags: ["autodocs"]` for auto-generated Docs pages with code snippets. First story must be `args`-based (not `render`) for clean autodocs code output.

## Styling

- **SCSS Modules**: `*.module.scss` with `@use "../../../styles/variables" as *` for breakpoints
- **CSS Variables**: defined in `colors.scss`, switched via `data-theme` attribute on `<html>`
- **Themes**: light (default) and dark, toggled by setting `document.documentElement.dataset.theme`
- **Breakpoints**: `$breakpoint-md: 991px`, `$breakpoint-sm: 767px`, `$breakpoint-xs: 479px`
- **Fonts**: ClashDisplay (display headings), DM Sans (body, from Google Fonts)

## Routing

Routes defined in `src/constants/routePathConstants.ts`. Pages: `/`, `/pulkovo`, `/okey-app`, `/okey-site`, `/ya-calls`, `/taxi`.

Case study pages use `CaseLayout` wrapper (Navbar + content + KiitosSection + Footer).

## Deployment

- **Vercel** — main app, SPA rewrites via `vercel.json`
- **GitHub Pages** — Storybook, deployed via `.github/workflows/deploy-storybook.yml` on push to `main`

## Important Notes

- **Case sensitivity**: directory names must be lowercase in git (`common/`, `features/`). macOS is case-insensitive but Linux (Vercel/CI) is not — always verify with `git ls-files`.
- **SCSS @use paths**: design-system components are 3 levels deep from `src/`, so use `@use "../../../styles/variables"`.
- **Images**: served from CDN (`cdn.prod.website-files.com`), not local assets.
