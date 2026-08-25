import type { Locale } from '@types';

const locale: Locale = (process.env.LOCALE as Locale) ?? 'en';

const partyGeneral = await import(`@data/text/${locale}/party/party-general.json`);
const createCharacterForm = await import(`@data/text/${locale}/party/create-character-form.json`);
const characterList = await import(`@data/text/${locale}/party/character-list.json`);
const errorMessages = await import(`@data/text/${locale}/party/error-messages.json`);

export const content = {
  partyGeneral,
  createCharacterForm,
  characterList,
  errorMessages,
} as const;
