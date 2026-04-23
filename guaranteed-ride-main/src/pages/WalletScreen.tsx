import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Wallet, CreditCard, Plus, Send, TrendingDown, Gift } from 'lucide-react';
import { useState } from 'react';

export default function WalletScreen() {
  const navigate = useNavigate();
  const [balance] = useState(124.50);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  const transactions = [
    { id: '1', type: 'credit', description: 'Referral bonus', amount: 10.00, date: 'Jan 28' },
    { id: '2', type: 'debit', description: 'Ride to Airport', amount: -45.99, date: 'Jan 28' },
    { id: '3', type: 'credit', description: 'Promo code SAVE20', amount: 5.00, date: 'Jan 27' },
    { id: '4', type: 'debit', description: 'Ride to Midtown', amount: -28.50, date: 'Jan 27' },
    { id: '5', type: 'credit', description: 'Monthly cashback', amount: 8.75, date: 'Jan 26' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-grp-foreground/90">Manage your balance and payments</p>
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
        {/* Balance Card */}
        <Card className="p-8 mb-6 bg-gradient-to-br from-grp/20 to-grp-glow/20 border-grp/50">
          <div className="flex items-center justify-between mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-muted-foreground">Available Balance</p>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6">${balance.toFixed(2)}</h2>
          <div className="flex gap-3">
            <Button className="gap-2 bg-grp hover:bg-grp/90">
              <Plus className="w-4 h-4" />
              Add Money
            </Button>
            <Button variant="outline" className="gap-2 border-grp/50">
              <Send className="w-4 h-4" />
              Transfer
            </Button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 hover:border-grp/50 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-grp/10 flex items-center justify-center mb-3">
              <CreditCard className="w-5 h-5 text-grp" />
            </div>
            <p className="font-medium text-foreground text-sm">Add Payment Method</p>
            <p className="text-xs text-muted-foreground mt-1">Link new card or account</p>
          </Card>

          <Card className="p-4 hover:border-grp/50 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
              <Gift className="w-5 h-5 text-blue-500" />
            </div>
            <p className="font-medium text-foreground text-sm">Promo Code</p>
            <p className="text-xs text-muted-foreground mt-1">Redeem a code</p>
          </Card>

          <Card className="p-4 hover:border-grp/50 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3">
              <Send className="w-5 h-5 text-green-500" />
            </div>
            <p className="font-medium text-foreground text-sm">Refer & Earn</p>
            <p className="text-xs text-muted-foreground mt-1">Get $10 per referral</p>
          </Card>
        </div>

        {/* Add Money Form */}
        {showAddMoney && (
          <Card className="p-6 mb-6 border-grp/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Add Money</h3>
              <button
                onClick={() => setShowAddMoney(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Amount</label>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">$</Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[10, 25, 50, 100].map((val) => (
                  <Button
                    key={val}
                    variant={amount === val.toString() ? 'default' : 'outline'}
                    onClick={() => setAmount(val.toString())}
                    className="text-sm"
                  >
                    ${val}
                  </Button>
                ))}
              </div>
              <Button className="w-full bg-grp hover:bg-grp/90">
                Add ${amount || '0.00'}
              </Button>
            </div>
          </Card>
        )}

        {/* Transaction History */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <Card key={tx.id} className="p-4 border-border/50 hover:border-grp/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'credit'
                          ? 'bg-green-500/10'
                          : 'bg-red-500/10'
                      }`}
                    >
                      {tx.type === 'credit' ? (
                        <Plus className={`w-5 h-5 text-green-600`} />
                      ) : (
                        <TrendingDown className={`w-5 h-5 text-red-600`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <p
                    className={`font-semibold text-sm ${
                      tx.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {tx.type === 'credit' ? '+' : ''}{tx.amount.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
