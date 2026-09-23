import type { Locator } from '@playwright/test';
import { content } from '@content';
import type { Race, Class, Stats } from '@types';
import { Character } from '@models';
import { STAT_KEYS } from '@consts';

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
    const stats = {} as Stats;
    const name = (await this.name.innerText())!;
    const race = (await this.race.innerText()).split(': ')[1];
    const charClass = (await this.charClass.innerText()).split(': ')[1];
    const statsList = (await this.stats.allTextContents())!;
    const statsValues = statsList.map((value) => value.split(': '));
    for (const value of statsValues) {
      const [k, v] = value;
      for (const [, key] of STAT_KEYS.entries()) {
        if (key === k?.toLowerCase()) {
          stats[key] = Number(v);
        }
      }
    }
    return new Character(name, race as Race, charClass as Class, stats as Stats);
  }
}
