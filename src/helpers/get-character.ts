import { Character } from '@models';
import type { LocalStorageCharacter, Stats, Race, Class } from '@types';

export function getCharacterFromLocalStorageData(localStorageCharacter: LocalStorageCharacter): Character {
  const { name, race, charClass, strength, agility, energy, health } = localStorageCharacter;
  const stats = { strength, agility, energy, health } as Stats;
  return new Character(name, race as Race, charClass as Class, stats);
}
