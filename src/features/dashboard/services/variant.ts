import { Variant } from '@/types/product-type';
import { apiURL } from '@/utils/api-url';
import axios from 'axios';

export const getAllVariant = async (token: string): Promise<Variant[]> => {
  try {
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get(`${apiURL}/variant`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);
    return response.data;
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

export const createVariant = async (
  productId: string,
  data: Variant,
  token: string
) => {
  try {
    if (!token) {
      throw new Error('Token autentikasi tidak ditemukan');
    }

    // Pastikan data yang dikirim sesuai dengan yang diharapkan API
    const variantData = {
      name: data.name,
      productId: productId,
      variantOptions: data.variantOptions || [],
    };

    console.log('Sending variant data:', variantData);

    const response = await axios.post(
      `${apiURL}/variant/create/${productId}`,
      variantData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.data) {
      throw new Error('Respons kosong dari server');
    }

    return response.data;
  } catch (error) {
    console.error('Variant creation error:', error); // Untuk debugging
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || 'Gagal membuat varian';
      console.error('API Error:', error.response?.data); // Untuk debugging
      throw new Error(errorMessage);
    }
    throw new Error('Gagal membuat varian');
  }
};
