import { CreateCharacterComponent, MessagePopupComponent, CharacterList } from '@components';
import type { CharacterType } from '@types';
import { BasePage } from '@pages';
import type { Page, Locator } from '@playwright/test';
import { routes } from '@consts';

export class CreateTeam extends BasePage {
  readonly url = routes.createCharacter;
  public createCharacterForm: CreateCharacterComponent;
  public messagePopup: MessagePopupComponent;
  public characterList: CharacterList;

  constructor(page: Page) {
    super(page);
    this.createCharacterForm = new CreateCharacterComponent(this.page.locator('#character-creator'));
    this.messagePopup = new MessagePopupComponent(this.page.locator('#popup'));
    this.characterList = new CharacterList(page.locator('#character-list'));
  }

  get createTeamHeader(): Locator {
    return this.page.locator('.team-header');
  }

  get createTeamHeaderTitle(): Locator {
    return this.createTeamHeader.getByRole('heading', { level: 1 });
  }

  get createTeamHeaderText(): Locator {
    return this.createTeamHeader.locator('p');
  }

  get goToBattleButton(): Locator {
    return this.page.locator('#go-to-fight');
  }

  async createCharacter(characterToCreate: CharacterType): Promise<void> {
    await this.createCharacterForm.createCharacter(characterToCreate);
  }
}
