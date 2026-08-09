import type { Locator } from '@playwright/test';
import { BaseComponent } from '@/components';
import type { Race, Class, Stats, CharacterType } from '@/types';

export class CreateCharacterComponent extends BaseComponent {
  constructor(locator: Locator) {
    super(locator);
  }

  get nameInput(): Locator {
    return this.locator.getByPlaceholder('Enter name');
  }

  get raceSelect(): Locator {
    return this.locator.locator('#race');
  }

  get classSelect(): Locator {
    return this.locator.locator('.class-select');
  }

  get pointsToSpend(): Locator {
    return this.locator.locator('#points-left');
  }

  get strengthInput(): Locator {
    return this.locator.locator('#strength');
  }

  get agilityInput(): Locator {
    return this.locator.locator('#agility');
  }

  get energyInput(): Locator {
    return this.locator.locator('#energy');
  }

  get healthInput(): Locator {
    return this.locator.locator('#health');
  }

  get addCharacterButton(): Locator {
    return this.locator.locator('#generate-btn');
  }

  async enterCharacterName(name: string): Promise<void> {
    await this.nameInput.fill(name);
  }

  async selectRace(race: Race): Promise<string[]> {
    return await this.raceSelect.selectOption(race);
  }

  async selectClass(characterClass: Class): Promise<void> {
    await this.classSelect.locator(`[data-class="${characterClass}"]`).click();
  }

  async setStatsOption(stat: keyof Stats, value: number): Promise<void> {
    await this.locator.locator(`#${stat}`).fill(String(value));
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
}
