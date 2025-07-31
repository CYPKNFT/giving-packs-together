-- Add INSERT policy for admin_users table to allow users to create their own admin records
CREATE POLICY "Users can create their own admin record" 
ON public.admin_users 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Update organizations INSERT policy to be more robust for registration flow
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

CREATE POLICY "Authenticated users can create organizations during registration" 
ON public.organizations 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);