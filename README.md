# SkillSwap: Standalone Portfolio Demo

**Live Demo:** https://repindm.github.io/SkillSwap-static-demo/

**Original Team Repository:** https://github.com/RepinDM/SkillSwap_47_7

SkillSwap is a responsive web application for exchanging practical knowledge and
skills. It helps people find someone who can teach them a useful skill while
also showing what they are ready to share in return.

This repository contains a standalone portfolio edition of the project. It is
designed to run reliably without a backend service, which makes it suitable for
public hosting on Vercel and GitHub Pages.

## The Problem

Learning often requires paid courses or scattered communities where it is hard
to find a suitable partner. SkillSwap addresses this by bringing people together
around a simple exchange model: a user can offer one skill, request another,
and discover relevant people through filters and search.

## What Was Implemented

- A searchable catalogue of skill cards with filters by learning mode, city,
  category, and subcategory.
- Skill detail pages and an exchange-request flow.
- Three-step registration with client-side validation.
- Demo sign-in and protected personal-area routes.
- Personal profile editing and local profile deletion.
- Favourites and likes stored together in the browser for a consistent demo flow.
- Local exchange-request statuses and notifications that can be marked as read.
- Light and dark themes with responsive layouts.
- A curated local dataset for skill cards, categories, and profiles.
- SPA routing for Vercel and an automated GitHub Pages deployment workflow.

## Standalone Demo Mode

The original project depended on a legacy HTTP API. That approach is not
reliable for a public HTTPS deployment because browser security policies can
block insecure external requests.

For this portfolio edition, catalogue data is loaded from
[`public/db/skillswap-data.json`](public/db/skillswap-data.json). Registration,
sign-in, profile changes, and skill editing are stored in the current browser's
`localStorage`. New or edited skills are immediately shown in the catalogue and
remain available after a page refresh. No personal data is sent to an external
server.

For predictable local storage use, uploaded images are limited to 2 MB each.

Use **Delete Profile** in the personal area to clear the current demo account,
its skills, likes, favourites, notifications, and exchange requests without modifying the shared
dataset.

## Contributors

- **SkillSwap project team** - initial product concept, UX/UI implementation,
  React application architecture, catalogue, forms, profile flows, and shared
  interface components.
- **Dmitry Repin** - portfolio release preparation, codebase audit, build and
  test fixes, transition to standalone demo data, dataset cleanup, deployment
  setup, and documentation.

## Technical Challenges Solved

- Resolved TypeScript errors that previously blocked the production build.
- Replaced dependency on an HTTP-only legacy API with local demo data to make
  the application deployable on secure static hosting.
- Added SPA fallbacks so direct links to routes such as `/profile` work after
  deployment.
- Cleaned test records from the demo dataset to keep the catalogue presentable.
- Added a resettable local profile experience for safe portfolio demonstrations.

## Portfolio Release Improvements

This release focuses on making the project reliable, presentable, and easy to
review without access to the original backend.

- Audited the build, linting configuration, and automated tests; corrected
  TypeScript issues that prevented a production build.
- Migrated the public demo to a curated JSON dataset and bundled local media,
  so cards and profile images load consistently on GitHub Pages.
- Added browser persistence for the demo account, profile changes, created
  skills, likes, favourites, requests, exchanges, and notifications.
- Kept the familiar interaction model: liking a card also adds it to
  favourites, while removing the like removes it from favourites.
- Made exchange requests actionable in demo mode: a request can be cancelled
  or confirmed, then appears in the exchanges section with a notification.
- Reworked the notifications interface to use real application state, with
  read and clear actions instead of static placeholder content.
- Added a functional skill-creation page and validation for uploaded images,
  including a 2 MB size limit for reliable browser storage.
- Improved small-screen layouts for the header, search, filters, catalogue,
  and personal-area screens to avoid horizontal scrolling.
- Removed obsolete footer links, added direct-route fallbacks, and configured
  automated GitHub Pages deployment for a smoother portfolio review.

## Future Improvements

- Restore a production API with HTTPS, authentication, and persistent storage.
- Add real-time messaging and notifications for exchange requests.
- Add image optimisation and a managed media storage service.
- Expand test coverage with end-to-end scenarios and accessibility checks.
- Add user reporting, moderation, and content-management tools.
- Add analytics to understand popular skills, searches, and successful exchanges.

## Tech Stack

- React 19 and TypeScript
- Vite
- Redux Toolkit and React Redux
- React Router
- React Hook Form and Yup
- SCSS Modules
- Vitest, Testing Library, and Storybook
- GitHub Actions for GitHub Pages deployment

## Architecture

The source is organised by responsibility:

```text
src/
├── api/         # local data access, demo session, and data transformations
├── app/         # application bootstrap and routing
├── entities/    # domain types
├── features/    # user-facing business flows
├── pages/       # route-level screens
├── services/    # Redux store, slices, actions, and middleware
├── shared/      # reusable UI, utilities, hooks, layouts, and styles
└── widgets/     # larger composed interface blocks
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Skill catalogue |
| `/skill/:id` | Skill details |
| `/about` | About the service |
| `/login` | Demo sign-in |
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

### Requirements

- Node.js 20 or later
- npm

### Install and Run

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Quality Checks

```bash
npm run lint
npm run build
npm run test:run
```

At the time this portfolio edition was prepared, linting, the production build,
and all 45 tests passed successfully.

## Deployment

### Vercel

1. Import the repository in Vercel.
2. Select the `Vite` framework preset.
3. Keep `npm run build` as the build command.
4. Keep `dist` as the output directory.
5. Deploy.

`vercel.json` provides the SPA fallback required for direct route access.

### GitHub Pages

1. Open the repository **Settings**.
2. Go to **Pages** and choose **GitHub Actions** as the source.
3. Push to `main`.

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys the
application automatically, including an SPA fallback for direct route access.
