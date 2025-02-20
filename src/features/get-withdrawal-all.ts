import axios from 'axios';
import { apiURL } from '@/utils/api-url';
import { TransactionList } from '@/types/transaction-list';

export const allWithdrawal = async (
  token: string
): Promise<TransactionList[]> => {
  try {
    const response = await axios.get(apiURL + '/admin/all-request', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.request;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Balance');
  }
};
export const pendingWithdrawal = async (
  token: string
): Promise<TransactionList[]> => {
  try {
    const response = await axios.get(apiURL + '/admin/pending-list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.request;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Balance');
  }
};
export const rejectWithdrawal = async (
  token: string
): Promise<TransactionList[]> => {
  try {
    const response = await axios.get(apiURL + '/admin/rejected-list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.request;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Balance');
  }
};
export const acceptedWithdrawal = async (
  token: string
): Promise<TransactionList[]> => {
  try {
    const response = await axios.get(apiURL + '/admin/accepted-list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.request;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Balance');
  }
};
