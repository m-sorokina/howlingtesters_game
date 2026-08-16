import type { Locator } from '@playwright/test';
import { expect } from '@fixtures/base';
import type { Character } from '@models';
import type { CharacterComponent } from '@components';
import { STAT_KEYS } from '@consts';

export async function assertCharacterCardDetails(
  characterToCreate: Character,
  createdCharacter: CharacterComponent,
): Promise<void> {
  await expect(createdCharacter.name, 'Created character name should match').toHaveText(characterToCreate.name);
  await expect(createdCharacter.race, 'Created character race should match').toHaveText(
    `Race: ${characterToCreate.race}`,
  );
  await expect(createdCharacter.charClass, 'Created character class should match').toHaveText(
    `Class: ${characterToCreate.charClass}`,
  );
  await expect(createdCharacter.stats, `Created character should have ${STAT_KEYS.length} stats`).toHaveCount(
    STAT_KEYS.length,
  );

  for (const [index, key] of STAT_KEYS.entries()) {
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    await expect
      .soft(createdCharacter.stats.nth(index), `Created character stat ${label} should match`)
      .toHaveText([`${label}: ${characterToCreate.stats[key]}`]);
  }
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
