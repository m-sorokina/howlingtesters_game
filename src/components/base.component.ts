import type { Locator } from '@playwright/test';

export abstract class BaseComponent {
  constructor(protected locator: Locator) {
    this.locator = locator;
  }

  async waitFor(options?: { state?: 'attached' | 'detached' | 'visible' | 'hidden'; timeout?: number }): Promise<void> {
    await this.locator.waitFor({ state: 'visible', ...options });
  }
}
