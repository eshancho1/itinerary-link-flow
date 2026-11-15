import { useMemo } from 'react';
import { ResultsPanel } from '@/components/results';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PLAN_TYPE_LABELS, PLAN_TYPES } from '@/lib/labels';
import type { PlanType } from '@/types/plan';
import { DEMO_AREA_IDS, DEMO_AREAS, type DemoAreaId } from './places';
import { DEMO_RADIUS_KM, getDemoScenario } from './plans';

type DemoResultsProps = {
  areaId: DemoAreaId;
  planType: PlanType;
  onAreaChange: (id: DemoAreaId) => void;
  onPlanTypeChange: (type: PlanType) => void;
};

const chip =
  'h-8 px-3 text-xs rounded-full border border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary';

/** Demo mode: area + plan-type chips driving the shared ResultsPanel. No API calls. */
const DemoResults = ({ areaId, planType, onAreaChange, onPlanTypeChange }: DemoResultsProps) => {
  const { area, response } = useMemo(() => getDemoScenario(areaId, planType), [areaId, planType]);

  const controls = (
    <>
      <ToggleGroup
        type="single"
        value={areaId}
        onValueChange={(v) => v && onAreaChange(v as DemoAreaId)}
        className="flex-wrap justify-start"
        aria-label="Demo area"
      >
        {DEMO_AREA_IDS.map((id) => (
          <ToggleGroupItem key={id} value={id} className={chip}>
            {DEMO_AREAS[id].name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <ToggleGroup
        type="single"
        value={planType}
        onValueChange={(v) => v && onPlanTypeChange(v as PlanType)}
        className="flex-wrap justify-start"
        aria-label="Plan type"
      >
        {PLAN_TYPES.map((t) => (
          <ToggleGroupItem key={t} value={t} className={chip}>
            {PLAN_TYPE_LABELS[t]}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );

  return (
    <ResultsPanel
      title={PLAN_TYPE_LABELS[planType]}
      subtitle={`${area.name}, ${area.borough} · ${DEMO_RADIUS_KM} km · easy walking`}
      isSample
      controls={controls}
      plans={response.plans}
    />
  );
};

export default DemoResults;
