import type { Race, Class, Stats, CharacterType } from '@types';
import { STAT_DEFAULT, STAT_POINTS, RACES, CLASSES, STAT_KEYS } from '@consts/const';
import { faker } from '@faker-js/faker';
import { distributePoints } from '@helpers/distribute-points';

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
    const remainPoints = STAT_POINTS - keysLength * STAT_DEFAULT;
    return distributePoints(remainPoints, stats);
  }
}
