import type { Stats } from '@types';
import { STAT_KEYS } from '@consts';

export function getStatsDetails(statsList: string[]): Stats {
  const stats = {} as Stats;
  const statsValues = statsList.map((value) => value.split(': '));
  for (const value of statsValues) {
    const [k, v] = value;
    for (const [, key] of STAT_KEYS.entries()) {
      if (key === k?.toLowerCase()) {
        stats[key] = Number(v);
      }
    }
  }
  return stats;
}
