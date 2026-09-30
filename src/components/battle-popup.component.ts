import type { Locator } from '@playwright/test';
import { MessagePopupComponent } from './message-popup.component';

export class BattlePopupComponent extends MessagePopupComponent {
  override get title(): Locator {
    return this.container.locator('#battle-popup-title');
  }

  override get message(): Locator {
    return this.container.locator('#battle-popup-message');
  }

  override get closeButton(): Locator {
    return this.container.locator('#battle-popup-close');
  }
}
