import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVariantOptionValue } from '@/features/dashboard/services/variant-option-values';
import { Variant_option_values } from '@/types/product-type';

export const useCreateVariantOptionValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      token,
      data,
    }: {
      token: string;
      data: Variant_option_values;
    }) => createVariantOptionValue(token, data),

    onSuccess: () => {
      // Invalidasi cache agar data terbaru di-fetch kembali
      queryClient.invalidateQueries({ queryKey: ['variantOptionValues'] });
    },
    onError: (error) => {
      console.error('Error creating variant option value:', error);
    },
  });
};
