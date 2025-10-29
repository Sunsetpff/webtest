import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteImage {
  id: string;
  name: string;
  url: string;
  alt_text: string;
  category: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image_id: string | null;
  flavors: string[];
  benefits: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image?: SiteImage;
}

export interface Retailer {
  id: string;
  name: string;
  type: string;
  locations: string;
  logo_id: string | null;
  country: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  logo?: SiteImage;
}

export interface HeroContent {
  id: string;
  headline: string;
  subheadline: string;
  image_id: string | null;
  cta_primary_text: string;
  cta_secondary_text: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image?: SiteImage;
}
