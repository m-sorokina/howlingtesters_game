import { test, expect } from '../src/fixtures/base';

test('homepage has a title', async ({ page, basePage }) => {
  await basePage.goto('/');
  await expect(page).toHaveTitle(/.+/);
});
