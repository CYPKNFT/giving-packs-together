import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProjectDetailData } from '@/types';

export interface ProjectFilters {
  category?: string;
  status?: string;
  limit?: number;
}

export const useProjects = (filters?: ProjectFilters) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async (): Promise<ProjectDetailData[]> => {
      let query = supabase
        .from('projects')
        .select(`
          *,
          organization:organizations(*),
          category:categories(*),
          items:project_items(*)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (filters?.category) {
        query = query.eq('category_id', filters.category);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching projects:', error);
        throw error;
      }

      return (data || []).map(project => ({
        id: project.id,
        title: project.title,
        description: project.description,
        imageUrl: project.image_url || '',
        organization: project.organization?.name || '',
        categoryId: project.category_id,
        itemsFulfilled: project.items_fulfilled || 0,
        itemsNeeded: project.items_needed || 0,
        aboutText: project.about_text,
        websiteUrl: project.website_url,
        organizationWebsite: project.organization?.website_url,
        organizationDescription: project.organization?.description,
        location: project.location,
        beneficiaries: project.beneficiaries,
        timeline: project.timeline,
        category: project.category?.name,
        urgency: project.urgency as 'low' | 'medium' | 'high' | 'critical',
        status: project.status as 'active' | 'completed' | 'paused' | 'draft',
        estimatedCost: project.estimated_cost ? Number(project.estimated_cost) : undefined,
        startDate: project.start_date,
        endDate: project.end_date,
        items: project.items?.map(item => ({
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
      }));
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};