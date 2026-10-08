/* Add confirmed events here. Dates use YYYY-MM-DD; no invented events are shown. */
window.VSPJ_EVENTS = [
  {
    id: 'hospodsky-kviz-2026',
    date: '2026-10-13',
    title: 'Hospodský kvíz VŠPJ',
    type: 'Studentská akce',
    summary: 'Vezmi tým a prověřte společně své znalosti.',
    description: [
      'Studentský hospodský kvíz je příležitost setkat se mimo přednášky a společně si zasoutěžit. Sestavte tým a přijďte prověřit své znalosti.',
      'Pro účast je potřeba registrace týmu. Aktuální možnost přihlášení a dostupnou kapacitu ověřte v registračním formuláři.'
    ],
    time: null,
    place: null,
    registration: 'required',
    registrationUrl: 'https://forms.gle/YUqQgMx4brjKUb1j8'
  }
];

window.VSPJ_EVENT_UTILS = {
  date(value) { return new Date(value + 'T12:00:00Z'); },
  formatDate(value) {
    return new Intl.DateTimeFormat('cs-CZ', {
      timeZone: 'Europe/Prague', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(this.date(value));
  },
  today() {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Prague', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    const get = type => parts.find(part => part.type === type).value;
    return get('year') + '-' + get('month') + '-' + get('day');
  },
  registrationLabel(event) {
    return { required: 'Registrace nutná', optional: 'Registrace dobrovolná', none: 'Bez registrace' }[event.registration] || 'Registrace bude upřesněna';
  },
  url(event) { return 'akce.html?id=' + encodeURIComponent(event.id); }
};
