import type { Locator } from '@playwright/test';
import { CharacterComponent } from './character.component';
import { Character } from '@models';

export class CharacterList {
  constructor(readonly container: Locator) {
    this.container = container;
  }

  get characterCards(): Locator {
    return this.container.locator('.character-card');
  }

  getSpecifiedCharacterCard(name: string): CharacterComponent {
    return new CharacterComponent(this.characterCards, name);
  }

  async getSpecifiedCharacterDetails(name: string): Promise<Character> {
    return this.getSpecifiedCharacterCard(name).getDetails();
  }
}
