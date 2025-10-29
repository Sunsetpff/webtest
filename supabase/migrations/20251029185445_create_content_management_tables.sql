/*
  # Content Management System Schema

  ## Overview
  Creates tables for managing all website content including images, products, retailers, and hero content.

  ## New Tables
  
  ### `site_images`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Image name/title
  - `url` (text) - Image URL (Supabase storage or external)
  - `alt_text` (text) - Accessibility alt text
  - `category` (text) - Image category (hero, product, retailer, story)
  - `display_order` (integer) - Sort order for display
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `products`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `image_id` (uuid, foreign key) - Reference to site_images
  - `flavors` (jsonb) - Array of available flavors
  - `benefits` (jsonb) - Array of product benefits
  - `display_order` (integer) - Sort order
  - `is_active` (boolean) - Whether product is visible
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `retailers`
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Retailer name
  - `type` (text) - Retailer type (e.g., "Supermarket Chain")
  - `locations` (text) - Location description
  - `logo_id` (uuid, foreign key) - Reference to site_images
  - `country` (text) - Country where available
  - `display_order` (integer) - Sort order
  - `is_active` (boolean) - Whether retailer is visible
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `hero_content`
  - `id` (uuid, primary key) - Unique identifier
  - `headline` (text) - Main headline
  - `subheadline` (text) - Secondary text
  - `image_id` (uuid, foreign key) - Reference to site_images
  - `cta_primary_text` (text) - Primary button text
  - `cta_secondary_text` (text) - Secondary button text
  - `is_active` (boolean) - Whether this hero is active
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for active content
  - Authenticated admin users can manage content
*/

-- Create site_images table
CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  alt_text text DEFAULT '',
  category text NOT NULL,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  image_id uuid REFERENCES site_images(id) ON DELETE SET NULL,
  flavors jsonb DEFAULT '[]'::jsonb,
  benefits jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create retailers table
CREATE TABLE IF NOT EXISTS retailers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  locations text NOT NULL,
  logo_id uuid REFERENCES site_images(id) ON DELETE SET NULL,
  country text DEFAULT 'Serbia',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hero_content table
CREATE TABLE IF NOT EXISTS hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL,
  subheadline text NOT NULL,
  image_id uuid REFERENCES site_images(id) ON DELETE SET NULL,
  cta_primary_text text DEFAULT 'Partner with Us',
  cta_secondary_text text DEFAULT 'Find Our Products',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE retailers ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- Public read policies for active content
CREATE POLICY "Anyone can view images"
  ON site_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Anyone can view active retailers"
  ON retailers FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Anyone can view active hero content"
  ON hero_content FOR SELECT
  TO public
  USING (is_active = true);

-- Admin policies for authenticated users
CREATE POLICY "Authenticated users can insert images"
  ON site_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images"
  ON site_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete images"
  ON site_images FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert retailers"
  ON retailers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update retailers"
  ON retailers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete retailers"
  ON retailers FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert hero content"
  ON hero_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update hero content"
  ON hero_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete hero content"
  ON hero_content FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_site_images_category ON site_images(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_retailers_active ON retailers(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_hero_content_active ON hero_content(is_active);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_site_images_updated_at
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_retailers_updated_at
  BEFORE UPDATE ON retailers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON hero_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();