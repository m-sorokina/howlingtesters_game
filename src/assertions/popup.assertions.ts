import { expect } from '@fixtures';
import type { ErrorMessage } from '@types';
import { MessagePopupComponent } from '@components';
import { assertElementVisibility } from './general.assertions';

export async function assertErrorPopupContent(messagePopup: MessagePopupComponent, content: ErrorMessage) {
  const { title, message, button } = content;
  await assertElementVisibility(messagePopup.container);
  await expect(messagePopup.title, `Expected message popup title to be ${title}`).toHaveText(title);
  await expect(messagePopup.message, `Expected message popup message to be ${message}`).toHaveText(message);
  await expect(messagePopup.closeButton, `Expected message popup close button to be ${button}`).toHaveText(button);
}
