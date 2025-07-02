-- Fix infinite recursion in admin_users RLS policies
DROP POLICY IF EXISTS "Admins can view their own record and org members" ON public.admin_users;
DROP POLICY IF EXISTS "Super admins can manage all admin users" ON public.admin_users;
DROP POLICY IF EXISTS "Org admins can manage their org users" ON public.admin_users;

-- Create simpler, non-recursive policies for admin_users
CREATE POLICY "Admins can view their own record" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Super admins can manage all admin users" 
ON public.admin_users 
FOR ALL 
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin' AND active = true
  )
);

CREATE POLICY "Org admins can manage their org members" 
ON public.admin_users 
FOR ALL 
USING (
  user_id = auth.uid() OR
  (organization_id IS NOT NULL AND EXISTS (
    SELECT 1 FROM public.admin_users a1
    WHERE a1.user_id = auth.uid() 
    AND a1.role = 'org_admin' 
    AND a1.organization_id = admin_users.organization_id
    AND a1.active = true
  ))
);