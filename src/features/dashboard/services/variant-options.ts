import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { VariantOption } from '@/types/product-type';

export const createVariantOptions = async (
  token: string,
  variantOptionsData: VariantOption
) => {
  try {
    const response = await axios.post(
      `${apiURL}/variant-options/create`,
      variantOptionsData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.variant_options;
  } catch (error) {
    let errorMessage = 'Failed to create variant options';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
