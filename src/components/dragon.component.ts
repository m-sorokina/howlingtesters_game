import type { Locator } from '@playwright/test';

export class DragonComponent {
  readonly container: Locator;
  constructor(container: Locator) {
    this.container = container;
  }

  get image(): Locator {
    return this.container.locator('#dragon-img');
  }

  get stats(): Locator {
    return this.container.locator('#dragon-stats-list');
  }

  get energy(): Locator {
    return this.container.locator('#dragon-energy-display');
  }

  get health(): Locator {
    return this.container.locator('#dragon-hp-display');
  }
}
