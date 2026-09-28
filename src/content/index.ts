import * as fs from 'node:fs';
import * as path from 'node:path';
import type {
  PartyGeneral,
  CreateCharacterForm,
  CharacterList,
  PartyErrorMessages,
  FightErrorMessages,
  DragonCard,
  FightGeneral,
} from '@types';

const locale = process.env.LOCALE ?? 'en';
const textDir = path.join(__dirname, '..', '..', 'data', 'text', locale);

function loadTextFile<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(path.join(textDir, `${fileName}.json`), 'utf-8')) as T;
}

export const content = {
  partyGeneral: loadTextFile<PartyGeneral>('party/party-general'),
  createCharacterForm: loadTextFile<CreateCharacterForm>('party/create-character-form'),
  characterList: loadTextFile<CharacterList>('party/character-list'),
  partyErrorMessages: loadTextFile<PartyErrorMessages>('party/error-messages'),
  dragonCard: loadTextFile<DragonCard>('fight/dragon-card'),
  fightGeneral: loadTextFile<FightGeneral>('fight/fight-general'),
  fightErrorMessages: loadTextFile<FightErrorMessages>('fight/error-messages'),
} as const;
