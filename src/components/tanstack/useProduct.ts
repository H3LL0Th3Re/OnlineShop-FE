import {
  createProducts,
  deleteProducts,
  getAllProducts,
  getStoreProduct,
  getStorebyName,
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
export const useStoreName = (username: string) => {
  return useQuery({
    queryKey: ['Products'],
    queryFn: () => getStorebyName(username),
    enabled: !!username,
  });
};
export const useFetchStoreProduct = (token: string) => {
  return useQuery({
    queryKey: ['Products'],
    queryFn: () => getAllProducts(token),
    enabled: !!token,
  });
};
export const useFetchProductStore = (token: string) => {
  return useQuery({
    queryKey: ['Products'],
    queryFn: () => getStoreProduct(token),
    enabled: !!token,
  });
};

export const useCreateProduct = (token: string) => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, Product>({
    mutationFn: (data: Product) => createProducts(data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Products'] });
    },
    onError: (error) => {
      console.error('Gagal membuat produk:', error);
      throw error;
    },
  });
};

export const useDeleteProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProducts(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Products'] });
    },
  });
};
