import type { Locator } from '@playwright/test';
import { content } from '@content';

const { raceLabel, classLabel } = content.characterList.characterCard;

export class CharacterComponent {
  readonly container: Locator;

  constructor(container: Locator, name: string) {
    this.container = container
      .locator('.details')
      .filter({ has: container.page().getByRole('heading', { name, exact: true }) });
  }

  get removeButton(): Locator {
    return this.container.locator('button[onclick^="removeCharacter"]');
  }

  get name(): Locator {
    return this.container.getByRole('heading', { level: 4 });
  }

  get race(): Locator {
    return this.container.getByText(new RegExp(`^${raceLabel}`));
  }

  get charClass(): Locator {
    return this.container.getByText(new RegExp(`^${classLabel}`));
  }

  get stats(): Locator {
    return this.container.locator('.stats-list li');
  }
}
