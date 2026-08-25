import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { env } from '@config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 10_000,
  expect: {
    timeout: 3_000,
  },
  use: {
    baseURL: env.baseURL,
    storageState: './playwright/.auth/user.json',
    trace: 'on',
    screenshot: 'only-on-failure',
    actionTimeout: 6_000,
    navigationTimeout: 6_000,
  },
  projects: [
    {
      name: 'game',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
