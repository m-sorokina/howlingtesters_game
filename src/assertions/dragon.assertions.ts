import { DragonComponent } from '@components';
import { assertElementVisibility, assertImageVisibility } from './general.assertions';
import type { Dragon } from '@models';
import type { Stats } from '@types';
import { STAT_KEYS } from '@consts';
import { expect } from '@fixtures';

export async function assertDragonCard(dragon: DragonComponent) {
  await assertElementVisibility(dragon.container);
  await assertImageVisibility(dragon.image);
  assertDragonCardDetails(await dragon.getDetails());
}

export function assertDragonCardDetails(dragon: Dragon) {
  const stats = dragon.getStats();
  for (const key of STAT_KEYS) {
    expect.soft(stats[key], `Dragon ${key} should be a positive number`).toBeGreaterThan(0);
  }
}

export async function assertDragonHasNoStats(dragon: DragonComponent): Promise<void> {
  await expect(dragon.stats, 'Dragon should have no stats before a draw').toHaveCount(0);
}

export function assertDragonStatsAreDifferent(previousStats: Stats, currentStats: Stats): void {
  expect.soft(currentStats, 'A newly drawn dragon should not repeat the previous stats').not.toEqual(previousStats);
}
