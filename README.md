# SkillSwap

SkillSwap is a responsive web application for exchanging skills. Users can browse offers, filter specialists, create skill requests, save favourites, and manage a personal profile.

The project demonstrates a feature-oriented React architecture, typed state management, form validation, and an autonomous demo mode suitable for static hosting.

## Demo

The Vercel deployment URL will be added here after publication.

## Features

- Browse skill cards and open a detailed skill page.
- Filter offers by learning mode, city, category, and subcategory.
- Search skills by title, description, or category.
- Register in three steps with client-side validation.
- Choose a city from the complete user directory with search and clear empty, loading, and error states.
- Sign in, register, and manage a profile in the browser-only demo mode.
- Save favourites and work with exchange requests locally.
- Open protected routes only when authenticated.
- Switch between the light and dark themes.

## Tech Stack

- React 19 and TypeScript
- Vite
- Redux Toolkit and React Redux
- React Router
- React Hook Form and Yup
- SCSS modules
- Vitest and Testing Library
- Storybook

## Architecture

The source is organised by responsibility:

```text
src/
├── api/         # Local data access, demo session, and transformations
├── app/         # Application bootstrap and routing
├── entities/    # Domain types
├── features/    # User-facing business flows
├── pages/       # Route-level screens
├── services/    # Redux store, slices, actions, and middleware
├── shared/      # Reusable UI, utilities, hooks, and layouts
├── styles/      # Global styles, tokens, themes, and fonts
└── widgets/     # Larger composed interface blocks
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Skill catalogue |
| `/skill/:id` | Skill details |
| `/about` | About the service |
| `/login` | Sign in |
| `/register` | Registration step 1 |
| `/register/step-2` | Registration profile details |
| `/register/step-3` | Registration confirmation |
| `/profile` | Protected profile overview |
| `/profile/requests` | Protected exchange requests |
| `/profile/exchanges` | Protected exchanges |
| `/profile/favorites` | Protected favourites |
| `/profile/skills` | Protected skills management |
| `/create` | Protected skill creation |

## Local Development

Requirements: Node.js 20 or later and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### Demo Data

The catalogue, cities, categories, and skill cards are stored in
`public/db/skillswap-data.json`. This snapshot makes the public demo independent
from the legacy HTTP API. Demo registration, login, and profile changes are kept
in the browser's local storage and are not sent to a server.

## Quality Checks

```bash
npm run lint
npm run build
npm run test:run
```

## Deploy To Vercel

1. Import the repository in Vercel.
2. Select the Vite framework preset.
3. Keep the default build command: `npm run build`.
4. Keep the default output directory: `dist`.
5. Deploy.

`vercel.json` preserves client-side routing, so direct links such as `/profile` resolve to the application instead of a 404 page.

## Deploy To GitHub Pages

1. In the repository settings, open **Pages** and select **GitHub Actions** as the source.
2. Push to `main`.
3. The included workflow builds and publishes the `dist` folder automatically.

The workflow also provides the SPA fallback needed for direct links to application routes.

## Development Notes

- Put domain types in `entities`.
- Keep user actions and related UI in `features`.
- Compose larger interface blocks in `widgets`.
- Keep route-level composition in `pages`.
- Reuse generic elements from `shared` rather than duplicating them.
- Run linting, the production build, and tests before opening a pull request.
