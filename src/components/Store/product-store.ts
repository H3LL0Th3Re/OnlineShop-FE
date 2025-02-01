import { create } from 'zustand';
import {
  getAllProducts,
  createProduct,
} from '@/features/dashboard/services/product';
import { Product } from '@/types/product-type';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: (token: string) => Promise<void>;
  addProduct: (token: string, productData: FormData) => Promise<Product>;
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

  addProduct: async (token: string, productData: FormData) => {
    set({ loading: true, error: null });
    try {
      const newProduct = await createProduct(token, productData);
      set((state) => ({
        products: [...state.products, newProduct],
        loading: false,
      }));
      return newProduct;
    } catch (error: unknown) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Failed to add product';
      }
      console.error('Error adding product:', error);
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
