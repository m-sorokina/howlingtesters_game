Feedback do frameworku Playwright — Howling Testers Game

Poniżej lista rzeczy do poprawy / przemyślenia w kodzie. Przy każdym punkcie jest odniesienie do pliku.

Co jest na plus!

- Komponenty + dane we własnym typie - dobrze porządkuje kod
- Ciekawe podejście w konstruktorze `[CharacterComponent](../src/components/character.component.ts)` (filtrowanie karty po nazwie)
- Typy w `[character.type.ts](../src/types/character.type.ts)` — dobry balans KISS / DRY
- Konfiguracja przez `.env`
- Projekt z konfiguracją TS + Prettier + SLINT + Husky
- Dobra struktura plików
- Własny fixture!
- Ustawienie storage state
- Własne komunikaty błędów!

Moje pytania:

1. Czy świadomie używasz kompozycji?
2. Czy znasz różnicę między type a interface?
3. Czy wiesz czym różni się TS i JS?
4. Czy wiesz jak działa konfiguracja TS/JS?
5. Czy znasz różnicę między await expect a expect(await)
6. Czy wiesz jak działa Playwright pod spodem (faza discovery, komunikacja z przeglądarką)
7. Czy wiesz jak działa asynchroniczność?
8. Dlaczego fullyParallel: false?
9. Dlaczego reporter list?
10. Jaki był cel dodawania tagów?

## Do poprawy

~~### 1. Dane tekstowe — czytelność~~

**Plik:** `[data/textAssertions.json](../data/textAssertions.json)`

Jeden plik zbiera naraz teksty z headera, formularza, błędów, listy postaci i przycisków. Trudno to czytać i utrzymywać.

**Co zrobić:** rozbij na mniejsze pliki (np. per strona / per obszar: header, formularz, błędy, karta postaci) albo przygotuj strukturę pod locale (`en`, `pl`).

---

~~### 2. Storage state — sformatuj i uporządkuj~~

**Pliki:**

- `[data/characters-limit.json](../data/characters-limit.json)` (ok. L9)
- `[data/characters-list.json](../data/characters-list.json)` (ok. L9)

Wartość w `localStorage` to jeden długi, zminifikowany string — w PR praktycznie nie da się tego zreviewować („ciasteczka” / dump stanu).

**Co zrobić:** sformatuj (beautify) albo trzymaj źródło seeda w czytelnej formie i generuj z niego `storageState`. Warto też dodać ciasteczko, żeby automatycznie zamykać popup.**

---

~~### 3. Nazwy plików seedów są niejasne~~

**Pliki:** `[data/characters-list.json](../data/characters-list.json)` vs `[data/characters-limit.json](../data/characters-limit.json)`

Z nazw nie wynika, czym się różnią (3 postacie na listę vs 4 postacie pod limit).

**Co zrobić:** nazwij pliki po intencji, np. `preseeded-party-3.json` / `preseeded-party-full-4.json`.

---

~~### 4. `BaseComponent.waitFor` — czy na pewno potrzebne?~~

**Plik:** `[src/components/base.component.ts](../src/components/base.component.ts)` (ok. L8)

Metoda domyślnie czeka na `visible`, a caller i tak często przekazuje znowu `{ state: 'visible' }` (np. w fixture). Playwright i tak auto-waituje przy akcjach i asercjach.

**Co zrobić:** usuń zbędny wrapper albo zostaw jawne czekanie tylko tam, gdzie jest realny race (np. popup).

---

~~### 5. Lokatory oparte o tekst~~

~~**Plik:** `[src/components/character.component.ts](../src/components/character.component.ts)` (ok. L18)~~

`getByText(/Race:/)` / `Class:` — kruche przy zmianie copy lub lokalizacji. Takie lokatory „blokują” łatwą zmianę UI. Dla mnie struktura z trzymaniem lokatorów w getach jest mało czytelna i może prowadzić do szybkiego puchnięcia Page Objects.

**Co zrobić:** preferuj `getByRole` / `data-testid`. Jeśli tekst musi zostać — bierz go z warstwy i18n / pliku asercji, nie z hardcodowanego regexa w komponencie.

---

~~### 6. Brakujące `index.ts`~~

W części katalogów są barrel exports (`components`, `pages`, `types`, `models`), w innych nie (`helpers`, `consts`, `fixtures`, `config`).

**Co zrobić:** ujednolić konwencję — albo wszędzie `index.ts`, albo świadomie deep importy wszędzie.

---

### 7. Mutacja argumentu w `distributePoints`

**Plik:** `[src/helpers/distribute-points.ts](../src/helpers/distribute-points.ts)` (ok. L5)

Funkcja zmienia przekazany obiekt `stats` w miejscu (side-effect). Łatwo o niespodzianki, gdy ten sam obiekt jest używany dalej w teście. Sama funkcja jest ciekawa, ale porozmawiałbym o jej zastosowaniu w praktyce:)

---

~~### 8. API `createCharacter` na page~~

**Plik:** `[src/pages/create-team.page.ts](../src/pages/create-team.page.ts)` (ok. L44)

Warto przemyśleć:

- czy metoda powinna **zwracać** `CharacterComponent`,
- czy potrzebne jest dodatkowe wywołanie przez formularz (`createCharacterForm.createCharacter`), a potem osobne tworzenie komponentu karty.

W testach raz używasz facade’a page, a raz ręcznie wypełniasz formularz krok po kroku — API jest niespójne.

**Co zrobić:** ustal jedną ścieżkę happy-path i trzymaj się jej; wyjątki (np. limit + popup) opisz świadomie.

---

~~### 9. Asercje w specu + brak wspólnego pliku asercji~~

**Plik:** `[tests/create-character.spec.ts](../tests/create-character.spec.ts)` (ok. L12–L13)

Lokalny `assertCreatedCharacter` miesza setup testu z warstwą asercji. Część sprawdzeń i tak to zwykłe `expect` — warto wiedzieć, _dlaczego_ jest wrapper.

**Co zrobić:** wyciągnij asercje do osobnego pliku, np. `src/assertions/character.assertions.ts`, i reuse’uj je w innych specach zamiast kopiować checki.

---

~~### 10. Wielokrotne szukanie tej samej listy postaci~~

**Plik:** `[tests/create-character.spec.ts](../tests/create-character.spec.ts)` (ok. L96)

Przy tworzeniu 4 postaci / asercjach szkoda odpytywać tę samą listę wiele razy.

**Co zrobić:** pobierz / zmapuj karty raz (np. `getAllCharacterCards()` na page) i na tym rób asercje.

---

### 11. Test `@page-render` a komponenty

**Plik:** `[tests/create-character.spec.ts](../tests/create-character.spec.ts)` (ok. L117)

Test tekstów strony jest niedokończony (`To be continued…`). To dobry moment, żeby zdecydować:

- co jest page, a co osobnym komponentem (np. header),
- gdzie żyją asercje tekstów (page / component / assertions).

**Co zrobić:** dokończ test dopiero po ustaleniu granic komponentów i warstwy asercji.

---

~~### 12. `Promise.all` przy click + popup~~

**Plik:** `[tests/limit-character.spec.ts](../tests/limit-character.spec.ts)` (ok. L21)

Warto umieć wyjaśnić, **jaka jest przewaga** `Promise.all` w tym miejscu (ochrona przed race: waiter startuje równolegle z akcją).

Jeśli popup zostaje na ekranie, często wystarczy `click()` + `expect(...).toHaveText(...)` (auto-wait). `Promise.all` ma największy sens przy nawigacji, downloadach, response’ach sieciowych.

**Co zrobić:** zostaw `Promise.all` tylko jeśli jest realny race; w przeciwnym razie uprość. Jeśli zostaje — trzymaj konwencję „najpierw waiter, potem akcja”.

---

~~### 13. Nazwa testu nie pokrywa się z jego działaniem~~

**Plik:** `[tests/create-character.spec.ts](../tests/create-character.spec.ts)` (ok. L53)

Test: `'Player is able to see all options are visible in the create form'`.

Nazwa mówi o **widoczności** opcji w formularzu. Test robi coś innego: iteruje rasy i klasy, **wybiera** każdą z nich i asertuje wartość selecta / klasę `selected`. Nie sprawdza, czy opcje są widoczne na starcie.

**Co zrobić:** albo zmień nazwę na to, co naprawdę testujesz (np. że da się wybrać każdą rasę i klasę), albo zmień asercje na faktyczną widoczność opcji — bez klikania po kolei. Takie klikanie to testowanie działania listy typu dropdown - nie wiem czy testy Playwright'a to dobre miejsce na coś takiego. Tu zdecydowanie bardziej przydałyby się testy jednostkowe.

---

~~### 14. Dużo testów, a brak jednego spójnego scenariusza~~

**Pliki:**

- `[tests/create-character.spec.ts](../tests/create-character.spec.ts)` — tworzy 1 postać / tworzy 4 i asertuje **na końcu**
- `[tests/list-character.spec.ts](../tests/list-character.spec.ts)` — lista z seeda (3), detale kart, dopisanie 1. do seeda
- `[tests/limit-character.spec.ts](../tests/limit-character.spec.ts)` — seed 4 + próba 5.

Dużą część da się skrócić do **jednego** scenariusza: dodaj 4 postacie i **po każdym dodaniu** sprawdź listę (liczba kart + nowa postać). Żaden z obecnych testów tego nie pokrywa — „4 postacie” asertuje dopiero na końcu, „update listy” dokłada jedną do seeda.

**Co zrobić:** złóż happy-path w jeden test (create → assert listy, 4 razy). Resztę zostaw tylko tam, gdzie jest inny cel (limit/popup, same opcje formularza, same teksty strony).

---

### 15. Podzielić testy na Given When Then
