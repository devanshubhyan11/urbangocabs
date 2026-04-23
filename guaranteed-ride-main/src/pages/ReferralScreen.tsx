import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Share2, Copy, Users, Gift, TrendingUp, Check } from 'lucide-react';
import { useState } from 'react';

export default function ReferralScreen() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralCode = 'URBANGO2026';
  const referralLink = `https://urbangocabs.app?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referrals = [
    {
      name: 'John Smith',
      date: 'Jan 25, 2026',
      rides: 3,
      earned: 10.00,
      status: 'completed',
    },
    {
      name: 'Sarah Williams',
      date: 'Jan 20, 2026',
      rides: 1,
      earned: 10.00,
      status: 'completed',
    },
    {
      name: 'Mike Johnson',
      date: 'Jan 15, 2026',
      rides: 0,
      earned: 0,
      status: 'pending',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Refer & Earn</h1>
            <p className="text-grp-foreground/90">Earn $10 for each successful referral</p>
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
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-grp/10 to-grp-glow/10 border-grp/20">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-grp" />
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
            <p className="text-3xl font-bold text-foreground">3</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-muted-foreground">Total Earned</p>
            </div>
            <p className="text-3xl font-bold text-foreground">$20.00</p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-muted-foreground">Pending Rewards</p>
            </div>
            <p className="text-3xl font-bold text-foreground">$0.00</p>
          </Card>
        </div>

        {/* Referral Link */}
        <Card className="p-6 mb-8 border-grp/50 bg-gradient-to-br from-grp/20 to-grp-glow/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Referral Link</h3>
          <div className="flex gap-2 mb-4">
            <div className="flex-1 bg-background rounded-lg p-3 border border-border/50 font-mono text-sm text-muted-foreground break-all">
              {referralLink}
            </div>
            <Button
              onClick={copyToClipboard}
              className="gap-2 bg-grp hover:bg-grp/90 flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share via Email
            </Button>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="p-6 mb-8 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">How It Works</h3>
          <div className="space-y-4">
            {[
              {
                step: 1,
                title: 'Share Your Link',
                description: 'Send your referral link to friends and family'
              },
              {
                step: 2,
                title: 'They Sign Up',
                description: 'Your friend signs up and completes their first ride'
              },
              {
                step: 3,
                title: 'You Earn $10',
                description: 'Once they complete their first ride, you earn $10'
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-grp flex items-center justify-center text-white font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Referral History */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Referral History</h3>
          <div className="space-y-3">
            {referrals.map((ref, idx) => (
              <Card key={idx} className="p-4 border-border/50 hover:border-grp/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {ref.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{ref.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {ref.date} • {ref.rides} ride{ref.rides !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">
                      ${ref.earned.toFixed(2)}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        ref.status === 'completed'
                          ? 'bg-green-500/20 text-green-700'
                          : 'bg-yellow-500/20 text-yellow-700'
                      }`}
                    >
                      {ref.status.charAt(0).toUpperCase() + ref.status.slice(1)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
