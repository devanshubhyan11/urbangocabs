export type UserRole = 'rider' | 'driver';

export type RideStatus = 'pending' | 'searching' | 'assigned' | 'in_progress' | 'completed' | 'cancelled' | 'failed';

export type AssignmentStatus = 'pending' | 'accepted' | 'rejected' | 'timeout' | 'completed';

export interface Profile {
  id: string;
  user_id: string;
  role: UserRole;
  name: string | null;
  phone: string | null;
  avatar_url: string | null;
  grp_score: number;
  total_rides: number;
  is_online: boolean;
  current_lat: number | null;
  current_lng: number | null;
  demo_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ride {
  id: string;
  rider_id: string;
  pickup_lat: number;
  pickup_lng: number;
  pickup_address: string | null;
  destination_lat: number;
  destination_lng: number;
  destination_address: string | null;
  status: RideStatus;
  is_grp: boolean;
  search_radius: number;
  assignment_attempts: number;
  assigned_driver_id: string | null;
  eta_minutes: number | null;
  created_at: string;
  updated_at: string;
}

export interface RideAssignment {
  id: string;
  ride_id: string;
  driver_id: string;
  status: AssignmentStatus;
  response_deadline: string | null;
  responded_at: string | null;
  penalty_applied: boolean;
  created_at: string;
}

export interface DemoDriver {
  id: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  grp_score: number;
  lat: number;
  lng: number;
  is_available: boolean;
  will_accept: boolean;
  response_delay_ms: number;
  created_at: string;
}

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface GRPBenefits {
  title: string;
  description: string;
  icon: string;
}
