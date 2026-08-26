import { expect } from '@fixtures';
import type { Locator } from '@playwright/test';
import { STAT_POINTS } from '@consts';

export async function assertStatPointsToSpend(
  pointsToSpentExpected: number,
  pointsToSpentDisplayed: Locator,
): Promise<void> {
  await expect(pointsToSpentDisplayed, `Point to spend should be equal to ${pointsToSpentExpected}`).toHaveText(
    String(pointsToSpentExpected),
  );
}

export async function assertTotalDistributedPoints(distributedPoints: number): Promise<void> {
  expect(distributedPoints, 'All the stats points should be distributed').toEqual(STAT_POINTS);
}
