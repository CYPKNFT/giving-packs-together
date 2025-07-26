-- Fix security warnings by setting search_path for all functions
-- This prevents search path manipulation attacks

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$function$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Fix is_super_admin function
CREATE OR REPLACE FUNCTION public.is_super_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND role = 'super_admin' 
    AND active = true
  );
$function$;

-- Fix is_org_admin_for_org function
CREATE OR REPLACE FUNCTION public.is_org_admin_for_org(org_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() 
    AND organization_id = org_id 
    AND role = 'org_admin' 
    AND active = true
  );
$function$;

-- Fix get_admin_role function
CREATE OR REPLACE FUNCTION public.get_admin_role(user_uuid uuid DEFAULT auth.uid())
 RETURNS text
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT role::TEXT FROM public.admin_users 
  WHERE user_id = user_uuid AND active = true 
  LIMIT 1;
$function$;

-- Fix is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO ''
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = user_uuid AND active = true
  );
$function$;

-- Fix increment_item_fulfilled function
CREATE OR REPLACE FUNCTION public.increment_item_fulfilled(item_id uuid, quantity_to_add integer)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
BEGIN
  UPDATE public.project_items
  SET quantity_fulfilled = quantity_fulfilled + quantity_to_add,
      updated_at = NOW()
  WHERE id = item_id;
  
  -- Also update the project's total items fulfilled
  UPDATE public.projects
  SET items_fulfilled = (
    SELECT COALESCE(SUM(quantity_fulfilled), 0)
    FROM public.project_items
    WHERE project_id = (
      SELECT project_id FROM public.project_items WHERE id = item_id
    )
  ),
  updated_at = NOW()
  WHERE id = (
    SELECT project_id FROM public.project_items WHERE id = item_id
  );
END;
$function$;