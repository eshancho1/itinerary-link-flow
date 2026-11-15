import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Circle, Navigation } from 'lucide-react';

type MapSectionProps = {
  /** Demo mode: show the pin on a sample area (mock map until M2). */
  demoArea?: { name: string; radiusKm: number };
};

const MapSection = ({ demoArea }: MapSectionProps) => {
  const [clickedPoint, setStartPoint] = useState<{ lat: number; lng: number } | null>(null);
  const startPoint = demoArea ? true : clickedPoint;
  const [radius, setRadius] = useState(5);

  const ring = demoArea ? 160 : radius * 8;

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to mock coordinates
    const lat = 40.7128 + (y - rect.height / 2) * 0.001;
    const lng = -74.0060 + (x - rect.width / 2) * 0.001;
    
    setStartPoint({ lat, lng });
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-lg shadow-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Set Your Starting Point
          </h3>
          <Button variant="outline" size="sm">
            <Navigation className="h-4 w-4" />
            Use Current Location
          </Button>
        </div>
        
        {/* Radius Control */}
        <div className="flex items-center gap-3">
          <Circle className="h-4 w-4 text-secondary" />
          <span className="text-sm text-muted-foreground">Radius:</span>
          <input
            type="range"
            min="1"
            max="50"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium text-foreground min-w-[3rem]">
            {radius} km
          </span>
        </div>
      </div>

      {/* Mock Map Area */}
      <div 
        className="flex-1 relative bg-gradient-to-br from-secondary/10 to-primary/10 cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Mock Map Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Demo area label */}
        {demoArea && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full border border-border text-xs font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-primary" />
            {demoArea.name}
          </div>
        )}

        {/* Start Point Marker */}
        {startPoint && (
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{
              left: '50%',
              top: '50%'
            }}
          >
            <div className="relative">
              <div className="w-6 h-6 bg-primary rounded-full border-2 border-background shadow-lg animate-pulse"></div>
              <div 
                className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping"
                style={{
                  width: `${ring}px`,
                  height: `${ring}px`,
                  marginLeft: `-${ring / 2 - 12}px`,
                  marginTop: `-${ring / 2 - 12}px`
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!startPoint && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-6 bg-card/80 backdrop-blur-sm rounded-lg border border-border">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-muted-foreground">Click anywhere to set your starting point</p>
            </div>
          </div>
        )}

        {/* Mock Route Visualization */}
        {startPoint && (
          <div className="absolute inset-0 pointer-events-none">
            <svg className="w-full h-full">
              <path
                d="M 50% 50% Q 60% 30% 70% 40% T 80% 60%"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
                className="animate-pulse"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="p-3 bg-muted/50 text-sm text-muted-foreground">
        {demoArea ? (
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            Sample area • {demoArea.name} • {demoArea.radiusKm} km radius
          </span>
        ) : startPoint ? (
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            Start point set • {radius}km radius • Ready to plan
          </span>
        ) : (
          <span>Set your starting location to begin planning</span>
        )}
      </div>
    </div>
  );
};

export default MapSection;