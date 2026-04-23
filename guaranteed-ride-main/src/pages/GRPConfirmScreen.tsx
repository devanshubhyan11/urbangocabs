import { useNavigate } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { Button } from '@/components/ui/button';
import { GRPBadge, GRPBenefitCard } from '@/components/grp/GRPBadge';
import { Shield, ArrowLeft, Check, Clock, MapPin, Star, AlertTriangle } from 'lucide-react';

export default function GRPConfirmScreen() {
  const navigate = useNavigate();
  const { destination, currentLocation } = useGRP();

  const handleConfirm = () => {
    navigate('/finding-driver', { state: { isGrp: true } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background mobile-safe-top mobile-safe-bottom">
      {/* Header */}
      <header className="p-4 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">Safe Ride Mode</h1>
          <p className="text-sm text-muted-foreground">Guaranteed Ride Protocol</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* GRP Hero */}
        <div className="relative bg-gradient-to-br from-grp/20 to-grp/5 border border-grp/30 rounded-2xl p-6 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-grp/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-grp/10 rounded-full blur-2xl" />
          
          <div className="relative">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-grp flex items-center justify-center shadow-grp">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <GRPBadge size="lg" className="mx-auto mb-3" pulse />
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Guaranteed Pickup
            </h2>
            <p className="text-muted-foreground">
              Your safety is our priority. With GRP, you're guaranteed a ride.
            </p>
          </div>
        </div>

        {/* Trip Summary */}
        <div className="glass-card rounded-xl p-4 space-y-3">
          <h3 className="font-semibold text-foreground">Trip Summary</h3>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-success" />
              <div className="w-0.5 h-8 bg-border" />
              <div className="w-3 h-3 rounded-full bg-grp" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Pickup</p>
                <p className="font-medium text-foreground">{currentLocation?.address || 'Current Location'}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Destination</p>
                <p className="font-medium text-foreground">{destination?.address || 'Not set'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground">GRP Benefits</h3>
          <GRPBenefitCard
            icon="shield"
            title="Guaranteed Pickup"
            description="Automatic driver assignment with no cancellation during search"
          />
          <GRPBenefitCard
            icon="clock"
            title="Priority Matching"
            description="Your request gets priority in the driver matching queue"
          />
          <GRPBenefitCard
            icon="star"
            title="Top-Rated Drivers"
            description="Only drivers with high GRP scores can accept your request"
          />
          <GRPBenefitCard
            icon="map"
            title="Live Tracking"
            description="Real-time location sharing with emergency contacts"
          />
        </div>

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/30">
          <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-warning">Cannot Cancel During Search</p>
            <p className="text-muted-foreground mt-1">
              Once you confirm, you cannot cancel until a driver is assigned or the search fails.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 pt-0">
        <Button
          variant="grp"
          size="xl"
          className="w-full"
          onClick={handleConfirm}
        >
          <Shield className="w-6 h-6" />
          <span>Confirm Safe Ride</span>
        </Button>
      </div>
    </div>
  );
}
