import { DemoDriver } from '@/types/grp';
import { Star, Shield, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DriverCardProps {
  driver: DemoDriver;
  distance?: number;
  eta?: number;
  showContact?: boolean;
  compact?: boolean;
  className?: string;
}

export function DriverCard({ 
  driver, 
  distance, 
  eta, 
  showContact = false,
  compact = false,
  className 
}: DriverCardProps) {
  const getGRPColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  if (compact) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden flex items-center justify-center">
          {driver.avatar_url ? (
            <img src={driver.avatar_url} alt={driver.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg font-semibold text-muted-foreground">
              {driver.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground truncate">{driver.name}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span>{driver.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('glass-card rounded-2xl p-4 space-y-4', className)}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden flex items-center justify-center ring-2 ring-grp/50">
          {driver.avatar_url ? (
            <img src={driver.avatar_url} alt={driver.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-semibold text-muted-foreground">
              {driver.name.charAt(0)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">{driver.name}</h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning fill-warning" />
              <span className="text-sm font-medium">{driver.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className={cn('w-4 h-4', getGRPColor(driver.grp_score))} />
              <span className={cn('text-sm font-medium', getGRPColor(driver.grp_score))}>
                {driver.grp_score}
              </span>
            </div>
          </div>
        </div>
      </div>

      {(distance !== undefined || eta !== undefined) && (
        <div className="flex items-center gap-4 pt-2 border-t border-border">
          {distance !== undefined && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{distance.toFixed(1)} km away</span>
            </div>
          )}
          {eta !== undefined && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-grp font-semibold">{eta} min</span>
              <span>ETA</span>
            </div>
          )}
        </div>
      )}

      {showContact && (
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-success/20 text-success font-medium hover:bg-success/30 transition-colors">
          <Phone className="w-5 h-5" />
          <span>Contact Driver</span>
        </button>
      )}
    </div>
  );
}
