import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Product } from '@/types/product-type';

// Get All Products
export const getAllProducts = async (token: string): Promise<Product[]> => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${apiURL}/product/get-product`, {
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

export const createProduct = async (
  token: string,
  productData: FormData
): Promise<Product> => {
  try {
    const response = await axios.post(
      `${apiURL}/product/create-product`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.product;
  } catch (error) {
    let errorMessage = 'Failed to create product';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
