import { useMutation } from '@tanstack/react-query';
import { VariantOption } from '@/types/product-type';
import { createVariantOptions } from '@/features/dashboard/services/variant-options';

interface MutationParams {
  token: string;
  variantOptionsData: VariantOption;
}

export const useCreateVariantOptions = () => {
  return useMutation({
    mutationKey: ['createVariantOptions'],
    mutationFn: ({ token, variantOptionsData }: MutationParams) =>
      createVariantOptions(token, variantOptionsData),
    onSuccess: () => {
      console.error('Create Berhasil');
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
};
