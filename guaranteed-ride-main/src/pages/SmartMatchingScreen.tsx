import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Brain, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

export default function SmartMatchingScreen() {
  const navigate = useNavigate();

  const matchingAlgorithm = [
    { factor: 'Driver Rating', weight: '25%', importance: 'Critical' },
    { factor: 'Route Efficiency', weight: '20%', importance: 'High' },
    { factor: 'Driver Location', weight: '15%', importance: 'High' },
    { factor: 'Acceptance Rate', weight: '15%', importance: 'High' },
    { factor: 'Vehicle Type', weight: '10%', importance: 'Medium' },
    { factor: 'Driver Preferences', weight: '10%', importance: 'Medium' },
    { factor: 'Past User Feedback', weight: '5%', importance: 'Low' },
  ];

  const topMatches = [
    {
      rank: 1,
      name: 'Anjali Rao',
      rating: 4.9,
      matchScore: 98,
      eta: 1,
      reasons: ['Top rated', 'Efficient route', 'Close by'],
    },
    {
      rank: 2,
      name: 'Maya Dutta',
      rating: 4.9,
      matchScore: 96,
      eta: 2,
      reasons: ['Excellent rating', 'Preferred area', 'Fast response'],
    },
    {
      rank: 3,
      name: 'Sarah Johnson',
      rating: 4.8,
      matchScore: 94,
      eta: 3,
      reasons: ['High acceptance', 'Good location', 'Professional'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Smart Driver Matching</h1>
            <p className="text-grp-foreground/90">AI-powered optimal driver selection</p>
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
        {/* Algorithm Overview */}
        <Card className="p-6 mb-8 border-blue-500/50 bg-blue-500/5">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-foreground">ML Matching Algorithm</h3>
          </div>
          <div className="space-y-3">
            {matchingAlgorithm.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{item.factor}</p>
                </div>
                <div className="w-32 bg-secondary rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-grp to-grp-glow rounded-full h-2"
                    style={{ width: item.weight }}
                  />
                </div>
                <p className="text-xs font-semibold text-muted-foreground w-16">{item.weight}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    item.importance === 'Critical'
                      ? 'bg-red-500/20 text-red-700'
                      : item.importance === 'High'
                      ? 'bg-orange-500/20 text-orange-700'
                      : 'bg-blue-500/20 text-blue-700'
                  }`}
                >
                  {item.importance}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Matches */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Drivers</h3>
          <div className="space-y-4">
            {topMatches.map((match) => (
              <Card key={match.rank} className="p-5 border-border/50 hover:border-grp/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white font-bold flex-shrink-0">
                      {match.rank}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{match.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-500">⭐ {match.rating}</span>
                        <span className="text-xs text-muted-foreground">• ETA: {match.eta} min</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-grp/20 border border-grp/50">
                      <CheckCircle className="w-4 h-4 text-grp" />
                      <span className="font-bold text-grp">{match.matchScore}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Match Score</p>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {match.reasons.map((reason, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      ✓ {reason}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Route Optimization */}
        <Card className="p-6 border-green-500/50 bg-green-500/5 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">🗺️ Route Optimization</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Recommended Route</p>
              <p className="font-medium text-foreground">Main St → Highway 101 → Oak Ave (Optimal)</p>
              <p className="text-xs text-green-600 mt-1">12 mins • 8.3 km • Lowest traffic</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Alternative Route</p>
              <p className="font-medium text-foreground">Main St → Central Ave → Oak Ave</p>
              <p className="text-xs text-orange-600 mt-1">18 mins • 9.2 km • Moderate traffic</p>
            </div>
          </div>
        </Card>

        {/* Real-time Adjustments */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Real-time ML Adjustments</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
              <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                <strong>Traffic Alert:</strong> Route via Highway 101 showing 15% slower due to accident. Alternative recommended.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-muted-foreground">
                <strong>Driver Preference Matched:</strong> Anjali prefers highway routes. Perfect fit!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
