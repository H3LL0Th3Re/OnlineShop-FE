import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Categories } from '@/types/categories';
export const getCategories = async (token: string): Promise<Categories[]> => {
  try {
    const response = await axios.get(apiURL + '/category/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.categories;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
