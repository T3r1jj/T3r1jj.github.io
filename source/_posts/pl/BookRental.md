---
title: Projekt BookRental
categories:
    - Dokumentacja
tags:
    - web
    - cms
    - dokumentacja
    - aplikacja
    - baza danych
    - model
lang: pl
date: 2017-11-21 13:00:00
---
[**BookRental**](https://github.com/T3r1jj/BookRental) to jeden ze starszych projektów obejmujących kilka zagadnień JEE. Jego celem było stworzenie systemu zarządzania biblioteką, a konkretniej: książkami, wypożyczeniami, rezerwacjami, użytkownikami oraz pracownikami. Aplikacja realizuje ponad 20 różnych funkcji biznesowych.
Główne technologie użyte w projekcie to: *Java, JSTL, JSF, PrimeFaces, JPA, JDB*. Prezentację aplikacji można obejrzeć w [galerii](/pl/galleries/BookRental/). Momentami nie wygląda ona zbyt atrakcyjnie, gdyż była tworzona na początku nauki JEE i technologii internetowych [2015] (zobacz nowszą aplikację [Develog](https://github.com/T3r1jj/Develog) aby zauważyć różnice).
<!-- more -->

Funkcjonalności zaimplementowane w aplikacji to:
1. Wyświetlanie listy książek. Koszyk z możliwością dodawania i usuwania książek. Możliwość wypożyczenia książek.
2. Zarządzanie książkami w panelu administracyjnym.
3. Rejestracja czytelników. Potwierdzenie rejestracji w panelu administracyjnym. Możliwość zalogowania się na swoje konto. Tylko użytkownicy zalogowani mogą wypożyczać książki.
4. Konta dla pracowników wypożyczalni. Pracownicy mogą zarządzać książkami, czytelnikami i wypożyczeniami. Pracownikami zarządza administrator.
5. Kategorie książek. Kategorie tworzą wielopoziomowe drzewa. Każda książka należy do dokładnie jednej kategorii, Możliwość przeglądania książek według kategorii.
6. Etykiety (tagi) dla książek. Każda książka może być opatrzona wieloma etykietami. Przeglądanie książek według etykiet.
7. Dodatkowe pliki do pobrania przy opisie ksiąski, np.: kody źródłowe programów, próbki muzyki czy filmów. Każdy plik posiada swój opis. Liczba plików nie jest ograniczona.
8. Wyszukiwanie książek na podstawie tytułu, nazwy autora, ISBNu i ewentualnie innych atrybutów.
9. Operatory logiczne typu and, or i not przy wyszukiwaniu.
10. Historia wyszukiwań. Każdy zalogowany użytkownik może zapisać wyniki wyszukiwania w bazie by w innym czasie móc je odtworzyć.
11. Przeglądanie archiwum wypożyczeń czytelnika.
12. Administracja wypożyczeniami. Stany wypożyczeń: książka w magazynie, oczekuje na odbiór (jest na półce czytelnika), wypożyczona. Zmiana stanu wypożyczenia przez pracownika.
13. Stany magazynowe książek. Automatyczna aktualizacja stanów przy wypożyczeniu i zwrocie książki.
14. Możliwość zapisania się do kolejki, gdy danej książki nie ma aktualnie w magazynie.
15. Kary pieniężne za zbyt długie przetrzymywanie książek. Blokada wypożyczeń przy nie zwróceniu książek i niezapłaceniu kary. Maksymalny czas przetrzymywaniu ustawiany przez administratora.
16. Wiadomości redagowane przez administratora i umieszczane na stronie głównej.
17. Wyświetlanie nowości (kilku ostatnio dodanych książek) na stronie głównej.
18. Wybór skórek dla interfejsu użytkownika.
19. Dodatkowa wersja językowa interfejsu użytkownika.

## Projekt
Ze względu na wybrane technologie, wykorzystana została standardowa architektura aplikacji, którą prezentuje poniższy rysunek:  
![Architektura aplikacji BookRental](/images/BookRental/arch.jpg)
<center style="margin-top: -1em;"><small>Źródło: http://www.thejavageek.com</small></center>

Aplikacja wykorzystuje wzorzec MVC, który dzieli się na trzy główne części:
- model *(JPA + EJB)* – reprezentuje dane z bazy danych w postaci logicznej, implementuje funkcje biznesowe;
- widok *(JSF page)* – wyświetla dane modelu;
- kontroler *(JSF bean)* – odbiera dane wejściowe od użytkownika przetwarza je, aktualizuje oraz odświeża model.

Znormalizowany model bazy danych (*3NF* - niepełny, nieznaczna redundancja):
![Model bazy danych](/images/BookRental/db.jpg)

Pewne założenia, które mogłyby wymagać wyjaśnienia:
1. Jeśli książka nie ma numeru ISBN (co się zdarza, choć bardzo rzadko) to należy nadać jej unikalną wartość gdyż książki rozróżniane są po polu ISBN.
2. Egzemplarze tych samych książek nie różnią się numerem ISBN (różnią się numerem id).
3. Do numeru ISBN przypisane są kategoria, tagi i zasoby (np. pliki) oraz rezerwacje w przypadku braku książek w magazynie.
4. Do książki przypisywane są wypożyczenia oraz rezerwacje.

## Struktura

Strukturę projektu przedstawia poniższy rysunek:  
![Struktura projektu](/images/BookRental/struct.jpg)  
Każdemu z pakietów odpowiada inne przeznaczenie:
- Klasy entity - POJO, opakowują dane pobierane z bazy danych w typy abstrakcyjne np. *Book*.
- Klasy session / facade – fasady EJB, pozwalają na komunikację z bazą danych na wyższym poziomie niż JDBC. Beany te działają po stronie serwera i mogą być wstrzykiwane do innych elementów. W tym przypadku adnotowane <code>@Stateless</code> oznaczane jako bezstanowe, pozwalają na implementację serwisów.
- Klasy controller / jsf – kontrolery widoków JSF, ziarna zarządzane *(ManagedBean)*, z deklarowanym zakresem np. *SessionScoped, ViewScoped, ApplicationScoped*, itp. Przechowują stan zgodnie z zakresem i zapewniają komunikację ze stronami JSF. Strony JSF mogą pobierać stan beana za pomocą wyrażenia <code>#{bean.field}</code> (przy założeniu, że zaimplementowano gettery i settery).

Na strukturę ostatniej warstwy – widokowej składają się strony JSF. Do budowania stron JSF wykorzystywany jest system szablonów *Facelets*. W przypadku tego projektu wykorzystana została również open source’owa biblioteka komponentów UI – *PrimeFaces*. Dzięki temu frameworkowi możliwe jest tworzenie bogatszego interfejsu użytkownika.  
![Struktura widoków (1/2)](/images/BookRental/view.jpg)

**WEB-INF** to specjalny folder w strukturze aplikacji, który nie jest dostępny publicznie, nie jest częścią publicznego drzewa dokumentu. Wydzielony został podfolder „view” w folderze WEB-INF a w nim konkretne widoki. Elementy o charakterystycznych nazwach takich jak „Create”, „Edit” czy „View” reprezentują okna (dialog), które poprzez kompozycje włączane są do innych widoków (głównie list) i wyświetlane podczas kliknięcia przycisku. Dla użytkownika dostęp do okien jest sensowny jedynie poprzez widoki, dlatego też zostały one umieszczone w folderze WEB-INF.

Kolejnymi elementami są **szablony**, które również korzystają z mechanizmu kompozycji i użytkownik nie powinien mieć do nich dostępu. Ostatnią częścią składową folderu WEB-INF są strony, do których użytkownik zostaje przekierowany po zalogowaniu się. Informują one między innymi o braku praw do przeglądania strony, zablokowanym czy nieaktywnym koncie, jak też o powodzeniu procesu logowania lub rejestracji.    
![Struktura widoków (2/2)](/images/BookRental/view2.jpg)

Cztery różne szablony podpinane są do stron w zależności od praw dostępu zalogowanego (bądź nie) użytkownika. Wyświetlany format danych również się zmienia, dlatego utworzone zostały różne widoki wyświetlające dane w postaci list. Widoki te korzystają ze wspólnych okien zadeklarowanych w folderze WEB-INF.

## Uwagi

Elementy warte zwrócenia uwagi:
- Hasła **haszowane** funkcją skrótu SHA-256, w kolejnych wersjach aplikacji mogłyby być uzupełnione o sól/sole (ang. salt).
- *OptionsController* ładuje opcje serwisu z pliku na serwerze (np. dane związane z maksymalnym okresem wypożyczenia czy wartością kary za dzień spóźnienia).
- *AuthorizationFilter* – *PhaseFilter* nadzorujący dostępen do stron wymagających określonych uprawnień. Odpowiada za przekierowania w przypadku, gdy nie jest aktywowane lub zostało zbanowane.
- *ThemeSwitcherBean* oraz *LanguageSwitcherBean* zapisują do ciasteczek wybór preferencji dotyczących języka i skórki wybranych przez użytkownika.

Zarządzaniem połączeniem z bazą danych zajmuje się server *Glassfish*. Typ bazy danych to *Java DB*. Typ transakcji to *JTA*, *EntityManager* jest wstrzykiwany poprzez <code>@PersistenceContext</code>.

Po skonstruowaniu ziarna, a przed jego użyciem ustawiony zostanie język (na podstawie ciasteczka lub wcześniej zainicjowanej wartości w przypadku braku ciasteczka). Po zmianie języka tekst wczytywany będzie z odpowiedniego pliku _Bundle*_ z katalogu resources.

![Ciasteczka z wybranym motywem i językiem](/images/BookRental/view2.jpg)

Przy implementacji tego założenia wykorzystana została biblioteka *JSTL* a dokładniej z tagi *fmt*: *setLocale* i *setBundle*, dzięki którym następuje włączenie plików z tłumaczeniem do strony. Umożliwia to korzystanie z tagu message z parametrem *key* – odwzorowaniem z pliku na przetłumaczoną frazę.

Jedną z wad tego projektu jest brak internacjonalizacji (i18n) wiadomości tworzonych przez administratorów. Funkcjonalność ta została przegapiona zarówno w fazie projektowania jak i implementacji. Serwis również nie wygląda zbyt nowocześnie gdyż jest to jeden ze starszych projektów.