# Studentský rozcestník VŠPJ

Hotový statický web bez instalace, sestavení a externích knihoven.
Otevřete index.html v prohlížeči pro místní náhled.

## GitHub Pages
1. Vytvořte na GitHubu nový veřejný repozitář, například vspj-studenti.
2. Rozbalte ZIP a nahrajte index.html do kořenové složky repozitáře (Add file > Upload files). Ne samotný ZIP.
3. Otevřete Settings > Pages.
4. V Source vyberte Deploy from a branch, větev main a složku /(root), poté Save.
5. Po dokončení nasazení se adresa webu objeví v Settings > Pages.
Web na GitHub Pages bude veřejný.
Dokumentace: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Úpravy
Text, barvy a odkazy jsou v index.html. Adresy odkazů najdete v href="...".
Nový odkaz přidáte zkopírováním celého bloku <a class="link-row" ...> až po </a> a změnou textu i adresy.
Odkazy na konkrétní studijní agendy vedou do IS, kde je třeba se přihlásit a vybrat agendu.
Web neukládá údaje a neobsahuje vlastní registrační systém; přesměrovává na externí formuláře.
U akcí ověřte stav registrací přímo ve formuláři. Kalendář se otevírá v aktuálním měsíci podle časového pásma Europe/Prague.

## Zdroje školních odkazů
https://www.vspj.cz/cs/student/ostatni-informace/sluzby-pro-studenty/oikt
https://www.vspj.cz/cs/student/zaciname-studovat
https://www.vspj.cz/cs/student/harmonogram/harmonogram-akademickeho-roku
https://www.vspj.cz/cs/student/ostatni-informace/sluzby-pro-studenty/stipendia
Odkaz na formulář kvízu a datum akce pochází ze zadání organizátora.

Neoficiální studentský rozcestník, nikoli oficiální web VŠPJ.

## Kalendář a detaily akcí

- `assets/events.js`: společný seznam akcí pro kalendář i detail.
- `assets/calendar.js`: měsíce, dny, náhledy a navigace.
- `akce.html?id=hospodsky-kviz-2026`: samostatná stránka akce.
- `assets/event-detail.js`: načtení informací a registrace podle ID.
- `assets/events.css`: vzhled kalendáře a detailu.

Novou akci přidejte do seznamu `window.VSPJ_EVENTS`: unikátní `id`, datum `YYYY-MM-DD`, název, typ, shrnutí a odstavce popisu. `time` a `place` ponechte `null`, pokud nejsou potvrzené. `registration` má hodnotu `required` (nutná), `optional` (dobrovolná) nebo `none` (bez registrace). `registrationUrl` obsahuje adresu formuláře, případně `null`, pokud zatím není k dispozici.

Den s jednou akcí otevírá detail přímo. Při více akcích ve stejný den se pod kalendářem zobrazí seznam detailů. Náhled se mění najetím myši i zaměřením klávesnicí. Na mobilu lze klepnout na označený den nebo na kartu akce. Kalendář zobrazuje pouze vložené akce; nenačítá školní program automaticky.

