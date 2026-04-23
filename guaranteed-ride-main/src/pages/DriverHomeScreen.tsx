import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/grp/CountdownTimer';
import { GRPBadge } from '@/components/grp/GRPBadge';
import { supabase } from '@/integrations/supabase/client';
import { DemoDriver } from '@/types/grp';
import { 
  Shield, 
  MapPin, 
  User,
  Menu,
  ToggleLeft,
  ToggleRight,
  LogOut,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Car,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCountdown } from '@/hooks/useCountdown';
import { useToast } from '@/hooks/use-toast';

const RESPONSE_TIMEOUT = 15; // 15 seconds for driver to respond

interface SimulatedRequest {
  id: string;
  pickupAddress: string;
  destinationAddress: string;
  distance: number;
  isGrp: boolean;
  fare: number;
}

export default function DriverHomeScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, signOut, demoMode, setDemoMode, updateProfile } = useGRP();
  const [showMenu, setShowMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(profile?.is_online ?? false);
  const [currentRequest, setCurrentRequest] = useState<SimulatedRequest | null>(null);
  const [showRequest, setShowRequest] = useState(false);
  const [penaltyAnimation, setPenaltyAnimation] = useState(false);

  const countdown = useCountdown({
    initialSeconds: RESPONSE_TIMEOUT,
    autoStart: false,
    onComplete: () => {
      handleTimeout();
    }
  });

  // Simulate incoming ride requests in demo mode
  useEffect(() => {
    if (!demoMode || !isOnline) return;

    const simulateRequest = () => {
      const requests: SimulatedRequest[] = [
        { id: '1', pickupAddress: 'Connaught Place', destinationAddress: 'India Gate', distance: 2.3, isGrp: true, fare: 85 },
        { id: '2', pickupAddress: 'Saket Metro', destinationAddress: 'Hauz Khas', distance: 1.8, isGrp: true, fare: 65 },
        { id: '3', pickupAddress: 'Rajiv Chowk', destinationAddress: 'Nehru Place', distance: 4.5, isGrp: false, fare: 150 },
        { id: '4', pickupAddress: 'Dwarka Sector 21', destinationAddress: 'IGI Airport', distance: 8.2, isGrp: true, fare: 280 },
      ];

      const randomRequest = requests[Math.floor(Math.random() * requests.length)];
      setCurrentRequest({ ...randomRequest, id: Date.now().toString() });
      setShowRequest(true);
      countdown.restart(RESPONSE_TIMEOUT);
    };

    // Random delay between 5-15 seconds for demo
    const timeout = setTimeout(simulateRequest, 5000 + Math.random() * 10000);

    return () => clearTimeout(timeout);
  }, [demoMode, isOnline, showRequest]);

  const handleAccept = useCallback(() => {
    countdown.pause();
    setShowRequest(false);
    
    toast({
      title: 'Ride Accepted!',
      description: 'Navigate to pickup location',
    });

    // Simulate ride in progress
    setTimeout(() => {
      setCurrentRequest(null);
    }, 3000);
  }, [countdown, toast]);

  const handleSkip = useCallback(async () => {
    countdown.pause();
    
    if (currentRequest?.isGrp) {
      // Apply penalty
      setPenaltyAnimation(true);
      
      if (profile) {
        const newScore = Math.max(0, profile.grp_score - 10);
        await updateProfile({ grp_score: newScore });
        
        toast({
          title: 'GRP Penalty Applied',
          description: `-10 points. New score: ${newScore}`,
          variant: 'destructive'
        });
      }

      setTimeout(() => {
        setPenaltyAnimation(false);
      }, 1000);
    }

    setShowRequest(false);
    setCurrentRequest(null);
  }, [currentRequest, profile, updateProfile, countdown, toast]);

  const handleTimeout = useCallback(() => {
    if (currentRequest?.isGrp) {
      handleSkip();
    } else {
      setShowRequest(false);
      setCurrentRequest(null);
    }
  }, [currentRequest, handleSkip]);

  const toggleOnline = async () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    await updateProfile({ is_online: newStatus });
    
    toast({
      title: newStatus ? 'You are now online' : 'You are now offline',
      description: newStatus ? 'You will receive ride requests' : 'You will not receive requests'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background mobile-safe-top mobile-safe-bottom">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shadow-card"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>

        <div className="flex items-center gap-3">
          <div className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all',
            isOnline 
              ? 'bg-success/20 text-success border border-success/30' 
              : 'bg-muted text-muted-foreground border border-border'
          )}>
            <div className={cn(
              'w-2 h-2 rounded-full',
              isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'
            )} />
            {isOnline ? 'Online' : 'Offline'}
          </div>
        </div>

        <button
          onClick={() => navigate('/profile')}
          className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shadow-card overflow-hidden"
        >
          <User className="w-6 h-6 text-foreground" />
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
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{profile?.name || 'Driver'}</p>
                <p className="text-sm text-muted-foreground">Driver Mode</p>
              </div>
            </div>

            <nav className="space-y-2">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {!showRequest ? (
          // Waiting for requests
          <div className="text-center space-y-6">
            <div className={cn(
              'w-32 h-32 rounded-full flex items-center justify-center mx-auto transition-all',
              isOnline ? 'bg-success/20' : 'bg-muted'
            )}>
              {isOnline ? (
                <Navigation className="w-16 h-16 text-success animate-pulse-slow" />
              ) : (
                <Car className="w-16 h-16 text-muted-foreground" />
              )}
            </div>

            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {isOnline ? 'Waiting for Rides' : 'You\'re Offline'}
              </h2>
              <p className="text-muted-foreground">
                {isOnline 
                  ? 'Stay online to receive ride requests' 
                  : 'Go online to start receiving requests'}
              </p>
            </div>

            {/* GRP Score Card */}
            <div className={cn(
              'glass-card rounded-2xl p-6 w-full max-w-sm mx-auto transition-all',
              penaltyAnimation && 'ring-2 ring-destructive animate-shake'
            )}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-grp" />
                  <span className="font-medium text-foreground">GRP Score</span>
                </div>
                <GRPBadge size="sm" showText={false} />
              </div>
              <div className="text-center">
                <span className={cn(
                  'text-5xl font-display font-bold',
                  getScoreColor(profile?.grp_score ?? 100)
                )}>
                  {profile?.grp_score ?? 100}
                </span>
                <p className="text-sm text-muted-foreground mt-2">
                  {(profile?.grp_score ?? 100) >= 90 
                    ? 'Excellent! Priority requests enabled'
                    : (profile?.grp_score ?? 100) >= 70
                    ? 'Good standing'
                    : 'Low score - accept more GRP rides'}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-display font-bold text-foreground">
                  {profile?.total_rides ?? 0}
                </p>
                <p className="text-xs text-muted-foreground">Total Rides</p>
              </div>
              <div className="glass-card rounded-xl p-4 text-center">
                <p className="text-2xl font-display font-bold text-success">
                  ₹{((profile?.total_rides ?? 0) * 85).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Earnings</p>
              </div>
            </div>
          </div>
        ) : (
          // Ride Request Modal
          <div className="w-full max-w-sm space-y-6 animate-scale-in">
            {/* Timer */}
            <div className="flex justify-center">
              <CountdownTimer 
                seconds={countdown.seconds} 
                maxSeconds={RESPONSE_TIMEOUT}
                size="lg"
              />
            </div>

            {/* Request Card */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              {currentRequest?.isGrp && (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <GRPBadge size="md" pulse />
                  <span className="text-grp font-semibold">Priority Request</span>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <div className="w-0.5 h-10 bg-border" />
                  <div className="w-3 h-3 rounded-full bg-grp" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup</p>
                    <p className="font-medium text-foreground">{currentRequest?.pickupAddress}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Drop-off</p>
                    <p className="font-medium text-foreground">{currentRequest?.destinationAddress}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {currentRequest?.distance} km
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display font-bold text-success">
                    ₹{currentRequest?.fare}
                  </p>
                </div>
              </div>

              {currentRequest?.isGrp && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-warning/10 text-warning text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>Skipping applies -10 GRP penalty</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="destructive"
                size="xl"
                onClick={handleSkip}
                className="relative"
              >
                <XCircle className="w-6 h-6" />
                Skip
              </Button>
              <Button
                variant="success"
                size="xl"
                onClick={handleAccept}
              >
                <CheckCircle className="w-6 h-6" />
                Accept
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Toggle */}
      <div className="p-6">
        <Button
          variant={isOnline ? 'destructive' : 'grp'}
          size="xl"
          className="w-full"
          onClick={toggleOnline}
        >
          {isOnline ? (
            <>
              <XCircle className="w-6 h-6" />
              Go Offline
            </>
          ) : (
            <>
              <Navigation className="w-6 h-6" />
              Go Online
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
