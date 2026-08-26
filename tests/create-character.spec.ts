import { RACES, CLASSES, STAT_POINTS, MAX_CHARACTERS } from '@consts';
import { test, expect } from '@fixtures';
import { Character } from '@models';
import { distributePoints } from '@helpers';
import type { Stats } from '@types';
// import type { CharacterComponent } from '@components';
import {
  assertCharacterCardDetails,
  assertCharacterCardVisibility,
  assertCharacterCardQuantity,
  assertStatPointsToSpend,
  assertTotalDistributedPoints,
} from '@assertions';
import { content } from '@content';

const { headerTitle, headerText } = content.partyGeneral.createTeamHeader;

test.describe('Creating a character', () => {
  test('Player is able to create up to 4 characters', async ({ createPage }) => {
    const charactersToCreate: Character[] = [];

    for (let i = 0; i < MAX_CHARACTERS; i++) {
      const character = new Character(undefined, RACES[i], CLASSES[i]);
      charactersToCreate.push(character);
      await createPage.createCharacter(character);
      const createdCharacter = createPage.getSpecifiedCharacterCard(character.name);

      await assertCharacterCardQuantity(createPage.createdCharacterCards, i + 1);
      await assertCharacterCardVisibility(createdCharacter.name);
      assertCharacterCardDetails(character, await createdCharacter.getDetails());
    }
  });

  test('Player is able to distribute the points across the stats', async ({ createPage }) => {
    const pointToSpendDisplayed = createPage.createCharacterForm.pointsToSpend;
    const pointsToSpend = (stats: Stats) => {
      return STAT_POINTS - Object.values(stats).reduce((sum, value) => sum + value, 0);
    };

    const defaultStatsValues = await createPage.createCharacterForm.getStatOptionsValues();
    const pointsToSpendExpected = pointsToSpend(defaultStatsValues);

    await assertStatPointsToSpend(pointsToSpendExpected, pointToSpendDisplayed);

    const statsValuesAfterDistribution = distributePoints(pointsToSpendExpected, defaultStatsValues);

    await createPage.createCharacterForm.setStats(statsValuesAfterDistribution);
    const pointsToSpendExpectedAFterDistribution = pointsToSpend(statsValuesAfterDistribution);
    const remainPointToSpendExpected = STAT_POINTS - pointsToSpendExpectedAFterDistribution;

    await assertStatPointsToSpend(pointsToSpendExpectedAFterDistribution, pointToSpendDisplayed);
    await assertTotalDistributedPoints(remainPointToSpendExpected);
  });

  test.skip('Page text is correctly displayed before and after adding a character', async ({ createPage }) => {
    await expect(createPage.createTeamHeaderTitle).toHaveText(headerTitle);
    await expect(createPage.createTeamHeaderText).toHaveText(headerText);
    // To be continued, looking for a better approach
  });
});
