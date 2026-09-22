import { test } from '@fixtures';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';
import { assertCharacterCard, assertCharacterCardQuantity, assertElementVisibility } from '@assertions';
import { BattlePage } from '@pages';
import { getCharacterFromLocalStorageData } from '@helpers';

test.describe('Battle management', () => {
  test.beforeEach(async ({ createPage }) => {
    await createPage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
    await createPage.page.reload();
  });

  test('Player is able to navigate to the battle page', async ({ createPage, page }) => {
    const charactersCreated = arrayOf4Characters.map((c) => getCharacterFromLocalStorageData(c));
    const battlePage = new BattlePage(page);
    await createPage.goToBattleButton.click();
    await assertElementVisibility(battlePage.battleTeam.container);
    await assertElementVisibility(battlePage.drawOpponentButton);
    await assertCharacterCardQuantity(battlePage.battleTeam.characterCards, arrayOf4Characters.length);
    for (const character of charactersCreated) {
      await assertCharacterCard(character, battlePage.battleTeam.getSpecifiedCharacterCard(character.name));
    }
  });
});
