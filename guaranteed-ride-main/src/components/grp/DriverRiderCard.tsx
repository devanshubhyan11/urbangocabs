import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DriverCardProps {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  vehicle: string;
  eta: number;
  distance: number;
  avatar?: string;
  badge?: 'top' | 'eco' | 'premium';
  onSelect?: () => void;
}

export function DriverCard({
  name,
  rating,
  reviews,
  vehicle,
  eta,
  distance,
  badge,
  onSelect,
}: DriverCardProps) {
  const badgeColors = {
    top: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
    eco: 'bg-green-500/20 text-green-500 border-green-500/30',
    premium: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  };

  return (
    <div className="group bg-card border border-border rounded-2xl p-5 hover:border-grp/50 transition-all duration-300 hover:shadow-lg hover:shadow-grp/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-white">{name.charAt(0)}</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-foreground">{name}</h4>
              {badge && (
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${badgeColors[badge]}`}>
                  {badge.toUpperCase()}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {rating} ({reviews} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle */}
      <p className="text-sm text-muted-foreground mb-4">{vehicle}</p>

      {/* Details */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-4 h-4 text-grp" />
          <span>{eta} min</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-4 h-4 text-grp" />
          <span>{distance} km</span>
        </div>
      </div>

      {/* Select Button */}
      <Button
        onClick={onSelect}
        variant="grp"
        size="sm"
        className="w-full"
      >
        Select Driver
      </Button>
    </div>
  );
}
