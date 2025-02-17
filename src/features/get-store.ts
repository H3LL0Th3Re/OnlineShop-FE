import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Store } from '@/types/store';
export const currentStore = async (token: string): Promise<Store> => {
  try {
    const response = await axios.get(apiURL + '/stores/logged-in-store', {
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
export const storeName = async (username: string): Promise<Store> => {
  try {
    const response = await axios.get(apiURL + '/stores/' + username, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.store;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
export const getAllStore = async (): Promise<Store[]> => {
  try {
    const response = await axios.get(apiURL + '/stores', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.stores;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
