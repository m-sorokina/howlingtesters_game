# User Stories - Character Creator

This document contains user stories for the Character Creator application.

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
- [ ] I should be able to create multiple characters (up to 4)
- [ ] All texts should be displayed correctly before and after adding a character

-
- [x] **1 test** - happy path - create one character, verify its visibility and the properties values

- [x] **2 test** - verify the create character form fields' visibility and available values to select
- [x] **3 test** - verify points value
- [ ] **4 test** - verify 4 characters creation

- [ ] **5 test** - page rendering before/after creation

## User Story #2: Displaying the character list

**As** a user
**I want** to see the list of my created characters
**So that** I can manage the party

### Acceptance criteria:

- [ ] I should see a list of all created characters
- [ ] Each character should display: name, race, class and stats
- [ ] The list should be updated after a new character is added

## User Story #3: Removing a character

**As** a user
**I want** to be able to remove a character from the party
**So that** I can modify the party composition

### Acceptance criteria:

- [ ] I should be able to remove a character from the list
- [ ] After removal, the character should disappear from the list
- [ ] I should be able to add a new character after a removal

## User Story #4: Form validation

**As** a user
**I want** to receive error messages
**So that** I know what I have to correct in the form

### Acceptance criteria:

- [ ] I should receive a message if I haven't selected a class
- [ ] I should receive a message if I haven't distributed all the points
- [ ] I should receive a message if I have exceeded the points limit
- [ ] I should receive a message if I try to add a 5th character

## User Story #5: Managing stat points

**As** a user
**I want** to see how many points are left to distribute
**So that** I can distribute the stats correctly

### Acceptance criteria:

- [ ] I should see the counter of remaining points (start: 15)
- [ ] The counter should update when stats change
- [ ] I should not be able to exceed the available points

## User Story #6: Saving the party

**As** a user
**I want** my party to be saved in localStorage
**So that** I don't lose data after refreshing the page

### Acceptance criteria:

- [ ] The party should be saved in localStorage
- [ ] After refreshing the page the party should be restored
- [ ] Data should be preserved between sessions

## User Story #7: Character limit

**As** a user
**I want** to be able to create a maximum of 4 characters
**So that** I have a balanced party

### Acceptance criteria:

- [ ] I should be able to create at most 4 characters
- [ ] After adding the 4th character, the "Add character" button should be disabled
- [ ] I should receive a message about reaching the limit

## User Story #8: Editing a character

**As** a user
**I want** to be able to edit an existing character
**So that** I can fix mistakes without removing and creating it again

### Acceptance criteria:

- [?] I should be able to click on a character in the list to edit it
- [?] The form should be filled with the selected character's data
- [?] I should be able to change the data and save the changes
- [?] The changes should be visible in the character list

## User Story #9: Resetting the form

**As** a user
**I want** to be able to reset the form
**So that** I can quickly start creating a new character

### Acceptance criteria:

- [?] I should be able to reset the form to default values
- [?] After the reset all fields should go back to their initial values
- [?] Stat points should go back to 15

## User Story #10: Displaying character details

**As** a user
**I want** to see detailed information about a character
**So that** I can manage the party better

### Acceptance criteria:

- [x] I should see the details of each character in the list
- [x] The details should include: name, race, class, all stats
- [?] I should be able to see a summary of the stat points
