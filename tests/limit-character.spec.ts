import { test, expect } from '@fixtures/base';
import { Character } from '@models';
import textAssertions from '@data/textAssertions.json';
import { MAX_CHARACTERS } from '@consts/const';

const { maxCharacters } = textAssertions.createTeamPage.createCharacterForm.errorMessages;

test.describe('Character limit', () => {
  test.use({ storageState: 'data/characters.json' });

  test(
    'Player is able to create maximum of 4 characters',
    { tag: '@character-limit' },
    async ({ createPage }) => {
      await expect(
        createPage.createdCharacterCards,
        `Expected ${MAX_CHARACTERS} characters to be created`,
      ).toHaveCount(MAX_CHARACTERS);

      const character = new Character();
      await createPage.createCharacterForm.enterCharacterName(character.name);
      await createPage.createCharacterForm.selectRace(character.race);
      await createPage.createCharacterForm.selectClass(character.charClass);
      await createPage.createCharacterForm.setStats(character.stats);
      await Promise.all([
        createPage.createCharacterForm.addCharacterButton.click(),
        createPage.messagePopup.waitFor({ state: 'visible' }),
      ]);
      await expect(
        createPage.messagePopup.title,
        `Expected message popup title to be ${maxCharacters.title}`,
      ).toHaveText(maxCharacters.title);
      await expect(
        createPage.messagePopup.message,
        `Expected message popup message to be ${maxCharacters.message}`,
      ).toHaveText(maxCharacters.message);
      await expect(
        createPage.messagePopup.closeButton,
        `Expected message popup close button to be ${maxCharacters.button}`,
      ).toHaveText(maxCharacters.button);
    },
  );
});
