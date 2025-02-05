import { Variant } from '@/types/product-type';
import { apiURL } from '@/utils/api-url';
import axios from 'axios';

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

    console.log('Sending variant data:', variantData); // Untuk debugging

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
