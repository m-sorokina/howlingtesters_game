import { STAT_KEYS } from '@/consts/const';
import { test, expect } from '@/fixtures/base';
import { Character } from '@/models/character.model';

test.describe('Creating a character', () => {
  test('Player is able to create a character with name, race, class and stats, {tag: create}', async ({
    createPage,
  }) => {
    const character = new Character('Human', 'Mage');

    const createdCharacter = await createPage.createCharacter(character);

    await expect(
      createPage.createdCharacterCards,
      'Created character cards should be visible',
    ).toBeVisible();
    await expect(
      createPage.createdCharacterCards,
      'There should be exactly one created character card',
    ).toHaveCount(1);
    await expect(createdCharacter.name, 'Created character name should match').toHaveText(
      character.name,
    );
    await expect(createdCharacter.race, 'Created character race should match').toHaveText(
      `Race: ${character.race}`,
    );
    await expect(createdCharacter.charClass, 'Created character class should match').toHaveText(
      `Class: ${character.charClass}`,
    );
    await expect(createdCharacter.stats, 'Created character should have 4 stats').toHaveCount(4);
    for (const [index, key] of STAT_KEYS.entries()) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      await expect(
        createdCharacter.stats.nth(index),
        'Created character stats should match',
      ).toHaveText([`${label}: ${character.stats[key]}`]);
    }
  });
});
