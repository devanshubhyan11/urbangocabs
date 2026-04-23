import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, DollarSign, Clock, Star, Car, AlertCircle } from 'lucide-react';

export default function DriverEarningsScreen() {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Total Earnings',
      value: '$2,450.50',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'This Week',
      value: '$485.00',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Active Hours',
      value: '156 hrs',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Avg Rating',
      value: '4.8 ⭐',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-500/10',
    },
  ];

  const dailyEarnings = [
    { day: 'Mon', amount: 85.50 },
    { day: 'Tue', amount: 92.00 },
    { day: 'Wed', amount: 78.50 },
    { day: 'Thu', amount: 98.00 },
    { day: 'Fri', amount: 105.00 },
    { day: 'Sat', amount: 142.00 },
    { day: 'Sun', amount: 65.00 },
  ];

  const maxAmount = Math.max(...dailyEarnings.map(d => d.amount));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Earnings Dashboard</h1>
            <p className="text-grp-foreground/90">Track your income and performance</p>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/driver')}
          >
            ← Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className={`p-4 border-border/50 ${stat.bgColor}`}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Weekly Chart */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Earnings</h3>
          <div className="flex items-end gap-4 h-64">
            {dailyEarnings.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-grp to-grp-glow rounded-t-lg" 
                     style={{ height: `${(data.amount / maxAmount) * 100}%` }} />
                <p className="text-xs font-medium text-foreground">${data.amount.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">{data.day}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Incentives & Bonuses */}
        <Card className="p-6 mb-8 border-grp/50 bg-gradient-to-br from-grp/10 to-grp-glow/10">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Incentives</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
              <div>
                <p className="font-medium text-foreground">Peak Hours Bonus</p>
                <p className="text-xs text-muted-foreground">+$2 per ride 6-9 PM</p>
              </div>
              <p className="font-semibold text-grp">+$58</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
              <div>
                <p className="font-medium text-foreground">Rating Bonus</p>
                <p className="text-xs text-muted-foreground">4.8+ rating this week</p>
              </div>
              <p className="font-semibold text-green-600">+$25</p>
            </div>
            <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50">
              <div>
                <p className="font-medium text-foreground">Acceptance Rate Bonus</p>
                <p className="text-xs text-muted-foreground">95% acceptance rate</p>
              </div>
              <p className="font-semibold text-blue-600">+$15</p>
            </div>
          </div>
        </Card>

        {/* Performance Metrics */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Completion Rate</p>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                <div className="bg-grp rounded-full h-2" style={{ width: '98%' }} />
              </div>
              <p className="font-semibold text-foreground text-sm">98%</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Acceptance Rate</p>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                <div className="bg-blue-500 rounded-full h-2" style={{ width: '95%' }} />
              </div>
              <p className="font-semibold text-foreground text-sm">95%</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Cancellation Rate</p>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                <div className="bg-orange-500 rounded-full h-2" style={{ width: '2%' }} />
              </div>
              <p className="font-semibold text-foreground text-sm">2%</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Maintain 4.8+ rating and 95% acceptance rate to unlock premium earnings tier
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
