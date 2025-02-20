import axios from 'axios';
import { apiURL } from '@/utils/api-url';

export const currentBalance = async (token: string): Promise<number> => {
  try {
    const response = await axios.get(apiURL + '/transaction-list/amount', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.total;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Balance');
  }
};
