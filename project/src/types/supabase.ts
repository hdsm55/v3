export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          avatar_url: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          avatar_url?: string | null
          role: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          avatar_url?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          id: string
          profile_id: string | null
          type: string
          subject: string | null
          content: string
          amount: number | null
          is_read: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          profile_id?: string | null
          type: string
          subject?: string | null
          content: string
          amount?: number | null
          is_read?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string | null
          type?: string
          subject?: string | null
          content?: string
          amount?: number | null
          is_read?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      programs: {
        Row: {
          id: string
          title: string
          description: string | null
          goal_amount: number | null
          image_url: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          goal_amount?: number | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          goal_amount?: number | null
          image_url?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string | null
          status: string | null
          img_url: string | null
          year: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: string | null
          status?: string | null
          img_url?: string | null
          year?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string | null
          status?: string | null
          img_url?: string | null
          year?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          start_date: string | null
          end_date: string | null
          location: string | null
          capacity: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          location?: string | null
          capacity?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          location?: string | null
          capacity?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string | null
          profile_id: string | null
          registered_at: string | null
        }
        Insert: {
          id?: string
          event_id?: string | null
          profile_id?: string | null
          registered_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string | null
          profile_id?: string | null
          registered_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      volunteers: {
        Row: {
          id: string
          profile_id: string | null
          name: string
          email: string
          phone: string
          resume_url: string | null
          status: string | null
          applied_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          profile_id?: string | null
          name: string
          email: string
          phone: string
          resume_url?: string | null
          status?: string | null
          applied_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          profile_id?: string | null
          name?: string
          email?: string
          phone?: string
          resume_url?: string | null
          status?: string | null
          applied_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "volunteers_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}