import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components';

export class MessageComponent extends BaseComponent {
  constructor(locator: Locator) {
    super(locator);
  }

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
