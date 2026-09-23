export type PartyGeneral = typeof import('@data/text/en/party/party-general.json');
export type CreateCharacterForm = typeof import('@data/text/en/party/create-character-form.json');
export type CharacterList = typeof import('@data/text/en/party/character-list.json');
export type ErrorMessages = (typeof import('@data/text/en/party/error-messages.json'))['errorTypes'];
export type ErrorMessage = ErrorMessages[0];
