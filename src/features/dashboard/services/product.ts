import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Product, ProductTemporary } from '@/types/product-type';

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

export const createProduct = async (
  token: string,
  { name, description, attachments }: ProductTemporary
): Promise<Product> => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('attachments', attachments);

    const response = await axios.post(
      apiURL + '/product/create-product',
      formData,
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
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
