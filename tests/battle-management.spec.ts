import { test } from '@fixtures';
import arrayOf4Characters from '@data/preseed-battle-4-characters.json';
import { assertElementVisibility, assertDragonCard, assertDragonHasNoStats } from '@assertions';
import { MAX_BATTLE_DURATION } from '@consts';

test.describe('Battle management', () => {
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
});
