import { Users } from '@/types/users';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
export const getUser = async (token: string): Promise<Users> => {
  try {
    const response = await axios.get(apiURL + '/auth/current-user', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
