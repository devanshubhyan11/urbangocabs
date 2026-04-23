import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { useDriverMatching } from '@/hooks/useDriverMatching';
import { useCountdown } from '@/hooks/useCountdown';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/grp/CountdownTimer';
import { DriverCard } from '@/components/grp/DriverCard';
import { GRPBadge } from '@/components/grp/GRPBadge';
import { DemoDriver } from '@/types/grp';
import { 
  Shield, 
  Search, 
  MapPin, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Radar
} from 'lucide-react';
import { cn } from '@/lib/utils';

const DRIVER_RESPONSE_TIMEOUT = 10; // seconds (shorter user-facing response window)

export default function FindingDriverScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLocation, destination, createRide, currentRide, setCurrentRide, demoDrivers } = useGRP();
  const isGrp = location.state?.isGrp ?? true;
  
  const [phase, setPhase] = useState<'searching' | 'waiting' | 'found' | 'failed'>('searching');
  const [candidateDriver, setCandidateDriver] = useState<DemoDriver | null>(null);
  const [matchedDriver, setMatchedDriver] = useState<DemoDriver | null>(null);
  const [searchRadius, setSearchRadius] = useState(1.0);
  const [attemptCount, setAttemptCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [markerPositions, setMarkerPositions] = useState<Record<string, { left: number; top: number }>>({});
  const [trailDots, setTrailDots] = useState<Array<{ key: number; id: string; left: number; top: number }>>([]);
  const trailKey = useRef(0);
  const [markerAngles, setMarkerAngles] = useState<Record<string, number>>({});
  const prevPositions = useRef<Record<string, { left: number; top: number }>>({});

  const countdown = useCountdown({
    initialSeconds: DRIVER_RESPONSE_TIMEOUT,
    autoStart: false,
    onComplete: () => {
      // Driver didn't respond in time
      handleDriverTimeout();
    }
  });

  const handleDriverTimeout = useCallback(() => {
    setFailedCount(prev => prev + 1);
    setPhase('searching');
    setCandidateDriver(null);
    
    // Find next driver
    findNextDriver();
  }, []);

  // Initialize marker positions when demo drivers load
  useEffect(() => {
    if (!demoDrivers || demoDrivers.length === 0) return;
    const positions: Record<string, { left: number; top: number }> = {};
    demoDrivers.slice(0, 12).forEach((d, i) => {
      const simulDist = 0.5 + i * 0.3;
      const left = Math.min(88, (simulDist / 5) * 100);
      const top = 8 + (i % 5) * 18;
      positions[d.id] = { left, top };
    });
    setMarkerPositions(positions);
    prevPositions.current = positions;
  }, [demoDrivers]);

  // Slightly jitter markers to simulate movement
  useEffect(() => {
    const t = setInterval(() => {
      setMarkerPositions((prev) => {
        const next: Record<string, { left: number; top: number }> = { ...prev };
        const anglesUpdate: Record<string, number> = {};
        Object.keys(next).forEach((id) => {
          // don't jitter the matched driver while it's animating to center
          if (matchedDriver && matchedDriver.id === id) return;
          const prev = prevPositions.current[id] ?? next[id];
          const jitterX = (Math.random() - 0.5) * 2.2; // +/-1.1%
          const jitterY = (Math.random() - 0.5) * 2.2; // +/-1.1%
          const newLeft = Math.min(96, Math.max(4, next[id].left + jitterX));
          const newTop = Math.min(92, Math.max(4, next[id].top + jitterY));
          // compute heading angle (approx) from prev -> new
          const dx = newLeft - (prev.left ?? newLeft);
          const dy = newTop - (prev.top ?? newTop);
          const angle = Math.round((Math.atan2(dy, dx) * 180) / Math.PI || 0);
          anglesUpdate[id] = angle;
          next[id] = { left: newLeft, top: newTop };
        });
        // commit angles to state
        setMarkerAngles((prevA) => ({ ...prevA, ...anglesUpdate }));
        prevPositions.current = next;
        return next;
      });
    }, 1200);

    return () => clearInterval(t);
  }, [matchedDriver]);

  // Animate matched driver marker to center when matchedDriver changes
  useEffect(() => {
    if (!matchedDriver) return;
    const id = matchedDriver.id;
    const base = markerPositions[id] ?? { left: 50, top: 50 };

    // animate marker to center with a short delay for realism
    setTimeout(() => {
      setMarkerPositions((prev) => ({
        ...prev,
        [id]: { left: 50, top: 50 },
      }));
    }, 120);

    // spawn trail dots along interpolated path
    const steps = 8;
    const duration = 700; // ms
    for (let i = 0; i < steps; i++) {
      const t = (i + 1) / steps;
      const spawnTime = Math.round(t * duration);
      const left = base.left + (50 - base.left) * t;
      const top = base.top + (50 - base.top) * t;
      const key = ++trailKey.current;
      setTimeout(() => {
        setTrailDots((s) => [...s, { key, id, left: left + (Math.random() - 0.5) * 3, top: top + (Math.random() - 0.5) * 3 }]);
        // remove after lifespan
        setTimeout(() => setTrailDots((s) => s.filter(t => t.key !== key)), 1000 + Math.round(Math.random() * 300));
      }, spawnTime);
    }
  }, [matchedDriver]);

  const findNextDriver = useCallback(() => {
    if (!currentLocation || !demoDrivers.length) return;

    const availableDrivers = demoDrivers.filter(d => 
      d.is_available && 
      !matchedDriver
    );

    // Sort by distance (simulated)
    const sorted = availableDrivers
      .map((d, i) => ({ ...d, distance: 0.5 + i * 0.3 }))
      .filter(d => d.distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance);

    if (sorted.length === 0) {
      // Expand radius
      if (searchRadius < 5) {
        setSearchRadius(prev => prev + 1);
        setPhase('searching');
        return;
      } else {
        setPhase('failed');
        return;
      }
    }

    // Pick next driver based on attempt count
    const nextDriver = sorted[attemptCount % sorted.length];
    setCandidateDriver(nextDriver);
    setAttemptCount(prev => prev + 1);
    setPhase('waiting');
    countdown.restart(DRIVER_RESPONSE_TIMEOUT);

    // Simulate driver response (randomized to produce ~1-8s responses)
    const simulatedResponseMs = Math.max(800, Math.min(8000, 1000 + Math.floor(Math.random() * 7000)));
    setTimeout(() => {
      if (nextDriver.will_accept) {
        setMatchedDriver(nextDriver);
        setPhase('found');
        countdown.pause();

        // Navigate to ride confirmed after short delay
        setTimeout(() => {
          navigate('/ride-confirmed', { 
            state: { driver: nextDriver, isGrp } 
          });
        }, 1200);
      } else {
        handleDriverTimeout();
      }
    }, simulatedResponseMs);
  }, [currentLocation, demoDrivers, searchRadius, attemptCount, matchedDriver, countdown, navigate, isGrp, handleDriverTimeout]);

  // Start the ride and matching process
  useEffect(() => {
    const startRide = async () => {
      if (!currentLocation || !destination) {
        navigate('/home');
        return;
      }

      try {
        await createRide(currentLocation, destination, isGrp);
        
        // Start finding drivers after a short delay
        setTimeout(() => {
          findNextDriver();
        }, 1500);
      } catch (error) {
        console.error('Failed to create ride:', error);
        navigate('/home');
      }
    };

    startRide();
  }, []);

  const getStatusMessage = () => {
    switch (phase) {
      case 'searching':
        return `Searching within ${searchRadius.toFixed(1)} km...`;
      case 'waiting':
        return 'Waiting for driver response...';
      case 'found':
        return 'Driver found!';
      case 'failed':
        return 'No drivers available';
    }
  };

  const selectedDriver = matchedDriver ?? candidateDriver;
  const aiScore = selectedDriver ? Math.round(((selectedDriver.rating || 4.5) / 5) * 100) : null;
  const selectedIndex = selectedDriver ? (demoDrivers?.findIndex(d => d.id === selectedDriver.id) ?? -1) : -1;
  const selectedDistance = selectedIndex >= 0 ? (0.5 + selectedIndex * 0.3) : null;
  const approxEta = selectedDistance ? Math.max(1, Math.round(selectedDistance * 3)) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background mobile-safe-top mobile-safe-bottom">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isGrp && <GRPBadge size="sm" pulse />}
          <span className="font-semibold text-foreground">
            {isGrp ? 'Safe Ride' : 'Quick Ride'}
          </span>
        </div>
        {failedCount > 0 && (
          <span className="text-sm text-muted-foreground">
            Attempt {attemptCount}
          </span>
        )}
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Map Preview + Animation Container */}
        <div className="w-full max-w-md mb-6">
          <div className="relative bg-card rounded-2xl border border-border p-3 overflow-hidden mb-3">
            <div className="text-sm text-muted-foreground mb-2">Drivers near you — SmartMatch AI highlights the best match</div>
            <div className="relative h-44 bg-gradient-to-b from-secondary/8 to-background/0 rounded-lg overflow-hidden">
              {/* Matched ripple (center) */}
              {matchedDriver && (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                  <div className="matched-trail" />
                </div>
              )}
              {/* pseudo-map markers */}
              {demoDrivers?.slice(0, 12).map((d, i) => {
                const simulDist = 0.5 + i * 0.3; // same simulation as matching
                const defaultLeft = Math.min(88, (simulDist / 5) * 100);
                const defaultTop = 8 + (i % 5) * 18;
                const pos = markerPositions[d.id] ?? { left: defaultLeft, top: defaultTop };
                const isCandidate = candidateDriver?.id === d.id;
                const isMatched = matchedDriver?.id === d.id;
                return (
                  <div
                    key={d.id}
                    title={`${d.name} • ${d.rating}★ • ${simulDist.toFixed(1)}km`}
                    className={cn(
                      'absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1200 ease-in-out flex items-center justify-center',
                      isMatched
                        ? 'bg-success/80 ring-2 ring-success/40 marker-pulse animate-glow scale-125 shadow-2xl z-30 marker-highlight-glow'
                        : isCandidate
                        ? 'bg-grp ring-2 ring-grp/40 marker-pulse animate-glow scale-110 marker-drift'
                        : 'bg-card/80 marker-drift'
                    )}
                    style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                  >
                    <span
                      className="block text-xs leading-none"
                      style={{ transform: `rotate(${markerAngles[d.id] ?? 0}deg)` }}
                    >
                      🚗
                    </span>
                  </div>
                );
              })}

              {/* trail dots (fade out) */}
              {trailDots.map((t) => (
                <div
                  key={t.key}
                  className="marker-trail-dot"
                  style={{ left: `${t.left}%`, top: `${t.top}%` }}
                />
              ))}

              {/* center pickup marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 rounded-full bg-grp shadow-lg" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">Showing {demoDrivers?.length || 0} drivers in your area</div>
          </div>
        </div>
        {/* AI Selection Summary */}
        {selectedDriver && (
          <div className="max-w-md mb-6">
            <div className="bg-card rounded-2xl border border-border p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-grp flex items-center justify-center text-white font-semibold text-sm shadow-grp">
                {selectedDriver.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">{selectedDriver.name}</div>
                <div className="text-xs text-muted-foreground">AI Score: <span className="text-grp font-medium">{aiScore}%</span> — Selected for high rating and proximity</div>
              </div>
              <div className="text-xs text-muted-foreground text-right">
                <div>{selectedDriver.rating}★</div>
                <div className="mt-1"><span className="text-muted-foreground">ETA</span> <span className="font-semibold text-foreground">{approxEta ? `${approxEta}m` : '—'}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Animation Container */}
        <div className="relative mb-8">
          {/* Radar Animation */}
          {(phase === 'searching' || phase === 'waiting') && (
            <div className="relative w-48 h-48">
              {/* Radar circles */}
              <div className="absolute inset-0 rounded-full border-2 border-grp/20 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute inset-4 rounded-full border-2 border-grp/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
              <div className="absolute inset-8 rounded-full border-2 border-grp/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                {phase === 'searching' ? (
                  <div className="w-20 h-20 rounded-full bg-grp/20 flex items-center justify-center">
                    <Radar className="w-10 h-10 text-grp animate-spin-slow" />
                  </div>
                ) : (
                  <CountdownTimer 
                    seconds={countdown.seconds} 
                    maxSeconds={DRIVER_RESPONSE_TIMEOUT}
                    size="lg"
                  />
                )}
              </div>
            </div>
          )}

          {/* Success Animation */}
          {phase === 'found' && (
            <div className="w-32 h-32 rounded-full bg-success/20 flex items-center justify-center animate-scale-in">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
          )}

          {/* Failed Animation */}
          {phase === 'failed' && (
            <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center animate-scale-in">
              <XCircle className="w-16 h-16 text-destructive" />
            </div>
          )}
        </div>

        {/* Status */}
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {phase === 'found' ? 'Driver Found!' : phase === 'failed' ? 'No Drivers Available' : 'Finding Your Driver'}
          </h2>
          <p className="text-muted-foreground">{getStatusMessage()}</p>
          {(phase === 'searching' || phase === 'waiting') && (
            <div className="max-w-sm mx-auto mt-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Matching drivers</span>
                <span>{countdown.seconds}s</span>
              </div>
              <div className="w-full h-2 bg-card rounded-full overflow-hidden border border-border">
                <div
                  className="h-full bg-grp transition-all duration-500 ease-linear"
                  style={{ width: `${100 - countdown.progress}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground mt-2">Estimated time: ~{DRIVER_RESPONSE_TIMEOUT}s</div>
            </div>
          )}
          
          {/* Search radius indicator */}
          {(phase === 'searching' || phase === 'waiting') && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Search radius: <span className="text-grp font-medium">{searchRadius.toFixed(1)} km</span>
              </span>
            </div>
          )}
        </div>

        {/* Driver Card (when waiting or found) */}
        {(phase === 'waiting' || phase === 'found') && candidateDriver && (
          <div className="w-full max-w-sm animate-slide-up">
            <DriverCard 
              driver={phase === 'found' && matchedDriver ? matchedDriver : candidateDriver}
              distance={0.8}
              eta={5}
            />
          </div>
        )}

        {/* Failed Count */}
        {failedCount > 0 && phase !== 'found' && (
          <div className="flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-warning/10 text-warning text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{failedCount} driver(s) unavailable</span>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="p-6">
        {isGrp && phase !== 'found' && phase !== 'failed' && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-grp/10 border border-grp/30">
            <Shield className="w-6 h-6 text-grp flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="text-grp font-medium">GRP Mode Active:</span> Drivers who skip will receive penalties
            </p>
          </div>
        )}

        {phase === 'failed' && (
          <Button
            variant="grp"
            size="lg"
            className="w-full"
            onClick={() => {
              setSearchRadius(1);
              setAttemptCount(0);
              setFailedCount(0);
              setPhase('searching');
              findNextDriver();
            }}
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
