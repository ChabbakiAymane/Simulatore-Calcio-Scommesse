![forthebadge made-with-javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)
![GitHub build](https://travis-ci.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware.svg?token=tb3AcPquXXKgsxjaqzdT&branch=main)


# Progetto Ingegneria Software - TotoFantaCalcio
> Il progetto consiste nell'ideazione e realizzazione di un’applicazione web in cui vari utenti si sfidano tra di loro cercando di indovinare i risultati di alcune partite di calcio. Più risultati indovini più punti guadagni e alla fine tutti i punti guadagnati vengono inseriti all’interno di una classifica. A fine campionato chi avrà fatto più punti vince.

> **_Target Users_**: Adolescenti e adulti appassionati di calcio.

Questa Repository contiene il codice sorgente/API/documentazione per la realizzazione del progetto per il corso di Ingegneria Software II (Anno accademico 2020/2021, corso di laurea Informatica).

Docenti:
 - Sandro Fiore
 - Marco Robol
 
 ### Link alla web Application: https://fantatotocalcio.herokuapp.com/
 
 # Indice
- [Come Iniziare](#come-iniziare)
- [Come Usare](#come-usare)
- [API](#api)
- [Product Backlog](#product-backlog)
- [Mockup v1](#mockup-v1)
- [Sprint Backlog v1](#sprint-backlog-v1)
- [Licenza](#licenza)

## Come Iniziare
https://drive.google.com/file/d/16CvhT2L1hlVJQcmMdYs4uXmImjll1Q4Y/view

## Come Usare
Oltre al video precedente su come utilizzare l'applizazione aggiongiamo che l'aggiunta e l'aggiornamento dei pronostici va fatto in modo da non lasciare pronostici doppi o diversi per le stesse partite, ogni pronostico deve riferirsi ad una partita diversa rispetto agli altri pronostici.
## API
Breve descrizione delle API e link a risorse esterne contenenti la documentazione estesa vera e propria.

---

## Product Backlog 
> **_User Stories_** riguardanti **Site Member** (utente) che utilizza la web application.

| **ID** | **Name** | **User story** | **How to Demo** | **Importance** | **Estimate** | **Estimated Sprint** |
|:---:|---|---|---|:---:|:---:|:---:|
| 1 | **Home** | As a **Site Member** voglio vedere la mia posizione in classifica e i punti, così posso rendermi conto se sto vicendo o meno. | Nella Home del sito vorrei vedere le info principali tra cui la mia posizione in classifica e i miei punti. | 2 | 3 | 2 |
| 2 | **LogIn** | As a **Site Member** voglio poter accedere al sito usando le mie credenziali, così posso partecipare alla competizione. | Dalla pagina login.html inserisco i dati di un utente registrato e accedo al sito | 1 | 2 | 1 |
| 3 | **LogOut** | As a **Site Member** voglio poter disconnettermi dal mio account così nessun altro può usare il mio account senza il mio permesso. | Dalla pagina home posso schiacciare il link logout dopo di che la pagina logout.html mi chiede se voglio farlo e dopo aver schiacciato il bottone elimina il token | 2 | 2 | 1 |
| 4 | **Registrazione** | As **Site Member** voglio poter registrarmi al sito così posso accedere al sito. | Se non si è loggati il sito la rimanda alla pagina login dove può decidere di registrarsi schiacciando registrati e compilando il form | 1 | 2 | 1 |
| 5 | **Recupero Credenziali** | As **Site Member** voglio poter recuperare le mie credenziali, così posso accedere al mio account anche se mi dimentico la mia password. | Siccome mi dimentico spesso le password vorrei poter avere un metodo per riuscire a recuperarle in modo che mi arrivi una mail con la password del mio account. | 4 | 6 | 3 |
| 6 | **Next Match** | As a **Site Member** voglio vedere le prossime partite, così posso decidere il mio pronostico. | Nella home voglio poter vedere le partite selezionate dal admin. | 2 | 4 | 1 |
| 7 | **Time** | As a **Site Member** voglio vedere quanto tempo ho per inserire i pronostici, cosi posso scommettere in tempo. | Vorrei poter vedere un countdown su quanto tempo manca per poter inserire i pronostici. | 2 | 3 | 2 |
| 8 | **Visualizzazione Classifica** | As a **Site Member** voglio vedere la classifica, così posso capire la mia posizione. | Dalla pagina Home schiaccio il link classifica che mi manda alla pagina dove posso vedere la classifica generale, la classifica è visualizzabile anche da utenti non loggati
 | 1 | 4 | 1 |
| 9 | **Ricerca nella Classifica** | As a **Site Member** voglio poter cercare qualcuno per nome utente, così posso capire la sua posizione in classifica. | Dalla pagina classifica compilo il form search con lo username dell’utente e mi visualizza i dati principali di quell’utente | 4 | 8 | 2 |
| 10 | **Filtro nella Classifica** | As a **Site Member** voglio poter filtrare la classifica per regione, così posso capire la mia posizione nella mia regione. | Quando visualizzo la classifica vorrei poter scegliere una regione e vedere una classifica personalizzata. | 4 | 5 | 3| 
| 11 | **Inserimento Pronostici** | As a **Site Member** voglio poter inserire i pronostici così posso fare punti e salire in classifica. | Siccome voglio inserire i miei pronostici per le partite inserisco i miei risultati nella apposita sezione. Se la parita è già stata giocata la pagina sarà bloccata dalla pagina home | 1 | 4 | 1 |
| 12 | **Informazioni Squadre** | As a **Site Member** voglio poter visualizzare info sulle squadre, così posso decidere i pronostici. | Dalla pagina Home schiaccio il link info squadre e dopo aver scelto la squadra posso visualizzare le info principali su di essa | 3 | 4 | 2 |

---

> **_User Stories_** riguardanti l'**admin** che amministra la web application.

| **ID** | **Name** | **User story** | **How to Demo** | **Importance** | **Estimate** | **Estimated Sprint** |
|:---:|---|---|---|:---:|:---:|:---:|
| 1 | **LogIn** | As an Admin, voglio poter accedere ad una sezione dedicata così posso essere riconosciuto come admin. | Visto che voglio accedere al mio profilo, premo sul pulsante “accedi”  e dopo aver inserito le mie credenziali ed effettuato con successo l’autenticazione, vengono reindirizzato alla homepage e sarà identificato come Admin. | 1 | 3 | 1 |
| 2 | **LogOut** | As an Admin, voglio poter disconnettermi dal mio account così nessun altro può usare il mio account senza il mio permesso. | Visto che ho già fatto l’accesso al mio profilo, premendo il pulsante di logout, voglio che la sessione corrente  termini e che venga reindirizzato alla homepage.  | 2 | 3 | 1 |
| 3 | **Inserimento Esiti** | As an Admin, voglio poter inserire i risultati delle partite da me inserite per poter calcolare i punti. | Dopo aver inserito gli esiti delle partite il sistema aggiornerà i punti e la classifica. | 2 | 4 | 1 |
| 4 | **Scelta Partite** | As an Admin, voglio poter scegliere le partite su cui i giocatori faranno i pronostici. | La pagina obbliga ad inserire esattamente 5 partita con tutti i dati prima di poterle salvare. | 2 | 4 | 1 |
| 5 | **Informazioni Squadre** | As an Admin, voglio poter inserire le info sulle squadre così i site member possono capire la squadra più forte. | Dopo aver inserito i dati delle squadre, questi dati saranno visibili ai site member. | 4 | 4 | 2 |
| 6 | **Partite Annullate** | As an Admin, mi preoccupo di eliminare le partite annullate, così  servizio è sempre  aggiornato. | Quando l'admin inserirà gli esiti potrà scegliere tra 1 (vittoria home), 2 (vittoria guest), X (pareggio), annullata (partita annullata) | 4 | 5 | 2 |
| 7 | **Inizio Stagione** | As an Admin, voglio poter bloccare tutti i pronostici. | Finché non ci sono partite, non lascio selezionare i pronostici ai giocatori. | 5 | 4 | 3 |
| 8 | **Blocco Pronostici** | As an Admin, voglio poter bloccare tutti i pronostici riguardanti una specifica partita dopo che quest’ultima è iniziata. | Dopo che una partita ha inizio il tempo per inserire i pronostici scade e non sarà più possibile cambiare pronostici. | 4 | 4 | 2 |

---
## Mockup v1
### HomePage: 
![HomePage.PNG](https://github.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware/blob/main/Mockup_v1/HomePage.PNG)
### Classifica:
![Classifica.PNG](https://github.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware/blob/main/Mockup_v1/Classifica.PNG)
### Esiti Partite:
![EsitiPartite.PNG](https://github.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware/blob/main/Mockup_v1/EsitiPartite.PNG)
### Info Squadre
![InfoSquadre.PNG](https://github.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware/blob/main/Mockup_v1/InfoSquadre.PNG)
#### Admin Inserimento Partite
![AdminInserimentoPartite.PNG](https://github.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware/blob/main/Mockup_v1/AdminInserimentoPartite.PNG)
### Admin Inserimento Esiti
![AdminInserimentoEsiti.PNG](https://github.com/SimoneGrego-Unitn/ProgettoIngegneriaSoftware/blob/main/Mockup_v1/AdminInserimentoEsiti.PNG)

---

## Sprint Backlog #v1

|  | Sprint Backlog (Sprint Planning) |  |  |  |  | Sprint |  |  |  |  |  |  |  |  |  |  |  |  |
|---|:---:|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  | Name | User story |  | Volunteer | Estimate | Day1 | Day2 | Day3 | Day4 | Day5 | Day6 | Day7 | Day8 | Day9 | Day10 | Day11 | Day12 | Day13 |
| Sprint #1 | **Home** | As a **Site Member** voglio vedere la mia posizione in classifica e i punti, così posso rendermi conto se sto vicendo o meno. | Design API | Matteo Lunardon | 2 | 0 | 0 | 0 | 0 | 1 | 2 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Matteo Lunardon | 4 | 3 | 3 | 2 | 3 | 1 | 3 | 2 | 3 | 1 | 0 | 0 | 0 | 0 |
|  |  |  | Progettazione e implementazione DB (non ci va) | Matteo Lunardon | 2 | 0 | 1 | 2 | 3 | 3 | 2 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Sviluppo UI | Matteo Lunardon | 4 | 1 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Documentazione | Matteo Lunardon | 3 | 0 | 0 | 0 | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Testing  | Aymane Chabbaki | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 |
|  |  |  | Deploy | Matteo Lunardon | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
|  | **Next Match** | As a **Site Member** voglio vedere le prossime partite, così posso decidere il mio pronostico. | Design API | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki  | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  | Implementazione metodo REST | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki | 4 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  | Progettazione e implementazione DB (non ci va)  | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki  | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  | Sviluppo UI | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki  | 4 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  | Documentazione | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki   | 3 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  | Testing  | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki  | 2 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  |  |  | Deploy | Matteo Lunardon, Simone Grego, Andrea Bonora, Aymane Chabbaki  | 1 |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | **Inserimento Pronostici** | As a **Site Member** voglio poter inserire i pronostici così posso fare punti e salire in classifica. | Design API | Aymane Chabbaki | 2 | 1 | 0 | 0 | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Aymane Chabbaki | 4 | 5 | 0 | 3 | 0 | 2 | 1 | 0 | 2 | 2 | 1 | 0 | 2 | 2 |
|  |  |  | Progettazione e implementazione DB (collezione Pronostici) | Aymane Chabbaki | 2 | 0 | 0 | 0 | 0 | 3 | 2 | 0 | 0 | 3 | 0 | 2 | 0 | 1 |
|  |  |  | Sviluppo UI | Aymane Chabbaki | 4 | 0 | 1 | 0 | 0 | 0 | 2 | 1 | 0 | 0 | 0 | 2 | 0 |  |
|  |  |  | Documentazione |Aymane Chabbaki  | 3 | 0 | 1 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 |
|  |  |  | Testing  | Aymane Chabbaki | 2 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 2 | 0 |
|  |  |  | Deploy | Aymane Chabbaki | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
|  | **Inserimento Esiti** | As an Admin, voglio poter inserire i risultati delle partite da me inserite per poter calcolare i punti. | Design API | Andrea Bonora | 2 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Andrea Bonora | 4 | 2 | 1 | 2 | 2 | 1 | 1 | 2 | 2 | 0 | 1 | 2 | 0 | 0 |
|  |  |  | Progettazione e implementazione DB | Andrea Bonora | 2 | 3 | 3 | 2 | 1 | 1 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 |
|  |  |  | Sviluppo UI | Andrea Bonora | 4 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 1 | 1 | 0 | 1 | 0 |
|  |  |  | Documentazione | Andrea Bonora | 3 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 1 |
|  |  |  | Testing  | Andrea Bonora, Simone Grego | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 2 | 0 |
|  |  |  | Deploy | Andrea Bonora | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
|  | **Scelta Partite** | As an Admin, voglio poter scegliere le partite su cui i giocatori faranno i pronostici. | Design API |  Grego Simone | 2 | 0 | 0 | 1 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
|  |  |  | Implementazione metodo REST |  Grego Simone | 4 | 3 | 3 | 0 | 2 | 0 | 0 | 1 | 1 | 1 | 0 | 0 | 2 | 1 |
|  |  |  | Progettazione e implementazione DB (collezione Partite) |  Grego Simone | 6 | 0 | 0 | 0 | 3 | 4 | 2 | 3 | 2 | 0 | 1 | 1 | 0 | 0 |
|  |  |  | Sviluppo UI |  Grego Simone | 4 | 0 | 0 | 0 | 1 | 0 | 2 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Documentazione |  Grego Simone | 3 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 2 |
|  |  |  | Testing  |Grego Simone, Andrea Bonora| 2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | 0 |
|  |  |  | Deploy |  Grego Simone | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 2 |
|  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
|  | Total |  |  |  | 190 | 19 | 16 | 13 | 19 | 19 | 19 | 13 | 15 | 13 | 7 | 8 | 13 | 16 |
|  | Ideal |  |  |  | 94 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 | 7,2 |

*(Per la funzionalità Next Match il lavoro è stato svolto individualmente da tutti e non compare nelle ore totali del progetto in quanto diviso per la parte di ogni membro)

---

|  | Name | User story |  | Volunteer | Estimate | Day1 | Day2 | Day3 | Day4 | Day5 |
|---|:---:|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Sprint #2 |  **Classifica** | As a **Site Member** voglio vedere la classifica, così posso capire la mia posizione.  | Design API  | Grego Simone | 2 | 1 | 1 | 0 | 0 | 1 |
|  |  |  | Implementzione metodo REST | Grego Simone | 5 | 2 | 1 | 2 | 1 | 1 |
|  |  |  | Progettazione e implementazione DB | Grego Simone | 1 | 1 | 0 | 0 | 0 | 0 |
|  |  |  | Sviluppo UI | Grego Simone | 1 | 0 | 0 | 1 | 1 | 0 |
|  |  |  | Documentazione | Grego Simone | 1 | 0 | 0 | 1 | 1 | 0 |
|  |  |  | Testing | Grego Simone | 1 | 0 | 0 | 2 | 0 | 1 |
|  |  |  | Deploy | Grego Simone | 1 | 0 | 0 | 0 | 0 | 1 |
|  | **Cercare Nella Classifica** | As a **Site Member** voglio poter cercare qualcuno per nome utente, così posso capire la sua posizione in classifica. | Design API | Grego Simone | 1 | 0 | 1 | 0 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Grego Simone | 2 | 0 | 1 | 1 | 1 | 0 |
|  |  |  | Sviluppo UI | Grego Simone | 1 | 0 | 1 | 0 | 0 | 0 |
|  |  |  | Documentazione | Grego Simone | 1 | 0 | 0 | 0 | 1 | 0 |
|  |  |  | Testing | Grego Simone | 1 | 0 | 1 | 2 | 0 | 0 |
|  |  |  | Deploy | Grego Simone | 1 | 0 | 0 | 0 | 0 | 1 |
|  | **Login e Logout** | As a **Site Member** voglio poter fare il login così posso vedere le info riguardanti il mio account | Design API | Lunardon Matteo | 2 | 0 | 1 | 1 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Matteo Lunardon | 5 | 6 | 4 | 1 | 1 | 1 |
|  |  |  | Sviluppo UI | Matteo Lunardon  | 2 | 0 | 0 | 1 | 1 | 0 |
|  |  |  | Documentazione | Matteo Lunardon  | 2 | 0 | 0 | 1 | 1 | 0 |
|  |  |  | Testing | Matteo Lunardon  | 2 | 0 | 1 | 0 | 1 | 0 |
|  |  |  | Deploy | Matteo Lunardon  | 1 | 0 | 0 | 1 | 0 | 0 |
|  | **Change password** | As a **Site Member** voglio poter cambiare la password cosi ho la sicurezza che nessuno oltre a me la sappia | Design API | Lunardon Matteo | 2 | 0 | 1 | 0 | 0 | 1 |
|  |  |  | Implementazione metodo REST | Matteo Lunardon | 2 | 0 | 0 | 0 | 1 | 2 |
|  |  |  | Sviluppo UI | Matteo Lunardon  | 1 | 0 | 0 | 1 | 0 | 0 |
|  |  |  | Documentazione | Matteo Lunardon  | 1 | 0 | 0 | 1 | 1 | 1 |
|  |  |  | Testing | Matteo Lunardon  | 1 | 0 | 0 | 0 | 0 | 1 |
|  |  |  | Deploy | Matteo Lunardon  | 1 | 0 | 1 | 1 | 0 | 0 |
|  | **Informazioni Squadre** | As a **Site Member** voglio poter visualizzare info sulle squadre, così posso decidere i pronostici | Design API | Andrea Bonora | 4 | 1 | 2 | 0 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Andrea Bonora | 2 | 1 | 0 | 1 | 0 | 0 |
|  |  |  | Sviluppo UI | Andrea Bonora | 2 | 0 | 1 | 0 | 0 | 0 |
|  |  |  | Documentazione | Andrea Bonora | 1 | 0 | 0 | 1 | 1 | 0 |
|  |  |  | Testing | Andrea Bonora | 2 | 0 | 0 | 1 | 0 | 0 |
|  |  |  | Deploy | Andrea Bonora | 1 | 0 | 0 | 0 | 0 | 1 |
|  | **Informazioni Squadre** | As an **Admin**, voglio che le informazioni sulle squadre vengano aggiornate in automatico quando inserisco gli esiti di una partita | Design API | Andrea Bonora | 4 | 0 | 2 | 2 | 1 | 0 |
|  |  |  | Implementazione metodo REST | Andrea Bonora | 2 | 0 | 1 | 0 | 1 | 0 |
|  |  |  | Sviluppo UI | Andrea Bonora | 0 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Documentazione | Andrea Bonora | 2 | 0 | 0 | 0 | 2 | 0 |
|  |  |  | Testing | Andrea Bonora | 2 | 1 | 0 | 1 | 1 | 0 |
|  |  |  | Deploy | Andrea Bonora | 1 | 0 | 0 | 0 | 0 | 1 |
|  | **Partite Annullate** | As an **Admin**, mi preoccupo di eliminare le partite annullate, così  servizio è sempre  aggiornato | Design API | Andrea Bonora | 2 | 1 | 1 | 0 | 0 | 0 |
|  |  |  | Implementazione metodo REST | Andrea Bonora | 1 | 1 | 0 | 0 | 0 | 0 |
|  |  |  | Sviluppo UI | Andrea Bonora | 1 | 0 | 1 | 0 | 0 | 0 |
|  |  |  | Documentazione | Andrea Bonora | 1 | 0 | 0 | 0 | 1 | 0 |
|  |  |  | Testing | Andrea Bonora | 1 | 0 | 0 | 1 | 0 | 0 |
|  |  |  | Deploy | Andrea Bonora | 1 | 0 | 0 | 0 | 0 | 1 |
|  | **Inserire Pronostici** | As a **Site Member**, voglio poter inserire i pronostici così posso fare punti e salire in classifica. | Design API | Aymane Chabbaki | 1 | 0 | 1 | 0 | 2 | 1 |
|  |  |  | Implementazione metodo REST | Aymane Chabbaki | 1 | 0 | 1 | 0 | 1 | 0 |
|  |  |  | Sviluppo UI | Aymane Chabbaki | 0 | 1 | 0 | 1 | 0 | 0 |
|  |  |  | Documentazione | Aymane Chabbaki | 1 | 1 | 0 | 0 | 1 | 0 |
|  |  |  | Testing | Aymane Chabbaki | 1 | 1 | 0 | 1 | 2 | 2 |
|  |  |  | Deploy | Aymane Chabbaki | 0 | 0 | 0 | 0 | 1 | 1 |
|  | **Registrarsi** | As **Site Member**, voglio poter registrarmi al sito così posso accedere al sito. | Design API | Aymane Chabbaki | 1 | 0 | 0 | 0 | 1 | 0 |
|  |  |  | Implementazione metodo REST | Aymane Chabbaki | 2 | 0 | 0 | 1 | 1 | 0 |
|  |  |  | Sviluppo UI | Aymane Chabbaki | 1 | 0 | 0 | 0 | 0 | 0 |
|  |  |  | Documentazione | Aymane Chabbaki | 1 | 0 | 1 | 0 | 1 | 0 |
|  |  |  | Testing | Aymane Chabbaki | 0 | 0 | 2 | 1 | 0 | 1 |
|  |  |  | Deploy | Aymane Chabbaki | 0 | 0 | 1 | 1 | 0 | 1 |
|  | Total |  |  |  | 119 | 18 | 28 | 28 | 25 | 20 |
|  | Ideal |  |  |  | 80 | 16 | 16 | 16 | 16 | 16 |


---

# Licenza 
Licenza scelta per questo repository (descrizione breve).

## Licenza generale 
Licenza indicata in modo abbreviato (versione estesa in `LICENSE.md` nella root repository).
presente, di norma, nella root del repository.  Per avere un aiuto nel percorso
[Choose a License](https://choosealicense.com/).
Per i progetti del Team Digitale le licenze preferibili sono
[queste](https://github.com/teamdigitale/licenses).

## Autori
Presente nella wiki del progetto.
