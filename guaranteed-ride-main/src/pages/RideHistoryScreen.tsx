import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Star, MessageCircle } from 'lucide-react';
import { useGRP } from '@/contexts/GRPContext';

interface RideRecord {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  amount: number;
  driverName: string;
  driverRating: number;
  status: 'completed' | 'cancelled';
  duration: string;
}

export default function RideHistoryScreen() {
  const navigate = useNavigate();
  const { user } = useGRP();

  const mockRides: RideRecord[] = [
    {
      id: '1',
      date: 'Jan 28, 2026 - 2:30 PM',
      pickup: '123 Main St, Downtown',
      destination: 'Airport Terminal 2',
      amount: 45.99,
      driverName: 'Sarah Johnson',
      driverRating: 4.9,
      status: 'completed',
      duration: '35 mins',
    },
    {
      id: '2',
      date: 'Jan 27, 2026 - 5:15 PM',
      pickup: 'Central Station',
      destination: '456 Oak Ave, Midtown',
      amount: 28.50,
      driverName: 'Mike Chen',
      driverRating: 4.8,
      status: 'completed',
      duration: '22 mins',
    },
    {
      id: '3',
      date: 'Jan 26, 2026 - 10:00 AM',
      pickup: 'Coffee Shop, 5th St',
      destination: 'Business Park',
      amount: 15.75,
      driverName: 'Emma Wilson',
      driverRating: 5.0,
      status: 'completed',
      duration: '18 mins',
    },
    {
      id: '4',
      date: 'Jan 25, 2026 - 8:45 PM',
      pickup: 'Hotel Plaza',
      destination: 'Restaurant District',
      amount: 32.00,
      driverName: 'James Rodriguez',
      driverRating: 4.7,
      status: 'completed',
      duration: '28 mins',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Ride History</h1>
            <p className="text-grp-foreground/90">Your past trips and details</p>
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
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-grp/10 to-grp-glow/10 border-grp/20">
            <p className="text-sm text-muted-foreground">Total Rides</p>
            <p className="text-2xl font-bold text-foreground">{mockRides.length}</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="text-2xl font-bold text-foreground">
              ${mockRides.reduce((sum, r) => sum + r.amount, 0).toFixed(2)}
            </p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10">
            <p className="text-sm text-muted-foreground">Avg Rating</p>
            <p className="text-2xl font-bold text-foreground">
              {(mockRides.reduce((sum, r) => sum + r.driverRating, 0) / mockRides.length).toFixed(1)}
            </p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10">
            <p className="text-sm text-muted-foreground">Total Duration</p>
            <p className="text-2xl font-bold text-foreground">~2 hrs</p>
          </Card>
        </div>

        {/* Rides List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Rides</h2>
          {mockRides.map((ride) => (
            <Card
              key={ride.id}
              className="p-5 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-grp/50"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{ride.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">From</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-grp flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{ride.pickup}</p>
                        </div>
                      </div>
                      <div className="text-grp">→</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">To</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-grp flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">{ride.destination}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">${ride.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{ride.duration}</p>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white font-semibold">
                      {ride.driverName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{ride.driverName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-muted-foreground">{ride.driverRating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-1">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </Button>
                    <Button size="sm" variant="ghost">
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
