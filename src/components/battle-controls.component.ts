import type { Locator } from '@playwright/test';

export class BattleControls {
  readonly container: Locator;

  constructor(container: Locator) {
    this.container = container;
  }

  get skipBattleButton(): Locator {
    return this.container.locator('#skip-battle-btn');
  }

  get muteMusic(): Locator {
    return this.container.locator('#mute-music-btn');
  }
}
