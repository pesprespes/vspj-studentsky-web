/* Czech public holidays under the current rules; Easter uses the Gregorian calendar.
 * Verified 2026-10-23 against the Czech Ministry of Foreign Affairs:
 * https://mzv.gov.cz/london/cz/konzularni_a_vizove_informace/statni_svatky_1/index.html
 */
(() => {
  'use strict';
  const fixed = [
    ['01-01', 'Nový rok · Den obnovy samostatného českého státu'],
    ['05-01', 'Svátek práce'],
    ['05-08', 'Den vítězství'],
    ['07-05', 'Den slovanských věrozvěstů Cyrila a Metoděje'],
    ['07-06', 'Den upálení mistra Jana Husa'],
    ['09-28', 'Den české státnosti'],
    ['10-28', 'Den vzniku samostatného československého státu'],
    ['11-17', 'Den boje za svobodu a demokracii a Mezinárodní den studentstva'],
    ['12-24', 'Štědrý den'],
    ['12-25', '1. svátek vánoční'],
    ['12-26', '2. svátek vánoční']
  ];

  window.VSPJ_HOLIDAYS = {
    forYear(year) {
      // Meeus/Jones/Butcher algorithm for Gregorian Easter Sunday.
      const a = year % 19;
      const b = Math.floor(year / 100);
      const c = year % 100;
      const d = Math.floor(b / 4);
      const e = b % 4;
      const f = Math.floor((b + 8) / 25);
      const g = Math.floor((b - f + 1) / 3);
      const h = (19 * a + b - d - g + 15) % 30;
      const i = Math.floor(c / 4);
      const k = c % 4;
      const l = (32 + 2 * e + 2 * i - h - k) % 7;
      const m = Math.floor((a + 11 * h + 22 * l) / 451);
      const month = Math.floor((h + l - 7 * m + 114) / 31);
      const day = (h + l - 7 * m + 114) % 31 + 1;
      const easterDate = offset => new Date(Date.UTC(year, month - 1, day + offset, 12)).toISOString().slice(0, 10);
      return [
        ...fixed.map(([date, title]) => ({ date: `${year}-${date}`, title })),
        { date: easterDate(-2), title: 'Velký pátek' },
        { date: easterDate(1), title: 'Velikonoční pondělí' }
      ].sort((first, second) => first.date.localeCompare(second.date));
    }
  };
})();
