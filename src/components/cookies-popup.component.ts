import type { Locator } from '@playwright/test';

export class CookiesPopup {
  constructor(readonly container: Locator) {
    this.container = container;
  }

  get acceptButton(): Locator {
    return this.container.locator('button.cky-btn-accept');
  }

  get rejectButton(): Locator {
    return this.container.locator('button.cky-btn-reject');
  }
}
