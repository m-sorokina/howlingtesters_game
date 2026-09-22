import type { Race, Class, Stats, CharacterType } from '@types';

export class Character implements CharacterType {
  name: string;
  race: Race;
  charClass: Class;
  stats: Stats;

  constructor(name: string, race: Race, charClass: Class, stats: Stats) {
    this.name = name;
    this.race = race;
    this.charClass = charClass;
    this.stats = stats;
  }
}
