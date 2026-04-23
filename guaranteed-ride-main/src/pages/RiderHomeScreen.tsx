import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { Button } from '@/components/ui/button';
import { LocationInput } from '@/components/grp/LocationInput';
import { GRPBadge } from '@/components/grp/GRPBadge';
import { DriverCard } from '@/components/grp/DriverRiderCard';
import { Location } from '@/types/grp';
import { 
  Shield, 
  MapPin, 
  Menu, 
  User, 
  Settings, 
  LogOut,
  Navigation,
  Zap,
  ToggleLeft,
  ToggleRight,
  TrendingUp,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RiderHomeScreen() {
  const navigate = useNavigate();
  const { profile, currentLocation, destination, setDestination, signOut, demoMode, setDemoMode } = useGRP();
  const [showMenu, setShowMenu] = useState(false);
  const [showAvailableDrivers, setShowAvailableDrivers] = useState(false);
  const [selectedRideType, setSelectedRideType] = useState<'quick' | 'safe' | 'premium'>('quick');
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const [mapMarkerPositions, setMapMarkerPositions] = useState<Record<string, { left: number; top: number }>>({});

  const availableDrivers = [
    { id: '1', name: 'Amit Kumar', rating: 4.9, reviews: 342, vehicle: 'Toyota Innova • KA01XY5678', eta: 2, distance: 0.8, badge: 'top' as const },
    { id: '2', name: 'Priya Singh', rating: 4.8, reviews: 287, vehicle: 'Maruti Swift • DL05AB1234', eta: 4, distance: 1.2, badge: 'eco' as const },
    { id: '3', name: 'Rajesh Patel', rating: 4.7, reviews: 156, vehicle: 'Hyundai Xcent • MH02CD5678', eta: 6, distance: 1.5, badge: 'premium' as const },
    { id: '4', name: 'Neha Mehra', rating: 4.9, reviews: 412, vehicle: 'Honda City • KA03GH9876', eta: 3, distance: 1.0, badge: 'top' as const },
    { id: '5', name: 'Vikram Joshi', rating: 4.6, reviews: 98, vehicle: 'Tata Nexon • MH04JK1111', eta: 5, distance: 1.8, badge: 'eco' as const },
    { id: '6', name: 'Sara Thomas', rating: 4.8, reviews: 210, vehicle: 'Honda Amaze • DL08LM2222', eta: 7, distance: 2.3, badge: 'premium' as const },
    { id: '7', name: 'Karan Verma', rating: 4.5, reviews: 65, vehicle: 'Maruti Dzire • TN07OP3333', eta: 8, distance: 2.9, badge: 'eco' as const },
    { id: '8', name: 'Anjali Rao', rating: 4.9, reviews: 529, vehicle: 'Toyota Camry • KA02QR4444', eta: 1, distance: 0.5, badge: 'top' as const },
    { id: '9', name: 'Mohit Sharma', rating: 4.7, reviews: 178, vehicle: 'Hyundai i20 • MH01ST5555', eta: 6, distance: 1.6, badge: 'eco' as const },
    { id: '10', name: 'Ritu Kapoor', rating: 4.8, reviews: 301, vehicle: 'Skoda Rapid • DL02UV6666', eta: 4, distance: 1.1, badge: 'premium' as const },
    { id: '11', name: 'Deepak Singh', rating: 4.4, reviews: 44, vehicle: 'Maruti Baleno • GJ05WX7777', eta: 9, distance: 3.2, badge: 'eco' as const },
    { id: '12', name: 'Maya Dutta', rating: 4.9, reviews: 410, vehicle: 'Honda Civic • KA09YZ8888', eta: 2, distance: 0.9, badge: 'top' as const },
  ];

  // Initialize and animate marker positions for the small map preview
  useEffect(() => {
    const positions: Record<string, { left: number; top: number }> = {};
    availableDrivers.slice(0, 12).forEach((d, i) => {
      const left = 12 + (i % 5) * 16 + (i % 2 === 0 ? -4 : 4);
      const top = 18 + Math.floor(i / 5) * 14 + (i % 3 === 0 ? -3 : 3);
      positions[d.id] = { left, top };
    });
    setMapMarkerPositions(positions);

    const t = setInterval(() => {
      setMapMarkerPositions(prev => {
        const next = { ...prev };
        Object.keys(next).forEach((id, idx) => {
          const jitterX = (Math.random() - 0.5) * 3; // +/-1.5%
          const jitterY = (Math.random() - 0.5) * 3;
          next[id] = {
            left: Math.min(96, Math.max(4, (next[id]?.left ?? 50) + jitterX)),
            top: Math.min(92, Math.max(4, (next[id]?.top ?? 50) + jitterY)),
          };
        });
        return next;
      });
    }, 1100 + Math.floor(Math.random() * 400));

    return () => clearInterval(t);
  }, []);

  const handleBookGRP = () => {
    if (destination) {
      navigate('/grp-confirm');
    }
  };

  const handleBookNormal = () => {
    if (destination) {
      // For normal rides, skip GRP confirmation
      navigate('/finding-driver', { state: { isGrp: false } });
    }
  };

  const handleSelectDriver = (driverId: string) => {
    navigate('/ride-confirmed');
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-background">
      {/* Minimal Map Preview - Responsive Height */}
      <div className="h-24 md:h-48 lg:h-96 absolute inset-x-0 top-0 bg-gradient-to-b from-secondary/50 to-background z-0">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-3 md:top-6 md:left-8 w-8 md:w-16 h-8 md:h-16 border border-muted rounded-full" />
          <div className="absolute top-4 right-5 md:top-12 md:right-12 w-6 md:w-12 h-6 md:h-12 border border-muted rounded-full" />
        </div>
        
        {/* Current location marker */}
        <div className="absolute top-4 md:top-12 left-1/2 -translate-x-1/2">
          <div className="relative">
            <div className="w-2 md:w-3 h-2 md:h-3 bg-success rounded-full shadow-lg" />
            <div className="absolute inset-0 w-2 md:w-3 h-2 md:h-3 bg-success rounded-full animate-ping opacity-50" />
          </div>
        </div>
      </div>

      {/* Mobile Header - Responsive */}
      <header className="relative z-20 px-3 md:px-6 lg:px-8 py-2 md:py-4 h-16 md:h-20 lg:h-24 flex items-center justify-between safe-area-top bg-transparent">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-9 md:w-11 h-9 md:h-11 rounded-lg md:rounded-xl bg-card/95 backdrop-blur border border-border flex items-center justify-center shadow-md active:bg-card transition-colors flex-shrink-0"
        >
          <Menu className="w-4 md:w-5 h-4 md:h-5 text-foreground" />
        </button>

        <div className="flex-1" />

        <button
          onClick={() => navigate('/profile')}
          className="w-9 md:w-11 h-9 md:h-11 rounded-lg md:rounded-xl bg-card/95 backdrop-blur border border-border flex items-center justify-center shadow-md overflow-hidden active:bg-card transition-colors flex-shrink-0 shadow-grp"
        >
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User className="w-4 md:w-5 h-4 md:h-5 text-foreground" />
          )}
        </button>
      </header>

      {/* Menu Overlay */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowMenu(false)}
        >
          <div 
            className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-grp flex items-center justify-center">
                <span className="text-xl font-bold text-white">
                  {profile?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{profile?.name || 'User'}</p>
                <p className="text-sm text-muted-foreground">{profile?.role}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => { navigate('/profile'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <User className="w-5 h-5 text-muted-foreground" />
                <span>My Profile</span>
              </button>
              <button 
                onClick={() => { navigate('/ride-history'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span>Ride History</span>
              </button>
              <button 
                onClick={() => { navigate('/wallet'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <Zap className="w-5 h-5 text-muted-foreground" />
                <span>Wallet & Balance</span>
              </button>
              <button 
                onClick={() => { navigate('/promos'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>Promo Codes</span>
              </button>
              <button 
                onClick={() => { navigate('/referral'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <Navigation className="w-5 h-5 text-muted-foreground" />
                <span>Refer & Earn</span>
              </button>
              <button 
                onClick={() => { navigate('/ratings'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>Ratings & Reviews</span>
              </button>

              <div className="my-3 pt-3 border-t border-border/30">
                <p className="text-xs font-semibold text-muted-foreground px-4 mb-2">AI FEATURES</p>
              </div>

              <button 
                onClick={() => { navigate('/pricing-analytics'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
                <span>Surge Pricing</span>
              </button>

              <button 
                onClick={() => { navigate('/smart-matching'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <Navigation className="w-5 h-5 text-muted-foreground" />
                <span>Smart Matching</span>
              </button>

              <button 
                onClick={() => { navigate('/ai-support'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                <span>AI Support</span>
              </button>

              <button 
                onClick={() => { navigate('/demand-forecasting'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
                <span>Demand Forecast</span>
              </button>

              <button 
                onClick={() => { navigate('/fraud-detection'); setShowMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                <Shield className="w-5 h-5 text-muted-foreground" />
                <span>Fraud Detection</span>
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => setDemoMode(!demoMode)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors"
              >
                {demoMode ? (
                  <ToggleRight className="w-5 h-5 text-grp" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                )}
                <span>Demo Mode</span>
                <span className={cn(
                  'ml-auto text-xs font-medium px-2 py-0.5 rounded-full',
                  demoMode ? 'bg-grp/20 text-grp' : 'bg-muted text-muted-foreground'
                )}>
                  {demoMode ? 'ON' : 'OFF'}
                </span>
              </button>
              <button
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition-colors text-destructive"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Small Map Preview (fills the header empty space) */}
      <div className="w-full px-3 md:px-6 lg:px-8 mt-2 z-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-card/95 glass-card border border-border rounded-2xl overflow-hidden p-2">
            <div className="flex items-center justify-between px-2 pb-2">
              <div>
                <p className="text-xs text-muted-foreground">Nearby drivers</p>
                <p className="text-sm font-semibold text-foreground">{availableDrivers.length} drivers near you</p>
              </div>
              <div className="text-xs text-muted-foreground">SmartMatch • Live</div>
            </div>

            <div className="relative h-36 md:h-44 rounded-lg bg-gradient-to-b from-secondary/6 to-background/0">
              {availableDrivers.slice(0, 10).map((d, i) => {
                // position markers roughly by index
                const left = 12 + (i % 5) * 16 + (i % 2 === 0 ? -4 : 4);
                const top = 18 + Math.floor(i / 5) * 14 + (i % 3 === 0 ? -3 : 3);
                const isNearest = i === 0; // first one is nearest in our demo array
                return (
                  <div
                    key={d.id}
                    title={`${d.name} • ${d.rating}★ • ${d.eta}m`}
                    className={cn('absolute w-3.5 h-3.5 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all',
                      isNearest ? 'bg-grp ring-2 ring-grp/40 marker-pulse animate-glow z-20' : 'bg-muted-foreground/60')}
                    style={{ left: `${left}%`, top: `${top}%` }}
                  />
                );
              })}

              {/* center current location marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-4 h-4 rounded-full bg-success shadow-lg" />
              </div>
            </div>

            {/* Nearest driver preview card */}
            <div className="absolute left-4 bottom-3 w-[calc(100%-2rem)] md:w-auto md:left-6 md:bottom-4">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-card/90 border border-border shadow-md">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-semibold text-muted-foreground">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{availableDrivers[0].name}</p>
                  <p className="text-xs text-muted-foreground">{availableDrivers[0].vehicle} • {availableDrivers[0].rating}★ • {availableDrivers[0].eta} min</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="grp" onClick={() => { setShowAvailableDrivers(true); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }}>
                    Track
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero + Booking Panel - Responsive Layout */}
      <div className="flex-1 w-full overflow-hidden flex flex-col mt-24 md:mt-48 lg:mt-96">
        <div className="flex-1 rounded-t-2xl md:rounded-none lg:rounded-none bg-card/98 backdrop-blur-lg border-t border-border overflow-y-auto safe-area-bottom scrollbar-hide">
          <div className="w-full max-w-2xl mx-auto px-3 md:px-6 lg:px-8 py-3 md:py-6 lg:py-8 space-y-2.5 md:space-y-4">

            {/* Hero: clean image + headline */}
            <div className="relative gradient-glass rounded-2xl p-3 md:p-4 shadow-sm border border-border/20 overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-foreground">Get a ride in minutes</h2>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">Safe, fast and affordable rides near you</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setSelectedRideType('quick')}>Quick</Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedRideType('safe')}>Safe</Button>
                  </div>
                </div>
                <div className="w-28 h-16 md:w-36 md:h-20 flex-shrink-0">
                  <img src="/car-illustration.svg" alt="car" className="w-full h-full object-contain animate-float transform-gpu drop-shadow-2xl" />
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-40 pointer-events-none hidden md:block">
                <img src="/ride-decor.svg" alt="decor" className="w-48 h-20 object-contain" />
              </div>
            </div>
          
          {/* Current Location Chip - Responsive */}
          <div className="flex items-center gap-2.5 md:gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl bg-secondary/50 border border-border/30">
            <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
              <Navigation className="w-3.5 md:w-4 h-3.5 md:h-4 text-success" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-muted-foreground leading-tight">Pickup From</p>
              <p className="font-semibold text-foreground text-xs md:text-sm truncate">{currentLocation?.address?.split(',')[0] || 'Current Location'}</p>
            </div>
          </div>

          {/* Destination Input - Responsive */}
          <div>
            <p className="text-xs md:text-sm text-muted-foreground px-1 mb-1.5 md:mb-2 font-medium">Where to?</p>
            <LocationInput
              label="Destination"
              placeholder="Enter destination"
              value={destination}
              onChange={setDestination}
              variant="destination"
            />
          </div>

          {/* Ride Type Selection - Responsive */}
          <div className="space-y-1.5 md:space-y-2">
            <p className="text-xs md:text-sm text-muted-foreground px-1 font-medium">Choose Ride Type</p>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              <button
                onClick={() => setSelectedRideType('quick')}
                className={cn(
                  'p-2.5 md:p-3 rounded-lg md:rounded-xl transition-all border-2 touch-manipulation',
                  selectedRideType === 'quick'
                    ? 'bg-blue-500/20 border-blue-500 shadow-lg'
                    : 'bg-card border-border active:border-blue-300'
                )}
              >
                <div className="text-xl md:text-2xl mb-0.5 md:mb-1">⚡</div>
                <p className="text-xs md:text-sm font-bold leading-tight">Quick</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Budget</p>
              </button>

              <button
                onClick={() => setSelectedRideType('safe')}
                className={cn(
                  'p-2.5 md:p-3 rounded-lg md:rounded-xl transition-all border-2 touch-manipulation',
                  selectedRideType === 'safe'
                    ? 'bg-green-500/20 border-green-500 shadow-lg'
                    : 'bg-card border-border active:border-green-300'
                )}
              >
                <div className="text-xl md:text-2xl mb-0.5 md:mb-1">🛡️</div>
                <p className="text-xs md:text-sm font-bold leading-tight">Safe</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Verified</p>
              </button>

              <button
                onClick={() => setSelectedRideType('premium')}
                className={cn(
                  'p-2.5 md:p-3 rounded-lg md:rounded-xl transition-all border-2 touch-manipulation',
                  selectedRideType === 'premium'
                    ? 'bg-purple-500/20 border-purple-500 shadow-lg'
                    : 'bg-card border-border active:border-purple-300'
                )}
              >
                <div className="text-xl md:text-2xl mb-0.5 md:mb-1">✨</div>
                <p className="text-xs md:text-sm font-bold leading-tight">Premium</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">Comfort</p>
              </button>
            </div>
          </div>

          {/* Book Button - Responsive */}
          <Button
            variant="grp"
            size="lg"
            onClick={() => {
              if (destination) {
                if (selectedRideType === 'safe') {
                  navigate('/grp-confirm');
                } else {
                  navigate('/finding-driver', { state: { isGrp: false } });
                }
              }
            }}
            disabled={!destination}
            className="w-full h-12 md:h-14 lg:h-16 text-base md:text-lg font-bold relative touch-manipulation active:scale-95 transition-transform animate-glow shadow-grp"
          >
            <span>Book {selectedRideType === 'quick' ? '⚡' : selectedRideType === 'safe' ? '🛡️' : '✨'}</span>
          </Button>

          {/* Available Drivers Section */}
          {destination && (
            <div className="space-y-1.5 pt-1.5 border-t border-border/30">
              <button
                onClick={() => setShowAvailableDrivers(!showAvailableDrivers)}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-accent/50 hover:bg-accent/70 active:bg-accent/90 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-base">👥</span>
                  <div className="text-left">
                    <p className="font-semibold text-xs">Drivers Nearby</p>
                    <p className="text-xs text-muted-foreground leading-tight">{availableDrivers.length} available</p>
                  </div>
                </div>
                {showAvailableDrivers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showAvailableDrivers && (
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {availableDrivers.slice(0, 5).map((driver) => (
                    <div key={driver.id} className="animate-scale-in">
                      <DriverCard
                        {...driver}
                        onSelect={() => handleSelectDriver(driver.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI Features Collapsible Section */}
          <div className="pt-1.5 border-t border-border/30">
            <button
              onClick={() => setShowAIFeatures(!showAIFeatures)}
              className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-accent/30 active:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">🤖</span>
                <p className="font-semibold text-xs">AI Features</p>
              </div>
              {showAIFeatures ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showAIFeatures && (
              <div className="grid grid-cols-2 gap-1.5 mt-1.5">
                <button
                  onClick={() => navigate('/pricing-analytics')}
                  className="p-2 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30 hover:border-orange-500/50 active:border-orange-500/70 hover:bg-orange-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">📊</p>
                  <p className="font-semibold text-foreground text-xs">Surge</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Pricing</p>
                </button>

                <button
                  onClick={() => navigate('/smart-matching')}
                  className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30 hover:border-blue-500/50 active:border-blue-500/70 hover:bg-blue-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">🎯</p>
                  <p className="font-semibold text-foreground text-xs">Smart</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Match</p>
                </button>

                <button
                  onClick={() => navigate('/ai-support')}
                  className="p-2 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 hover:border-green-500/50 active:border-green-500/70 hover:bg-green-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">💬</p>
                  <p className="font-semibold text-foreground text-xs">AI</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Chat</p>
                </button>

                <button
                  onClick={() => navigate('/demand-forecasting')}
                  className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 hover:border-purple-500/50 active:border-purple-500/70 hover:bg-purple-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">📈</p>
                  <p className="font-semibold text-foreground text-xs">Demand</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Forecast</p>
                </button>

                <button
                  onClick={() => navigate('/fraud-detection')}
                  className="p-2 rounded-lg bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 hover:border-red-500/50 active:border-red-500/70 hover:bg-red-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">🛡️</p>
                  <p className="font-semibold text-foreground text-xs">Fraud</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Guard</p>
                </button>

                <button
                  onClick={() => navigate('/driver-behavior')}
                  className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 hover:border-cyan-500/50 active:border-cyan-500/70 hover:bg-cyan-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">📊</p>
                  <p className="font-semibold text-foreground text-xs">Safety</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Scores</p>
                </button>

                <button
                  onClick={() => navigate('/revenue-optimization')}
                  className="p-2 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 hover:border-yellow-500/50 active:border-yellow-500/70 hover:bg-yellow-500/20 transition-all text-center text-xs touch-manipulation"
                >
                  <p className="text-lg mb-0.5">💰</p>
                  <p className="font-semibold text-foreground text-xs">Earnings</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Optimizer</p>
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
