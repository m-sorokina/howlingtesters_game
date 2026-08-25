import fs from 'node:fs';
import path from 'node:path';

const locale = process.env.LOCALE ?? 'en';
const partyDir = path.join(__dirname, '..', '..', 'data', 'text', locale);

function loadPartyFile<T>(fileName: string): T {
  return JSON.parse(fs.readFileSync(path.join(partyDir, `${fileName}.json`), 'utf-8')) as T;
}

export const content = {
  partyGeneral: loadPartyFile<typeof import('@data/text/en/party/party-general.json')>('party/party-general'),
  createCharacterForm:
    loadPartyFile<typeof import('@data/text/en/party/create-character-form.json')>('party/create-character-form'),
  characterList: loadPartyFile<typeof import('@data/text/en/party/character-list.json')>('party/character-list'),
  errorMessages: loadPartyFile<typeof import('@data/text/en/party/error-messages.json')>('party/error-messages'),
};
