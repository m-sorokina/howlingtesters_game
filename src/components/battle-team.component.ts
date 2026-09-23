import type { Locator } from '@playwright/test';
import { CharacterList } from './character-list.component';

export class BattleTeam extends CharacterList {
  constructor(container: Locator) {
    super(container);
  }
}
