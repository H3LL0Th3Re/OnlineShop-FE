import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Product } from '@/types/product-type';

export const getAllProducts = async (token: string): Promise<Product[]> => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(apiURL + '/product/get-product', {

      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data.product);
    return response.data.product;
  } catch (error) {
    let errorMessage = 'Failed to fetch products';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage = 'Unauthorized: Please log in again.';
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }
    }

    throw new Error(errorMessage);
  }
};
