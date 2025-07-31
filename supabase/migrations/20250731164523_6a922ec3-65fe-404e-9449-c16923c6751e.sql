-- Fix RLS policy for organizations table to allow authenticated users to create organizations
-- The issue is that the current policy might be too restrictive

-- Drop the existing policy and recreate it
DROP POLICY IF EXISTS "Authenticated users can create organizations" ON public.organizations;

-- Create a more permissive policy for authenticated users to create organizations
CREATE POLICY "Authenticated users can create organizations" 
ON public.organizations 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- Also ensure there's a proper policy for users to read their own organization
DROP POLICY IF EXISTS "Users can view their organization" ON public.organizations;

CREATE POLICY "Users can view their organization" 
ON public.organizations 
FOR SELECT 
USING (
  verified = true OR 
  id IN (
    SELECT organization_id 
    FROM admin_users 
    WHERE user_id = auth.uid() AND active = true
  )
);