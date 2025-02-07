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
export const getStoreProduct = async (token: string): Promise<Product[]> => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${apiURL}/product/check-product`, {
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
export const getStorebyName = async (username: string): Promise<Product[]> => {
  try {
    const response = await axios.get(`${apiURL}/product/${username}`);

    console.log(response.data.product);
    return response.data.product;
  } catch (error) {
    let errorMessage = 'Failed to fetch products';
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        errorMessage = 'Store Not Found';
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
      throw new Error('Token autentikasi tidak ditemukan');
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);

    if (data.categoryIds && data.categoryIds.length > 0) {
      formData.append('categoryIds', JSON.stringify(data.categoryIds));
    }

    if (data.subcategoryIds && data.subcategoryIds.length > 0) {
      formData.append('subcategoryIds', JSON.stringify(data.subcategoryIds));
    }
    if (data.attachments) {
      data.attachments.forEach((attachment) => {
        formData.append('attachments', attachment);
      });
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

    // Response dari backend berisi { message: string, product: Product }
    return response.data.product;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Gagal membuat produk';
      console.error('API Error:', error.response?.data);
      throw new Error(errorMessage);
    }
    throw error;
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
