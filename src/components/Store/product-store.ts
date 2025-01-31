import { create } from 'zustand';
import {
  createProduct,
  getAllProducts,
} from '@/features/dashboard/services/product';
import { Product, ProductTemporary } from '@/types/product-type';
import axios from 'axios';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (token: string) => Promise<void>;
  createProduct: (token: string, params: ProductTemporary) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async (token: string) => {
    set({ loading: true, error: null });

    try {
      const products = await getAllProducts(token);

      set({ products, loading: false });
    } catch (error: unknown) {
      let errorMessage: string;

      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Failed to fetch products';
      }

      console.error('Error fetching products:', error);
      set({ error: errorMessage, loading: false });
    }
  },

  createProduct: async (token: string, params: ProductTemporary) => {
    set({ loading: true, error: null });

    try {
      const newProduct = await createProduct(token, params);
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false,
      }));
    } catch (error) {
      let errorMessage = 'Failed to create product';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }
      console.error('Error creating product:', error);
      set({ error: errorMessage, loading: false });
    }
  },
}));
