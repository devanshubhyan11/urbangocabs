import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'red' | 'blue' | 'green' | 'purple';
}

export function FeatureCard({ icon: Icon, title, description, color = 'red' }: FeatureCardProps) {
  const colorClasses = {
    red: 'from-grp to-grp-glow text-white',
    blue: 'from-blue-600 to-blue-500 text-white',
    green: 'from-success to-emerald-600 text-white',
    purple: 'from-purple-600 to-purple-500 text-white',
  };

  return (
    <div className="group relative bg-card border border-border rounded-2xl p-6 hover:border-grp/50 transition-all duration-300 hover:shadow-lg hover:shadow-grp/20">
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-grp/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7" />
        </div>
        
        {/* Text */}
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
