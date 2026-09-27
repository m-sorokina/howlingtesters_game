# Fight Rules – Dragon Battle

---

## 1. Setup

### 1.1 Team

- Characters are loaded from `localStorage` key `"characters"`.
- Each character has: **name**, **race**, **class**, **strength**, **agility** (or dexterity), **energy**, **health**, **imgSrc**.

### 1.2 Race Bonuses (applied before battle)

| Race              | Bonus       |
| ----------------- | ----------- |
| Human / Człowiek  | Strength +2 |
| Elf               | Energy +2   |
| Orc / Ork         | Strength +2 |
| Dwarf / Krasnolud | Health +2   |

### 1.3 Dragon Creation (local, no API)

- **Random image:** 1–4 → `dragon1.jpg` … `dragon4.jpg`
- **Base stats (random ranges):**

| Stat     | Range |
| -------- | ----- |
| Strength | 25–30 |
| Agility  | 20–35 |
| Energy   | 25–35 |
| Health   | 60–70 |

- **Image bonus (+5):**
  - Image 1 → Health +5
  - Image 2 → Agility +5
  - Image 3 → Energy +5
  - Image 4 → Strength +5

---

## 2. Turn Order

- **Party has Scout:** Party attacks first, then dragon.
- **Party has no Scout:** Dragon attacks first, then party.

---

## 3. Party Turn

### 3.1 Character Order

- Random order each round.

### 3.2 Confusion (Scout only)

- Scout rolls **2d20**, takes the **lower**.
- Others roll **1d20**.
- If roll > (agility + 10): character is confused and skips the turn.

### 3.3 Energy

- **Energy cost per attack:**
  - Warrior, Mage: 3
  - Scout, Rogue: 2
- **Recovery when skipping:** `min(baseEnergy, 6)` (enough for 3 Scout/Rogue or 2 Warrior/Mage attacks).
- If current energy < cost: character skips and recovers energy.

### 3.4 Attack Stat (for hit check)

| Class              | Attack stat               |
| ------------------ | ------------------------- |
| Warrior / Wojownik | Strength                  |
| Rogue / Łotrzyk    | Agility                   |
| Mage / Czarodziej  | Base energy (not current) |
| Scout / Zwiadowca  | max(Strength, Agility)    |
| Default            | Strength                  |

### 3.5 Hit Check

- Roll **d20**.
- **Rogue:** Hits on 18–20 (crit) **or** roll < attack stat.
- **Others:** Hits if roll < attack stat.

### 3.6 Damage by Class

| Class              | Damage |
| ------------------ | ------ |
| Warrior            | 3–8    |
| Scout (str ≥ agi)  | 4–7    |
| Scout (str < agi)  | 5      |
| Rogue (normal hit) | 5      |
| Rogue (crit 18–20) | 8      |
| Mage               | 2–5    |
| Default            | 3–5    |

### 3.7 Mage Stun

- On hit, Mage rolls **d20**.
- Stun threshold: `max(1, max(energy/2 - 5, 5))`.
- If roll < threshold: dragon is stunned and skips its next turn.

### 3.8 Scout Energy Drain

- On hit, Scout reduces dragon energy by 3.

---

## 4. Dragon Turn

### 4.1 Stun

- If stunned: dragon skips turn and stun is cleared.

### 4.2 Energy

- **Cost per attack:** 3.
- **Recovery when skipping:** +20 energy.
- If energy < 3: dragon skips and recovers 20 energy.

### 4.3 Attack Type (d20)

- Roll ≤ 4: **Fire breath** (AoE).
- Roll > 4: **Single-target attack**.

### 4.4 Fire Breath

- Damage: **3–5** to **all** party members.
- No dodge.

### 4.5 Single-Target Attack

- Target: random alive character.
- **Base damage:**
  - `baseDmg = max(dragonStr - charStr, 0)`
  - If target is Warrior: `baseDmg = max(baseDmg, floor(dragonStr × 0.5))`
  - If `baseDmg < 5`: `baseDmg = random(5, 10)`
- **Final damage:**
  - `minDmg = min(floor(baseDmg × 0.75), baseDmg)`
  - `dmg = random(minDmg, baseDmg)`
  - `minDmgFromOpponent = floor(charStr/4) + 2`
  - `dmg = max(dmg, minDmgFromOpponent)`

### 4.6 Dodge

- Defense chance: `agility - (dragonAgility - agility) - 8`, clamped to **1–12**.
- Roll **d20**.
- If roll < defense chance: character dodges (no damage).

---

## 5. Victory / Defeat

- **Victory:** Dragon health ≤ 0.
- **Defeat:** All party members have health ≤ 0.

---

## 6. Dice

- **d20:** `random(1, 20)`.
- **randomInRange(min, max):** inclusive integer in [min, max].
