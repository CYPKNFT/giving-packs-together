import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProjectDetailData } from '@/types';

export const useProject = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: async (): Promise<ProjectDetailData | null> => {
      if (!projectId) return null;

      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          organization:organizations(*),
          category:categories(*),
          items:project_items(*)
        `)
        .eq('id', projectId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching project:', error);
        throw error;
      }

      if (!data) return null;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        imageUrl: data.image_url || '',
        organization: data.organization?.name || '',
        categoryId: data.category_id,
        itemsFulfilled: data.items_fulfilled || 0,
        itemsNeeded: data.items_needed || 0,
        aboutText: data.about_text,
        websiteUrl: data.website_url,
        organizationWebsite: data.organization?.website_url,
        organizationDescription: data.organization?.description,
        location: data.location,
        beneficiaries: data.beneficiaries,
        timeline: data.timeline,
        category: data.category?.name,
        urgency: data.urgency as 'low' | 'medium' | 'high' | 'critical',
        status: data.status as 'active' | 'completed' | 'paused' | 'draft',
        estimatedCost: data.estimated_cost ? Number(data.estimated_cost) : undefined,
        startDate: data.start_date,
        endDate: data.end_date,
        items: data.items?.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || '',
          category: item.category || '',
          imageUrl: item.image_url,
          quantityNeeded: item.quantity_needed,
          quantityFulfilled: item.quantity_fulfilled || 0,
          priority: item.priority as 'low' | 'medium' | 'high' | 'urgent',
          estimatedCost: item.estimated_cost ? Number(item.estimated_cost) : undefined,
          project_id: item.project_id
        })) || []
      };
    },
    enabled: !!projectId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};