import type { ReactNode } from 'react';
import { FlaskConical, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MAX_OPTIONS } from '@/lib/labels';
import type { Plan } from '@/types/plan';
import OptionCard from './OptionCard';

type ResultsPanelProps = {
  plans: Plan[];
  title: string;
  subtitle?: string;
  /** Shows the "Sample data" badge so demo results are never mistaken for live ones. */
  isSample?: boolean;
  /** Controls under the header (chips, toggles). */
  controls?: ReactNode;
  /** Shown when there are no plans; should offer a next action. */
  empty?: ReactNode;
  renderActions?: (plan: Plan, index: number) => ReactNode;
};

/** Right-hand panel: header, optional controls, and at most 3 option cards. */
const ResultsPanel = ({ plans, title, subtitle, isSample, controls, empty, renderActions }: ResultsPanelProps) => {
  const shown = plans.slice(0, MAX_OPTIONS);

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-secondary/5 to-accent/5 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              {title}
            </h3>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          {isSample && (
            <Badge
              variant="outline"
              className="shrink-0 gap-1 border-secondary/40 text-secondary bg-secondary/5"
              title="Hand-made sample data. Not live results."
            >
              <FlaskConical className="h-3 w-3" />
              Sample data
            </Badge>
          )}
        </div>
        {controls && <div className="mt-3 space-y-2">{controls}</div>}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {shown.length > 0
          ? shown.map((plan, i) => (
              <OptionCard key={plan.id} plan={plan} index={i} actions={renderActions?.(plan, i)} />
            ))
          : empty}
      </div>
    </div>
  );
};

export default ResultsPanel;
