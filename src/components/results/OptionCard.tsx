import { Fragment, type ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { VIBE_LABELS } from '@/lib/labels';
import type { Plan } from '@/types/plan';
import LegRow from './LegRow';
import StopRow from './StopRow';
import { formatDay, formatTime } from './format';

type OptionCardProps = {
  plan: Plan;
  index: number;
  /** Footer actions (e.g. "Lock it in" in M8). */
  actions?: ReactNode;
};

/** One option: header (number, vibe, time range) + stops with legs between them. */
const OptionCard = ({ plan, index, actions }: OptionCardProps) => {
  const first = plan.stops[0];
  const last = plan.stops[plan.stops.length - 1];
  const end = last ? new Date(new Date(last.startTime).getTime() + last.durationMin * 60_000).toISOString() : undefined;

  return (
    <article className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <header className="px-4 py-3 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <Badge variant="secondary" className="whitespace-nowrap">
            {VIBE_LABELS[plan.vibe]}
          </Badge>
        </div>
        {first && end && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDay(first.startTime)} · {formatTime(first.startTime)}–{formatTime(end)}
          </span>
        )}
      </header>

      <div className="p-4 space-y-1">
        {plan.stops.map((stop, i) => {
          const leg = plan.legs.find((l) => l.to === i);
          return (
            <Fragment key={stop.place.placeId}>
              {leg && <LegRow leg={leg} fromLabel={leg.from === 'origin' ? 'your pin' : undefined} />}
              <StopRow stop={stop} />
            </Fragment>
          );
        })}
      </div>

      {actions && <footer className="px-4 pb-4">{actions}</footer>}
    </article>
  );
};

export default OptionCard;
