# Secure Public Data Dashboard (Slovakia)
**Alias:** "Palantir-style" GovTech Dashboard

> **TENTO SÚBOR MUSÍ BYŤ PREČÍTANÝ NA ZAČIATKU KAŽDEJ NOVEJ RELÁCIE (SESSION).**  
> Určuje kontext projektu, naše technologické štandardy a metodiku vývoja. Nenechávame priestor na omyly.

---

## 🏛️ O Projekte
Účelom tohto projektu je vybudovať real-time, vizuálne atraktívny (dark-mode, premium) dashboard pre štátnu správu SR (Obce, VÚC, Štátne registre, Centrálny register zmlúv (CRZ), Verejné obstarávania).
Aplikácia agreguje tieto verejné dáta a poskytuje analytikom pokročilé možnosti vyhľadávania a analýzy vzťahov (sieťové grafy, toky financií).
Vzhľad sa inšpiruje analytickými platformami typu Palantir (hlboké tmavé UI, vysoký kontrast, zameranie na dáta, modré/akcentové farby, profesionálna typografia).

---

## 🛠️ Tech Stack & Architektúra
- **Frontend Framework:** React 18+ (s funkcionálnymi komponentmi a Hooks).
- **Jazyk:** TypeScript (striktné typovanie je podmienkou).
- **Build Tool:** Vite (rýchle HMR a build).
- **Styling:** **Vanilla CSS** (žiadny Tailwind, Bootstrap ani iné knižnice okrem vyžiadaných). Používame CSS premenné (Design Tokeny) definované v `Layout.css` (napr. `--pt-color-bg-base`, `--pt-color-accent`). Všetky komponenty musia striktne nasledovať tento dizajnový jazyk.
- **Dáta (Súčasnosť):** Všetky moduly aktuálne spúšťame nad **Mock dátami** (napr. `src/data/mockContracts.ts`). Akékoľvek nové moduly musia najprv dostať mock data a až v neskorších fázach sa napoja na reálne APIs (napr. Slovensko.Digital API).
- **Testovanie:** Vitest a `@testing-library/react`.

---

## 🔒 Naša Metodika Vývoja: Secure TDD (Test-Driven Development)
Nesmieme napísať ani riadok produkčného kódu bez toho, aby sme prešli TDD cyklom. Postupujeme podľa `/.agents/workflows/tdd-process.md`:

1.  **Red Phase:** Vyberieme si malú vlastnosť na implementáciu (napr. zobrazenie novej tabuľky). **Napíšeme zlyhávajúci test** (skript: `npx vitest run xyz`). Cieľom je definovať, ako má kód fungovať predtým, než ho vôbec napíšeme.
2.  **Green Phase:** Napíšeme iba ten najnutnejší React/TS kód potrebný na to, aby test prešiel. Dôraz sa kladie na bezpečnosť (žiadna priama manipulácia dom, bezpečné spracovanie vstupov). Otestujeme ho (musí zbehnúť na zeleno).
3.  **Refactor Phase:** Uhladíme kód, vyčistíme CSS (pridáme správny "Palantir" vzhľad), skontrolujeme TypeScript typovanie. Spustíme testy znova, aby sme sa uistili, že sme nič nepokazili.
4.  **Visual Verification Phase:** Vždy po dokončenom module sa zavolá **automatizovaný prehliadač (`browser_subagent`)**, naloguje sa do aplikácie, pozrie si danú novú vizuálnu zmenu, klikne/filtruje a odfotí výsledok (`screenshot`) na overenie, že bol Palantir-dizajn správne aplikovaný a zarovnaný. Nestaviame veci naslepo.

---

## 🚀 Súčasný Stav a Ďalší Postup
Projekt používame na trackovanie úloh dokument `task.md` (v zložke s artefaktami) a každý míľnik nahrávame do `walkthrough.md`.

**Dokončené veci (Čo funguje):**
- **Core Security:** Funkčný (zatiaľ mock) `LoginForm.tsx`, ktorý chráni celú analytickú časť za prihlasovacím oknom.
- **Core Layout (Fáza 1):** Tmavý Palantir-style layout s `TopBar` a navigáciou v `Sidebar`.
- **Contracts (Fáza 2):** Implementovaná `DataTable` pre pamäťovo efektívne prehľadávanie a filtrovanie mockup-zmlúv podľa štruktúry CRZ.

**Nasledujúce Veci (Na čom budeš pokračovať, prípadne o čo si požiada používateľ):**
1.  **Fáza 3 - Entity Graph (Sieťová Analýza):** Začíname s modulom Analýzy prepojení. Vstúp do Red-Fázy pre inicializáciu prázdneho grafového okna/komponentu. Následne zistíme, akú vizualizačnú knižnicu pripojíme (napr. `react-flow-renderer`, poprípade iný vhodný engine).
2.  **Fáza 4 - Modul Subjekty:** Prehľad inštitúcií, VÚC a miest obohatený o verejné štatistiky.
3.  **Fáza X - API Integration:** Pripojenie na reálne back-end JSON dáta.

---

## ⚠️ Zásady
*   **Nikdy** neupravuj produkčný kód predtým, ako je jasne dohodnutá požiadavka v štádiu plánu.
*   **Vždy** rob vizuálne ukážky (cez screenshot robota).
*   Ak nájdeš chybu Linteru alebo Type Error, fixni ju a re-verifikuj cez testy, nepokračuj v práci so skrytými varovaniami. Vždy čisti chyby!
