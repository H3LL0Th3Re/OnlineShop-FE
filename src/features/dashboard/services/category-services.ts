import { CategoryResponse } from '@/types/categories';
import { apiURL } from '@/utils/api-url';
import axios from 'axios';

export const getAllCategory = {
  getAllCategories: async (token: string) => {
    try {
      const response = await axios.get<CategoryResponse>(apiURL + '/category', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || 'Failed to fetch categories';
        throw new Error(errorMessage);
      }
      throw new Error('Failed to fetch categories');
    }
  },
};
