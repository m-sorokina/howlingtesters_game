import type { Locator } from '@playwright/test';
import { expect } from '@fixtures';
import type { Character } from '@models';
import type { CharacterComponent } from '@components';
import { assertElementVisibility, assertImageVisibility, assertElementsQuantity } from './general.assertions';

export async function assertCharacterCard(character: Character, createdCharacter: CharacterComponent) {
  await assertElementVisibility(createdCharacter.name);
  await assertImageVisibility(createdCharacter.image, character.charClass);
  assertCharacterCardDetails(character, await createdCharacter.getDetails());
}

export function assertCharacterCardDetails(expectedCharacter: Character, actualCharacter: Character): void {
  expect.soft(actualCharacter, 'Created character details should be equal to').toEqual(expectedCharacter);
}

export async function assertCharacterCardQuantity(expectedElementCards: Locator, expectedQuantity: number) {
  await assertElementsQuantity(expectedElementCards, expectedQuantity, 'character cards');
}
