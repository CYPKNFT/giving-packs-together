-- Create function to increment project item fulfilled quantity
CREATE OR REPLACE FUNCTION public.increment_item_fulfilled(
  item_id UUID,
  quantity_to_add INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;