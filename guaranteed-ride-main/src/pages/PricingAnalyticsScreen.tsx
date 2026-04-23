import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, AlertTriangle, Zap, TrendingDown } from 'lucide-react';

export default function PricingAnalyticsScreen() {
  const navigate = useNavigate();

  const surgeData = [
    { time: '12 AM', multiplier: 1.0, demand: 'Low' },
    { time: '6 AM', multiplier: 1.2, demand: 'Low' },
    { time: '8 AM', multiplier: 1.8, demand: 'High' },
    { time: '12 PM', multiplier: 1.3, demand: 'Medium' },
    { time: '5 PM', multiplier: 2.5, demand: 'Very High' },
    { time: '8 PM', multiplier: 1.9, demand: 'High' },
    { time: '11 PM', multiplier: 1.1, demand: 'Low' },
  ];

  const predictions = [
    { location: 'Airport', prediction: '$45-52', confidence: '92%', factor: 'Evening demand' },
    { location: 'Downtown', prediction: '$18-24', confidence: '88%', factor: 'Rush hour' },
    { location: 'Mall', prediction: '$22-28', confidence: '85%', factor: 'Weekend traffic' },
  ];

  const maxMultiplier = Math.max(...surgeData.map(d => d.multiplier));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Surge Pricing Engine</h1>
            <p className="text-grp-foreground/90">AI-powered dynamic pricing & fare predictions</p>
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
        {/* Current Surge Status */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-grp/10 to-grp-glow/10 border-grp/50">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Surge Multiplier</p>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold text-grp">1.8x</span>
                <div className="text-red-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">+45% above base fare</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Demand Level</p>
              <p className="text-2xl font-bold text-yellow-600">HIGH</p>
              <p className="text-xs text-muted-foreground mt-2">Rush hour (5-8 PM)</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Predicted Peak Time</p>
              <p className="text-2xl font-bold text-foreground">5:30 PM</p>
              <p className="text-xs text-muted-foreground mt-2">Max surge: 2.8x expected</p>
            </div>
          </div>
        </Card>

        {/* Hourly Surge Predictions */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-6">24-Hour Surge Forecast</h3>
          <div className="flex items-end gap-3 h-64">
            {surgeData.map((data, idx) => {
              const percentage = (data.multiplier / maxMultiplier) * 100;
              const color =
                data.multiplier > 2.0
                  ? 'from-red-500 to-red-600'
                  : data.multiplier > 1.5
                  ? 'from-orange-500 to-orange-600'
                  : 'from-grp to-grp-glow';

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full bg-gradient-to-t ${color} rounded-t-lg`}
                    style={{ height: `${percentage}%` }}
                  />
                  <p className="text-xs font-bold text-foreground">{data.multiplier}x</p>
                  <p className="text-xs text-muted-foreground">{data.time}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Fare Predictions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">AI Fare Predictions</h3>
          <div className="space-y-3">
            {predictions.map((pred, idx) => (
              <Card key={idx} className="p-5 border-border/50 hover:border-grp/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{pred.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">Factor: {pred.factor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-grp">{pred.prediction}</p>
                    <p className="text-xs text-green-600 mt-1">Confidence: {pred.confidence}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* ML Model Info */}
        <Card className="p-6 border-blue-500/50 bg-blue-500/5">
          <h3 className="text-lg font-semibold text-foreground mb-4">🤖 ML Model Details</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Model: Time Series Forecasting</p>
              <p className="text-muted-foreground mb-1">Features: 45+ data points</p>
              <p className="text-muted-foreground">Accuracy: 94.2%</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Update Frequency: Every 5 minutes</p>
              <p className="text-muted-foreground mb-1">Historical Data: 24 months</p>
              <p className="text-muted-foreground">Last Updated: 2 minutes ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
