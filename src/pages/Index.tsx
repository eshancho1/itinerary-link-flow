import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import MapSection from '@/components/MapSection';
import ChatSection from '@/components/ChatSection';
import DemoResults from '@/demo/DemoResults';
import { DEMO_AREAS, type DemoAreaId } from '@/demo/places';
import { DEMO_RADIUS_KM } from '@/demo/plans';
import { useDemoMode } from '@/lib/demo-mode';
import { PLAN_TYPES } from '@/lib/labels';
import type { PlanType } from '@/types/plan';

const Index = () => {
  const [demo, setDemo] = useDemoMode();
  const [params, setParams] = useSearchParams();

  const areaParam = params.get('area');
  const typeParam = params.get('type');
  const areaId: DemoAreaId = areaParam && areaParam in DEMO_AREAS ? (areaParam as DemoAreaId) : 'east-village';
  const planType: PlanType = PLAN_TYPES.includes(typeParam as PlanType) ? (typeParam as PlanType) : 'three-step';

  const setParam = (key: string, value: string) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(key, value);
        return next;
      },
      { replace: true },
    );

  const area = DEMO_AREAS[areaId];

  return (
    <div className="min-h-screen bg-background">
      <Header demo={demo} onDemoChange={setDemo} />

      <main className="h-[calc(100vh-4rem)]">
        <div className="h-full max-w-7xl mx-auto p-4">
          <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Map Section */}
            <div className="h-full min-h-[50vh] lg:min-h-full">
              <MapSection
                key={demo ? `demo-${areaId}` : 'live'}
                demoArea={demo ? { name: `${area.name}, ${area.borough}`, radiusKm: DEMO_RADIUS_KM } : undefined}
              />
            </div>

            {/* Results / Chat Section */}
            <div className="h-full min-h-[50vh] lg:min-h-full">
              {demo ? (
                <DemoResults
                  areaId={areaId}
                  planType={planType}
                  onAreaChange={(id) => setParam('area', id)}
                  onPlanTypeChange={(t) => setParam('type', t)}
                />
              ) : (
                <ChatSection />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
