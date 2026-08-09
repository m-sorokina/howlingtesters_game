import type { Race, Class, Stats, CharacterType } from '@/types';
import {
  STAT_MIN,
  STAT_DEFAULT,
  STAT_MAX_FOR_OPTION,
  STAT_POINTS,
  RACES,
  CLASSES,
  STAT_KEYS,
} from '@/consts/const';
import { faker } from '@faker-js/faker';

export class Character implements CharacterType {
  name: string;
  race: Race;
  charClass: Class;
  stats: Stats;

  constructor(race?: Race, charClass?: Class, stats?: Stats) {
    this.name = faker.person.firstName();
    this.race = race ?? faker.helpers.arrayElement(RACES);
    this.charClass = charClass ?? faker.helpers.arrayElement(CLASSES);
    this.stats = stats ?? this.generateStats();
  }

  generateStats(): Stats {
    const stats = Object.fromEntries(STAT_KEYS.map((key) => [key, STAT_DEFAULT])) as Stats;
    const keysLength = STAT_KEYS.length;
    let remainPoints = STAT_POINTS - keysLength * STAT_DEFAULT;
    while (remainPoints > 0) {
      const keysLessStatMax = STAT_KEYS.filter((k) => stats[k] < STAT_MAX_FOR_OPTION);
      const key = faker.helpers.arrayElement(keysLessStatMax);
      const addPoints = faker.number.int({
        min: STAT_MIN,
        max: Math.min(remainPoints, STAT_MAX_FOR_OPTION - stats[key]),
      });
      stats[key] += addPoints;
      remainPoints -= addPoints;
    }
    return stats;
  }
}
