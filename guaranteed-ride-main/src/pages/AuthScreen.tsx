import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole } from '@/types/grp';
import { Shield, Car, User, ArrowRight, Mail, Lock, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthScreen() {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading } = useGRP();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<UserRole>('rider');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (mode === 'signup') {
        await signUp(email, password, role, name);
      } else {
        await signIn(email, password);
      }
      navigate('/home');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background mobile-safe-top mobile-safe-bottom">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center shadow-grp mx-auto mb-4">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">UrbanGo Cabs</h1>
          <p className="text-muted-foreground mt-1">Safe, reliable, guaranteed rides</p>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-sm space-y-6">
          {/* Toggle */}
          <div className="glass-card rounded-xl p-1 flex">
            <button
              onClick={() => setMode('signin')}
              className={cn(
                'flex-1 py-3 rounded-lg font-medium transition-all',
                mode === 'signin' 
                  ? 'bg-grp text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={cn(
                'flex-1 py-3 rounded-lg font-medium transition-all',
                mode === 'signup' 
                  ? 'bg-grp text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              Sign Up
            </button>
          </div>

          {/* Role Selection (only for signup) */}
          {mode === 'signup' && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-muted-foreground">
                I want to
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('rider')}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    role === 'rider'
                      ? 'border-grp bg-grp/10'
                      : 'border-border hover:border-grp/50'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    role === 'rider' ? 'bg-grp' : 'bg-secondary'
                  )}>
                    <User className={cn('w-6 h-6', role === 'rider' ? 'text-white' : 'text-muted-foreground')} />
                  </div>
                  <span className={cn('font-medium', role === 'rider' ? 'text-grp' : 'text-foreground')}>
                    Book Rides
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('driver')}
                  className={cn(
                    'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    role === 'driver'
                      ? 'border-grp bg-grp/10'
                      : 'border-border hover:border-grp/50'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    role === 'driver' ? 'bg-grp' : 'bg-secondary'
                  )}>
                    <Car className={cn('w-6 h-6', role === 'driver' ? 'text-white' : 'text-muted-foreground')} />
                  </div>
                  <span className={cn('font-medium', role === 'driver' ? 'text-grp' : 'text-foreground')}>
                    Drive
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="relative">
                <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
                required
                minLength={6}
              />
            </div>

            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            <Button
              type="submit"
              variant="grp"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          {/* Demo login hint */}
          <p className="text-center text-sm text-muted-foreground">
            Demo mode enabled for testing
          </p>
        </div>
      </div>
    </div>
  );
}
