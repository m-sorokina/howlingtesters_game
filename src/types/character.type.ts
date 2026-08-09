import { RACES, CLASSES, STAT_KEYS } from '@/consts/const';
export type Race = (typeof RACES)[number];

export type Class = (typeof CLASSES)[number];

export type Stats = Record<(typeof STAT_KEYS)[number], number>;

export type CharacterType = {
  name: string;
  race: Race;
  charClass: Class;
  stats: Stats;
};
