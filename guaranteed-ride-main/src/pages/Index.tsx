import { useNavigate } from 'react-router-dom';
import { useGRP } from '@/contexts/GRPContext';
import { Shield } from 'lucide-react';

export default function Index() {
  const navigate = useNavigate();
  const { user, profile, isLoading } = useGRP();

  // Redirect based on auth state
  if (!isLoading) {
    if (!user) {
      navigate('/auth');
      return null;
    }
    
    if (profile?.role === 'driver') {
      navigate('/driver');
      return null;
    }
    
    navigate('/home');
    return null;
  }

  // Loading state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-grp to-grp-glow flex items-center justify-center shadow-grp animate-pulse-slow">
        <Shield className="w-10 h-10 text-white" />
      </div>
      <h1 className="mt-6 text-2xl font-display font-bold text-foreground">UrbanGo Cabs</h1>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}
