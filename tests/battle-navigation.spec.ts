import { test } from '@fixtures';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';
import {
  assertCharacterCard,
  assertCharacterCardQuantity,
  assertElementVisibility,
  assertDragonHasNoStats,
} from '@assertions';
import { BattlePage } from '@pages';
import { getCharacterFromLocalStorageData, withRaceBonus } from '@helpers';

test.describe('Battle navigation', () => {
  test.beforeEach(async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();
  });

  test('Player is able to navigate to the battle page', async ({ createPage, page }) => {
    const charactersCreated = arrayOf4Characters.map(getCharacterFromLocalStorageData).map(withRaceBonus);
    const battlePage = new BattlePage(page);
    await createPage.goToBattleButton.click();
    await assertElementVisibility(battlePage.battleTeam.container);
    await assertElementVisibility(battlePage.drawOpponentButton);
    await assertCharacterCardQuantity(battlePage.battleTeam.characterCards, arrayOf4Characters.length);
    for (const character of charactersCreated) {
      await assertCharacterCard(character, battlePage.battleTeam.getSpecifiedCharacterCard(character.name));
    }
  });

  test('Player is returned to the creator with the originally created characters', async ({ createPage, page }) => {
    const charactersCreated = arrayOf4Characters.map(getCharacterFromLocalStorageData);
    const battlePage = new BattlePage(page);

    await createPage.goToBattleButton.click();
    await battlePage.drawOpponentButton.click();
    await battlePage.fightWithoutMusicButton.click();
    await battlePage.skipBattle();

    await battlePage.backToCreatorButtonAfterBattle.click();

    await assertElementVisibility(createPage.createTeamHeaderTitle);
    await assertCharacterCardQuantity(createPage.characterList.characterCards, charactersCreated.length);
    for (const character of charactersCreated) {
      await assertCharacterCard(character, createPage.characterList.getSpecifiedCharacterCard(character.name));
    }

    await createPage.goToBattleButton.click();

    await assertDragonHasNoStats(battlePage.dragonComponent);
    await assertElementVisibility(battlePage.drawOpponentButton);
    await assertElementVisibility(battlePage.logPanel, 'hidden');
  });
});
