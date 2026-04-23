export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      demo_drivers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          grp_score: number | null
          id: string
          is_available: boolean | null
          lat: number
          lng: number
          name: string
          rating: number | null
          response_delay_ms: number | null
          will_accept: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          grp_score?: number | null
          id?: string
          is_available?: boolean | null
          lat: number
          lng: number
          name: string
          rating?: number | null
          response_delay_ms?: number | null
          will_accept?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          grp_score?: number | null
          id?: string
          is_available?: boolean | null
          lat?: number
          lng?: number
          name?: string
          rating?: number | null
          response_delay_ms?: number | null
          will_accept?: boolean | null
        }
        Relationships: []
      }
      driver_penalties: {
        Row: {
          created_at: string | null
          driver_id: string
          id: string
          penalty_points: number
          reason: string
          ride_id: string | null
        }
        Insert: {
          created_at?: string | null
          driver_id: string
          id?: string
          penalty_points: number
          reason: string
          ride_id?: string | null
        }
        Update: {
          created_at?: string | null
          driver_id?: string
          id?: string
          penalty_points?: number
          reason?: string
          ride_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "driver_penalties_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "driver_penalties_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          current_lat: number | null
          current_lng: number | null
          demo_mode: boolean | null
          grp_score: number | null
          id: string
          is_online: boolean | null
          name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          total_rides: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          current_lat?: number | null
          current_lng?: number | null
          demo_mode?: boolean | null
          grp_score?: number | null
          id?: string
          is_online?: boolean | null
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          total_rides?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          current_lat?: number | null
          current_lng?: number | null
          demo_mode?: boolean | null
          grp_score?: number | null
          id?: string
          is_online?: boolean | null
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          total_rides?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ride_assignments: {
        Row: {
          created_at: string | null
          driver_id: string
          id: string
          penalty_applied: boolean | null
          responded_at: string | null
          response_deadline: string | null
          ride_id: string
          status: Database["public"]["Enums"]["assignment_status"] | null
        }
        Insert: {
          created_at?: string | null
          driver_id: string
          id?: string
          penalty_applied?: boolean | null
          responded_at?: string | null
          response_deadline?: string | null
          ride_id: string
          status?: Database["public"]["Enums"]["assignment_status"] | null
        }
        Update: {
          created_at?: string | null
          driver_id?: string
          id?: string
          penalty_applied?: boolean | null
          responded_at?: string | null
          response_deadline?: string | null
          ride_id?: string
          status?: Database["public"]["Enums"]["assignment_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "ride_assignments_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ride_assignments_ride_id_fkey"
            columns: ["ride_id"]
            isOneToOne: false
            referencedRelation: "rides"
            referencedColumns: ["id"]
          },
        ]
      }
      rides: {
        Row: {
          assigned_driver_id: string | null
          assignment_attempts: number | null
          created_at: string | null
          destination_address: string | null
          destination_lat: number
          destination_lng: number
          eta_minutes: number | null
          id: string
          is_grp: boolean | null
          pickup_address: string | null
          pickup_lat: number
          pickup_lng: number
          rider_id: string
          search_radius: number | null
          status: Database["public"]["Enums"]["ride_status"] | null
          updated_at: string | null
        }
        Insert: {
          assigned_driver_id?: string | null
          assignment_attempts?: number | null
          created_at?: string | null
          destination_address?: string | null
          destination_lat: number
          destination_lng: number
          eta_minutes?: number | null
          id?: string
          is_grp?: boolean | null
          pickup_address?: string | null
          pickup_lat: number
          pickup_lng: number
          rider_id: string
          search_radius?: number | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string | null
        }
        Update: {
          assigned_driver_id?: string | null
          assignment_attempts?: number | null
          created_at?: string | null
          destination_address?: string | null
          destination_lat?: number
          destination_lng?: number
          eta_minutes?: number | null
          id?: string
          is_grp?: boolean | null
          pickup_address?: string | null
          pickup_lat?: number
          pickup_lng?: number
          rider_id?: string
          search_radius?: number | null
          status?: Database["public"]["Enums"]["ride_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rides_assigned_driver_id_fkey"
            columns: ["assigned_driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rides_rider_id_fkey"
            columns: ["rider_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_profile_id: { Args: { user_uuid: string }; Returns: string }
      is_driver: { Args: { user_uuid: string }; Returns: boolean }
      is_rider: { Args: { user_uuid: string }; Returns: boolean }
    }
    Enums: {
      assignment_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "timeout"
        | "completed"
      ride_status:
        | "pending"
        | "searching"
        | "assigned"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "failed"
      user_role: "rider" | "driver"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      assignment_status: [
        "pending",
        "accepted",
        "rejected",
        "timeout",
        "completed",
      ],
      ride_status: [
        "pending",
        "searching",
        "assigned",
        "in_progress",
        "completed",
        "cancelled",
        "failed",
      ],
      user_role: ["rider", "driver"],
    },
  },
} as const
