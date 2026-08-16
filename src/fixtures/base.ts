import { test as base } from '@playwright/test';
import { CreateTeam } from '@pages';

type Fixtures = {
  createPage: CreateTeam;
};

export const test = base.extend<Fixtures>({
  createPage: async ({ page }, use) => {
    const createPage = new CreateTeam(page);
    await createPage.goto();
    await use(createPage);
  },
});

export { expect } from '@playwright/test';
