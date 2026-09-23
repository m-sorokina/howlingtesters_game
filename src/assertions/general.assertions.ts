import { expect } from '@fixtures';
import type { Locator } from '@playwright/test';
import type { State } from '@types';

export async function assertElementVisibility(element: Locator, state: State = 'visible') {
  switch (state) {
    case 'visible':
      await expect(element, `Element ${element} should be visible`).toBeVisible();
      break;
    case 'hidden':
      await expect(element, `Element ${element} should be hidden`).toBeHidden();
      break;
    default:
      throw new Error(`Unexpected element state: ${state}`);
  }
}

export async function assertImageVisibility(image: Locator, alt?: string) {
  await expect(image, 'Image should be visible').toBeVisible();
  if (alt) {
    await expect(image, `Image should have an 'alt' attribute with value: ${alt}`).toHaveAttribute('alt', alt);
  }
  await expect
    .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth), 'Image should be loaded')
    .toBeGreaterThan(0);
}
