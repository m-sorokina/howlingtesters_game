import fs from 'node:fs';
import path from 'node:path';
import type { PartyGeneral, CreateCharacterForm, CharacterList, ErrorMessages } from '@types';

const locale = process.env.LOCALE ?? 'en';
const partyDir = path.join(__dirname, '..', '..', 'data', 'text', locale);

function loadPartyFile<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(path.join(partyDir, `${fileName}.json`), 'utf-8')) as T;
}

export const content = {
  partyGeneral: loadPartyFile<PartyGeneral>('party/party-general'),
  createCharacterForm: loadPartyFile<CreateCharacterForm>('party/create-character-form'),
  characterList: loadPartyFile<CharacterList>('party/character-list'),
  errorMessages: loadPartyFile<{ errorTypes: ErrorMessages }>('party/error-messages').errorTypes,
} as const;
