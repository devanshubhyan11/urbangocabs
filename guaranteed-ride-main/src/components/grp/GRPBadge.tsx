import { Shield, Clock, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GRPBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  pulse?: boolean;
}

export function GRPBadge({ size = 'md', showText = true, className, pulse = false }: GRPBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };

  return (
    <div className={cn(
      'inline-flex items-center rounded-full bg-grp/20 border border-grp/50 text-grp font-semibold',
      sizeClasses[size],
      pulse && 'animate-pulse-slow',
      className
    )}>
      <Shield size={iconSizes[size]} className="fill-grp/30" />
      {showText && <span>UrbanGo Cabs</span>}
    </div>
  );
}

interface GRPBenefitCardProps {
  icon: 'shield' | 'clock' | 'map' | 'star';
  title: string;
  description: string;
}

export function GRPBenefitCard({ icon, title, description }: GRPBenefitCardProps) {
  const icons = {
    shield: Shield,
    clock: Clock,
    map: MapPin,
    star: Star
  };

  const Icon = icons[icon];

  return (
    <div className="glass-card rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-grp/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-grp" />
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
