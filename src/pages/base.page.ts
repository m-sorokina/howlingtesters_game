import type { Page } from '@playwright/test';
import { CookiesPopup } from '../components/cookies-popup.component';

export abstract class BasePage {
  readonly page: Page;
  readonly cookiesPopup: CookiesPopup;
  abstract readonly url: string;

  constructor(page: Page) {
    this.page = page;
    this.cookiesPopup = new CookiesPopup(page.locator('.cky-consent-container'));
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async acceptCookies() {
    await this.cookiesPopup.acceptButton.click();
  }

  async rejectCookies() {
    await this.cookiesPopup.rejectButton.click();
  }
}
