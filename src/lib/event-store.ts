export type Event = {
  id: string;
  title: string;
  start: string; // ISO string
  end: string; // ISO string
  description?: string;
};

const STORAGE_KEY = 'calendar-events';

export const getEvents = (): Record<string, Event[]> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const getEventsForDate = (date: string): Event[] => {
  const events = getEvents();
  return events[date] || [];
};

export const saveEvent = (date: string, event: Event): void => {
  const events = getEvents();
  if (!events[date]) {
    events[date] = [];
  }
  events[date].push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

export const updateEvent = (date: string, event: Event): void => {
  const events = getEvents();
  if (!events[date]) return;
  
  const index = events[date].findIndex(e => e.id === event.id);
  if (index !== -1) {
    events[date][index] = event;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }
};

export const deleteEvent = (date: string, eventId: string): void => {
  const events = getEvents();
  if (!events[date]) return;
  
  events[date] = events[date].filter(e => e.id !== eventId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};