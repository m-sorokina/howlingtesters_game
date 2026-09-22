import { test } from '@fixtures';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';
import { assertCharacterCardQuantity, assertElementVisibility, assertCharacterCard } from '@assertions';
import { getCharacterFromLocalStorageData, createRandomCharacter } from '@helpers';

test.describe('Removing a character from the list', () => {
  test.beforeEach(async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();
  });

  test('Player is able to remove all the characters from the list', async ({ createPage }) => {
    const charactersOnListAfterRemoving = 0;
    for (const [index, character] of arrayOf4Characters.entries()) {
      await createPage.characterList.getSpecifiedCharacterCard(character.name).removeButton.click();
      await assertElementVisibility(createPage.characterList.getSpecifiedCharacterCard(character.name).name, 'hidden');
      await assertCharacterCardQuantity(
        createPage.characterList.characterCards,
        arrayOf4Characters.length - (index + 1),
      );
    }
    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersOnListAfterRemoving);
  });

  test('Player is able to remove a character from the list of 4 and add the next character', async ({ createPage }) => {
    const characterToRemove = arrayOf4Characters[1]!;
    const charactersOnThePageAfterRemoving = arrayOf4Characters
      .filter((c) => c.name !== characterToRemove.name)
      .map((c) => getCharacterFromLocalStorageData(c));

    await createPage.characterList.getSpecifiedCharacterCard(characterToRemove.name).removeButton.click();

    await assertElementVisibility(
      createPage.characterList.getSpecifiedCharacterCard(characterToRemove.name).name,
      'hidden',
    );
    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersOnThePageAfterRemoving.length);
    for (const character of charactersOnThePageAfterRemoving) {
      const characterToVerify = createPage.characterList.getSpecifiedCharacterCard(character.name);
      await assertCharacterCard(character, characterToVerify);
    }

    const characterToAdd = createRandomCharacter();
    await createPage.createCharacter(characterToAdd);
    const addedCharacter = createPage.characterList.getSpecifiedCharacterCard(characterToAdd.name);

    await assertCharacterCardQuantity(
      createPage.characterList.characterCards,
      charactersOnThePageAfterRemoving.length + 1,
    );
    await assertCharacterCard(characterToAdd, addedCharacter);
  });
});
