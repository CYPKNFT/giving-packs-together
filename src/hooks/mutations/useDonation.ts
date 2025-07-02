import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CreateDonationInput {
  project_id: string;
  item_id?: string;
  quantity: number;
  notes?: string;
}

export const useDonation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (donation: CreateDonationInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User must be authenticated to donate');
      }

      const { data, error } = await supabase
        .from('donations')
        .insert({
          user_id: user.id,
          project_id: donation.project_id,
          item_id: donation.item_id,
          quantity: donation.quantity,
          notes: donation.notes,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Donation error:', error);
        throw error;
      }

      // TODO: Update project item quantity fulfilled via database function
      // Will implement increment_item_fulfilled function in next step

      return data;
    },
    onSuccess: (data) => {
      // Invalidate related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['donations'] });
      
      toast({
        title: 'Thank you for your donation!',
        description: 'Your donation has been recorded successfully.',
        variant: 'default'
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to process your donation. Please try again.',
        variant: 'destructive'
      });
      console.error('Donation error:', error);
    },
  });
};