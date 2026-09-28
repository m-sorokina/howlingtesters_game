import type { Locator } from '@playwright/test';
import { getStatsDetails } from '@helpers';
import { Dragon } from '@models';

export class DragonComponent {
  readonly container: Locator;
  constructor(container: Locator) {
    this.container = container;
  }

  get image(): Locator {
    return this.container.locator('#dragon-img');
  }

  get stats(): Locator {
    return this.container.locator('#dragon-stats-list li');
  }

  get energy(): Locator {
    return this.container.locator('#dragon-energy-display');
  }

  get health(): Locator {
    return this.container.locator('#dragon-hp-display');
  }

  async getDetails(): Promise<Dragon> {
    await this.stats.first().waitFor();
    const statsList = (await this.stats.allTextContents())!;
    const stats = getStatsDetails(statsList);
    return new Dragon(stats);
  }
}
