import { BasePage } from '@pages';
import type { Page, Locator } from '@playwright/test';
import { routes } from '@consts';
import { BattleControls, BattleTeam, DragonComponent } from '@components';

export class BattlePage extends BasePage {
  readonly url = routes.battle;
  public battleTeam: BattleTeam;
  public dragonComponent: DragonComponent;
  public battleControls: BattleControls;

  constructor(page: Page) {
    super(page);
    this.battleTeam = new BattleTeam(page.locator('#team-container'));
    this.dragonComponent = new DragonComponent(page.locator('#dragon-panel'));
    this.battleControls = new BattleControls(page.locator('#battle-controls'));
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

  get logPanel(): Locator {
    return this.page.locator('#battle-log');
  }

  get drawOpponentButton(): Locator {
    return this.page.locator('#draw-btn');
  }

  get drawNextOpponentButton(): Locator {
    return this.page.locator('#draw-next-opponent-btn');
  }
}
