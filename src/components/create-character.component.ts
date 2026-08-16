import type { Locator } from '@playwright/test';
import { BaseComponent } from '@components';
import type { Race, Class, Stats, CharacterType } from '@types';
import { STAT_KEYS } from '@consts';

export class CreateCharacterComponent extends BaseComponent {
  constructor(locator: Locator) {
    super(locator);
  }

  get formHeader(): Locator {
    return this.locator.getByRole('heading', { level: 2 });
  }

  get nameInput(): Locator {
    return this.locator.getByPlaceholder('Enter name');
  }

  get raceSelector(): Locator {
    return this.locator.locator('#race');
  }

  get classesList(): Locator {
    return this.locator.locator('.class-select');
  }

  getClass(characterClass: Class): Locator {
    return this.classesList.locator(`[data-class="${characterClass}"]`);
  }

  get pointsToSpend(): Locator {
    return this.locator.locator('#points-left');
  }

  get addCharacterButton(): Locator {
    return this.locator.locator('#generate-btn');
  }

  getStatsInput(statOption: keyof Stats): Locator {
    return this.locator.locator(`#${statOption}`);
  }

  async enterCharacterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async selectRace(race: Race): Promise<string[]> {
    return await this.raceSelector.selectOption(race);
  }

  async selectClass(characterClass: Class): Promise<void> {
    await this.getClass(characterClass).click();
  }

  async setStatsOption(stat: keyof Stats, value: number): Promise<void> {
    await this.getStatsInput(stat).fill(String(value));
  }

  async setStats(stats: Stats): Promise<void> {
    for (const [key, value] of Object.entries(stats) as [keyof Stats, number][]) {
      await this.setStatsOption(key, value);
    }
  }

  async createCharacter(characterToCreate: CharacterType): Promise<void> {
    await this.enterCharacterName(characterToCreate.name);
    await this.selectRace(characterToCreate.race);
    await this.selectClass(characterToCreate.charClass);
    await this.setStats(characterToCreate.stats);
    await this.addCharacterButton.click();
  }

  async getStatOptionsValues(): Promise<Stats> {
    const entries = await Promise.all(
      STAT_KEYS.map(async (key) => {
        const value = await this.getStatsInput(key).inputValue();
        return [key, Number(value)];
      }),
    );
    return Object.fromEntries(entries) as Stats;
  }
}
