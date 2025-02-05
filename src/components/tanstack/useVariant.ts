import {
  createVariant,
  getAllVariant,
} from '@/features/dashboard/services/variant';
import { Variant } from '@/types/product-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchVariant = (token: string) => {
  return useQuery({
    queryKey: ['Variant'],
    queryFn: () => getAllVariant(token),
    enabled: !!token,
  });
};

export const useCreateVariant = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      data,
    }: {
      productId: string;
      data: Variant;
    }) => {
      if (!productId) {
        throw new Error('Product ID tidak boleh kosong');
      }
      return createVariant(productId, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Variant'] });
    },
    onError: (error) => {
      console.error('Gagal membuat varian:', error);
      throw error;
    },
  });
};
