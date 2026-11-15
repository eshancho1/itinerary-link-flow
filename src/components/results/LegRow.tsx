import { ArrowUpRight, Footprints, TrainFront } from 'lucide-react';
import type { Leg } from '@/types/plan';

type LegRowProps = { leg: Leg; fromLabel?: string };

/** The connector between two stops: travel time + one directions link per leg. */
const LegRow = ({ leg, fromLabel }: LegRowProps) => {
  const Icon = leg.mode === 'walk' ? Footprints : TrainFront;
  const verb = leg.mode === 'walk' ? 'walk' : 'by transit';

  return (
    <div className="flex items-center gap-3 pl-[0.9rem]">
      <div className="w-px h-6 bg-border" aria-hidden />
      <a
        href={leg.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
      >
        <Icon className="h-3 w-3" />
        <span>
          {leg.minutes} min {verb}
          {fromLabel && ` from ${fromLabel}`}
        </span>
        <span className="text-primary font-medium flex items-center">
          Directions
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </a>
    </div>
  );
};

export default LegRow;
