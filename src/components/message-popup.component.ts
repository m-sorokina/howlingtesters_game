import type { Locator } from '@playwright/test';

export class MessagePopupComponent {
  constructor(readonly container: Locator) {}

  get title(): Locator {
    return this.container.locator('#popup-title');
  }

  get message(): Locator {
    return this.container.locator('#popup-message');
  }

  get closeButton(): Locator {
    return this.container.locator('#popup-close');
  }
}
