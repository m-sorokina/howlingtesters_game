import { test } from '@fixtures';
import arrayOf4Characters from '@data/preseed-party-4-characters.json';
import arrayOf3Characters from '@data/preseed-party-3-characters.json';
import {
  assertElementVisibility,
  assertDragonCard,
  assertDragonHasNoStats,
  assertDragonStatsAreDifferent,
  assertCharacterCard,
  assertCharacterCardQuantity,
  assertErrorPopupContent,
} from '@assertions';
import { getCharacterFromLocalStorageData, withRaceBonus } from '@helpers';
import { MAX_BATTLE_DURATION } from '@consts';
import { content } from '@content';

test.describe('Battle management', () => {
  test.describe('Full party of four', () => {
    test.beforeEach(async ({ battlePage }) => {
      await battlePage.page.localStorage.setItem('characters', JSON.stringify(arrayOf4Characters));
      await battlePage.page.reload();
    });

    test('Player is able to draw opponent', async ({ battlePage }) => {
      await assertDragonHasNoStats(battlePage.dragonComponent);

      await battlePage.drawOpponentButton.click();

      await assertDragonCard(battlePage.dragonComponent);
      await assertElementVisibility(battlePage.fightButton);
      await assertElementVisibility(battlePage.fightWithoutMusicButton);
      await assertElementVisibility(battlePage.backToCreatorButton);
    });

    test('Player is able to start the battle with music', async ({ battlePage }) => {
      await battlePage.drawOpponentButton.click();

      await battlePage.fightButton.click();

      await assertElementVisibility(battlePage.logPanel);
      await assertElementVisibility(battlePage.battleControls.skipBattleButton);
      await assertElementVisibility(battlePage.battleControls.muteMusic);

      await assertElementVisibility(battlePage.drawOpponentButton, 'hidden');
      await assertElementVisibility(battlePage.fightButton, 'hidden');
      await assertElementVisibility(battlePage.fightWithoutMusicButton, 'hidden');
      await assertElementVisibility(battlePage.backToCreatorButton, 'hidden');
      await assertElementVisibility(battlePage.drawNextOpponentButton, 'hidden');
    });

    test('Player is able to start the battle without music', async ({ battlePage }) => {
      await battlePage.drawOpponentButton.click();

      await battlePage.fightWithoutMusicButton.click();

      await assertElementVisibility(battlePage.logPanel);
      await assertElementVisibility(battlePage.battleControls.skipBattleButton);
      await assertElementVisibility(battlePage.battleControls.muteMusic, 'hidden');

      await assertElementVisibility(battlePage.drawOpponentButton, 'hidden');
      await assertElementVisibility(battlePage.fightButton, 'hidden');
      await assertElementVisibility(battlePage.fightWithoutMusicButton, 'hidden');
      await assertElementVisibility(battlePage.backToCreatorButton, 'hidden');
      await assertElementVisibility(battlePage.drawNextOpponentButton, 'hidden');
    });

    test('Player is offered the next opponent when the battle ends', async ({ battlePage }) => {
      test.setTimeout(MAX_BATTLE_DURATION + 30_000);

      await battlePage.drawOpponentButton.click();
      await battlePage.fightWithoutMusicButton.click();

      await battlePage.waitForBattleEnd();

      await assertElementVisibility(battlePage.drawNextOpponentButton);
      await assertElementVisibility(battlePage.backToCreatorButtonAfterBattle);

      await assertElementVisibility(battlePage.logPanel);
      await assertElementVisibility(battlePage.battleControls.muteMusic, 'hidden');
      await assertElementVisibility(battlePage.fightButton, 'hidden');
      await assertElementVisibility(battlePage.fightWithoutMusicButton, 'hidden');
    });

    test('Player is given a new dragon and a restored team after drawing the next opponent', async ({ battlePage }) => {
      const expectedTeam = arrayOf4Characters.map(getCharacterFromLocalStorageData).map(withRaceBonus);

      await battlePage.drawOpponentButton.click();
      const firstDragonStats = (await battlePage.dragonComponent.getDetails()).getStats();

      await battlePage.fightWithoutMusicButton.click();
      await battlePage.skipBattle();

      await battlePage.drawNextOpponentButton.click();

      await assertElementVisibility(battlePage.fightButton);
      await assertElementVisibility(battlePage.fightWithoutMusicButton);
      await assertElementVisibility(battlePage.backToCreatorButton);
      await assertElementVisibility(battlePage.drawNextOpponentButton, 'hidden');

      await assertDragonCard(battlePage.dragonComponent);
      assertDragonStatsAreDifferent(firstDragonStats, (await battlePage.dragonComponent.getDetails()).getStats());

      await assertCharacterCardQuantity(battlePage.battleTeam.characterCards, expectedTeam.length);
      for (const character of expectedTeam) {
        await assertCharacterCard(character, battlePage.battleTeam.getSpecifiedCharacterCard(character.name));
      }
    });
  });

  test.describe('Party of three', () => {
    test.beforeEach(async ({ battlePage }) => {
      await battlePage.page.localStorage.setItem('characters', JSON.stringify(arrayOf3Characters));
      await battlePage.page.reload();
    });

    test('Player is able to start the battle with fewer than four characters', async ({ battlePage }) => {
      const expectedTeam = arrayOf3Characters.map(getCharacterFromLocalStorageData).map(withRaceBonus);

      await assertCharacterCardQuantity(battlePage.battleTeam.characterCards, expectedTeam.length);
      for (const character of expectedTeam) {
        await assertCharacterCard(character, battlePage.battleTeam.getSpecifiedCharacterCard(character.name));
      }

      await battlePage.drawOpponentButton.click();
      await battlePage.fightWithoutMusicButton.click();

      await assertElementVisibility(battlePage.battleControls.skipBattleButton);
      await assertElementVisibility(battlePage.logPanel);
    });
  });

  test.describe('Empty party', () => {
    test.beforeEach(async ({ battlePage }) => {
      await battlePage.page.localStorage.removeItem('characters');
      await battlePage.page.reload();
    });

    test('Player is told the team is empty when starting a battle', async ({ battlePage }) => {
      await assertCharacterCardQuantity(battlePage.battleTeam.characterCards, 0);

      await battlePage.drawOpponentButton.click();
      await battlePage.fightWithoutMusicButton.click();

      await assertErrorPopupContent(battlePage.battlePopup, content.fightErrorMessages.noCharacters);
      await assertElementVisibility(battlePage.battleControls.skipBattleButton, 'hidden');
      await assertElementVisibility(battlePage.logPanel, 'hidden');

      await battlePage.battlePopup.closeButton.click();

      await assertElementVisibility(battlePage.battlePopup.container, 'hidden');
      await assertElementVisibility(battlePage.logPanel, 'hidden');
    });
  });
});
