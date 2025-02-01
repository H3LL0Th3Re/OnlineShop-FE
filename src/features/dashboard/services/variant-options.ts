import axios from 'axios';
import { apiURL } from '@/utils/api-url'; // Adjust the path as necessary

export const createVariantOptions = async (
  token: string,
  variantOptionsData: { name: string; variantId: string }
) => {
  try {
    const response = await axios.post(
      `${apiURL}/variant-options/create`, // Adjust the endpoint as necessary
      variantOptionsData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.variant_options; // Return the created variant options
  } catch (error) {
    let errorMessage = 'Failed to create variant options';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
