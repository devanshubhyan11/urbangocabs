import { TrendingUp, Users, MapPin, Award } from 'lucide-react';

interface MetricsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}

function MetricsCard({ icon, label, value, change, trend }: MetricsCardProps) {
  return (
    <div className="group bg-card border border-border rounded-2xl p-6 hover:border-grp/50 transition-all duration-300 hover:shadow-lg hover:shadow-grp/20">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-grp/20 to-grp-glow/20 flex items-center justify-center text-grp group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {change && (
          <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend === 'up'
              ? 'bg-success/20 text-success'
              : 'bg-destructive/20 text-destructive'
          }`}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-2">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-foreground">{value}</p>
    </div>
  );
}

export function DashboardMetrics() {
  const metrics = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Total Rides',
      value: '1,249',
      change: '12%',
      trend: 'up' as const,
    },
    {
      icon: <Users className="w-6 h-6" />,
      label: 'Active Drivers',
      value: '486',
      change: '8%',
      trend: 'up' as const,
    },
    {
      icon: <Award className="w-6 h-6" />,
      label: 'Safety Rating',
      value: '4.8/5',
      change: '2%',
      trend: 'up' as const,
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: 'Revenue',
      value: '$24.5K',
      change: '15%',
      trend: 'up' as const,
    },
  ];

  return (
    <section className="py-16 px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Platform Metrics</h2>
          <p className="text-muted-foreground">Real-time performance of the UrbanGo network</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <MetricsCard key={idx} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
