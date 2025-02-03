import {
  createProducts,
  deleteProducts,
  getAllProducts,
} from '@/features/dashboard/services/product';
import { Product } from '@/types/product-type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useFetchProduct = (token: string) => {
  return useQuery({
    queryKey: ['Products'],
    queryFn: () => getAllProducts(token),
    enabled: !!token,
  });
};

export const useCreateProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Product) => createProducts(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProducts(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
