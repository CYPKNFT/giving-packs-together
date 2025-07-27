-- Enable RLS on projects table if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Update projects table to ensure proper status values
ALTER TABLE public.projects 
ALTER COLUMN status SET DEFAULT 'draft';

-- Add constraint to ensure valid status values
ALTER TABLE public.projects 
ADD CONSTRAINT projects_status_check 
CHECK (status IN ('draft', 'pending', 'active', 'rejected', 'completed', 'paused'));

-- Create project_reviews table for tracking approval/rejection history
CREATE TABLE IF NOT EXISTS public.project_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.admin_users(id) ON DELETE SET NULL,
  status TEXT NOT NULL CHECK (status IN ('approved', 'rejected')),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on project_reviews
ALTER TABLE public.project_reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for project_reviews
CREATE POLICY "Super admins can view all reviews" 
ON public.project_reviews 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND active = true
  )
);

CREATE POLICY "Super admins can create reviews" 
ON public.project_reviews 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND active = true
  )
);

-- Create organization_applications table for new org registrations
CREATE TABLE IF NOT EXISTS public.organization_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  contact_email TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on organization_applications
ALTER TABLE public.organization_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for organization_applications
CREATE POLICY "Super admins can manage organization applications" 
ON public.organization_applications 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND active = true
  )
);

CREATE POLICY "Anyone can submit organization applications" 
ON public.organization_applications 
FOR INSERT 
WITH CHECK (true);

-- Update projects RLS policy to include draft projects for organization admins
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (
  -- Super admins can see everything
  (EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND active = true
  )) 
  OR 
  -- Org admins can see their organization's projects
  (EXISTS (
    SELECT 1 FROM public.admin_users au 
    WHERE au.user_id = auth.uid() 
    AND au.organization_id = projects.organization_id 
    AND au.active = true
  ))
);

-- Create trigger for updating updated_at on project_reviews
CREATE TRIGGER update_project_reviews_updated_at
BEFORE UPDATE ON public.project_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for updating updated_at on organization_applications
CREATE TRIGGER update_organization_applications_updated_at
BEFORE UPDATE ON public.organization_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();