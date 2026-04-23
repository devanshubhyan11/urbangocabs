import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, CheckCircle, Gauge } from 'lucide-react';

export default function DriverBehaviorAnalyticsScreen() {
  const navigate = useNavigate();

  const drivers = [
    {
      name: 'Anjali Rao',
      rating: 4.9,
      trips: 529,
      safetyScore: 98,
      smoothnessScore: 96,
      riskLevel: 'low',
      incidents: 0,
    },
    {
      name: 'Maya Dutta',
      rating: 4.9,
      trips: 410,
      safetyScore: 97,
      smoothnessScore: 94,
      riskLevel: 'low',
      incidents: 0,
    },
    {
      name: 'Sarah Johnson',
      rating: 4.8,
      trips: 342,
      safetyScore: 95,
      smoothnessScore: 92,
      riskLevel: 'low',
      incidents: 1,
    },
    {
      name: 'Mike Chen',
      rating: 4.7,
      trips: 287,
      safetyScore: 92,
      smoothnessScore: 88,
      riskLevel: 'medium',
      incidents: 2,
    },
    {
      name: 'Rajesh Patel',
      rating: 4.6,
      trips: 200,
      safetyScore: 88,
      smoothnessScore: 85,
      riskLevel: 'medium',
      incidents: 3,
    },
  ];

  const behaviorMetrics = [
    {
      metric: 'Acceleration Pattern',
      description: 'Sudden acceleration events',
      avg: 2.3,
      threshold: 5,
    },
    {
      metric: 'Braking Pattern',
      description: 'Hard braking incidents',
      avg: 3.1,
      threshold: 7,
    },
    {
      metric: 'Speed Limit Violations',
      description: 'Instances exceeding limit',
      avg: 0.5,
      threshold: 3,
    },
    {
      metric: 'Cornering Sharpness',
      description: 'High-G turns',
      avg: 1.8,
      threshold: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Driver Safety Analytics</h1>
            <p className="text-grp-foreground/90">ML-based behavior monitoring & analysis</p>
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
        {/* Top Performers */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Top Drivers - Safety Scores</h3>
          <div className="space-y-4">
            {drivers.map((driver, idx) => (
              <Card key={idx} className="p-5 border-border/50 hover:border-grp/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white font-bold flex-shrink-0">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{driver.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>⭐ {driver.rating}</span>
                        <span>•</span>
                        <span>{driver.trips} trips</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-grp">{driver.safetyScore}</p>
                      <p className="text-xs text-muted-foreground">Safety Score</p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        driver.riskLevel === 'low'
                          ? 'bg-green-500/20 text-green-700'
                          : 'bg-orange-500/20 text-orange-700'
                      }`}
                    >
                      {driver.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Smoothness</span>
                      <span className="text-xs font-bold text-foreground">{driver.smoothnessScore}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div
                        className="bg-blue-500 rounded-full h-1.5"
                        style={{ width: `${driver.smoothnessScore}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Incidents</span>
                      <span className="text-xs font-bold text-foreground">{driver.incidents}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {driver.incidents === 0 ? '✓ Excellent' : `⚠ ${driver.incidents} reported`}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Behavior Metrics */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-6">Fleet Behavior Metrics</h3>
          <div className="space-y-5">
            {behaviorMetrics.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.metric}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">{item.avg}/trip</p>
                    <p className="text-xs text-muted-foreground">Safety Threshold: {item.threshold}</p>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className={`rounded-full h-2 ${
                      item.avg > item.threshold * 0.7
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(item.avg / item.threshold) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Real-time Monitoring */}
        <Card className="p-6 border-blue-500/50 bg-blue-500/5 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">🚗 Real-time Monitoring</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Live GPS Tracking</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Monitors location, speed, and route adherence
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Sensor Data</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Accelerometer & gyroscope for driving patterns
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Predictive Alerts</p>
                <p className="text-xs text-muted-foreground mt-1">
                  AI warns before unsafe behaviors occur
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Safety Insights */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Safety Insights</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-900">
                Fleet average safety score: <strong>94.2%</strong> - Top 5% of industry
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                <strong>0 major accidents</strong> involving our drivers in the last 30 days
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-orange-900">
                <strong>3 drivers</strong> approaching safety threshold - recommended retraining
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
