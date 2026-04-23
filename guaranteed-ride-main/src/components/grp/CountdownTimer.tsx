import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  seconds: number;
  maxSeconds: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'danger' | 'warning';
}

export function CountdownTimer({ 
  seconds, 
  maxSeconds, 
  size = 'md',
  className,
  variant = 'default'
}: CountdownTimerProps) {
  const progress = (seconds / maxSeconds) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const getColor = () => {
    if (variant === 'danger' || seconds <= 5) return 'text-destructive stroke-destructive';
    if (variant === 'warning' || seconds <= 10) return 'text-warning stroke-warning';
    return 'text-grp stroke-grp';
  };

  return (
    <div className={cn('relative', sizeClasses[size], className)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className="stroke-muted"
          strokeWidth="6"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className={cn('transition-all duration-1000', getColor())}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      {/* Timer text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn('font-display font-bold', textSizes[size], getColor().split(' ')[0])}>
          {seconds}
        </span>
      </div>
    </div>
  );
}
