import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Shield, TrendingDown } from 'lucide-react';

export default function FraudDetectionScreen() {
  const navigate = useNavigate();

  const alerts = [
    {
      id: 1,
      type: 'Unusual Payment Pattern',
      severity: 'medium',
      description: 'Multiple transactions in different locations within 10 minutes',
      user: 'User #4521',
      action: 'Under Review',
    },
    {
      id: 2,
      type: 'Suspicious Account Activity',
      severity: 'high',
      description: 'New device login from unfamiliar location detected',
      user: 'User #2189',
      action: 'Flagged',
    },
    {
      id: 3,
      type: 'Fake Driver Profile',
      severity: 'high',
      description: 'Synthetic identity detected using reverse image matching',
      user: 'Driver #5634',
      action: 'Blocked',
    },
    {
      id: 4,
      type: 'Payment Dispute Pattern',
      severity: 'low',
      description: 'More than 5 dispute claims in past 30 days',
      user: 'User #1923',
      action: 'Monitoring',
    },
  ];

  const statistics = [
    { label: 'Fraud Prevention Rate', value: '99.7%', icon: Shield },
    { label: 'Threats Detected Today', value: '847', icon: AlertTriangle },
    { label: 'Accounts Protected', value: '2.3M', icon: CheckCircle },
    { label: 'False Positives', value: '0.3%', icon: TrendingDown },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-grp to-grp-glow p-6 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fraud Detection System</h1>
            <p className="text-grp-foreground/90">Real-time ML-based threat detection</p>
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
        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {statistics.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-4 border-border/50">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-grp" />
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* Active Alerts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Active Alerts</h3>
            <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-700">
              4 Threats
            </span>
          </div>

          <div className="space-y-4">
            {alerts.map((alert) => {
              const severityColor =
                alert.severity === 'high'
                  ? 'border-red-500/50 bg-red-500/5'
                  : alert.severity === 'medium'
                  ? 'border-orange-500/50 bg-orange-500/5'
                  : 'border-blue-500/50 bg-blue-500/5';

              const severityBg =
                alert.severity === 'high'
                  ? 'bg-red-500/20 text-red-700'
                  : alert.severity === 'medium'
                  ? 'bg-orange-500/20 text-orange-700'
                  : 'bg-blue-500/20 text-blue-700';

              const actionColor =
                alert.action === 'Blocked'
                  ? 'bg-red-500/20 text-red-700'
                  : alert.action === 'Flagged'
                  ? 'bg-orange-500/20 text-orange-700'
                  : 'bg-blue-500/20 text-blue-700';

              return (
                <Card key={alert.id} className={`p-5 border ${severityColor}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <p className="font-semibold text-foreground">{alert.type}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">User: {alert.user}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${severityBg} font-semibold`}>
                        {alert.severity}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full ${actionColor} font-semibold text-center`}>
                        {alert.action}
                      </span>
                    </div>
                  </div>

                  {alert.action === 'Under Review' && (
                    <div className="flex gap-2 pt-3 border-t border-border/30">
                      <Button size="sm" variant="outline">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        Block User
                      </Button>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        {/* Detection Methods */}
        <Card className="p-6 border-blue-500/50 bg-blue-500/5 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">🤖 Detection Methods</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-medium text-foreground mb-2">Behavioral Analysis</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• Unusual location patterns</li>
                <li>• Abnormal transaction timing</li>
                <li>• Device fingerprinting</li>
                <li>• Travel speed validation</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Identity Verification</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• Image recognition matching</li>
                <li>• Synthetic identity detection</li>
                <li>• Document verification</li>
                <li>• Biometric analysis</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Transaction Monitoring</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• Amount anomalies</li>
                <li>• Frequency patterns</li>
                <li>• Payment method changes</li>
                <li>• Dispute ratio analysis</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">Network Analysis</p>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• Connected account detection</li>
                <li>• Ring fraud identification</li>
                <li>• IP/Phone relationships</li>
                <li>• Pattern matching</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Model Performance */}
        <Card className="p-6 border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Model Performance Metrics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Precision</p>
                <p className="text-sm font-bold text-foreground">97.8%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '97.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Recall</p>
                <p className="text-sm font-bold text-foreground">99.2%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '99.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">F1 Score</p>
                <p className="text-sm font-bold text-foreground">98.5%</p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-green-500 rounded-full h-2" style={{ width: '98.5%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
