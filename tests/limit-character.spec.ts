import { test, expect } from '@fixtures';
import { Character } from '@models';
import { content } from '@content';
import { MAX_CHARACTERS } from '@consts';
import { assertPopupVisibility, assertPopup } from '@assertions';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';

test.describe('Character limit', () => {
  test('Player is able to create maximum of 4 characters', async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();

    await expect(createPage.createdCharacterCards, `Expected ${MAX_CHARACTERS} characters to be created`).toHaveCount(
      MAX_CHARACTERS,
    );

    const character = new Character();
    await createPage.createCharacterForm.fillCharacter(character);
    await createPage.createCharacterForm.addCharacterButton.click();
    await assertPopupVisibility(createPage.messagePopup.container);

    await assertPopup(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'maxCharacters')!,
    );
  });
});
