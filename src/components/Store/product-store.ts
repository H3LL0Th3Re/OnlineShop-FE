import { create } from 'zustand';
import { getAllProducts } from '@/features/dashboard/services/product';
import { Product } from '@/types/product-type';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (token: string) => Promise<void>;
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
}));
