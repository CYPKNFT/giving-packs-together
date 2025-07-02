-- Create admin user roles system
CREATE TYPE public.admin_role AS ENUM ('super_admin', 'org_admin', 'project_manager');

-- Create admin_users table for admin access control
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'project_manager',
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(user_id)
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admins can view their own record and org members" 
ON public.admin_users 
FOR SELECT 
USING (
  auth.uid() = user_id OR 
  (organization_id IS NOT NULL AND organization_id IN (
    SELECT organization_id FROM public.admin_users WHERE user_id = auth.uid()
  ))
);

CREATE POLICY "Super admins can manage all admin users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Org admins can manage their org users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users a1
    WHERE a1.user_id = auth.uid() 
    AND a1.role = 'org_admin'
    AND a1.organization_id = admin_users.organization_id
  )
);

-- Add admin management policies to organizations
CREATE POLICY "Admins can update their own organization" 
ON public.organizations 
FOR UPDATE 
USING (
  id IN (
    SELECT organization_id FROM public.admin_users 
    WHERE user_id = auth.uid() AND role IN ('super_admin', 'org_admin')
  )
);

CREATE POLICY "Admins can insert organizations" 
ON public.organizations 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role IN ('super_admin', 'org_admin')
  )
);

-- Add admin management policies to projects
CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (
  organization_id IN (
    SELECT organization_id FROM public.admin_users 
    WHERE user_id = auth.uid() AND active = true
  ) OR
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Add admin management policies to project_items
CREATE POLICY "Admins can manage project items" 
ON public.project_items 
FOR ALL 
USING (
  project_id IN (
    SELECT p.id FROM public.projects p
    JOIN public.admin_users au ON p.organization_id = au.organization_id
    WHERE au.user_id = auth.uid() AND au.active = true
  ) OR
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Create function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid AND active = true
  );
$$;

-- Create function to get admin role
CREATE OR REPLACE FUNCTION public.get_admin_role(user_uuid UUID DEFAULT auth.uid())
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT role::TEXT FROM public.admin_users 
  WHERE user_id = user_uuid AND active = true 
  LIMIT 1;
$$;

-- Create trigger for updating admin_users timestamps
CREATE TRIGGER update_admin_users_updated_at
BEFORE UPDATE ON public.admin_users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();