import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { Category } from '@/types/categories';
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(apiURL + '/category/', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.categories;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
