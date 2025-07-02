-- Check existing policies and recreate the public read policy for projects
DROP POLICY IF EXISTS "Public can view active projects" ON public.projects;

-- Allow public to read active projects (this is what normal users need)
CREATE POLICY "Public can view active projects" 
ON public.projects 
FOR SELECT 
USING (status = 'active');

-- Also ensure project_items can be read publicly for active projects
DROP POLICY IF EXISTS "Public can view project items for active projects" ON public.project_items;

CREATE POLICY "Public can view project items for active projects" 
ON public.project_items 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_items.project_id 
    AND projects.status = 'active'
  )
);