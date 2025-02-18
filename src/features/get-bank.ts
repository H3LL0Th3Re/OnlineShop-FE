import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Bank } from '@/types/bank';
export const currentBank = async (token: string): Promise<Bank[]> => {
  try {
    const response = await axios.get(apiURL + '/bank/store-bank', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.bank;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
export const getBankById = async (id: string, token: string): Promise<Bank> => {
  try {
    const response = await axios.get(apiURL + `/bank/get-bank/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.bank;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
