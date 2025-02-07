import { useMutation, useQueryClient } from '@tanstack/react-query';
import { VariantOptionValue } from '@/types/product-type';
import { createVariantOptionValue } from '@/features/dashboard/services/variant-option-values';

export const useCreateVariantOptionValue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      token,
      variantOptionValueData,
    }: {
      token: string;
      variantOptionValueData: VariantOptionValue;
    }) => createVariantOptionValue(token, variantOptionValueData),

    onSuccess: () => {
      // Invalidasi cache agar data terbaru di-fetch kembali
      queryClient.invalidateQueries({ queryKey: ['variantOptionValues'] });
    },
  });
};
