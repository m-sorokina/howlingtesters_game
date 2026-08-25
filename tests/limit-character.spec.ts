import { test, expect } from '@fixtures';
import { Character } from '@models';
import { content } from '@content';
import { MAX_CHARACTERS } from '@consts';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';

const { title, message, button } = content.errorMessages.maxCharacters;

test.describe('Character limit', () => {
  test('Player is able to create maximum of 4 characters', { tag: '@character-limit' }, async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();

    await expect(createPage.createdCharacterCards, `Expected ${MAX_CHARACTERS} characters to be created`).toHaveCount(
      MAX_CHARACTERS,
    );

    const character = new Character();
    await createPage.createCharacterForm.fillCharacter(character);
    await createPage.createCharacterForm.addCharacterButton.click();
    await expect(createPage.messagePopup.locator).toBeVisible();

    await expect(createPage.messagePopup.title, `Expected message popup title to be ${title}`).toHaveText(title);
    await expect(createPage.messagePopup.message, `Expected message popup message to be ${message}`).toHaveText(
      content.errorMessages.maxCharacters.message,
    );
    await expect(createPage.messagePopup.closeButton, `Expected message popup close button to be ${button}`).toHaveText(
      button,
    );
  });
});
