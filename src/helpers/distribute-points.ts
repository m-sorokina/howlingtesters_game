import type { Stats } from '@types';
import { faker } from '@faker-js/faker';
import { STAT_MIN, STAT_MAX_FOR_OPTION, STAT_KEYS } from '@consts/const';

export function distributePoints(pointsToDistribute: number, stats: Stats): Stats {
  while (pointsToDistribute > 0) {
    const keysLessStatMax = STAT_KEYS.filter((k) => stats[k] < STAT_MAX_FOR_OPTION);
    const key = faker.helpers.arrayElement(keysLessStatMax);
    const addPoints = faker.number.int({
      min: STAT_MIN,
      max: Math.min(pointsToDistribute, STAT_MAX_FOR_OPTION - stats[key]),
    });
    stats[key] += addPoints;
    pointsToDistribute -= addPoints;
  }
  return stats;
}
