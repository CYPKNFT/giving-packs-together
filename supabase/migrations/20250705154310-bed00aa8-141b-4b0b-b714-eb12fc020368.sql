-- Fix RLS policy for organization creation during admin registration
-- This allows authenticated users to create organizations, then become admins of them

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can insert organizations" ON public.organizations;

-- Create a new policy that allows authenticated users to create organizations
CREATE POLICY "Authenticated users can create organizations" 
ON public.organizations 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Keep the existing update policy for admins only
-- This ensures only org admins can modify their organizations after creation