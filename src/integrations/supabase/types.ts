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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      delivery_zones: {
        Row: {
          active: boolean
          created_at: string
          delivery_fee: number
          estimated_time: string
          id: string
          minimum_order: number
          name: string
          sort_order: number
          sub_areas: string[]
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          delivery_fee?: number
          estimated_time?: string
          id: string
          minimum_order?: number
          name: string
          sort_order?: number
          sub_areas?: string[]
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          delivery_fee?: number
          estimated_time?: string
          id?: string
          minimum_order?: number
          name?: string
          sort_order?: number
          sub_areas?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      menu_categories: {
        Row: {
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          id: string
          name: string
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          available: boolean
          category_id: string
          created_at: string
          description: string
          featured: boolean
          id: string
          image_lqip: string | null
          image_src: string | null
          image_srcset: string | null
          name: string
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          available?: boolean
          category_id: string
          created_at?: string
          description?: string
          featured?: boolean
          id: string
          image_lqip?: string | null
          image_src?: string | null
          image_srcset?: string | null
          name: string
          price: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          available?: boolean
          category_id?: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          image_lqip?: string | null
          image_src?: string | null
          image_srcset?: string | null
          name?: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "menu_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          id: string
          menu_item_id: string
          name_snapshot: string
          order_id: string
          price_snapshot: number
          quantity: number
          subtotal: number
        }
        Insert: {
          id?: string
          menu_item_id: string
          name_snapshot: string
          order_id: string
          price_snapshot: number
          quantity: number
          subtotal: number
        }
        Update: {
          id?: string
          menu_item_id?: string
          name_snapshot?: string
          order_id?: string
          price_snapshot?: number
          quantity?: number
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_events: {
        Row: {
          created_at: string
          id: string
          note: string | null
          order_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          note?: string | null
          order_id: string
          status: string
        }
        Update: {
          created_at?: string
          id?: string
          note?: string | null
          order_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_status_events_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          delivery_address: string
          delivery_fee: number
          email: string | null
          estimated_time: string
          floor: string | null
          house: string | null
          id: string
          instructions: string | null
          landmark: string | null
          order_number: string
          order_status: string
          packaging_fee: number
          payment_method: string
          payment_status: string
          phone: string
          service_charge: number
          subtotal: number
          tax_amount: number
          total: number
          updated_at: string
          user_id: string | null
          zone_id: string
          zone_name: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          delivery_address: string
          delivery_fee: number
          email?: string | null
          estimated_time?: string
          floor?: string | null
          house?: string | null
          id?: string
          instructions?: string | null
          landmark?: string | null
          order_number?: string
          order_status?: string
          packaging_fee?: number
          payment_method: string
          payment_status?: string
          phone: string
          service_charge?: number
          subtotal: number
          tax_amount?: number
          total: number
          updated_at?: string
          user_id?: string | null
          zone_id: string
          zone_name: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          delivery_address?: string
          delivery_fee?: number
          email?: string | null
          estimated_time?: string
          floor?: string | null
          house?: string | null
          id?: string
          instructions?: string | null
          landmark?: string | null
          order_number?: string
          order_status?: string
          packaging_fee?: number
          payment_method?: string
          payment_status?: string
          phone?: string
          service_charge?: number
          subtotal?: number
          tax_amount?: number
          total?: number
          updated_at?: string
          user_id?: string | null
          zone_id?: string
          zone_name?: string
        }
        Relationships: []
      }
      restaurant_settings: {
        Row: {
          accepting_orders: boolean
          address: string
          bank_transfer_enabled: boolean
          bank_transfer_instructions: string
          cod_enabled: boolean
          id: number
          name: string
          online_payment_enabled: boolean
          opening_hours: string
          packaging_fee: number
          packaging_fee_enabled: boolean
          phone: string
          service_charge_enabled: boolean
          service_charge_rate: number
          tax_enabled: boolean
          tax_rate: number
          updated_at: string
        }
        Insert: {
          accepting_orders?: boolean
          address?: string
          bank_transfer_enabled?: boolean
          bank_transfer_instructions?: string
          cod_enabled?: boolean
          id?: number
          name?: string
          online_payment_enabled?: boolean
          opening_hours?: string
          packaging_fee?: number
          packaging_fee_enabled?: boolean
          phone?: string
          service_charge_enabled?: boolean
          service_charge_rate?: number
          tax_enabled?: boolean
          tax_rate?: number
          updated_at?: string
        }
        Update: {
          accepting_orders?: boolean
          address?: string
          bank_transfer_enabled?: boolean
          bank_transfer_instructions?: string
          cod_enabled?: boolean
          id?: number
          name?: string
          online_payment_enabled?: boolean
          opening_hours?: string
          packaging_fee?: number
          packaging_fee_enabled?: boolean
          phone?: string
          service_charge_enabled?: boolean
          service_charge_rate?: number
          tax_enabled?: boolean
          tax_rate?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff"
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
      app_role: ["admin", "staff"],
    },
  },
} as const
