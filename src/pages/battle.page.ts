import { BasePage } from '@pages';
import type { Page } from 'playwright-core';

export class BattlePage extends BasePage {
  url = '/party-fight/';

  constructor(page: Page) {
    super(page);
  }
}
