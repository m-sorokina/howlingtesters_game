import type { Stats } from '@types';

export class Dragon {
  stats: Stats;

  constructor(stats: Stats) {
    this.stats = stats;
  }

  getStats(): Stats {
    return this.stats;
  }
}
