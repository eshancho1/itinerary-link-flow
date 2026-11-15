import { CalendarCheck, Footprints, MapPin, Ticket, UtensilsCrossed, type LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mapsSearchUrl } from '@/lib/geo';
import type { Stop, StopKind } from '@/types/plan';
import { formatDuration, formatPrice, formatTime } from './format';

const STOP_ICONS: Record<StopKind, LucideIcon> = {
  eat: UtensilsCrossed,
  do: Ticket,
  wander: Footprints,
};

type StopRowProps = {
  stop: Stop;
  /** Hide the Plan B line (e.g. on a locked-in summary). */
  hidePlanB?: boolean;
};

const StopRow = ({ stop, hidePlanB }: StopRowProps) => {
  const { place, kind, planB } = stop;
  const Icon = STOP_ICONS[kind];
  const meta = [place.category, formatPrice(place.priceLevel)].filter(Boolean).join(' · ');
  const mapUrl = mapsSearchUrl(place.name, place.address);
  const bookable = place.reservable && place.bookingUrl;

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-8 h-8 shrink-0 bg-accent/20 rounded-full flex items-center justify-center">
        <Icon className="h-4 w-4 text-secondary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-medium text-foreground">{formatTime(stop.startTime)}</span>
          <span className="text-sm font-semibold text-foreground">{place.name}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {meta}
          {meta && ' · '}
          {formatDuration(stop.durationMin)}
        </p>
        {!hidePlanB && planB && (
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-medium text-foreground/70">Plan B:</span> {planB.name}
          </p>
        )}
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        {bookable ? (
          <Button asChild variant="outline" size="sm" className="h-7 px-2 text-xs">
            <a href={place.bookingUrl} target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="h-3 w-3" />
              {kind === 'eat' ? 'Reserve' : 'Tickets'}
            </a>
          </Button>
        ) : (
          <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-xs text-muted-foreground">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              <MapPin className="h-3 w-3" />
              Map
            </a>
          </Button>
        )}
        {stop.status === 'walk-in' && (
          <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0 text-secondary border-secondary/40">
            Walk-in friendly
          </Badge>
        )}
      </div>
    </div>
  );
};

export default StopRow;
