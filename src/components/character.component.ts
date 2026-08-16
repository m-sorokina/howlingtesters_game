import type { Locator } from '@playwright/test';

export class CharacterComponent {
  readonly locator: Locator;

  constructor(locator: Locator, name: string) {
    this.locator = locator
      .locator('.details')
      .filter({ has: locator.page().getByRole('heading', { name, exact: true }) });
  }

  get removeButton(): Locator {
    return this.locator.getByRole('button', { name: 'Remove' });
  }

  get name(): Locator {
    return this.locator.getByRole('heading', { level: 4 });
  }

  get race(): Locator {
    return this.locator.getByText(/Race:/);
  }

  get charClass(): Locator {
    return this.locator.getByText(/Class:/);
  }

  get stats(): Locator {
    return this.locator.locator('.stats-list li');
  }
}
