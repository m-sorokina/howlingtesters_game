import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { env } from '@config';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 0 : 0,
  workers: process.env.CI ? 3 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 15_000,
  expect: {
    timeout: 3_000,
  },
  use: {
    baseURL: env.baseURL,
    trace: 'on',
    screenshot: 'only-on-failure',
    actionTimeout: 6_000,
    navigationTimeout: 6_000,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'game',
      use: { ...devices['Desktop Chrome'], storageState: './playwright/.auth/user.json' },
      dependencies: ['setup'],
    },
  ],
});
