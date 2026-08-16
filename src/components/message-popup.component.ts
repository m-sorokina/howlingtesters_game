import type { Locator } from '@playwright/test';

export class MessagePopupComponent {
  constructor(readonly locator: Locator) {}

  get title(): Locator {
    return this.locator.locator('#popup-title');
  }

  get message(): Locator {
    return this.locator.locator('#popup-message');
  }

  get closeButton(): Locator {
    return this.locator.locator('#popup-close');
  }
}
