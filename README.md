## Om prosjektet

"The Button Game" er et nettspill hvor brukere kan trykke på en knapp for å konkurrere om hvem som kan få tallet til å bli høyest. Tvisten er at det blir større og større sansynlighet for at tallet resetter seg for hver gang en trykker. Spillet er designet for å være enkelt, men engasjerende, med sanntidsoppdateringer og datalagring for å holde styr på brukernes highscore.

## Teknologi

Prosjektet benytter følgende teknologier:

- **Svelte**: Et moderne JavaScript-rammeverk for å bygge brukergrensesnitt.
- **Tailwind CSS**: Et verktøy for å raskt style komponenter med enkle og intuitive klasser.
- **Firebase Firestore**: En skybasert NoSQL-database som lagrer brukerdata.
- **VM**: Frontend kjører på en lokal server på en virtuell maskin.

## Installasjon

Følg disse trinnene for å sette opp prosjektet lokalt:

1. **Klon repoen:**
    ```bash
    git clone https://github.com/Carlo331/eksamen-oppgave.git
    cd eksamen-oppgave
    cd eksamen-nettside
    ```

2. **Installer avhengigheter:**
    ```bash
    npm install
    ```

3. **Start utviklingsserveren:**
    ```bash
    npm run dev
    ```

## Bruk

For å starte applikasjonen, kjør utviklingsserveren som beskrevet i installasjonsinstruksjonene, og åpne nettleseren på `http://localhost:5000`. Hvis en vil få full funskjonalitet fra nettsiden trenger en å sette opp en Firebase proskjekt med Firestore.

