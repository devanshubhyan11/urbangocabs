import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Gift, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface PromoCode {
  code: string;
  discount: number;
  description: string;
  expiryDate: string;
  minRideAmount: number;
  used: boolean;
}

export default function PromoCodesScreen() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState('');

  const availableCodes: PromoCode[] = [
    {
      code: 'WELCOME20',
      discount: 20,
      description: '20% off first ride',
      expiryDate: 'Feb 28, 2026',
      minRideAmount: 10,
      used: false,
    },
    {
      code: 'SAVE20',
      discount: 20,
      description: '$20 off rides over $50',
      expiryDate: 'Feb 15, 2026',
      minRideAmount: 50,
      used: false,
    },
    {
      code: 'AIRPORT25',
      discount: 25,
      description: '$25 off airport rides',
      expiryDate: 'Mar 31, 2026',
      minRideAmount: 30,
      used: false,
    },
    {
      code: 'FRIEND15',
      discount: 15,
      description: 'Referral bonus - $15 off',
      expiryDate: 'Apr 30, 2026',
      minRideAmount: 5,
      used: false,
    },
  ];

  const myPromoCodes: PromoCode[] = [
    {
      code: 'SAVE10',
      discount: 10,
      description: '$10 off next ride',
      expiryDate: 'Feb 5, 2026',
      minRideAmount: 20,
      used: true,
    },
    {
      code: 'CASHBACK5',
      discount: 5,
      description: '5% cashback',
      expiryDate: 'Mar 15, 2026',
      minRideAmount: 0,
      used: false,
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Promo Codes</h1>
            <p className="text-grp-foreground/90">Save on every ride</p>
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
        {/* Redeem Section */}
        <Card className="p-6 mb-8 border-grp/50 bg-gradient-to-br from-grp/10 to-grp-glow/10">
          <h3 className="text-lg font-semibold text-foreground mb-4">Have a Promo Code?</h3>
          <div className="flex gap-2">
            <Input
              placeholder="Enter promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
              className="flex-1"
            />
            <Button className="bg-grp hover:bg-grp/90">Redeem</Button>
          </div>
        </Card>

        {/* My Promo Codes */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">My Promo Codes</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {myPromoCodes.map((promo) => (
              <Card
                key={promo.code}
                className={`p-5 border-border/50 ${
                  promo.used ? 'opacity-50' : 'hover:border-grp/50'
                } transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                      Code
                    </p>
                    <p className="text-lg font-mono font-bold text-foreground">{promo.code}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-grp">${promo.discount}</p>
                    <p className="text-xs text-muted-foreground">off</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">{promo.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <p className="text-xs text-muted-foreground">
                    Expires {promo.expiryDate}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(promo.code)}
                    className="gap-1"
                  >
                    {copiedCode === promo.code ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Promo Codes */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Available Offers</h3>
          <div className="space-y-3">
            {availableCodes.map((promo) => (
              <Card
                key={promo.code}
                className="p-5 border-border/50 hover:border-grp/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-grp/20 to-grp-glow/20 flex items-center justify-center flex-shrink-0">
                      <Gift className="w-6 h-6 text-grp" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{promo.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Min. ${promo.minRideAmount} • Expires {promo.expiryDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-grp">${promo.discount}</p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(promo.code)}
                      className="gap-1 mt-2"
                    >
                      {copiedCode === promo.code ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          {promo.code}
                        </>
                      )}
                    </Button>
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
