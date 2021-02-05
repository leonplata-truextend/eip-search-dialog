type EventNames = 'language-changed';

let language: string = 'en';

const listeners = new Map<EventNames, Set<Function>>();

export function getLanguage() {
  return language;
}

export function setLanguage(value: string) {
  language = value;
  dispatchLanguageChanged(language);
}

export function addListener(eventName: EventNames, callback: Function) {
  if (!listeners.has(eventName)) {
    listeners.set(eventName, new Set());
  }
  listeners.get(eventName).add(callback);
}

export function removeListener(eventName: EventNames, callback: Function) {
  if (!listeners.has(eventName)) {
    return;
  }
  listeners.get(eventName).delete(callback);
}

function dispatchLanguageChanged(language: string) {
  if (!listeners.has('language-changed')) {
    return;
  }
  for (const listener of listeners.get('language-changed')) {
    listener(language);
  }
}
