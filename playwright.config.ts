import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,

  use: {
    // When BASE_URL is set (preview deployment), target it directly.
    // Fall back to localhost so the same config works in local development.
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // Only boot a local dev server when we're NOT testing a preview deployment.
  ...(process.env.BASE_URL
    ? {}
    : {
        webServer: {
          command: 'npm run dev',
          port: 3000,
          reuseExistingServer: !process.env.CI,
        },
      }),

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
