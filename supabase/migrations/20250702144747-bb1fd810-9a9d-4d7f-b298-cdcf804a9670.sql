-- Fix the projects RLS policy that's causing recursion
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;

-- Create a simpler policy that doesn't cause recursion
CREATE POLICY "Admins can manage projects" 
ON public.projects 
FOR ALL 
USING (
  -- Allow if user is super admin
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin' AND active = true
  ) OR
  -- Allow if user is org admin/project manager for this org
  EXISTS (
    SELECT 1 FROM public.admin_users au
    WHERE au.user_id = auth.uid() 
    AND au.organization_id = projects.organization_id
    AND au.active = true
  )
);

-- Also fix project_items policy
DROP POLICY IF EXISTS "Admins can manage project items" ON public.project_items;

CREATE POLICY "Admins can manage project items" 
ON public.project_items 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND role = 'super_admin' AND active = true
  ) OR
  EXISTS (
    SELECT 1 FROM public.projects p
    JOIN public.admin_users au ON p.organization_id = au.organization_id
    WHERE p.id = project_items.project_id
    AND au.user_id = auth.uid() 
    AND au.active = true
  )
);