import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Store } from '@/types/store';
export const currentStore = async (token: string): Promise<Store> => {
  try {
    const response = await axios.get(apiURL + '/stores/current-store', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.store;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
