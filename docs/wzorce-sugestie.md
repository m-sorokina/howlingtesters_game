# Gdzie użyć którego wzorca (Howling Testers)

Zamiar wzorca (nie sama struktura klas) jak na [Refactoring Guru](https://refactoring.guru/pl/design-patterns).

| Wzorzec                  | Gdzie                                                                                                                                                                                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Most (Bridge)**        | Postać = **klasa** (styl walki) + **rasa** (modyfikator). Dwie hierarchie składane kompozycją, nie klasami typu `OrcWarrior`. Rasa i klasa rozwijają się osobno.                                                                                                              |
| **Budowniczy**           | Składanie **Strength / Agility / Energy / Health** etapami, z pulą, min/max i legalną sumą. Pełny Builder (etapy + ewentualny kierownik) albo w TS skrót: `createStats(partial)` / fluent `.strength(14).build()`.                                                            |
| **Adapter**              | Wojownik już ma `smash()`, łotrzyk `pickLock()`, mag `dispel()`, zwiadowca `findHiddenLever()` — tych metod nie zmieniasz. Kod bramy lochu umie tylko `open()`. Adapter owija postać i tłumaczy `open()` na jej własną metodę, więc brama nie musi znać czterech różnych API. |
| **Iterator**             | **Drużyna** jako kolekcja: przejście bez odsłaniania tablicy. Różne algorytmy: kolejka bitwy (Agility), tylko żywi, katalog postaci                                                                                                                                           |
| **Dekorator**            | Ten sam, reużywalny interfejs `test.step` wokół bazowej akcji (np. `AddDetailsStep` / `CreateCharacterStep`) jako hak do raportu                                                                                                                                              |
| **Fasada**               | Walka ze smokiem to **podsystem** (`DragonStats`, statystyki, log, jakie przedmioty pozostawia po pokonaniu). Klient (UI / e2e) woła tylko `DragonEncounter`: `start`, `heroAttacks`, `dragonActs`, `collectLoot`.                                                            |
| **Metoda wytwórcza**     | Twórca ma logikę **i** metodę, którą podklasa zmienia typ **jednego** produktu. Np. `CreateTeamPage.addButton()`: Chrome zwraca inny lokator niż Firefox, test woła `addButton()` i nie zna konkretnej klasy.                                                                 |
| **Fabryka abstrakcyjna** | Jedna fabryka daje **rodzinę** produktów, żeby nie mieszać wariantów: ork → topór + ciężki pancerz; elf → łuk + lekki pancerz. Rasa × klasa nadal dowolna (Most).                                                                                                             |
| **Strategia**            | Wymienny algorytm w tym samym kontekście: ten sam test / runner, inny scenariusz (tworzenie jednej postaci, wielu, mix losowy). Kontekst nie zna konkretnej strategii.                                                                                                        |
| **Odwiedzający**         | Nowa operacja na stałych elementach bez ich edycji. Strona kreatora, karta, lista, bitwa mają `accept(visitor)` i na tej podstawie zapada deycja o tym, które podejście wykorzystać                                                                                           |

Strategia i odwiedzający to dobre wzorce do wykorzystania przy testach wydajnościowych.

Sprawdź, z których tych wzorców już korzystałaś a które możesz wykorzystać i gdzie.
