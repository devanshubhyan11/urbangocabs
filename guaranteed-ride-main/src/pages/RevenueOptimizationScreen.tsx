import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Clock, MapPin, Target } from 'lucide-react';

export default function RevenueOptimizationScreen() {
  const navigate = useNavigate();

  const recommendations = [
    {
      title: 'Peak Hours Strategy',
      description: 'Highest earning potential 5-8 PM',
      roi: '+45%',
      reason: '2.5x surge multiplier expected',
      action: 'Focus hours',
    },
    {
      title: 'Airport Route',
      description: 'Most consistent long rides',
      roi: '+32%',
      reason: 'Avg fare $45-60, low cancellation',
      action: 'Recommended',
    },
    {
      title: 'Maintain 4.8+ Rating',
      description: 'Premium earnings tier unlock',
      roi: '+$125/week',
      reason: 'Access premium rides with higher fare',
      action: 'In progress',
    },
    {
      title: 'Weekend Surge',
      description: 'Friday-Saturday evenings',
      roi: '+28%',
      reason: 'High demand + surge pricing',
      action: 'Calendar',
    },
  ];

  const scheduleSuggestions = [
    { day: 'Monday', hours: '8-9 AM, 5-8 PM', potential: '$120-150' },
    { day: 'Tuesday', hours: '8-9 AM, 5-8 PM', potential: '$115-140' },
    { day: 'Wednesday', hours: '8-9 AM, 5-8 PM', potential: '$125-155' },
    { day: 'Thursday', hours: '8-9 AM, 5-9 PM', potential: '$130-165' },
    { day: 'Friday', hours: '5-11 PM', potential: '$180-240' },
    { day: 'Saturday', hours: '3-11 PM', potential: '$200-280' },
    { day: 'Sunday', hours: '5-10 PM', potential: '$150-200' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Revenue Optimization</h1>
            <p className="text-grp-foreground/90">AI-powered earnings recommendations</p>
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
        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-grp/10 to-grp-glow/10 border-grp/20">
            <p className="text-sm text-muted-foreground mb-2">Potential Weekly Earnings</p>
            <p className="text-3xl font-bold text-foreground">$1,450</p>
            <p className="text-xs text-green-600 mt-2">↑ $290 vs last week</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <p className="text-sm text-muted-foreground mb-2">Optimal Weekly Hours</p>
            <p className="text-3xl font-bold text-foreground">35 hrs</p>
            <p className="text-xs text-blue-600 mt-2">For max earnings</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <p className="text-sm text-muted-foreground mb-2">Avg Hourly Rate Goal</p>
            <p className="text-3xl font-bold text-foreground">$45</p>
            <p className="text-xs text-green-600 mt-2">Achievable with optimization</p>
          </Card>
        </div>

        {/* Smart Recommendations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">📈 Smart Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((rec, idx) => (
              <Card key={idx} className="p-5 border-border/50 hover:border-grp/50 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{rec.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <p className="text-xs text-muted-foreground">{rec.reason}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-bold text-green-600">{rec.roi}</p>
                    <p className="text-xs text-muted-foreground mt-1">ROI</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  {rec.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Optimal Weekly Schedule */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Optimal Weekly Schedule</h3>
          <div className="space-y-3">
            {scheduleSuggestions.map((schedule, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <div>
                  <p className="font-medium text-foreground">{schedule.day}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {schedule.hours}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-grp">{schedule.potential}</p>
                  <p className="text-xs text-muted-foreground mt-1">Potential earnings</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4 px-4">
            Following this schedule could increase earnings by ~35% per week
          </p>
        </Card>

        {/* Location Insights */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Earning Locations</h3>
          <div className="space-y-3">
            {[
              { location: 'Airport Terminal 1', avgFare: '$48', trips: '120/week', rating: 'Hot' },
              { location: 'Downtown Financial District', avgFare: '$35', trips: '95/week', rating: 'Hot' },
              { location: 'Shopping Mall', avgFare: '$28', trips: '80/week', rating: 'Warm' },
              { location: 'Railway Station', avgFare: '$32', trips: '75/week', rating: 'Warm' },
            ].map((loc, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:border-grp/50 transition-all">
                <div className="flex items-center gap-3 flex-1">
                  <MapPin className="w-5 h-5 text-grp" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{loc.location}</p>
                    <p className="text-xs text-muted-foreground">{loc.trips} • Avg: {loc.avgFare}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-700 font-semibold">
                  {loc.rating}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Performance Tracking */}
        <Card className="p-6 border-blue-500/50 bg-blue-500/5">
          <h3 className="text-lg font-semibold text-foreground mb-4">🎯 Track & Optimize</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-foreground mb-3">Weekly Goals</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Earnings</span>
                  <span className="text-foreground">$1,200 / $1,450</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-grp rounded-full h-2" style={{ width: '83%' }} />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-muted-foreground">Hours</span>
                  <span className="text-foreground">28 / 35</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-blue-500 rounded-full h-2" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
            <div>
              <p className="font-medium text-foreground mb-3">Daily Targets</p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span>Mon-Thu</span>
                  <span className="font-bold">$120-150/day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Friday</span>
                  <span className="font-bold">$180-240/day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Saturday</span>
                  <span className="font-bold">$200-280/day</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sunday</span>
                  <span className="font-bold">$150-200/day</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
