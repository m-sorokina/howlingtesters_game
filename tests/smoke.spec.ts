import { test, expect } from '@/fixtures/base';
import textAssertions from '@data/textAssertions.json';

const { createTeamPage } = textAssertions;
const { headerTitle, headerText } = createTeamPage.createTeamHeader;

test('Start page is available', { tag: '@smoke' }, async ({ createPage }) => {
  await expect(createPage.createTeamHeaderTitle).toHaveText(headerTitle);
  await expect(createPage.createTeamHeaderText).toHaveText(headerText);
});
