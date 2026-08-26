import { test, expect } from '@fixtures';
import { STAT_KEYS } from '@consts';
import { Character } from '@models';
import arrayOf3Characters from '@data/preseed-party-3-characters.json';

test.describe('Displaying the character list', () => {
  test.beforeEach(async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf3Characters));
    await createPage.page.reload();
  });

  test('Player see the list of created characters', async ({ createPage }) => {
    const qtyOfCharacters = arrayOf3Characters.length;

    await expect(createPage.createdCharactersList, 'Created characters list should be visible').toBeVisible();

    for (const { name } of arrayOf3Characters) {
      await expect(
        createPage.getSpecifiedCharacterCard(name).name,
        `Card for ${name} character should be visible`,
      ).toBeVisible();
    }

    await expect(
      createPage.createdCharacterCards,
      `There should be exactly ${qtyOfCharacters} character cards`,
    ).toHaveCount(qtyOfCharacters);
  });

  test('Player is able to see character details', async ({ createPage }) => {
    for (const { name } of arrayOf3Characters) {
      await expect(
        createPage.getSpecifiedCharacterCard(name).name,
        `${name} character should be visible on card`,
      ).toBeVisible();
      await expect(
        createPage.getSpecifiedCharacterCard(name).race,
        `${name} character race should be visible on card`,
      ).toBeVisible();
      await expect(
        createPage.getSpecifiedCharacterCard(name).charClass,
        `${name} character class should be visible on card`,
      ).toBeVisible();
      for (const key of STAT_KEYS) {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        await expect(
          createPage.getSpecifiedCharacterCard(name).stats.filter({ hasText: new RegExp(`^${label}: \\d+$`) }),
          `${name} character stat details ${label} should be visible on card`,
        ).toBeVisible();
      }
    }
  });

  test('Card list is updated after creating a new character', async ({ createPage }) => {
    const newCharacter = new Character();

    await createPage.createCharacter(newCharacter);

    await expect(
      createPage.getSpecifiedCharacterCard(newCharacter.name).name,
      'Recently created character card should be visible',
    ).toBeVisible();

    await expect(
      createPage.createdCharacterCards,
      `There should be exactly ${arrayOf3Characters.length + 1} character cards`,
    ).toHaveCount(arrayOf3Characters.length + 1);
  });
});
