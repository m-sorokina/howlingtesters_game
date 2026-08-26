import { test } from '@fixtures';
import { assertPopupVisibility } from '@assertions';

test('Save cookies to storage stage', async ({ createPage }) => {
  await createPage.acceptCookies();

  await assertPopupVisibility(createPage.cookiesPopup.container, 'hidden');

  await createPage.page.context().storageState({ path: 'playwright/.auth/user.json' });
});
