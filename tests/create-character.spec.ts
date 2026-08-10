import { STAT_KEYS, RACES, CLASSES, STAT_POINTS, MAX_CHARACTERS } from '@consts/const';
import { test, expect } from '@fixtures/base';
import { Character } from '@models';
import { distributePoints } from '@helpers/distribute-points';
import type { CharacterComponent } from '@components';
import textAssertions from '@data/textAssertions.json';

const { createTeamPage } = textAssertions;
const { headerTitle, headerText } = createTeamPage.createTeamHeader;

test.describe('Creating a character', () => {
  async function assertCreatedCharacter(characterToCreate: Character, createdCharacter: CharacterComponent) {
    await expect(createdCharacter.name, 'Created character name should match').toHaveText(characterToCreate.name);
    await expect(createdCharacter.race, 'Created character race should match').toHaveText(
      `Race: ${characterToCreate.race}`,
    );
    await expect(createdCharacter.charClass, 'Created character class should match').toHaveText(
      `Class: ${characterToCreate.charClass}`,
    );
    await expect(createdCharacter.stats, `Created character should have ${STAT_KEYS.length} stats`).toHaveCount(
      STAT_KEYS.length,
    );
    for (const [index, key] of STAT_KEYS.entries()) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      await expect(createdCharacter.stats.nth(index), 'Created character stats should match').toHaveText([
        `${label}: ${characterToCreate.stats[key]}`,
      ]);
    }
  }

  test(
    'Player is able to create a character with name, race, class and stats',
    { tag: '@create-character' },
    async ({ createPage }) => {
      const character = new Character();

      const createdCharacter = await createPage.createCharacter(character);

      await expect(
        createPage.getSpecifiedCharacterCard(character.name).name,
        'Created character cards should be visible',
      ).toBeVisible();

      await expect(createPage.createdCharacterCards, 'There should be exactly one created character card').toHaveCount(
        1,
      );

      await assertCreatedCharacter(character, createdCharacter);
    },
  );

  test(
    'Player is able to see all options are visible in the create form',
    { tag: '@race-class-options' },
    async ({ createPage }) => {
      for (const race of RACES) {
        await createPage.createCharacterForm.selectRace(race);
        await expect(createPage.createCharacterForm.raceSelector, `Race option should have value ${race}`).toHaveValue(
          race,
        );
      }

      for (const charClass of CLASSES) {
        await createPage.createCharacterForm.selectClass(charClass);
        await expect(createPage.createCharacterForm.getClass(charClass), `${charClass} should be selected`).toHaveClass(
          /selected/,
        );
      }
    },
  );

  test(
    'Player is able to distribute the points across the stats',
    { tag: '@points-to-spend' },
    async ({ createPage }) => {
      const defaultStats = await createPage.createCharacterForm.getStatOptionsValues();
      let pointToSpend = STAT_POINTS - Object.entries(defaultStats).reduce((sum, [, value]) => sum + value, 0);
      await expect(
        createPage.createCharacterForm.pointsToSpend,
        `Point to spend should be equal to ${pointToSpend}`,
      ).toHaveText(String(pointToSpend));

      const distributedStats = distributePoints(pointToSpend, defaultStats);
      await createPage.createCharacterForm.setStats(distributedStats);
      const totalPoint = Object.entries(distributedStats).reduce((sum, [, value]) => sum + value, 0);
      pointToSpend = totalPoint - STAT_POINTS;

      expect(totalPoint, 'All the stats points should be distributed').toEqual(STAT_POINTS);
      await expect(
        createPage.createCharacterForm.pointsToSpend,
        `Points to send should be equal to ${pointToSpend}`,
      ).toHaveText(String(pointToSpend));
    },
  );

  test('Player is able to create up to 4 characters', { tag: '@4-characters' }, async ({ createPage }) => {
    const charactersToCreate: Character[] = [];
    const createdCharacters: CharacterComponent[] = [];

    for (let i = 0; i < MAX_CHARACTERS; i++) {
      const character = new Character(RACES[i], CLASSES[i]);
      charactersToCreate.push(character);
      const createdCharacter = await createPage.createCharacter(character);
      createdCharacters.push(createdCharacter);
    }

    await expect(
      createPage.createdCharacterCards,
      `There should be exactly ${MAX_CHARACTERS} created character cards`,
    ).toHaveCount(MAX_CHARACTERS);

    for (let i = 0; i < createdCharacters.length; i++) {
      await assertCreatedCharacter(charactersToCreate[i]!, createdCharacters[i]!);
    }
  });

  test(
    'Page text is correctly displayed before and after adding a character',
    { tag: '@page-render' },
    async ({ createPage }) => {
      await expect(createPage.createTeamHeaderTitle).toHaveText(headerTitle);
      await expect(createPage.createTeamHeaderText).toHaveText(headerText);
      // To be continued, looking for a better approach
    },
  );
});
