import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, MapPin, AlertCircle } from 'lucide-react';

export default function DemandForecastingScreen() {
  const navigate = useNavigate();

  const hourlyForecast = [
    { hour: '12 AM', demand: 15, predicted: 18, change: '+20%' },
    { hour: '6 AM', demand: 32, predicted: 45, change: '+41%' },
    { hour: '8 AM', demand: 87, predicted: 95, change: '+9%' },
    { hour: '12 PM', demand: 56, predicted: 62, change: '+11%' },
    { hour: '5 PM', demand: 125, predicted: 138, change: '+10%' },
    { hour: '8 PM', demand: 95, predicted: 110, change: '+16%' },
    { hour: '11 PM', demand: 42, predicted: 35, change: '-17%' },
  ];

  const hotspots = [
    {
      location: 'Airport Terminal 1',
      demandScore: 95,
      predictedRides: 450,
      bestTime: '5-7 PM',
      trend: 'up',
    },
    {
      location: 'Downtown Financial District',
      demandScore: 88,
      predictedRides: 380,
      bestTime: '8-10 AM',
      trend: 'up',
    },
    {
      location: 'Shopping Mall',
      demandScore: 76,
      predictedRides: 320,
      bestTime: '6-9 PM',
      trend: 'stable',
    },
    {
      location: 'Railway Station',
      demandScore: 82,
      predictedRides: 410,
      bestTime: '7-9 AM',
      trend: 'up',
    },
    {
      location: 'Business Park',
      demandScore: 68,
      predictedRides: 290,
      bestTime: '9 AM-5 PM',
      trend: 'down',
    },
    {
      location: 'Hospital Complex',
      demandScore: 61,
      predictedRides: 240,
      bestTime: 'All Day',
      trend: 'stable',
    },
  ];

  const maxDemand = Math.max(...hourlyForecast.map(d => d.predicted));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Demand Forecasting</h1>
            <p className="text-grp-foreground/90">ML-powered ride demand predictions</p>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/home')}
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
            <p className="text-sm text-muted-foreground mb-2">Today's Predicted Rides</p>
            <p className="text-3xl font-bold text-foreground">3,245</p>
            <p className="text-xs text-green-600 mt-2">↑ 12% vs yesterday</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <p className="text-sm text-muted-foreground mb-2">Peak Demand Time</p>
            <p className="text-3xl font-bold text-foreground">5:30 PM</p>
            <p className="text-xs text-blue-600 mt-2">Est. 450+ rides/hour</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <p className="text-sm text-muted-foreground mb-2">Forecast Accuracy</p>
            <p className="text-3xl font-bold text-foreground">96.3%</p>
            <p className="text-xs text-orange-600 mt-2">Last 7 days average</p>
          </Card>
        </div>

        {/* Hourly Forecast Chart */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-6">24-Hour Demand Forecast</h3>
          <div className="flex items-end gap-3 h-64">
            {hourlyForecast.map((data, idx) => {
              const percentage = (data.predicted / maxDemand) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative h-full flex items-end">
                    {/* Actual */}
                    <div
                      className="absolute bottom-0 w-1/3 left-0 bg-blue-500/50 rounded-t-sm hover:bg-blue-500/70 transition-colors"
                      style={{ height: `${(data.demand / maxDemand) * 100}%` }}
                      title={`Actual: ${data.demand}`}
                    />
                    {/* Predicted */}
                    <div
                      className="absolute bottom-0 w-1/3 right-0 bg-gradient-to-t from-grp to-grp-glow rounded-t-sm hover:opacity-80 transition-opacity"
                      style={{ height: `${percentage}%` }}
                      title={`Predicted: ${data.predicted}`}
                    />
                  </div>

                  <p className="text-xs font-bold text-foreground">{data.predicted}</p>
                  <p className="text-xs text-muted-foreground">{data.hour}</p>
                  <span className="text-xs text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {data.change}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500/50 rounded" />
              <span className="text-muted-foreground">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-t from-grp to-grp-glow rounded" />
              <span className="text-muted-foreground">Predicted</span>
            </div>
          </div>
        </Card>

        {/* Hotspots */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Demand Hotspots</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {hotspots.map((spot, idx) => (
              <Card
                key={idx}
                className="p-5 border-border/50 hover:border-grp/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <MapPin className="w-5 h-5 text-grp flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{spot.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">Peak: {spot.bestTime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-grp">{spot.demandScore}</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <p className="text-sm text-muted-foreground">
                    Est. <strong>{spot.predictedRides}</strong> rides
                  </p>
                  <span
                    className={`text-xs font-semibold ${
                      spot.trend === 'up'
                        ? 'text-green-600'
                        : spot.trend === 'down'
                        ? 'text-red-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {spot.trend === 'up' ? '↑' : spot.trend === 'down' ? '↓' : '→'} {spot.trend}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ML Model Info */}
        <Card className="p-6 border-blue-500/50 bg-blue-500/5">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">🤖 Forecasting Model</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Our ML model uses 60+ features including historical patterns, weather, events, and real-time traffic data.
              </p>
              <div className="grid md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                <div>Algorithm: LSTM + XGBoost Ensemble</div>
                <div>Training Data: 18 months</div>
                <div>Update Frequency: Every 15 minutes</div>
                <div>Retraining: Daily at 2 AM</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
