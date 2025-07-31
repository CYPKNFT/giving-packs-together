import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/types';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async (): Promise<Category[]> => {
      // Fetch categories with project counts
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          projects(count)
        `)
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
        projectCount: Array.isArray(category.projects) ? category.projects[0]?.count || 0 : 0,
        created_at: category.created_at,
        updated_at: category.created_at
      }));
    },
    staleTime: 15 * 60 * 1000, // 15 minutes (categories change less frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};