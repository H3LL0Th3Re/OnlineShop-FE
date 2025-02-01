import axios from 'axios';
import { apiURL } from '@/utils/api-url'; // Adjust the path as necessary

export const createVariant = async (
  token: string,
  productId: string,
  variantData: { name: string; is_active: boolean }
) => {
  try {
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
    return response.data.variant; // Return the created variant
  } catch (error) {
    let errorMessage = 'Failed to create variant';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
