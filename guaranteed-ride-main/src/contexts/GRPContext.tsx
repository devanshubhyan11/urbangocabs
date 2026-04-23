import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile, Ride, DemoDriver, Location, UserRole } from '@/types/grp';
import { useToast } from '@/hooks/use-toast';

interface GRPContextType {
  // Auth state
  user: any;
  profile: Profile | null;
  isLoading: boolean;
  
  // Demo mode
  demoMode: boolean;
  setDemoMode: (value: boolean) => void;
  demoDrivers: DemoDriver[];
  
  // Ride state
  currentRide: Ride | null;
  setCurrentRide: (ride: Ride | null) => void;
  
  // Location
  currentLocation: Location | null;
  destination: Location | null;
  setDestination: (location: Location | null) => void;
  
  // Actions
  signUp: (email: string, password: string, role: UserRole, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  createRide: (pickup: Location, destination: Location, isGrp: boolean) => Promise<Ride>;
  cancelRide: (rideId: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const GRPContext = createContext<GRPContextType | undefined>(undefined);

export function GRPProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
const [user, setUser] = useState(null); // Start without user for auth flow
  const mockProfileData: Profile = {
    id: 'demo_rider',
    user_id: 'demo_user',
    name: 'Demo Rider',
    role: 'rider' as UserRole,
    phone: null,
    avatar_url: null,
    grp_score: 85,
    total_rides: 42,
    is_online: true,
    current_lat: null,
    current_lng: null,
    demo_mode: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  const [profile, setProfile] = useState<Profile | null>(mockProfileData);
  const [isLoading, setIsLoading] = useState(true);
const [demoMode, setDemoModeState] = useState(true); // Default to demo mode
  const [mockUser, setMockUser] = useState(null);
  const [mockProfile, setMockProfile] = useState<Profile | null>({
    id: 'demo_rider',
    user_id: 'demo_user',
    name: 'Demo Rider',
    role: 'rider',
    demo_mode: true,
    rating: 4.8
  });
  const [demoDrivers, setDemoDrivers] = useState<DemoDriver[]>([]);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>({
    lat: 28.6139,
    lng: 77.2090,
    address: 'New Delhi, India'
  });
  const [destination, setDestination] = useState<Location | null>(null);

  // Fetch demo drivers
  const fetchDemoDrivers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('demo_drivers')
        .select('*')
        .eq('is_available', true);
      
      if (data && !error) {
        setDemoDrivers(data as DemoDriver[]);
      } else {
        // Mock fallback
        setDemoDrivers([
          { id: 'mock1', name: 'Demo Driver 1', rating: 4.8, grp_score: 85, lat: 28.6139, lng: 77.2090, is_available: true, will_accept: true, avatar_url: null, created_at: new Date().toISOString(), response_delay_ms: 2000 },
          { id: 'mock2', name: 'Demo Driver 2', rating: 4.9, grp_score: 90, lat: 28.6200, lng: 77.2150, is_available: true, will_accept: true, avatar_url: null, created_at: new Date().toISOString(), response_delay_ms: 1500 }
        ]);
      }
    } catch (e) {
      // Mock fallback
      setDemoDrivers([
        { id: 'mock1', name: 'Demo Driver 1', rating: 4.8, grp_score: 85, lat: 28.6139, lng: 77.2090, is_available: true, will_accept: true, avatar_url: null, created_at: new Date().toISOString(), response_delay_ms: 2000 },
        { id: 'mock2', name: 'Demo Driver 2', rating: 4.9, grp_score: 90, lat: 28.6200, lng: 77.2150, is_available: true, will_accept: true, avatar_url: null, created_at: new Date().toISOString(), response_delay_ms: 1500 }
      ]);
    }
  }, []);

  // Initialize auth
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
try {
setUser(session?.user ?? null);
} catch (e) {
  setUser({ id: 'demo_user' });
}
      
      if (session?.user) {
        // Fetch profile
        setTimeout(async () => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (profileData) {
            setProfile(profileData as Profile);
            setDemoModeState(profileData.demo_mode ?? true);
          }
        }, 500);
      } else {
setProfile(mockProfileData);
      }
      setIsLoading(false);
    });

    fetchDemoDrivers();

    return () => subscription.unsubscribe();
  }, [fetchDemoDrivers]);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (profileData) {
      setProfile(profileData as Profile);
    }
  }, [user]);

  const setDemoMode = useCallback(async (value: boolean) => {
    setDemoModeState(value);
    if (profile) {
      await supabase
        .from('profiles')
        .update({ demo_mode: value })
        .eq('id', profile.id);
    }
  }, [profile]);

  const signUp = useCallback(async (email: string, password: string, role: UserRole, name: string) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: window.location.origin
      }
    });

    if (error) {
      toast({
        title: 'Sign up failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }

    // Update profile with role
    if (data.user) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await supabase
        .from('profiles')
        .update({ role, name, demo_mode: true })
        .eq('user_id', data.user.id);
      
      await refreshProfile();
    }

    toast({
      title: 'Welcome to GRP!',
      description: `Signed up as ${role}`
    });
    setIsLoading(false);
  }, [toast, refreshProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      toast({
        title: 'Sign in failed',
        description: error.message,
        variant: 'destructive'
      });
      setIsLoading(false);
      throw error;
    }

    toast({
      title: 'Welcome back!',
      description: 'Signed in successfully'
    });
    setIsLoading(false);
  }, [toast]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setCurrentRide(null);
    toast({
      title: 'Signed out',
      description: 'See you soon!'
    });
  }, [toast]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    if (!profile) return;
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id);

    if (error) {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }

    await refreshProfile();
  }, [profile, refreshProfile, toast]);

  const createRide = useCallback(async (pickup: Location, dest: Location, isGrp: boolean): Promise<Ride> => {
    if (!profile) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('rides')
      .insert({
        rider_id: profile.id,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        pickup_address: pickup.address,
        destination_lat: dest.lat,
        destination_lng: dest.lng,
        destination_address: dest.address,
        is_grp: isGrp,
        status: 'searching'
      })
      .select()
      .single();

    if (error) {
      toast({
        title: 'Failed to create ride',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }

    const ride = data as Ride;
    setCurrentRide(ride);
    // In demo mode, generate additional mock drivers around the pickup location
    if (demoMode) {
      const generated: DemoDriver[] = Array.from({ length: 20 }).map((_, i) => {
        const jitterLat = (Math.random() - 0.5) * 0.02; // ~±1km
        const jitterLng = (Math.random() - 0.5) * 0.02;
        const willAccept = Math.random() > 0.25; // 75% chance to accept
        return {
          id: `mock_${Date.now()}_${i}`,
          name: [
            'Amit Kumar','Priya Singh','Rajesh Patel','Neha Mehra','Vikram Joshi','Sara Thomas',
            'Karan Verma','Anjali Rao','Mohit Sharma','Ritu Kapoor','Deepak Singh','Maya Dutta',
            'Sandeep Gupta','Alia Bhatt','Rohan Mehta','Sunita Reddy','Vivek Nair','Farah Khan',
            'Arjun Rao','Kabir Shah'
          ][i % 20],
          avatar_url: null,
          rating: parseFloat((4.4 + Math.random() * 0.6).toFixed(1)),
          grp_score: Math.floor(30 + Math.random() * 70),
          lat: pickup.lat + jitterLat,
          lng: pickup.lng + jitterLng,
          is_available: true,
          will_accept: willAccept,
          response_delay_ms: 1000 + Math.floor(Math.random() * 4000),
          created_at: new Date().toISOString()
        } as DemoDriver;
      });

      // prepend generated drivers so they are used first
      setDemoDrivers(prev => [...generated, ...prev]);
    }

    return ride;
  }, [profile, toast, demoMode]);

  const cancelRide = useCallback(async (rideId: string) => {
    const { error } = await supabase
      .from('rides')
      .update({ status: 'cancelled' })
      .eq('id', rideId);

    if (error) {
      toast({
        title: 'Failed to cancel',
        description: error.message,
        variant: 'destructive'
      });
      throw error;
    }

    setCurrentRide(null);
    toast({
      title: 'Ride cancelled',
      description: 'Your ride has been cancelled'
    });
  }, [toast]);

  return (
    <GRPContext.Provider value={{
      user,
      profile,
      isLoading,
      demoMode,
      setDemoMode,
      demoDrivers,
      currentRide,
      setCurrentRide,
      currentLocation,
      destination,
      setDestination,
      signUp,
      signIn,
      signOut,
      updateProfile,
      createRide,
      cancelRide,
      refreshProfile
    }}>
      {children}
    </GRPContext.Provider>
  );
}

export function useGRP() {
  const context = useContext(GRPContext);
  if (context === undefined) {
    throw new Error('useGRP must be used within a GRPProvider');
  }
  return context;
}
