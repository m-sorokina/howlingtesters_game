import { test, expect } from '@/fixtures/base';

test('homepage has a title, {tag: @smoke}', async ({ createPage }) => {
  await createPage.goto();

  await expect(createPage.createTeamHeaderTitle).toHaveText('Create your team');
  await expect(createPage.createTeamHeaderText).toHaveText(
    'Choose names, races and classes to create your legendary party of four.',
  );
});
