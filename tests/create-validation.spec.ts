import { test, expect } from '@fixtures';
import { Character } from '@models';
import { content } from '@content';
import { MAX_CHARACTERS } from '@consts';
import {
  assertPopup,
  assertCharacterCardDetails,
  assertCharacterCardQuantity,
  assertElementVisibility,
} from '@assertions';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';

test.describe('Create Character form validation warnings', () => {
  test('Player is able to create maximum of 4 characters', async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();

    await expect(createPage.createdCharacterCards, `Expected ${MAX_CHARACTERS} characters to be created`).toHaveCount(
      MAX_CHARACTERS,
    );

    const character = new Character();
    await createPage.createCharacter(character);
    await assertElementVisibility(createPage.messagePopup.container);

    await assertPopup(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'maxCharacters')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.createdCharacterCards, MAX_CHARACTERS);
  });

  test('Player is not able to create a character with the already existed name', async ({ createPage }) => {
    const characterName = 'Darth Vader';
    const character1 = new Character(characterName);
    const character2 = new Character(characterName);
    await createPage.createCharacter(character1);
    const createdCharacter = createPage.getSpecifiedCharacterCard(characterName);

    await assertCharacterCardQuantity(createPage.createdCharacterCards, 1);
    await assertElementVisibility(createdCharacter.name);
    assertCharacterCardDetails(character1, await createdCharacter.getDetails());

    await createPage.createCharacter(character2);

    await assertElementVisibility(createPage.messagePopup.container);
    await assertPopup(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'duplicateName')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.createdCharacterCards, 1);
  });

  test('Player is not able to create a character with remain stats point to send', async ({ createPage }) => {
    const character = new Character();
    await createPage.createCharacterForm.fillCharacter(character, { addStats: false });
    await createPage.createCharacterForm.addCharacterButton.click();

    await assertElementVisibility(createPage.messagePopup.container);
    await assertPopup(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'pointsRemaining')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.createdCharacterCards, 0);
  });

  test('Player is not able to create a character with empty class', async ({ createPage }) => {
    const character = new Character();
    await createPage.createCharacterForm.fillCharacter(character, { addClass: false, addStats: true });
    await createPage.createCharacterForm.addCharacterButton.click();

    await assertElementVisibility(createPage.messagePopup.container);
    await assertPopup(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'classRequired')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.createdCharacterCards, 0);
  });
});
