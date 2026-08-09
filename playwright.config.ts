import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { env } from '@config/env';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 10_000,
  expect: {
    timeout: 3_000,
  },
  use: {
    baseURL: env.baseURL,
    trace: 'on',
    screenshot: 'only-on-failure',
    actionTimeout: 5_000,
    navigationTimeout: 5_000,
  },
  projects: [
    {
      name: 'game',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
