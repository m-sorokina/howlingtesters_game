import type { Locator } from '@playwright/test';
import { expect } from '@fixtures';
import type { Character } from '@models';
import type { CharacterComponent } from '@components';
import { assertElementVisibility, assertImageVisibility } from './general.assertions';

export async function assertCharacterCard(character: Character, createdCharacter: CharacterComponent) {
  await assertElementVisibility(createdCharacter.name);
  await assertImageVisibility(createdCharacter.image, character.charClass);
  assertCharacterCardDetails(character, await createdCharacter.getDetails());
}

export function assertCharacterCardDetails(expectedCharacter: Character, actualCharacter: Character): void {
  expect.soft(actualCharacter, 'Created character details should be equal to').toEqual(expectedCharacter);
}

export async function assertCharacterCardQuantity(
  createdCharacterCards: Locator,
  expectedQuantity: number,
): Promise<void> {
  await expect(
    createdCharacterCards,
    `There should be exactly ${expectedQuantity} created character card(s)`,
  ).toHaveCount(expectedQuantity);
}
