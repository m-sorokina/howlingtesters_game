import type { Race, Stats } from '@types';

export const STAT_MIN = 1;
export const STAT_DEFAULT = 10;
export const STAT_MAX_FOR_OPTION = 20;
export const STAT_POINTS = 55;
export const MAX_CHARACTERS = 4;

export const RACES = ['Human', 'Elf', 'Dwarf', 'Orc'] as const;
export const CLASSES = ['Warrior', 'Mage', 'Rogue', 'Scout'] as const;
export const STAT_KEYS = ['strength', 'agility', 'energy', 'health'] as const;

export const RACE_STAT_BONUS: Record<Race, Partial<Stats>> = {
  Human: { strength: 2 },
  Elf: { energy: 2 },
  Dwarf: { health: 2 },
  Orc: { strength: 2 },
};

export const MAX_BATTLE_DURATION = 120_000;
