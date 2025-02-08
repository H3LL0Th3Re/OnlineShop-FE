import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleActiveProduct } from '@/features/dashboard/services/toggleActiveService';

export const useToggleActiveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, token }: { id: string; token: string }) => {
      return toggleActiveProduct(id, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Products'] }); // Invalidate the Products query
    },
    onError: (error) => {
      console.error('Error toggling product active status:', error);
    },
  });
};
