import axios from 'axios';
import { apiURL } from '@/utils/api-url';

export const toggleActiveProduct = async (id: string, token: string) => {
  try {
    if (!id) {
      throw new Error('ID is required');
    }

    const response = await axios.put(
      `${apiURL}/product/toggle-product`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Failed to toggle product status';
      throw new Error(errorMessage);
    }
    throw error;
  }
};
