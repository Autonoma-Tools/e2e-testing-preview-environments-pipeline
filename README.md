# How to Run E2E Tests on Preview Environments

Companion code for the Autonoma blog post [How to Run E2E Tests on Preview Environments (And Why It Changes Everything)](https://getautonoma.com/blog/e2e-testing-preview-environments-pipeline).

This repo contains three files you can copy into any project to run Playwright E2E tests against Vercel (or Netlify) preview deployments, with results posted back to the PR as a comment:

1. **`playwright.config.ts`** -- A Playwright config with a dynamic `baseURL` that reads `BASE_URL` from the environment. When `BASE_URL` is set (by CI, pointing at a preview URL), the tests hit that URL directly. When it is not set, the config spins up a local dev server on port 3000 so the same test suite works in local development without any code changes.

2. **`e2e/smoke.spec.ts`** -- A minimal smoke test that navigates to `/` and asserts the page has a title. It exists to prove the config wiring works; replace it with your real specs.

3. **`.github/workflows/e2e-preview.yml`** -- A GitHub Actions workflow triggered by `deployment_status` events. When Vercel (or any provider that fires deployment statuses) marks a deployment as successful, the workflow installs deps, installs Chromium, runs the Playwright suite against the preview URL, uploads the HTML report as an artifact, and posts a pass/fail summary comment on the PR.

> Companion code for the Autonoma blog post: **[How to Run E2E Tests on Preview Environments](https://getautonoma.com/blog/e2e-testing-preview-environments-pipeline)**

## Requirements

- Node.js 20+
- npm 9+

## Quickstart

```bash
# Clone and install
git clone https://github.com/Autonoma-Tools/e2e-testing-preview-environments-pipeline.git
cd e2e-testing-preview-environments-pipeline
npm install

# Install the Chromium browser binary
npx playwright install chromium

# Run tests locally (uses localhost:3000 by default)
# Note: the dev script is a placeholder -- replace it with your app's dev command
npx playwright test

# Run tests against a preview deployment
BASE_URL=https://my-app-abc123.vercel.app npx playwright test

# Or use the helper script
./examples/run-against-preview.sh https://my-app-abc123.vercel.app
```

## Project structure

```
.
├── .github/
│   └── workflows/
│       └── e2e-preview.yml      # GitHub Actions workflow
├── e2e/
│   └── smoke.spec.ts            # Minimal smoke test
├── examples/
│   └── run-against-preview.sh   # Helper script for preview runs
├── playwright.config.ts         # Playwright config (dynamic baseURL)
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

**Note:** The GitHub Actions workflow (`.github/workflows/e2e-preview.yml`) triggers on `deployment_status` events. It will only run when copied into a repository that has a deployment provider (Vercel, Netlify, etc.) configured to fire deployment status webhooks. The workflow does nothing in this standalone repo -- it is meant to be copied into your project.

## About

This repository is maintained by [Autonoma](https://getautonoma.com) as reference material for the linked blog post. Autonoma builds autonomous AI agents that plan, execute, and maintain end-to-end tests directly from your codebase.

If something here is wrong, out of date, or unclear, please [open an issue](https://github.com/Autonoma-Tools/e2e-testing-preview-environments-pipeline/issues/new).

## License

Released under the [MIT License](./LICENSE) © 2026 Autonoma Labs.
