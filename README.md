# Howling Testers Game — Playwright Framework

A small Playwright + TypeScript test automation framework, built for studying test automation practices (Page Object Model, fixtures, path aliases, linting/formatting, git hooks). It tests [Howling Testers' Character Creator](https://howlingtesters.pl), a game where players build a party of up to 4 characters.

## Stack

- [Playwright Test](https://playwright.dev/) + TypeScript
- ESLint (flat config) + `eslint-plugin-playwright` + Prettier
- Husky + lint-staged (pre-commit lint/format)
- [@faker-js/faker](https://fakerjs.dev/) for test data generation

## Getting started

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

Fill in `.env`:

| Variable   | Description                    |
| ---------- | ------------------------------ |
| `BASE_URL` | Base URL of the app under test |

## Running tests

```bash
npm test              # run all tests
npm run test:headed   # run with a visible browser
npm run test:ui       # Playwright UI mode
npm run test:debug    # debug mode
npm run report        # open the last HTML report
```

Run a subset by tag (tests are tagged with `{ tag: '@...' }`):

```bash
npx playwright test --grep @create-character
```

## Project structure

```
tests/                  # spec files
src/
  pages/                # page objects (extend BasePage)
  components/            # reusable UI components (extend BaseComponent)
  fixtures/              # custom Playwright fixtures (e.g. createPage)
  models/                # test data models (e.g. Character, built with faker)
  consts/                # shared constants and routes
  config/                # typed env config (src/config/env.ts)
  types/                 # shared TypeScript types
data/                    # static JSON test data & fixtures (e.g. localStorage snapshots)
playwright/.auth/        # captured storage state for pre-seeded sessions (gitignored)
docs/                    # user stories the tests are based on
```

### Path aliases

Configured in `tsconfig.json`, one per `src/` folder:

`@pages`, `@components`, `@fixtures/*`, `@models`, `@helpers/*`, `@consts/*`, `@config/*`, `@types`, plus `@data/*` for the root `data/` folder.

## Code quality

```bash
npm run lint         # eslint .
npm run lint:fix
npm run format       # prettier --write .
npm run format:check
npm run typecheck    # tsc --noEmit
```

A pre-commit hook (Husky + lint-staged) auto-fixes and formats staged files before every commit.

## Docs

User stories the test suite is derived from live in [`docs/user-stories.md`](docs/user-stories.md).
