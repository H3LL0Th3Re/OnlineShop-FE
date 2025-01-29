import axios from 'axios';
import { apiURL } from '@/utils/api-url';
interface RegisterResponse {
  user?: {
    id: string;
    fullname: string;
    email: string;
    password: string;
  };
  message?: string;
}

export const registerUser = async (
  fullname: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(
      apiURL + '/auth/register',
      {
        fullname,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message || 'Registration failed',
      };
    } else {
      return { message: 'An error occurred while registering.' };
    }
  }
};
