import type { Locator } from '@playwright/test';
import { expect } from '@fixtures';
import type { Character } from '@models';

export function assertCharacterCardDetails(characterToCreate: Character, createdCharacter: Character): void {
  expect(characterToCreate, 'Created character details should be equal to').toEqual(createdCharacter);
}

export async function assertCharacterCardVisibility(createdCharacterName: Locator): Promise<void> {
  await expect(createdCharacterName, 'Created character card should be visible').toBeVisible();
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
