# SkillSwap

SkillSwap is a responsive web application for exchanging skills. Users can browse offers, filter specialists, create skill requests, save favourites, and manage a personal profile.

The project demonstrates a feature-oriented React architecture, typed state management, form validation, and an API integration adapted for a production static deployment.

## Demo

The Vercel deployment URL will be added here after publication.

## Features

- Browse skill cards and open a detailed skill page.
- Filter offers by learning mode, city, category, and subcategory.
- Search skills by title, description, or category.
- Register in three steps with client-side validation.
- Choose a city from the complete user directory with search and clear empty, loading, and error states.
- Sign in, manage a profile, create skills, save favourites, and work with exchange requests.
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
├── api/         # API clients and data transformations
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
cp .env.example .env
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### Environment Variables

```dotenv
VITE_SKILLSWAP_API_URL=/api/
```

The application uses a relative API path. Vite proxies it to the legacy API during local development, and Vercel uses the same proxy rule in production. This keeps browsers on HTTPS and avoids mixed-content errors.

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
5. Add `VITE_SKILLSWAP_API_URL=/api/` for Production and Preview.
6. Deploy.

`vercel.json` contains rewrites for the API, media assets, and client-side routing. As a result, direct links such as `/profile` resolve to the application instead of a 404 page.

## Development Notes

- Put domain types in `entities`.
- Keep user actions and related UI in `features`.
- Compose larger interface blocks in `widgets`.
- Keep route-level composition in `pages`.
- Reuse generic elements from `shared` rather than duplicating them.
- Run linting, the production build, and tests before opening a pull request.
