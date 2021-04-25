# OSA Virtual Challenge
**Web: https://osachallenge.sk/**

Vytvorili sme webovú aplikáciu pre športovcov,  kde sa môžu zapojiť do virtuálnych výziev. Používateľ si zaregistruje výzvu, kde muší splniť rôzne športové aktivity. Záznam o aktivite nahrá ako fotku do webovej aplikácie. Správca musí aktivitu skontrolovať a schváliť.
## Použité technológie
### Frontend
Webová aplikácia má jednoduché používateľské rozhranie. Preto som použil len **HTML a CSS** (konkrétne **Sass**) v kombinácii s **EJS** pre dynamický obsah. **CSS** je písané v **BEM** metodológii. Neskôr môžeme jednoducho nahradiť náš frontend do niektorého JS frameworku, keďže FE je minimálne previazaný s backendom.

### Backend
Backend som implementoval v **Express.js** a **TypeScript**-e. Dáta ukladáme do **MySQL** databázy s ktorou komunikujeme cez **ORM Prisma**.

### Nasadenie
Webová aplikácia je **dockerizovaná**, pričom ju môžeme automaticky nasadiť  na virtuálny server pomocou **CI/CD** v **GitLab-e**.

### Externé služby
**Cloudinary** sme použili na ukladanie obrázkov. Používatelia nahrávajú svoje fotky do aplikácie, a preto sme potrebovali zabezpečiť vhodné úložisko a kompresiu fotiek. Cloudinary sme vybrali pretože rieši naše potreby a poskytuje jednoduché API.

## Plány na vylepšenie
Webová aplikácia je stále vo vývoji (pracujem na nej len vo voľnom čase). Preto aplikáciu postupne dopĺňame o novú funkcionalitu napr:
 - Integrácia so službou PAY by square - QR platby
 - Odosielanie naštýlovaných HTML emailov pri registrácii atď...
 - Ochrana pomocou Google reCAPTCHA
 - Zľavové kupóny
 - atd.
