import { faker } from '@faker-js/faker';
import { RACES, CLASSES, STAT_DEFAULT, STAT_POINTS, STAT_KEYS } from '@consts';
import { Character } from '@models';
import type { CharacterType, Stats } from '@types';
import { distributePoints } from './distribute-points';

function generateRandomStats(): Stats {
  const stats = Object.fromEntries(STAT_KEYS.map((key) => [key, STAT_DEFAULT])) as Stats;
  const remainPoints = STAT_POINTS - STAT_KEYS.length * STAT_DEFAULT;
  return distributePoints(remainPoints, stats);
}

export function createRandomCharacter(overrides: Partial<CharacterType> = {}): Character {
  return new Character(
    overrides.name ?? faker.person.firstName(),
    overrides.race ?? faker.helpers.arrayElement(RACES),
    overrides.charClass ?? faker.helpers.arrayElement(CLASSES),
    overrides.stats ?? generateRandomStats(),
  );
}
