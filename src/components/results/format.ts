import { format, isToday, isTomorrow } from 'date-fns';

export const formatTime = (iso: string) => format(new Date(iso), 'h:mm a');

export const formatDay = (iso: string) => {
  const d = new Date(iso);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  return format(d, 'EEE, MMM d');
};

export const formatPrice = (level?: number) => (level ? '$'.repeat(level) : '');

export const formatDuration = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
};
