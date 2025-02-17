import { Roles } from '@/types/users';
import axios from 'axios';
import { apiURL } from '@/utils/api-url';
export const getAllRoles = async (): Promise<Roles[]> => {
  try {
    const response = await axios.get(apiURL + '/role', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.roles;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Store');
  }
};
