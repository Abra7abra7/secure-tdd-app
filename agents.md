# C.O.R.E. OSINT Analytics - Project Documentation

## 1. Architektúra Systému
C.O.R.E. OSINT Analytics je single-page aplikácia (SPA) postavená na modernom React ekosystéme s dôrazom na rýchlosť, bezpečnosť a analytickú prácu s otvorenými zdrojmi.

- **Frontend Framework:** React 18 + Vite
- **Jazyk:** TypeScript
- **State Management:** TanStack React Query (pre správu asynchrónnych dát a cache)
- **CSS a Dizajn:** Custom "Palantir Dark Mode" (militaristický analytický vizuál zameraný na redukciu očnej únavy)
- **Ikony:** Lucide React

## 2. Kľúčové Komponenty a Moduly

### 2.1 TopBar Navigácia (`src/components/layout/TopBar.tsx`)
Aplikácia využíva widescreen (horizontálny) layout. Zrušili sme pôvodný bočný panel na maximalizáciu priestoru pre vizualizácie. Z tohto panela sa ovláda celá sieť.

### 2.2 Dashboard Grid (`src/components/dashboard/DashboardGrid.tsx`)
Základný pohľad s live KPI metrikami (Monitorované Zmluvy, Celkový Objem, Priemerný Ticket). Nachádza sa tu aj **Omnibox (Global Search)**, ktorým vie používateľ na jeden klik vyhľadať akékoľvek textové / IČO vstupy a okamžite ho to presmeruje na modul Subjekty.

### 2.3 Databáza Zmlúv - CRZ (`src/components/contracts/DataTable.tsx`)
Mriežka zameraná na vizualizáciu tabuľkových dát, integrovaná s mock/API dátami (`useContracts`). Podpora filtru, zoradenia a zvýraznenia rizikových (nadlimitných) tendrov.

### 2.4 Entity Lookup (`src/components/entities/EntityLookup.tsx`)
Modul na extrakciu subjektov zo štátneho registra (Slovensko.digital API / mock). Poskytuje podrobnú kartu subjektu po vyhľadaní.

### 2.5 Geo Spatial Map (`src/components/map/GeoMap.tsx`)
Založené na balíku `react-simple-maps` (D3-geo). Vykresľuje topografickú mapu SR s vyznačenými infraštruktúrnymi uzlami ("Radar pings") s interaktívnou telemetriou po kliknutí (súradnice, priorita uzla).

### 2.6 Network Analysis / Entity Graph (`src/components/graph/EntityGraph.tsx`)
Modul postavený na `xyflow/react` (React Flow).
Graf je dynamicky prepojený na zmluvy stiahnuté z nášho dátoveho API. Po načítaní automaticky mapuje:
- Koreň: `SK (Slovenská Republika)`
- Odvetvia a Kategórie: (napr. Stavebníctvo)
- Interaktívne listové uzly a hrany (Edges) reprezentujúce samotné víťazné subjekty tendrov a čísla konkrétnych zmlúv.

## 3. Testovanie a "Secure TDD"
Celý vývoj prebiehal podľa filozofie TDD (Test-Driven Development), čiže testy chránia kód od prvého buildu.

### 3.1 Unit Testing (Vitest & React Testing Library)
Nachádzajú sa tu kritické unitové testy na izolovanej úrovni komponentov (verifikácia renderovania, mockovaného API pre contracts a user flow clickov).
- Príkaz pre beh: `npm run test`

### 3.2 End-to-End Testing (Cypress)
Slúži na simuláciu skutočného analytika. E2E test preskúmava tú najdôležitejšiu (golden path) prierezovú cestičku:
- Autentifikácia -> Dashboard -> Global Search v Omniboxe -> Automatizované presmerovanie na Register s IČOm Vahostavu -> Zobrazenie vojenskej entity card.
- Príkaz pre spustenie headless: `npx cypress run`
- Príkaz pre Cypress UI: `npx cypress open`

## 4. Inštrukcie pre spustenie vývoja

1. Inštalácia závislostí: `npm install`
2. Spustenie vývojového servera: `npm run dev`
3. Aplikácia bude dostupná na: `http://localhost:5173`

## 5. Vývojové a Dizajnové Princípy pre Agentov (Rulebook)
Tieto pravidlá **MUSIA** platiť pri akomkoľvek ďalšom vývoji a úpravách aplikácie:

1. **Secure TDD a Red-Green-Verify Cyklus:**
   - Vývoj prebieha Test-Driven štýlom: Píše sa komponentový izolačný test s minimom domény, alebo prierezový Cypress flow, ktorý zákonite zlyhá (**RED**).
   - Len taký kód sa preleje do `src`, aby daný test bezpečne prešiel (**GREEN**).
   - Nasleduje vizuálna kontrola v Subagent prehliadači, úprava stylingu, commit a push (**VERIFY**). Žiadny feature commit nesmie vzniknúť pri padajúcich testoch!
   
2. **Dizajnová Filozofia (Palantir Dark Mode):**
   - Vizuál musí striktne dodržiavať "Data-Analytics / Military-Tech" štýl (Tmavý režim).
   - Paleta: dominuje `var(--pt-color-bg-base)` (#10161a) a `var(--pt-color-bg-surface)` (#293742). Presvetlené moduly neprípustné (okrem výstražných "Alert" akcentov do žlta a červena).
   - Dôraz na priestor (Widescreen Full-Screen layout). Žiadne bočné panely zbytočne plytvajúce šírku. Navigácia zostáva čisto v TopBare.

3. **Napojovanie na Dátové Zdroje:**
   - Aplikácia operuje s REST JSON dátami z CRZ, Slovensko.digital či Data.gov.sk. 
   - Pravidlo pre štátne APIcka s mizerným uptime alebo "401 Unauthorized" bariérami: *Mock the fallback*. Každý model musí zvládať fungovať v izolovanom prostredí nad vymyslenými dátami so zhodnou architektúrou pre plynulý UI vývoj.

*(Tento dokument bol navrhnutý ako architektonicko-pravidlový manuál C.O.R.E. projektu. Aktualizované asistentom Antigravity - Verzia 1.0)*
