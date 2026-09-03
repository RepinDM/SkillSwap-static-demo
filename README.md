# SkillSwap: Standalone Portfolio Demo

SkillSwap is a web application for exchanging knowledge and practical skills.
Users can find someone ready to share their expertise, describe what they want
to learn, save favourites, and manage a personal profile.

This portfolio edition is fully independent of an external API. It runs
reliably locally, on Vercel, and on GitHub Pages.

## Live Demo

The live GitHub Pages URL will be added after the deployment workflow completes.

## Highlights

- Browse skill cards with search and filters by city, category, and subcategory.
- Open a skill details page and create an exchange request.
- Save favourites and likes in the browser.
- Complete a three-step registration flow with client-side validation.
- Sign in to a demo account and explore protected profile sections.
- Edit or delete a demo profile.
- Use light and dark themes on desktop and mobile layouts.

## Tech Stack

- React 19, TypeScript, and Vite
- Redux Toolkit and React Redux
- React Router
- React Hook Form and Yup
- SCSS Modules
- Vitest, Testing Library, and Storybook

## Standalone Demo Mode

The catalogue, cities, categories, and skill cards are loaded from a curated
local snapshot at [`public/db/skillswap-data.json`](public/db/skillswap-data.json).
Test records were removed to keep the portfolio content consistent.

Registration, sign-in, favourites, exchange requests, and profile changes are
stored in the current browser's `localStorage`. No personal data is sent to an
external server. Use **Delete Profile** in the profile settings to reset the
current demo account and its local data.

## Project Contributions

### Team Work

- Designed and implemented the skill-exchange experience, catalogue, cards,
  routing, forms, and application state.
- Chose a React architecture with a typed Redux layer, modular styles, and
  reusable UI components.
- Built key user journeys: registration, profile management, favourites,
  skills, and exchange requests.

### Portfolio Finalization

- Audited the build, TypeScript checks, and tests; resolved deployment-blocking issues.
- Fixed the city-selection flow by deriving cities from the shared user dataset.
- Replaced the legacy HTTP integration with a local snapshot to avoid
  mixed-content errors and external API instability.
- Removed test cards and skills, and added local demo-profile deletion.
- Configured SPA routing for Vercel and automatic deployment to GitHub Pages.
- Reworked this README for recruiters and developers reviewing the project.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Install and Run

```bash
npm ci
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Quality Checks

```bash
npm run lint
npm run build
npm run test:run
```

At the time this portfolio edition was prepared, linting, the production build,
and all 39 tests passed successfully.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Skill catalogue |
| `/skill/:id` | Skill details |
| `/login` | Demo sign-in |
| `/register` | Registration |
| `/profile` | Personal dashboard |
| `/profile/favorites` | Favourites |
| `/create` | Create a skill |

## Project Structure

```text
src/
├── api/         # local data access, demo session, and transformations
├── app/         # application bootstrap and routing
├── entities/    # domain types
├── features/    # user-facing flows
├── pages/       # route-level pages
├── services/    # Redux store, slices, and actions
├── shared/      # shared components, utilities, and styles
└── widgets/     # larger composed interface blocks
```

## Deployment

### Vercel

Select the `Vite` preset, keep `npm run build` as the build command, and use
`dist` as the output directory. `vercel.json` keeps client-side routes working
when opened directly.

### GitHub Pages

In the repository settings, open **Pages** and choose **GitHub Actions** as the
source. The workflow in `.github/workflows/deploy-pages.yml` builds and deploys
the application after every push to `main`, including an SPA fallback for direct
links to application routes.
