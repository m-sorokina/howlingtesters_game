import { BasePage } from '@pages';
import type { Page, Locator } from '@playwright/test';
import { routes, MAX_BATTLE_DURATION } from '@consts';
import { BattleControls, BattleTeam, DragonComponent, BattlePopupComponent } from '@components';

export class BattlePage extends BasePage {
  readonly url = routes.battle;
  public battleTeam: BattleTeam;
  public dragonComponent: DragonComponent;
  public battleControls: BattleControls;
  public battlePopup: BattlePopupComponent;

  constructor(page: Page) {
    super(page);
    this.battleTeam = new BattleTeam(page.locator('#team-container'));
    this.dragonComponent = new DragonComponent(page.locator('#dragon-panel'));
    this.battleControls = new BattleControls(page.locator('#battle-controls'));
    this.battlePopup = new BattlePopupComponent(page.locator('#battle-popup'));
  }

  get fightButton(): Locator {
    return this.page.locator('#fight-btn');
  }

  get fightWithoutMusicButton(): Locator {
    return this.page.locator('#fight-no-music-btn');
  }

  get backToCreatorButton(): Locator {
    return this.page.locator('#back-btn');
  }

  get backToCreatorButtonAfterBattle(): Locator {
    return this.page.locator('#back-after-battle-btn');
  }

  get logPanel(): Locator {
    return this.page.locator('#battle-log');
  }

  get drawOpponentButton(): Locator {
    return this.page.locator('#draw-btn');
  }

  get drawNextOpponentButton(): Locator {
    return this.page.locator('#draw-next-opponent-btn');
  }

  async skipBattle(): Promise<void> {
    await this.battleControls.skipBattleButton.click();
    await this.battleControls.skipBattleButton.waitFor({ state: 'hidden', timeout: MAX_BATTLE_DURATION });
  }

  async waitForBattleEnd(): Promise<void> {
    await this.battleControls.skipBattleButton.waitFor({ state: 'visible' });
    await this.battleControls.skipBattleButton.waitFor({ state: 'hidden', timeout: MAX_BATTLE_DURATION });
  }
}
