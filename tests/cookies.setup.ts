import { test, expect } from '@fixtures';

test('Save cookies to storage stage', async ({ createPage }) => {
  await createPage.acceptCookies();

  await expect(createPage.cookiesPopup.container).toBeHidden();

  await createPage.page.context().storageState({ path: 'playwright/.auth/user.json' });
});
