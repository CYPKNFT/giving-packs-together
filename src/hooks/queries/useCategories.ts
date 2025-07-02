import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      return (data || []).map(category => ({
        id: category.id,
        title: category.name,
        description: category.description || '',
        imageUrl: category.image_url || '',
        projectCount: 0, // Will be calculated separately if needed
        created_at: category.created_at,
        updated_at: category.created_at
      }));
    },
    staleTime: 15 * 60 * 1000, // 15 minutes (categories change less frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};