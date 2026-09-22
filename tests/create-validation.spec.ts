import { test, expect } from '@fixtures';
import { content } from '@content';
import { MAX_CHARACTERS } from '@consts';
import { createRandomCharacter } from '@helpers';
import { assertErrorPopupContent, assertCharacterCard, assertCharacterCardQuantity } from '@assertions';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';

test.describe('Create Character form validation warnings', () => {
  test('Player is able to create maximum of 4 characters', async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();

    await expect(
      createPage.characterList.characterCards,
      `Expected ${MAX_CHARACTERS} characters to be created`,
    ).toHaveCount(MAX_CHARACTERS);

    const character = createRandomCharacter();
    await createPage.createCharacter(character);

    await assertErrorPopupContent(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'maxCharacters')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.characterList.characterCards, MAX_CHARACTERS);
  });

  test('Player is not able to create a character with the already existed name', async ({ createPage }) => {
    const characterName = 'Darth Vader';
    const charactersOnThePage = 1;
    const character1 = createRandomCharacter({ name: characterName });
    const character2 = createRandomCharacter({ name: characterName });
    await createPage.createCharacter(character1);
    const createdCharacter = createPage.characterList.getSpecifiedCharacterCard(characterName);

    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersOnThePage);
    await assertCharacterCard(character1, createdCharacter);

    await createPage.createCharacter(character2);

    await assertErrorPopupContent(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'duplicateName')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersOnThePage);
  });

  test('Player is not able to create a character with remain stats point to send', async ({ createPage }) => {
    const charactersOnThePage = 0;
    const character = createRandomCharacter();
    await createPage.createCharacterForm.fillCharacter(character, { addStats: false });
    await createPage.createCharacterForm.addCharacterButton.click();

    await assertErrorPopupContent(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'pointsRemaining')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersOnThePage);
  });

  test('Player is not able to create a character with empty class', async ({ createPage }) => {
    const charactersOnThePage = 0;
    const character = createRandomCharacter();
    await createPage.createCharacterForm.fillCharacter(character, { addClass: false, addStats: true });
    await createPage.createCharacterForm.addCharacterButton.click();

    await assertErrorPopupContent(
      createPage.messagePopup,
      content.errorMessages.find((e) => e.type === 'classRequired')!,
    );

    await createPage.messagePopup.closeButton.click();

    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersOnThePage);
  });
});
