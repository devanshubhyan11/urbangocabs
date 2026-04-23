import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Phone, MessageCircle, Home } from 'lucide-react';
import { useState } from 'react';

export default function RideTrackingScreen() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'driver', text: 'Hi! I\'m 5 minutes away', time: '2:25 PM' },
    { id: 2, sender: 'you', text: 'Great, thanks!', time: '2:26 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Live Tracking</h1>
            <p className="text-grp-foreground/90">Driver: Sarah Johnson • 4.9 ⭐</p>
          </div>
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/finding-driver')}
          >
            ← Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="md:col-span-2">
            <Card className="p-6 h-96 bg-gradient-to-br from-secondary to-secondary/50 border-border/50 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-grp/20 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-grp animate-pulse flex items-center justify-center">
                    <span className="text-white text-xs">📍</span>
                  </div>
                </div>
                <p className="text-muted-foreground">Live Map - Driver is 4 minutes away</p>
                <p className="text-sm text-muted-foreground mt-2">GPS tracking active</p>
              </div>
            </Card>

            {/* Trip Details */}
            <Card className="mt-6 p-6 border-border/50">
              <h3 className="text-lg font-semibold text-foreground mb-4">Trip Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-grp flex items-center justify-center text-white text-sm">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium text-foreground">123 Main St, Downtown</p>
                  </div>
                </div>

                <div className="border-l-2 border-grp/20 ml-4 h-8" />

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-grp-glow flex items-center justify-center text-white text-sm">
                    B
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium text-foreground">456 Oak Ave, Midtown</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900">
                  Share your real-time location with emergency contacts during the ride
                </p>
              </div>
            </Card>
          </div>

          {/* Driver & Actions */}
          <div>
            {/* Driver Card */}
            <Card className="p-4 mb-6 border-grp/50 bg-gradient-to-br from-grp/10 to-grp-glow/10">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                  S
                </div>
                <p className="font-semibold text-foreground">Sarah Johnson</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs text-muted-foreground">(4.9)</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-xs text-muted-foreground">Vehicle</p>
                <p className="font-medium text-foreground text-sm">Toyota Prius • ABC 1234</p>
              </div>

              <div className="space-y-3">
                <Button className="w-full gap-2 bg-grp hover:bg-grp/90">
                  <Phone className="w-4 h-4" />
                  Call Driver
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={() => setShowChat(!showChat)}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </Button>
              </div>
            </Card>

            {/* Emergency SOS */}
            <Card className="p-4 border-red-500/50 bg-red-500/5 mb-6">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2">
                <AlertCircle className="w-4 h-4" />
                Emergency SOS
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Instantly alert emergency contacts
              </p>
            </Card>

            {/* Share Location */}
            <Card className="p-4 border-border/50">
              <Button variant="outline" className="w-full gap-2">
                <Home className="w-4 h-4" />
                Share Location
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                With trusted contacts
              </p>
            </Card>
          </div>
        </div>

        {/* Chat Section */}
        {showChat && (
          <Card className="mt-6 p-4 border-border/50">
            <h4 className="font-semibold text-foreground mb-4">Chat with Driver</h4>
            <div className="bg-secondary rounded-lg p-4 h-64 overflow-y-auto mb-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-lg px-4 py-2 ${
                      msg.sender === 'you'
                        ? 'bg-grp text-white'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-border/50 bg-background text-sm"
              />
              <Button
                size="sm"
                onClick={() => {
                  if (newMessage.trim()) {
                    setMessages([...messages, { id: messages.length + 1, sender: 'you', text: newMessage, time: 'Now' }]);
                    setNewMessage('');
                  }
                }}
              >
                Send
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
