-- Create role enum
CREATE TYPE public.user_role AS ENUM ('rider', 'driver');
CREATE TYPE public.ride_status AS ENUM ('pending', 'searching', 'assigned', 'in_progress', 'completed', 'cancelled', 'failed');
CREATE TYPE public.assignment_status AS ENUM ('pending', 'accepted', 'rejected', 'timeout', 'completed');

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'rider',
  name TEXT,
  phone TEXT,
  avatar_url TEXT,
  grp_score INTEGER DEFAULT 100,
  total_rides INTEGER DEFAULT 0,
  is_online BOOLEAN DEFAULT false,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  demo_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rides table
CREATE TABLE public.rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  pickup_lat DOUBLE PRECISION NOT NULL,
  pickup_lng DOUBLE PRECISION NOT NULL,
  pickup_address TEXT,
  destination_lat DOUBLE PRECISION NOT NULL,
  destination_lng DOUBLE PRECISION NOT NULL,
  destination_address TEXT,
  status ride_status DEFAULT 'pending',
  is_grp BOOLEAN DEFAULT false,
  search_radius DOUBLE PRECISION DEFAULT 1.0,
  assignment_attempts INTEGER DEFAULT 0,
  assigned_driver_id UUID REFERENCES public.profiles(id),
  eta_minutes INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ride assignments (history of driver assignments per ride)
CREATE TABLE public.ride_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
  driver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status assignment_status DEFAULT 'pending',
  response_deadline TIMESTAMP WITH TIME ZONE,
  responded_at TIMESTAMP WITH TIME ZONE,
  penalty_applied BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Driver penalties log
CREATE TABLE public.driver_penalties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE,
  penalty_points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Demo drivers for simulation
CREATE TABLE public.demo_drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar_url TEXT,
  rating DOUBLE PRECISION DEFAULT 4.5,
  grp_score INTEGER DEFAULT 100,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  is_available BOOLEAN DEFAULT true,
  will_accept BOOLEAN DEFAULT true,
  response_delay_ms INTEGER DEFAULT 2000,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_penalties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_drivers ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's profile id
CREATE OR REPLACE FUNCTION public.get_profile_id(user_uuid UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = user_uuid LIMIT 1
$$;

-- Helper function to check if user is a driver
CREATE OR REPLACE FUNCTION public.is_driver(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = user_uuid AND role = 'driver'
  )
$$;

-- Helper function to check if user is a rider
CREATE OR REPLACE FUNCTION public.is_rider(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = user_uuid AND role = 'rider'
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for rides
CREATE POLICY "Riders can view own rides" ON public.rides
  FOR SELECT USING (
    rider_id = public.get_profile_id(auth.uid()) OR
    assigned_driver_id = public.get_profile_id(auth.uid())
  );

CREATE POLICY "Riders can create rides" ON public.rides
  FOR INSERT WITH CHECK (rider_id = public.get_profile_id(auth.uid()));

CREATE POLICY "Riders and drivers can update rides" ON public.rides
  FOR UPDATE USING (
    rider_id = public.get_profile_id(auth.uid()) OR
    assigned_driver_id = public.get_profile_id(auth.uid())
  );

-- RLS Policies for ride_assignments
CREATE POLICY "View own assignments" ON public.ride_assignments
  FOR SELECT USING (
    driver_id = public.get_profile_id(auth.uid()) OR
    EXISTS (
      SELECT 1 FROM public.rides 
      WHERE rides.id = ride_assignments.ride_id 
      AND rides.rider_id = public.get_profile_id(auth.uid())
    )
  );

CREATE POLICY "Drivers can update assignments" ON public.ride_assignments
  FOR UPDATE USING (driver_id = public.get_profile_id(auth.uid()));

CREATE POLICY "System can insert assignments" ON public.ride_assignments
  FOR INSERT WITH CHECK (true);

-- RLS Policies for driver_penalties
CREATE POLICY "Drivers can view own penalties" ON public.driver_penalties
  FOR SELECT USING (driver_id = public.get_profile_id(auth.uid()));

CREATE POLICY "System can insert penalties" ON public.driver_penalties
  FOR INSERT WITH CHECK (true);

-- RLS Policies for demo_drivers (public read for demo mode)
CREATE POLICY "Anyone can view demo drivers" ON public.demo_drivers
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update demo drivers" ON public.demo_drivers
  FOR UPDATE USING (true);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_rides_updated_at
  BEFORE UPDATE ON public.rides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Trigger to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.rides;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ride_assignments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Insert demo drivers for simulation
INSERT INTO public.demo_drivers (name, rating, grp_score, lat, lng, is_available, will_accept, response_delay_ms) VALUES
  ('Ahmed Khan', 4.8, 95, 28.6139, 77.2090, true, true, 3000),
  ('Priya Sharma', 4.9, 98, 28.6150, 77.2100, true, true, 2000),
  ('Raj Patel', 4.6, 88, 28.6120, 77.2080, true, false, 5000),
  ('Neha Singh', 4.7, 92, 28.6160, 77.2110, true, true, 4000),
  ('Vikram Rao', 4.5, 85, 28.6130, 77.2070, true, false, 3500);