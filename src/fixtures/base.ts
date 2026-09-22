import { test as base } from '@playwright/test';
import { CreateTeam, BattlePage } from '@pages';

type Fixtures = {
  createPage: CreateTeam;
  battlePage: BattlePage;
};

export const test = base.extend<Fixtures>({
  createPage: async ({ page }, use) => {
    const createPage = new CreateTeam(page);
    await createPage.goto();
    await createPage.createTeamHeaderTitle.waitFor({ state: 'visible' });
    await use(createPage);
  },
  battlePage: async ({ page }, use) => {
    const battlePage = new BattlePage(page);
    await battlePage.goto();
    await use(battlePage);
  },
});

export { expect } from '@playwright/test';
