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

export const createProducts = async (data: Product, token: string) => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('categoryIds', JSON.stringify(data.categoryIds));
    formData.append('subcategoryIds', JSON.stringify(data.subcategoryIds));

    if (data.attachments) {
      formData.append('attachments', data.attachments);
    }

    const response = await axios.post(
      `${apiURL}/product/create-product`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to create product';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

export const deleteProducts = async (
  id: string,
  token: string
): Promise<void> => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    await axios.delete(`${apiURL}/product/delete-product`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { id },
    });
  } catch (error) {
    let errorMessage = 'Failed to Delete Product';
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
