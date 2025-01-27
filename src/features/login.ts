import axios from 'axios';
import { apiURL } from '@/utils/api-url';
interface LoginResponse {
  token?: string;
  message?: string;
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      apiURL + '/auth/login',
      {
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
