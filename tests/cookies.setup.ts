import { test } from '@fixtures';
import { assertElementVisibility } from '@assertions';

test('Save cookies to storage state', async ({ createPage }) => {
  await createPage.acceptCookies();

  await assertElementVisibility(createPage.cookiesPopup.container, 'hidden');

  await createPage.page.context().storageState({ path: 'playwright/.auth/user.json' });
});
