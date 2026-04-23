import { useNavigate, useLocation } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { Button } from '@/components/ui/button';
import { DriverCard } from '@/components/grp/DriverCard';
import { GRPBadge } from '@/components/grp/GRPBadge';
import { DemoDriver } from '@/types/grp';
import { 
  Shield, 
  MapPin, 
  Navigation, 
  Phone, 
  MessageSquare,
  Share2,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { CountdownTimer } from '@/components/grp/CountdownTimer';

export default function RideConfirmedScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentLocation, destination } = useGRP();
  const driver = location.state?.driver as DemoDriver;
  const isGrp = location.state?.isGrp ?? true;
  
  const [eta, setEta] = useState(8);
  const [isArriving, setIsArriving] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate driver approaching over ~8 seconds
  useEffect(() => {
    let elapsed = 0;
    const duration = 8000; // 8s to arrival
    const tick = 200; // ms
    const totalTicks = duration / tick;
    const interval = setInterval(() => {
      elapsed += tick;
      const pct = Math.min(1, elapsed / duration);
      setProgress(pct);
      const remaining = Math.max(0, Math.round((1 - pct) * 8));
      setEta(remaining);
      if (pct >= 1) {
        setIsArriving(true);
        clearInterval(interval);
      }
    }, tick);

    return () => clearInterval(interval);
  }, []);

  if (!driver) {
    navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background mobile-safe-top mobile-safe-bottom">
      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-b from-secondary/50 to-background">
        {/* Simulated map with route */}
        <div className="absolute inset-0 opacity-18">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <path
              d="M 18 78 Q 45 50 82 32"
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="0.9"
              strokeDasharray="3 3"
              className="opacity-60"
            />
          </svg>
        </div>

        {/* Pickup marker */}
        <div className="absolute bottom-1/4 left-1/4">
          <div className="relative">
            <div className="w-4 h-4 bg-success rounded-full shadow-lg" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-success" />
          </div>
        </div>

        {/* Destination marker */}
        <div className="absolute top-1/3 right-1/4">
          <div className="relative">
            <div className="w-4 h-4 bg-grp rounded-full shadow-lg" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-grp" />
          </div>
        </div>

        {/* Driver marker (animated SVG car) */}
        <div 
          className="absolute transition-all duration-1000"
          style={{ 
            bottom: `${25 + (isArriving ? 0 : 10) - progress * 10}%`, 
            left: `${25 + (isArriving ? 0 : 15) - progress * 12}%` 
          }}
        >
          <div className="relative w-12 h-12">
            <svg viewBox="0 0 24 24" className="w-12 h-12">
              <g transform="translate(0,0)">
                <rect x="3" y="7" width="18" height="6" rx="1.5" fill="#111827" opacity="0.9" />
                <rect x="5" y="5" width="6" height="3" rx="1" fill="#60a5fa" opacity="0.95" />
                <rect x="13" y="5" width="6" height="3" rx="1" fill="#34d399" opacity="0.95" />
                <circle cx="7" cy="15" r="1.6" fill="#111827" />
                <circle cx="17" cy="15" r="1.6" fill="#111827" />
              </g>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-5 h-5 rounded-full bg-grp/20" />
            </div>
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-grp/30 animate-ping" />
          </div>
        </div>

        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
          {isGrp && <GRPBadge size="sm" />}
          <Button variant="glass" size="sm" className="ml-auto">
            <Share2 className="w-4 h-4" />
            Share Location
          </Button>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="glass-card rounded-t-3xl p-6 space-y-4 shadow-card">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isArriving ? 'bg-success/20' : 'bg-grp/20'}`}>
              {isArriving ? (
                <CheckCircle className="w-6 h-6 text-success" />
              ) : (
                <Clock className="w-6 h-6 text-grp" />
              )}
            </div>
            <div>
              <p className="font-semibold text-foreground">
                {isArriving ? 'Driver Arrived!' : 'Driver on the way'}
              </p>
              <p className="text-sm text-muted-foreground">
                {isArriving ? 'Look for ' + driver.name : `Arriving in ${eta} min`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-card">
                <div className="relative inline-flex">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                    <path className="text-card" d="M18 2a16 16 0 1 0 0 32 16 16 0 0 0 0-32" fill="none" stroke="#111827" strokeWidth="4" opacity="0.08" />
                    <path className="text-grp" strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="" />
                    <circle cx="18" cy="18" r="14" stroke="#10b981" strokeWidth="2" strokeDasharray={`${progress * 88} 88`} strokeLinecap="round" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-grp font-semibold">{eta}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">min</div>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <DriverCard 
          driver={driver} 
          distance={0.8} 
          eta={eta}
          showContact
        />

        {/* Trip Summary */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
          <div className="flex flex-col items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <div className="w-0.5 h-6 bg-border" />
            <div className="w-2.5 h-2.5 rounded-full bg-grp" />
          </div>
          <div className="flex-1 space-y-3 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Pickup</p>
              <p className="font-medium text-foreground truncate">{currentLocation?.address}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Destination</p>
              <p className="font-medium text-foreground truncate">{destination?.address}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="lg">
            <MessageSquare className="w-5 h-5" />
            Message
          </Button>
          <Button variant="success" size="lg">
            <Phone className="w-5 h-5" />
            Call Driver
          </Button>
        </div>
      </div>
    </div>
  );
}
