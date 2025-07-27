-- Fix RLS performance issues by wrapping auth function calls in subqueries

-- Fix project_items policies
DROP POLICY IF EXISTS "Admins can manage project items" ON public.project_items;
CREATE POLICY "Admins can manage project items" ON public.project_items
FOR ALL USING (
  (EXISTS ( SELECT 1
   FROM admin_users
  WHERE ((admin_users.user_id = (SELECT auth.uid())) AND (admin_users.role = 'super_admin'::admin_role) AND (admin_users.active = true)))) OR 
  (EXISTS ( SELECT 1
   FROM (projects p
     JOIN admin_users au ON ((p.organization_id = au.organization_id)))
  WHERE ((p.id = project_items.project_id) AND (au.user_id = (SELECT auth.uid())) AND (au.active = true))))
);

-- Fix projects policies
DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;
CREATE POLICY "Admins can manage projects" ON public.projects
FOR ALL USING (
  (EXISTS ( SELECT 1
   FROM admin_users
  WHERE ((admin_users.user_id = (SELECT auth.uid())) AND (admin_users.role = 'super_admin'::admin_role) AND (admin_users.active = true)))) OR 
  (EXISTS ( SELECT 1
   FROM admin_users au
  WHERE ((au.user_id = (SELECT auth.uid())) AND (au.organization_id = projects.organization_id) AND (au.active = true))))
);

-- Fix donations policies
DROP POLICY IF EXISTS "Users can create their own donations" ON public.donations;
CREATE POLICY "Users can create their own donations" ON public.donations
FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own donations" ON public.donations;
CREATE POLICY "Users can update their own donations" ON public.donations
FOR UPDATE USING ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can view their own donations" ON public.donations;
CREATE POLICY "Users can view their own donations" ON public.donations
FOR SELECT USING ((SELECT auth.uid()) = user_id);

-- Fix profiles policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING ((SELECT auth.uid()) = id);

-- Fix admin_users policies
DROP POLICY IF EXISTS "Admins can view their own record" ON public.admin_users;
DROP POLICY IF EXISTS "Users can update own admin record" ON public.admin_users;
DROP POLICY IF EXISTS "Users can view own admin record" ON public.admin_users;

CREATE POLICY "Users can view own admin record" ON public.admin_users
FOR SELECT USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own admin record" ON public.admin_users
FOR UPDATE USING ((SELECT auth.uid()) = user_id);

-- Fix organizations policy
DROP POLICY IF EXISTS "Admins can update their own organization" ON public.organizations;
CREATE POLICY "Admins can update their own organization" ON public.organizations
FOR UPDATE USING (
  id IN ( SELECT admin_users.organization_id
   FROM admin_users
  WHERE ((admin_users.user_id = (SELECT auth.uid())) AND (admin_users.role = ANY (ARRAY['super_admin'::admin_role, 'org_admin'::admin_role])))
  )
);

-- Fix project_reviews policies
DROP POLICY IF EXISTS "Super admins can create reviews" ON public.project_reviews;
CREATE POLICY "Super admins can create reviews" ON public.project_reviews
FOR INSERT WITH CHECK (
  EXISTS ( SELECT 1
   FROM admin_users
  WHERE ((admin_users.user_id = (SELECT auth.uid())) AND (admin_users.role = 'super_admin'::admin_role) AND (admin_users.active = true))
  )
);

DROP POLICY IF EXISTS "Super admins can view all reviews" ON public.project_reviews;
CREATE POLICY "Super admins can view all reviews" ON public.project_reviews
FOR SELECT USING (
  EXISTS ( SELECT 1
   FROM admin_users
  WHERE ((admin_users.user_id = (SELECT auth.uid())) AND (admin_users.role = 'super_admin'::admin_role) AND (admin_users.active = true))
  )
);