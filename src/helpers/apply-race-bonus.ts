import { Character } from '@models';
import { RACE_STAT_BONUS } from '@consts';
import type { Stats } from '@types';

export function withRaceBonus(character: Character): Character {
  const stats = { ...character.stats };
  const bonus = RACE_STAT_BONUS[character.race];
  for (const [key, value] of Object.entries(bonus) as [keyof Stats, number][]) {
    stats[key] += value;
  }
  return new Character(character.name, character.race, character.charClass, stats);
}
