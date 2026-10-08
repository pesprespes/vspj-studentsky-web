(() => {
  'use strict';
  const utils = window.VSPJ_EVENT_UTILS;
  const id = new URLSearchParams(window.location.search).get('id');
  const event = window.VSPJ_EVENTS.find(item => item.id === id);
  const content = document.querySelector('[data-event-content]');
  if (!event) {
    content.hidden = true;
    document.querySelector('[data-event-missing]').hidden = false;
    document.title = 'Akce nenalezena · VŠPJ / studenti';
    return;
  }
  document.title = event.title + ' · VŠPJ / studenti';
  document.querySelector('meta[name="description"]').content = event.summary;
  const text = (selector, value) => { document.querySelector(selector).textContent = value; };
  text('[data-event-title]', event.title);
  text('[data-event-type]', event.type);
  text('[data-event-summary]', event.summary);
  text('[data-event-date]', utils.formatDate(event.date));
  text('[data-event-time]', event.time || 'Bude upřesněno');
  text('[data-event-place]', event.place || 'Bude upřesněno');
  text('[data-registration-label]', utils.registrationLabel(event));
  const paragraphs = document.querySelector('[data-event-description]');
  paragraphs.replaceChildren();
  event.description.forEach(value => {
    const paragraph = document.createElement('p');
    paragraph.textContent = value;
    paragraphs.append(paragraph);
  });
  const link = document.querySelector('[data-registration-link]');
  const note = document.querySelector('[data-registration-note]');
  if (event.registration === 'none') {
    link.hidden = true;
    note.textContent = 'Na tuto akci se nemusíš předem registrovat.';
  } else if (event.registrationUrl) {
    link.href = event.registrationUrl;
    note.textContent = 'Dostupnou kapacitu a aktuální možnost přihlášení ověř ve formuláři. Otevře se v nové kartě.';
  } else {
    link.hidden = true;
    note.textContent = 'Odkaz na registraci bude doplněn.';
  }
})();
