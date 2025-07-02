-- Phase 2A: Core Database Schema for Donation Platform

-- Organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  logo_url TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project categories
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) NOT NULL,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'draft')),
  items_needed INTEGER DEFAULT 0,
  items_fulfilled INTEGER DEFAULT 0,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE,
  image_url TEXT,
  about_text TEXT,
  website_url TEXT,
  location TEXT,
  beneficiaries TEXT,
  timeline TEXT,
  urgency TEXT DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  estimated_cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Project items
CREATE TABLE public.project_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  quantity_needed INTEGER NOT NULL DEFAULT 1,
  quantity_fulfilled INTEGER DEFAULT 0,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  estimated_cost DECIMAL(10,2),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  project_id UUID REFERENCES public.projects(id) NOT NULL,
  item_id UUID REFERENCES public.project_items(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'delivered', 'cancelled')),
  tracking_number TEXT,
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Public read access for projects and categories
CREATE POLICY "Public can view active projects" ON public.projects
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can view categories" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Public can view verified organizations" ON public.organizations
  FOR SELECT USING (verified = true);

CREATE POLICY "Public can view project items for active projects" ON public.project_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects 
      WHERE id = project_items.project_id AND status = 'active'
    )
  );

-- User-specific donation access
CREATE POLICY "Users can view their own donations" ON public.donations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own donations" ON public.donations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donations" ON public.donations
  FOR UPDATE USING (auth.uid() = user_id);

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON public.organizations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_items_updated_at
  BEFORE UPDATE ON public.project_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial sample data for testing
INSERT INTO public.categories (id, name, description, image_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Housing Assistance', 'Support for temporary and permanent housing solutions', 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Food Security', 'Nutrition assistance and food programs', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Healthcare', 'Medical supplies and healthcare support', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Education', 'Educational resources and school supplies', 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400');

INSERT INTO public.organizations (id, name, description, website_url, verified) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', 'Hope Community Center', 'Dedicated to providing support and resources for families in transition', 'https://hopecommunity.org', true),
  ('550e8400-e29b-41d4-a716-446655440011', 'Local Food Bank Alliance', 'Fighting hunger in our community through food distribution and advocacy', 'https://localfoodbank.org', true);

INSERT INTO public.projects (
  id, title, description, organization_id, category_id, 
  items_needed, items_fulfilled, image_url, about_text, 
  location, beneficiaries, urgency
) VALUES
  (
    '550e8400-e29b-41d4-a716-446655440020',
    'Emergency Housing Supplies',
    'Essential items for families transitioning into emergency housing',
    '550e8400-e29b-41d4-a716-446655440010',
    '550e8400-e29b-41d4-a716-446655440001',
    300, 125,
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    'Our Emergency Housing Supplies program provides essential items for families who have recently moved into transitional housing. These families often arrive with only the clothes on their backs and need basic household items to begin rebuilding their lives.',
    'Downtown Community Center',
    '45 families in transitional housing',
    'high'
  );

INSERT INTO public.project_items (
  project_id, name, description, category, 
  quantity_needed, quantity_fulfilled, priority, estimated_cost, image_url
) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', 'Bedding Set', 'Complete bedding sets including sheets, pillows, and blankets', 'Housing', 25, 15, 'high', 45.00, 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'),
  ('550e8400-e29b-41d4-a716-446655440020', 'Kitchen Starter Kit', 'Basic cooking utensils and supplies for new homes', 'Housing', 20, 12, 'medium', 35.00, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'),
  ('550e8400-e29b-41d4-a716-446655440020', 'Hygiene Kit', 'Personal care essentials for maintaining dignity and health', 'Personal Care', 30, 18, 'high', 12.99, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400');