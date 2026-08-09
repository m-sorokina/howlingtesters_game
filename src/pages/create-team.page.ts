import { CharacterComponent, CreateCharacterComponent, MessagePopupComponent } from '@/components';
import type { CharacterType } from '@/types';
import { BasePage } from '@/pages';
import type { Page, Locator } from '@playwright/test';
import { routes } from '@/consts/routes';

export class CreateTeam extends BasePage {
  public createCharacterForm: CreateCharacterComponent;
  public messagePopup: MessagePopupComponent;
  readonly url = routes.createCharacter;

  constructor(page: Page) {
    super(page);
    this.createCharacterForm = new CreateCharacterComponent(
      this.page.locator('#character-creator'),
    );
    this.messagePopup = new MessagePopupComponent(this.page.locator('#popup'));
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

  get createdCharactersList(): Locator {
    return this.page.locator('#character-list');
  }

  get createdCharacterCards(): Locator {
    return this.createdCharactersList.locator('.character-card');
  }

  async createCharacter(characterToCreate: CharacterType): Promise<CharacterComponent> {
    await this.createCharacterForm.createCharacter(characterToCreate);
    return new CharacterComponent(this.createdCharacterCards, characterToCreate.name);
  }

  getSpecificCharacterCard(name: string): CharacterComponent {
    return new CharacterComponent(this.createdCharacterCards, name);
  }
}
