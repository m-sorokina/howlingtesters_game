import { BasePage } from '@pages';
import type { Page } from 'playwright-core';
import { routes } from '@consts/routes';

export class BattlePage extends BasePage {
  url = routes.battle;

  constructor(page: Page) {
    super(page);
  }
}
