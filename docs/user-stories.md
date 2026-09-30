# User Stories

User stories for the Howling Testers game, grouped by page. Each story lists its acceptance criteria and the
automated tests that cover them.

**Legend**

- `[x]` covered by an automated test
- `[ ]` not covered yet, but the behaviour exists in the application
- `[?]` behaviour not found in the application - needs a product decision before it can be tested

Test references use the spec file and the test title, so they can be found with a search and they break
visibly when a test is renamed.

---

# Part 1 - Character creator (`/party`)

## User Story #1: Creating a character

**As** a user
**I want** to be able to create a character with a name, race, class and stats
**So that** I can build my party

### Acceptance criteria:

- [x] I should be able to type the character's name (field with the placeholder "Enter name...")
- [x] I should be able to choose a race from the list: Human, Elf, Dwarf, Orc
- [x] I should be able to choose a class: Warrior, Rogue, Mage, Scout
- [x] I should be able to distribute 15 points across the stats: Strength, Agility, Energy, Health
- [x] I should be able to add a character to the party after filling out the form
- [x] I should be able to create multiple characters (up to 4)
- [ ] All texts should be displayed correctly before and after adding a character

### Tests

- [x] `create-character.spec.ts` > "Player is able to create up to 4 characters" - creates one character per
      race/class pairing and verifies each card's name, image, race, class and stats
- [x] `create-character.spec.ts` > "Player is able to distribute the points across the stats"
- [ ] `create-character.spec.ts` > "Page text is correctly displayed before and after adding a character" -
      currently `test.skip`, looking for a better approach

## User Story #2: Displaying the character list

**As** a user
**I want** to see the list of my created characters
**So that** I can manage the party

### Acceptance criteria:

- [x] I should see a list of all created characters
- [x] Each character should display: name, race, class and stats
- [x] The list should be updated after a new character is added

### Tests

Covered through `assertCharacterCard` and `assertCharacterCardQuantity` rather than by a dedicated spec:

- [x] `create-character.spec.ts` > "Player is able to create up to 4 characters" - the count and the card
      contents are asserted after every single addition
- [x] `party-managment.spec.ts` > "Player is able to remove a character from the list of 4 and add the next
      character" - the remaining cards keep their values after the list changes

## User Story #3: Removing a character

**As** a user
**I want** to be able to remove a character from the party
**So that** I can modify the party composition

### Acceptance criteria:

- [x] I should be able to remove a character from the list
- [x] After removal, the character should disappear from the list
- [x] I should be able to add a new character after a removal

### Tests

- [x] `party-managment.spec.ts` > "Player is able to remove all the characters from the list" - removes all
      four one by one, asserting the count after each removal
- [x] `party-managment.spec.ts` > "Player is able to remove a character from the list of 4 and add the next
      character"

## User Story #4: Form validation

**As** a user
**I want** to receive error messages
**So that** I know what I have to correct in the form

### Acceptance criteria:

- [x] I should receive a message if I haven't selected a class
- [x] I should receive a message if I haven't distributed all the points
- [x] I should receive a message if I try to add a 5th character
- [x] I should receive a message if the name is already taken
- [x] The character should not be created while the message is shown

### Tests

All four assert the popup's title, message and button label against `content.partyErrorMessages`, then close
the popup and confirm the character count did not change:

- [x] `create-validation.spec.ts` > "Player is not able to create a character with empty class"
- [x] `create-validation.spec.ts` > "Player is not able to create a character with remain stats point to send"
- [x] `create-validation.spec.ts` > "Player is able to create maximum of 4 characters"
- [x] `create-validation.spec.ts` > "Player is not able to create a character with the already existed name"

## User Story #5: Managing stat points

**As** a user
**I want** to see how many points are left to distribute
**So that** I can distribute the stats correctly

### Acceptance criteria:

- [x] I should see the counter of remaining points (start: 15)
- [x] The counter should update when stats change
- [x] I should not be able to submit a character while points remain
- [?] I should not be able to exceed the available points - each stat input caps at 20, but the form's own
  upper bound is not asserted anywhere

### Tests

- [x] `create-character.spec.ts` > "Player is able to distribute the points across the stats" - asserts the
      counter before and after distribution, and that the total spent equals `STAT_POINTS`
- [x] `create-validation.spec.ts` > "Player is not able to create a character with remain stats point to send"

## User Story #6: Saving the party

**As** a user
**I want** my party to be saved in localStorage
**So that** I don't lose data after refreshing the page

### Acceptance criteria:

- [x] The party should be saved in localStorage
- [x] After refreshing the page the party should be restored
- [ ] Data should be preserved between sessions

### Tests

No dedicated spec, but every suite depends on this: each `beforeEach` writes the party into `localStorage`,
reloads, and then finds the characters rendered. A character created through the form is also written to
storage with an `imgSrc` the application derives from its class.

## User Story #7: Character limit

**As** a user
**I want** to be able to create a maximum of 4 characters
**So that** I have a balanced party

### Acceptance criteria:

- [x] I should be able to create at most 4 characters
- [x] I should receive a message about reaching the limit
- [?] After adding the 4th character, the "Add character" button should be disabled - the button stays
  enabled and the limit is enforced with a popup instead

### Tests

- [x] `create-character.spec.ts` > "Player is able to create up to 4 characters"
- [x] `create-validation.spec.ts` > "Player is able to create maximum of 4 characters"

## User Story #8: Editing a character

**As** a user
**I want** to be able to edit an existing character
**So that** I can fix mistakes without removing and creating it again

### Acceptance criteria:

- [?] I should be able to click on a character in the list to edit it
- [?] The form should be filled with the selected character's data
- [?] I should be able to change the data and save the changes
- [?] The changes should be visible in the character list

No edit control was found on a character card - only a remove button. Needs a product decision.

## User Story #9: Resetting the form

**As** a user
**I want** to be able to reset the form
**So that** I can quickly start creating a new character

### Acceptance criteria:

- [?] I should be able to reset the form to default values
- [?] After the reset all fields should go back to their initial values
- [?] Stat points should go back to 15

No reset control was found on the form. Needs a product decision.

## User Story #10: Displaying character details

**As** a user
**I want** to see detailed information about a character
**So that** I can manage the party better

### Acceptance criteria:

- [x] I should see the details of each character in the list
- [x] The details should include: name, race, class, all stats
- [x] The class should be shown as an image with the class name as its `alt`
- [?] I should be able to see a summary of the stat points - no such summary exists on a card

### Tests

- [x] `create-character.spec.ts` > "Player is able to create up to 4 characters" - via `assertCharacterCard`,
      which also asserts the image actually loaded

---

# Part 2 - Battle page (`/party-fight`)

## User Story #11: Bringing the party into battle

**As** a user
**I want** to take my created party to the battle page
**So that** I can fight with the characters I built

### Acceptance criteria:

- [x] I should be able to go from the creator to the battle page with the "Go to battle" button
- [x] I should see one card per character in my party
- [x] Each card should show the same name, race and class as in the creator
- [x] Each character should receive a race bonus of +2 to one stat: Human and Orc to Strength, Elf to Energy,
      Dwarf to Health
- [x] The class should not change any stat
- [?] The bonus is applied with no upper bound, so a stat created at the form's maximum of 20 is shown as 22
  on the battle page - the form limit and the battle page disagree

### Tests

- [x] `battle-navigation.spec.ts` > "Player is able to navigate to the battle page" - expectations are built
      from the preseed data through `withRaceBonus`, so the bonus is asserted per character

## User Story #12: Drawing an opponent

**As** a user
**I want** to draw a dragon to fight
**So that** I know who I am up against before starting

### Acceptance criteria:

- [x] I should see no dragon stats before I draw
- [x] I should be able to draw an opponent with the "Draw opponent" button
- [x] I should see the dragon's image and its four stats: Strength, Agility, Energy, Health
- [x] Every dragon stat should be a positive number
- [x] After the draw I should see "Fight", "Fight without music" and "Back to creator"
- [x] Drawing a new opponent should give a different dragon

### Tests

- [x] `battle-management.spec.ts` > Full party of four > "Player is able to draw opponent"
- [x] `battle-management.spec.ts` > Full party of four > "Player is given a new dragon and a restored team
      after drawing the next opponent"

The dragon's stats are random per draw, so they are asserted as positive numbers rather than against fixed
values, and the comparison between two draws is a soft assertion.

## User Story #13: Starting a battle

**As** a user
**I want** to start the battle with or without music
**So that** I can watch the fight the way I prefer

### Acceptance criteria:

- [x] Starting with "Fight" should show "Skip battle" and "Mute music"
- [x] Starting with "Fight without music" should show "Skip battle" but no "Mute music"
- [x] The battle log should become visible when the battle starts
- [x] "Draw opponent", "Fight", "Fight without music" and "Back to creator" should be hidden during the battle
- [ ] The music should actually play and stop - only the button's visibility is asserted, not the audio

### Tests

- [x] `battle-management.spec.ts` > Full party of four > "Player is able to start the battle with music"
- [x] `battle-management.spec.ts` > Full party of four > "Player is able to start the battle without music"

## User Story #14: Finishing a battle and facing the next opponent

**As** a user
**I want** to see the outcome and be offered another opponent
**So that** I can keep playing after a fight ends

### Acceptance criteria:

- [x] When the battle ends I should see "Draw next opponent" and "Back to creator"
- [x] The battle log should stay visible with the result
- [x] "Skip battle", "Mute music", "Fight" and "Fight without music" should be hidden
- [x] I should be able to skip a running battle and reach the same end state
- [x] Drawing the next opponent should restore every character to its starting stats
- [x] Drawing the next opponent should bring a dragon with different stats
- [ ] The result should read "Victory! Congratulations!" or "Defeat. Better luck next time!" - the outcome is
      random, so the message is not asserted

### Tests

- [x] `battle-management.spec.ts` > Full party of four > "Player is offered the next opponent when the battle
      ends" - waits for a whole battle, which takes about a minute
- [x] `battle-management.spec.ts` > Full party of four > "Player is given a new dragon and a restored team
      after drawing the next opponent" - uses `skipBattle()` to reach the end state in seconds

Note: the character cards are live during a battle - Energy and Health drop as the fight goes on, and both are
restored when the next opponent is drawn.

## User Story #15: Returning to the creator

**As** a user
**I want** to go back to the creator from the battle page
**So that** I can change my party between fights

### Acceptance criteria:

- [x] I should be able to return to the creator before a battle ("Back to creator")
- [x] I should be able to return to the creator once a battle has finished
- [x] The creator should show my characters with the values I originally created
- [x] Neither the race bonus nor the battle damage should be written back to my characters
- [x] Going back to the battle page should give a clean state: no dragon stats, no battle log

### Tests

- [x] `battle-navigation.spec.ts` > "Player is returned to the creator with the originally created characters" -
      expectations are built without `withRaceBonus`, which is what proves the bonus is display-only

Note: the page uses two different buttons for this - `#back-btn` before and during setup, and
`#back-after-battle-btn` once the battle is over.

## User Story #16: Battling with an incomplete party

**As** a user
**I want** clear behaviour when my party is not full
**So that** I know whether I can fight and what to fix

### Acceptance criteria:

- [x] I should be able to start a battle with fewer than four characters
- [x] With an empty party I should see the "No characters" message when I try to start a battle
- [x] With an empty party the battle should not start
- [x] I should be able to close that message
- [?] With an empty party I can still draw an opponent, and "Go to battle" in the creator is not blocked -
  the guard sits only on starting the battle

### Tests

- [x] `battle-management.spec.ts` > Party of three > "Player is able to start the battle with fewer than four
      characters"
- [x] `battle-management.spec.ts` > Empty party > "Player is told the team is empty when starting a battle"

---

# Not covered

Behaviour that exists but is deliberately left untested:

- **"Draw an opponent first!"** - the battle page has this popup, but the fight buttons only appear after a
  draw, so a user cannot reach it. Defensive code.
- **"Dragon error"** - shown when the dragon API returns no valid health. There is no API to drive yet.
- **Battle log contents** - the log holds one rolling line, typed out character by character. Asserting it
  needs a retrying matcher, and the text depends on random hits and misses.
- **Cookie consent** - handled once in `cookies.setup.ts` and reused through `storageState`, so the banner is
  not asserted in the suites.
