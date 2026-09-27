import type { Locator } from '@playwright/test';
import { content } from '@content';
import type { Race, Class } from '@types';
import { Character } from '@models';
import { getStatsDetails } from '@helpers';

const { raceLabel, classLabel } = content.characterList.characterCard;

export class CharacterComponent {
  readonly container: Locator;

  constructor(container: Locator, name: string) {
    this.container = container.filter({
      has: container.page().getByRole('heading', { name, exact: true }),
    });
  }

  get removeButton(): Locator {
    return this.container.locator('button[onclick^="removeCharacter"]');
  }

  get image(): Locator {
    return this.container.getByRole('img');
  }

  get name(): Locator {
    return this.container.getByRole('heading', { level: 4 });
  }

  get race(): Locator {
    return this.getFieldByLabel(raceLabel);
  }

  get charClass(): Locator {
    return this.getFieldByLabel(classLabel);
  }

  get stats(): Locator {
    return this.container.locator('ul li');
  }

  private getFieldByLabel(label: string) {
    return this.container.locator('p').filter({ hasText: new RegExp(`^\\s*${label}`) });
  }

  async getDetails(): Promise<Character> {
    const name = (await this.name.innerText())!;
    const race = (await this.race.innerText()).split(': ')[1];
    const charClass = (await this.charClass.innerText()).split(': ')[1];
    const statsList = (await this.stats.allTextContents())!;
    const stats = getStatsDetails(statsList);
    return new Character(name, race as Race, charClass as Class, stats);
  }
}
