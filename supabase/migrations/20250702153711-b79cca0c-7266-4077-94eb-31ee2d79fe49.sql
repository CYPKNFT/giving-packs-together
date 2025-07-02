-- Fix infinite recursion in admin_users RLS policies
-- Drop problematic policies that reference the same table
DROP POLICY IF EXISTS "Org admins can manage their org members" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage all admin users" ON public.admin_users;

-- Create simpler, non-recursive policies
CREATE POLICY "Users can view own admin record" 
ON public.admin_users FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own admin record" 
ON public.admin_users FOR UPDATE 
USING (auth.uid() = user_id);

-- Create security definer function for admin checks
CREATE OR REPLACE FUNCTION public.is_org_admin_for_org(org_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND organization_id = org_id 
    AND role = 'org_admin' 
    AND active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND active = true
  );
$$;