// services/variantOptionValuesService.ts
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { VariantOptionValue } from '@/types/product-type';

export const createVariantOptionValue = async (
  token: string,
  variantOptionValueData: VariantOptionValue
) => {
  try {
    const response = await axios.post(
      `${apiURL}/variant-option-values/create/`,
      variantOptionValueData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.variant_option_values;
  } catch (error) {
    let errorMessage = 'Failed to create variant option value';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

export const getVariantOptionValues = async (token: string) => {
  try {
    const response = await axios.get(`${apiURL}/variant-option-values`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.variant_option_values;
  } catch (error) {
    let errorMessage = 'Failed to fetch variant option values';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

export const getVariantOptionValueById = async (token: string, id: string) => {
  try {
    const response = await axios.get(`${apiURL}/variant-option-values/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.variant_option_value;
  } catch (error) {
    let errorMessage = 'Failed to fetch variant option value';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

export const updateVariantOptionValue = async (
  token: string,
  id: string,
  variantOptionValueData: VariantOptionValue
) => {
  try {
    const response = await axios.put(
      `${apiURL}/variant-option-values/${id}`,
      variantOptionValueData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.variant_option_value;
  } catch (error) {
    let errorMessage = 'Failed to update variant option value';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};

export const deleteVariantOptionValue = async (token: string, id: string) => {
  try {
    const response = await axios.delete(
      `${apiURL}/variant-option-values/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    let errorMessage = 'Failed to delete variant option value';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
};
