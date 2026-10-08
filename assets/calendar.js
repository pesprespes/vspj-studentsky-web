(() => {
  'use strict';
  const root = document.querySelector('[data-calendar]');
  if (!root) return;
  const events = window.VSPJ_EVENTS;
  const utils = window.VSPJ_EVENT_UTILS;
  const today = utils.today();
  let year = Number(today.slice(0, 4));
  let month = Number(today.slice(5, 7)) - 1;
  const grid = root.querySelector('[data-days]');
  const title = root.querySelector('[data-month]');
  const panel = root.querySelector('[data-day-events]');
  const selectedTitle = root.querySelector('[data-selected-date]');
  const count = root.querySelector('[data-month-count]');
  const key = day => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const onDay = date => events.filter(event => event.date === date);
  const node = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  };

  function showDay(date) {
    selectedTitle.textContent = utils.formatDate(date);
    grid.querySelectorAll('[data-date]').forEach(el => {
      el.classList.toggle('is-selected', el.dataset.date === date);
    });
    panel.replaceChildren();
    const dayEvents = onDay(date);
    if (!dayEvents.length) {
      panel.append(node('p', 'calendar-empty', 'Na tento den zatím není zveřejněna žádná akce.'));
      return;
    }
    dayEvents.forEach(event => {
      const link = node('a', 'calendar-event');
      link.href = utils.url(event);
      link.append(node('span', 'event-type', event.type));
      link.append(node('strong', '', event.title));
      link.append(node('span', 'registration-badge', utils.registrationLabel(event)));
      link.append(node('span', 'event-link-label', 'Podrobnosti a registrace →'));
      panel.append(link);
    });
  }

  function render() {
    title.textContent = new Intl.DateTimeFormat('cs-CZ', {
      month: 'long', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(Date.UTC(year, month, 1)));
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthEvents = events.filter(event => event.date.startsWith(prefix)).sort((a, b) => a.date.localeCompare(b.date));
    count.textContent = monthEvents.length ? `Počet akcí v měsíci: ${monthEvents.length}` : 'V tomto měsíci zatím nejsou zveřejněné akce.';
    grid.replaceChildren();
    const offset = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7;
    const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    for (let i = 0; i < offset; i++) {
      const space = node('span', 'calendar-space');
      space.setAttribute('aria-hidden', 'true');
      grid.append(space);
    }
    for (let day = 1; day <= days; day++) {
      const date = key(day);
      const dayEvents = onDay(date);
      const el = node(dayEvents.length === 1 ? 'a' : 'button', 'calendar-day', String(day));
      if (dayEvents.length === 1) el.href = utils.url(dayEvents[0]);
      else el.type = 'button';
      el.dataset.date = date;
      el.classList.toggle('has-events', dayEvents.length > 0);
      if (date === today) el.setAttribute('aria-current', 'date');
      const names = dayEvents.map(event => event.title + ', ' + utils.registrationLabel(event)).join('; ');
      el.setAttribute('aria-label', utils.formatDate(date) + '. ' + (names || 'Žádná zveřejněná akce'));
      el.addEventListener('mouseenter', () => showDay(date));
      el.addEventListener('focus', () => showDay(date));
      if (dayEvents.length !== 1) el.addEventListener('click', () => showDay(date));
      grid.append(el);
    }
    const initial = monthEvents.find(event => event.date >= today) || monthEvents[0];
    showDay(initial ? initial.date : today.startsWith(prefix) ? today : key(1));
  }

  root.querySelector('[data-prev]').addEventListener('click', () => {
    if (--month < 0) { month = 11; year--; }
    render();
  });
  root.querySelector('[data-next]').addEventListener('click', () => {
    if (++month > 11) { month = 0; year++; }
    render();
  });
  root.querySelector('[data-today]').addEventListener('click', () => {
    year = Number(today.slice(0, 4));
    month = Number(today.slice(5, 7)) - 1;
    render();
    showDay(today);
    grid.querySelector(`[data-date="${today}"]`).focus();
  });
  grid.addEventListener('keydown', event => {
    const move = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
    if (move === undefined) return;
    const days = [...grid.querySelectorAll('[data-date]')];
    const target = days.indexOf(document.activeElement) + move;
    if (target >= 0 && target < days.length) {
      event.preventDefault();
      days[target].focus();
    }
  });
  root.querySelector('[data-calendar-ui]').hidden = false;
  root.querySelector('[data-calendar-fallback]').hidden = true;
  render();
})();
