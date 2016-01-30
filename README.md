# RIA-projekt - Pizzamins

Online sustav za narudžbu pizze. Prijavljen korisnik (ranije se registrirao i time kreirao svoj korisnički račun) može napraviti narudžbu i odabrati pizzu i piće te želi li je preuzeti sam ili želi li dostavu na kućnu adresu. Nakon završetka narudžbe, korisnik može pratiti status svoje narudžbe.

Za potrebe projekta, kreirat će se jednostavno API sučelje za komunikaciju s bazom gdje će biti pohranjene ponude pizza, dovršene narudžbe, registrirani korisnici, lokacije pizzeria i sl. (https://github.com/nnacin/RIA-projekt-api/)

Specifikacija projekta:
https://dl.dropboxusercontent.com/u/51070823/Projekt%20-%20Specifikacija.docx

# Setup
1. Instalirati i pokrenuti MongoDB:
https://www.mongodb.org/downloads

2. Pokrenuti API po priloženim uputama:
https://github.com/nnacin/RIA-projekt-api/

3. Preimenovati .json.example datoteke u .json

4. set DEBUG=*

5. npm start (za linux bez 4. koraka: DEBUG=* npm start)

# API Description
1. MongoDB: Nije potrebno stvarati bazu podataka jer sama aplikacija (API) tijekom rada stvara kolekcije koje su potrebne za njen rad.
2. API je podijeljen na server (www.js) koji zatim pokrece glavnu aplikaciju (app.js). S njom registramo routove (kontrolere) koji se nalaze u routes direktoriju koji upravljaju upravljaju s bazom podataka preko modela iz models direktorija. Aplikacija još sadrži dodatne pomoćne module koji se nalaze u modules direktoriju, a pružaju dodatne pomoćne funkcionalnosti (npr. validacija, autentifikacija, stvaranje JSON objekata koje API vraća).
3. API koristi Basic Auth za autentifikaciju - basic strategy iz passport NPM paketa (u creds.json.example datoteci je predefinirano korisničko ime i lozinka).
4. config.json.example datoteka sadrži dodatne postavke koje korisnik može, ali ne mora mijenjati.
5. Pri prvom pokretanju se stvara predefinirani admin račun (admin, admin) te se pri svakom slijedećem pokretanju provjerava ako postoji bar jedan admin račun te u suprotnom stvara novi.
6. API koristi endpointe koji su opisani u specifikaciji.
7. Za izvršavanje aplikacije (API dijela) se koristi BABEL koj služi za prijevod ES6 sintakse u ES5. Iako NodeJS tj. njegov engine V8 podržava neke dijelove nove specifikacije, neke funkcionalnosti nisu podržane.

# Main App Description
1. Kao i u API dijelu podijelili smo aplikaciju na server i glavni app.
2. Za autentifikaciju koristimo local strategy iz Passport (i passport-local) paketa. Kreirali smo tri različite lokalne strategije kako bi omogućili autentifikaciju različitih uloga (user-login i signup; employee-login).
3. Za pamćenje korisnikovih podataka koristi se express-session, u session spremamo njegove najosnovnije podatke odnosno ID i podatak ako je običan korisnik ili zaposlenik. Tako je omogućen persistentan login, a korisnikovi podaci spremljeni u sessionu su svedeni na minimum. Iz tako spremljenog serijaliziranog stringa se prilikom svakog idućeg zahtjeva taj string deserijalizira i dohvaća (najčešće) ID ulogiranog korisnika te se radi provjera ako je on zapravo validan.
4. Za komunikaciju s API-em, a time i s bazom podataka koristimo poseban adapter (adapter.js) koji sadrži metode za jednostavnu razmjenu podataka. Adapter prihvaća argumente koje mu pošaljemo, formatira ih u HTTP request te ga šalje API-u, a natrag nam vraća API-ev odgovor. Koristimo uvijek samo jednu instancu Adaptera do koje možemo doći preko glavnog app modula.
5. Prvi dio routova se odnosi na guest-facing dio aplikacije gdje korisnik može pregledavati dostupne lokacije, ponudu pizza, kreirane narudžbe, svoj profil i opće informacije.
6. Pri unosu lokacija validira se unesena adresa pomoću Google-ovog Geocoding API-a preko kojeg dohvaćamo geografsku širinu i dužinu te s njima korisniku prikazujemo interaktivnu kartu gdje se ta lokacija nalazi (Google Maps API). Uz to spremamo i vrijeme otvaranja i zatvaranja svake lokacije po danima.
7. Drugi dio routova (staff) se koristi za business-facing dio aplikacie gdje zaposlenici mogu pregledavati, dodavati i brisati dostupne pizze, pića i lokacije. Uz to administrator može dodavati nove zaposlenike (defaultni password je Pizzamins_staff).
