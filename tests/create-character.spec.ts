import { STAT_KEYS, RACES, CLASSES, STAT_POINTS } from '@/consts/const';
import { test, expect } from '@/fixtures/base';
import { Character } from '@/models/character.model';
import { distributePoints } from '@/helpers/distribute-points';

test.describe('Creating a character', () => {
  test(
    'Player is able to create a character with name, race, class and stats',
    { tag: '@create-character' },
    async ({ createPage }) => {
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
    },
  );

  test(
    'Player is able to see all options are visible in the create form',
    { tag: '@race-class-options' },
    async ({ createPage }) => {
      for (const race of RACES) {
        await createPage.createCharacterForm.selectRace(race);
        await expect(
          createPage.createCharacterForm.raceSelector,
          `Race option should have value ${race}`,
        ).toHaveValue(race);
      }
      for (const charClass of CLASSES) {
        await createPage.createCharacterForm.selectClass(charClass);
        await expect(
          createPage.createCharacterForm.getClass(charClass),
          `${charClass} should be selected`,
        ).toHaveClass(/selected/);
      }
    },
  );

  test(
    'Player is able to distribute the points across the stats',
    { tag: '@points-to-spend' },
    async ({ createPage }) => {
      const defaultStats = await createPage.createCharacterForm.getStatOptionsValues();
      const pointToSpend =
        STAT_POINTS - Object.entries(defaultStats).reduce((sum, [, value]) => sum + value, 0);
      await expect(
        createPage.createCharacterForm.pointsToSpend,
        `Point to spend should be equal to ${pointToSpend}`,
      ).toHaveText(String(pointToSpend));

      const distributedStats = distributePoints(pointToSpend, defaultStats);
      for (const key of STAT_KEYS) {
        await createPage.createCharacterForm.setStatsOption(key, distributedStats[key]);
      }
      const totalPoint = Object.entries(distributedStats).reduce(
        (sum, [, value]) => sum + value,
        0,
      );
      expect(totalPoint, 'All the stats points should be distributed').toEqual(STAT_POINTS);
      await expect(
        createPage.createCharacterForm.pointsToSpend,
        'Points to send should be equal to 0',
      ).toHaveText(String(STAT_POINTS - totalPoint));
    },
  );
});
